// Lightweight JavaScript syntax highlighter → React spans. No external deps.

const C = {
  comment: '#64748b', keyword: '#f472b6', literal: '#38bdf8', string: '#34d399',
  number: '#f59e0b', func: '#c084fc', prop: '#7dd3fc', punct: '#94a3b8',
  ident: '#e2e8f0', regex: '#fbbf24',
}

const KEYWORDS = new Set([
  'var', 'let', 'const', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
  'switch', 'case', 'default', 'break', 'continue', 'new', 'delete', 'typeof',
  'instanceof', 'void', 'this', 'class', 'extends', 'super', 'import', 'export',
  'from', 'as', 'async', 'await', 'yield', 'try', 'catch', 'finally', 'throw',
  'in', 'of', 'static', 'get', 'set',
])
const LITERALS = new Set(['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'])

let kid = 0
const k = () => `js-${kid++}`

// strings (incl. template) | comments | numbers | identifiers | whitespace | punctuation
const TOKEN_RE =
  /(`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(\b\d[\d_]*\.?\d*(?:e[+-]?\d+)?\b)|([A-Za-z_$][\w$]*)|(\s+)|([^\w\s])/g

export function highlightJs(code) {
  kid = 0
  const toks = []
  let m
  while ((m = TOKEN_RE.exec(code)) !== null) {
    const [, str, comment, num, word, ws, punct] = m
    if (str != null) toks.push({ t: 'string', v: str })
    else if (comment != null) toks.push({ t: 'comment', v: comment })
    else if (num != null) toks.push({ t: 'number', v: num })
    else if (word != null) toks.push({ t: 'word', v: word })
    else if (ws != null) toks.push({ t: 'ws', v: ws })
    else toks.push({ t: 'punct', v: punct })
  }

  const out = []
  const span = (color, v, italic) =>
    out.push(<span key={k()} style={italic ? { color, fontStyle: 'italic' } : { color }}>{v}</span>)
  const nextNonWs = (i) => { for (let j = i + 1; j < toks.length; j++) if (toks[j].t !== 'ws') return toks[j]; return null }
  const prevNonWs = (i) => { for (let j = i - 1; j >= 0; j--) if (toks[j].t !== 'ws') return toks[j]; return null }

  toks.forEach((tk, i) => {
    switch (tk.t) {
      case 'comment': return span(C.comment, tk.v, true)
      case 'ws': return out.push(tk.v)
      case 'string': return span(C.string, tk.v)
      case 'number': return span(C.number, tk.v)
      case 'punct': return span(C.punct, tk.v)
      case 'word': {
        if (KEYWORDS.has(tk.v)) return span(C.keyword, tk.v)
        if (LITERALS.has(tk.v)) return span(C.literal, tk.v)
        if (nextNonWs(i)?.v === '(') return span(C.func, tk.v)
        if (prevNonWs(i)?.v === '.') return span(C.prop, tk.v)
        // Capitalised → likely a class/constructor
        if (/^[A-Z]/.test(tk.v)) return span(C.func, tk.v)
        return span(C.ident, tk.v)
      }
      default: return out.push(tk.v)
    }
  })
  return out
}
