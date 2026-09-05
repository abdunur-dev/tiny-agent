# tiny-agent

A minimal, fast, terminal-based coding agent CLI in TypeScript running on [Bun](https://bun.sh). Inspired by the Unix philosophy of [`fx.sh`](https://github.com/metoro-io/fx), `tiny-agent` addresses the local-model gap by providing full offline execution via Ollama, fine-grained safety confirmations, and Model Context Protocol (MCP) support with zero framework bloat.

## Features

- **Local & Cloud Inference**: Run 100% offline and private via **Ollama** (e.g. `qwen2.5-coder`), or use high-speed cloud inference via **Groq**.
- **No Heavy Frameworks**: Core agent loop is hand-written TypeScript (< 100 lines) with zero LangChain or complex abstractions.
- **Granular Safety Policy**: Safe tools (`read_file`, `search_files`) run instantly. State-changing actions (`write_file`, `edit_file`, `run_shell_command`) pause for interactive confirmation with diff and argument previews.
- **Model Context Protocol (MCP)**: Plug in external tools via standard MCP server configs.
- **Project Context (AGENTS.md)**: Automatically loads project guidelines into the system prompt with size protection.
- **Modular Skills**: Drop task-specific instructions into `.tiny-agent/skills/<name>/SKILL.md`.
- **Fast Startup**: Sub-10ms runtime startup powered by Bun.

---

## Installation

### With Bun (Recommended)
```bash
bun install -g tiny-agent
```

### With npm
```bash
npm install -g tiny-agent
```
> **Note**: `tiny-agent` requires the [Bun runtime](https://bun.sh) (`bun`) installed on your system to execute.

### From Source
```bash
git clone https://github.com/abdunur-dev/tiny-agent.git
cd tiny-agent
bun install
bun run src/index.ts
```

---

## Usage

### Interactive REPL Mode
Start an interactive pair-programming session in your terminal:
```bash
tiny-agent
```

### One-Shot Command
Pass instructions directly as arguments:
```bash
tiny-agent "inspect package.json and list all test dependencies"
tiny-agent "refactor the error handler in src/server.ts"
```

### Provider Flags
```bash
# Force local Ollama (100% offline, private)
tiny-agent --local "find and fix memory leaks in src/cache.ts"

# Force cloud Groq inference
tiny-agent --cloud "summarize current git status"

# Override model on the fly
tiny-agent --model qwen2.5-coder:32b "review recent changes"
```

### Scripting with Auto-Approve (--yolo)
By default, risky operations (`write_file`, `edit_file`, `run_shell_command`) show a preview and pause for `Proceed? (y/n):` approval. For headless CI/CD scripts or Docker containers, pass `--yolo` (or `--auto-approve`):
```bash
tiny-agent --yolo "run linter and format all files"
```

---

## Configuration & MCP Servers

On first run, `tiny-agent` creates `~/.tiny-agent/config.json`. You can customize models, endpoints, and configure external tools via the **Model Context Protocol (MCP)**:

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
  },
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./data.db"]
    }
  }
}
```

Tools exposed by connected MCP servers automatically appear in the agent's toolbelt and follow safety confirmation policies.

---

## Inspiration & Differences from fx.sh

`tiny-agent` is inspired by the lightweight, shell-native spirit of [`fx.sh`](https://github.com/metoro-io/fx). However, it directly addresses several architectural limitations:

1. **Local Model Support**: `fx.sh` lacks a native local-model path and relies on cloud endpoints. `tiny-agent` provides full offline support via local Ollama instances with no external network requests.
2. **Action Verification**: Rather than prompting only on bash commands, `tiny-agent` differentiates read-only inspection from state mutations, showing line-by-line diffs before touching disk.
3. **Ecosystem Compatibility**: Includes native MCP client support and structured project instructions (`AGENTS.md`).

---

## Development

```bash
# Run unit and integration tests
bun test

# Build standalone compiled binary
bun run build
# Creates ./dist/tiny-agent (or ./dist/tiny-agent.exe on Windows)
```

## License

[MIT](LICENSE) © 2026 Abdurhaman Nur
