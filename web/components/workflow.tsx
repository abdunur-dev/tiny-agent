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
    <section className="py-20 sm:py-28 border-b border-[#262626] w-full bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-left md:text-center mb-12 sm:mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FAFAFA] mb-3">
            How it works
          </h2>
          <p className="text-[#737373] text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Three sequential steps to an instant, local-first coding assistant in your terminal.
          </p>
        </div>

        {/* 3 Step Cards - Sharp hairline borders, no rounded corners, no shadows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step) => (
            <div
              key={step.num}
              className="border border-[#262626] bg-[#0A0A0A] flex flex-col justify-between hover:border-[#404040] transition-colors"
            >
              <div className="px-5 py-3.5 border-b border-[#262626] flex items-center justify-between bg-[#121212]">
                <span className="text-xl font-bold text-[#737373] font-mono">
                  {step.num}
                </span>
                <span className="text-xs font-mono text-[#FAFAFA] font-medium">
                  {step.title}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-[#737373] leading-relaxed mb-4">
                  {step.desc}
                </p>
                <pre className="bg-[#050505] border border-[#262626] p-3 text-xs font-mono text-[#FAFAFA] overflow-x-auto leading-relaxed">
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
