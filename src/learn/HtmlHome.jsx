import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Code2, Check, Clock, ArrowRight, Sparkles, BookOpen } from 'lucide-react'
import { groupedTopics, topics } from '@/data/htmlTopics'
import { useLearnProgress } from '@/store/useLearnProgress'

export default function HtmlHome() {
  const completed = useLearnProgress((s) => s.completed)
  const done = Object.keys(completed).length
  const pct = Math.round((done / topics.length) * 100)
  const totalMin = topics.reduce((a, t) => a + t.minutes, 0)
  const firstUnfinished = topics.find((t) => !completed[t.slug]) ?? topics[0]

  return (
    <div className="mx-auto max-w-4xl">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent p-8 sm:p-10"
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-indigo-300">
          <Sparkles size={12} /> Hindi + Hinglish · Beginner friendly
        </span>
        <h1 className="mt-4 flex items-center gap-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg">
            <Code2 className="text-white" />
          </span>
          HTML Master Course
        </h1>
        <p className="mt-3 max-w-xl text-slate-300">
          Zero se HTML seekho — bilkul simple Hindi mein. Har topic ke saath examples, diagrams, code, quiz aur interview questions. Aaj se web developer banne ka safar shuru karo! 🚀
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            to={`/learn/html/${firstUnfinished.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110"
          >
            {done > 0 ? 'Continue learning' : 'Shuru karo'} <ArrowRight size={16} />
          </Link>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><BookOpen size={14} /> {topics.length} topics</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> ~{Math.round(totalMin / 60)} hrs</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="mb-1.5 flex justify-between text-xs text-slate-400">
            <span>Aapki progress</span>
            <span className="font-semibold text-indigo-300">{done}/{topics.length} complete · {pct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
          </div>
        </div>
      </motion.div>

      {/* Topic groups */}
      {groupedTopics.map((group, gi) => (
        <section key={group.id} className="mt-10">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: group.color }} />
            <h2 className="text-lg font-semibold text-white">{group.label}</h2>
            <span className="text-xs text-slate-500">{group.items.length} topics</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {group.items.map((t, i) => (
              <motion.div key={t.slug} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (gi + i) * 0.02 }}>
                <Link
                  to={`/learn/html/${t.slug}`}
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.04]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-xl" style={{ background: `${group.color}1a` }}>
                    {t.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-sm font-semibold text-white">
                      {t.title}
                      {completed[t.slug] && <Check size={14} className="text-green-400" />}
                    </p>
                    <p className="truncate text-xs text-slate-500">{t.hi} · {t.minutes} min</p>
                  </div>
                  <ArrowRight size={16} className="shrink-0 text-slate-600 transition group-hover:translate-x-1 group-hover:text-white" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
