import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BookOpen, GraduationCap, Lightbulb, Eye, Code2, Info, Table2, Target,
  AlertTriangle, Star, HelpCircle, ListChecks, Dumbbell, Rocket, Zap, Trophy,
  Link2, ChevronRight, Check, Bookmark, ArrowLeft, ArrowRight, Clock, MessageSquareQuote,
  Cpu, Brain, Globe, Wand2, ScrollText, ListOrdered,
} from 'lucide-react'
import { jsContent } from '@/data/jsContent'
import { jsTopics, jsTopicBySlug, jsGroupById, JS_LEVELS } from '@/data/jsTopics'
import { useJsProgress } from '@/store/useJsProgress'
import { Prose, Inline } from './lib/inline'
import { JsCodeBlock, ConsoleBlock } from './components/JsCodeBlock'
import { Callout, PracticeCard } from './components/Callout'
import { ComparisonTable } from './components/ComparisonTable'
import { Tabs } from './components/Tabs'
import { Quiz } from './components/Quiz'
import { QA } from './components/Reveal'
import { Diagram } from './components/Diagram'
import { OutputPreview } from './components/OutputPreview'
import { JsNotes } from './components/JsNotes'
import { ReadingProgress } from './components/ReadingProgress'

const LEVEL_TONE = { Beginner: 'text-green-300 bg-green-500/15', Intermediate: 'text-amber-300 bg-amber-500/15', Practical: 'text-indigo-300 bg-indigo-500/15', Advanced: 'text-red-300 bg-red-500/15' }

// Section config — colour-coded per the spec (🔵🟢🟡🔴🟣🟠).
function buildSections(c) {
  return [
    { id: 'overview', label: '🔵 Introduction', icon: BookOpen, color: '#3B82F6', has: !!c.overview },
    { id: 'why', label: '🟠 Why It Matters', icon: Target, color: '#F97316', has: !!c.why },
    { id: 'concept', label: '🔵 Detailed Explanation', icon: GraduationCap, color: '#6366F1', has: !!c.concept },
    { id: 'analogy', label: '🟠 Real-Life Analogy', icon: MessageSquareQuote, color: '#F97316', has: !!c.analogy },
    { id: 'syntax', label: '🟡 Syntax', icon: Code2, color: '#EAB308', has: !!c.syntax },
    { id: 'steps', label: '🔵 Step-by-Step Execution', icon: ListOrdered, color: '#06B6D4', has: !!c.steps },
    { id: 'internals', label: '🟣 Internal Working', icon: Cpu, color: '#A855F7', has: !!c.internals },
    { id: 'visual', label: '🟣 Visual Explanation', icon: Eye, color: '#A855F7', has: !!c.visual },
    { id: 'examples', label: '🟡 Code Examples', icon: Lightbulb, color: '#EAB308', has: !!c.examples },
    { id: 'output', label: '🟢 Output / Live Preview', icon: Eye, color: '#22C55E', has: !!c.output },
    { id: 'memory', label: '🟢 Memory Behavior', icon: Brain, color: '#22C55E', has: !!c.memory },
    { id: 'browser', label: '🔵 Browser Behavior', icon: Globe, color: '#06B6D4', has: !!c.browser },
    { id: 'notes', label: '🟢 Important Notes', icon: Info, color: '#22C55E', has: !!c.notes },
    { id: 'compare', label: '🔵 Comparison Table', icon: Table2, color: '#06B6D4', has: !!c.compare },
    { id: 'mistakes', label: '🔴 Common Mistakes', icon: AlertTriangle, color: '#EF4444', has: !!c.mistakes },
    { id: 'best', label: '🟢 Best Practices', icon: Star, color: '#22C55E', has: !!c.best },
    { id: 'tricky', label: '🔴 Tricky Scenarios', icon: Wand2, color: '#EF4444', has: !!c.tricky },
    { id: 'interview', label: '🟣 Interview Questions', icon: HelpCircle, color: '#A855F7', has: !!c.interview },
    { id: 'mcqs', label: '🟣 MCQs', icon: Trophy, color: '#A855F7', has: !!c.mcqs },
    { id: 'exercises', label: '🟡 Coding Exercises', icon: Dumbbell, color: '#EAB308', has: !!c.exercises },
    { id: 'summary', label: '🟢 Summary Notes', icon: ListChecks, color: '#22C55E', has: !!c.summary },
    { id: 'cheatsheet', label: '🟠 Cheat Sheet', icon: ScrollText, color: '#F97316', has: !!c.cheatsheet },
    { id: 'projects', label: '🟠 Real-World Use Cases', icon: Rocket, color: '#F97316', has: !!c.projects },
    { id: 'advanced', label: '🟠 Advanced Concepts', icon: Zap, color: '#F97316', has: !!c.advanced },
    { id: 'quiz', label: '🟣 Quiz', icon: Trophy, color: '#A855F7', has: !!c.quiz },
    { id: 'related', label: '🔵 Related Topics', icon: Link2, color: '#64748B', has: !!c.related },
  ].filter((s) => s.has)
}

