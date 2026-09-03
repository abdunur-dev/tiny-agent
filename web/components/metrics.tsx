export function Metrics() {
  return (
    <section className="border-b border-white/10 bg-black">
      <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-white/10 text-center font-mono">
        <div className="py-6 px-4 group hover:bg-white/[0.01] transition-colors">
          <div className="text-xs text-white/50">Latest release</div>
          <div className="text-sm text-white mt-1 font-semibold">v0.1.0 — ready to run</div>
        </div>
        <div className="py-6 px-4 group hover:bg-white/[0.01] transition-colors">
          <div className="text-xs text-white/50">Runtime & Binary</div>
          <div className="text-sm text-white mt-1 font-semibold">Bun 1.4+ · single binary</div>
        </div>
        <div className="py-6 px-4 group hover:bg-white/[0.01] transition-colors">
          <div className="text-xs text-white/50">Model Engine</div>
          <div className="text-sm text-white mt-1 font-semibold">Ollama (offline) + Groq</div>
        </div>
      </div>
    </section>
  );
}
