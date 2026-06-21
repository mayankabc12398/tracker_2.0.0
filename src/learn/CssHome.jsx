import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Palette, Check, Clock, ArrowRight, Sparkles, BookOpen, Bookmark } from 'lucide-react'
import { cssGroupedTopics, cssTopics, LEVELS } from '@/data/cssTopics'
import { useCssProgress } from '@/store/useCssProgress'

export default function CssHome() {
  const completed = useCssProgress((s) => s.completed)
  const bookmarks = useCssProgress((s) => s.bookmarks)
  const done = Object.keys(completed).length
  const pct = Math.round((done / cssTopics.length) * 100)
  const totalMin = cssTopics.reduce((a, t) => a + t.minutes, 0)
  const firstUnfinished = cssTopics.find((t) => !completed[t.slug]) ?? cssTopics[0]

  return (
    <div className="mx-auto max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-pink-600/20 via-purple-600/10 to-transparent p-8 sm:p-10">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-500/20 blur-3xl" />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-pink-300">
          <Sparkles size={12} /> Beginner → Advanced · Interview ready
        </span>
        <h1 className="mt-4 flex items-center gap-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 shadow-lg"><Palette className="text-white" /></span>
          CSS Master Course
        </h1>
        <p className="mt-3 max-w-xl text-slate-300">
          CSS ko zero se advanced tak seekho — simple Hinglish mein. Live previews, interactive demos (Flexbox, Grid, Position, Animation), code blocks, quizzes aur interview prep. Frontend developer banne ka complete roadmap! 🎨
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link to={`/learn/css/${firstUnfinished.slug}`} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 transition hover:brightness-110">
            {done > 0 ? 'Continue learning' : 'Shuru karo'} <ArrowRight size={16} />
          </Link>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><BookOpen size={14} /> {cssTopics.length} topics</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> ~{Math.round(totalMin / 60)} hrs</span>
            {Object.keys(bookmarks).length > 0 && <span className="flex items-center gap-1.5"><Bookmark size={14} /> {Object.keys(bookmarks).length} saved</span>}
          </div>
        </div>
        <div className="mt-6">
          <div className="mb-1.5 flex justify-between text-xs text-slate-400">
            <span>Aapki progress</span>
            <span className="font-semibold text-pink-300">{done}/{cssTopics.length} complete · {pct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
          </div>
        </div>
        {/* Difficulty legend */}
        <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-400">
          {Object.values(LEVELS).map((l) => (
            <span key={l.label} className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} /> {l.label}</span>
          ))}
        </div>
      </motion.div>

      {cssGroupedTopics.map((group, gi) => (
        <section key={group.id} className="mt-10">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: group.color }} />
            <h2 className="text-lg font-semibold text-white">{group.label}</h2>
            <span className="text-xs text-slate-500">{group.items.length} topics</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {group.items.map((t, i) => {
              const lv = LEVELS[t.level]
              return (
                <motion.div key={t.slug} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (gi + i) * 0.015 }}>
                  <Link to={`/learn/css/${t.slug}`} className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.04]">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-xl" style={{ background: `${group.color}1a` }}>{t.icon}</span>
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-2 text-sm font-semibold text-white">
                        {t.title}
                        {completed[t.slug] && <Check size={14} className="text-green-400" />}
                        {bookmarks[t.slug] && <Bookmark size={12} className="fill-amber-400 text-amber-400" />}
                      </p>
                      <p className="flex items-center gap-2 truncate text-xs text-slate-500">
                        <span className="rounded px-1.5 py-0.5 text-[10px] font-medium" style={{ background: lv.bg, color: lv.color }}>{lv.label}</span>
                        {t.hi}
                      </p>
                    </div>
                    {t.demo && <span className="rounded-md bg-pink-500/15 px-2 py-0.5 text-[10px] font-medium text-pink-300">demo</span>}
                    <ArrowRight size={16} className="shrink-0 text-slate-600 transition group-hover:translate-x-1 group-hover:text-white" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
