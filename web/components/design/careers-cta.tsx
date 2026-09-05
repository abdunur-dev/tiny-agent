"use client";

import Link from "next/link";
import { ArrowUpRight, Github, MessageSquare, Terminal } from "lucide-react";

export function CareersCta() {
  return (
    <section id="careers" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto text-center">
      {/* Background Spotlight */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-t from-blue-500/10 via-emerald-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
          <Terminal className="w-6 h-6 text-white" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 font-sans">
          Want to jam with us?
        </h2>

        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8">
          tiny-agent is completely open-source. Whether you're an interface designer obsessed with pixel density, a systems engineer profiling Bun memory, or an AI researcher training local coding models — we’d love your craft.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto h-10 px-6 rounded-md bg-white text-black font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-neutral-200 transition shadow-lg"
          >
            <Github className="w-4 h-4" />
            <span>Contribute on GitHub</span>
          </a>

          <Link
            href="/docs"
            className="w-full sm:w-auto h-10 px-6 rounded-md border border-white/20 bg-white/[0.04] text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-white/[0.08] hover:border-white/30 transition"
          >
            <span>Read Agent Architecture</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
