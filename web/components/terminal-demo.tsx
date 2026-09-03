"use client";

import { useEffect, useState } from "react";
import { Play, RotateCcw } from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  command: string;
  provider: string;
  toolAction: string;
  autoResolve?: string;
  output: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "read",
    name: "Read & inspect",
    command: 'tiny-agent "read package.json and list dependencies"',
    provider: "ollama / qwen2.5-coder:latest",
    toolAction: "⚡ read_file package.json",
    autoResolve: "↳ auto-resolved 'package.json' → './package.json'",
    output: "The project uses Bun runtime with zero external agent frameworks.\nDependencies: clsx, lucide-react, next, react, tailwindcss.",
  },
  {
    id: "edit",
    name: "Surgical edit",
    command: 'tiny-agent "change the default port to 8080 in server.ts"',
    provider: "groq / openai/gpt-oss-120b",
    toolAction: "⚡ edit_file server.ts",
    output: "✓ Successfully replaced 'port = 3000' with 'port = 8080' in server.ts.",
  },
  {
    id: "search",
    name: "Search regex",
    command: 'tiny-agent "search for todos across src/"',
    provider: "ollama / qwen2.5-coder:latest",
    toolAction: "⚡ search_files pattern='TODO' directory='src/'",
    output: "Found 2 items:\n  - src/agent.ts:42: // TODO: Add streaming token cancel\n  - src/tools.ts:89: // TODO: Support glob patterns",
  },
];

export function TerminalDemo() {
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);
  const [typedText, setTypedText] = useState("");
  const [step, setStep] = useState(0);

  useEffect(() => {
    setTypedText("");
    setStep(0);
  }, [activeScenario]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (step === 0) {
      if (typedText.length < activeScenario.command.length) {
        timeout = setTimeout(() => {
          setTypedText(activeScenario.command.slice(0, typedText.length + 1));
        }, 30);
      } else {
        timeout = setTimeout(() => setStep(1), 400);
      }
    } else if (step === 1) {
      timeout = setTimeout(() => setStep(2), 600);
    } else if (step === 2) {
      timeout = setTimeout(() => setStep(3), 800);
    }

    return () => clearTimeout(timeout);
  }, [typedText, step, activeScenario]);

  return (
    <section id="demo" className="py-20 sm:py-28 border-b border-white/10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/[0.02] text-white/50 uppercase tracking-wider mb-4">
            Interactive Simulator
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            See tiny-agent in action
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed">
            Select a scenario below to watch tiny-agent execute commands, invoke tools, and stream responses.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setActiveScenario(sc)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono border transition-all whitespace-nowrap shrink-0 ${
                activeScenario.id === sc.id
                  ? "border-white bg-white text-black font-medium"
                  : "border-white/10 bg-[#0a0a0a] text-white/60 hover:text-white hover:border-white/30"
              }`}
            >
              <Play className="w-3 h-3" />
              <span>{sc.name}</span>
            </button>
          ))}
          <button
            onClick={() => {
              setTypedText("");
              setStep(0);
            }}
            className="px-2.5 py-1.5 rounded-md text-xs font-mono border border-white/10 bg-[#0a0a0a] text-white/40 hover:text-white hover:border-white/30 transition-colors shrink-0"
            title="Replay animation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Terminal Window */}
        <div className="rounded-lg border border-white/15 bg-black font-mono text-xs overflow-hidden shadow-2xl">
          {/* Bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 bg-[#090909]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span className="text-[11px] text-white/40 ml-2">bash ~ tiny-agent</span>
            </div>
            <div className="text-[11px] text-white/40 hidden sm:block truncate max-w-[200px]">
              [{activeScenario.provider}]
            </div>
          </div>

          {/* Terminal Screen */}
          <div className="p-5 space-y-3 min-h-[220px] leading-relaxed select-text">
            {/* Command Line */}
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 select-none font-bold">$</span>
              <span className="text-white">
                {typedText}
                {step === 0 && (
                  <span className="inline-block w-1.5 h-3.5 bg-white ml-0.5 align-middle animate-pulse" />
                )}
              </span>
            </div>

            {/* Provider & Action Output */}
            {step >= 1 && (
              <div className="text-white/40 space-y-1 pt-1">
                <div>[tiny-agent] provider={activeScenario.provider}</div>
                <div className="text-white/80">{activeScenario.toolAction}</div>
                {activeScenario.autoResolve && (
                  <div className="text-white/40">{activeScenario.autoResolve}</div>
                )}
              </div>
            )}

            {/* Final Answer */}
            {step >= 2 && (
              <div className="text-white pt-2 border-t border-white/10 whitespace-pre-line text-xs leading-relaxed">
                {activeScenario.output}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
