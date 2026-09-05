"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Menu, X } from "lucide-react";

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-center w-full transition-all duration-300 ease-in-out border-b px-4 sm:px-6 ${
        isScrolled
          ? "bg-[#0A0A0A]/80 backdrop-blur-md border-white/[0.08] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="relative flex w-full max-w-6xl items-center justify-between h-14">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-[#FAFAFA] hover:opacity-90 transition-opacity"
        >
          <div className="w-7 h-7 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center">
            <Terminal className="w-3.5 h-3.5 text-[#FAFAFA]" />
          </div>
          <span className="font-mono text-sm tracking-tight">tiny-agent</span>
        </Link>

        {/* Desktop nav links: exactly Features, Compare, Docs, GitHub */}
        <div className="hidden md:flex items-center gap-6 text-xs font-mono text-[#8A8F98]">
          <Link
            href="/#features"
            className="hover:text-[#FAFAFA] hover:bg-white/[0.04] px-3 py-1.5 rounded-lg transition-all"
          >
            Features
          </Link>
          <Link
            href="/#compare"
            className="hover:text-[#FAFAFA] hover:bg-white/[0.04] px-3 py-1.5 rounded-lg transition-all"
          >
            Compare
          </Link>
          <Link
            href="/docs"
            className={`hover:text-[#FAFAFA] hover:bg-white/[0.04] px-3 py-1.5 rounded-lg transition-all ${
              pathname?.startsWith("/docs") ? "text-[#FAFAFA] font-medium bg-white/[0.05]" : ""
            }`}
          >
            Docs
          </Link>
          <a
            href="https://github.com/abdunur-dev/tiny-agent"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#FAFAFA] hover:bg-white/[0.04] px-3 py-1.5 rounded-lg transition-all"
          >
            GitHub
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          type="button"
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-white/[0.03] text-[#8A8F98] hover:text-[#FAFAFA] hover:border-white/20 transition-all"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="w-full md:hidden border-t border-white/[0.08] py-4 px-4 space-y-2 bg-[#0A0A0A]/95 backdrop-blur-xl font-mono text-xs">
          <Link
            href="/#features"
            onClick={() => setMobileOpen(false)}
            className="block text-[#8A8F98] hover:text-[#FAFAFA] hover:bg-white/[0.04] px-3 py-2 rounded-lg"
          >
            Features
          </Link>
          <Link
            href="/#compare"
            onClick={() => setMobileOpen(false)}
            className="block text-[#8A8F98] hover:text-[#FAFAFA] hover:bg-white/[0.04] px-3 py-2 rounded-lg"
          >
            Compare
          </Link>
          <Link
            href="/docs"
            onClick={() => setMobileOpen(false)}
            className="block text-[#8A8F98] hover:text-[#FAFAFA] hover:bg-white/[0.04] px-3 py-2 rounded-lg"
          >
            Docs
          </Link>
          <a
            href="https://github.com/abdunur-dev/tiny-agent"
            target="_blank"
            rel="noreferrer"
            className="block text-[#8A8F98] hover:text-[#FAFAFA] hover:bg-white/[0.04] px-3 py-2 rounded-lg"
          >
            GitHub
          </a>
        </div>
      )}
    </header>
  );
}
