"use client";

import Link from "next/link";
import { ArrowUpRight, Terminal, FileCode, Edit3, Search, HardDrive, Cpu, Sparkles } from "lucide-react";

export function Features() {
  const cards = [
    {
      title: "read_file & Auto-Resolution",
      desc: "Reads complete file contents asynchronously. If a bare filename like 'agent.ts' is requested, it performs shallow recursive resolution to 'src/agent.ts' automatically.",
      icon: FileCode,
      tag: "Safe Read",
      color: "blue",
      href: "/docs/safety#tools-reference",
    },
    {
      title: "edit_file & Diff Safety",
      desc: "Performs surgical substring replacements. Fails safely if the target string is missing or occurs multiple times, preventing accidental code corruptions.",
      icon: Edit3,
      tag: "Exact Match",
      color: "emerald",
      href: "/docs/safety#tools-reference",
    },
    {
      title: "run_shell_command & Approval",
      desc: "Executes terminal commands on the host machine with a 30-second timeout. Requires user confirmation before risky actions unless --yolo mode is active.",
      icon: Terminal,
      tag: "Approval Guard",
      color: "amber",
      href: "/docs/safety#approval-policy",
    },
    {
      title: "search_files & Regex Grep",
      desc: "Scans project directories for patterns or regex expressions, automatically ignoring node_modules, .git, and binaries to return concise line-number results.",
      icon: Search,
      tag: "Fast Grep",
      color: "purple",
      href: "/docs/safety#tools-reference",
    },
    {
      title: "Dual Engine Switcher",
      desc: "Run 100% offline with Ollama (Qwen 2.5 Coder / Llama 3.2), or toggle to Groq for ultra-fast cloud inference with standard OpenAI-compatible completions.",
      icon: HardDrive,
      tag: "Local + Cloud",
      color: "cyan",
      href: "/docs/engines",
    },
    {
      title: "Single Binary Compilation",
      desc: "Compiles directly into a single self-contained executable with bun build --compile in ~1.1s. Instant 10ms startup with zero node_modules at runtime.",
      icon: Cpu,
      tag: "Bun Native",
      color: "rose",
      href: "/docs/engines#binary-compilation",
    },
  ];

  const colorStyles: Record<string, { icon: string; tag: string; hoverGlow: string }> = {
    blue: {
      icon: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      tag: "text-blue-400 border-blue-500/20 bg-blue-500/[0.06]",
      hoverGlow: "group-hover:border-blue-500/30 group-hover:shadow-[0_0_35px_rgba(59,130,246,0.08)]",
    },
    emerald: {
      icon: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      tag: "text-emerald-400 border-emerald-500/20 bg-emerald-500/[0.06]",
      hoverGlow: "group-hover:border-emerald-500/30 group-hover:shadow-[0_0_35px_rgba(16,185,129,0.08)]",
    },
    amber: {
      icon: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      tag: "text-amber-400 border-amber-500/20 bg-amber-500/[0.06]",
      hoverGlow: "group-hover:border-amber-500/30 group-hover:shadow-[0_0_35px_rgba(245,166,35,0.08)]",
    },
    purple: {
      icon: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      tag: "text-purple-400 border-purple-500/20 bg-purple-500/[0.06]",
      hoverGlow: "group-hover:border-purple-500/30 group-hover:shadow-[0_0_35px_rgba(168,85,247,0.08)]",
    },
    cyan: {
      icon: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      tag: "text-cyan-400 border-cyan-500/20 bg-cyan-500/[0.06]",
      hoverGlow: "group-hover:border-cyan-500/30 group-hover:shadow-[0_0_35px_rgba(6,182,212,0.08)]",
    },
    rose: {
      icon: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      tag: "text-rose-400 border-rose-500/20 bg-rose-500/[0.06]",
      hoverGlow: "group-hover:border-rose-500/30 group-hover:shadow-[0_0_35px_rgba(244,63,94,0.08)]",
    },
  };

  return (
    <section 
      id="features" 
      className="relative w-full py-24 sm:py-36 border-b border-white/[0.08] bg-black overflow-hidden"
    >
      {/* Animated Traveling Beam on Top Edge */}
      <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden pointer-events-none z-20">
        <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-beam-h" />
      </div>

      {/* Animated Traveling Beam on Bottom Edge */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden pointer-events-none z-20">
        <div className="w-1/4 h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-beam-h opacity-70" />
      </div>

      {/* Subtle Background Radial Spotlight */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] pointer-events-none -z-10 opacity-40"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0, 112, 243, 0.12) 0%, rgba(0, 0, 0, 0) 70%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle Dot Grid Canvas covering the section */}
      <div className="absolute inset-0 nextjs-grid-pattern opacity-30 pointer-events-none -z-20" />

      {/* Full-width container with edge-to-edge framing */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Full-window border guide box */}
        <div className="relative border-x border-white/[0.08] px-4 sm:px-8 lg:px-12 py-10 sm:py-16">
          
          {/* Corner Coordinate Crosses (+) */}
          <span className="vercel-grid-cross -top-2 -left-2">+</span>
          <span className="vercel-grid-cross -top-2 -right-2">+</span>
          <span className="vercel-grid-cross -bottom-2 -left-2">+</span>
          <span className="vercel-grid-cross -bottom-2 -right-2">+</span>

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-20">
            <div className="max-w-2xl">
              {/* Architecture Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono text-neutral-400 mb-4 shadow-sm backdrop-blur">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="uppercase tracking-wider">0.1.0 Architecture · Fast & Minimal</span>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 font-sans">
                What's in tiny-agent?
              </h2>

              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl">
                Everything you need to inspect, edit, and ship from your terminal. Built with zero runtime bloat, sub-10ms latency, and absolute developer sovereignty.
              </p>
            </div>

            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors group self-start md:self-auto font-mono pb-1 border-b border-white/10 hover:border-white"
            >
              <span>Explore full documentation</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Bento Grid with generous gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {cards.map((card) => {
              const Icon = card.icon;
              const styles = colorStyles[card.color];
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className={`group relative flex flex-col justify-between p-6 sm:p-8 rounded-xl border border-white/[0.08] bg-neutral-950/70 hover:bg-neutral-900/70 transition-all duration-300 overflow-hidden ${styles.hoverGlow}`}
                >
                  {/* Subtle top card glow line */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Icon & Tag */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg border flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${styles.icon}`}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${styles.tag}`}>
                        {card.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2.5 flex items-center gap-1.5 font-sans group-hover:text-white transition-colors">
                      <span>{card.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all opacity-0 group-hover:opacity-100" />
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>

                  {/* Footer Link */}
                  <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-white transition-colors">
                    <span>Read reference</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1 font-bold">→</span>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
