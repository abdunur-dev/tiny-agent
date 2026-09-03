import * as fs from 'node:fs';
import * as path from 'node:path';
import { exec } from 'node:child_process';
import type { ToolDefinition } from './model.ts';

export interface Tool {
  definition: ToolDefinition;
  execute: (args: Record<string, any>) => Promise<string>;
}

function resolveSafePath(filePath: string): string {
  if (path.isAbsolute(filePath)) {
    return filePath;
  }
  return path.resolve(process.cwd(), filePath);
}

// Safety printer: prints pending actions before executing with dimmed formatting
function notifyAction(actionName: string, detail: string) {
  process.stdout.write(`\x1b[90m⚡ ${actionName} \x1b[38;5;248m${detail}\x1b[0m\n`);
}

// Visibility printer: prints read-only actions before executing with dimmed formatting
export function notifyReadOnlyAction(actionName: string, detail: string) {
  process.stdout.write(`\x1b[90m↳ ${actionName}: \x1b[38;5;248m${detail}\x1b[0m\n`);
}

function findFilesByBasename(
  baseName: string,
  searchRoot: string = process.cwd(),
  maxDepth: number = 4
): string[] {
  const IGNORED = new Set(['node_modules', '.git', '.bun', 'dist', 'build', '.cache']);
  const matches: string[] = [];

  function walk(dir: string, depth: number) {
    if (depth > maxDepth) return;
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!IGNORED.has(entry.name) && !entry.name.startsWith('.')) {
          walk(path.join(dir, entry.name), depth + 1);
        }
      } else if (entry.isFile()) {
        if (entry.name.toLowerCase() === baseName.toLowerCase()) {
          matches.push(path.join(dir, entry.name));
        }
      }
    }
  }

  walk(searchRoot, 0);
  return matches;
}

export const readFileTool: Tool = {
  definition: {
    type: 'function',
    function: {
      name: 'read_file',
      description: 'Read and return the complete text contents of a file.',
      parameters: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Relative or absolute path to the file to read.',
          },
        },
        required: ['path'],
      },
    },
  },
  async execute({ path: filePath }) {
    if (!filePath) return 'Error: path parameter is required';
    notifyReadOnlyAction('read_file', filePath);
    const target = resolveSafePath(filePath);
    try {
      if (!fs.existsSync(target)) {
        const baseName = path.basename(filePath);
        const matches = findFilesByBasename(baseName);

        if (matches.length === 1) {
          const autoResolved = matches[0];
          const relResolved = path.relative(process.cwd(), autoResolved).replace(/\\/g, '/');
          process.stdout.write(`\x1b[90m↳ auto-resolved '${filePath}' → '${relResolved}'\x1b[0m\n`);
          const stat = fs.statSync(autoResolved);
          if (stat.isDirectory()) {
            return `Error: '${relResolved}' is a directory, not a file`;
          }
          return fs.readFileSync(autoResolved, 'utf-8');
        }

        if (matches.length > 1) {
          const formatted = matches
            .map((m) => `'${path.relative(process.cwd(), m).replace(/\\/g, '/')}'`)
            .join(', ');
          return `Error: file not found at path '${filePath}'. Found multiple matching files in project: ${formatted}. Please retry with the correct relative path.`;
        }

        return `Error: file not found at path '${filePath}'.`;
      }

      const stat = fs.statSync(target);
      if (stat.isDirectory()) {
        return `Error: '${filePath}' is a directory, not a file`;
      }
      return fs.readFileSync(target, 'utf-8');
    } catch (err: any) {
      return `Error reading file '${filePath}': ${err.message}`;
    }
  },
};

export const writeFileTool: Tool = {
  definition: {
    type: 'function',
    function: {
      name: 'write_file',
      description: 'Create or overwrite a file with the given content.',
      parameters: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Relative or absolute path to the file to write.',
          },
          content: {
            type: 'string',
            description: 'The complete content to write into the file.',
          },
        },
        required: ['path', 'content'],
      },
    },
  },
  async execute({ path: filePath, content }) {
    if (!filePath) return 'Error: path parameter is required';
    if (content === undefined || content === null) return 'Error: content parameter is required';

    const target = resolveSafePath(filePath);
    notifyAction('write_file', target);

    try {
      const dir = path.dirname(target);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(target, content, 'utf-8');
      return `Successfully wrote ${content.length} characters to ${filePath}`;
    } catch (err: any) {
      return `Error writing file ${filePath}: ${err.message}`;
    }
  },
};

