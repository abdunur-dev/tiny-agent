"use client";

import Link from "next/link";
import { Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-[#8A8F98] font-mono text-xs border-t border-white/[0.08] relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-18">
        
        {/* Brand header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2.5 text-[#FAFAFA] hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg border border-white/10 bg-white/[0.04] text-[#FAFAFA]">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase">tiny-agent</span>
          </Link>
        </div>

        <div className="h-px bg-white/[0.08] mb-10" />

        {/* Link Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-[11px] text-[#FAFAFA] mb-4 font-semibold uppercase tracking-wider">
              Product
            </h4>
            <ul className="flex flex-col gap-2.5 text-[#8A8F98]">
              <li><Link href="/docs" className="hover:text-[#FAFAFA] transition-colors">Documentation</Link></li>
              <li><Link href="/#features" className="hover:text-[#FAFAFA] transition-colors">Features</Link></li>
              <li><Link href="/#tooling" className="hover:text-[#FAFAFA] transition-colors">Tooling</Link></li>
              <li><Link href="/#compare" className="hover:text-[#FAFAFA] transition-colors">Comparison</Link></li>
              <li><Link href="/#demo" className="hover:text-[#FAFAFA] transition-colors">Simulator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] text-[#FAFAFA] mb-4 font-semibold uppercase tracking-wider">
              CLI Tools
            </h4>
            <ul className="flex flex-col gap-2.5 text-[#8A8F98]">
              <li><Link href="/docs/safety#tools-reference" className="hover:text-[#FAFAFA] transition-colors">read_file</Link></li>
              <li><Link href="/docs/safety#tools-reference" className="hover:text-[#FAFAFA] transition-colors">write_file</Link></li>
              <li><Link href="/docs/safety#tools-reference" className="hover:text-[#FAFAFA] transition-colors">edit_file</Link></li>
              <li><Link href="/docs/safety#approval-policy" className="hover:text-[#FAFAFA] transition-colors">run_shell_command</Link></li>
              <li><Link href="/docs/safety#tools-reference" className="hover:text-[#FAFAFA] transition-colors">search_files</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] text-[#FAFAFA] mb-4 font-semibold uppercase tracking-wider">
              Engines
            </h4>
            <ul className="flex flex-col gap-2.5 text-[#8A8F98]">
              <li><a href="https://ollama.com" target="_blank" rel="noreferrer" className="hover:text-[#FAFAFA] transition-colors">Ollama (Offline)</a></li>
              <li><a href="https://groq.com" target="_blank" rel="noreferrer" className="hover:text-[#FAFAFA] transition-colors">Groq Cloud</a></li>
              <li><a href="https://bun.sh" target="_blank" rel="noreferrer" className="hover:text-[#FAFAFA] transition-colors">Bun Runtime</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] text-[#FAFAFA] mb-4 font-semibold uppercase tracking-wider">
              Community
            </h4>
            <ul className="flex flex-col gap-2.5 text-[#8A8F98]">
              <li><a href="https://github.com/abdunur-dev/tiny-agent" target="_blank" rel="noreferrer" className="hover:text-[#FAFAFA] transition-colors">GitHub</a></li>
              <li><Link href="/docs" className="hover:text-[#FAFAFA] transition-colors">Architecture Guide</Link></li>
              <li><Link href="/docs/safety" className="hover:text-[#FAFAFA] transition-colors">Safety Model</Link></li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-white/[0.08] my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[#8A8F98]">
          <span>© 2026 tiny-agent · minimal terminal coding agent</span>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-[#FAFAFA] transition-colors">Home</Link>
            <Link href="/docs" className="hover:text-[#FAFAFA] transition-colors">Docs</Link>
            <a href="https://github.com/abdunur-dev/tiny-agent" target="_blank" rel="noreferrer" className="hover:text-[#FAFAFA] transition-colors">GitHub</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
