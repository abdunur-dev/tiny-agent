import { DocsShell, type TocItem } from "@/components/docs-shell";
import { CommandCard, CodePre } from "@/components/docs-code";

export default function EnginesDocsPage() {
  const toc: TocItem[] = [
    { label: "Engines & offline", href: "#engines-overview" },
    { label: "Ollama (Local Offline)", href: "#ollama-setup" },
    { label: "Groq (Cloud Inference)", href: "#groq-setup" },
    { label: "Binary compilation", href: "#binary-compilation" },
  ];

  return (
    <DocsShell
      currentPath="/docs/engines"
      title="Engines & offline"
      toc={toc}
      prev={{ label: "Safety & permissions", href: "/docs/safety" }}
      next={{ label: "Quick start", href: "/docs" }}
    >
      <h1 id="engines-overview" className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6">
        Engines & offline inference
      </h1>

      <p className="text-neutral-400 mb-6">
        tiny-agent supports two inference backends: 100% private local models via Ollama, and high-throughput cloud inference via Groq.
      </p>

      <h2 id="ollama-setup" className="text-lg font-bold text-white mt-10 mb-4 pt-6 border-t border-white/10">
        <a href="#ollama-setup" className="hover:underline">
          Ollama (Local Offline Setup)
        </a>
      </h2>

      <p className="text-neutral-400 mb-3">
        In local mode, your source code, prompts, and tool outputs never leave your machine. Pull your preferred coding model and start tiny-agent:
      </p>

      <CommandCard command="ollama pull qwen2.5-coder:latest" />
      <CommandCard command="tiny-agent --local" />

      <p className="text-neutral-400 my-3">
        Recommended models for local coding:
      </p>

      <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-neutral-300 pl-2">
        <li><code className="text-white">qwen2.5-coder:latest</code> (Default, excellent tool-calling)</li>
        <li><code className="text-white">qwen2.5-coder:14b</code> (Deeper reasoning for larger refactors)</li>
        <li><code className="text-white">llama3.2:3b</code> (Ultralight, fast on laptop hardware)</li>
      </ul>

      <h2 id="groq-setup" className="text-lg font-bold text-white mt-10 mb-4 pt-6 border-t border-white/10">
        <a href="#groq-setup" className="hover:underline">
          Groq (Cloud Inference)
        </a>
      </h2>

      <p className="text-neutral-400 mb-3">
        Groq provides ultra-fast LPU inference (500+ tokens per second), enabling instant tool call streaming and immediate turnaround:
      </p>

      <CodePre
        code={`# Set your Groq API key
export GROQ_API_KEY="gsk_..."

# Run cloud inference using openai/gpt-oss-120b
tiny-agent --cloud`}
        lang="bash"
      />

      <p className="text-neutral-400 text-xs sm:text-sm my-3">
        Default Groq model is configured to <code className="text-white font-mono">openai/gpt-oss-120b</code> with a low temperature of 0.2 for deterministic tool invocation.
      </p>

      <h2 id="binary-compilation" className="text-lg font-bold text-white mt-10 mb-4 pt-6 border-t border-white/10">
        <a href="#binary-compilation" className="hover:underline">
          Single binary compilation
        </a>
      </h2>

      <p className="text-neutral-400 mb-3">
        Compile tiny-agent into a standalone executable using Bun's native binary compiler:
      </p>

      <CommandCard command="bun run build" />

      <p className="text-neutral-400 text-xs sm:text-sm my-3">
        Produces a self-contained executable under <code className="text-white">dist/tiny-agent</code> with sub-10ms cold start time and zero dependencies.
      </p>
    </DocsShell>
  );
}
