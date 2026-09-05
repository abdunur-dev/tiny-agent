"use client";

import Link from "next/link";
import { Users, Globe, ArrowUpRight, Github, Twitter } from "lucide-react";

export function TeamSection() {
  const people = [
    {
      name: "Guillermo Rauch",
      role: "CEO & Design Pioneer",
      country: "USA",
      flag: "🇺🇸",
      handle: "@rauchg",
      url: "https://x.com/rauchg",
      avatarBg: "from-blue-600 to-indigo-900",
    },
    {
      name: "Rauno Freiberg",
      role: "Staff Design Engineer",
      country: "Estonia",
      flag: "🇪🇪",
      handle: "@raunofreiberg",
      url: "https://x.com/raunofreiberg",
      avatarBg: "from-purple-600 to-pink-900",
    },
    {
      name: "Evil Rabbit",
      role: "Head of Brand Design",
      country: "USA",
      flag: "🇺🇸",
      handle: "@evilrabbit_",
      url: "https://x.com/evilrabbit_",
      avatarBg: "from-emerald-600 to-teal-900",
    },
    {
      name: "Timo Lins",
      role: "Senior Product Designer",
      country: "Austria",
      flag: "🇦🇹",
      handle: "@timolins",
      url: "https://x.com/timolins",
      avatarBg: "from-amber-600 to-orange-900",
    },
    {
      name: "Henry Heffernan",
      role: "Design Engineer",
      country: "USA",
      flag: "🇺🇸",
      handle: "@henryheffernan",
      url: "https://x.com/henryheffernan",
      avatarBg: "from-cyan-600 to-blue-900",
    },
    {
      name: "Mery Kaftar",
      role: "Design Engineer",
      country: "Germany",
      flag: "🇩🇪",
      handle: "@merycodes",
      url: "https://x.com/merycodes",
      avatarBg: "from-rose-600 to-red-900",
    },
    {
      name: "Severin Landolt",
      role: "Design Engineer",
      country: "Switzerland",
      flag: "🇨🇭",
      handle: "@severinlandolt",
      url: "https://x.com/severinlandolt",
      avatarBg: "from-violet-600 to-purple-900",
    },
    {
      name: "tiny-agent Community",
      role: "Open-Source Collective",
      country: "Global",
      flag: "🌐",
      handle: "@tinyagent",
      url: "https://github.com",
      avatarBg: "from-neutral-700 to-black",
    },
  ];

  return (
    <section id="people" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto border-b border-white/[0.08]">
      {/* Header */}
      <div className="mb-14 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-xs font-mono text-blue-400 mb-3">
          <Globe className="w-3.5 h-3.5" />
          <span>Global Creative Collective</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3 font-sans">
          We speak 10 languages and live in 11 countries.
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
          Inspired by the multidisciplinary creatives who crafted Vercel Design, built for developers everywhere who believe software should be fast, thoughtful, and beautifully made.
        </p>
      </div>

      {/* Grid of Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {people.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="group rounded-xl border border-white/10 bg-neutral-950/60 p-4 hover:border-white/25 hover:bg-neutral-900/60 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                {/* Avatar Initial with gradient */}
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${p.avatarBg} flex items-center justify-center text-sm font-bold text-white shadow-md border border-white/15`}>
                  {p.name.charAt(0)}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                  <span>{p.flag}</span>
                  <span>{p.country}</span>
                </div>
              </div>

              <div className="text-sm font-bold text-white group-hover:text-blue-400 transition font-sans">
                {p.name}
              </div>
              <div className="text-xs text-neutral-400 font-mono mt-0.5">
                {p.role}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between text-xs font-mono text-neutral-500 group-hover:text-neutral-300 transition">
              <span>{p.handle}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
