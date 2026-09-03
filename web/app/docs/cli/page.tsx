import { DocsShell, type TocItem } from "@/components/docs-shell";
import { CommandCard } from "@/components/docs-code";

export default function CliDocsPage() {
  const toc: TocItem[] = [
    { label: "CLI commands", href: "#cli-commands" },
    { label: "Options & flags", href: "#cli-flags" },
    { label: "Interactive REPL", href: "#repl-commands" },
    { label: "Shortcuts", href: "#shortcuts" },
  ];

  return (
    <DocsShell
      currentPath="/docs/cli"
      title="CLI commands"
      toc={toc}
      prev={{ label: "Quick start", href: "/docs" }}
      next={{ label: "Safety & permissions", href: "/docs/safety" }}
    >
      <h1 id="cli-commands" className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6">
        CLI commands & options
      </h1>

      <p className="text-neutral-400 mb-6">
        Every flag, interactive REPL command, and keyboard shortcut supported by tiny-agent.
      </p>

      <h2 id="cli-flags" className="text-lg font-bold text-white mt-10 mb-4 pt-6 border-t border-white/10">
        <a href="#cli-flags" className="hover:underline">
          CLI options & flags
        </a>
      </h2>

      <p className="text-neutral-400 mb-4">
        Pass flags when starting tiny-agent to control provider selection, model overrides, and auto-approval:
      </p>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-white/10 text-neutral-400">
              <th className="py-2.5 pr-4 font-semibold">Flag</th>
              <th className="py-2.5 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="py-2.5 pr-4 text-white font-mono whitespace-nowrap">--local</td>
              <td className="py-2.5 text-neutral-400">Force local Ollama model (fully offline, private)</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 text-white font-mono whitespace-nowrap">--cloud</td>
              <td className="py-2.5 text-neutral-400">Force cloud Groq model (high-speed LPU inference)</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 text-white font-mono whitespace-nowrap">--model &lt;name&gt;</td>
              <td className="py-2.5 text-neutral-400">Override default model name (e.g. qwen2.5-coder:7b)</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 text-white font-mono whitespace-nowrap">--yolo, --auto-approve</td>
              <td className="py-2.5 text-neutral-400">Bypass confirmation prompts for write/edit/shell actions</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 text-white font-mono whitespace-nowrap">-h, --help</td>
              <td className="py-2.5 text-neutral-400">Display help message and command syntax</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-neutral-400 my-4">
        Example overriding the local model on launch:
      </p>

      <CommandCard command="tiny-agent --local --model qwen2.5-coder:14b" />

      <h2 id="repl-commands" className="text-lg font-bold text-white mt-10 mb-4 pt-6 border-t border-white/10">
        <a href="#repl-commands" className="hover:underline">
          Interactive REPL commands
        </a>
      </h2>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-white/10 text-neutral-400">
              <th className="py-2.5 pr-4 font-semibold">Need</th>
              <th className="py-2.5 font-semibold">Use</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="py-2.5 pr-4 text-neutral-300">Reset conversation history</td>
              <td className="py-2.5 text-white font-mono">/clear</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 text-neutral-300">Exit the interactive session</td>
              <td className="py-2.5 text-white font-mono">exit or quit</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 text-neutral-300">One-shot non-interactive prompt</td>
              <td className="py-2.5 text-white font-mono">tiny-agent "your prompt"</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="shortcuts" className="text-lg font-bold text-white mt-10 mb-4 pt-6 border-t border-white/10">
        <a href="#shortcuts" className="hover:underline">
          Shortcuts
        </a>
      </h2>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-white/10 text-neutral-400">
              <th className="py-2.5 pr-4 font-semibold">Action</th>
              <th className="py-2.5 font-semibold">Shortcut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="py-2.5 pr-4 text-neutral-300">Interrupt current turn</td>
              <td className="py-2.5 text-white font-mono">Ctrl + C</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 text-neutral-300">Clear terminal display</td>
              <td className="py-2.5 text-white font-mono">Ctrl + L</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 text-neutral-300">Previous / next prompt history</td>
              <td className="py-2.5 text-white font-mono">Up / Down arrow</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsShell>
  );
}
