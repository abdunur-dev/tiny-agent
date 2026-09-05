import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import {
  readFileTool,
  writeFileTool,
  editFileTool,
  runShellCommandTool,
  searchFilesTool,
} from '../src/tools.ts';
import {
  processAgentTurn,
  createInitialSystemPrompt,
  loadProjectContext,
  type AgentContext,
} from '../src/agent.ts';
import { loadSkills, parseSkillFrontmatter } from '../src/skills.ts';
import type { ModelAdapter, Message, ToolDefinition } from '../src/model.ts';

const TEST_DIR = path.join(os.tmpdir(), `tiny-agent-test-${Date.now()}`);

beforeEach(() => {
  fs.mkdirSync(TEST_DIR, { recursive: true });
});

afterEach(() => {
  try {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  } catch {}
});

describe('Phase 2 Tools', () => {
  it('read_file reads existing file and handles missing file with clear error', async () => {
    const filePath = path.join(TEST_DIR, 'sample.txt');
    fs.writeFileSync(filePath, 'Hello tiny-agent!', 'utf-8');

    const content = await readFileTool.execute({ path: filePath });
    expect(content).toBe('Hello tiny-agent!');

    const missing = await readFileTool.execute({ path: 'nonexistent-xyz.txt' });
    expect(missing).toContain("Error: file not found at path 'nonexistent-xyz.txt'");
  });

  it('read_file auto-resolves bare filename when unique in project', async () => {
    const content = await readFileTool.execute({ path: 'agent.ts' });
    expect(content).toContain('export function createInitialSystemPrompt');
  });

  it('write_file creates nested files with content', async () => {
    const filePath = path.join(TEST_DIR, 'nested', 'dir', 'output.txt');
    const result = await writeFileTool.execute({
      path: filePath,
      content: 'Line 1\nLine 2',
    });

    expect(result).toContain('Successfully wrote');
    expect(fs.existsSync(filePath)).toBe(true);
    expect(fs.readFileSync(filePath, 'utf-8')).toBe('Line 1\nLine 2');
  });

  it('edit_file handles single occurrence replacement and rejects non-unique', async () => {
    const filePath = path.join(TEST_DIR, 'edit.txt');
    fs.writeFileSync(filePath, 'const foo = 1;\nconst bar = 2;\n', 'utf-8');

    // Successful unique replacement
    const res1 = await editFileTool.execute({
      path: filePath,
      old_string: 'const foo = 1;',
      new_string: 'const foo = 42;',
    });
    expect(res1).toContain('Successfully edited');
    expect(fs.readFileSync(filePath, 'utf-8')).toContain('const foo = 42;');

    // Error on not found
    const res2 = await editFileTool.execute({
      path: filePath,
      old_string: 'not-here',
      new_string: 'something',
    });
    expect(res2).toContain('Error: old_string not found');

    // Error on multiple occurrences
    fs.writeFileSync(filePath, 'repeat\nrepeat\n', 'utf-8');
    const res3 = await editFileTool.execute({
      path: filePath,
      old_string: 'repeat',
      new_string: 'changed',
    });
    expect(res3).toContain('found 2 times');
  });

  it('run_shell_command executes shell commands', async () => {
    const cmd = process.platform === 'win32' ? 'cmd /c echo hello' : 'echo hello';
    const output = await runShellCommandTool.execute({ command: cmd });
    expect(output).toContain('hello');
  });

  it('search_files finds pattern matches with line numbers', async () => {
    const fileA = path.join(TEST_DIR, 'a.txt');
    const fileB = path.join(TEST_DIR, 'b.txt');
    fs.writeFileSync(fileA, 'first line\nneedle in a haystack\nthird line', 'utf-8');
    fs.writeFileSync(fileB, 'no match here', 'utf-8');

    const result = await searchFilesTool.execute({ pattern: 'needle', directory: TEST_DIR });
    expect(result).toContain('a.txt:2:');
    expect(result).toContain('needle in a haystack');
  });
});

