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
      className={`sticky top-0 z-50 flex items-center justify-center w-full transition-colors duration-300 ease-in-out border-b px-4 sm:px-6 ${
        isScrolled
          ? "bg-[#0A0A0A] border-[#262626]"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="relative flex w-full max-w-6xl items-center justify-between h-14">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-[#FAFAFA] hover:opacity-90 transition-opacity"
        >
          <div className="w-6 h-6 border border-[#262626] bg-[#0A0A0A] flex items-center justify-center">
            <Terminal className="w-3.5 h-3.5 text-[#FAFAFA]" />
          </div>
          <span className="font-mono text-sm tracking-tight">tiny-agent</span>
        </Link>

        {/* Desktop nav links: exactly Features, Compare, Docs, GitHub */}
        <div className="hidden md:flex items-center gap-8 text-xs font-mono text-[#737373]">
          <Link
            href="/#features"
            className="hover:text-[#FAFAFA] transition-colors duration-150"
          >
            Features
          </Link>
          <Link
            href="/#compare"
            className="hover:text-[#FAFAFA] transition-colors duration-150"
          >
            Compare
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

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          type="button"
          className="md:hidden flex items-center justify-center w-8 h-8 border border-[#262626] bg-[#0A0A0A] text-[#737373] hover:text-[#FAFAFA] transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="w-full md:hidden border-t border-[#262626] py-4 px-4 space-y-3 bg-[#0A0A0A] font-mono text-xs">
          <Link
            href="/#features"
            onClick={() => setMobileOpen(false)}
            className="block text-[#737373] hover:text-[#FAFAFA] py-1"
          >
            Features
          </Link>
          <Link
            href="/#compare"
            onClick={() => setMobileOpen(false)}
            className="block text-[#737373] hover:text-[#FAFAFA] py-1"
          >
            Compare
          </Link>
          <Link
            href="/docs"
            onClick={() => setMobileOpen(false)}
            className="block text-[#737373] hover:text-[#FAFAFA] py-1"
          >
            Docs
          </Link>
          <a
            href="https://github.com/abdunur-dev/tiny-agent"
            target="_blank"
            rel="noreferrer"
            className="block text-[#737373] hover:text-[#FAFAFA] py-1"
          >
            GitHub
          </a>
        </div>
      )}
    </header>
  );
}
