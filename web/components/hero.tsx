"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, ArrowRight } from "lucide-react";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const command = "bun install -g tiny-agent";
  const copyCommand = "bun install -g tiny-agent";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section className="relative w-full border-b border-white/[0.08] bg-[#0A0A0A] py-18 sm:py-28 overflow-hidden">
      {/* Linear Atmospheric Glow & Grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-white/[0.06] via-white/[0.015] to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="linear-grid linear-mask absolute inset-0 pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        
        {/* Left-Aligned Terminal Hero Content */}
        <div className="max-w-3xl flex flex-col items-start text-left">
          
          {/* Linear-style Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-[#8A8F98] mb-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:border-white/20 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>fast terminal coding agent</span>
          </div>

          {/* Heading in Space Grotesk */}
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FAFAFA] mb-6 leading-[1.05]">
            The coding agent for the fast terminal.
          </h1>

          {/* Subtitle in Inter */}
          <p className="text-base sm:text-lg text-[#8A8F98] leading-relaxed mb-8 max-w-2xl">
            Built for developers who value speed, privacy, and zero framework bloat. Run fully offline with local Ollama models, or stream cloud inference via Groq with sub-10ms startup.
          </p>

          {/* Linear-style Install Terminal Box */}
          <div className="w-full max-w-2xl mb-8">
            <div className="rounded-xl border border-white/10 bg-[#0C0D12]/80 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-3.5 font-mono text-xs">
              <div className="flex items-center gap-2.5 overflow-x-auto text-[#FAFAFA]">
                <span className="text-[#8A8F98] select-none font-bold">$</span>
                <span className="truncate">{command}</span>
              </div>
              <button
                onClick={handleCopy}
                type="button"
                className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg border border-white/10 bg-white/[0.04] text-xs font-mono text-[#8A8F98] hover:text-[#FAFAFA] hover:border-white/20 hover:bg-white/[0.08] transition-all shrink-0 self-start sm:self-auto"
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

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/docs"
              className="rounded-lg linear-btn-primary h-10 px-6 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/#features"
              className="rounded-lg linear-btn-secondary h-10 px-6 font-medium text-xs sm:text-sm flex items-center justify-center"
            >
              Explore Features
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