describe('Phase 1 Core Agent Loop', () => {
  it('executes tool call, feeds result back, and completes with text', async () => {
    const testFile = path.join(TEST_DIR, 'test_agent.txt');
    fs.writeFileSync(testFile, 'agent content secret', 'utf-8');

    let callCount = 0;
    const streamedTokens: string[] = [];

    // Mock model that first requests read_file, then responds with summary
    const mockModel: ModelAdapter = {
      async chat(messages: Message[], tools: ToolDefinition[], onToken) {
        callCount++;
        if (callCount === 1) {
          // Model decides to call read_file
          return {
            content: null,
            tool_calls: [
              {
                id: 'call_test_1',
                type: 'function',
                function: {
                  name: 'read_file',
                  arguments: JSON.stringify({ path: testFile }),
                },
              },
            ],
          };
        } else {
          // Second turn: model sees tool result and responds with text
          const toolMsg = messages.find((m) => m.role === 'tool');
          expect(toolMsg).toBeDefined();
          expect((toolMsg as any).content).toBe('agent content secret');

          const responseText = 'I read the file and found: agent content secret';
          onToken?.(responseText);
          return {
            content: responseText,
          };
        }
      },
    };

    const ctx: AgentContext = {
      model: mockModel,
      tools: [readFileTool],
      history: [{ role: 'system', content: 'system prompt' }],
    };

    await processAgentTurn(ctx, 'Read test_agent.txt please', (token) => {
      streamedTokens.push(token);
    });

    expect(callCount).toBe(2);
    expect(streamedTokens.join('')).toBe('I read the file and found: agent content secret');
    // Verify history structure
    expect(ctx.history.length).toBe(5); // system, user, assistant(tool_calls), tool, assistant(text)
    expect(ctx.history[1].role).toBe('user');
    expect(ctx.history[2].role).toBe('assistant');
    expect((ctx.history[2] as any).tool_calls).toBeDefined();
    expect(ctx.history[3].role).toBe('tool');
    expect(ctx.history[4].role).toBe('assistant');
  });

  it('handles bare filename "agent.ts" in end-to-end turn and resolves file content', async () => {
    let callCount = 0;
    const outputTokens: string[] = [];

    const mockModel: ModelAdapter = {
      async chat(messages: Message[], tools: ToolDefinition[], onToken) {
        callCount++;
        if (callCount === 1) {
          // Model requests bare path 'agent.ts'
          return {
            content: null,
            tool_calls: [
              {
                id: 'call_bare_1',
                type: 'function',
                function: {
                  name: 'read_file',
                  arguments: JSON.stringify({ path: 'agent.ts' }),
                },
              },
            ],
          };
        } else {
          const toolMsg = messages.find((m) => m.role === 'tool');
          expect(toolMsg).toBeDefined();
          // Verify that tool received the content of src/agent.ts
          expect((toolMsg as any).content).toContain('createInitialSystemPrompt');

          const responseText = 'Successfully read agent.ts';
          onToken?.(responseText);
          return { content: responseText };
        }
      },
    };

    const ctx: AgentContext = {
      model: mockModel,
      tools: [readFileTool],
      history: [{ role: 'system', content: 'system prompt' }],
    };

    await processAgentTurn(ctx, 'read agent.ts', (token) => {
      outputTokens.push(token);
    });

    expect(callCount).toBe(2);
    expect(outputTokens.join('')).toBe('Successfully read agent.ts');
  });

  it('prints a clear warning and ends turn cleanly when model returns no tool calls and no content', async () => {
    const originalWrite = process.stdout.write;
    const stdoutChunks: string[] = [];
    process.stdout.write = (chunk: any) => {
      stdoutChunks.push(String(chunk));
      return true;
    };

    let chatCalled = false;
    const mockModel: ModelAdapter = {
      async chat() {
        chatCalled = true;
        return {
          content: null,
          tool_calls: undefined,
        };
      },
    };

    const ctx: AgentContext = {
      model: mockModel,
      tools: [readFileTool],
      history: [{ role: 'system', content: 'system prompt' }],
    };

    try {
      await processAgentTurn(ctx, 'Perform a complex nested json edit', () => {});

      expect(chatCalled).toBe(true);
      const text = stdoutChunks.join('');
      expect(text).toContain(
        "⚠ The model didn't return a response or take an action. Try rephrasing your request or breaking it into smaller steps."
      );
      // Ensure user prompt was added, but no empty assistant message was appended
      expect(ctx.history.length).toBe(2); // system, user
      expect(ctx.history[1]).toEqual({
        role: 'user',
        content: 'Perform a complex nested json edit',
      });
    } finally {
      process.stdout.write = originalWrite;
    }
  });
});

