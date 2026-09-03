import Link from "next/link";
import { ArrowUpRight, Terminal, FileCode, Edit3, Search, HardDrive, Cpu } from "lucide-react";

export function Features() {
  const cards = [
    {
      title: "read_file & Auto-Resolution",
      desc: "Reads complete file contents asynchronously. If a bare filename like 'agent.ts' is requested, it performs shallow recursive resolution to 'src/agent.ts' automatically.",
      icon: FileCode,
      tag: "Safe Read",
      href: "/docs/safety#tools-reference",
    },
    {
      title: "edit_file & Diff Safety",
      desc: "Performs surgical substring replacements. Fails safely if the target string is missing or occurs multiple times, preventing accidental code corruptions.",
      icon: Edit3,
      tag: "Exact Match",
      href: "/docs/safety#tools-reference",
    },
    {
      title: "run_shell_command & Approval",
      desc: "Executes terminal commands on the host machine with a 30-second timeout. Requires user confirmation before risky actions unless --yolo mode is active.",
      icon: Terminal,
      tag: "Approval Guard",
      href: "/docs/safety#approval-policy",
    },
    {
      title: "search_files & Regex Grep",
      desc: "Scans project directories for patterns or regex expressions, automatically ignoring node_modules, .git, and binaries to return concise line-number results.",
      icon: Search,
      tag: "Fast Grep",
      href: "/docs/safety#tools-reference",
    },
    {
      title: "Dual Engine Switcher",
      desc: "Run 100% offline with Ollama (Qwen 2.5 Coder / Llama 3.2), or toggle to Groq for ultra-fast cloud inference with standard OpenAI-compatible completions.",
      icon: HardDrive,
      tag: "Local + Cloud",
      href: "/docs/engines",
    },
    {
      title: "Single Binary Compilation",
      desc: "Compiles directly into a single self-contained executable with bun build --compile in ~1.1s. Instant 10ms startup with zero node_modules at runtime.",
      icon: Cpu,
      tag: "Bun Native",
      href: "/docs/engines#binary-compilation",
    },
  ];

  return (
    <section id="features" className="pt-8 sm:pt-12 pb-16 sm:pb-24 border-b border-white/[0.08] bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header matching nextjs.org */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-4 mb-8 sm:mb-12">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white mb-1.5">
              What's in tiny-agent?
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Everything you need to inspect, edit, and ship from your terminal.
            </p>
          </div>
          <Link
            href="/docs"
            className="inline-flex items-center gap-1 text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors self-start sm:self-auto"
          >
            <span>Explore full documentation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3-Column Bento Grid, fully responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-xl border border-white/[0.08] bg-neutral-950/60 hover:bg-neutral-900/60 hover:border-white/25 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-white/[0.1] transition-all">
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-semibold text-white mb-1.5 sm:mb-2 flex items-center gap-1">
                    <span>{card.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all opacity-0 group-hover:opacity-100" />
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center text-[11px] sm:text-xs font-mono text-neutral-400 group-hover:text-white transition-colors">
                  <span>Learn more</span>
                  <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
