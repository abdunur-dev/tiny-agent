import * as readline from 'node:readline/promises';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type { Message, ModelAdapter } from './model.ts';
import type { Tool } from './tools.ts';
import { formatSkillsPrompt, type SkillMetadata } from './skills.ts';

export interface ActionConfirmation {
  toolName: string;
  args: Record<string, any>;
  detail: string;
  preview?: string;
}

export interface AgentContext {
  model: ModelAdapter;
  tools: Tool[];
  history: Message[];
  autoApprove?: boolean;
  confirmAction?: (action: ActionConfirmation) => Promise<boolean>;
}

export const RISKY_TOOLS = new Set(['write_file', 'edit_file', 'run_shell_command']);

export function getActionConfirmation(
  toolName: string,
  args: Record<string, any>,
  tool?: Tool
): ActionConfirmation | null {
  // Safe built-in tools never require confirmation
  if (toolName === 'read_file' || toolName === 'search_files') {
    return null;
  }

  // Proven read-only tools never require confirmation
  if (tool?.isReadOnly === true) {
    return null;
  }

  if (toolName === 'write_file') {
    const filePath = args.path || 'unknown';
    const content = typeof args.content === 'string' ? args.content : '';
    const lines = content.split('\n');
    let preview: string;
    if (lines.length <= 6) {
      preview = lines.map((l) => `  | ${l}`).join('\n');
    } else {
      preview =
        lines.slice(0, 5).map((l) => `  | ${l}`).join('\n') +
        `\n  | ... (${lines.length - 5} more lines, ${content.length} characters total)`;
    }
    return {
      toolName,
      args,
      detail: `write_file: ${filePath}`,
      preview,
    };
  }

  if (toolName === 'edit_file') {
    const filePath = args.path || 'unknown';
    const oldStr = typeof args.old_string === 'string' ? args.old_string : '';
    const newStr = typeof args.new_string === 'string' ? args.new_string : '';
    const preview = `  \x1b[31m- ${oldStr}\x1b[0m\n  \x1b[32m+ ${newStr}\x1b[0m`;
    return {
      toolName,
      args,
      detail: `edit_file: ${filePath}`,
      preview,
    };
  }

  if (toolName === 'run_shell_command') {
    const command = args.command || '';
    return {
      toolName,
      args,
      detail: `run_shell_command: ${command}`,
    };
  }

  // Any other tool (including MCP tools) requires confirmation unless proven read-only
  const argKeys = Object.keys(args || {});
  let preview: string | undefined;
  if (argKeys.length > 0) {
    preview = JSON.stringify(args, null, 2)
      .split('\n')
      .map((l) => `  ${l}`)
      .join('\n');
  }

  return {
    toolName,
    args,
    detail: `${toolName}${argKeys.length > 0 ? `: ${JSON.stringify(args)}` : ''}`,
    preview,
  };
}

export async function defaultTerminalConfirm(
  action: ActionConfirmation
): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  process.stdout.write(
    `\n\x1b[90m⚡ Action confirmation:\x1b[0m \x1b[37m${action.detail}\x1b[0m\n`
  );
  if (action.preview) {
    process.stdout.write(`\x1b[90m${action.preview}\x1b[0m\n`);
  }
  const answer = (await rl.question(`\x1b[1mProceed? (y/n):\x1b[0m `)).trim().toLowerCase();
  rl.close();
  return answer === 'y' || answer === 'yes';
}

export interface ProjectContext {
  content: string;
  truncated: boolean;
}

export function loadProjectContext(
  rootDir: string = process.cwd(),
  maxChars: number = 10000
): ProjectContext | null {
  const filePath = path.join(rootDir, 'AGENTS.md');
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const trimmed = rawContent.trim();
    if (!trimmed) {
      return null;
    }

    if (trimmed.length > maxChars) {
      return {
        content: trimmed.slice(0, maxChars) + '\n\n[... truncated: AGENTS.md exceeded 10,000 characters]',
        truncated: true,
      };
    }

    return {
      content: trimmed,
      truncated: false,
    };
  } catch {
    return null;
  }
}