describe('Risky Actions Confirmation', () => {
  it('requests confirmation before write_file, edit_file, and run_shell_command', async () => {
    const requestedConfirmations: string[] = [];
    const testFile = path.join(TEST_DIR, 'confirm_test.txt');

    const toolsToTest = [
      { name: 'write_file', args: { path: testFile, content: 'initial content' } },
      { name: 'edit_file', args: { path: testFile, old_string: 'initial', new_string: 'updated' } },
      { name: 'run_shell_command', args: { command: 'echo test' } },
    ];

    for (const item of toolsToTest) {
      let callCount = 0;
      const mockModel: ModelAdapter = {
        async chat(messages: Message[]) {
          callCount++;
          if (callCount === 1) {
            return {
              content: null,
              tool_calls: [
                {
                  id: `call_${item.name}`,
                  type: 'function',
                  function: {
                    name: item.name,
                    arguments: JSON.stringify(item.args),
                  },
                },
              ],
            };
          }
          return { content: 'done' };
        },
      };

      const ctx: AgentContext = {
        model: mockModel,
        tools: [writeFileTool, editFileTool, runShellCommandTool],
        history: [{ role: 'system', content: 'test' }],
        confirmAction: async (action) => {
          requestedConfirmations.push(action.toolName);
          return true; // approve
        },
      };

      await processAgentTurn(ctx, 'do action', () => {});
    }

    expect(requestedConfirmations).toEqual(['write_file', 'edit_file', 'run_shell_command']);
  });

  it('declining a confirmation prevents execution and returns decline message to model', async () => {
    const targetFile = path.join(TEST_DIR, 'declined_file.txt');
    let toolResultReceived = '';

    const mockModel: ModelAdapter = {
      async chat(messages: Message[]) {
        if (messages.length === 2) {
          return {
            content: null,
            tool_calls: [
              {
                id: 'call_write_decline',
                type: 'function',
                function: {
                  name: 'write_file',
                  arguments: JSON.stringify({ path: targetFile, content: 'should not exist' }),
                },
              },
            ],
          };
        }
        const toolMsg = messages.find((m) => m.role === 'tool');
        if (toolMsg) {
          toolResultReceived = (toolMsg as any).content;
        }
        return { content: 'Understood, not writing.' };
      },
    };

    let confirmWasCalled = false;
    const ctx: AgentContext = {
      model: mockModel,
      tools: [writeFileTool],
      history: [{ role: 'system', content: 'test' }],
      confirmAction: async (action) => {
        confirmWasCalled = true;
        expect(action.toolName).toBe('write_file');
        expect(action.detail).toContain('write_file:');
        expect(action.preview).toContain('should not exist');
        return false; // DECLINE
      },
    };

    await processAgentTurn(ctx, 'write declined file', () => {});

    expect(confirmWasCalled).toBe(true);
    // File must NOT have been written to disk
    expect(fs.existsSync(targetFile)).toBe(false);
    // Declined message must be sent back to model
    expect(toolResultReceived).toBe(
      "User declined this action. Do not retry the same action; ask the user what they'd like to do instead."
    );
  });

  it('--yolo / autoApprove flag skips confirmation entirely', async () => {
    const targetFile = path.join(TEST_DIR, 'yolo_file.txt');
    let confirmWasCalled = false;

    const mockModel: ModelAdapter = {
      async chat(messages: Message[]) {
        if (messages.length === 2) {
          return {
            content: null,
            tool_calls: [
              {
                id: 'call_yolo',
                type: 'function',
                function: {
                  name: 'write_file',
                  arguments: JSON.stringify({ path: targetFile, content: 'yolo content' }),
                },
              },
            ],
          };
        }
        return { content: 'written without prompt' };
      },
    };

    const ctx: AgentContext = {
      model: mockModel,
      tools: [writeFileTool],
      history: [{ role: 'system', content: 'test' }],
      autoApprove: true,
      confirmAction: async () => {
        confirmWasCalled = true;
        return true;
      },
    };

    await processAgentTurn(ctx, 'write yolo file', () => {});

    expect(confirmWasCalled).toBe(false);
    expect(fs.existsSync(targetFile)).toBe(true);
    expect(fs.readFileSync(targetFile, 'utf-8')).toBe('yolo content');
  });

  it('read_file and search_files never trigger confirmation', async () => {
    const sampleFile = path.join(TEST_DIR, 'safe_file.txt');
    fs.writeFileSync(sampleFile, 'safe content', 'utf-8');

    let confirmCalls = 0;

    const safeToolsToTest = [
      { name: 'read_file', args: { path: sampleFile } },
      { name: 'search_files', args: { pattern: 'safe', directory: TEST_DIR } },
    ];

    for (const item of safeToolsToTest) {
      const mockModel: ModelAdapter = {
        async chat(messages: Message[]) {
          if (messages.length === 2) {
            return {
              content: null,
              tool_calls: [
                {
                  id: `call_${item.name}`,
                  type: 'function',
                  function: {
                    name: item.name,
                    arguments: JSON.stringify(item.args),
                  },
                },
              ],
            };
          }
          return { content: 'safe response' };
        },
      };

      const ctx: AgentContext = {
        model: mockModel,
        tools: [readFileTool, searchFilesTool],
        history: [{ role: 'system', content: 'test' }],
        confirmAction: async () => {
          confirmCalls++;
          return true;
        },
      };

      await processAgentTurn(ctx, 'read or search', () => {});
    }

    // Confirmation must never be invoked for read-only tools
    expect(confirmCalls).toBe(0);
  });
});

