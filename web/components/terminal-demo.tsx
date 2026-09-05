"use client";

import { useEffect, useState, useRef } from "react";
import { RotateCcw } from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  command: string;
  provider: string;
  toolAction: string;
  autoResolve?: string;
  hasConfirmation: boolean;
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
    hasConfirmation: true,
    confirmationPrompt: "Proceed? (y/n): ",
    output: "✓ Successfully replaced 'port = 3000' with 'port = 8080' in src/config.ts.",
  },
  {
    id: "exec",
    name: "run_shell_command",
    command: 'tiny-agent "execute full test suite in bun"',
    provider: "groq / openai/gpt-oss-120b",
    toolAction: "⚡ run_shell_command cmd /c bun test",
    hasConfirmation: true,
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
    hasConfirmation: false,
    output: "Standalone CLI with zero framework bloat. Standard dependencies: @modelcontextprotocol/sdk.",
  },
];

// Animation step constants
const STEP_TYPING = 0;
const STEP_TYPED_PAUSE = 1;
const STEP_WORKING = 2;
const STEP_TOOL_CALLED = 3;
const STEP_CONFIRMING = 4;
const STEP_CONFIRMED = 5;
const STEP_FINISHED = 6;

export function TerminalDemo() {
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);
  const [typedText, setTypedText] = useState("");
  const [step, setStep] = useState(STEP_TYPING);
  const [replayCount, setReplayCount] = useState(0);
  const activeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Triggered when scenario changes or manual replay is clicked
  const handleSelectScenario = (sc: Scenario) => {
    if (sc.id === activeScenario.id) {
      handleReplay();
      return;
    }
    if (activeTimerRef.current) clearTimeout(activeTimerRef.current);
    setActiveScenario(sc);
    setTypedText("");
    setStep(STEP_TYPING);
    setReplayCount((c) => c + 1);
  };

  const handleReplay = () => {
    if (activeTimerRef.current) clearTimeout(activeTimerRef.current);
    setTypedText("");
    setStep(STEP_TYPING);
    setReplayCount((c) => c + 1);
  };

  // Typing effect loop
  useEffect(() => {
    if (step === STEP_TYPING) {
      if (typedText.length < activeScenario.command.length) {
        activeTimerRef.current = setTimeout(() => {
          setTypedText(activeScenario.command.slice(0, typedText.length + 1));
        }, 32);
      } else {
        // Natural pause right after user finishes typing
        activeTimerRef.current = setTimeout(() => {
          setStep(STEP_TYPED_PAUSE);
        }, 220);
      }
    } else if (step === STEP_TYPED_PAUSE) {
      // Transition to working state
      activeTimerRef.current = setTimeout(() => {
        setStep(STEP_WORKING);
      }, 200);
    } else if (step === STEP_WORKING) {
      // Brief pulsing "working..." indicator (500ms pause per specs)
      activeTimerRef.current = setTimeout(() => {
        setStep(STEP_TOOL_CALLED);
      }, 500);
    } else if (step === STEP_TOOL_CALLED) {
      if (activeScenario.hasConfirmation) {
        // Pause before showing confirmation prompt
        activeTimerRef.current = setTimeout(() => {
          setStep(STEP_CONFIRMING);
        }, 400);
      } else {
        // For read-only tools: execute immediately without confirmation
        activeTimerRef.current = setTimeout(() => {
          setStep(STEP_FINISHED);
        }, 450);
      }
    } else if (step === STEP_CONFIRMING) {
      // Brief pause then approve with "y"
      activeTimerRef.current = setTimeout(() => {
        setStep(STEP_CONFIRMED);
      }, 380);
    } else if (step === STEP_CONFIRMED) {
      // Pause then show output
      activeTimerRef.current = setTimeout(() => {
        setStep(STEP_FINISHED);
      }, 320);
    }

    return () => {
      if (activeTimerRef.current) clearTimeout(activeTimerRef.current);
    };
  }, [typedText, step, activeScenario, replayCount]);

  return (
    <section id="demo" className="py-20 sm:py-28 border-b border-white/[0.08] w-full bg-[#0A0A0A] relative overflow-hidden">
      {/* Linear Ambient Radial */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-white/[0.03] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-left md:text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono text-[#8A8F98] mb-3">
            <span>live simulator</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FAFAFA] mb-3">
            Interactive terminal simulator
          </h2>
          <p className="text-[#8A8F98] text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Watch tiny-agent resolve paths, request tool approval, and stream answers without bloated abstraction layers.
          </p>
        </div>

        {/* Scenario Controls */}
        <div className="flex items-center gap-2 mb-3.5 overflow-x-auto pb-1">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                activeScenario.id === sc.id
                  ? "bg-white text-[#0A0A0A] font-semibold shadow-[0_1px_8px_rgba(255,255,255,0.2)]"
                  : "border border-white/10 bg-white/[0.03] text-[#8A8F98] hover:text-[#FAFAFA] hover:bg-white/[0.07] hover:border-white/20"
              }`}
            >
              {sc.name}
            </button>
          ))}
          <button
            onClick={handleReplay}
            className="p-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-[#8A8F98] hover:text-[#FAFAFA] hover:border-white/20 hover:bg-white/[0.07] transition-all"
            title="Replay scenario"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Window - Linear Glassmorphism */}
        <div className="rounded-2xl border border-white/10 bg-[#0C0D12]/90 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_20px_50px_-20px_rgba(0,0,0,0.7)] font-mono text-xs overflow-hidden">
          {/* Title Bar with minimal macOS/Linear dots */}
          <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-2.5 bg-white/[0.02]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8A8F98]">
              <div className="flex items-center gap-1.5 mr-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              </div>
              <span className="text-[#FAFAFA] font-medium">tiny-agent</span>
              <span>·</span>
              <span>session</span>
            </div>
            <div className="text-[11px] text-[#8A8F98] hidden sm:block">
              [{activeScenario.provider}]
            </div>
          </div>

          {/* Viewport */}
          <div className="p-5 space-y-3 min-h-[220px] leading-relaxed select-text font-mono">
            {/* Command input line */}
            <div className="flex items-start gap-2">
              <span className="text-[#8A8F98] select-none font-bold">$</span>
              <span className="text-[#FAFAFA]">
                {typedText}
                {step <= STEP_TYPED_PAUSE && (
                  <span className="inline-block w-2 h-4 bg-[#FFD60A] ml-1 align-middle animate-terminal-cursor" />
                )}
              </span>
            </div>

            {/* Pulsing working indicator (400-600ms natural pause) */}
            {step === STEP_WORKING && (
              <div className="text-xs text-[#8A8F98] animate-working-pulse pt-1">
                [tiny-agent] querying model...
              </div>
            )}

            {/* Tool invocation and provider line */}
            {step >= STEP_TOOL_CALLED && (
              <div className="text-[#8A8F98] space-y-1 pt-1 animate-terminal-fade-in">
                <div>[tiny-agent] provider={activeScenario.provider}</div>
                <div className="text-[#FAFAFA] font-medium">{activeScenario.toolAction}</div>
                {activeScenario.autoResolve && (
                  <div className="text-[#8A8F98]">{activeScenario.autoResolve}</div>
                )}
              </div>
            )}

            {/* Deliberate Accent Moment: Proceed? (y/n) confirmation prompt in #FFD60A */}
            {step >= STEP_CONFIRMING && activeScenario.hasConfirmation && (
              <div className="pt-1 text-xs animate-terminal-fade-in">
                <span className="text-[#FFD60A] font-bold">
                  {activeScenario.confirmationPrompt}
                </span>
                {step >= STEP_CONFIRMED ? (
                  <span className="text-[#FAFAFA] font-bold">y</span>
                ) : (
                  <span className="inline-block w-2 h-4 bg-[#FFD60A] ml-1 align-middle animate-terminal-cursor" />
                )}
              </div>
            )}

            {/* Execution Result - Smooth fade in */}
            {step >= STEP_FINISHED && (
              <div className="text-[#FAFAFA] pt-2 border-t border-white/[0.08] whitespace-pre-line text-xs leading-relaxed animate-terminal-fade-in">
                {activeScenario.output}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
