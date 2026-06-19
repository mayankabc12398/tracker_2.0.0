import { useState } from 'react'
import { motion } from 'framer-motion'

export function Tabs({ tabs }) {
  const [active, setActive] = useState(0)
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-1 rounded-xl border border-white/10 bg-white/[0.02] p-1">
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${active === i ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            {active === i && (
              <motion.span layoutId="learn-tab" className="absolute inset-0 rounded-lg bg-indigo-500/20 ring-1 ring-indigo-400/30" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {t.badge != null && <span className="opacity-70">{t.badge}</span>}
              {t.label}
            </span>
          </button>
        ))}
      </div>
      <motion.div key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        {tabs[active].content}
      </motion.div>
    </div>
  )
}