describe('Skills System', () => {
  it('silently ignores missing skills directory and leaves system prompt unchanged', () => {
    const emptyDir = path.join(TEST_DIR, 'no_skills_project');
    fs.mkdirSync(emptyDir, { recursive: true });

    const skills = loadSkills(emptyDir);
    expect(skills).toEqual([]);

    const promptWithoutSkills = createInitialSystemPrompt([], emptyDir);
    expect(promptWithoutSkills).not.toContain('Available skills');
    expect(promptWithoutSkills).toContain('You are a fast, concise terminal-based coding assistant');
  });

  it('parses skill frontmatter name and description and injects short list into system prompt', () => {
    const projectDir = path.join(TEST_DIR, 'skills_project');
    const commitSkillDir = path.join(projectDir, '.tiny-agent', 'skills', 'commit-messages');
    const apiSkillDir = path.join(projectDir, '.tiny-agent', 'skills', 'api-routes');

    fs.mkdirSync(commitSkillDir, { recursive: true });
    fs.mkdirSync(apiSkillDir, { recursive: true });

    const commitContent = `---
name: commit-messages
description: How to write conventional commit messages for this project.
---

# Commit Rules
Detailed markdown instructions here that should NOT be in the system prompt.
`;

    const apiContent = `---
name: api-routes
description: Standards for Next.js and Bun route handlers.
---

# API Rules
Deep instructions here that should NOT be loaded until read_file is called.
`;

    fs.writeFileSync(path.join(commitSkillDir, 'SKILL.md'), commitContent, 'utf-8');
    fs.writeFileSync(path.join(apiSkillDir, 'SKILL.md'), apiContent, 'utf-8');

    const skills = loadSkills(projectDir);
    expect(skills.length).toBe(2);

    const names = skills.map((s) => s.name);
    expect(names).toContain('commit-messages');
    expect(names).toContain('api-routes');

    const commitSkill = skills.find((s) => s.name === 'commit-messages');
    expect(commitSkill?.description).toBe('How to write conventional commit messages for this project.');

    const prompt = createInitialSystemPrompt(skills, projectDir);
    expect(prompt).toContain(
      'Available skills (read the full file with read_file if one seems relevant to the current task):'
    );
    expect(prompt).toContain(
      '- commit-messages (.tiny-agent/skills/commit-messages/SKILL.md): How to write conventional commit messages for this project.'
    );
    expect(prompt).toContain(
      '- api-routes (.tiny-agent/skills/api-routes/SKILL.md): Standards for Next.js and Bun route handlers.'
    );
    expect(prompt).toContain(
      'If a task matches one of the available skills, use read_file to inspect its SKILL.md before proceeding.'
    );

    // Crucial: make sure full file contents were NOT loaded into system prompt
    expect(prompt).not.toContain('Detailed markdown instructions here');
    expect(prompt).not.toContain('Deep instructions here');
  });

  it('loads example testing skill from repo', () => {
    const skills = loadSkills(process.cwd());
    const testingSkill = skills.find((s) => s.name === 'testing');
    expect(testingSkill).toBeDefined();
    expect(testingSkill?.description).toContain('Bun test runner');
  });
});

