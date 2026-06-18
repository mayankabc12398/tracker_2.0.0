import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plus, Trash2, Dumbbell, Briefcase, PiggyBank, Sprout, Trophy, CalendarClock, CheckCircle2,
} from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { Modal } from '@/components/ui/Modal'
import { Field, Input, Select } from '@/components/ui/Input'
import { EmptyState } from '@/components/ui/EmptyState'
import { toast } from '@/components/ui/Toast'
import { useStore } from '@/store/useStore'
import { formatDate } from '@/lib/utils'


const catMeta = {
  Fitness: { icon: Dumbbell, tone: 'green', bg: 'bg-brand-green/15', text: 'text-brand-green' },
  Career: { icon: Briefcase, tone: 'indigo', bg: 'bg-brand-indigo/15', text: 'text-brand-indigo' },
  Finance: { icon: PiggyBank, tone: 'amber', bg: 'bg-brand-amber/15', text: 'text-brand-amber' },
  'Personal Growth': { icon: Sprout, tone: 'purple', bg: 'bg-brand-purple/15', text: 'text-brand-purple' },
}
const categories = Object.keys(catMeta) 

export default function Goals() {
  const { goals, addGoal, deleteGoal, toggleMilestone } = useStore()
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(false)

  const filtered = filter === 'All' ? goals : goals.filter((g) => g.category === filter)
  const completed = goals.filter((g) => g.progress >= 100).length
  const avg = goals.length ? Math.round(goals.reduce((a, g) => a + g.progress, 0) / goals.length) : 0

  return (
    <div className="space-y-6">
      <PageHeader
        title="Goals & Targets"
        subtitle={`${goals.length} goals · ${avg}% average progress · ${completed} achieved`}
        action={<Button onClick={() => setOpen(true)}><Plus size={16} /> New Goal</Button>}
      />

      {/* Achievement strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((c) => {
          const list = goals.filter((g) => g.category === c)
          const a = list.length ? Math.round(list.reduce((s, g) => s + g.progress, 0) / list.length) : 0
          const { icon: Icon, bg, text } = catMeta[c]
          return (
            <Card key={c} className="flex items-center gap-3">
              <div className={`grid h-10 w-10 place-items-center rounded-xl ${bg}`}>
                <Icon size={18} className={text} />
              </div>
              <div>
                <p className="text-lg font-bold text-white">{a}%</p>
                <p className="text-[11px] text-slate-400">{c}</p>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {(['All', ...categories] ).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${filter === c ? 'border-brand-indigo/40 bg-brand-indigo/15 text-white' : 'border-white/10 text-slate-400 hover:text-white'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Goal cards */}
      {filtered.length === 0 ? (
        <EmptyState icon={<Trophy size={24} />} title="No goals here yet" description="Create your first goal to start tracking progress." action={<Button onClick={() => setOpen(true)}><Plus size={16} /> New Goal</Button>} />
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((g, i) => {
            const { icon: Icon, tone } = catMeta[g.category]
            const doneMs = g.milestones.filter((m) => m.done).length
            const overdue = new Date(g.deadline) < new Date() && g.progress < 100
            return (
              <motion.div key={g.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="group h-full">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <Icon size={18} className="text-slate-300" />
                      <div>
                        <h3 className="font-semibold text-white">{g.title}</h3>
                        <Badge tone={tone}>{g.category}</Badge>
                      </div>
                    </div>
                    {g.progress >= 100 && <Trophy size={18} className="text-brand-amber" />}
                    <button onClick={() => { deleteGoal(g.id); toast.info('Goal removed') }} className="ml-1 text-slate-500 opacity-0 transition hover:text-red-400 group-hover:opacity-100"><Trash2 size={15} /></button>
                  </div>

                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="text-slate-400">Progress</span>
                    <span className="font-bold text-white">{g.progress}%</span>
                  </div>
                  <Progress value={g.progress} className="mb-4" />

                  <div className="mb-4 space-y-1.5">
                    {g.milestones.map((m) => (
                      <button key={m.id} onClick={() => toggleMilestone(g.id, m.id)} className="flex w-full items-center gap-2 text-left text-sm">
                        <CheckCircle2 size={16} className={m.done ? 'text-brand-green' : 'text-slate-600'} />
                        <span className={m.done ? 'text-slate-500 line-through' : 'text-slate-300'}>{m.title}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-3 text-xs">
                    <span className="flex items-center gap-1.5 text-slate-400"><CheckCircle2 size={13} /> {doneMs}/{g.milestones.length} milestones</span>
                    <span className={`flex items-center gap-1.5 ${overdue ? 'text-red-400' : 'text-slate-400'}`}><CalendarClock size={13} /> {formatDate(g.deadline, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}

      <GoalModal open={open} onClose={() => setOpen(false)} onSubmit={(d) => { addGoal(d); toast.success('Goal created'); setOpen(false) }} />
    </div>
  )
}

function GoalModal({
  open, onClose, onSubmit,
}



) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Fitness')
  const [deadline, setDeadline] = useState('')
  const [milestones, setMilestones] = useState('')

  useEffect(() => {
    if (open) { setTitle(''); setCategory('Fitness'); setDeadline(''); setMilestones('') }
  }, [open])

  const submit = () => {
    if (!title.trim()) return
    const ms = milestones.split('\n').filter((l) => l.trim()).map((l) => ({ id: Math.random().toString(36).slice(2), title: l.trim(), done: false }))
    onSubmit({ title, category, progress: 0, deadline: deadline || new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10), milestones: ms })
  }

  return (
    <Modal open={open} onClose={onClose} title="New Goal" footer={<><Button variant="ghost" onClick={onClose}>Cancel</Button><Button onClick={submit}>Create Goal</Button></>}>
      <div className="space-y-4">
        <Field label="Goal title"><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Run a marathon" autoFocus /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Category"><Select value={category} onChange={(e) => setCategory(e.target.value )}>{categories.map((c) => <option key={c}>{c}</option>)}</Select></Field>
          <Field label="Deadline"><Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} /></Field>
        </div>
        <Field label="Milestones (one per line)" hint="Progress auto-calculates as you check them off">
          <textarea className="input-base min-h-[90px]" value={milestones} onChange={(e) => setMilestones(e.target.value)} placeholder={'Sign up for race\nFinish first 5K\nRace day'} />
        </Field>
      </div>
    </Modal>
  )
}
