"use client";

import { useState } from "react";
import { 
  Sparkles, 
  Cpu, 
  Layers, 
  Shield, 
  Zap, 
  GitBranch, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Terminal, 
  Lock, 
  Activity,
  ArrowRight,
  Split,
  Sliders
} from "lucide-react";

export function FutureSection() {
  const [filter, setFilter] = useState<"all" | "runtime" | "intelligence" | "protocols">("all");
  
  // Swarm Simulator State
  const [swarmRunning, setSwarmRunning] = useState(false);
  const [swarmStep, setSwarmStep] = useState(0);

  // Local Air-Gap Toggle
  const [airGapMode, setAirGapMode] = useState(true);

  // Diff toggle
  const [diffView, setDiffView] = useState<"split" | "unified">("split");

  const runSwarm = () => {
    if (swarmRunning) return;
    setSwarmRunning(true);
    setSwarmStep(1);
    
    setTimeout(() => setSwarmStep(2), 1200);
    setTimeout(() => setSwarmStep(3), 2400);
    setTimeout(() => {
      setSwarmStep(4);
      setSwarmRunning(false);
    }, 3600);
  };

  const resetSwarm = () => {
    setSwarmRunning(false);
    setSwarmStep(0);
  };

  const categories = [
    { id: "all", label: "All Horizons" },
    { id: "runtime", label: "Core Runtime" },
    { id: "intelligence", label: "Multi-Agent Intelligence" },
    { id: "protocols", label: "Open Protocols" },
  ];

  return (
    <section id="future" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto border-b border-white/[0.08]">
      {/* Background radial glow */}
      <div 
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-xs font-mono text-blue-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Horizon Roadmap · 2026 & Beyond</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3 font-sans">
            The Future of tiny-agent.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Next-generation features engineered at the intersection of extreme terminal speed, decentralized agent swarms, and private local inference.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg border border-white/10 bg-neutral-900/60 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              type="button"
              className={`px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-colors ${
                filter === cat.id
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feature Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Future Feature 1: Autonomous Multi-Agent Mesh Swarm */}
        {(filter === "all" || filter === "intelligence") && (
          <div className="rounded-xl border border-white/10 bg-neutral-950/70 p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  In Active Development · Q4
                </span>
                <span className="text-xs font-mono text-neutral-500">RFC #104</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-sans flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                Autonomous Multi-Agent Mesh
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Subagent swarms that decompose tasks dynamically. A primary orchestrator spawns isolated worker agents (researcher, syntax patcher, test verifier) that communicate through a lock-free memory ring.
              </p>
            </div>

            {/* Interactive Swarm Playground */}
            <div className="rounded-lg border border-white/10 bg-black p-4 font-mono text-xs mb-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                <div className="flex items-center gap-2 text-neutral-400">
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                  <span>Agent Swarm Simulator</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={runSwarm}
                    disabled={swarmRunning}
                    type="button"
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-white text-black font-semibold text-[11px] hover:bg-neutral-200 transition disabled:opacity-50"
                  >
                    <Play className="w-3 h-3" />
                    <span>{swarmRunning ? "Orchestrating..." : "Simulate Swarm"}</span>
                  </button>
                  <button
                    onClick={resetSwarm}
                    type="button"
                    className="p-1 rounded border border-white/10 text-neutral-400 hover:text-white transition"
                    title="Reset simulation"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Swarm Graph Visualization */}
              <div className="space-y-2 py-1">
                {/* Orchestrator Node */}
                <div className={`p-2 rounded border transition-all ${
                  swarmStep >= 1 ? "border-blue-500/50 bg-blue-500/10 text-white" : "border-white/5 bg-white/[0.02] text-neutral-500"
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[11px] flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${swarmStep >= 1 ? "bg-blue-400" : "bg-neutral-600"}`} />
                      [Primary Orchestrator]
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {swarmStep === 1 ? "Decomposing task into AST subgraphs..." : swarmStep > 1 ? "Dispatched" : "Idle"}
                    </span>
                  </div>
                </div>

                {/* Subagent 1: Codebase Explorer */}
                <div className={`p-2 ml-4 rounded border transition-all ${
                  swarmStep >= 2 ? "border-emerald-500/50 bg-emerald-500/10 text-white" : "border-white/5 bg-white/[0.02] text-neutral-500"
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[11px] flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${swarmStep >= 2 ? "bg-emerald-400" : "bg-neutral-600"}`} />
                      ↳ Subagent A: Codebase Researcher
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {swarmStep === 2 ? "Indexed 42 files across src/" : swarmStep > 2 ? "Context Ready (12ms)" : "Waiting"}
                    </span>
                  </div>
                </div>

                {/* Subagent 2: Test & Syntax Verifier */}
                <div className={`p-2 ml-4 rounded border transition-all ${
                  swarmStep >= 3 ? "border-purple-500/50 bg-purple-500/10 text-white" : "border-white/5 bg-white/[0.02] text-neutral-500"
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[11px] flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${swarmStep >= 3 ? "bg-purple-400" : "bg-neutral-600"}`} />
                      ↳ Subagent B: Test & Type Verifier
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {swarmStep === 3 ? "Executing bun test in sandbox..." : swarmStep >= 4 ? "33/33 Tests Passed" : "Waiting"}
                    </span>
                  </div>
                </div>

                {/* Outcome */}
                {swarmStep === 4 && (
                  <div className="p-2 rounded border border-emerald-500/40 bg-emerald-950/20 text-emerald-300 text-[11px] flex items-center gap-1.5 mt-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Swarm resolved task in 3.6s · 0 lock contentions</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-2 border-t border-white/5">
              <span>Capability: Parallel execution</span>
              <span className="text-white flex items-center gap-1">
                Read Specification <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        )}

        {/* Future Feature 2: Sub-Millisecond Cold Boot */}
        {(filter === "all" || filter === "runtime") && (
          <div className="rounded-xl border border-white/10 bg-neutral-950/70 p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-[11px] font-mono text-blue-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  Alpha Benchmarked
                </span>
                <span className="text-xs font-mono text-neutral-500">&lt; 0.8ms startup</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-sans flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Sub-Millisecond Cold Boot
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                By compiling directly with Bun single-binary output and pre-allocating tool descriptors in memory snapshots, tiny-agent starts 400x faster than traditional Python or Node-based coding agents.
              </p>
            </div>

            {/* Interactive Benchmark Comparison */}
            <div className="rounded-lg border border-white/10 bg-black p-4 font-mono text-xs mb-6">
              <div className="text-neutral-400 text-[11px] mb-3 flex items-center justify-between">
                <span>CLI Startup Latency (Time to First Token)</span>
                <span className="text-emerald-400 font-bold">412x Faster</span>
              </div>

              <div className="space-y-3">
                {/* tiny-agent Bun binary */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-white font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      tiny-agent (Bun native)
                    </span>
                    <span className="text-emerald-400 font-bold">0.8 ms</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full w-[2%]" />
                  </div>
                </div>

                {/* Node.js CLI */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-neutral-400">Standard Node.js CLI</span>
                    <span className="text-neutral-400">285 ms</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-neutral-500 rounded-full w-[45%]" />
                  </div>
                </div>

                {/* Python Agent CLI */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-neutral-400">Python-based Agent (LangChain)</span>
                    <span className="text-neutral-400">1,120 ms</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-neutral-600 rounded-full w-[95%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-2 border-t border-white/5">
              <span>Zero JIT delay</span>
              <span className="text-white flex items-center gap-1">
                View Benchmark Suite <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        )}

        {/* Future Feature 3: Zero-Telemetry Local Neural Sandbox */}
        {(filter === "all" || filter === "intelligence") && (
          <div className="rounded-xl border border-white/10 bg-neutral-950/70 p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-purple-500/20 bg-purple-500/10 text-[11px] font-mono text-purple-400">
                  <Lock className="w-3 h-3" />
                  Air-Gapped Local Privacy
                </span>
                <span className="text-xs font-mono text-neutral-500">100% Offline</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-sans flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                Zero-Telemetry Neural Sandbox
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Run proprietary codebases with total peace of mind. Quantized models execute locally via Ollama / GGUF with zero analytics, zero data exfiltration, and fully ephemeral context rings.
              </p>
            </div>

            {/* Interactive Toggle Card */}
            <div className="rounded-lg border border-white/10 bg-black p-4 font-mono text-xs mb-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                <span className="text-neutral-400">Execution Mode</span>
                <button
                  onClick={() => setAirGapMode(!airGapMode)}
                  type="button"
                  className={`px-3 py-1 rounded text-[11px] font-mono font-semibold transition ${
                    airGapMode
                      ? "bg-emerald-500 text-black shadow-sm"
                      : "bg-neutral-800 text-neutral-300"
                  }`}
                >
                  {airGapMode ? "Strict Air-Gap [Active]" : "Cloud Turbo"}
                </button>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Network egress socket:</span>
                  <span className={airGapMode ? "text-emerald-400 font-bold" : "text-amber-400"}>
                    {airGapMode ? "DISABLED (0.0.0.0 blocked)" : "groq.api.endpoint"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Context encryption:</span>
                  <span className="text-neutral-200">AES-256 in memory</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Telemetry packets:</span>
                  <span className="text-emerald-400">0 sent · 0 stored</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-2 border-t border-white/5">
              <span>Security audit: Passed</span>
              <span className="text-white flex items-center gap-1">
                Security Architecture <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        )}

        {/* Future Feature 4: Neural AST Diff & Auto-Rollback */}
        {(filter === "all" || filter === "protocols" || filter === "runtime") && (
          <div className="rounded-xl border border-white/10 bg-neutral-950/70 p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-[11px] font-mono text-amber-400">
                  <GitBranch className="w-3 h-3" />
                  Semantic Engine
                </span>
                <span className="text-xs font-mono text-neutral-500">Atomic Rollbacks</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-sans flex items-center gap-2">
                <Split className="w-5 h-5 text-blue-400" />
                Neural AST Patching & Diff Engine
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Replaces raw line-by-line string regex edits with abstract syntax tree (AST) node replacement. Guarantees parse validity before writing to disk with one-click snapshot rollbacks.
              </p>
            </div>

            {/* Interactive AST Diff Preview */}
            <div className="rounded-lg border border-white/10 bg-black p-4 font-mono text-xs mb-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
                  <span>diff view:</span>
                  <button
                    onClick={() => setDiffView(diffView === "split" ? "unified" : "split")}
                    type="button"
                    className="underline text-white hover:text-blue-400 transition"
                  >
                    toggle {diffView === "split" ? "unified" : "split"}
                  </button>
                </div>
                <span className="text-emerald-400 text-[10px]">AST Validated</span>
              </div>

              <div className="space-y-1 font-mono text-[11px]">
                <div className="bg-red-950/30 text-red-300 px-2 py-0.5 rounded flex items-center justify-between">
                  <span>- const timeout = 30000; // Legacy HTTP poll</span>
                  <span className="text-[10px] text-red-400">Removed</span>
                </div>
                <div className="bg-emerald-950/40 text-emerald-300 px-2 py-0.5 rounded flex items-center justify-between">
                  <span>+ const stream = await mcp.connectStreaming(); // MCP v2</span>
                  <span className="text-[10px] text-emerald-400">Added AST Node</span>
                </div>
                <div className="text-neutral-500 px-2 text-[10px] pt-1">
                  ✓ Syntax tree parsed cleanly · No dangling references
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-2 border-t border-white/5">
              <span>AST-level safety</span>
              <span className="text-white flex items-center gap-1">
                View Syntax Grammar <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
