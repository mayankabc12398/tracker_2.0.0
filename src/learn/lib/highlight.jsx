// Lightweight HTML/markup syntax highlighter → returns React spans.
// No external dependency; tuned for the code samples in this course.

const C = {
  punct: '#64748b', // slate-500  < > / =
  tag: '#f472b6', // pink-400    tag names
  attr: '#fbbf24', // amber-400   attribute names
  string: '#34d399', // emerald-400 "values"
  comment: '#64748b', // slate-500  <!-- -->
  entity: '#f59e0b', // amber-500   &lt; &copy;
  text: '#e2e8f0', // slate-200   plain text
}

let keyId = 0
const k = () => `hl-${keyId++}`

/** Highlight an attributes string (the bit between tag name and >). */
function highlightAttrs(attrs) {
  const out = []
  // name="value" | name='value' | name | = | whitespace
  const re = /([a-zA-Z-]+)(=)|("[^"]*"|'[^']*')|(\s+)|([^\s]+)/g
  let m
  while ((m = re.exec(attrs)) !== null) {
    if (m[1]) {
      out.push(<span key={k()} style={{ color: C.attr }}>{m[1]}</span>)
      out.push(<span key={k()} style={{ color: C.punct }}>{m[2]}</span>)
    } else if (m[3]) {
      out.push(<span key={k()} style={{ color: C.string }}>{m[3]}</span>)
    } else if (m[4]) {
      out.push(m[4])
    } else {
      out.push(<span key={k()} style={{ color: C.text }}>{m[5]}</span>)
    }
  }
  return out
}

/** Highlight plain text content (handles &entities;). */
function highlightText(text) {
  const out = []
  const re = /(&[a-zA-Z]+;|&#\d+;)/g
  let last = 0
  let m
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index))
    out.push(<span key={k()} style={{ color: C.entity }}>{m[0]}</span>)
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

export function highlightHtml(code) {
  keyId = 0
  const segments = code.split(/(<!--[\s\S]*?-->|<\/?[a-zA-Z][^>]*>)/g)
  return segments.map((seg) => {
    if (!seg) return null
    // Comment
    if (seg.startsWith('<!--')) {
      return <span key={k()} style={{ color: C.comment, fontStyle: 'italic' }}>{seg}</span>
    }
    // Tag
    const tag = seg.match(/^(<\/?)([a-zA-Z][a-zA-Z0-9-]*)([\s\S]*?)(\/?>)$/)
    if (tag) {
      return (
        <span key={k()}>
          <span style={{ color: C.punct }}>{tag[1]}</span>
          <span style={{ color: C.tag }}>{tag[2]}</span>
          {highlightAttrs(tag[3])}
          <span style={{ color: C.punct }}>{tag[4]}</span>
        </span>
      )
    }
    // Plain text
    return <span key={k()} style={{ color: C.text }}>{highlightText(seg)}</span>
  })
}
