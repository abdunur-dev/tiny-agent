"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, Download, Palette, Terminal, Sparkles, ShieldCheck } from "lucide-react";

export function ResourcesSection() {
  const [copiedSvg, setCopiedSvg] = useState(false);

  const copyLogoSvg = () => {
    const svgCode = `<svg width="76" height="65" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M38 0L75.2436 64.5H0.756412L38 0Z" fill="currentColor"/></svg>`;
    navigator.clipboard.writeText(svgCode);
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 2000);
  };

  return (
    <section id="resources" className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto border-b border-white/[0.08]">
      {/* Header section with Vercel icon layout */}
      <div className="mb-14 max-w-2xl">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4 flex items-center gap-2.5 font-sans">
          Resources that we take care of and build with.
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
          We design systems and systemize designs. Imbuing our work with care and craft as stewards of the tiny-agent Brand, CLI ergonomics, and the Geist Design System.
        </p>
      </div>

      {/* Grid of Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Brand Guidelines */}
        <div className="group relative rounded-xl border border-white/10 bg-neutral-950/60 p-6 flex flex-col justify-between overflow-hidden hover:border-white/25 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors pointer-events-none" />
          
          <div>
            {/* Visual Canvas */}
            <div className="w-full h-44 rounded-lg bg-black border border-white/5 flex flex-col items-center justify-center relative mb-6 overflow-hidden">
              <div className="absolute inset-0 vercel-subtle-grid opacity-20" />
              
              {/* Vercel Geometric Pyramid / Triangle */}
              <div className="relative group-hover:scale-105 transition-transform duration-300 flex flex-col items-center">
                <svg width="60" height="52" viewBox="0 0 76 65" fill="none" className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]">
                  <path d="M38 0L75.2436 64.5H0.756412L38 0Z" fill="white" />
                </svg>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>Geist Monogram · Black & White</span>
                </div>
              </div>

              {/* Action button inside card visual */}
              <button
                onClick={copyLogoSvg}
                type="button"
                className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[11px] font-mono text-white transition-colors"
                title="Copy SVG"
              >
                {copiedSvg ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSvg ? "Copied" : "Copy SVG"}</span>
              </button>
            </div>

            <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400 font-semibold mb-2 block">
              Identity & Marks
            </span>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neutral-200 transition-colors font-sans">
              Brand Guidelines
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Learn how to properly represent tiny-agent across web, terminal screenshots, dark mode presentations, and documentation.
            </p>
          </div>

          <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>Assets & Marks</span>
            <span className="flex items-center gap-1 text-white group-hover:translate-x-0.5 transition-transform">
              Explore <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Card 2: Interface & CLI Guidelines */}
        <div className="group relative rounded-xl border border-white/10 bg-neutral-950/60 p-6 flex flex-col justify-between overflow-hidden hover:border-white/25 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />
          
          <div>
            {/* Visual Canvas */}
            <div className="w-full h-44 rounded-lg bg-black border border-white/5 p-4 flex flex-col justify-between relative mb-6 overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 border-b border-white/5 pb-2">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>cli-spec.ts</span>
                </span>
                <span className="text-emerald-400 text-[10px]">PASS 0.8ms</span>
              </div>

              <div className="space-y-1.5 font-mono text-[11px] text-neutral-300 py-2">
                <div className="text-neutral-500">// Rule 1: Minimal shell ergonomics</div>
                <div><span className="text-blue-400">const</span> latency = <span className="text-amber-300">&lt; 10ms</span>;</div>
                <div><span className="text-blue-400">const</span> emojis = <span className="text-red-400">false</span>;</div>
                <div><span className="text-blue-400">const</span> contrast = <span className="text-emerald-400">"WCAG-AAA"</span>;</div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-[10px] font-mono text-neutral-400">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Zero terminal clutter policy</span>
              </div>
            </div>

            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-2 block">
              Ergonomics & Standards
            </span>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neutral-200 transition-colors font-sans">
              Web & CLI Guidelines
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Rules for building interfaces that honor developer attention. Sub-10ms cold start, predictable confirmation dialogs, and clean standard output.
            </p>
          </div>

          <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>Terminal Design</span>
            <span className="flex items-center gap-1 text-white group-hover:translate-x-0.5 transition-transform">
              Guidelines <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Card 3: Geist Design System */}
        <div className="group relative rounded-xl border border-white/10 bg-neutral-950/60 p-6 flex flex-col justify-between overflow-hidden hover:border-white/25 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors pointer-events-none" />
          
          <div>
            {/* Visual Canvas */}
            <div className="w-full h-44 rounded-lg bg-black border border-white/5 p-4 flex flex-col justify-between relative mb-6 overflow-hidden">
              <div className="grid grid-cols-4 gap-2">
                <div className="h-9 rounded bg-white/5 border border-white/10 flex items-center justify-center font-mono text-[10px] text-neutral-400">#000</div>
                <div className="h-9 rounded bg-white/10 border border-white/15 flex items-center justify-center font-mono text-[10px] text-neutral-300">#111</div>
                <div className="h-9 rounded bg-white/20 border border-white/20 flex items-center justify-center font-mono text-[10px] text-white">#333</div>
                <div className="h-9 rounded bg-white border border-white flex items-center justify-center font-mono text-[10px] text-black font-bold">#FFF</div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <button type="button" className="flex-1 h-8 rounded bg-white text-black font-medium text-xs flex items-center justify-center shadow">
                  Geist Button
                </button>
                <div className="px-2.5 py-1 rounded border border-white/20 text-[11px] font-mono text-neutral-300 bg-white/[0.04]">
                  pill.badge
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 border-t border-white/5 pt-2">
                <span>Geist Sans & Mono</span>
                <span className="text-purple-400">Tokens v2.4</span>
              </div>
            </div>

            <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400 font-semibold mb-2 block">
              Design System
            </span>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neutral-200 transition-colors font-sans">
              Geist Components
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              The foundational design system crafted by Vercel, tuned specifically for tiny-agent web dashboards, terminals, and interactive docs.
            </p>
          </div>

          <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>Tokens & UI</span>
            <span className="flex items-center gap-1 text-white group-hover:translate-x-0.5 transition-transform">
              Tokens <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
