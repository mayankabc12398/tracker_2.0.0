import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BookOpen, History, GraduationCap, Code2, Lightbulb, Eye, Star, AlertTriangle,
  Globe, HelpCircle, ListChecks, Sparkles, Dumbbell, Trophy, Link2, ChevronRight,
  Check, ArrowLeft, ArrowRight, Clock,
} from 'lucide-react'
import { htmlContent } from '@/data/htmlContent'
import { topics, topicBySlug, groupById } from '@/data/htmlTopics'
import { useLearnProgress } from '@/store/useLearnProgress'
import { Prose, Inline } from './lib/inline'
import { CodeBlock } from './components/CodeBlock'
import { Callout, PracticeCard } from './components/Callout'
import { Tabs } from './components/Tabs'
import { Quiz } from './components/Quiz'
import { QA } from './components/Reveal'
import { Diagram } from './components/Diagram'
import { ReadingProgress } from './components/ReadingProgress'

const LEVEL_TONE = { Beginner: 'text-green-300 bg-green-500/15', Intermediate: 'text-amber-300 bg-amber-500/15', Practical: 'text-indigo-300 bg-indigo-500/15', Advanced: 'text-red-300 bg-red-500/15' }

// Section metadata: order, label, icon, accent colour.
function buildSections(c) {
  return [
    { id: 'overview', label: 'Overview', icon: BookOpen, color: '#6366F1', has: !!c.overview },
    { id: 'history', label: 'History', icon: History, color: '#8B5CF6', has: !!c.history },
    { id: 'theory', label: 'Theory', icon: GraduationCap, color: '#06B6D4', has: !!c.theory },
    { id: 'syntax', label: 'Syntax', icon: Code2, color: '#22C55E', has: !!c.syntax },
    { id: 'examples', label: 'Real Examples', icon: Lightbulb, color: '#F59E0B', has: !!c.examples },
    { id: 'visual', label: 'Visual', icon: Eye, color: '#EC4899', has: !!c.visual },
    { id: 'best', label: 'Best Practices', icon: Star, color: '#22C55E', has: !!c.best },
    { id: 'mistakes', label: 'Common Mistakes', icon: AlertTriangle, color: '#EF4444', has: !!c.mistakes },
    { id: 'support', label: 'Browser Support', icon: Globe, color: '#06B6D4', has: !!c.support },
    { id: 'interview', label: 'Interview Q&A', icon: HelpCircle, color: '#8B5CF6', has: !!c.interview },
    { id: 'summary', label: 'Summary', icon: ListChecks, color: '#22C55E', has: !!c.summary },
    { id: 'keyPoints', label: 'Key Points', icon: Sparkles, color: '#A855F7', has: !!c.keyPoints },
    { id: 'exercises', label: 'Practice', icon: Dumbbell, color: '#F59E0B', has: !!c.exercises },
    { id: 'quiz', label: 'Quiz', icon: Trophy, color: '#6366F1', has: !!c.quiz },
    { id: 'related', label: 'Related Topics', icon: Link2, color: '#64748B', has: !!c.related },
  ].filter((s) => s.has)
}

function SectionShell({ section, children }) {
  const Icon = section.icon
  return (
    <motion.section
      id={section.id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className="scroll-mt-24"
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: `${section.color}1a`, color: section.color }}>
          <Icon size={18} />
        </span>
        <h2 className="text-xl font-bold text-white">{section.label}</h2>
      </div>
      {children}
    </motion.section>
  )
}

