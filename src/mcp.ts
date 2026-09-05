import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import type { Tool } from './tools.ts';
import type { ToolDefinition } from './model.ts';
import { notifyAction, notifyReadOnlyAction } from './tools.ts';
import type { McpServerConfig } from './config.ts';

export interface McpServerStatus {
  name: string;
  status: 'connected' | 'error';
  toolCount?: number;
  error?: string;
}

export interface McpConnectionResult {
  tools: Tool[];
  clients: Client[];
  statuses: McpServerStatus[];
  close: () => Promise<void>;
}

export function formatMcpToolResult(result: any): string {
  if (!result) {
    return '(Tool completed with no output)';
  }

  if (result.content && Array.isArray(result.content)) {
    const parts: string[] = [];
    for (const item of result.content) {
      if (item.type === 'text' && typeof item.text === 'string') {
        parts.push(item.text);
      } else if (item.type === 'image') {
        parts.push(`[Image: ${item.mimeType || 'unknown'}]`);
      } else if (item.type === 'resource') {
        if (item.resource && typeof item.resource.text === 'string') {
          parts.push(item.resource.text);
        } else {
          parts.push(`[Resource: ${item.resource?.uri || JSON.stringify(item.resource)}]`);
        }
      } else {
        parts.push(typeof item === 'string' ? item : JSON.stringify(item));
      }
    }

    let text = parts.join('\n');
    if (!text && !result.isError) {
      text = '(Tool completed with no output)';
    }

    if (result.isError) {
      return text.startsWith('Error:') ? text : `Error: ${text || 'Tool call reported an error'}`;
    }

    return text;
  }

  if (result.isError) {
    const msg = typeof result === 'string' ? result : JSON.stringify(result);
    return msg.startsWith('Error:') ? msg : `Error: ${msg}`;
  }

  return typeof result === 'string' ? result : JSON.stringify(result);
}

export function createMcpTool(client: Client, mcpTool: any): Tool {
  const isReadOnly = mcpTool.annotations?.readOnlyHint === true;
  const definition: ToolDefinition = {
    type: 'function',
    function: {
      name: mcpTool.name,
      description: mcpTool.description || '',
      parameters: {
        type: 'object',
        properties: (mcpTool.inputSchema?.properties as Record<string, unknown>) || {},
        required: mcpTool.inputSchema?.required || [],
      },
    },
  };

  return {
    definition,
    source: 'mcp',
    isReadOnly,
    async execute(args: Record<string, any>): Promise<string> {
      const argsDetail = Object.keys(args || {}).length > 0 ? JSON.stringify(args) : '';
      if (isReadOnly) {
        notifyReadOnlyAction(mcpTool.name, argsDetail);
      } else {
        notifyAction(mcpTool.name, argsDetail);
      }

      try {
        const result = await client.callTool({
          name: mcpTool.name,
          arguments: args,
        });
        return formatMcpToolResult(result);
      } catch (err: any) {
        return `Error: ${err.message}`;
      }
    },
  };
}

export function resolveServerCommand(command: string, platform: string = process.platform): string {
  if (platform === 'win32') {
    const lower = command.toLowerCase();
    if (lower === 'npx') {
      return 'npx.cmd';
    }
    if (lower === 'npm') {
      return 'npm.cmd';
    }
  }
  return command;
}

export async function connectMcpServer(
  name: string,
  config: McpServerConfig,
  timeoutMs: number = 30000
): Promise<{ client: Client; tools: Tool[] }> {
  const resolvedCommand = resolveServerCommand(config.command);

  const transport = new StdioClientTransport({
    command: resolvedCommand,
    args: config.args,
    env: { ...(process.env as Record<string, string>), ...config.env },
    cwd: config.cwd,
    stderr: 'pipe',
  });

  const client = new Client(
    {
      name: 'tiny-agent',
      version: '0.1.0',
    },
    {
      capabilities: {},
    }
  );

  const connectPromise = client.connect(transport);
  const timeoutPromise = new Promise<never>((_, reject) => {
    const timer = setTimeout(() => {
      reject(
        new Error(
          `Connection to MCP server '${name}' timed out. If using npx on Windows, ensure the command resolves correctly (this may require shell: true or npx.cmd).`
        )
      );
    }, timeoutMs);
    timer.unref?.();
  });

  await Promise.race([connectPromise, timeoutPromise]);

  const listToolsResult = await client.listTools();
  const tools: Tool[] = (listToolsResult.tools || []).map((mcpTool) =>
    createMcpTool(client, mcpTool)
  );

  return { client, tools };
}

export async function loadMcpServers(
  mcpServers?: Record<string, McpServerConfig>
): Promise<McpConnectionResult> {
  const result: McpConnectionResult = {
    tools: [],
    clients: [],
    statuses: [],
    async close() {
      await Promise.allSettled(result.clients.map((c) => c.close()));
    },
  };

  if (!mcpServers || Object.keys(mcpServers).length === 0) {
    return result;
  }

  for (const [name, config] of Object.entries(mcpServers)) {
    try {
      const { client, tools } = await connectMcpServer(name, config);
      result.clients.push(client);
      result.tools.push(...tools);
      result.statuses.push({
        name,
        status: 'connected',
        toolCount: tools.length,
      });
    } catch (err: any) {
      result.statuses.push({
        name,
        status: 'error',
        error: err?.message || String(err),
      });
    }
  }

  return result;
}
