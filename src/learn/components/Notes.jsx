import { useEffect, useState } from 'react'
import { StickyNote, Check } from 'lucide-react'
import { useCssProgress } from '@/store/useCssProgress'

/** Per-topic personal notes — autosaves to localStorage (debounced). */
export function Notes({ slug }) {
  const note = useCssProgress((s) => s.notes[slug] ?? '')
  const setNote = useCssProgress((s) => s.setNote)
  const [value, setValue] = useState(note)
  const [saved, setSaved] = useState(false)

  useEffect(() => setValue(note), [slug]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (value === note) return
    const id = setTimeout(() => {
      setNote(slug, value)
      setSaved(true)
      setTimeout(() => setSaved(false), 1200)
    }, 500)
    return () => clearTimeout(id)
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.05] p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-amber-200">
          <StickyNote size={16} className="text-amber-400" /> Mere Notes
        </div>
        {saved && <span className="flex items-center gap-1 text-xs text-green-400"><Check size={12} /> Saved</span>}
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Is topic ke apne notes yahan likho… (apne aap save ho jaayenge)"
        className="min-h-[100px] w-full resize-y rounded-xl border border-white/10 bg-[#0F172A]/60 p-3 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-amber-500/40"
      />
    </div>
  )
}
