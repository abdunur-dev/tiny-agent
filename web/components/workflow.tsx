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
      code: `⚡ [action: edit_file] src/config.ts\n✓ Successfully edited src/config.ts\nUpdated the port to 8080.`,
    },
  ];

  return (
    <section className="py-24 sm:py-32 border-b border-white/[0.08] w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/[0.02] text-white/50 uppercase tracking-wider mb-4">
            Workflow
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 font-sans">
            How it works
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed">
            Three simple steps to an instant, local-first coding assistant in your terminal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden flex flex-col hover:border-white/25 hover:bg-[#0c0c0c] transition-all duration-200 group"
            >
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <span className="text-2xl font-bold text-white/20 font-mono group-hover:text-white/40 transition-colors">
                  {step.num}
                </span>
                <span className="text-xs font-mono text-white/50 uppercase tracking-wider">
                  {step.title}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-xs text-white/50 leading-relaxed mb-4">
                  {step.desc}
                </p>
                <pre className="bg-black rounded-md border border-white/10 p-3 text-xs font-mono text-white/70 overflow-x-auto leading-relaxed">
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
