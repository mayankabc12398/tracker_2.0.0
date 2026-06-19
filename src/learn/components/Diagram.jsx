import { motion } from 'framer-motion'
import { ArrowRight, CornerDownRight } from 'lucide-react'

/** Renders the `visual` block of a topic based on its `type`. */
export function Diagram({ data }) {
  if (!data) return null
  switch (data.type) {
    case 'boxes':
      return <Boxes items={data.items} />
    case 'timeline':
      return <Timeline items={data.items} />
    case 'tree':
      return <Tree root={data.root} children={data.children} />
    case 'anatomy':
      return <Anatomy />
    default:
      return null
  }
}

function Boxes({ items }) {
  return (
    <div className="flex flex-wrap items-stretch gap-3">
      {items.map((b, i) => (
        <div key={i} className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="min-w-[140px] flex-1 rounded-2xl border p-4 text-center"
            style={{ borderColor: `${b.color}55`, background: `${b.color}14` }}
          >
            <p className="text-base font-bold" style={{ color: b.color }}>{b.label}</p>
            {b.sub && <p className="mt-1 text-xs text-slate-400">{b.sub}</p>}
          </motion.div>
          {i < items.length - 1 && <ArrowRight size={18} className="hidden shrink-0 text-slate-600 sm:block" />}
        </div>
      ))}
    </div>
  )
}

function Timeline({ items }) {
  return (
    <div className="relative space-y-4 pl-6">
      <div className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-indigo-500 to-purple-500" />
      {items.map((it, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="relative"
        >
          <span className="absolute -left-[22px] top-1 h-3.5 w-3.5 rounded-full border-2 border-indigo-400 bg-[#0F172A]" />
          <div className="flex items-baseline gap-3">
            <span className="rounded-lg bg-indigo-500/15 px-2 py-0.5 text-xs font-bold text-indigo-300">{it.year}</span>
            <span className="text-sm text-slate-300">{it.text}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function TreeNode({ node, depth = 0 }) {
  const color = node.color ?? '#6366F1'
  return (
    <div className={depth > 0 ? 'ml-5 border-l border-white/10 pl-4' : ''}>
      <div className="flex items-center gap-2 py-1">
        {depth > 0 && <CornerDownRight size={13} className="text-slate-600" />}
        <span className="rounded-lg px-2.5 py-1 font-mono text-xs font-semibold" style={{ background: `${color}1a`, color }}>
          &lt;{node.label}&gt;
        </span>
        {node.sub && <span className="text-xs text-slate-500">{node.sub}</span>}
      </div>
      {node.children?.map((c, i) => (
        <TreeNode key={i} node={c} depth={depth + 1} />
      ))}
    </div>
  )
}

function Tree({ root, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <TreeNode node={{ label: root, color: '#6366F1', children }} />
    </div>
  )
}

/** Visual breakdown of a tag/element's anatomy. */
function Anatomy() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d1117] p-6">
      <div className="flex flex-wrap items-end justify-center gap-1 font-mono text-lg">
        <Part bracket label="<h1>" color="#f472b6" caption="Opening tag" />
        <Part label="Hello" color="#e2e8f0" caption="Content" />
        <Part bracket label="</h1>" color="#f472b6" caption="Closing tag" />
      </div>
      <p className="mt-6 text-center text-xs text-slate-500">
        Opening tag + Content + Closing tag = <span className="text-indigo-300">Element</span>
      </p>
    </div>
  )
}

function Part({ label, color, caption }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="rounded-lg px-2 py-1" style={{ background: `${color}1a`, color }}>{label}</span>
      <span className="h-3 w-px bg-white/15" />
      <span className="text-[10px] uppercase tracking-wide text-slate-500">{caption}</span>
    </div>
  )
}
