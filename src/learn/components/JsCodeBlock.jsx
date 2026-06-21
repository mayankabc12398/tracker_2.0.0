import { useState } from 'react'
import { Check, Copy, Code2 } from 'lucide-react'
import { highlightJs } from '../lib/highlightJs'
import { highlightHtml } from '../lib/highlight'
import { highlightCss } from '../lib/highlightCss'

const LABELS = { js: 'JavaScript', html: 'HTML', css: 'CSS' }

/** Code block for the JS course — defaults to JS highlighting, supports HTML/CSS too. */
export function JsCodeBlock({ code, lang = 'js', label, note }) {
  const [copied, setCopied] = useState(false)
  const highlighter = lang === 'html' ? highlightHtml : lang === 'css' ? highlightCss : highlightJs
  const displayLabel = label ?? LABELS[lang] ?? 'JavaScript'

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard may be blocked */
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
          <span className="ml-2 flex items-center gap-1.5"><Code2 size={13} /> {displayLabel}</span>
        </div>
        <button onClick={copy} className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-400 transition hover:bg-white/10 hover:text-white">
          {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono">{highlighter(code)}</code>
      </pre>
      {note && <div className="border-t border-white/10 bg-white/[0.02] px-4 py-2 text-xs text-slate-400">💡 {note}</div>}
    </div>
  )
}

/** A mock console output block — shows what a snippet logs. */
export function ConsoleBlock({ lines }) {
  const arr = Array.isArray(lines) ? lines : [lines]
  return (
    <div className="overflow-hidden rounded-2xl border border-green-500/20 bg-[#0a0f0a] shadow-lg">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-green-300/80">
        <span className="font-mono">{'>'}_</span> Console output
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono text-green-300/90">{arr.map((l, i) => (
          <div key={i}><span className="select-none text-slate-600">› </span>{l}</div>
        ))}</code>
      </pre>
    </div>
  )
}
