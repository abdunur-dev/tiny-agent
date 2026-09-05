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
Repository: https://github.com/abdunur-dev/tiny-agent`;

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
      title: "architecture",
      links: [
        { label: "Safety model", href: "/docs/safety" },
        { label: "Inference engines", href: "/docs/engines" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] flex flex-col selection:bg-[#262626] selection:text-[#FAFAFA]">
      
      {/* Top Bar Header */}
      <div className="w-full flex-1">
        <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-[#262626] bg-[#0A0A0A] px-4 sm:px-8">
          
          {/* Left: Brand */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              aria-label="tiny-agent home"
            >
              <div className="w-6 h-6 border border-[#262626] bg-[#121212] flex items-center justify-center">
                <Terminal className="w-3.5 h-3.5 text-[#FAFAFA]" />
              </div>
              <span className="font-mono font-semibold tracking-tight text-sm text-[#FAFAFA]">tiny-agent</span>
            </Link>
          </div>

          {/* Center: Minimal monospace nav */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-[#737373]">
            <Link
              href="/docs"
              className={currentPath === "/docs" ? "text-[#FAFAFA] font-medium" : "hover:text-[#FAFAFA] transition-colors"}
            >
              docs
            </Link>
            <Link
              href="/docs/cli"
              className={currentPath === "/docs/cli" ? "text-[#FAFAFA] font-medium" : "hover:text-[#FAFAFA] transition-colors"}
            >
              cli
            </Link>
            <Link
              href="/docs/safety"
              className={currentPath === "/docs/safety" ? "text-[#FAFAFA] font-medium" : "hover:text-[#FAFAFA] transition-colors"}
            >
              safety
            </Link>
            <Link
              href="/docs/engines"
              className={currentPath === "/docs/engines" ? "text-[#FAFAFA] font-medium" : "hover:text-[#FAFAFA] transition-colors"}
            >
              engines
            </Link>
            <a
              href="https://github.com/abdunur-dev/tiny-agent"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#FAFAFA] transition-colors"
            >
              source
            </a>
          </nav>

          {/* Right: Copy install button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigator.clipboard.writeText("git clone https://github.com/abdunur-dev/tiny-agent && cd tiny-agent && bun install")}
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#737373] hover:text-[#FAFAFA] transition-colors border border-[#262626] hover:border-[#404040] px-2.5 py-1.5 bg-[#0A0A0A]"
              title="Copy install command"
            >
              <Copy className="w-3 h-3 text-[#737373]" />
              <span>install</span>
            </button>
          </div>

        </header>

        {/* Mobile Bar */}
        <div className="sticky top-14 z-40 flex h-11 items-center justify-between border-b border-[#262626] bg-[#0A0A0A] px-4 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#737373] hover:text-[#FAFAFA]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>{mobileMenuOpen ? "Close menu" : "Browse docs"}</span>
          </button>
          <button
            onClick={handleCopyForLLM}
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#737373] hover:text-[#FAFAFA]"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copiedLlm ? "Copied" : "Copy for LLM"}</span>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-x-0 top-[101px] z-30 bg-[#0A0A0A] border-b border-[#262626] p-6 lg:hidden max-h-[80vh] overflow-y-auto">
            {navGroups.map((group) => (
              <div key={group.title} className="mb-6 last:mb-0">
                <p className="mb-2 text-xs font-mono text-[#737373]">
                  {group.title}
                </p>
                <div className="space-y-1.5 font-mono text-xs">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-0.5 ${
                        currentPath === link.href
                          ? "text-[#FAFAFA] font-bold"
                          : "text-[#737373] hover:text-[#FAFAFA]"
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
            <aside className="hidden lg:block lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto pr-4 text-sm font-mono">
              <nav aria-label="Documentation navigation">
                {navGroups.map((group) => (
                  <div key={group.title} className="mb-8 last:mb-0">
                    <p className="mb-3 text-xs text-[#737373]">
                      {group.title}
                    </p>
                    <div className="space-y-1">
                      {group.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`block py-1 text-xs transition-colors ${
                            currentPath === link.href
                              ? "text-[#FAFAFA] font-semibold"
                              : "text-[#737373] hover:text-[#FAFAFA]"
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
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#737373] hover:text-[#FAFAFA] border border-[#262626] hover:border-[#404040] bg-[#0A0A0A] px-2.5 py-1 transition-colors"
                  title="Copy full documentation as markdown for LLM context"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedLlm ? "Copied" : "Copy for LLM"}</span>
                </button>
              </div>

              <article id="docs-content" className="text-sm sm:text-base leading-[1.8] text-[#FAFAFA]">
                {children}

                {/* Previous / Next pagination navigation */}
                <nav className="mt-16 flex items-stretch gap-4 border-t border-[#262626] pt-8 not-prose">
                  {prev ? (
                    <Link
                      href={prev.href}
                      className="group flex flex-1 flex-col items-start gap-1.5 border border-[#262626] p-4 text-left no-underline transition-colors hover:border-[#404040] hover:bg-[#121212]"
                    >
                      <span className="flex items-center gap-1 font-mono text-xs text-[#737373]">
                        <ChevronLeft className="h-3 w-3" />
                        <span>Previous</span>
                      </span>
                      <span className="font-medium text-[#FAFAFA]">
                        {prev.label}
                      </span>
                    </Link>
                  ) : (
                    <div className="flex-1" />
                  )}

                  {next && (
                    <Link
                      href={next.href}
                      className="group flex flex-1 flex-col items-end gap-1.5 border border-[#262626] p-4 text-right no-underline transition-colors hover:border-[#404040] hover:bg-[#121212]"
                    >
                      <span className="flex items-center gap-1 font-mono text-xs text-[#737373]">
                        <span>Next</span>
                        <ChevronRight className="h-3 w-3" />
                      </span>
                      <span className="font-medium text-[#FAFAFA]">
                        {next.label}
                      </span>
                    </Link>
                  )}
                </nav>
              </article>

            </main>

            {/* Right Sticky TOC */}
            <aside className="hidden xl:block xl:sticky xl:top-20 xl:self-start text-xs font-mono">
              <p className="text-[#737373] mb-3">
                on this page
              </p>
              <ul className="space-y-2 border-l border-[#262626] pl-3">
                {toc.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-[#737373] hover:text-[#FAFAFA] transition-colors block"
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

      {/* Minimal docs footer */}
      <footer className="mt-8 px-4 sm:px-8 pt-8 pb-10 border-t border-[#262626]">
        <div className="flex w-full flex-wrap items-center justify-end gap-x-3 gap-y-1 font-mono text-xs text-[#737373]">
          <Link className="transition-colors hover:text-[#FAFAFA]" href="/#features">
            features
          </Link>
          <a
            href="https://github.com/abdunur-dev/tiny-agent"
            className="transition-colors hover:text-[#FAFAFA]"
            target="_blank"
            rel="noreferrer"
          >
            source
          </a>
          <Link className="transition-colors hover:text-[#FAFAFA]" href="/docs">
            docs
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/" className="transition-colors hover:text-[#FAFAFA] text-[#FAFAFA]">
            tiny-agent
          </Link>
        </div>
      </footer>

    </div>
  );
}
