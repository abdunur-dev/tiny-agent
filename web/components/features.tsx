"use client";

import Link from "next/link";
import { Terminal, FileCode, Edit3, Search, HardDrive, Cpu } from "lucide-react";

export function Features() {
  const cards = [
    {
      title: "read_file & auto-resolution",
      desc: "Reads complete file contents asynchronously. When given a bare filename like 'agent.ts', it resolves to 'src/agent.ts' automatically if unique.",
      icon: FileCode,
      tag: "read_file",
      href: "/docs/safety#tools-reference",
    },
    {
      title: "edit_file with single replacement",
      desc: "Performs exact substring replacement. Fails safely if the target string is missing or occurs multiple times, preventing accidental code corruption.",
      icon: Edit3,
      tag: "edit_file",
      href: "/docs/safety#tools-reference",
    },
    {
      title: "run_shell_command with confirmation",
      desc: "Executes shell commands with a 30-second timeout. Prompts for interactive confirmation before running unless --yolo mode is passed.",
      icon: Terminal,
      tag: "run_shell_command",
      href: "/docs/safety#approval-policy",
    },
    {
      title: "search_files regex scanner",
      desc: "Scans project directories for literal text or regex patterns. Skips node_modules, .git, and binaries to return concise line matches.",
      icon: Search,
      tag: "search_files",
      href: "/docs/safety#tools-reference",
    },
    {
      title: "Local Ollama & Groq cloud",
      desc: "Run 100% offline with local models (Qwen 2.5 Coder, Llama 3.2), or switch to Groq for fast cloud inference via standard OpenAI completions.",
      icon: HardDrive,
      tag: "engines",
      href: "/docs/engines",
    },
    {
      title: "Standalone binary compilation",
      desc: "Compiles to a single self-contained executable with bun build --compile in ~1.1s. Zero node_modules required on target machines.",
      icon: Cpu,
      tag: "binary",
      href: "/docs/engines#binary-compilation",
    },
  ];

  return (
    <section id="features" className="w-full py-20 sm:py-28 border-b border-[#262626] bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl text-left">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FAFAFA] mb-3">
              What's in tiny-agent
            </h2>
            <p className="text-[#737373] text-sm sm:text-base leading-relaxed">
              Core tools and runtime capabilities designed for fast inspection, precise editing, and safe execution directly from your terminal.
            </p>
          </div>

          <Link
            href="/docs"
            className="text-xs sm:text-sm font-mono text-[#737373] hover:text-[#FAFAFA] pb-0.5 border-b border-[#262626] hover:border-[#FAFAFA] transition-colors self-start md:self-auto"
          >
            Full documentation
          </Link>
        </div>

        {/* Sharp Cards Grid - Hairline #262626 border, 0px border-radius, no drop shadows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group border border-[#262626] bg-[#0A0A0A] hover:border-[#404040] hover:bg-[#121212] transition-colors p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-8 h-8 border border-[#262626] bg-[#171717] flex items-center justify-center text-[#FAFAFA]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono text-[#737373] px-2 py-0.5 border border-[#262626] bg-[#121212]">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="font-heading text-base font-semibold text-[#FAFAFA] mb-2 group-hover:text-white transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-[#262626] text-xs font-mono text-[#737373] group-hover:text-[#FAFAFA] transition-colors">
                  Reference
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
