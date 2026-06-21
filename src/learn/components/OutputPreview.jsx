import { useMemo } from 'react'
import { Eye } from 'lucide-react'

/** Renders real HTML + CSS inside a sandboxed iframe (isolated from the app). */
export function OutputPreview({ html = '', css = '', height = 180, label = 'Live Output' }) {
  const srcDoc = useMemo(
    () => `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
      *{box-sizing:border-box} html,body{margin:0}
      body{font-family:Inter,system-ui,Segoe UI,sans-serif;color:#0f172a;padding:16px;background:#ffffff;}
      ${css}
    </style></head><body>${html}</body></html>`,
    [html, css],
  )
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-slate-400">
        <Eye size={13} className="text-pink-400" /> {label}
      </div>
      <iframe title={label} srcDoc={srcDoc} sandbox="allow-scripts" className="w-full bg-white" style={{ height, border: 0 }} loading="lazy" />
    </div>
  )
}

export function CodePreview({ children, html, css, height }) {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <div className="min-w-0">{children}</div>
      <OutputPreview html={html} css={css} height={height} />
    </div>
  )
}