function SectionShell({ section, children }) {
  const Icon = section.icon
  return (
    <motion.section id={section.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.4 }} className="scroll-mt-24">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: `${section.color}1a`, color: section.color }}><Icon size={18} /></span>
        <h2 className="text-xl font-bold text-white">{section.label}</h2>
      </div>
      {children}
    </motion.section>
  )
}

export default function JsTopicPage() {
  const { slug } = useParams()
  const meta = jsTopicBySlug[slug]
  const content = jsContent[slug]
  const { completed, bookmarks, toggleComplete, toggleBookmark } = useJsProgress()

  useEffect(() => { window.scrollTo({ top: 0 }) }, [slug])

  const sections = useMemo(() => (content ? buildSections(content) : []), [content])

  if (!meta || !content) {
    return (
      <div className="mx-auto max-w-2xl py-20 text-center">
        <p className="text-lg font-semibold text-white">Topic nahi mila 😅</p>
        <Link to="/learn/javascript" className="mt-3 inline-block text-amber-400 hover:underline">← JavaScript Course par wapas jao</Link>
      </div>
    )
  }

  const group = jsGroupById[meta.group]
  const lv = JS_LEVELS[meta.level]
  const idx = jsTopics.findIndex((t) => t.slug === slug)
  const prev = jsTopics[idx - 1]
  const next = jsTopics[idx + 1]
  const isDone = !!completed[slug]
  const isSaved = !!bookmarks[slug]

  return (
    <div className="mx-auto flex max-w-6xl gap-8">
      <ReadingProgress />

      <article className="min-w-0 flex-1 space-y-10">
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
          <Link to="/learning" className="hover:text-slate-300">Learning</Link>
          <ChevronRight size={12} />
          <Link to="/learn/javascript" className="hover:text-slate-300">JavaScript</Link>
          <ChevronRight size={12} />
          <span style={{ color: group.color }}>{group.label}</span>
          <ChevronRight size={12} />
          <span className="text-slate-300">{meta.title}</span>
        </nav>

        <header className="relative overflow-hidden rounded-3xl border border-white/10 p-7" style={{ background: `linear-gradient(135deg, ${group.color}22, transparent 70%)` }}>
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl" style={{ background: `${group.color}33` }} />
          <div className="relative">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium" style={{ color: group.color }}>{group.label}</span>
              <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium" style={{ background: lv.bg, color: lv.color }}>{lv.label}</span>
            </div>
            <h1 className="mt-3 flex items-center gap-3 text-3xl font-bold tracking-tight text-white"><span className="text-3xl">{meta.icon}</span> {meta.title}</h1>
            <p className="mt-1.5 text-slate-300">{meta.hi}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><Clock size={13} /> {meta.minutes} min read</span>
              <button onClick={() => toggleComplete(slug)} className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-medium transition ${isDone ? 'bg-green-500/20 text-green-300' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}>
                <Check size={13} /> {isDone ? 'Completed' : 'Mark complete'}
              </button>
              <button onClick={() => toggleBookmark(slug)} className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-medium transition ${isSaved ? 'bg-amber-500/20 text-amber-300' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}>
                <Bookmark size={13} className={isSaved ? 'fill-amber-400' : ''} /> {isSaved ? 'Saved' : 'Bookmark'}
              </button>
            </div>
          </div>
        </header>

        {sections.map((s) => (
          <SectionShell key={s.id} section={s}>{renderSection(s.id, content)}</SectionShell>
        ))}

        <JsNotes slug={slug} />

        <div className="grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-2">
          {prev ? (
            <Link to={`/learn/javascript/${prev.slug}`} className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-white/20 hover:bg-white/[0.04]">
              <ArrowLeft size={18} className="shrink-0 text-slate-500 transition group-hover:-translate-x-1 group-hover:text-white" />
              <span className="min-w-0"><span className="block text-[11px] text-slate-500">Pichla</span><span className="truncate text-sm font-medium text-white">{prev.icon} {prev.title}</span></span>
            </Link>
          ) : <span />}
          {next && (
            <Link to={`/learn/javascript/${next.slug}`} className="group flex items-center justify-end gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-right transition hover:border-white/20 hover:bg-white/[0.04]">
              <span className="min-w-0"><span className="block text-[11px] text-slate-500">Agla</span><span className="truncate text-sm font-medium text-white">{next.title} {next.icon}</span></span>
              <ArrowRight size={18} className="shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-white" />
            </Link>
          )}
        </div>
      </article>

      <aside className="hidden w-52 shrink-0 xl:block">
        <div className="sticky top-8">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Is page par</p>
          <nav className="space-y-1 border-l border-white/10">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="block border-l-2 border-transparent py-1 pl-3 text-xs text-slate-400 transition hover:border-amber-500 hover:text-white">
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
      return <div className="rounded-2xl border border-blue-500/25 bg-blue-500/[0.05] p-5"><Prose text={c.overview} className="text-[15px]" /></div>

    case 'why':
      return <Callout variant="key" title="Yeh topic important kyun hai? 🎯"><Inline text={c.why} /></Callout>

    case 'concept':
      return (
        <div className="space-y-3">
          {c.concept.map((t, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-white">
                <span className="grid h-5 w-5 place-items-center rounded-md bg-indigo-500/15 text-[11px] font-bold text-indigo-300">{i + 1}</span>
                <Inline text={t.h} />
              </h3>
              <p className="text-sm leading-relaxed text-slate-300"><Inline text={t.p} /></p>
              {t.code && <div className="mt-3"><JsCodeBlock code={t.code} lang={t.lang} /></div>}
            </div>
          ))}
        </div>
      )

    case 'analogy':
      return <Callout variant="tip" title="Real-life se samjho 🌍"><Inline text={c.analogy} /></Callout>

    case 'syntax':
      return <JsCodeBlock code={c.syntax.code} lang={c.syntax.lang} note={c.syntax.note} />

    case 'steps':
      return (
        <div className="relative space-y-3 pl-6">
          <div className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-cyan-500 to-indigo-500" />
          {c.steps.map((s, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[22px] top-0.5 grid h-4 w-4 place-items-center rounded-full bg-cyan-500/20 text-[10px] font-bold text-cyan-300">{i + 1}</span>
              <p className="text-sm leading-relaxed text-slate-300"><Inline text={s} /></p>
            </div>
          ))}
        </div>
      )

    case 'internals':
      return (
        <div className="rounded-2xl border border-purple-500/25 bg-purple-500/[0.05] p-5">
          {typeof c.internals === 'string'
            ? <Prose text={c.internals} className="text-sm" />
            : (
              <div className="space-y-3">
                <Prose text={c.internals.p} className="text-sm" />
                {c.internals.code && <JsCodeBlock code={c.internals.code} lang={c.internals.lang} />}
              </div>
            )}
        </div>
      )

    case 'visual':
      return <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"><Diagram data={c.visual} /></div>

    case 'examples':
      return (
        <div className="space-y-4">
          {c.examples.map((ex, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${LEVEL_TONE[ex.level] ?? 'bg-white/10 text-slate-300'}`}>{ex.level}</span>
                <h3 className="text-sm font-semibold text-white">{ex.title}</h3>
              </div>
              <JsCodeBlock code={ex.code} lang={ex.lang} />
              {ex.result != null && <div className="mt-3"><ConsoleBlock lines={ex.result} /></div>}
              {ex.explain && <p className="mt-3 text-sm leading-relaxed text-slate-400"><span className="text-amber-400">↳ </span><Inline text={ex.explain} /></p>}
              {ex.preview && <div className="mt-3"><OutputPreview html={ex.preview.html} css={ex.preview.css} js={ex.preview.js} height={ex.preview.height} /></div>}
            </div>
          ))}
        </div>
      )

    case 'output':
      return c.output.console != null
        ? <ConsoleBlock lines={c.output.console} />
        : <OutputPreview html={c.output.html} css={c.output.css} js={c.output.js} label={c.output.label} height={c.output.height} />

    case 'memory':
      return <Callout variant="success" title="Memory mein kya hota hai? 🧠"><Inline text={c.memory} /></Callout>

    case 'browser':
      return <Callout variant="tip" title="Browser mein kaise chalta hai? 🌐"><Inline text={c.browser} /></Callout>

    case 'notes': {
      const n = c.notes
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {n.concept && <Callout variant="info" title="🔵 Concept"><Inline text={n.concept} /></Callout>}
          {n.tip && <Callout variant="success" title="🟢 Tip"><Inline text={n.tip} /></Callout>}
          {n.warning && <Callout variant="warning" title="🟡 Warning"><Inline text={n.warning} /></Callout>}
          {n.error && <Callout variant="error" title="🔴 Common Error"><Inline text={n.error} /></Callout>}
        </div>
      )
    }

    case 'compare':
      return <ComparisonTable headers={c.compare.headers} rows={c.compare.rows} />

    case 'mistakes':
      return <PracticeCard variant="error" title="Common Mistakes — yeh mat karo ❌" items={c.mistakes} />

    case 'best':
      return <PracticeCard variant="success" title="Best Practices — yeh karo ✅" items={c.best} />

    case 'tricky':
      return (
        <div className="space-y-4">
          {c.tricky.map((t, i) => (
            <div key={i} className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-5">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-200"><Wand2 size={15} className="text-red-400" /> <Inline text={t.title} /></h3>
              {t.code && <JsCodeBlock code={t.code} lang={t.lang} />}
              {t.output != null && <div className="mt-3"><ConsoleBlock lines={t.output} /></div>}
              {t.explain && <p className="mt-3 text-sm leading-relaxed text-slate-300"><span className="text-amber-400">💡 </span><Inline text={t.explain} /></p>}
            </div>
          ))}
        </div>
      )

    case 'interview': {
      const tabs = []
      if (c.interview.beginner) tabs.push({ label: 'Beginner', badge: '🟢', content: <QAList items={c.interview.beginner} /> })
      if (c.interview.intermediate) tabs.push({ label: 'Intermediate', badge: '🟡', content: <QAList items={c.interview.intermediate} /> })
      if (c.interview.advanced) tabs.push({ label: 'Advanced', badge: '🔴', content: <QAList items={c.interview.advanced} /> })
      return <Tabs tabs={tabs} />
    }

    case 'mcqs':
      return <Quiz questions={c.mcqs} />

    case 'exercises': {
      const tabs = []
      if (c.exercises.easy) tabs.push({ label: 'Easy', badge: '🟢', content: <ExList items={c.exercises.easy} /> })
      if (c.exercises.medium) tabs.push({ label: 'Medium', badge: '🟡', content: <ExList items={c.exercises.medium} /> })
      if (c.exercises.advanced) tabs.push({ label: 'Advanced', badge: '🔴', content: <ExList items={c.exercises.advanced} /> })
      return <Tabs tabs={tabs} />
    }

    case 'summary':
      return (
        <div className="rounded-2xl border border-green-500/25 bg-green-500/[0.06] p-5">
          <ul className="space-y-2.5">
            {c.summary.map((s, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-slate-200"><Check size={16} className="mt-0.5 shrink-0 text-green-400" /><Inline text={s} /></li>
            ))}
          </ul>
        </div>
      )

    case 'cheatsheet':
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {c.cheatsheet.map((cs, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-orange-500/20 bg-orange-500/[0.03]">
              {cs.h && <div className="border-b border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-semibold text-orange-200">{cs.h}</div>}
              <pre className="overflow-x-auto p-3 text-[12px] leading-relaxed"><code className="font-mono text-slate-300 whitespace-pre">{cs.code}</code></pre>
            </div>
          ))}
        </div>
      )

    case 'projects':
      return (
        <div className="grid gap-2.5 sm:grid-cols-2">
          {c.projects.map((p, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-xl border border-orange-500/25 bg-orange-500/[0.06] px-4 py-3 text-sm text-slate-200">
              <Rocket size={15} className="shrink-0 text-orange-400" /><Inline text={p} />
            </div>
          ))}
        </div>
      )

    case 'advanced':
      return <Callout variant="key" title="Advanced Insight ⚡"><Inline text={c.advanced} /></Callout>

    case 'quiz':
      return <Quiz questions={c.quiz} />

    case 'related':
      return (
        <div className="flex flex-wrap gap-2">
          {c.related.map((s) => {
            const t = jsTopicBySlug[s]
            if (!t) return null
            return (
              <Link key={s} to={`/learn/javascript/${s}`} className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:text-white">
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
  return <div className="space-y-2.5">{items.map((qa, i) => <QA key={i} q={qa.q} a={qa.a} index={i + 1} />)}</div>
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
