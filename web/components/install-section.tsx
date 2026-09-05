"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function InstallSection() {
  const [tab, setTab] = useState<"clone" | "build" | "start">("clone");
  const [copied, setCopied] = useState(false);

  const commands = {
    clone: "git clone https://github.com/abdunur-dev/tiny-agent && cd tiny-agent && bun install",
    build: "bun run build",
    start: "bun run start",
  };

  const copyCommands = {
    clone: "git clone https://github.com/abdunur-dev/tiny-agent\ncd tiny-agent\nbun install",
    build: "bun run build",
    start: "bun run start",
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyCommands[tab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section className="py-20 sm:py-28 overflow-hidden border-b border-white/10">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
        
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/[0.02] text-white/50 uppercase tracking-wider mb-4">
          Install
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
          Start coding in seconds
        </h2>
        <p className="text-white/50 text-sm mb-8 leading-relaxed">
          Clone the repository, install dependencies with Bun, and run or compile directly.
        </p>

        {/* Tabbed Box */}
        <div className="rounded-lg border border-white/15 bg-black overflow-hidden shadow-2xl text-left">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#090909]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span className="text-xs text-white/40 font-mono ml-2">install</span>
            </div>

            {/* Step / Command Buttons */}
            <div className="flex bg-[#0a0a0a] rounded border border-white/10 p-0.5">
              {(["clone", "build", "start"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-0.5 text-xs font-mono rounded transition-all duration-150 ${
                    tab === t
                      ? "bg-white text-black font-bold"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {t === "clone" ? "1. clone" : t === "build" ? "2. build" : "3. start"}
                </button>
              ))}
            </div>
          </div>

          {/* Command Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-black font-mono text-xs text-white/90">
            <div className="flex items-center gap-2 overflow-x-auto max-w-full">
              <span className="text-emerald-400 select-none shrink-0">$</span>
              <span className="truncate">{commands[tab]}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-1.5 px-3 py-1 rounded text-xs font-mono border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-colors shrink-0 self-end sm:self-auto"
              title="Copy install command"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
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
