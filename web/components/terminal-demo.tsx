"use client";

import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  command: string;
  provider: string;
  toolAction: string;
  autoResolve?: string;
  confirmationPrompt?: string;
  output: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "edit",
    name: "edit_file",
    command: 'tiny-agent "change the server port to 8080 in src/config.ts"',
    provider: "ollama / qwen2.5-coder:latest",
    toolAction: "⚡ edit_file src/config.ts",
    confirmationPrompt: "Proceed? (y/n): ",
    output: "✓ Successfully replaced 'port = 3000' with 'port = 8080' in src/config.ts.",
  },
  {
    id: "exec",
    name: "run_shell_command",
    command: 'tiny-agent "execute full test suite in bun"',
    provider: "groq / openai/gpt-oss-120b",
    toolAction: "⚡ run_shell_command cmd /c bun test",
    confirmationPrompt: "Proceed? (y/n): ",
    output: "33 pass, 0 fail (131 expect calls) [1.09s]\nAll unit, model, and MCP tests passed.",
  },
  {
    id: "read",
    name: "read_file",
    command: 'tiny-agent "inspect package.json dependencies"',
    provider: "ollama / qwen2.5-coder:latest",
    toolAction: "↳ read_file package.json",
    autoResolve: "↳ auto-resolved 'package.json' → './package.json'",
    output: "Standalone CLI with zero framework bloat. Standard dependencies: @modelcontextprotocol/sdk.",
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
        }, 28);
      } else {
        timeout = setTimeout(() => setStep(1), 350);
      }
    } else if (step === 1) {
      timeout = setTimeout(() => setStep(2), 500);
    } else if (step === 2) {
      timeout = setTimeout(() => setStep(3), 600);
    }

    return () => clearTimeout(timeout);
  }, [typedText, step, activeScenario]);

  return (
    <section id="demo" className="py-20 sm:py-28 border-b border-[#262626] w-full bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-left md:text-center mb-12 sm:mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FAFAFA] mb-3">
            Interactive terminal simulator
          </h2>
          <p className="text-[#737373] text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Watch tiny-agent resolve paths, request tool approval, and stream answers without bloated abstraction layers.
          </p>
        </div>

        {/* Scenario Controls - Sharp hairline borders, no rounded corners */}
        <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setActiveScenario(sc)}
              className={`px-3 py-1.5 text-xs font-mono border transition-colors whitespace-nowrap ${
                activeScenario.id === sc.id
                  ? "border-[#FAFAFA] bg-[#FAFAFA] text-[#0A0A0A] font-semibold"
                  : "border-[#262626] bg-[#0A0A0A] text-[#737373] hover:text-[#FAFAFA] hover:border-[#404040]"
              }`}
            >
              {sc.name}
            </button>
          ))}
          <button
            onClick={() => {
              setTypedText("");
              setStep(0);
            }}
            className="px-2.5 py-1.5 text-xs font-mono border border-[#262626] bg-[#0A0A0A] text-[#737373] hover:text-[#FAFAFA] hover:border-[#404040] transition-colors"
            title="Replay scenario"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Terminal Window - Sharp 1px #262626 border, #0A0A0A bg, no drop shadows */}
        <div className="border border-[#262626] bg-[#0A0A0A] font-mono text-xs overflow-hidden">
          
          {/* Minimalist Terminal Title Bar */}
          <div className="flex items-center justify-between border-b border-[#262626] px-4 py-2 bg-[#121212]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#737373]">
              <span className="text-[#FAFAFA] font-semibold">tiny-agent</span>
              <span>·</span>
              <span>interactive session</span>
            </div>
            <div className="text-[11px] text-[#737373] hidden sm:block">
              [{activeScenario.provider}]
            </div>
          </div>

          {/* Terminal Viewport */}
          <div className="p-5 space-y-3 min-h-[220px] leading-relaxed select-text font-mono">
            {/* Input line with blinking bold yellow cursor */}
            <div className="flex items-start gap-2">
              <span className="text-[#737373] select-none font-bold">$</span>
              <span className="text-[#FAFAFA]">
                {typedText}
                {step === 0 && (
                  <span className="inline-block w-2 h-4 bg-[#FFD60A] ml-1 align-middle animate-terminal-cursor" />
                )}
              </span>
            </div>

            {/* Provider line and tool invocation */}
            {step >= 1 && (
              <div className="text-[#737373] space-y-1 pt-1">
                <div>[tiny-agent] provider={activeScenario.provider}</div>
                <div className="text-[#FAFAFA] font-medium">{activeScenario.toolAction}</div>
                {activeScenario.autoResolve && (
                  <div className="text-[#737373]">{activeScenario.autoResolve}</div>
                )}
              </div>
            )}

            {/* Deliberate Accent Moment: Proceed? (y/n) confirmation prompt in #FFD60A */}
            {step >= 2 && activeScenario.confirmationPrompt && (
              <div className="pt-1 text-xs">
                <span className="text-[#FFD60A] font-bold">
                  {activeScenario.confirmationPrompt}
                </span>
                <span className="text-[#FAFAFA] font-bold">y</span>
              </div>
            )}

            {/* Execution Result */}
            {step >= 3 && (
              <div className="text-[#FAFAFA] pt-2 border-t border-[#262626] whitespace-pre-line text-xs leading-relaxed">
                {activeScenario.output}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
