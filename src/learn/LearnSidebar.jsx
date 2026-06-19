import { useMemo, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Search, Check, ArrowLeft, Code2 } from 'lucide-react'
import { groupedTopics, topics } from '@/data/htmlTopics'
import { useLearnProgress } from '@/store/useLearnProgress'

export function LearnSidebarContent({ onNavigate }) {
  const [query, setQuery] = useState('')
  const completed = useLearnProgress((s) => s.completed)
  const doneCount = Object.keys(completed).length
  const overall = Math.round((doneCount / topics.length) * 100)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return groupedTopics
    return groupedTopics
      .map((g) => ({ ...g, items: g.items.filter((t) => t.title.toLowerCase().includes(q) || t.hi.toLowerCase().includes(q)) }))
      .filter((g) => g.items.length > 0)
  }, [query])

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="px-2 pb-4">
        <Link to="/learning" onClick={onNavigate} className="mb-4 inline-flex items-center gap-1.5 text-xs text-slate-400 transition hover:text-white">
          <ArrowLeft size={13} /> Learning Hub
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg">
            <Code2 size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-white">HTML Course</p>
            <p className="-mt-0.5 text-[11px] text-slate-500">Hindi + Hinglish</p>
          </div>
        </div>

        {/* Overall progress */}
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-[11px] text-slate-400">
            <span>Progress</span>
            <span className="font-semibold text-indigo-300">{doneCount}/{topics.length} · {overall}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all" style={{ width: `${overall}%` }} />
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-4">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Topic dhoondo…"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-indigo-500/50"
          />
        </div>
      </div>

      {/* Topic list (scrollable) */}
      <nav className="-mr-2 flex-1 space-y-4 overflow-y-auto pr-2">
        {filtered.map((group) => (
          <div key={group.id}>
            <p className="mb-1.5 flex items-center gap-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              <span className="h-2 w-2 rounded-full" style={{ background: group.color }} />
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((t) => (
                <NavLink
                  key={t.slug}
                  to={`/learn/html/${t.slug}`}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition ${
                      isActive ? 'bg-white/[0.06] text-white ring-1 ring-white/10' : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'
                    }`
                  }
                >
                  <span className="text-base leading-none">{t.icon}</span>
                  <span className="flex-1 truncate">{t.title}</span>
                  {completed[t.slug] && (
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-green-500/20 text-green-400">
                      <Check size={11} />
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="px-2 text-xs text-slate-500">Koi topic nahi mila.</p>}
      </nav>
    </div>
  )
}