export const editFileTool: Tool = {
  definition: {
    type: 'function',
    function: {
      name: 'edit_file',
      description: 'Replace an exact unique string with a new string in a file. Fails if old_string is not found exactly once.',
      parameters: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Path to the file to edit.',
          },
          old_string: {
            type: 'string',
            description: 'The exact substring to find and replace. Must match exactly once.',
          },
          new_string: {
            type: 'string',
            description: 'The new string to replace old_string with.',
          },
        },
        required: ['path', 'old_string', 'new_string'],
      },
    },
  },
  async execute({ path: filePath, old_string, new_string }) {
    if (!filePath) return 'Error: path parameter is required';
    if (old_string === undefined) return 'Error: old_string parameter is required';
    if (new_string === undefined) return 'Error: new_string parameter is required';

    const target = resolveSafePath(filePath);
    notifyAction('edit_file', target);

    try {
      if (!fs.existsSync(target)) {
        return `Error: File not found: ${filePath}`;
      }
      const content = fs.readFileSync(target, 'utf-8');
      const occurrences = content.split(old_string).length - 1;

      if (occurrences === 0) {
        return `Error: old_string not found in ${filePath}`;
      }
      if (occurrences > 1) {
        return `Error: old_string was found ${occurrences} times in ${filePath}. It must be unique. Provide more surrounding lines.`;
      }

      const updated = content.replace(old_string, new_string);
      fs.writeFileSync(target, updated, 'utf-8');
      return `Successfully edited ${filePath}`;
    } catch (err: any) {
      return `Error editing file ${filePath}: ${err.message}`;
    }
  },
};

export const runShellCommandTool: Tool = {
  definition: {
    type: 'function',
    function: {
      name: 'run_shell_command',
      description: 'Run a shell command on the host system and return stdout/stderr.',
      parameters: {
        type: 'object',
        properties: {
          command: {
            type: 'string',
            description: 'The shell command to execute.',
          },
        },
        required: ['command'],
      },
    },
  },
  async execute({ command }) {
    if (!command) return 'Error: command parameter is required';

    notifyAction('run_shell_command', command);

    return new Promise((resolve) => {
      exec(
        command,
        {
          timeout: 30000,
          cwd: process.cwd(),
          maxBuffer: 1024 * 1024 * 2, // 2MB
        },
        (error, stdout, stderr) => {
          let output = '';
          if (stdout && stdout.trim()) {
            output += stdout.trim();
          }
          if (stderr && stderr.trim()) {
            output += (output ? '\nSTDERR:\n' : '') + stderr.trim();
          }
          if (error && error.code) {
            output += (output ? '\n' : '') + `Process exited with code ${error.code}`;
          }
          if (!output) {
            output = '(Command completed with no output)';
          }
          resolve(output);
        }
      );
    });
  },
};

export const searchFilesTool: Tool = {
  definition: {
    type: 'function',
    function: {
      name: 'search_files',
      description: 'Grep-like search across files for a text pattern or regex. Returns matching file paths and line numbers.',
      parameters: {
        type: 'object',
        properties: {
          pattern: {
            type: 'string',
            description: 'The search string or regular expression.',
          },
          directory: {
            type: 'string',
            description: 'Directory to search within. Defaults to current directory.',
          },
        },
        required: ['pattern'],
      },
    },
  },
  async execute({ pattern, directory = '.' }) {
    if (!pattern) return 'Error: pattern parameter is required';
    const dirDisplay = directory.endsWith('/') ? directory : `${directory}/`;
    notifyReadOnlyAction('search_files', `"${pattern}" in ${dirDisplay}`);

    const rootDir = resolveSafePath(directory);
    if (!fs.existsSync(rootDir)) {
      return `Error: Directory not found: ${directory}`;
    }

    const IGNORED_DIRS = new Set([
      'node_modules',
      '.git',
      '.bun',
      'dist',
      'build',
      '.next',
      '.cache',
      'coverage',
    ]);

    let regex: RegExp;
    try {
      regex = new RegExp(pattern, 'i');
    } catch {
      regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    }

    const matches: string[] = [];
    const MAX_MATCHES = 100;

    function walk(currentDir: string) {
      if (matches.length >= MAX_MATCHES) return;

      let entries: fs.Dirent[];
      try {
        entries = fs.readdirSync(currentDir, { withFileTypes: true });
      } catch {
        return;
      }

      for (const entry of entries) {
        if (matches.length >= MAX_MATCHES) break;

        const fullPath = path.join(currentDir, entry.name);
        if (entry.isDirectory()) {
          if (!IGNORED_DIRS.has(entry.name) && !entry.name.startsWith('.')) {
            walk(fullPath);
          }
        } else if (entry.isFile()) {
          // Skip known binary extensions
          const ext = path.extname(entry.name).toLowerCase();
          if (['.png', '.jpg', '.jpeg', '.gif', '.zip', '.tar', '.gz', '.pdf', '.exe', '.dll', '.bin'].includes(ext)) {
            continue;
          }

          try {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const lines = content.split('\n');
            for (let i = 0; i < lines.length; i++) {
              if (regex.test(lines[i])) {
                const relPath = path.relative(process.cwd(), fullPath);
                matches.push(`${relPath}:${i + 1}: ${lines[i].trim()}`);
                if (matches.length >= MAX_MATCHES) break;
              }
            }
          } catch {
            // Skip unreadable files
          }
        }
      }
    }

    walk(rootDir);

    if (matches.length === 0) {
      return `No matches found for pattern "${pattern}"`;
    }

    let result = matches.join('\n');
    if (matches.length >= MAX_MATCHES) {
      result += `\n(Truncated after ${MAX_MATCHES} matches)`;
    }
    return result;
  },
};

export const defaultTools: Tool[] = [
  readFileTool,
  writeFileTool,
  editFileTool,
  runShellCommandTool,
  searchFilesTool,
];
