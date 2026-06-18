import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, BookOpen, ChevronRight, Tag } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { Input } from '@/components/ui/Input'
import { useStore } from '@/store/useStore'

export default function Learning() {
  const { subjects, topics } = useStore()
  const [active, setActive] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () =>
      topics
        .filter((t) => (active === 'all' ? true : t.subjectId === active))
        .filter((t) => t.title.toLowerCase().includes(query.toLowerCase()) || t.tags.some((tg) => tg.includes(query.toLowerCase()))),
    [topics, active, query],
  )

  const overall = topics.length ? Math.round(topics.reduce((a, t) => a + t.progress, 0) / topics.length) : 0

  return (
    <div className="space-y-6">
      <PageHeader title="Learning Hub" subtitle={`${topics.length} topics · ${overall}% overall mastery`} />

      {/* Subject tiles */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <SubjectTile id="all" name="All" icon="📚" color="#6366F1" active={active === 'all'} onClick={() => setActive('all')} count={topics.length} />
        {subjects.map((s) => (
          <SubjectTile
            key={s.id}
            id={s.id}
            name={s.name}
            icon={s.icon}
            color={s.color}
            active={active === s.id}
            onClick={() => setActive(s.id)}
            count={topics.filter((t) => t.subjectId === s.id).length}
          />
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search topics or tags…" className="pl-9" />
      </div>

      {/* Topic cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t, i) => {
          const subject = subjects.find((s) => s.id === t.subjectId)
          return (
            <motion.div key={t.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Link to={`/learning/${t.id}`}>
                <Card hover className="group h-full">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-2xl">{subject?.icon}</span>
                    <ChevronRight size={16} className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-white" />
                  </div>
                  <h3 className="font-semibold text-white">{t.title}</h3>
                  <p className="mb-3 text-xs text-slate-500">{subject?.name}</p>
                  <p className="mb-4 line-clamp-2 text-sm text-slate-400">{t.overview}</p>
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {t.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="flex items-center gap-1 rounded-md bg-white/[0.05] px-2 py-0.5 text-[10px] text-slate-400"><Tag size={9} />{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{t.progress}% complete</span>
                    <Badge tone="indigo">{t.interviewQuestions.length} Q&A</Badge>
                  </div>
                  <Progress value={t.progress} className="mt-2" />
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>
      {filtered.length === 0 && (
        <Card className="py-12 text-center">
          <BookOpen className="mx-auto mb-3 text-slate-600" />
          <p className="text-slate-400">No topics match your search.</p>
        </Card>
      )}
    </div>
  )
}

function SubjectTile({ name, icon, color, active, onClick, count }) {
  return (
    <button
      onClick={onClick}
      className={`glass glass-hover flex flex-col items-center gap-1.5 p-4 transition ${active ? 'ring-2 ring-brand-indigo/50' : ''}`}
      style={active ? { boxShadow: `0 0 0 1px ${color}55` } : undefined}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-medium text-white">{name}</span>
      <span className="text-[10px] text-slate-500">{count} topics</span>
    </button>
  )
}
