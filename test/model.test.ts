import { describe, it, expect } from 'bun:test';
import { createOpenAIAdapter } from '../src/model.ts';

describe('Phase 3 Model Adapter', () => {
  it('streams text completion correctly via SSE', async () => {
    // Spin up local mock OpenAI-compatible server using Bun.serve
    const server = Bun.serve({
      port: 0, // random available port
      fetch(req) {
        const stream = new ReadableStream({
          start(controller) {
            const chunks = [
              'data: {"choices":[{"delta":{"content":"Hello "}}]}\n\n',
              'data: {"choices":[{"delta":{"content":"world!"}}]}\n\n',
              'data: [DONE]\n\n',
            ];
            for (const chunk of chunks) {
              controller.enqueue(new TextEncoder().encode(chunk));
            }
            controller.close();
          },
        });

        return new Response(stream, {
          headers: { 'Content-Type': 'text/event-stream' },
        });
      },
    });

    const adapter = createOpenAIAdapter({
      baseURL: `http://localhost:${server.port}/v1`,
      apiKey: 'test-key',
      model: 'test-model',
    });

    const streamedTokens: string[] = [];
    const response = await adapter.chat(
      [{ role: 'user', content: 'hi' }],
      [],
      (token) => streamedTokens.push(token)
    );

    server.stop(true);

    expect(response.content).toBe('Hello world!');
    expect(streamedTokens.join('')).toBe('Hello world!');
    expect(response.tool_calls).toBeUndefined();
  });

  it('accumulates streamed tool calls properly across chunks', async () => {
    const server = Bun.serve({
      port: 0,
      fetch(req) {
        const stream = new ReadableStream({
          start(controller) {
            const chunks = [
              'data: {"choices":[{"delta":{"tool_calls":[{"index":0,"id":"call_abc","type":"function","function":{"name":"read_file","arguments":""}}]}}]}\n\n',
              'data: {"choices":[{"delta":{"tool_calls":[{"index":0,"function":{"arguments":"{\\"path\\": "}}]}}]}\n\n',
              'data: {"choices":[{"delta":{"tool_calls":[{"index":0,"function":{"arguments":"\\"test.txt\\"}"}}]}}]}\n\n',
              'data: [DONE]\n\n',
            ];
            for (const chunk of chunks) {
              controller.enqueue(new TextEncoder().encode(chunk));
            }
            controller.close();
          },
        });

        return new Response(stream, {
          headers: { 'Content-Type': 'text/event-stream' },
        });
      },
    });

    const adapter = createOpenAIAdapter({
      baseURL: `http://localhost:${server.port}/v1`,
      apiKey: 'test-key',
      model: 'test-model',
    });

    const response = await adapter.chat(
      [{ role: 'user', content: 'read test.txt' }],
      [
        {
          type: 'function',
          function: {
            name: 'read_file',
            description: 'read file',
            parameters: { type: 'object', properties: { path: { type: 'string' } } },
          },
        },
      ]
    );

    server.stop(true);

    expect(response.tool_calls).toBeDefined();
    expect(response.tool_calls!.length).toBe(1);
    expect(response.tool_calls![0].id).toBe('call_abc');
    expect(response.tool_calls![0].function.name).toBe('read_file');
    expect(JSON.parse(response.tool_calls![0].function.arguments)).toEqual({ path: 'test.txt' });
  });

  it('sends default temperature of 0.2 in request body', async () => {
    let capturedBody: any = null;
    const server = Bun.serve({
      port: 0,
      async fetch(req) {
        capturedBody = await req.json();
        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
            controller.close();
          },
        });
        return new Response(stream, {
          headers: { 'Content-Type': 'text/event-stream' },
        });
      },
    });

    const adapter = createOpenAIAdapter({
      baseURL: `http://localhost:${server.port}/v1`,
      model: 'test-model',
    });

    await adapter.chat([{ role: 'user', content: 'hello' }], []);
    server.stop(true);

    expect(capturedBody).toBeDefined();
    expect(capturedBody.temperature).toBe(0.2);
  });
});
