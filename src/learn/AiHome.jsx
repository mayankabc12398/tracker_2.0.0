import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bot, Check, Clock, ArrowRight, Sparkles, BookOpen, Bookmark } from 'lucide-react'
import { aiGroupedTopics, aiTopics, AI_LEVELS } from '@/data/aiTopics'
import { useAiProgress } from '@/store/useAiProgress'

export default function AiHome() {
  const completed = useAiProgress((s) => s.completed)
  const bookmarks = useAiProgress((s) => s.bookmarks)
  const done = Object.keys(completed).length
  const pct = Math.round((done / aiTopics.length) * 100)
  const totalMin = aiTopics.reduce((a, t) => a + t.minutes, 0)
  const firstUnfinished = aiTopics.find((t) => !completed[t.slug]) ?? aiTopics[0]

  return (
    <div className="mx-auto max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/20 via-fuchsia-600/10 to-transparent p-8 sm:p-10">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-violet-300">
          <Sparkles size={12} /> Beginner → Production → Senior
        </span>
        <h1 className="mt-4 flex items-center gap-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-400 to-fuchsia-500 shadow-lg"><Bot className="text-[#0F172A]" /></span>
          AI Integration Mastery
        </h1>
        <p className="mt-3 max-w-xl text-slate-300">
          Apne existing projects mein AI ko integrate karna seekho — simple Hinglish mein. Prompt engineering, Cursor/Copilot/Claude Code, AI rules & docs, MCP, RAG, agents, function calling aur production best practices. Kam code likho, AI se zyada kaam karwao! 🤖
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link to={`/learn/ai/${firstUnfinished.slug}`} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-400 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-[#0F172A] shadow-lg shadow-violet-500/25 transition hover:brightness-110">
            {done > 0 ? 'Continue learning' : 'Shuru karo'} <ArrowRight size={16} />
          </Link>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><BookOpen size={14} /> {aiTopics.length} topics</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> ~{Math.round(totalMin / 60)} hrs</span>
            {Object.keys(bookmarks).length > 0 && <span className="flex items-center gap-1.5"><Bookmark size={14} /> {Object.keys(bookmarks).length} saved</span>}
          </div>
        </div>
        <div className="mt-6">
          <div className="mb-1.5 flex justify-between text-xs text-slate-400">
            <span>Aapki progress</span>
            <span className="font-semibold text-violet-300">{done}/{aiTopics.length} complete · {pct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-500" />
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-400">
          {Object.values(AI_LEVELS).map((l) => (
            <span key={l.label} className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} /> {l.label}</span>
          ))}
        </div>
      </motion.div>

      {aiGroupedTopics.map((group, gi) => (
        <section key={group.id} className="mt-10">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: group.color }} />
            <h2 className="text-lg font-semibold text-white">{group.label}</h2>
            <span className="text-xs text-slate-500">{group.items.length} topics</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {group.items.map((t, i) => {
              const lv = AI_LEVELS[t.level]
              return (
                <motion.div key={t.slug} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (gi + i) * 0.012 }}>
                  <Link to={`/learn/ai/${t.slug}`} className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.04]">
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
