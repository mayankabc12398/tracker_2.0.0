import { useState } from 'react'
import { Check, Copy, Code2 } from 'lucide-react'
import { highlightHtml } from '../lib/highlight'

export function CodeBlock({ code, label = 'HTML', note }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard may be blocked in some contexts */
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <span className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </span>
          <span className="ml-2 flex items-center gap-1.5">
            <Code2 size={13} /> {label}
          </span>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-400 transition hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono">{highlightHtml(code)}</code>
      </pre>
      {note && (
        <div className="border-t border-white/10 bg-white/[0.02] px-4 py-2 text-xs text-slate-400">
          💡 {note}
        </div>
      )}
    </div>
  )
}
