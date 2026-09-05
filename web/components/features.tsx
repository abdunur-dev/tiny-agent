"use client";

import Link from "next/link";
import { 
  FileCode, 
  Edit3, 
  Terminal, 
  Search, 
  HardDrive, 
  Cpu, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Layers
} from "lucide-react";

export function Features() {
  return (
    <section id="features" className="w-full py-20 sm:py-28 border-b border-white/[0.08] bg-[#0A0A0A] relative overflow-hidden">
      {/* Subtle Linear Ambient Radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-b from-white/[0.02] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono text-[#8A8F98] mb-3">
              <span>architecture & tools</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FAFAFA] mb-3">
              Crafted for pure terminal speed.
            </h2>
            <p className="text-[#8A8F98] text-sm sm:text-base leading-relaxed">
              Every tool is engineered with safety guards, zero framework overhead, and instant path resolution.
            </p>
          </div>

          <Link
            href="/docs"
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-mono text-[#8A8F98] hover:text-[#FAFAFA] pb-0.5 border-b border-white/10 hover:border-white/40 transition-all self-start md:self-auto"
          >
            <span>Read full reference</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Linear-Style Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Bento Card 1: read_file & auto-resolution (Spans 2 columns) */}
          <Link
            href="/docs/safety#tools-reference"
            className="md:col-span-2 group rounded-2xl linear-card p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-[#FAFAFA] group-hover:border-white/20 transition-colors">
                  <FileCode className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono text-[#8A8F98] px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                  read_file
                </span>
              </div>

              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#FAFAFA] mb-2 group-hover:text-white transition-colors">
                Smart path auto-resolution
              </h3>
              <p className="text-xs sm:text-sm text-[#8A8F98] leading-relaxed max-w-xl mb-6">
                Reads complete file contents asynchronously. When the model requests a bare filename like <code className="text-[#FAFAFA] font-mono">agent.ts</code>, tiny-agent shallowly traverses the repository and auto-resolves to <code className="text-[#FAFAFA] font-mono">src/agent.ts</code> without failing turns.
              </p>
            </div>

            {/* Micro-UI Preview */}
            <div className="rounded-xl border border-white/10 bg-[#08090C] p-4 font-mono text-xs text-[#8A8F98] space-y-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-[11px]">
                <div className="flex items-center gap-2 text-[#FAFAFA]">
                  <span className="text-emerald-400">↳</span>
                  <span>read_file: agent.ts</span>
                </div>
                <span className="text-emerald-400/90 text-[10px] bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                  auto-resolved → src/agent.ts
                </span>
              </div>
              <div className="text-[11px] leading-relaxed text-[#737373] pt-1">
                <div><span className="text-[#404040]">1 |</span> <span className="text-[#FAFAFA]">export async function</span> processAgentTurn(context: AgentContext) &#123;</div>
                <div><span className="text-[#404040]">2 |</span>   <span className="text-neutral-400">const stream = await createOpenAIAdapter(context.config);</span></div>
                <div><span className="text-[#404040]">3 |</span>   <span className="text-neutral-400">return stream.process(context.messages);</span></div>
              </div>
            </div>
          </Link>

          {/* Bento Card 2: edit_file with single replacement (Spans 1 column) */}
          <Link
            href="/docs/safety#tools-reference"
            className="group rounded-2xl linear-card p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-[#FAFAFA] group-hover:border-white/20 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono text-[#8A8F98] px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                  edit_file
                </span>
              </div>

              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#FAFAFA] mb-2 group-hover:text-white transition-colors">
                Single replacement safety
              </h3>
              <p className="text-xs sm:text-sm text-[#8A8F98] leading-relaxed mb-6">
                Exact substring replacement. Fails safely if <code className="text-[#FAFAFA] font-mono">old_string</code> is missing or appears more than once, preventing silent codebase corruption.
              </p>
            </div>

            {/* Micro-UI Preview: Diff snippet */}
            <div className="rounded-xl border border-white/10 bg-[#08090C] p-3.5 font-mono text-xs space-y-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
              <div className="flex items-center justify-between text-[10px] text-[#737373] border-b border-white/[0.06] pb-1.5">
                <span>diff preview</span>
                <span className="text-emerald-400 font-semibold">1 match verified</span>
              </div>
              <div className="text-red-400/90 bg-red-950/20 px-2 py-0.5 rounded text-[11px]">
                - port = 3000
              </div>
              <div className="text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded text-[11px]">
                + port = 8080
              </div>
            </div>
          </Link>

          {/* Bento Card 3: Granular Safety Confirmations */}
          <Link
            href="/docs/safety#approval-policy"
            className="group rounded-2xl linear-card p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-[#FAFAFA] group-hover:border-white/20 transition-colors">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono text-[#8A8F98] px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                  safety policy
                </span>
              </div>

              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#FAFAFA] mb-2 group-hover:text-white transition-colors">
                Confirm before action
              </h3>
              <p className="text-xs sm:text-sm text-[#8A8F98] leading-relaxed mb-6">
                Read-only inspection executes instantly with dimmed status lines. State changes pause for interactive <code className="text-[#FAFAFA] font-mono">(y/n)</code> approval with timeout guards.
              </p>
            </div>

            {/* Micro-UI Preview: Confirmation prompt */}
            <div className="rounded-xl border border-white/10 bg-[#08090C] p-3.5 font-mono text-xs text-[#8A8F98] space-y-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
              <div className="text-[#FAFAFA] text-[11px]">⚡ run_shell_command "bun test"</div>
              <div className="text-amber-400 font-bold text-[11px]">Proceed? (y/n): <span className="text-[#FAFAFA]">y</span></div>
              <div className="text-[10px] text-[#737373]">↳ 30s timeout guard armed</div>
            </div>
          </Link>

          {/* Bento Card 4: Local Ollama & Groq Cloud */}
          <Link
            href="/docs/engines"
            className="group rounded-2xl linear-card p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-[#FAFAFA] group-hover:border-white/20 transition-colors">
                  <HardDrive className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono text-[#8A8F98] px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                  engines
                </span>
              </div>

              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#FAFAFA] mb-2 group-hover:text-white transition-colors">
                Offline or instant cloud
              </h3>
              <p className="text-xs sm:text-sm text-[#8A8F98] leading-relaxed mb-6">
                Switch instantly between 100% offline Ollama models (Qwen 2.5 Coder, Llama 3.2) with zero telemetry, or stream cloud inference via Groq.
              </p>
            </div>

            {/* Micro-UI Preview: Engine switcher */}
            <div className="rounded-xl border border-white/10 bg-[#08090C] p-3.5 font-mono text-xs space-y-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#FAFAFA] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Ollama (local)</span>
                </span>
                <span className="text-[10px] text-emerald-400/90">100% offline</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#8A8F98] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>Groq (cloud)</span>
                </span>
                <span className="text-[10px] text-neutral-400">850 tok/s</span>
              </div>
            </div>
          </Link>

          {/* Bento Card 5: Model Context Protocol (MCP) Client */}
          <Link
            href="/docs/cli"
            className="group rounded-2xl linear-card p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-[#FAFAFA] group-hover:border-white/20 transition-colors">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono text-[#8A8F98] px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                  protocol
                </span>
              </div>

              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#FAFAFA] mb-2 group-hover:text-white transition-colors">
                Model Context Protocol
              </h3>
              <p className="text-xs sm:text-sm text-[#8A8F98] leading-relaxed mb-6">
                Native MCP client support. Connect any standard MCP server via <code className="text-[#FAFAFA] font-mono">config.json</code> to give your agent access to databases, GitHub, or local APIs.
              </p>
            </div>

            {/* Micro-UI Preview: MCP Servers list */}
            <div className="rounded-xl border border-white/10 bg-[#08090C] p-3.5 font-mono text-xs space-y-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
              <div className="text-[10px] text-[#737373] border-b border-white/[0.06] pb-1">
                active mcp tool servers
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#8A8F98]">
                <span>● sqlite</span>
                <span className="text-[10px] text-neutral-400">2 tools loaded</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#8A8F98]">
                <span>● filesystem</span>
                <span className="text-[10px] text-neutral-400">4 tools loaded</span>
              </div>
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}