export default function TopicPage() {
  const { slug } = useParams()
  const meta = topicBySlug[slug]
  const content = htmlContent[slug]
  const { completed, toggleComplete } = useLearnProgress()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [slug])

  const sections = useMemo(() => (content ? buildSections(content) : []), [content])

  if (!meta || !content) {
    return (
      <div className="mx-auto max-w-2xl py-20 text-center">
        <p className="text-lg font-semibold text-white">Topic nahi mila 😅</p>
        <Link to="/learn/html" className="mt-3 inline-block text-indigo-400 hover:underline">← HTML Course par wapas jao</Link>
      </div>
    )
  }

  const group = groupById[meta.group]
  const idx = topics.findIndex((t) => t.slug === slug)
  const prev = topics[idx - 1]
  const next = topics[idx + 1]
  const isDone = !!completed[slug]

  return (
    <div className="mx-auto flex max-w-6xl gap-8">
      <ReadingProgress />

      {/* Main column */}
      <article className="min-w-0 flex-1 space-y-10">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
          <Link to="/learning" className="hover:text-slate-300">Learning</Link>
          <ChevronRight size={12} />
          <Link to="/learn/html" className="hover:text-slate-300">HTML</Link>
          <ChevronRight size={12} />
          <span style={{ color: group.color }}>{group.label}</span>
          <ChevronRight size={12} />
          <span className="text-slate-300">{meta.title}</span>
        </nav>

        {/* Gradient header */}
        <header className="relative overflow-hidden rounded-3xl border border-white/10 p-7" style={{ background: `linear-gradient(135deg, ${group.color}22, transparent 70%)` }}>
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl" style={{ background: `${group.color}33` }} />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium" style={{ color: group.color }}>
              {group.label}
            </span>
            <h1 className="mt-3 flex items-center gap-3 text-3xl font-bold tracking-tight text-white">
              <span className="text-3xl">{meta.icon}</span> {meta.title}
            </h1>
            <p className="mt-1.5 text-slate-300">{meta.hi}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><Clock size={13} /> {meta.minutes} min read</span>
              <button
                onClick={() => toggleComplete(slug)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-medium transition ${isDone ? 'bg-green-500/20 text-green-300' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
              >
                <Check size={13} /> {isDone ? 'Completed' : 'Mark complete'}
              </button>
            </div>
          </div>
        </header>

        {/* Sections */}
        {sections.map((s) => (
          <SectionShell key={s.id} section={s}>
            {renderSection(s.id, content)}
          </SectionShell>
        ))}

        {/* Prev / Next */}
        <div className="grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-2">
          {prev ? (
            <Link to={`/learn/html/${prev.slug}`} className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-white/20 hover:bg-white/[0.04]">
              <ArrowLeft size={18} className="shrink-0 text-slate-500 transition group-hover:-translate-x-1 group-hover:text-white" />
              <span className="min-w-0"><span className="block text-[11px] text-slate-500">Pichla</span><span className="truncate text-sm font-medium text-white">{prev.icon} {prev.title}</span></span>
            </Link>
          ) : <span />}
          {next && (
            <Link to={`/learn/html/${next.slug}`} className="group flex items-center justify-end gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-right transition hover:border-white/20 hover:bg-white/[0.04]">
              <span className="min-w-0"><span className="block text-[11px] text-slate-500">Agla</span><span className="truncate text-sm font-medium text-white">{next.title} {next.icon}</span></span>
              <ArrowRight size={18} className="shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-white" />
            </Link>
          )}
        </div>
      </article>

      {/* Table of contents (sticky, desktop) */}
      <aside className="hidden w-52 shrink-0 xl:block">
        <div className="sticky top-8">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Is page par</p>
          <nav className="space-y-1 border-l border-white/10">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="block border-l-2 border-transparent py-1 pl-3 text-xs text-slate-400 transition hover:border-indigo-500 hover:text-white">
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  )
}

// ───────────────────────── per-section renderers ─────────────────────────
function renderSection(id, c) {
  switch (id) {
    case 'overview':
      return <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"><Prose text={c.overview} className="text-[15px]" /></div>

    case 'history':
      return (
        <div className="grid gap-3 sm:grid-cols-3">
          {[['Kyun? (Why)', c.history.why, '#8B5CF6'], ['Kab? (When)', c.history.when, '#6366F1'], ['Importance', c.history.importance, '#22C55E']].map(([t, body, col]) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <p className="mb-1.5 text-xs font-semibold" style={{ color: col }}>{t}</p>
              <p className="text-sm leading-relaxed text-slate-300"><Inline text={body} /></p>
            </div>
          ))}
        </div>
      )

    case 'theory':
      return (
        <div className="space-y-3">
          {c.theory.map((t, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-white">
                <span className="grid h-5 w-5 place-items-center rounded-md bg-cyan-500/15 text-[11px] font-bold text-cyan-300">{i + 1}</span>
                <Inline text={t.h} />
              </h3>
              <p className="text-sm leading-relaxed text-slate-300"><Inline text={t.p} /></p>
              {t.code && <div className="mt-3"><CodeBlock code={t.code} /></div>}
            </div>
          ))}
        </div>
      )

    case 'syntax':
      return <CodeBlock code={c.syntax.code} note={c.syntax.note} />

    case 'examples':
      return (
        <div className="space-y-4">
          {c.examples.map((ex, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${LEVEL_TONE[ex.level] ?? 'bg-white/10 text-slate-300'}`}>{ex.level}</span>
                <h3 className="text-sm font-semibold text-white">{ex.title}</h3>
              </div>
              <CodeBlock code={ex.code} />
              {ex.explain && <p className="mt-3 text-sm leading-relaxed text-slate-400"><span className="text-indigo-400">↳ </span><Inline text={ex.explain} /></p>}
            </div>
          ))}
        </div>
      )

    case 'visual':
      return <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"><Diagram data={c.visual} /></div>

    case 'best':
      return <PracticeCard variant="success" title="Best Practices — yeh karo ✅" items={c.best} />

    case 'mistakes':
      return <PracticeCard variant="error" title="Common Mistakes — yeh mat karo ❌" items={c.mistakes} />

    case 'support':
      return <Callout variant="tip" title="Browser Support"><Inline text={c.support} /></Callout>

    case 'interview': {
      const tabs = []
      if (c.interview.beginner) tabs.push({ label: 'Beginner', badge: '🟢', content: <QAList items={c.interview.beginner} /> })
      if (c.interview.intermediate) tabs.push({ label: 'Intermediate', badge: '🟡', content: <QAList items={c.interview.intermediate} /> })
      if (c.interview.advanced) tabs.push({ label: 'Advanced', badge: '🔴', content: <QAList items={c.interview.advanced} /> })
      return <Tabs tabs={tabs} />
    }

    case 'summary':
      return (
        <div className="rounded-2xl border border-green-500/25 bg-green-500/[0.06] p-5">
          <ul className="space-y-2.5">
            {c.summary.map((s, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-slate-200">
                <Check size={16} className="mt-0.5 shrink-0 text-green-400" />
                <Inline text={s} />
              </li>
            ))}
          </ul>
        </div>
      )

    case 'keyPoints':
      return (
        <div className="grid gap-2.5 sm:grid-cols-2">
          {c.keyPoints.map((p, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-xl border border-purple-500/25 bg-purple-500/[0.06] px-4 py-3 text-sm text-slate-200">
              <Sparkles size={15} className="shrink-0 text-purple-400" />
              <Inline text={p} />
            </div>
          ))}
        </div>
      )

    case 'exercises': {
      const tabs = []
      if (c.exercises.easy) tabs.push({ label: 'Easy', badge: '🟢', content: <ExList items={c.exercises.easy} /> })
      if (c.exercises.medium) tabs.push({ label: 'Medium', badge: '🟡', content: <ExList items={c.exercises.medium} /> })
      if (c.exercises.challenge) tabs.push({ label: 'Challenge', badge: '🔴', content: <ExList items={c.exercises.challenge} /> })
      return <Tabs tabs={tabs} />
    }

    case 'quiz':
      return <Quiz questions={c.quiz} />

    case 'related':
      return (
        <div className="flex flex-wrap gap-2">
          {c.related.map((s) => {
            const t = topicBySlug[s]
            if (!t) return null
            return (
              <Link key={s} to={`/learn/html/${s}`} className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:text-white">
                <span>{t.icon}</span> {t.title}
              </Link>
            )
          })}
        </div>
      )

    default:
      return null
  }
}

function QAList({ items }) {
  return (
    <div className="space-y-2.5">
      {items.map((qa, i) => <QA key={i} q={qa.q} a={qa.a} index={i + 1} />)}
    </div>
  )
}

function ExList({ items }) {
  return (
    <div className="space-y-2.5">
      {items.map((ex, i) => (
        <div key={i} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-amber-500/15 text-xs font-bold text-amber-300">{i + 1}</span>
          <p className="text-sm leading-relaxed text-slate-300"><Inline text={ex} /></p>
        </div>
      ))}
    </div>
  )
}
