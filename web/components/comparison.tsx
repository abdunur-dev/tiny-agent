"use client";

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
      tinyAgent: "Dedicated read_file, write_file, edit_file (single match), search_files",
      fxSh: "Shell commands executed directly in bash",
    },
    {
      feature: "Extensibility",
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
    <section id="compare" className="py-20 sm:py-28 border-b border-[#262626] bg-[#0A0A0A] w-full">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-left md:text-center mb-12 sm:mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FAFAFA] mb-3">
            tiny-agent vs fx.sh
          </h2>
          <p className="text-[#737373] text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            An honest look at what each tool actually does today — no invented benchmarks or marketing claims.
          </p>
        </div>

        {/* Comparison Table - Sharp hairline border, no shadows */}
        <div className="border border-[#262626] bg-[#0A0A0A] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#262626] bg-[#121212]">
                  <th className="py-3 px-4 sm:px-6 text-[#737373] font-semibold text-[11px] w-1/4">
                    Capability
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-[#FAFAFA] font-bold text-[11px] w-3/8 border-l border-[#262626] bg-[#171717]/40">
                    tiny-agent
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-[#737373] font-semibold text-[11px] w-3/8 border-l border-[#262626]">
                    fx.sh
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262626]">
                {rows.map((row) => (
                  <tr key={row.feature} className="hover:bg-[#121212]/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 text-[#FAFAFA] font-medium">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#FAFAFA] border-l border-[#262626] bg-[#121212]/20">
                      {row.tinyAgent}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#737373] border-l border-[#262626]">
                      {row.fxSh}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-left md:text-center mt-6 text-xs text-[#737373] font-mono">
          Both tools share a minimal Unix philosophy: fast terminal execution with zero bloated frameworks.
        </div>

      </div>
    </section>
  );
}
