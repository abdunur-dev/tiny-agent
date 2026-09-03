# tiny-agent

A minimal, fast, terminal-based coding agent CLI in TypeScript running on [Bun](https://bun.sh). Built as a small alternative to `fx.sh` with zero agent frameworks, shell-like output, and instant startup.

## Features

- **Dual Mode**: Seamlessly switch between local models via **Ollama** (offline, private) and cloud models via **Groq** (instant, powerful).
- **Zero Agent Frameworks**: Hand-written, minimal core agent loop (< 100 lines).
- **Streaming & Function Calling**: Native SSE streaming parser that accumulates partial tool call chunks over OpenAI-compatible endpoints.
- **5 Essential Tools**:
  - `read_file`: Inspect file contents
  - `write_file`: Create or overwrite files (with auto-directory creation)
  - `edit_file`: Exact unique string find-and-replace
  - `run_shell_command`: Execute shell commands with output and timeout
  - `search_files`: Fast recursive file pattern / regex search with line numbers
- **Project Instructions (AGENTS.md)**: Automatically loads project-level rules from `AGENTS.md` in the current directory into the system prompt with 10k-character truncation protection.
- **Lightweight Skills**: Define project skills under `.tiny-agent/skills/<name>/SKILL.md` with YAML frontmatter. Only metadata is injected into the system prompt; the model calls `read_file` when relevant.
- **Standalone Binary**: Compiles into a single binary via `bun build --compile`.

## Quick Start

### 1. Install & Run
```bash
cd tiny-agent

# Run REPL directly with Bun
bun run src/index.ts

# Or pass a one-shot prompt
bun run src/index.ts "Inspect package.json and summarize its scripts"
```

### 2. Provider & Safety Flags
```bash
# Force local Ollama (offline)
bun run src/index.ts --local

# Force cloud Groq
bun run src/index.ts --cloud

# Override model on the fly
bun run src/index.ts --model qwen2.5-coder:7b

# Skip confirmation prompts for scripted workflows
bun run src/index.ts --yolo
```

### 3. Compile to Standalone Binary
```bash
bun run build
# Creates ./dist/tiny-agent (or ./dist/tiny-agent.exe on Windows)
```

## Configuration

On first run, `tiny-agent` prompts you to pick your default provider and saves settings to `~/.tiny-agent/config.json`:

```json
{
  "defaultProvider": "ollama",
  "ollama": {
    "baseURL": "http://localhost:11434/v1",
    "model": "qwen2.5-coder:latest"
  },
  "groq": {
    "baseURL": "https://api.groq.com/openai/v1",
    "model": "openai/gpt-oss-120b",
    "apiKey": ""
  }
}
```
You can also set `GROQ_API_KEY` in your environment.
