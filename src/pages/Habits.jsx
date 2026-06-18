import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, Flame, Sunrise, Briefcase, Moon, Check } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Field, Input, Select } from '@/components/ui/Input'
import { Heatmap } from '@/components/Heatmap'
import { toast } from '@/components/ui/Toast'
import { useStore } from '@/store/useStore'
import { useHabitSeries, computeStreak } from '@/hooks/useAnalytics'
import { todayKey } from '@/lib/utils'


const sections = [
  { key: 'Morning', icon: Sunrise, tone: 'amber' },
  { key: 'Work', icon: Briefcase, tone: 'indigo' },
  { key: 'Evening', icon: Moon, tone: 'purple' },
]

function habitStreak(h) {
  let s = 0
  for (let i = 0; i < 365; i++) {
    const k = todayKey(new Date(Date.now() - i * 86400000))
    if (h.completions[k]) s++
    else if (i === 0) continue
    else break
  }
  return s
}

export default function Habits() {
  const { habits, toggleHabit, addHabit, updateHabit, deleteHabit } = useStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const today = todayKey()
  const series = useHabitSeries(182)

  const heatmapData = useMemo(() => {
    const map = {}
    series.forEach((d) => (map[d.date] = d.value / 100))
    return map
  }, [series])

  const completedToday = habits.filter((h) => h.completions[today]).length
  const pct = habits.length ? Math.round((completedToday / habits.length) * 100) : 0

  const openAdd = () => { setEditing(null); setModalOpen(true) }
  const openEdit = (h) => { setEditing(h); setModalOpen(true) }

  const handleSubmit = (data) => {
    if (editing) {
      updateHabit(editing.id, data)
      toast.success('Habit updated')
    } else {
      addHabit(data)
      toast.success('Habit added')
    }
    setModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Daily Routine"
        subtitle={`${completedToday}/${habits.length} habits completed today · ${pct}%`}
        action={<Button onClick={openAdd}><Plus size={16} /> Add Habit</Button>}
      />

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center"><p className="text-2xl font-bold text-white">{pct}%</p><p className="text-xs text-slate-400">Today</p></Card>
        <Card className="text-center"><p className="flex items-center justify-center gap-1 text-2xl font-bold text-brand-amber"><Flame size={20} />{computeStreak(habits)}</p><p className="text-xs text-slate-400">Day streak</p></Card>
        <Card className="text-center"><p className="text-2xl font-bold text-white">{habits.length}</p><p className="text-xs text-slate-400">Total habits</p></Card>
      </div>

      {/* Sections */}
      <div className="grid gap-6 lg:grid-cols-3">
        {sections.map(({ key, icon: Icon, tone }) => {
          const list = habits.filter((h) => h.section === key)
          return (
            <Card key={key}>
              <div className="mb-4 flex items-center gap-2">
                <Icon size={18} className="text-slate-300" />
                <h3 className="font-semibold text-white">{key}</h3>
                <Badge tone={tone} className="ml-auto">{list.filter((h) => h.completions[today]).length}/{list.length}</Badge>
              </div>
              <div className="space-y-2">
                {list.map((h) => {
                  const done = !!h.completions[today]
                  return (
                    <motion.div
                      key={h.id}
                      layout
                      className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3"
                    >
                      <button
                        onClick={() => toggleHabit(h.id)}
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition ${done ? 'border-brand-green bg-brand-green text-white' : 'border-white/20 hover:border-brand-green'}`}
                      >
                        {done && <Check size={15} />}
                      </button>
                      <span className="text-lg">{h.icon}</span>
                      <span className={`flex-1 text-sm ${done ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{h.name}</span>
                      <span className="flex items-center gap-0.5 text-[11px] text-brand-amber"><Flame size={11} />{habitStreak(h)}</span>
                      <div className="flex opacity-0 transition group-hover:opacity-100">
                        <button onClick={() => openEdit(h)} className="grid h-7 w-7 place-items-center rounded-lg text-slate-400 hover:text-white"><Pencil size={13} /></button>
                        <button onClick={() => { deleteHabit(h.id); toast.info('Habit deleted') }} className="grid h-7 w-7 place-items-center rounded-lg text-slate-400 hover:text-red-400"><Trash2 size={13} /></button>
                      </div>
                    </motion.div>
                  )
                })}
                {list.length === 0 && <p className="py-4 text-center text-xs text-slate-600">No habits yet</p>}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Heatmap */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white">Consistency Heatmap</h3>
            <p className="text-xs text-slate-400">Last 6 months · GitHub-style activity</p>
          </div>
          <Badge tone="indigo">{series.filter((d) => d.value > 0).length} active days</Badge>
        </div>
        <Heatmap data={heatmapData} />
      </Card>

      <HabitModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} editing={editing} />
    </div>
  )
}

function HabitModal({
  open, onClose, onSubmit, editing,
}




) {
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('✅')
  const [section, setSection] = useState('Morning')
  const [color, setColor] = useState('#6366F1')

  // Sync form when opening for edit/add.
  useEffect(() => {
    if (open) {
      setName(editing?.name ?? '')
      setIcon(editing?.icon ?? '✅')
      setSection(editing?.section ?? 'Morning')
      setColor(editing?.color ?? '#6366F1')
    }
  }, [open, editing])

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editing ? 'Edit Habit' : 'New Habit'}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={() => name.trim() && onSubmit({ name, icon, section, color })}>{editing ? 'Save' : 'Add Habit'}</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Habit name">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Drink water" autoFocus />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Emoji / Icon">
            <Input value={icon} onChange={(e) => setIcon(e.target.value)} maxLength={2} />
          </Field>
          <Field label="Section">
            <Select value={section} onChange={(e) => setSection(e.target.value )}>
              <option>Morning</option><option>Work</option><option>Evening</option>
            </Select>
          </Field>
        </div>
        <Field label="Accent color">
          <div className="flex gap-2">
            {['#6366F1', '#8B5CF6', '#22C55E', '#F59E0B'].map((c) => (
              <button key={c} onClick={() => setColor(c)} className={`h-9 w-9 rounded-lg ring-2 ${color === c ? 'ring-white' : 'ring-transparent'}`} style={{ background: c }} />
            ))}
          </div>
        </Field>
      </div>
    </Modal>
  )
}