describe('Read-Only Tool Visibility', () => {
  it('prints dimmed status line when read_file is executed', async () => {
    const originalWrite = process.stdout.write;
    const output: string[] = [];
    process.stdout.write = (chunk: any) => {
      output.push(String(chunk));
      return true;
    };

    try {
      const filePath = path.join(TEST_DIR, 'visible_read.txt');
      fs.writeFileSync(filePath, 'Visibility content', 'utf-8');

      await readFileTool.execute({ path: filePath });

      const text = output.join('');
      expect(text).toContain('↳ read_file:');
      expect(text).toContain(filePath);
    } finally {
      process.stdout.write = originalWrite;
    }
  });

  it('prints dimmed status line when search_files is executed', async () => {
    const originalWrite = process.stdout.write;
    const output: string[] = [];
    process.stdout.write = (chunk: any) => {
      output.push(String(chunk));
      return true;
    };

    try {
      await searchFilesTool.execute({ pattern: 'TODO', directory: 'src/' });

      const text = output.join('');
      expect(text).toContain('↳ search_files:');
      expect(text).toContain('"TODO" in src/');
    } finally {
      process.stdout.write = originalWrite;
    }
  });

  it('executes read_file and search_files immediately without confirmation during agent turn', async () => {
    const originalWrite = process.stdout.write;
    const output: string[] = [];
    process.stdout.write = (chunk: any) => {
      output.push(String(chunk));
      return true;
    };

    let confirmCalls = 0;
    const filePath = path.join(TEST_DIR, 'turn_read.txt');
    fs.writeFileSync(filePath, 'Agent turn visibility test', 'utf-8');

    let step = 0;
    const mockModel: ModelAdapter = {
      async chat(messages, tools, onStream) {
        step++;
        if (step === 1) {
          return {
            content: null,
            tool_calls: [
              {
                id: 'call_read',
                type: 'function',
                function: {
                  name: 'read_file',
                  arguments: JSON.stringify({ path: filePath }),
                },
              },
            ],
          };
        }
        if (step === 2) {
          return {
            content: null,
            tool_calls: [
              {
                id: 'call_search',
                type: 'function',
                function: {
                  name: 'search_files',
                  arguments: JSON.stringify({ pattern: 'Agent', directory: TEST_DIR }),
                },
              },
            ],
          };
        }
        return { content: 'Completed inspection.' };
      },
    };

    const ctx: AgentContext = {
      model: mockModel,
      tools: [readFileTool, searchFilesTool],
      history: [{ role: 'system', content: 'test' }],
      confirmAction: async () => {
        confirmCalls++;
        return true;
      },
    };

    try {
      await processAgentTurn(ctx, 'Inspect files', () => {});

      // Instant execution: no confirmation prompts
      expect(confirmCalls).toBe(0);

      // Status lines printed for both read-only calls
      const text = output.join('');
      expect(text).toContain('↳ read_file:');
      expect(text).toContain(filePath);
      expect(text).toContain('↳ search_files:');
      expect(text).toContain('"Agent" in');
    } finally {
      process.stdout.write = originalWrite;
    }
  });
});

describe('Project Context (AGENTS.md)', () => {
  it('silently skips when AGENTS.md does not exist and keeps system prompt unchanged', () => {
    const emptyDir = path.join(TEST_DIR, 'no_agents_md');
    fs.mkdirSync(emptyDir, { recursive: true });

    const context = loadProjectContext(emptyDir);
    expect(context).toBeNull();

    const prompt = createInitialSystemPrompt([], emptyDir, null);
    expect(prompt).not.toContain('Project-specific instructions (from AGENTS.md)');
    expect(prompt).toContain('You are a fast, concise terminal-based coding assistant');
  });

  it('loads and appends AGENTS.md content to the system prompt when present', () => {
    const projectDir = path.join(TEST_DIR, 'agents_md_project');
    fs.mkdirSync(projectDir, { recursive: true });

    const instructions = `- This project uses Bun, not Node or npm.\n- Source files are in src/. Tests are in test/.\n- Keep terminal output minimal and shell-like.`;
    fs.writeFileSync(path.join(projectDir, 'AGENTS.md'), instructions, 'utf-8');

    const context = loadProjectContext(projectDir);
    expect(context).not.toBeNull();
    expect(context?.truncated).toBe(false);
    expect(context?.content).toBe(instructions);

    const prompt = createInitialSystemPrompt([], projectDir, context?.content);
    expect(prompt).toContain('Project-specific instructions (from AGENTS.md):');
    expect(prompt).toContain(instructions);
  });

  it('enforces 10,000 character size guard and flags truncated when exceeding limit', () => {
    const projectDir = path.join(TEST_DIR, 'large_agents_md_project');
    fs.mkdirSync(projectDir, { recursive: true });

    const hugeContent = 'A'.repeat(12500);
    fs.writeFileSync(path.join(projectDir, 'AGENTS.md'), hugeContent, 'utf-8');

    const context = loadProjectContext(projectDir, 10000);
    expect(context).not.toBeNull();
    expect(context?.truncated).toBe(true);
    expect(context?.content).toContain('[... truncated: AGENTS.md exceeded 10,000 characters]');
    // Verify first 10,000 characters preserved
    expect(context?.content.startsWith('A'.repeat(10000))).toBe(true);
  });

  it('loads repo-level AGENTS.md instructions', () => {
    const context = loadProjectContext(process.cwd());
    expect(context).not.toBeNull();
    expect(context?.content).toContain('This project uses Bun, not Node or npm.');
    expect(context?.content).toContain('Keep terminal output minimal and shell-like');
  });
});



