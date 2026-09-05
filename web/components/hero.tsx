"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const command = "git clone https://github.com/abdunur-dev/tiny-agent && cd tiny-agent && bun install";
  const copyCommand = "git clone https://github.com/abdunur-dev/tiny-agent\ncd tiny-agent\nbun install\nbun run build";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section className="relative w-full border-b border-[#262626] bg-[#0A0A0A] py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Left-Aligned Terminal Hero Content */}
        <div className="max-w-3xl flex flex-col items-start text-left">
          
          {/* Subtle status tag (not an ALL-CAPS tracked out label) */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-[#262626] bg-[#121212] text-xs font-mono text-[#737373] mb-6">
            <span className="w-1.5 h-1.5 bg-[#FAFAFA]" />
            <span>v0.1.0 · open-source on bun</span>
          </div>

          {/* Heading in Space Grotesk - bold, confident, unexpected scale */}
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FAFAFA] mb-6 leading-[1.05]">
            The coding agent for the fast terminal.
          </h1>

          {/* Subtitle in Inter */}
          <p className="text-base sm:text-lg text-[#737373] leading-relaxed mb-8 max-w-2xl">
            Built for developers who value speed, privacy, and zero framework bloat. Run fully offline with local Ollama models, or stream cloud inference via Groq with sub-10ms startup.
          </p>

          {/* Left-Aligned Install Terminal Box */}
          <div className="w-full max-w-2xl mb-8">
            <div className="border border-[#262626] bg-[#0A0A0A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-3.5 font-mono text-xs">
              <div className="flex items-center gap-2 overflow-x-auto text-[#FAFAFA]">
                <span className="text-[#737373] select-none">$</span>
                <span className="truncate">{command}</span>
              </div>
              <button
                onClick={handleCopy}
                type="button"
                className="flex items-center justify-center gap-1.5 px-3 py-1 border border-[#262626] bg-[#121212] text-xs font-mono text-[#737373] hover:text-[#FAFAFA] hover:border-[#404040] transition-colors shrink-0 self-start sm:self-auto"
                title="Copy install commands"
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

          {/* Left-Aligned Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/docs"
              className="h-10 px-6 bg-[#FAFAFA] text-[#0A0A0A] font-semibold text-xs sm:text-sm flex items-center justify-center hover:bg-[#E5E5E5] transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/#features"
              className="h-10 px-6 border border-[#262626] bg-[#0A0A0A] text-[#FAFAFA] font-medium text-xs sm:text-sm flex items-center justify-center hover:border-[#404040] hover:bg-[#121212] transition-colors"
            >
              Explore Features
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
