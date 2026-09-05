"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function InstallSection() {
  const [tab, setTab] = useState<"bun" | "npm">("bun");
  const [copied, setCopied] = useState(false);

  const commands = {
    bun: "bun install -g tiny-agent",
    npm: "npm install -g tiny-agent",
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(commands[tab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section className="py-20 sm:py-28 overflow-hidden border-b border-white/[0.08] w-full bg-[#0A0A0A] relative">
      {/* Linear Ambient Radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-b from-white/[0.025] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-left md:text-center">
        
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono text-[#8A8F98] mb-3">
          <span>quick start</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FAFAFA] mb-3">
          Installation
        </h2>
        <p className="text-[#8A8F98] text-sm sm:text-base mb-8 leading-relaxed max-w-lg mx-auto">
          Install globally via Bun or npm to get the tiny-agent executable in your terminal.
        </p>

        {/* Tabbed Box - Linear Glassmorphism Card */}
        <div className="rounded-2xl border border-white/10 bg-[#0C0D12]/80 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_20px_50px_-20px_rgba(0,0,0,0.7)] text-left overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] bg-white/[0.02]">
            <div className="text-xs font-mono text-[#8A8F98] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>package: <strong className="text-[#FAFAFA] font-medium">tiny-agent</strong></span>
            </div>

            {/* Linear Pill Tabs */}
            <div className="flex p-1 rounded-lg border border-white/10 bg-white/[0.03]">
              {(["bun", "npm"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-all ${
                    tab === t
                      ? "bg-white text-[#0A0A0A] font-semibold shadow-[0_1px_4px_rgba(255,255,255,0.2)]"
                      : "text-[#8A8F98] hover:text-[#FAFAFA]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Quiet clarification note */}
          <div className="px-5 pt-4 pb-1 text-[11px] font-mono text-[#8A8F98]">
            Requires <a href="https://bun.sh" target="_blank" rel="noreferrer" className="text-[#FAFAFA] hover:underline underline-offset-2">Bun</a> (https://bun.sh) installed, even when installing via npm
          </div>

          {/* Command Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 font-mono text-xs text-[#FAFAFA]">
            <div className="flex items-center gap-2.5 overflow-x-auto max-w-full">
              <span className="text-[#8A8F98] select-none shrink-0 font-bold">$</span>
              <span className="truncate">{commands[tab]}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-xs font-mono text-[#8A8F98] hover:text-[#FAFAFA] hover:border-white/20 hover:bg-white/[0.08] transition-all shrink-0 self-start sm:self-auto"
              title="Copy install command"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#FAFAFA]" />
                  <span className="text-[#FAFAFA]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
