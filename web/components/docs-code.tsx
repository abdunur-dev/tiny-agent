"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CommandCard({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 font-mono text-sm text-white shadow-sm my-3 hover:border-white/20 transition-all">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <span className="select-none text-neutral-500">$</span>
        <code className="min-w-0 flex-1 whitespace-pre-wrap break-words bg-transparent p-0 text-white font-mono text-sm">
          {command}
        </code>
      </div>
      <button
        onClick={handleCopy}
        type="button"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
        aria-label="Copy command"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
}

export function CodePre({ code, lang = "text" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="group relative my-4 rounded-xl border border-white/10 bg-neutral-950 overflow-hidden font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-neutral-900/50 text-xs text-neutral-400">
        <span>{lang}</span>
        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-neutral-200 leading-relaxed text-xs sm:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}
