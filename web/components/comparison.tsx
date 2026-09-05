"use client";

import { Check, Minus } from "lucide-react";

export function Comparison() {
  const rows = [
    {
      feature: "Implementation",
      tinyAgent: "TypeScript running on Bun (compiles to single executable)",
      fxSh: "POSIX Bash script with curl and jq",
    },
    {
      feature: "Local Offline Inference",
      tinyAgent: "Native Ollama integration (100% local, no API keys)",
      fxSh: "Cloud API endpoints via curl",
    },
    {
      feature: "Cloud Inference",
      tinyAgent: "Groq API with SSE token streaming",
      fxSh: "OpenAI-compatible HTTP endpoints",
    },
    {
      feature: "File Tools",
      tinyAgent: "Dedicated read_file, write_file, edit_file (single replacement), search_files",
      fxSh: "Shell commands executed directly in bash",
    },
    {
      feature: "External Extensibility",
      tinyAgent: "Model Context Protocol (MCP) client + AGENTS.md + SKILL.md",
      fxSh: "Shell script aliases and environment variables",
    },
    {
      feature: "Safety Prompts",
      tinyAgent: "Interactive confirmation on write/edit/shell actions (bypass via --yolo)",
      fxSh: "Interactive prompt before running suggested commands",
    },
    {
      feature: "Dependencies",
      tinyAgent: "Bun runtime (zero npm frameworks like LangChain)",
      fxSh: "bash, curl, jq",
    },
  ];

  return (
    <section id="compare" className="py-24 sm:py-36 border-b border-white/[0.08] bg-white/[0.01] w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/[0.02] text-white/50 uppercase tracking-wider mb-4">
            Comparison
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 font-sans">
            tiny-agent vs fx.sh
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            An honest look at what each tool actually does today — no invented benchmarks or marketing fluff.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-lg border border-white/10 bg-black overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-neutral-900/50">
                  <th className="py-3 px-4 sm:px-6 text-white/40 uppercase font-semibold text-[11px] w-1/4">
                    Capability
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-white font-bold text-[11px] w-3/8 border-l border-white/10 bg-white/[0.02]">
                    tiny-agent
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-neutral-400 font-semibold text-[11px] w-3/8 border-l border-white/10">
                    fx.sh
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rows.map((row) => (
                  <tr key={row.feature} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 text-white/60 font-medium">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-neutral-200 border-l border-white/10 bg-white/[0.01]">
                      {row.tinyAgent}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-neutral-400 border-l border-white/10">
                      {row.fxSh}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-white/40 font-mono">
          Both tools share the same minimal Unix philosophy: fast terminal execution with zero bloated frameworks.
        </div>

      </div>
    </section>
  );
}
