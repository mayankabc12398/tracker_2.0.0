import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, BookOpen, Code2, Lightbulb, StickyNote, HelpCircle, Link2, History, Save, Tag,
} from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { Textarea } from '@/components/ui/Input'
import { EmptyState } from '@/components/ui/EmptyState'
import { toast } from '@/components/ui/Toast'
import { useStore } from '@/store/useStore'
import { formatDate } from '@/lib/utils'

const tabs = [
  { key: 'overview', label: 'Overview', icon: BookOpen },
  { key: 'syntax', label: 'Syntax', icon: Code2 },
  { key: 'examples', label: 'Examples', icon: Lightbulb },
  { key: 'notes', label: 'Notes', icon: StickyNote },
  { key: 'interview', label: 'Interview', icon: HelpCircle },
  { key: 'resources', label: 'Resources', icon: Link2 },
  { key: 'history', label: 'History', icon: History },
] 

export default function TopicDetail() {
  const { topicId } = useParams()
  const { topics, subjects, updateTopic } = useStore()
  const topic = topics.find((t) => t.id === topicId)
  const [tab, setTab] = useState('overview')
  const [noteDraft, setNoteDraft] = useState(topic?.notes ?? '')

  if (!topic) {
    return <EmptyState icon={<BookOpen />} title="Topic not found" action={<Link to="/learning"><Button>Back to Learning</Button></Link>} />
  }
  const subject = subjects.find((s) => s.id === topic.subjectId)

  const saveNotes = () => {
    updateTopic(topic.id, { notes: noteDraft }, 'Updated personal notes')
    toast.success('Notes saved')
  }

  const codeBox = (text) =>
    text ? (
      <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-slate-200"><code>{text}</code></pre>
    ) : (
      <p className="text-sm text-slate-500">Nothing here yet.</p>
    )

  return (
    <div className="space-y-6">
      <Link to="/learning" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white"><ArrowLeft size={15} /> Back to Learning</Link>

      <PageHeader
        title={`${subject?.icon ?? ''} ${topic.title}`}
        subtitle={`${subject?.name} · Updated ${formatDate(topic.updatedAt, { month: 'short', day: 'numeric', year: 'numeric' })}`}
        action={<Badge tone="green">{topic.progress}% mastered</Badge>}
      />

      <Progress value={topic.progress} />
      <div className="flex flex-wrap gap-2">
        {topic.tags.map((t) => (
          <span key={t} className="flex items-center gap-1 rounded-md bg-white/[0.05] px-2 py-1 text-xs text-slate-400"><Tag size={10} />{t}</span>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-white/10 pb-2">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition ${tab === key ? 'bg-brand-indigo/15 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          {tab === 'overview' && (
            <div className="space-y-4">
              <Section title="Overview"><p className="text-sm leading-relaxed text-slate-300">{topic.overview}</p></Section>
              <Section title="Best Practices"><pre className="whitespace-pre-wrap text-sm text-slate-300">{topic.bestPractices}</pre></Section>
            </div>
          )}
          {tab === 'syntax' && <Section title="Syntax">{codeBox(topic.syntax)}</Section>}
          {tab === 'examples' && <Section title="Examples"><p className="text-sm leading-relaxed text-slate-300">{topic.examples}</p></Section>}
          {tab === 'notes' && (
            <Section title="Personal Notes">
              <Textarea value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)} className="min-h-[180px]" placeholder="Write your own notes…" />
              <Button className="mt-3" onClick={saveNotes}><Save size={15} /> Save Notes</Button>
            </Section>
          )}
          {tab === 'interview' && (
            <Section title="Interview Questions">
              <div className="space-y-2">
                {topic.interviewQuestions.map((q, i) => (
                  <div key={i} className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-indigo/15 text-xs font-bold text-brand-indigo">{i + 1}</span>
                    <p className="text-sm text-slate-300">{q}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}
          {tab === 'resources' && (
            <Section title="Resources">
              <div className="space-y-2">
                {topic.resources.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-sm text-brand-indigo hover:bg-white/[0.05]">
                    <Link2 size={15} /> {r.label}
                  </a>
                ))}
              </div>
            </Section>
          )}
          {tab === 'history' && (
            <Section title="Version History & Changelog">
              <div className="relative space-y-4 pl-6">
                <div className="absolute left-2 top-1 h-[calc(100%-1rem)] w-px bg-white/10" />
                {[...topic.history].reverse().map((h, i) => (
                  <div key={i} className="relative">
                    <span className="absolute -left-[18px] top-1 h-3 w-3 rounded-full border-2 border-brand-indigo bg-bg-base" />
                    <div className="flex items-center gap-2">
                      <Badge tone="indigo">v{h.version}</Badge>
                      <span className="text-sm text-slate-200">{h.change}</span>
                    </div>
                    <p className="text-xs text-slate-500">{formatDate(h.date, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </Card>
      </motion.div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">{title}</h3>
      {children}
    </div>
  )
}
