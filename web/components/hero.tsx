"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, ChevronDown } from "lucide-react";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const command = "bun install -g tiny-agent";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section className="relative flex flex-col items-center justify-start pt-6 sm:pt-10 pb-6 sm:pb-8 overflow-hidden border-b border-white/[0.08]">
      
      {/* Background Radial Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] max-w-full h-[300px] pointer-events-none -z-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.08) 0%, rgba(0, 0, 0, 0) 70%)",
        }}
        aria-hidden="true"
      />

      {/* Main Grid Container */}
      <div className="relative w-full max-w-5xl px-3 sm:px-6 flex flex-col items-center text-center">
        
        {/* Next.js Decorative Dashed Corner Box */}
        <div className="relative w-full border-x border-white/[0.08] px-4 sm:px-10 py-6 sm:py-9 flex flex-col items-center">
          
          {/* Top-Left Corner Dashed Arc (hidden on mobile to prevent overflow) */}
          <svg
            aria-hidden="true"
            className="hidden sm:block absolute -top-[37.5px] -left-[37.5px] w-[75px] h-[75px] pointer-events-none opacity-40 text-neutral-500"
            fill="none"
            viewBox="0 0 75 75"
          >
            <path
              d="M74 37.5C74 30.281 71.8593 23.2241 67.8486 17.2217C63.838 11.2193 58.1375 6.541 51.4679 3.7784C44.7984 1.0158 37.4595 0.292977 30.3792 1.70134C23.2989 3.1097 16.7952 6.58599 11.6906 11.6906C6.58599 16.7952 3.1097 23.2989 1.70134 30.3792C0.292977 37.4595 1.0158 44.7984 3.7784 51.4679C6.541 58.1375 11.2193 63.838 17.2217 67.8486C23.2241 71.8593 30.281 74 37.5 74"
              stroke="currentColor"
              strokeDasharray="2 2"
            />
          </svg>

          {/* Bottom-Right Corner Dashed Arc */}
          <svg
            aria-hidden="true"
            className="hidden sm:block absolute -bottom-[37.5px] -right-[37.5px] w-[75px] h-[75px] pointer-events-none opacity-40 text-neutral-500"
            fill="none"
            viewBox="0 0 75 75"
          >
            <path
              d="M74 37.5C74 30.281 71.8593 23.2241 67.8486 17.2217C63.838 11.2193 58.1375 6.541 51.4679 3.7784C44.7984 1.0158 37.4595 0.292977 30.3792 1.70134C23.2989 3.1097 16.7952 6.58599 11.6906 11.6906C6.58599 16.7952 3.1097 23.2989 1.70134 30.3792C0.292977 37.4595 1.0158 44.7984 3.7784 51.4679C6.541 58.1375 11.2193 63.838 17.2217 67.8486C23.2241 71.8593 30.281 74 37.5 74"
              stroke="currentColor"
              strokeDasharray="2 2"
            />
          </svg>

          {/* Version & Design badge */}
          <Link
            href="/design"
            className="group inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-neutral-900/90 hover:border-blue-500/40 hover:bg-blue-500/10 text-[11px] text-neutral-300 transition-all mb-3 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>v0.1.0 · Explore Vercel Design & Future Roadmap</span>
            <span className="text-neutral-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-transform font-mono">→</span>
          </Link>

          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2.5 sm:mb-3 leading-[1.12] max-w-3xl">
            The Coding Agent{" "}
            <span className="block text-neutral-400 font-normal sm:inline">
              for the Fast Terminal
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed mb-4 sm:mb-5 font-normal px-2">
            Built for developers who value speed, privacy, and zero bloat. Run fully offline with Ollama, or scale to cloud models via Groq with sub-10ms startup.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5 w-full sm:w-auto">
            <Link
              href="/docs"
              className="w-full sm:w-auto h-9 px-5 rounded-md bg-white text-black font-medium text-xs sm:text-sm flex items-center justify-center hover:bg-neutral-200 transition-colors shadow-sm"
            >
              Get Started
            </Link>
            <Link
              href="/docs"
              className="w-full sm:w-auto h-9 px-5 rounded-md border border-white/15 bg-white/[0.03] text-white font-medium text-xs sm:text-sm flex items-center justify-center hover:bg-white/[0.08] hover:border-white/30 transition-colors"
            >
              Learn tiny-agent
            </Link>
          </div>

          {/* Copy Command Pill */}
          <button
            onClick={handleCopy}
            type="button"
            className="group flex items-center justify-between gap-2.5 sm:gap-3 h-9 px-3 sm:px-4 rounded-md border border-white/15 bg-black hover:border-white/30 transition-colors text-[11px] sm:text-xs font-mono text-neutral-300 shadow-md max-w-full"
            title="Click to copy command"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 truncate">
              <span className="text-white/40 select-none">▲ ~</span>
              <span className="text-white truncate">{command}</span>
            </div>
            <div className="text-neutral-500 group-hover:text-white transition-colors shrink-0">
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </div>
          </button>

        </div>

        {/* Scroll hint linking directly to features section */}
        <a
          href="#features"
          className="inline-flex items-center gap-1 text-[11px] text-neutral-500 hover:text-white transition-colors mt-2"
          aria-label="Scroll to What's in tiny-agent"
        >
          <span>See what's inside</span>
          <ChevronDown className="w-3 h-3 animate-bounce" />
        </a>

      </div>

    </section>
  );
}
