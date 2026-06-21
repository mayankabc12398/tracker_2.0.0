import { useMemo, useState } from 'react'
import { NavLink, Link, useParams } from 'react-router-dom'
import { Search, Check, Bookmark, ArrowLeft, Atom, ChevronDown } from 'lucide-react'
import { reactGroupedTopics, reactTopics, REACT_LEVELS } from '@/data/reactTopics'
import { useReactProgress } from '@/store/useReactProgress'

export function ReactSidebarContent({ onNavigate }) {
  useParams()
  const [query, setQuery] = useState('')
  const [collapsed, setCollapsed] = useState({})
  const completed = useReactProgress((s) => s.completed)
  const bookmarks = useReactProgress((s) => s.bookmarks)
  const doneCount = Object.keys(completed).length
  const overall = Math.round((doneCount / reactTopics.length) * 100)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return reactGroupedTopics
    return reactGroupedTopics
      .map((g) => ({ ...g, items: g.items.filter((t) => t.title.toLowerCase().includes(q) || t.hi.toLowerCase().includes(q)) }))
      .filter((g) => g.items.length > 0)
  }, [query])

  const toggle = (id) => setCollapsed((c) => ({ ...c, [id]: !c[id] }))

  return (
    <div className="flex h-full flex-col">
      <div className="px-2 pb-4">
        <Link to="/learning" onClick={onNavigate} className="mb-4 inline-flex items-center gap-1.5 text-xs text-slate-400 transition hover:text-white">
          <ArrowLeft size={13} /> Learning Hub
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-sky-500 text-[#0F172A] shadow-lg">
            <Atom size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-white">React Course</p>
            <p className="-mt-0.5 text-[11px] text-slate-500">Hindi + Hinglish</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-[11px] text-slate-400">
            <span>Progress</span>
            <span className="font-semibold text-cyan-300">{doneCount}/{reactTopics.length} · {overall}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
            <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 transition-all" style={{ width: `${overall}%` }} />
          </div>
        </div>

        <div className="relative mt-4">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Topic dhoondo…"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-500/50"
          />
        </div>
      </div>

      <nav className="-mr-2 flex-1 space-y-2 overflow-y-auto pr-2">
        {filtered.map((group) => {
          const isCollapsed = collapsed[group.id] && !query
          const groupDone = group.items.filter((t) => completed[t.slug]).length
          return (
            <div key={group.id}>
              <button onClick={() => toggle(group.id)} className="flex w-full items-center gap-2 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500 transition hover:text-slate-300">
                <span className="h-2 w-2 rounded-full" style={{ background: group.color }} />
                <span className="flex-1 text-left">{group.label}</span>
                <span className="text-slate-600">{groupDone}/{group.items.length}</span>
                <ChevronDown size={12} className={`transition-transform ${isCollapsed ? '-rotate-90' : ''}`} />
              </button>
              {!isCollapsed && (
                <div className="mt-0.5 space-y-0.5">
                  {group.items.map((t) => {
                    const lv = REACT_LEVELS[t.level]
                    return (
                      <NavLink
                        key={t.slug}
                        to={`/learn/react/${t.slug}`}
                        onClick={onNavigate}
                        className={({ isActive }) =>
                          `group flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition ${
                            isActive ? 'bg-white/[0.06] text-white ring-1 ring-white/10' : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'
                          }`
                        }
                      >
                        <span className="text-base leading-none">{t.icon}</span>
                        <span className="flex-1 truncate">{t.title}</span>
                        {bookmarks[t.slug] && <Bookmark size={12} className="fill-amber-400 text-amber-400" />}
                        {completed[t.slug] ? (
                          <span className="grid h-4 w-4 place-items-center rounded-full bg-green-500/20 text-green-400"><Check size={11} /></span>
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: lv.color }} title={lv.label} />
                        )}
                      </NavLink>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
        {filtered.length === 0 && <p className="px-2 text-xs text-slate-500">Koi topic nahi mila.</p>}
      </nav>
    </div>
  )
}
