"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Github, Terminal, Menu, X } from "lucide-react";

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex flex-col justify-around items-center w-full bg-black/90 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-6">
      <nav className="relative flex w-full max-w-6xl items-center justify-between h-14">
        
        {/* Left: Brand Logo without Vercel logo */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
          >
            <div className="w-6 h-6 rounded border border-white/20 bg-neutral-900 flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-white" />
            </div>
            <span>tiny-agent</span>
          </Link>
        </div>

        {/* Center: Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 text-xs text-neutral-400">
          <Link
            href="/"
            className={`hover:text-white transition-colors duration-150 ${
              pathname === "/" ? "text-white font-medium" : ""
            }`}
          >
            Overview
          </Link>
          <Link
            href="/#features"
            className="hover:text-white transition-colors duration-150"
          >
            Features
          </Link>
          <Link
            href="/#tooling"
            className="hover:text-white transition-colors duration-150"
          >
            Tooling
          </Link>
          <Link
            href="/docs"
            className={`hover:text-white transition-colors duration-150 ${
              pathname?.startsWith("/docs") ? "text-white font-medium" : ""
            }`}
          >
            Docs
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-0.5 hover:text-white transition-colors duration-150"
          >
            <span>GitHub</span>
            <span className="text-[10px] text-neutral-500">↗</span>
          </a>
        </div>

        {/* Right side: Search + Buttons + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Button with Cmd+K */}
          <Link
            href="/docs"
            className="hidden sm:flex items-center justify-between gap-3 h-8 px-2.5 rounded-md border border-white/10 bg-white/[0.04] text-xs text-neutral-400 hover:border-white/20 hover:text-white transition-all w-40 md:w-48"
          >
            <span className="flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" />
              <span>Search docs...</span>
            </span>
            <kbd className="text-[10px] font-mono px-1 py-0.5 rounded bg-white/10 text-neutral-300">
              ⌘K
            </kbd>
          </Link>

          {/* GitHub Star */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 h-8 px-2.5 rounded-md border border-white/10 bg-black text-xs font-medium text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Star</span>
          </a>

          {/* Get Started CTA */}
          <Link
            href="/docs"
            className="flex items-center justify-center h-8 px-3 sm:px-3.5 rounded-md bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors shadow-sm"
          >
            Get Started
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            type="button"
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-md border border-white/10 text-neutral-400 hover:text-white transition-colors ml-1"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </nav>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="w-full md:hidden border-t border-white/10 py-4 px-2 space-y-3 bg-black">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-neutral-300 hover:text-white py-1 px-2"
          >
            Overview
          </Link>
          <Link
            href="/#features"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-neutral-300 hover:text-white py-1 px-2"
          >
            Features
          </Link>
          <Link
            href="/#tooling"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-neutral-300 hover:text-white py-1 px-2"
          >
            Tooling
          </Link>
          <Link
            href="/docs"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-neutral-300 hover:text-white py-1 px-2"
          >
            Documentation
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="block text-sm text-neutral-300 hover:text-white py-1 px-2"
          >
            GitHub ↗
          </a>
        </div>
      )}
    </header>
  );
}
