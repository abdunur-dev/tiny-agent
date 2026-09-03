import Link from "next/link";
import { Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white/50 font-mono text-xs">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        
        {/* Brand header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center w-5 h-5 rounded bg-white/[0.08] border border-white/10 text-white">
              <Terminal className="w-3 h-3" />
            </div>
            <span className="text-sm font-bold tracking-wider uppercase text-white">TINY-AGENT</span>
          </Link>
          <span className="text-white/30 text-xs">v0.1.0 · open-source</span>
        </div>

        <div className="h-px bg-white/10 mb-10" />

        {/* Link Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-white/30 mb-4 font-semibold">
              Product
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/#compare" className="hover:text-white transition-colors">Comparison</Link></li>
              <li><Link href="/#demo" className="hover:text-white transition-colors">Simulator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-white/30 mb-4 font-semibold">
              CLI Tools
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="/docs#tools" className="hover:text-white transition-colors">read_file</Link></li>
              <li><Link href="/docs#tools" className="hover:text-white transition-colors">write_file</Link></li>
              <li><Link href="/docs#tools" className="hover:text-white transition-colors">edit_file</Link></li>
              <li><Link href="/docs#tools" className="hover:text-white transition-colors">run_shell_command</Link></li>
              <li><Link href="/docs#tools" className="hover:text-white transition-colors">search_files</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-white/30 mb-4 font-semibold">
              Engines
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li><a href="https://ollama.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Ollama (Offline) ↗</a></li>
              <li><a href="https://groq.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Groq Cloud ↗</a></li>
              <li><a href="https://bun.sh" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Bun Runtime ↗</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-white/30 mb-4 font-semibold">
              Community
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub ↗</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter ↗</a></li>
              <li><Link href="/docs" className="hover:text-white transition-colors">Architecture Guide</Link></li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-white/10 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40">
          <span>© 2026 tiny-agent · inspired by fx.sh & Vercel Design</span>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
