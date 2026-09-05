"use client";

export function Comparison() {
  const cards = [
    {
      title: "Local models",
      subtitle: "Offline inference",
      fx: "No working local-model path today. Relies on external OpenAI-compatible cloud endpoints via curl.",
      tinyAgent: "Fully offline execution via native Ollama integration. Tested with local open weights like Qwen 2.5 Coder without API keys or telemetry.",
    },
    {
      title: "Safety confirmations",
      subtitle: "Action inspection",
      fx: "Prompts confirmation before executing raw bash commands suggested by the model.",
      tinyAgent: "Granular safety policy. State changes (write_file, edit_file, run_shell_command) pause for explicit confirmation with diff previews; read-only operations run instantly. Scriptable with --yolo.",
    },
    {
      title: "Open & extensible",
      subtitle: "Standard protocols",
      fx: "Script-level configuration without standard external tool protocols or structured context files.",
      tinyAgent: "Model Context Protocol (MCP) client to plug in standard tool servers, automatic AGENTS.md project instruction loading, and modular skills system.",
    },
  ];

  return (
    <section id="compare" className="py-20 sm:py-28 border-b border-white/[0.08] bg-[#0A0A0A] w-full relative overflow-hidden">
      {/* Linear Ambient Radial */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-gradient-to-b from-white/[0.02] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Headline-led header */}
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono text-[#8A8F98] mb-3">
            <span>differentiation</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FAFAFA] mb-4">
            What fx doesn&apos;t do yet
          </h2>
          <p className="text-[#8A8F98] text-sm sm:text-base max-w-2xl leading-relaxed">
            Both tools share a minimal Unix ethos with zero framework bloat. Here is how their capabilities differ today based on verifiable code.
          </p>
        </div>

        {/* 3 Focused Linear Bento Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl linear-card p-6 sm:p-7 flex flex-col justify-between space-y-6"
            >
              {/* Card Header */}
              <div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-[#FAFAFA] tracking-tight">
                  {card.title}
                </h3>
                <p className="font-mono text-[11px] text-[#8A8F98] mt-1">
                  {card.subtitle}
                </p>
              </div>

              {/* Card Body: fx vs tiny-agent */}
              <div className="space-y-4 pt-2">
                {/* fx block */}
                <div className="border-t border-white/[0.06] pt-3.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[11px] text-[#8A8F98] uppercase tracking-wider">
                      fx.sh
                    </span>
                    <span className="font-mono text-[10px] text-[#737373] bg-white/[0.02] border border-white/[0.06] px-2 py-0.5 rounded-full">
                      unsupported
                    </span>
                  </div>
                  <p className="text-xs text-[#8A8F98] leading-relaxed">
                    {card.fx}
                  </p>
                </div>

                {/* tiny-agent block */}
                <div className="border-t border-white/[0.06] pt-3.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[11px] text-[#FAFAFA] font-semibold uppercase tracking-wider">
                      tiny-agent
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/30 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                      supported
                    </span>
                  </div>
                  <p className="text-xs text-[#FAFAFA] leading-relaxed">
                    {card.tinyAgent}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-xs text-[#8A8F98] font-mono">
          Factual comparison verified against current repositories.
        </div>
      </div>
    </section>
  );
}
