export interface ToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
}

export type Message =
  | { role: 'system'; content: string }
  | { role: 'user'; content: string }
  | { role: 'assistant'; content: string | null; tool_calls?: ToolCall[] }
  | { role: 'tool'; tool_call_id: string; content: string };

export interface ToolDefinition {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: {
      type: 'object';
      properties: Record<string, unknown>;
      required?: string[];
    };
  };
}

export interface ModelResponse {
  content: string | null;
  tool_calls?: ToolCall[];
}

export interface ModelAdapter {
  chat(
    messages: Message[],
    tools: ToolDefinition[],
    onToken?: (token: string) => void
  ): Promise<ModelResponse>;
}

export interface AdapterConfig {
  baseURL: string;
  apiKey?: string;
  model: string;
  temperature?: number;
}

export function createOpenAIAdapter(config: AdapterConfig): ModelAdapter {
  const cleanBaseURL = config.baseURL.replace(/\/+$/, '');
  const endpoint = cleanBaseURL.endsWith('/chat/completions')
    ? cleanBaseURL
    : `${cleanBaseURL}/chat/completions`;

  return {
    async chat(messages, tools, onToken) {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (config.apiKey && config.apiKey.trim().length > 0) {
        headers['Authorization'] = `Bearer ${config.apiKey.trim()}`;
      }

      const body: Record<string, unknown> = {
        model: config.model,
        messages,
        temperature: config.temperature ?? 0.2,
        stream: true,
      };

      if (tools.length > 0) {
        body.tools = tools;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error ${response.status} from ${endpoint}: ${errorText}`);
      }

      if (!response.body) {
        throw new Error('Response body is null');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let accumulatedContent = '';
      const toolCallsMap = new Map<number, { id?: string; name: string; args: string }>();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const rawLine of lines) {
          const line = rawLine.trim();
          if (!line || !line.startsWith('data:')) continue;
          const data = line.slice(5).trim();
          if (data === '[DONE]') break;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta;
            if (!delta) continue;

            if (delta.content) {
              accumulatedContent += delta.content;
              if (onToken) onToken(delta.content);
            }

            if (delta.tool_calls && Array.isArray(delta.tool_calls)) {
              for (const tc of delta.tool_calls) {
                const index = tc.index ?? 0;
                let existing = toolCallsMap.get(index);
                if (!existing) {
                  existing = {
                    id: tc.id || `call_${index}`,
                    name: tc.function?.name || '',
                    args: '',
                  };
                  toolCallsMap.set(index, existing);
                } else {
                  if (tc.id) existing.id = tc.id;
                  if (tc.function?.name) existing.name += tc.function.name;
                }
                if (tc.function?.arguments) {
                  existing.args += tc.function.arguments;
                }
              }
            }
          } catch {
            // Incomplete JSON or malformed chunk; buffer will continue
          }
        }
      }

      const finalToolCalls: ToolCall[] = [];
      for (const [, val] of toolCallsMap.entries()) {
        if (val.name) {
          finalToolCalls.push({
            id: val.id || `call_${finalToolCalls.length}`,
            type: 'function',
            function: {
              name: val.name,
              arguments: val.args,
            },
          });
        }
      }

      return {
        content: accumulatedContent.length > 0 ? accumulatedContent : null,
        tool_calls: finalToolCalls.length > 0 ? finalToolCalls : undefined,
      };
    },
  };
}
