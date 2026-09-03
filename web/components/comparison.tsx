export function Comparison() {
  return (
    <section id="compare" className="py-20 sm:py-28 border-b border-white/10 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/[0.02] text-white/50 uppercase tracking-wider mb-4">
            Framework Bloat vs tiny-agent
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            500+ lines vs 84 lines
          </h2>
          <p className="text-white/50 text-sm max-w-lg mx-auto leading-relaxed">
            Mainstream agent frameworks require hundreds of lines of dependency chains, prompt managers, and complex abstractions. tiny-agent executes the entire loop in under 84 clean lines of TypeScript.
          </p>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
            
            {/* Left: Traditional Frameworks */}
            <div className="flex flex-col rounded-lg border border-red-500/20 bg-black overflow-hidden">
              <div className="px-4 py-2.5 border-b border-red-500/20 bg-red-500/[0.04] text-xs font-mono text-red-400 flex items-center justify-between">
                <span>Heavy Framework (500+ lines boilerplate)</span>
                <span className="text-[10px] text-red-400/60 uppercase">complex</span>
              </div>
              <div className="p-5 font-mono text-xs text-white/30 leading-relaxed overflow-x-auto">
                <pre><code>{`import { AgentExecutor, createOpenAIToolsAgent } from "langchain/agents";
import { ChatOpenAI } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";
import { Tool } from "@langchain/core/tools";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";

// 50+ lines of custom tool wrapper classes...
class CustomReadFileTool extends Tool { ... }
class CustomWriteFileTool extends Tool { ... }

// Heavy prompt template layers
const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a coding assistant."],
  new MessagesPlaceholder("chat_history"),
  ["human", "{input}"],
  new MessagesPlaceholder("agent_scratchpad"),
]);

const memory = new BufferMemory({ returnMessages: true });
const agent = await createOpenAIToolsAgent({ llm, tools, prompt });
const executor = new AgentExecutor({ agent, tools, memory });
// 300+ ms startup delay, multi-megabyte node_modules`}</code></pre>
              </div>
            </div>

            {/* Right: tiny-agent */}
            <div className="flex flex-col rounded-lg border border-emerald-500/25 bg-[#050505] overflow-hidden">
              <div className="px-4 py-2.5 border-b border-emerald-500/20 bg-emerald-500/[0.04] text-xs font-mono text-emerald-400 flex items-center justify-between">
                <span>tiny-agent (&lt;84 lines core loop)</span>
                <span className="text-[10px] text-emerald-400/80 uppercase font-bold">10ms startup</span>
              </div>
              <div className="p-5 font-mono text-xs text-white/80 leading-relaxed overflow-x-auto">
                <pre><code>{`// Pure hand-crafted loop with native SSE streaming
export async function processAgentTurn(ctx, userInput, onToken) {
  ctx.history.push({ role: 'user', content: userInput });

  while (true) {
    const res = await ctx.model.chat(ctx.history, tools, onToken);
    if (!res.tool_calls) break;

    ctx.history.push({ role: 'assistant', tool_calls: res.tool_calls });
    for (const call of res.tool_calls) {
      const output = await executeTool(call.function.name, call.args);
      ctx.history.push({ role: 'tool', tool_call_id: call.id, content: output });
    }
  }
}
// Zero framework dependencies, compiled to single binary`}</code></pre>
              </div>
            </div>

          </div>

          {/* Center Badge */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className="flex flex-col items-center gap-2">
              <div className="h-6 w-px bg-white/20" />
              <div className="px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-bold font-mono uppercase tracking-wider shadow-2xl">
                10x less overhead
              </div>
              <div className="h-6 w-px bg-white/20" />
            </div>
          </div>

          <div className="lg:hidden flex justify-center mt-4">
            <div className="px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-bold font-mono uppercase tracking-wider">
              10x less overhead
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
