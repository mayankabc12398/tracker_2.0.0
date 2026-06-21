import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, RotateCcw } from 'lucide-react'

function Seg({ label, value, options, onChange }) {
  return (
    <div>
      <p className="mb-1.5 text-[11px] font-medium text-slate-400">{label}</p>
      <div className="flex flex-wrap gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
        {options.map((o) => (
          <button key={o} onClick={() => onChange(o)} className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${value === o ? 'bg-indigo-500/25 text-white ring-1 ring-indigo-400/30' : 'text-slate-400 hover:text-white'}`}>{o}</button>
        ))}
      </div>
    </div>
  )
}

function Slider({ label, value, min, max, onChange, suffix = '' }) {
  return (
    <div>
      <p className="mb-1 flex justify-between text-[11px] font-medium text-slate-400"><span>{label}</span><span className="text-indigo-300">{value}{suffix}</span></p>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-indigo-500" />
    </div>
  )
}

const COLORS = ['#6366F1', '#22C55E', '#F59E0B', '#EC4899', '#06B6D4']
function Box({ i, children, style }) {
  return <div className="grid h-12 w-12 place-items-center rounded-xl text-sm font-bold text-white shadow-lg" style={{ background: COLORS[i % COLORS.length], ...style }}>{children ?? i + 1}</div>
}

function DemoShell({ title, controls, stage, css }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-indigo-500/30 bg-indigo-500/[0.04]">
      <div className="border-b border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-indigo-200">🎮 {title} — Interactive Demo</div>
      <div className="grid gap-4 p-4 lg:grid-cols-[260px_1fr]">
        <div className="space-y-3">{controls}</div>
        <div className="min-w-0">
          <div className="rounded-xl border border-white/10 bg-[#0d1117] p-4">{stage}</div>
          {css && <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-[#0d1117] p-3 text-[12px] leading-relaxed text-slate-300"><code className="font-mono whitespace-pre">{css}</code></pre>}
        </div>
      </div>
    </div>
  )
}

export function FlexboxDemo() {
  const [dir, setDir] = useState('row')
  const [justify, setJustify] = useState('flex-start')
  const [align, setAlign] = useState('stretch')
  const [wrap, setWrap] = useState('nowrap')
  const css = `.container {\n  display: flex;\n  flex-direction: ${dir};\n  justify-content: ${justify};\n  align-items: ${align};\n  flex-wrap: ${wrap};\n}`
  return (
    <DemoShell title="Flexbox"
      controls={<>
        <Seg label="flex-direction" value={dir} options={['row', 'row-reverse', 'column', 'column-reverse']} onChange={setDir} />
        <Seg label="justify-content" value={justify} options={['flex-start', 'center', 'flex-end', 'space-between', 'space-around']} onChange={setJustify} />
        <Seg label="align-items" value={align} options={['stretch', 'flex-start', 'center', 'flex-end']} onChange={setAlign} />
        <Seg label="flex-wrap" value={wrap} options={['nowrap', 'wrap']} onChange={setWrap} />
      </>}
      stage={<div style={{ display: 'flex', flexDirection: dir, justifyContent: justify, alignItems: align, flexWrap: wrap, gap: 8, minHeight: 160 }}>{[0, 1, 2, 3].map((i) => <Box key={i} i={i} />)}</div>}
      css={css} />
  )
}

export function GridDemo() {
  const [cols, setCols] = useState(3)
  const [gap, setGap] = useState(8)
  const [items, setItems] = useState(6)
  const css = `.container {\n  display: grid;\n  grid-template-columns: repeat(${cols}, 1fr);\n  gap: ${gap}px;\n}`
  return (
    <DemoShell title="CSS Grid"
      controls={<>
        <Slider label="Columns" value={cols} min={1} max={5} onChange={setCols} />
        <Slider label="Gap" value={gap} min={0} max={24} onChange={setGap} suffix="px" />
        <Slider label="Items" value={items} min={1} max={10} onChange={setItems} />
      </>}
      stage={<div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap }}>{Array.from({ length: items }).map((_, i) => <div key={i} className="grid h-12 place-items-center rounded-xl text-sm font-bold text-white" style={{ background: COLORS[i % COLORS.length] }}>{i + 1}</div>)}</div>}
      css={css} />
  )
}

export function PositionDemo() {
  const [pos, setPos] = useState('static')
  const [top, setTop] = useState(10)
  const [left, setLeft] = useState(10)
  const offsetApplies = pos !== 'static'
  const css = `.box {\n  position: ${pos};${offsetApplies ? `\n  top: ${top}px;\n  left: ${left}px;` : ''}\n}`
  return (
    <DemoShell title="Position"
      controls={<>
        <Seg label="position" value={pos} options={['static', 'relative', 'absolute', 'fixed', 'sticky']} onChange={setPos} />
        <Slider label="top" value={top} min={0} max={80} onChange={setTop} suffix="px" />
        <Slider label="left" value={left} min={0} max={200} onChange={setLeft} suffix="px" />
        {!offsetApplies && <p className="text-[11px] text-amber-300/80">static par top/left kaam nahi karte!</p>}
      </>}
      stage={<div style={{ position: 'relative', height: 180, border: '1px dashed rgba(255,255,255,0.15)', borderRadius: 12, overflow: 'hidden' }}>
        <Box i={1}><span className="text-[10px]">ref</span></Box>
        <div className="grid h-12 w-12 place-items-center rounded-xl text-xs font-bold text-white shadow-lg" style={{ background: COLORS[3], position: pos === 'fixed' ? 'absolute' : pos, top: offsetApplies ? top : undefined, left: offsetApplies ? left : undefined }}>box</div>
        <Box i={2}><span className="text-[10px]">ref</span></Box>
      </div>}
      css={css} />
  )
}

const ANIMS = {
  bounce: { animate: { y: [0, -40, 0] }, transition: { duration: 0.8, repeat: Infinity } },
  spin: { animate: { rotate: 360 }, transition: { duration: 1.2, repeat: Infinity, ease: 'linear' } },
  pulse: { animate: { scale: [1, 1.4, 1] }, transition: { duration: 1, repeat: Infinity } },
  shake: { animate: { x: [0, -10, 10, -10, 0] }, transition: { duration: 0.5, repeat: Infinity } },
}
const KEYFRAMES = {
  bounce: `@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-40px); }\n}`,
  spin: `@keyframes spin {\n  to { transform: rotate(360deg); }\n}`,
  pulse: `@keyframes pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.4); }\n}`,
  shake: `@keyframes shake {\n  0%,100% { transform: translateX(0); }\n  25% { transform: translateX(-10px); }\n  75% { transform: translateX(10px); }\n}`,
}
export function AnimationDemo() {
  const [anim, setAnim] = useState('bounce')
  const [playing, setPlaying] = useState(true)
  const css = `.box {\n  animation: ${anim} 1s infinite;\n}\n\n${KEYFRAMES[anim]}`
  return (
    <DemoShell title="Animation"
      controls={<>
        <Seg label="animation" value={anim} options={Object.keys(ANIMS)} onChange={setAnim} />
        <button onClick={() => setPlaying((p) => !p)} className="flex items-center gap-1.5 rounded-lg bg-indigo-500/20 px-3 py-1.5 text-xs font-medium text-indigo-200 ring-1 ring-indigo-400/30">{playing ? <RotateCcw size={13} /> : <Play size={13} />} {playing ? 'Pause' : 'Play'}</button>
      </>}
      stage={<div className="grid h-40 place-items-center"><motion.div key={anim + playing} className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 text-white shadow-lg" {...(playing ? ANIMS[anim] : { animate: {} })}>✦</motion.div></div>}
      css={css} />
  )
}

export const DEMOS = { flexbox: FlexboxDemo, grid: GridDemo, position: PositionDemo, animation: AnimationDemo, transition: AnimationDemo }
