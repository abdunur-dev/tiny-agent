#!/usr/bin/env bun
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { resolveRuntimeConfig } from './config.ts';
import { createOpenAIAdapter } from './model.ts';
import { defaultTools } from './tools.ts';
import {
  processAgentTurn,
  createInitialSystemPrompt,
  loadProjectContext,
  type AgentContext,
} from './agent.ts';
import { loadSkills } from './skills.ts';

function printHelp() {
  console.log(`
\x1b[1mtiny-agent\x1b[0m - Minimal, fast terminal coding agent CLI

\x1b[1mUSAGE:\x1b[0m
  tiny-agent [options]
  tiny-agent [options] "your prompt here"

\x1b[1mOPTIONS:\x1b[0m
  --local               Use local Ollama model (offline)
  --cloud               Use cloud Groq model
  --model <name>        Override default model name
  --yolo, --auto-approve Skip confirmation prompts for write/edit/shell actions
  -h, --help            Show this help message

\x1b[1mCOMMANDS (in REPL):\x1b[0m
  /clear          Reset conversation history
  exit, quit      Exit the agent
`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('-h') || args.includes('--help')) {
    printHelp();
    process.exit(0);
  }

  const autoApprove = args.includes('--yolo') || args.includes('--auto-approve');
  if (autoApprove) {
    process.stdout.write(
      '\x1b[33m⚠ Running in auto-approve mode — all actions will execute without confirmation.\x1b[0m\n\n'
    );
  }

  // Filter out flags to see if a one-shot query was provided
  const nonFlagArgs: string[] = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--local' || args[i] === '--cloud') continue;
    if (args[i] === '--yolo' || args[i] === '--auto-approve') continue;
    if (args[i] === '--model') {
      i++; // skip value
      continue;
    }
    nonFlagArgs.push(args[i]);
  }

  let runtimeConfig;
  try {
    runtimeConfig = await resolveRuntimeConfig(args);
  } catch (err: any) {
    console.error(`\x1b[31mConfiguration error:\x1b[0m ${err.message}`);
    process.exit(1);
  }

  const modelAdapter = createOpenAIAdapter({
    baseURL: runtimeConfig.baseURL,
    apiKey: runtimeConfig.apiKey,
    model: runtimeConfig.model,
  });

  const skills = loadSkills();
  const projectContext = loadProjectContext();

  const ctx: AgentContext = {
    model: modelAdapter,
    tools: defaultTools,
    history: [
      {
        role: 'system',
        content: createInitialSystemPrompt(skills, process.cwd(), projectContext?.content),
      },
    ],
    autoApprove,
  };

  function printStartupStatus() {
    if (projectContext) {
      if (projectContext.truncated) {
        process.stdout.write(
          '\x1b[33m⚠ AGENTS.md exceeds 10,000 characters; truncated.\x1b[0m\n'
        );
      }
      process.stdout.write('\x1b[90m↳ loaded AGENTS.md (project context)\x1b[0m\n');
    }
    if (skills.length > 0) {
      const skillNames = skills.map((s) => s.name).join(', ');
      process.stdout.write(
        `\x1b[90m↳ found ${skills.length} skill${skills.length === 1 ? '' : 's'} (${skillNames})\x1b[0m\n`
      );
    }
  }

  const isOneShot = nonFlagArgs.length > 0;

  if (isOneShot) {
    printStartupStatus();
    const prompt = nonFlagArgs.join(' ');
    try {
      await processAgentTurn(ctx, prompt, (token) => {
        process.stdout.write(token);
      });
    } catch (err: any) {
      console.error(`\x1b[31mError:\x1b[0m ${err.message}`);
      process.exit(1);
    }
    process.exit(0);
  }

  // Shell-like welcome banner
  process.stdout.write(
    `\x1b[90m[tiny-agent] provider=\x1b[36m${runtimeConfig.provider}\x1b[90m model=\x1b[36m${runtimeConfig.model}\x1b[90m endpoint=\x1b[36m${runtimeConfig.baseURL}\x1b[0m\n`
  );
  printStartupStatus();
  process.stdout.write(`\x1b[90mType /clear to reset, Ctrl+C or exit to quit.\x1b[0m\n\n`);

  const rl = readline.createInterface({
    input,
    output,
    terminal: true,
  });

  const promptSymbol = `\x1b[90m[${runtimeConfig.provider}/${runtimeConfig.model}]\x1b[0m \x1b[32m❯\x1b[0m `;

  while (true) {
    try {
      const line = await rl.question(promptSymbol);
      const trimmed = line.trim();

      if (!trimmed) continue;
      if (trimmed === 'exit' || trimmed === 'quit') {
        break;
      }
      if (trimmed === '/clear') {
        ctx.history = [
          {
            role: 'system',
            content: createInitialSystemPrompt(skills, process.cwd(), projectContext?.content),
          },
        ];
        console.log('\x1b[90m(History cleared)\x1b[0m');
        continue;
      }

      await processAgentTurn(ctx, trimmed, (token) => {
        process.stdout.write(token);
      });
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        break;
      }
      console.error(`\n\x1b[31mError:\x1b[0m ${err.message}\n`);
    }
  }

  rl.close();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
