"use client";

import { useState } from "react";
import { Compass, Layers, Clock, Box, Users } from "lucide-react";

interface DesignHeroProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function DesignHero({ activeTab, onTabChange }: DesignHeroProps) {
  const [coords, setCoords] = useState({ x: 247, y: 56 });

  const tabs = [
    { id: "overview", label: "Home", icon: Compass },
    { id: "resources", label: "Resources", icon: Layers },
    { id: "future", label: "Future", icon: Clock },
    { id: "tokens", label: "Tokens", icon: Box },
    { id: "people", label: "People", icon: Users },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCoords({ x: Math.max(120, x + 80), y: Math.max(40, y + 20) });
  };

  return (
    <section className="relative flex flex-col items-center justify-start pt-16 pb-16 overflow-hidden border-b border-white/[0.08]">
      {/* Vercel Ambient Spotlight */}
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] pointer-events-none -z-10 vercel-spotlight opacity-90" 
        aria-hidden="true" 
      />

      {/* Background Micro Grid */}
      <div 
        className="absolute inset-0 vercel-subtle-grid opacity-30 pointer-events-none -z-20"
        aria-hidden="true"
      />

      {/* Central Glowing Monogram Badge */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative group flex items-center justify-center">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition duration-700 animate-pulse-glow" />
          
          <div className="relative w-14 h-14 rounded-xl bg-black border border-white/20 flex items-center justify-center shadow-2xl">
            <svg 
              width="28" 
              height="28" 
              viewBox="0 0 76 65" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
            >
              <path d="M38 0L75.2436 64.5H0.756412L38 0Z" fill="white" />
            </svg>
          </div>
        </div>

        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Vercel Design · tiny-agent Design System</span>
        </div>
      </div>

      {/* Main Headline with Vercel Interactive Highlights */}
      <div className="max-w-4xl px-4 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.2] mb-6 font-sans">
          Meet our system of{" "}
          <span
            onMouseMove={handleMouseMove}
            className="relative inline-block px-3 py-1 mx-1 rounded border border-blue-500/80 bg-blue-500/10 text-white font-mono text-xl sm:text-4xl select-none group cursor-crosshair transition-colors"
          >
            <span className="vercel-selection-dot -top-1 -left-1" />
            <span className="vercel-selection-dot -top-1 -right-1" />
            <span className="vercel-selection-dot -bottom-1 -left-1" />
            <span className="vercel-selection-dot -bottom-1 -right-1" />
            
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-blue-600 text-[10px] font-mono text-white tracking-wider pointer-events-none whitespace-nowrap shadow-md">
              {coords.x} × {coords.y}
            </span>
            designers
          </span>
          ,{" "}
          <span className="relative inline-block px-2.5 py-0.5 mx-1 border border-dashed border-white/40 bg-white/[0.02] rounded text-white font-mono text-xl sm:text-4xl select-none">
            engineers
          </span>
          , and{" "}
          <span className="relative inline-block px-3 py-0.5 mx-1 rounded border border-white/20 bg-white/[0.08] backdrop-blur-md text-white font-mono text-xl sm:text-4xl shadow-inner select-none">
            <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              future agents.
            </span>
          </span>
        </h1>

        <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed font-sans mb-10">
          Vercel brings together world-class craft to shape the modern web. tiny-agent extends this design philosophy to autonomous terminal agents — pairing Geist precision with sub-millisecond local execution.
        </p>

        {/* The Signature Floating Pill Switcher */}
        <div className="inline-flex items-center p-1 rounded-full border border-white/15 bg-black/80 backdrop-blur-xl shadow-2xl relative">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                type="button"
                className={`relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 z-10 ${
                  isActive
                    ? "text-black font-semibold"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <span
                    className="absolute inset-0 bg-white rounded-full -z-10 shadow-lg"
                    style={{ transition: "all 0.2s ease" }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-black" : "text-neutral-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
