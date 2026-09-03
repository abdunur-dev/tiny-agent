import { DocsShell, type TocItem } from "@/components/docs-shell";
import { ShieldAlert } from "lucide-react";

export default function SafetyDocsPage() {
  const toc: TocItem[] = [
    { label: "Safety & permissions", href: "#safety-model" },
    { label: "Approval policy", href: "#approval-policy" },
    { label: "Approve deliberately", href: "#approve-deliberately" },
    { label: "Auto-approve (--yolo)", href: "#yolo-mode" },
    { label: "Tools reference", href: "#tools-reference" },
  ];

  return (
    <DocsShell
      currentPath="/docs/safety"
      title="Safety & permissions"
      toc={toc}
      prev={{ label: "CLI commands", href: "/docs/cli" }}
      next={{ label: "Engines & offline", href: "/docs/engines" }}
    >
      <h1 id="safety-model" className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6">
        Safety & permissions
      </h1>

      <p className="text-neutral-400 mb-6">
        Inspired by fx.sh from Vercel Labs, tiny-agent pauses before executing risky operations to protect your codebase and environment.
      </p>

      <h2 id="approval-policy" className="text-lg font-bold text-white mt-10 mb-4 pt-6 border-t border-white/10">
        <a href="#approval-policy" className="hover:underline">
          What tiny-agent asks before it acts
        </a>
      </h2>

      <p className="text-neutral-400 mb-4">
        Actions that inspect the codebase execute immediately without user intervention, while state-changing actions require interactive confirmation:
      </p>

      <div className="space-y-4 my-4">
        <div className="p-4 rounded-xl border border-white/10 bg-neutral-950">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-white">Safe Tools (Instant)</span>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/30">
              No Approval Needed
            </span>
          </div>
          <p className="text-xs text-neutral-400">
            <code className="text-white font-mono">read_file</code> and <code className="text-white font-mono">search_files</code> are strictly read-only. Before executing, they print a dimmed status line (e.g. <code className="text-white font-mono">↳ read_file: path</code>) for full visibility while executing instantly without blocking for confirmation.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-white/10 bg-neutral-950">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-white">Risky Tools (Paused for Approval)</span>
            <span className="text-[11px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/30">
              Approval Required
            </span>
          </div>
          <ul className="text-xs text-neutral-400 space-y-1.5 mt-2">
            <li>
              <strong className="text-neutral-200">write_file:</strong> Shows the destination path and a preview of file contents before creation.
            </li>
            <li>
              <strong className="text-neutral-200">edit_file:</strong> Shows an exact red/green diff preview (<span className="text-red-400">- old</span> / <span className="text-emerald-400">+ new</span>) prior to replacement.
            </li>
            <li>
              <strong className="text-neutral-200">run_shell_command:</strong> Shows the exact command string and arguments before process execution.
            </li>
          </ul>
        </div>
      </div>

      {/* Approve Deliberately Callout */}
      <div id="approve-deliberately" className="rounded-xl border border-white/10 bg-neutral-950/80 p-5 my-8 text-sm">
        <div className="flex items-center gap-2 mb-2 text-white font-semibold">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>Approve deliberately</span>
        </div>
        <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
          An approval grants execution of the exact action previewed in the terminal. If you enter <code className="text-white">n</code>, the tool execution is halted and the agent is instructed to suggest alternative approaches rather than retrying in a loop.
        </p>
      </div>

      <h2 id="yolo-mode" className="text-lg font-bold text-white mt-10 mb-4 pt-6 border-t border-white/10">
        <a href="#yolo-mode" className="hover:underline">
          Auto-approve mode (--yolo)
        </a>
      </h2>

      <p className="text-neutral-400 mb-3">
        When running scripted workflows or operating inside isolated Docker containers, you can disable all interactive prompts using the <code className="text-white">--yolo</code> or <code className="text-white">--auto-approve</code> flag:
      </p>

      <pre className="p-4 rounded-xl border border-white/10 bg-neutral-950 text-xs sm:text-sm text-neutral-200 font-mono my-3">
        <code>tiny-agent --yolo "Refactor error handling in src/tools.ts"</code>
      </pre>

      <p className="text-neutral-400 text-xs sm:text-sm mt-3">
        When active, tiny-agent prints a yellow startup warning reminding you that actions execute autonomously without confirmation.
      </p>

      <h2 id="tools-reference" className="text-lg font-bold text-white mt-10 mb-4 pt-6 border-t border-white/10">
        <a href="#tools-reference" className="hover:underline">
          Tools reference
        </a>
      </h2>

      <div className="space-y-4 my-4">
        <div className="p-4 rounded-xl border border-white/10 bg-neutral-950">
          <code className="text-white font-semibold text-xs sm:text-sm">read_file(path)</code>
          <p className="text-neutral-400 text-xs mt-1">
            Asynchronously reads file text. Automatically performs shallow recursive basename resolution (e.g. bare <code className="text-white">agent.ts</code> resolves to <code className="text-white">src/agent.ts</code>).
          </p>
        </div>

        <div className="p-4 rounded-xl border border-white/10 bg-neutral-950">
          <code className="text-white font-semibold text-xs sm:text-sm">write_file(path, content)</code>
          <p className="text-neutral-400 text-xs mt-1">
            Writes complete content to disk, automatically creating parent directories. Prompts confirmation unless in yolo mode.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-white/10 bg-neutral-950">
          <code className="text-white font-semibold text-xs sm:text-sm">edit_file(path, old_string, new_string)</code>
          <p className="text-neutral-400 text-xs mt-1">
            Replaces exact substring occurrence. Fails safely if <code className="text-white">old_string</code> is missing or appears more than once.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-white/10 bg-neutral-950">
          <code className="text-white font-semibold text-xs sm:text-sm">run_shell_command(command)</code>
          <p className="text-neutral-400 text-xs mt-1">
            Executes shell commands with a 30-second timeout guard to prevent runaway processes.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-white/10 bg-neutral-950">
          <code className="text-white font-semibold text-xs sm:text-sm">search_files(pattern, directory)</code>
          <p className="text-neutral-400 text-xs mt-1">
            Recursive regex grep ignoring <code className="text-white">node_modules</code>, <code className="text-white">.git</code>, and build output.
          </p>
        </div>
      </div>
    </DocsShell>
  );
}
