"use client";

import { useState } from "react";
import { Check, Copy, Terminal, ShieldAlert, Sparkles, AlertCircle } from "lucide-react";

export function TokensSection() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [terminalInput, setTerminalInput] = useState("tiny-agent --yolo 'optimize imports in src/'");

  const colors = [
    { name: "--ds-background", hex: "#000000", label: "OLED Black" },
    { name: "--ds-gray-100", hex: "#111111", label: "Surface Layer" },
    { name: "--ds-gray-400", hex: "#262626", label: "Border Strong" },
    { name: "--ds-gray-700", hex: "#666666", label: "Muted Text" },
    { name: "--ds-gray-900", hex: "#8e8e8e", label: "Secondary Text" },
    { name: "--ds-gray-1000", hex: "#ffffff", label: "Pure Foreground" },
    { name: "--ds-blue-700", hex: "#0070f3", label: "Geist Blue" },
    { name: "--ds-emerald-700", hex: "#10b981", label: "Safe Success" },
    { name: "--ds-amber-700", hex: "#f5a623", label: "Risky Action" },
    { name: "--ds-red-700", hex: "#e00000", label: "Error Halt" },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  const simulateLoading = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 2000);
  };

  return (
    <section id="tokens" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto border-b border-white/[0.08]">
      {/* Header */}
      <div className="mb-14 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-xs font-mono text-purple-400 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Geist Tokens & Living Primitives</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3 font-sans">
          Design Tokens & Components.
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
          The atomic building blocks powering tiny-agent interfaces across web surfaces and terminal viewports. Engineered for high visual acuity, extreme contrast, and low cognitive fatigue.
        </p>
      </div>

      {/* Grid of Interactive Token Showcases */}
      <div className="space-y-12">
        
        {/* Row 1: Color Tokens */}
        <div>
          <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-4 flex items-center justify-between">
            <span>Color Palette Tokens (Click to Copy)</span>
            <span className="text-xs text-neutral-500 font-normal">Geist Dark Foundation</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => handleCopy(c.hex)}
                type="button"
                className="group p-3 rounded-lg border border-white/10 bg-black hover:border-white/30 text-left transition flex flex-col justify-between h-28"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-5 h-5 rounded border border-white/20 shadow-sm"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div className="text-neutral-500 group-hover:text-white transition">
                    {copiedToken === c.hex ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-white group-hover:text-blue-400 transition font-mono">
                    {c.hex}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400 truncate">
                    {c.label}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Interactive Geist Buttons & Status Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Button States */}
          <div className="rounded-xl border border-white/10 bg-neutral-950/60 p-6">
            <h4 className="text-sm font-bold text-white mb-4 font-sans flex items-center justify-between">
              <span>Interactive Button Hierarchy</span>
              <span className="text-xs font-mono text-neutral-500">Live States</span>
            </h4>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={simulateLoading}
                  className="h-9 px-4 rounded-md bg-white text-black font-medium text-xs hover:bg-neutral-200 transition shadow-sm flex items-center gap-2"
                >
                  {btnLoading ? (
                    <>
                      <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Primary Action</span>
                  )}
                </button>

                <button
                  type="button"
                  className="h-9 px-4 rounded-md border border-white/20 bg-white/[0.04] text-white font-medium text-xs hover:bg-white/[0.08] hover:border-white/30 transition"
                >
                  Secondary Action
                </button>

                <button
                  type="button"
                  className="h-9 px-3 rounded-md text-neutral-400 hover:text-white text-xs transition"
                >
                  Ghost Button
                </button>
              </div>

              <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="h-8 px-3 rounded-md bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-medium hover:bg-red-600/30 transition flex items-center gap-1.5"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Decline Action</span>
                </button>

                <button
                  type="button"
                  className="h-8 px-3 rounded-md bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-medium hover:bg-blue-600/30 transition"
                >
                  Geist Accent
                </button>
              </div>
            </div>
          </div>

          {/* Status Badges & Confirmation Banner */}
          <div className="rounded-xl border border-white/10 bg-neutral-950/60 p-6 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-white mb-4 font-sans flex items-center justify-between">
                <span>Confirmation & Safety Elements</span>
                <span className="text-xs font-mono text-neutral-500">Zero Ambiguity</span>
              </h4>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>read_file (safe)</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-[11px] font-mono text-amber-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>write_file (confirm)</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-[11px] font-mono text-blue-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>mcp: connected</span>
                </span>
              </div>

              {/* Confirmation Banner */}
              <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-950/20 flex items-start gap-2.5 font-mono text-xs text-amber-200">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Execute command? (y/N)</div>
                  <div className="text-[11px] text-amber-300/80">
                    run_shell_command: "bun test"
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[11px] font-mono text-neutral-500 pt-3">
              Safety rule: Never write or execute commands without user consent.
            </div>
          </div>

        </div>

        {/* Row 3: Live Terminal Playground */}
        <div className="rounded-xl border border-white/10 bg-black p-5 sm:p-6 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-neutral-400 text-xs ml-2">tiny-agent · live terminal simulator</span>
            </div>
            <span className="text-[11px] text-neutral-500">Bun v1.4.0</span>
          </div>

          <div className="space-y-2 text-neutral-300 mb-4">
            <div className="text-neutral-500"># Welcome to tiny-agent interactive shell</div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">▲ ~</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                className="flex-1 bg-transparent text-white border-none outline-none font-mono text-xs focus:ring-0"
              />
            </div>
          </div>

          <div className="p-3 rounded bg-white/[0.03] border border-white/5 space-y-1 text-neutral-400 text-[11px]">
            <div>↳ read_file: src/agent.ts (dimmed status)</div>
            <div>⚡ edit_file: src/agent.ts [1 occurrence replaced]</div>
            <div className="text-emerald-400 font-semibold">✓ Done in 14.2ms · 0 tokens leaked</div>
          </div>
        </div>

      </div>
    </section>
  );
}
