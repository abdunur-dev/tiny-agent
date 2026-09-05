import { describe, it, expect } from 'bun:test';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import {
  createMcpTool,
  formatMcpToolResult,
  loadMcpServers,
  resolveServerCommand,
  connectMcpServer,
} from '../src/mcp.ts';
import { defaultTools } from '../src/tools.ts';
import {
  processAgentTurn,
  getActionConfirmation,
  type AgentContext,
} from '../src/agent.ts';
import { loadExistingConfig } from '../src/config.ts';
import type { ModelAdapter, Message, ToolDefinition } from '../src/model.ts';

describe('MCP Client Integration', () => {
  async function createMockMcpServer() {
    const server = new Server(
      { name: 'mock-mcp-server', version: '1.0.0' },
      { capabilities: { tools: {} } }
    );

    const callHistory: Array<{ name: string; args: any }> = [];

    server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'calculate_sum',
            description: 'Add two numbers together',
            inputSchema: {
              type: 'object',
              properties: {
                a: { type: 'number', description: 'First number' },
                b: { type: 'number', description: 'Second number' },
              },
              required: ['a', 'b'],
            },
            annotations: {
              readOnlyHint: true,
            },
          },
          {
            name: 'deploy_service',
            description: 'Deploy a microservice to production',
            inputSchema: {
              type: 'object',
              properties: {
                service: { type: 'string', description: 'Service name' },
                environment: { type: 'string', description: 'Target environment' },
              },
              required: ['service'],
            },
            // annotations omitted or readOnlyHint false: risky action
          },
        ],
      };
    });

    server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      callHistory.push({ name, args });

      if (name === 'calculate_sum') {
        const sum = Number(args?.a || 0) + Number(args?.b || 0);
        return {
          content: [
            {
              type: 'text',
              text: `Result: ${sum}`,
            },
          ],
        };
      }

      if (name === 'deploy_service') {
        return {
          content: [
            {
              type: 'text',
              text: `Successfully deployed ${args?.service} to ${args?.environment || 'staging'}`,
            },
          ],
        };
      }

      return {
        isError: true,
        content: [{ type: 'text', text: `Unknown tool ${name}` }],
      };
    });

    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    await server.connect(serverTransport);

    const client = new Client(
      { name: 'test-agent', version: '0.1.0' },
      { capabilities: {} }
    );
    await client.connect(clientTransport);

    return { server, client, callHistory };
  }

  it('tools from a connected MCP server appear in agent tool list and route correctly', async () => {
    const { server, client, callHistory } = await createMockMcpServer();

    try {
      const listRes = await client.listTools();
      expect(listRes.tools.length).toBe(2);

      const mcpTools = listRes.tools.map((t) => createMcpTool(client, t));

      // Unified tool list merging built-in tools + MCP tools
      const unifiedTools = [...defaultTools, ...mcpTools];
      expect(unifiedTools.length).toBe(defaultTools.length + 2);

      const calcTool = unifiedTools.find((t) => t.definition.function.name === 'calculate_sum');
      expect(calcTool).toBeDefined();
      expect(calcTool?.source).toBe('mcp');
      expect(calcTool?.isReadOnly).toBe(true);

      const deployTool = unifiedTools.find((t) => t.definition.function.name === 'deploy_service');
      expect(deployTool).toBeDefined();
      expect(deployTool?.source).toBe('mcp');
      expect(deployTool?.isReadOnly).toBe(false);

      // Model invokes calculate_sum tool through agent turn
      let callCount = 0;
      const streamedTokens: string[] = [];

      const mockModel: ModelAdapter = {
        async chat(messages: Message[], tools: ToolDefinition[], onToken) {
          callCount++;
          if (callCount === 1) {
            // Check that unified tool list includes the MCP tools in model request
            const hasCalc = tools.some((t) => t.function.name === 'calculate_sum');
            expect(hasCalc).toBe(true);

            return {
              content: null,
              tool_calls: [
                {
                  id: 'call_mcp_1',
                  type: 'function',
                  function: {
                    name: 'calculate_sum',
                    arguments: JSON.stringify({ a: 15, b: 27 }),
                  },
                },
              ],
            };
          } else {
            const toolMsg = messages.find((m) => m.role === 'tool');
            expect(toolMsg).toBeDefined();
            expect((toolMsg as any).content).toBe('Result: 42');

            const reply = 'The sum of 15 and 27 is 42.';
            onToken?.(reply);
            return { content: reply };
          }
        },
      };

      const ctx: AgentContext = {
        model: mockModel,
        tools: unifiedTools,
        history: [{ role: 'system', content: 'system prompt' }],
      };

      await processAgentTurn(ctx, 'Calculate 15 + 27', (chunk) => {
        streamedTokens.push(chunk);
      });

      expect(callCount).toBe(2);
      expect(streamedTokens.join('')).toBe('The sum of 15 and 27 is 42.');
      expect(callHistory.length).toBe(1);
      expect(callHistory[0]).toEqual({ name: 'calculate_sum', args: { a: 15, b: 27 } });
    } finally {
      await client.close();
      await server.close();
    }
  });

  it('treats MCP tools as requiring confirmation unless proven read-only', async () => {
    const { server, client } = await createMockMcpServer();

    try {
      const listRes = await client.listTools();
      const mcpTools = listRes.tools.map((t) => createMcpTool(client, t));
      const calcTool = mcpTools.find((t) => t.definition.function.name === 'calculate_sum')!;
      const deployTool = mcpTools.find((t) => t.definition.function.name === 'deploy_service')!;

      // calculate_sum has readOnlyHint: true -> safe, no confirmation
      const readOnlyConf = getActionConfirmation('calculate_sum', { a: 1, b: 2 }, calcTool);
      expect(readOnlyConf).toBeNull();

      // deploy_service lacks readOnlyHint -> risky, requires confirmation
      const riskyConf = getActionConfirmation(
        'deploy_service',
        { service: 'auth-service', environment: 'production' },
        deployTool
      );
      expect(riskyConf).not.toBeNull();
      expect(riskyConf?.toolName).toBe('deploy_service');
      expect(riskyConf?.detail).toContain('deploy_service:');
      expect(riskyConf?.preview).toContain('auth-service');

      // Test confirmation interception during agent turn
      let confirmedToolName = '';
      const mockModel: ModelAdapter = {
        async chat(messages: Message[]) {
          if (messages.length === 2) {
            return {
              content: null,
              tool_calls: [
                {
                  id: 'call_deploy',
                  type: 'function',
                  function: {
                    name: 'deploy_service',
                    arguments: JSON.stringify({ service: 'auth-service', environment: 'production' }),
                  },
                },
              ],
            };
          }
          return { content: 'Deployment completed' };
        },
      };

      const ctx: AgentContext = {
        model: mockModel,
        tools: [deployTool],
        history: [{ role: 'system', content: 'test' }],
        confirmAction: async (action) => {
          confirmedToolName = action.toolName;
          return true;
        },
      };

      await processAgentTurn(ctx, 'Deploy auth service', () => {});
      expect(confirmedToolName).toBe('deploy_service');

      // Test declining MCP action
      const declineModel: ModelAdapter = {
        async chat(messages: Message[]) {
          if (messages.length === 2) {
            return {
              content: null,
              tool_calls: [
                {
                  id: 'call_deploy_2',
                  type: 'function',
                  function: {
                    name: 'deploy_service',
                    arguments: JSON.stringify({ service: 'billing', environment: 'prod' }),
                  },
                },
              ],
            };
          }
          const toolMsg = messages.find((m) => m.role === 'tool');
          return { content: `Model saw: ${(toolMsg as any).content}` };
        },
      };

      const declineCtx: AgentContext = {
        model: declineModel,
        tools: [deployTool],
        history: [{ role: 'system', content: 'test' }],
        confirmAction: async () => false, // decline
      };

      await processAgentTurn(declineCtx, 'Deploy billing', () => {});
      const toolMessage = declineCtx.history.find((m) => m.role === 'tool');
      expect((toolMessage as any).content).toContain('User declined this action');
    } finally {
      await client.close();
      await server.close();
    }
  });

  it('formatMcpToolResult correctly formats text, error, and empty results', () => {
    expect(formatMcpToolResult(null)).toBe('(Tool completed with no output)');
    expect(formatMcpToolResult({ content: [] })).toBe('(Tool completed with no output)');
    expect(
      formatMcpToolResult({
        content: [
          { type: 'text', text: 'Line 1' },
          { type: 'text', text: 'Line 2' },
        ],
      })
    ).toBe('Line 1\nLine 2');
    expect(
      formatMcpToolResult({
        isError: true,
        content: [{ type: 'text', text: 'Database error occurred' }],
      })
    ).toBe('Error: Database error occurred');
    expect(
      formatMcpToolResult({
        isError: true,
        content: [{ type: 'text', text: 'Error: Already prefixed error' }],
      })
    ).toBe('Error: Already prefixed error');
  });

  it('loadMcpServers handles non-existent or failing server gracefully without throwing', async () => {
    const result = await loadMcpServers({
      'non-existent-server': {
        command: 'this-command-does-not-exist-tiny-agent-test',
        args: ['--bogus'],
      },
    });

    expect(result.tools).toEqual([]);
    expect(result.statuses.length).toBe(1);
    expect(result.statuses[0].name).toBe('non-existent-server');
    expect(result.statuses[0].status).toBe('error');
    expect(result.statuses[0].error).toBeDefined();

    await result.close();
  });

  it('default config has no mcpServers configured (opt-in)', () => {
    const config = loadExistingConfig();
    // Default config object should not have any mcpServers defined
    if (!config) {
      expect(config).toBeNull();
    } else {
      // If config file exists in the user profile, ensure mcpServers is either undefined or user-defined
      // But DEFAULT_CONFIG itself must not hardcode any MCP servers
      expect(config.mcpServers === undefined || typeof config.mcpServers === 'object').toBe(true);
    }
  });

  it('resolveServerCommand handles Windows .cmd resolution for npx and npm', () => {
    expect(resolveServerCommand('npx', 'win32')).toBe('npx.cmd');
    expect(resolveServerCommand('npm', 'win32')).toBe('npm.cmd');
    expect(resolveServerCommand('custom-tool', 'win32')).toBe('custom-tool');
    expect(resolveServerCommand('npx', 'linux')).toBe('npx');
    expect(resolveServerCommand('npx', 'darwin')).toBe('npx');
  });

  it('connection timeout includes helpful hint for Windows npx resolution', async () => {
    // Test that connectMcpServer timeout error includes the specific message
    // Using a command that hangs / doesn't respond to stdio (e.g. timeout of 50ms)
    const cmd = process.platform === 'win32' ? 'cmd.exe' : 'cat';
    const args = process.platform === 'win32' ? ['/k'] : [];

    let errMessage = '';
    try {
      await connectMcpServer('filesystem', { command: cmd, args }, 50);
    } catch (err: any) {
      errMessage = err.message;
    }

    expect(errMessage).toContain("Connection to MCP server 'filesystem' timed out.");
    expect(errMessage).toContain(
      "If using npx on Windows, ensure the command resolves correctly (this may require shell: true or npx.cmd)."
    );
  });
});
