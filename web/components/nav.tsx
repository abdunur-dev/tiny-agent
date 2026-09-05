"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Github, Terminal, Menu, X } from "lucide-react";

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-center w-full bg-[#0A0A0A]/95 border-b border-[#262626] px-4 sm:px-6">
      <nav className="relative flex w-full max-w-6xl items-center justify-between h-14">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-[#FAFAFA] hover:opacity-90 transition-opacity"
          >
            <div className="w-6 h-6 border border-[#262626] bg-[#0A0A0A] flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-[#FAFAFA]" />
            </div>
            <span className="font-mono text-sm tracking-tight">tiny-agent</span>
          </Link>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 text-xs text-[#737373]">
          <Link
            href="/"
            className={`hover:text-[#FAFAFA] transition-colors duration-150 ${
              pathname === "/" ? "text-[#FAFAFA] font-medium" : ""
            }`}
          >
            Overview
          </Link>
          <Link
            href="/#features"
            className="hover:text-[#FAFAFA] transition-colors duration-150"
          >
            Features
          </Link>
          <Link
            href="/#tooling"
            className="hover:text-[#FAFAFA] transition-colors duration-150"
          >
            Tooling
          </Link>
          <Link
            href="/#compare"
            className="hover:text-[#FAFAFA] transition-colors duration-150"
          >
            Comparison
          </Link>
          <Link
            href="/docs"
            className={`hover:text-[#FAFAFA] transition-colors duration-150 ${
              pathname?.startsWith("/docs") ? "text-[#FAFAFA] font-medium" : ""
            }`}
          >
            Docs
          </Link>
          <a
            href="https://github.com/abdunur-dev/tiny-agent"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#FAFAFA] transition-colors duration-150"
          >
            GitHub
          </a>
        </div>

        {/* Right side: Search + Buttons + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/docs"
            className="hidden sm:flex items-center justify-between gap-3 h-8 px-2.5 border border-[#262626] bg-[#0A0A0A] text-xs text-[#737373] hover:border-[#404040] hover:text-[#FAFAFA] transition-all w-36 md:w-44"
          >
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <Search className="w-3 h-3" />
              <span>Search docs...</span>
            </span>
            <kbd className="text-[10px] font-mono px-1 py-0.5 border border-[#262626] bg-[#171717] text-[#FAFAFA]">
              /
            </kbd>
          </Link>

          <a
            href="https://github.com/abdunur-dev/tiny-agent"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 h-8 px-2.5 border border-[#262626] bg-[#0A0A0A] text-xs font-mono text-[#FAFAFA] hover:bg-[#171717] transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <Link
            href="/docs"
            className="flex items-center justify-center h-8 px-3 sm:px-3.5 bg-[#FAFAFA] text-[#0A0A0A] text-xs font-medium hover:bg-[#E5E5E5] transition-colors"
          >
            Get Started
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            type="button"
            className="md:hidden flex items-center justify-center w-8 h-8 border border-[#262626] text-[#737373] hover:text-[#FAFAFA] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </nav>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="w-full md:hidden border-t border-[#262626] py-4 px-2 space-y-2 bg-[#0A0A0A]">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-[#737373] hover:text-[#FAFAFA] py-1 px-2"
          >
            Overview
          </Link>
          <Link
            href="/#features"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-[#737373] hover:text-[#FAFAFA] py-1 px-2"
          >
            Features
          </Link>
          <Link
            href="/#tooling"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-[#737373] hover:text-[#FAFAFA] py-1 px-2"
          >
            Tooling
          </Link>
          <Link
            href="/#compare"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-[#737373] hover:text-[#FAFAFA] py-1 px-2"
          >
            Comparison
          </Link>
          <Link
            href="/docs"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-[#737373] hover:text-[#FAFAFA] py-1 px-2"
          >
            Documentation
          </Link>
          <a
            href="https://github.com/abdunur-dev/tiny-agent"
            target="_blank"
            rel="noreferrer"
            className="block text-sm text-[#737373] hover:text-[#FAFAFA] py-1 px-2"
          >
            GitHub
          </a>
        </div>
      )}
    </header>
  );
}
