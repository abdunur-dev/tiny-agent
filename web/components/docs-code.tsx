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
    <div className="group flex items-center justify-between gap-4 border border-[#262626] bg-[#0A0A0A] px-4 py-3 font-mono text-sm text-[#FAFAFA] my-3 hover:border-[#404040] transition-colors">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <span className="select-none text-[#737373]">$</span>
        <code className="min-w-0 flex-1 whitespace-pre-wrap break-words bg-transparent p-0 text-[#FAFAFA] font-mono text-sm">
          {command}
        </code>
      </div>
      <button
        onClick={handleCopy}
        type="button"
        className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#262626] bg-[#121212] text-[#737373] hover:text-[#FAFAFA] hover:border-[#404040] transition-colors"
        aria-label="Copy command"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-[#FAFAFA]" />
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
    <div className="group relative my-4 border border-[#262626] bg-[#0A0A0A] overflow-hidden font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#262626] bg-[#121212] text-xs text-[#737373]">
        <span>{lang}</span>
        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1 text-[#737373] hover:text-[#FAFAFA] transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#FAFAFA]" />
              <span className="text-[#FAFAFA]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[#FAFAFA] leading-relaxed text-xs sm:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}
