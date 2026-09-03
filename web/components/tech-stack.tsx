import Link from "next/link";
import { ArrowUpRight, Zap, Shield, Cpu } from "lucide-react";

export function TechStack() {
  return (
    <section id="tooling" className="py-24 border-b border-white/[0.08] bg-black overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Built on a foundation of fast,{" "}
            <span className="block sm:inline">production-grade tooling</span>
          </h2>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto">
            Combining the speed of Bun's native bundler with private local models and ultra-fast cloud inference.
          </p>
        </div>

        {/* The Iconic Next.js Circuit & Central Chip Illustration */}
        <div className="relative flex flex-col items-center justify-center my-10 max-w-4xl mx-auto">
          
          {/* Animated Circuit SVG */}
          <div className="w-full max-w-[800px] h-[180px] sm:h-[220px] relative">
            <svg
              className="w-full h-full text-neutral-800"
              viewBox="0 0 800 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background static circuit traces */}
              <path
                d="M 50 110 L 250 110 L 350 110"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />
              <path
                d="M 750 110 L 550 110 L 450 110"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />
              <path
                d="M 120 20 L 250 20 L 360 80"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />
              <path
                d="M 680 20 L 550 20 L 440 80"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />
              <path
                d="M 160 200 L 280 200 L 360 140"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />
              <path
                d="M 640 200 L 520 200 L 440 140"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />

              {/* Animated pulses running down traces into center */}
              <path
                d="M 50 110 L 250 110 L 350 110"
                stroke="url(#blue-pulse)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="animate-circuit-pulse"
              />
              <path
                d="M 750 110 L 550 110 L 450 110"
                stroke="url(#orange-pulse)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="animate-circuit-pulse"
              />
              <path
                d="M 120 20 L 250 20 L 360 80"
                stroke="url(#emerald-pulse)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="animate-circuit-pulse-fast"
              />
              <path
                d="M 680 20 L 550 20 L 440 80"
                stroke="url(#purple-pulse)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="animate-circuit-pulse-fast"
              />

              {/* Gradients for glowing pulses */}
              <defs>
                <linearGradient id="blue-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0070F3" stopOpacity="0" />
                  <stop offset="80%" stopColor="#0070F3" stopOpacity="1" />
                  <stop offset="100%" stopColor="#50E3C2" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="orange-pulse" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#F5A623" stopOpacity="0" />
                  <stop offset="80%" stopColor="#FF4A81" stopOpacity="1" />
                  <stop offset="100%" stopColor="#DF6CF6" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="emerald-pulse" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
                  <stop offset="100%" stopColor="#34D399" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="purple-pulse" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="1" />
                </linearGradient>
              </defs>
            </svg>

            {/* Central CPU / Engine Chip */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center w-36 h-20 sm:w-44 sm:h-24 rounded-xl border border-white/20 bg-neutral-950 shadow-2xl">
              <div className="flex items-center gap-1.5 mb-1">
                <Cpu className="w-4 h-4 text-white" />
                <span className="text-xs font-mono font-bold tracking-wider text-white">
                  CORE ENGINE
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">
                Bun + TypeScript
              </span>
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500/20 via-white/10 to-emerald-500/20 blur-sm -z-10" />
            </div>
          </div>

        </div>

        {/* 3 Supporting Tech Cards (like Next.js React / Turbopack / Vercel cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-6">
          
          {/* Bun Runtime */}
          <div className="p-6 rounded-xl border border-white/[0.08] bg-neutral-950/60 hover:border-white/25 hover:bg-neutral-900/40 transition-all duration-200 group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-white">Bun Runtime</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              All-in-one JavaScript & TypeScript toolkit. Boots the agent in under 10ms and compiles native binaries with zero external runtime requirements.
            </p>
          </div>

          {/* Ollama Offline */}
          <div className="p-6 rounded-xl border border-white/[0.08] bg-neutral-950/60 hover:border-white/25 hover:bg-neutral-900/40 transition-all duration-200 group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-white">Ollama Engine</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Private, local-first inference running natively on your hardware. Your files, prompts, and tokens never leave your local machine.
            </p>
          </div>

          {/* Groq Cloud */}
          <div className="p-6 rounded-xl border border-white/[0.08] bg-neutral-950/60 hover:border-white/25 hover:bg-neutral-900/40 transition-all duration-200 group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-white">Groq LPU Cloud</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Ultra-fast cloud fallback delivering 500+ tokens per second. Stream responses with instantaneous tool generation over standard OpenAI endpoints.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
