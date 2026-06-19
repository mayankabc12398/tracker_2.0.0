import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, RotateCcw, Trophy } from 'lucide-react'
import { Inline } from '../lib/inline'

export function Quiz({ questions }) {
  const [answers, setAnswers] = useState({}) // index -> chosen option
  const choose = (qi, oi) => {
    if (answers[qi] != null) return // lock after answering
    setAnswers((a) => ({ ...a, [qi]: oi }))
  }
  const reset = () => setAnswers({})

  const answered = Object.keys(answers).length
  const correct = questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0)
  const allDone = answered === questions.length

  return (
    <div className="space-y-4">
      {questions.map((q, qi) => {
        const chosen = answers[qi]
        const done = chosen != null
        return (
          <div key={qi} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="mb-3 flex gap-2 text-sm font-medium text-slate-100">
              <span className="text-indigo-400">Q{qi + 1}.</span>
              <Inline text={q.q} />
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {q.options.map((opt, oi) => {
                const isCorrect = oi === q.answer
                const isChosen = oi === chosen
                let cls = 'border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/20'
                if (done && isCorrect) cls = 'border-green-500/50 bg-green-500/10 text-green-200'
                else if (done && isChosen) cls = 'border-red-500/50 bg-red-500/10 text-red-200'
                else if (done) cls = 'border-white/5 bg-white/[0.01] text-slate-500'
                return (
                  <button
                    key={oi}
                    onClick={() => choose(qi, oi)}
                    disabled={done}
                    className={`flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-left text-sm transition ${cls}`}
                  >
                    <span><Inline text={opt} /></span>
                    {done && isCorrect && <Check size={15} className="shrink-0 text-green-400" />}
                    {done && isChosen && !isCorrect && <X size={15} className="shrink-0 text-red-400" />}
                  </button>
                )
              })}
            </div>
            {done && q.explain && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 rounded-xl bg-white/[0.03] px-3 py-2 text-xs leading-relaxed text-slate-400"
              >
                <span className={chosen === q.answer ? 'text-green-400' : 'text-amber-400'}>
                  {chosen === q.answer ? 'Sahi! ' : 'Galat. '}
                </span>
                <Inline text={q.explain} />
              </motion.p>
            )}
          </div>
        )
      })}

      {answered > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-indigo-500/30 bg-indigo-500/[0.07] p-4">
          <div className="flex items-center gap-2.5 text-sm">
            <Trophy size={18} className="text-amber-400" />
            <span className="font-medium text-slate-200">
              Score: <span className="text-white">{correct}/{questions.length}</span>
              {allDone && correct === questions.length && ' — Perfect! 🎉'}
            </span>
          </div>
          <button onClick={reset} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-indigo-300 transition hover:bg-white/10">
            <RotateCcw size={13} /> Phir se
          </button>
        </div>
      )}
    </div>
  )
}
