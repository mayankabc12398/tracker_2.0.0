// Lightweight CSS syntax highlighter → React spans. No external deps.

const C = {
  comment: '#64748b', selector: '#fbbf24', atRule: '#f472b6', property: '#38bdf8',
  string: '#34d399', number: '#f59e0b', hex: '#34d399', func: '#c084fc', value: '#a5b4fc', punct: '#94a3b8',
}

let kid = 0
const k = () => `cs-${kid++}`

const TOKEN_RE =
  /(\/\*[\s\S]*?\*\/)|(\s+)|("[^"]*"|'[^']*')|(@[\w-]+)|(#[0-9a-fA-F]{3,8})|(-?\d*\.?\d+[a-z%]*)|([\w-]+)|([{}();:,>+~*.#!&[\]=^$|])/g

export function highlightCss(code) {
  kid = 0
  const toks = []
  let m
  while ((m = TOKEN_RE.exec(code)) !== null) {
    const [, comment, ws, str, at, hex, num, word, punct] = m
    if (comment != null) toks.push({ t: 'comment', v: comment })
    else if (ws != null) toks.push({ t: 'ws', v: ws })
    else if (str != null) toks.push({ t: 'string', v: str })
    else if (at != null) toks.push({ t: 'at', v: at })
    else if (hex != null) toks.push({ t: 'hex', v: hex })
    else if (num != null) toks.push({ t: 'num', v: num })
    else if (word != null) toks.push({ t: 'word', v: word })
    else toks.push({ t: 'punct', v: punct })
  }

  const out = []
  let depth = 0
  let afterColon = false
  const span = (color, v, italic) => out.push(<span key={k()} style={italic ? { color, fontStyle: 'italic' } : { color }}>{v}</span>)
  const nextNonWs = (i) => { for (let j = i + 1; j < toks.length; j++) if (toks[j].t !== 'ws') return toks[j]; return null }

  toks.forEach((tk, i) => {
    switch (tk.t) {
      case 'comment': return span(C.comment, tk.v, true)
      case 'ws': return out.push(tk.v)
      case 'string': return span(C.string, tk.v)
      case 'at': return span(C.atRule, tk.v)
      case 'hex': return span(C.hex, tk.v)
      case 'num': return span(C.number, tk.v)
      case 'punct': {
        if (tk.v === '{') { depth++; afterColon = false; return span(C.punct, tk.v) }
        if (tk.v === '}') { depth = Math.max(0, depth - 1); afterColon = false; return span(C.punct, tk.v) }
        if (tk.v === ';') { afterColon = false; return span(C.punct, tk.v) }
        if (tk.v === ':') { if (depth > 0 && !afterColon) { afterColon = true; return span(C.punct, tk.v) } return span(C.selector, tk.v) }
        if (depth === 0 && '.#&*>+~[]=^$|'.includes(tk.v)) return span(C.selector, tk.v)
        return span(C.punct, tk.v)
      }
      case 'word': {
        if (depth === 0) return span(C.selector, tk.v)
        if (!afterColon) return span(C.property, tk.v)
        if (nextNonWs(i)?.v === '(') return span(C.func, tk.v)
        return span(C.value, tk.v)
      }
      default: return out.push(tk.v)
    }
  })
  return out
}
