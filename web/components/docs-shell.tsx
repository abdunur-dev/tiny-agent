"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, Menu, X, ChevronRight, ChevronLeft, Terminal } from "lucide-react";

export interface TocItem {
  label: string;
  href: string;
}

export interface NavLinkItem {
  label: string;
  href: string;
}

interface DocsShellProps {
  currentPath: string;
  title: string;
  toc: TocItem[];
  prev?: NavLinkItem;
  next?: NavLinkItem;
  children: React.ReactNode;
}

export function DocsShell({
  currentPath,
  title,
  toc,
  prev,
  next,
  children,
}: DocsShellProps) {
  const [copiedLlm, setCopiedLlm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCopyForLLM = async () => {
    const markdown = `# tiny-agent Documentation - ${title}
A minimal, fast terminal-based coding agent CLI in TypeScript, running on Bun.
Supports local offline models via Ollama and cloud models via Groq.

Current Page: ${title} (${currentPath})
Read more online at: https://tiny-agent.local${currentPath}`;

    try {
      await navigator.clipboard.writeText(markdown);
      setCopiedLlm(true);
      setTimeout(() => setCopiedLlm(false), 2500);
    } catch {}
  };

  const navGroups = [
    {
      title: "getting started",
      links: [
        { label: "Quick start", href: "/docs" },
        { label: "CLI commands", href: "/docs/cli" },
      ],
    },
    {
      title: "using tiny-agent",
      links: [
        { label: "Safety & permissions", href: "/docs/safety" },
        { label: "Engines & offline", href: "/docs/engines" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-mono antialiased selection:bg-white/20 selection:text-white flex flex-col justify-between">
      <div>
        {/* fx.sh style Top Header */}
        <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-white/10 bg-black/90 px-4 sm:px-8 backdrop-blur">
          
          {/* Left: Brand Logo without Vercel */}
          <div className="inline-flex items-center gap-2 text-white">
            <Link
              href="/"
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
              aria-label="tiny-agent home"
            >
              <div className="w-6 h-6 rounded border border-white/20 bg-neutral-900 flex items-center justify-center">
                <Terminal className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold tracking-tight text-sm text-white">tiny-agent</span>
            </Link>
          </div>

          {/* Center: fx.sh style lowercase monospace nav */}
          <nav className="hidden md:flex items-center gap-6 text-xs text-neutral-400">
            <Link
              href="/docs"
              className={currentPath === "/docs" ? "text-white font-semibold" : "hover:text-white transition-colors"}
            >
              docs
            </Link>
            <Link
              href="/docs/cli"
              className={currentPath === "/docs/cli" ? "text-white font-semibold" : "hover:text-white transition-colors"}
            >
              cli
            </Link>
            <Link
              href="/docs/safety"
              className={currentPath === "/docs/safety" ? "text-white font-semibold" : "hover:text-white transition-colors"}
            >
              safety
            </Link>
            <Link
              href="/docs/engines"
              className={currentPath === "/docs/engines" ? "text-white font-semibold" : "hover:text-white transition-colors"}
            >
              engines
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>source</span>
              <span className="text-[10px] text-neutral-500">↗</span>
            </a>
          </nav>

          {/* Right: Copy install button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigator.clipboard.writeText("bun install -g tiny-agent")}
              type="button"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white transition-colors border border-white/10 hover:border-white/20 px-2.5 py-1.5 rounded-md bg-neutral-950"
              title="Copy install command"
            >
              <Copy className="w-3 h-3 text-neutral-400" />
              <span>install</span>
            </button>
          </div>

        </header>

        {/* Mobile Bar */}
        <div className="sticky top-14 z-40 flex h-11 items-center justify-between border-b border-white/10 bg-black/95 px-4 backdrop-blur lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="inline-flex items-center gap-2 text-xs text-neutral-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>{mobileMenuOpen ? "Close Menu" : "Browse Docs"}</span>
          </button>
          <button
            onClick={handleCopyForLLM}
            type="button"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copiedLlm ? "Copied!" : "Copy for LLM"}</span>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-x-0 top-[101px] z-30 bg-black border-b border-white/10 p-6 lg:hidden max-h-[80vh] overflow-y-auto">
            {navGroups.map((group) => (
              <div key={group.title} className="mb-6 last:mb-0">
                <p className="mb-2 text-xs font-mono text-neutral-500 uppercase tracking-wider">
                  {group.title}
                </p>
                <div className="space-y-1.5">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block text-sm py-0.5 ${
                        currentPath === link.href
                          ? "text-white font-bold"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3-Column Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
          <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_180px]">
            
            {/* Left Sticky Sidebar */}
            <aside className="hidden lg:block lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto pr-4 text-sm">
              <nav aria-label="Documentation navigation">
                {navGroups.map((group) => (
                  <div key={group.title} className="mb-8 last:mb-0">
                    <p className="mb-3 text-xs font-mono text-neutral-500 uppercase tracking-wider">
                      {group.title}
                    </p>
                    <div className="space-y-1">
                      {group.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`block py-1 text-xs transition-colors ${
                            currentPath === link.href
                              ? "text-white font-bold"
                              : "text-neutral-400 hover:text-white"
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </aside>

            {/* Center Main Article Content */}
            <main className="relative min-w-0 max-w-[680px]">
              
              {/* Top Right "Copy for LLM" Button */}
              <div className="absolute right-0 top-0 hidden lg:block">
                <button
                  onClick={handleCopyForLLM}
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white border border-white/10 hover:border-white/20 bg-neutral-950 px-2.5 py-1 rounded-md transition-colors"
                  title="Copy full documentation as markdown for LLM context"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedLlm ? "Copied for LLM!" : "Copy for LLM"}</span>
                </button>
              </div>

              <article id="docs-content" className="font-mono text-sm sm:text-base leading-[1.8] text-neutral-300">
                {children}

                {/* fx.sh style Previous / Next pagination navigation */}
                <nav className="mt-16 flex items-stretch gap-4 border-t border-white/10 pt-8 not-prose">
                  {prev ? (
                    <Link
                      href={prev.href}
                      className="group flex flex-1 flex-col items-start gap-1.5 rounded-xl border border-white/10 p-4 text-left no-underline transition-all hover:border-white/25 hover:bg-neutral-900/50"
                    >
                      <span className="flex items-center gap-1 font-mono text-xs text-neutral-400">
                        <ChevronLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
                        <span>Previous</span>
                      </span>
                      <span className="font-medium text-white group-hover:text-white">
                        {prev.label}
                      </span>
                    </Link>
                  ) : (
                    <div className="flex-1" />
                  )}

                  {next && (
                    <Link
                      href={next.href}
                      className="group flex flex-1 flex-col items-end gap-1.5 rounded-xl border border-white/10 p-4 text-right no-underline transition-all hover:border-white/25 hover:bg-neutral-900/50"
                    >
                      <span className="flex items-center gap-1 font-mono text-xs text-neutral-400">
                        <span>Next</span>
                        <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                      <span className="font-medium text-white group-hover:text-white">
                        {next.label}
                      </span>
                    </Link>
                  )}
                </nav>
              </article>

            </main>

            {/* Right Sticky TOC (Table of Contents) */}
            <aside className="hidden xl:block xl:sticky xl:top-20 xl:self-start text-xs font-mono">
              <p className="text-neutral-500 uppercase tracking-wider mb-3">
                on this page
              </p>
              <ul className="space-y-2 border-l border-white/10 pl-3">
                {toc.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-neutral-400 hover:text-white transition-colors block"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

          </div>
        </div>
      </div>

      {/* fx.sh style minimal docs footer */}
      <footer className="mt-8 px-4 sm:px-8 pt-8 pb-10 border-t border-white/[0.06]">
        <div className="flex w-full flex-wrap items-center justify-end gap-x-3 gap-y-1 font-mono text-xs text-neutral-500">
          <Link className="transition-colors hover:text-white" href="/#features">
            features
          </Link>
          <a
            href="https://github.com"
            className="transition-colors hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            source
          </a>
          <Link className="transition-colors hover:text-white" href="/docs">
            docs
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/" className="transition-colors hover:text-white text-neutral-400">
            tiny-agent
          </Link>
        </div>
      </footer>

    </div>
  );
}
