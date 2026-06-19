// Minimal inline-markdown renderer for course prose.
// Supports **bold**, *italic*, `code`, and \n paragraph breaks.

let id = 0
const key = () => `md-${id++}`

function renderInline(text) {
  const out = []
  // Order matters: code first so ** inside ` ` isn't parsed.
  const re = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)/g
  let last = 0
  let m
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index))
    if (m[1]) {
      out.push(
        <code key={key()} className="rounded-md bg-indigo-500/15 px-1.5 py-0.5 font-mono text-[0.85em] text-indigo-300">
          {m[1].slice(1, -1)}
        </code>,
      )
    } else if (m[2]) {
      out.push(<strong key={key()} className="font-semibold text-white">{m[2].slice(2, -2)}</strong>)
    } else if (m[3]) {
      out.push(<em key={key()} className="italic text-slate-200">{m[3].slice(1, -1)}</em>)
    }
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

/** Render a string with simple inline markdown + paragraph breaks. */
export function Prose({ text, className = '' }) {
  id = 0
  if (!text) return null
  const paras = String(text).split('\n').filter((p) => p.trim() !== '')
  return (
    <div className={`space-y-3 leading-relaxed text-slate-300 ${className}`}>
      {paras.map((p, i) => (
        <p key={i}>{renderInline(p)}</p>
      ))}
    </div>
  )
}

/** Inline-only (no paragraph wrapping). */
export function Inline({ text }) {
  id = 0
  return <>{renderInline(String(text ?? ''))}</>
}
