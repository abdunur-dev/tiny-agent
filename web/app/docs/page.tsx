import { DocsShell, type TocItem } from "@/components/docs-shell";
import { CommandCard, CodePre } from "@/components/docs-code";

export default function QuickStartPage() {
  const toc: TocItem[] = [
    { label: "Quick start", href: "#quick-start" },
    { label: "Install and run", href: "#install-and-run" },
    { label: "Run your first request", href: "#first-request" },
    { label: "Execution flow", href: "#execution-flow" },
  ];

  return (
    <DocsShell
      currentPath="/docs"
      title="Quick start"
      toc={toc}
      next={{ label: "CLI commands", href: "/docs/cli" }}
    >
      <h1 id="quick-start" className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6">
        Quick start
      </h1>

      <p className="text-neutral-400 mb-6">
        Install tiny-agent, run a first coding request in your terminal, and understand the core agent loop.
      </p>

      <h2 id="install-and-run" className="text-lg font-bold text-white mt-10 mb-4 pt-6 border-t border-white/10">
        <a href="#install-and-run" className="hover:underline">
          Install and run
        </a>
      </h2>

      <p className="text-neutral-400 mb-3">
        Install tiny-agent globally via Bun or npm:
      </p>

      <CommandCard command="bun install -g tiny-agent" />

      <p className="text-neutral-400 my-3">
        Alternatively, clone the repository and run directly with zero compile steps:
      </p>

      <CommandCard command="git clone https://github.com/user/tiny-agent && cd tiny-agent" />
      <CommandCard command="bun run src/index.ts" />

      <h2 id="first-request" className="text-lg font-bold text-white mt-10 mb-4 pt-6 border-t border-white/10">
        <a href="#first-request" className="hover:underline">
          Run your first request
        </a>
      </h2>

      <p className="text-neutral-400 mb-3">
        Start tiny-agent from the root directory of the project you want to work on. That directory becomes the primary workspace:
      </p>

      <CommandCard command="cd path/to/project" />
      <CommandCard command="tiny-agent" />

      <p className="text-neutral-400 my-3">
        Type a request that names real files or commands, then press enter:
      </p>

      <CodePre
        code={`Read src/agent.ts and tell me how tool confirmations work.
Then add a test for the declined state in test/agent.test.ts and run the test suite.`}
        lang="prompt"
      />

      <h2 id="execution-flow" className="text-lg font-bold text-white mt-10 mb-4 pt-6 border-t border-white/10">
        <a href="#execution-flow" className="hover:underline">
          Execution flow
        </a>
      </h2>

      <p className="text-neutral-400 my-3">
        tiny-agent works in turns. The model&apos;s response streams token-by-token directly into your terminal without buffering. Each tool call is formatted cleanly in dimmed gray text as it runs.
      </p>

      <p className="text-[#737373] my-3">
        Safe tools like <code className="bg-[#171717] border border-[#262626] px-1 py-0.5 text-[#FAFAFA] text-xs font-mono">read_file</code> and <code className="bg-[#171717] border border-[#262626] px-1 py-0.5 text-[#FAFAFA] text-xs font-mono">search_files</code> execute automatically, while file writes and shell commands pause for your approval.
      </p>
    </DocsShell>
  );
}
