---
name: testing
description: How to write and run tests in this project using Bun test runner and mock adapters.
---

# Testing in tiny-agent

## Running Tests
Run the full test suite using Bun's built-in test runner:

```bash
bun test
```

## Test Structure
- `test/agent.test.ts`: End-to-end agent loop tests, tool execution, safety confirmation steps, auto-approve flag, and skill discovery.
- `test/model.test.ts`: SSE streaming parser tests, chunk accumulation, and model adapter configurations.

## Adding Tests
1. Use `describe` and `it` blocks from `bun:test`.
2. For agent tests, provide mock `ModelAdapter` implementations returning function calls and tokens.
3. For file operations, create isolated temporary directories with `fs.mkdtempSync` and clean them up in `afterAll`.