export function createInitialSystemPrompt(
  skills: SkillMetadata[] = [],
  baseDir: string = process.cwd(),
  projectContext?: string | null
): string {
  let prompt = (
    `You are a fast, concise terminal-based coding assistant running in Bun.\n` +
    `Current directory: ${process.cwd()}\n` +
    `Platform: ${process.platform}\n` +
    `Guidelines:\n` +
    `- Be direct, minimal, and shell-like. Avoid fluff and long pleasantries.\n` +
    `- Project source files typically live under src/ (e.g. src/agent.ts, src/tools.ts). Always check src/<file> or relative paths before falling back to shell commands.\n` +
    `- When the user asks you to read, view, show, or open a file, you MUST call the read_file tool immediately — do not ask clarifying questions first, and do not claim to have shown file contents unless you actually called read_file and are including its real output in your response. Always include the actual file content (or a clear summary of it) in your reply after reading.\n` +
    `- Code blocks: When outputting code blocks with triple backticks (\`\`\`), ALWAYS ensure there is a blank line before and after the code block so that code is visually separated from explanations.\n` +
    `- Use the available tools to inspect files, edit files, and run commands.\n` +
    `- Before modifying a file, read it first to get the exact lines to edit.`
  );

  if (projectContext && projectContext.trim().length > 0) {
    prompt += `\n\nProject-specific instructions (from AGENTS.md):\n${projectContext.trim()}`;
  }

  if (skills && skills.length > 0) {
    prompt += formatSkillsPrompt(skills, baseDir);
  }

  return prompt;
}

export async function processAgentTurn(
  ctx: AgentContext,
  userInput: string,
  onStreamText: (chunk: string) => void
): Promise<void> {
  ctx.history.push({ role: 'user', content: userInput });

  const toolDefinitions = ctx.tools.map((t) => t.definition);
  const toolMap = new Map<string, Tool>(
    ctx.tools.map((t) => [t.definition.function.name, t])
  );

  while (true) {
    let textStarted = false;

    const response = await ctx.model.chat(ctx.history, toolDefinitions, (token) => {
      if (!textStarted) {
        textStarted = true;
        // Blank line before assistant output begins for visual separation
        process.stdout.write('\n');
      }
      onStreamText(token);
    });

    if (textStarted && response.content) {
      process.stdout.write('\n');
    }

    // If no tool calls were requested, turn is complete
    if (!response.tool_calls || response.tool_calls.length === 0) {
      if (response.content && response.content.trim().length > 0) {
        ctx.history.push({ role: 'assistant', content: response.content });
      } else {
        process.stdout.write(
          `\x1b[33m⚠ The model didn't return a response or take an action. Try rephrasing your request or breaking it into smaller steps.\x1b[0m\n`
        );
      }
      break;
    }

    // Save assistant message containing the tool calls
    ctx.history.push({
      role: 'assistant',
      content: response.content,
      tool_calls: response.tool_calls,
    });

    // Execute each tool call and feed result back into history
    for (const call of response.tool_calls) {
      const tool = toolMap.get(call.function.name);
      let output: string;

      if (!tool) {
        output = `Error: Tool "${call.function.name}" not found.`;
      } else {
        try {
          let args: Record<string, any> = {};
          if (call.function.arguments && call.function.arguments.trim().length > 0) {
            args = JSON.parse(call.function.arguments);
          }

          // Check if this tool requires user confirmation
          const confirmation = getActionConfirmation(call.function.name, args, tool);
          let isApproved = true;

          if (confirmation && !ctx.autoApprove) {
            const confirmFn = ctx.confirmAction || defaultTerminalConfirm;
            isApproved = await confirmFn(confirmation);
          }

          if (!isApproved) {
            output =
              "User declined this action. Do not retry the same action; ask the user what they'd like to do instead.";
            process.stdout.write(
              `  \x1b[33m⚠\x1b[0m \x1b[90mAction declined by user\x1b[0m\n`
            );
          } else {
            output = await tool.execute(args);
          }
        } catch (err: any) {
          output = `Error: ${err.message}`;
        }
      }

      // Format tool errors visually in the terminal with a distinct red prefix
      if (output.startsWith('Error:')) {
        process.stdout.write(`  \x1b[31m✗\x1b[0m \x1b[90m${output}\x1b[0m\n`);
      }

      ctx.history.push({
        role: 'tool',
        tool_call_id: call.id,
        content: output,
      });
    }
  }
}
