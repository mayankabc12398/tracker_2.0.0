import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { Inline } from '../lib/inline'

/** A question whose answer is hidden until clicked (interview Q&A). */
export function QA({ q, a, index }) {
  const [show, setShow] = useState(false)
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex gap-3">
        {index != null && (
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-indigo-500/15 text-xs font-bold text-indigo-300">
            {index}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-100"><Inline text={q} /></p>
          <button
            onClick={() => setShow((s) => !s)}
            className="mt-2 flex items-center gap-1.5 text-xs font-medium text-indigo-400 transition hover:text-indigo-300"
          >
            {show ? <EyeOff size={13} /> : <Eye size={13} />}
            {show ? 'Answer chhupao' : 'Answer dekho'}
          </button>
          <AnimatePresence initial={false}>
            {show && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <p className="mt-2 border-l-2 border-green-500/40 pl-3 text-sm leading-relaxed text-slate-300">
                  <Inline text={a} />
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
