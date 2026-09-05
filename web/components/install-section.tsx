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
    <section className="py-20 sm:py-28 overflow-hidden border-b border-[#262626] w-full bg-[#0A0A0A]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-left md:text-center">
        
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FAFAFA] mb-3">
          Installation
        </h2>
        <p className="text-[#737373] text-sm sm:text-base mb-10 leading-relaxed max-w-lg mx-auto">
          Clone the repository, install dependencies with Bun, and run or compile directly.
        </p>

        {/* Tabbed Box - Sharp hairline border, no rounded corners, no shadows */}
        <div className="border border-[#262626] bg-[#0A0A0A] text-left">
          
          {/* Minimalist Terminal Header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#262626] bg-[#121212]">
            <div className="text-xs font-mono text-[#737373]">
              <span className="text-[#FAFAFA]">step:</span> {tab === "clone" ? "1. clone" : tab === "build" ? "2. build" : "3. start"}
            </div>

            {/* Step Buttons */}
            <div className="flex border border-[#262626] bg-[#0A0A0A]">
              {(["clone", "build", "start"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-1 text-xs font-mono transition-colors ${
                    tab === t
                      ? "bg-[#FAFAFA] text-[#0A0A0A] font-semibold"
                      : "text-[#737373] hover:text-[#FAFAFA]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Command Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#0A0A0A] font-mono text-xs text-[#FAFAFA]">
            <div className="flex items-center gap-2 overflow-x-auto max-w-full">
              <span className="text-[#737373] select-none shrink-0">$</span>
              <span className="truncate">{commands[tab]}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-1.5 px-3 py-1 border border-[#262626] bg-[#121212] text-xs font-mono text-[#737373] hover:text-[#FAFAFA] hover:border-[#404040] transition-colors shrink-0 self-start sm:self-auto"
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
