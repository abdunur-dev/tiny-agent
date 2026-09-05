"use client";

import { Cpu, HardDrive, Zap } from "lucide-react";

export function TechStack() {
  return (
    <section id="tooling" className="py-20 sm:py-28 border-b border-white/[0.08] bg-[#0A0A0A] w-full relative overflow-hidden">
      {/* Linear Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-b from-white/[0.02] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="text-left md:text-center mb-14 sm:mb-18 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono text-[#8A8F98] mb-3">
            <span>engine & execution</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FAFAFA] mb-3">
            Production-grade tooling foundation
          </h2>
          <p className="text-[#8A8F98] text-sm sm:text-base leading-relaxed">
            Combines Bun&apos;s native bundler and runtime with private local models and fast cloud streaming.
          </p>
        </div>

        {/* Minimalist Architecture Wireframe */}
        <div className="relative flex flex-col items-center justify-center my-8 max-w-4xl mx-auto">
          <div className="w-full max-w-[760px] h-[160px] sm:h-[180px] relative">
            <svg
              className="w-full h-full text-white/10"
              viewBox="0 0 760 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 40 90 L 250 90 L 330 90" stroke="currentColor" strokeWidth="1" />
              <path d="M 720 90 L 510 90 L 430 90" stroke="currentColor" strokeWidth="1" />
              <path d="M 100 30 L 240 30 L 330 70" stroke="currentColor" strokeWidth="1" />
              <path d="M 660 30 L 520 30 L 430 70" stroke="currentColor" strokeWidth="1" />
              <path d="M 140 150 L 260 150 L 330 110" stroke="currentColor" strokeWidth="1" />
              <path d="M 620 150 L 500 150 L 430 110" stroke="currentColor" strokeWidth="1" />

              {/* Minimalist monochrome indicator pulses */}
              <circle cx="250" cy="90" r="3" fill="#FAFAFA" />
              <circle cx="510" cy="90" r="3" fill="#FAFAFA" />
              <circle cx="240" cy="30" r="2" fill="#8A8F98" />
              <circle cx="520" cy="30" r="2" fill="#8A8F98" />
            </svg>

            {/* Central Architecture Module - Linear Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center w-48 h-22 rounded-2xl linear-card p-3">
              <div className="flex items-center gap-2 mb-1 text-[#FAFAFA]">
                <Cpu className="w-4 h-4" />
                <span className="text-xs font-mono font-medium tracking-tight">
                  tiny-agent core
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#8A8F98]">
                Bun + TypeScript
              </span>
            </div>
          </div>
        </div>

        {/* 3 Supporting Linear Bento Tech Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mt-6">
          
          <div className="p-6 sm:p-7 rounded-2xl linear-card">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-[#FAFAFA]">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-base font-semibold text-[#FAFAFA]">
                Bun Runtime
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#8A8F98] leading-relaxed">
              Native TypeScript execution without compilation steps. Sub-10ms startup and fast compilation to a single binary.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl linear-card">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-[#FAFAFA]">
                <HardDrive className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-base font-semibold text-[#FAFAFA]">
                Ollama Engine
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#8A8F98] leading-relaxed">
              Private, local-first inference running directly on your machine. Your code and prompts never leave your local environment.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl linear-card">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-[#FAFAFA]">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-base font-semibold text-[#FAFAFA]">
                Groq Cloud
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#8A8F98] leading-relaxed">
              Fast cloud inference via OpenAI-compatible endpoints. Instant tool streaming when you need larger model capabilities.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
