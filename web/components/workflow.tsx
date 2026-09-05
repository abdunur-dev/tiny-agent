"use client";

export function Workflow() {
  const steps = [
    {
      num: "01",
      title: "Configure",
      desc: "Interactive first-run wizard saves config to ~/.tiny-agent/config.json, or pass --local / --cloud flags anytime.",
      code: `$ tiny-agent --local\n[tiny-agent] provider=ollama\nmodel=qwen2.5-coder:latest`,
    },
    {
      num: "02",
      title: "Command",
      desc: "Start an interactive REPL or invoke one-shot commands directly from your shell or CI pipeline.",
      code: `$ tiny-agent "edit src/config.ts to use port 8080"\n[groq/openai/gpt-oss-120b] ❯`,
    },
    {
      num: "03",
      title: "Execute",
      desc: "Autonomous tool loop reads context, auto-resolves bare paths, prints action logs, and streams final answer.",
      code: `⚡ edit_file src/config.ts\n✓ Successfully edited src/config.ts\nUpdated the port to 8080.`,
    },
  ];

  return (
    <section className="py-20 sm:py-28 border-b border-white/[0.08] w-full bg-[#0A0A0A] relative overflow-hidden">
      {/* Linear Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-b from-white/[0.02] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-left md:text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono text-[#8A8F98] mb-3">
            <span>workflow</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FAFAFA] mb-3">
            How it works
          </h2>
          <p className="text-[#8A8F98] text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Three sequential steps to an instant, local-first coding assistant in your terminal.
          </p>
        </div>

        {/* 3 Step Cards - Linear Bento Card Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl linear-card overflow-hidden flex flex-col justify-between"
            >
              <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.02]">
                <span className="text-xl font-bold text-[#8A8F98] font-mono">
                  {step.num}
                </span>
                <span className="text-xs font-mono text-[#FAFAFA] font-medium px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03]">
                  {step.title}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-[#8A8F98] leading-relaxed">
                  {step.desc}
                </p>
                <pre className="bg-[#08090C] border border-white/10 rounded-xl p-3.5 text-xs font-mono text-[#FAFAFA] overflow-x-auto leading-relaxed shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
                  <code>{step.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
