import { Link } from 'react-router-dom'
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar, Cell,
} from 'recharts'
import { Flame, ListChecks, Target, GraduationCap, Wallet, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { StatCard } from '@/components/StatCard'
import { Card, CardHeader } from '@/components/ui/Card'
import { RingProgress, Progress } from '@/components/ui/Progress'
import { Badge } from '@/components/ui/Badge'
import { useDashboardStats } from '@/hooks/useAnalytics'
import { useStore } from '@/store/useStore'
import { formatCurrency, todayKey } from '@/lib/utils'

export default function Dashboard() {
  const stats = useDashboardStats()
  const { habits, goals, settings, toggleHabit } = useStore()
  const today = todayKey()
  const pending = habits.filter((h) => !h.completions[today]).slice(0, 5)

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" subtitle="Your complete life overview for today" />

      {/* Stat row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Today's Completion" value={`${stats.todayPct}%`} sub={`${stats.habitsCompleted}/${stats.habitsTotal} habits`} icon={ListChecks} accent="indigo" trend={{ value: 12, positive: true }} delay={0} />
        <StatCard label="Current Streak" value={`${stats.streak} days`} sub="Keep it alive! 🔥" icon={Flame} accent="amber" delay={0.05} />
        <StatCard label="Goals Active" value={stats.goalsTotal} sub={`${stats.goalsCompleted} completed`} icon={Target} accent="green" delay={0.1} />
        <StatCard label="Today's Spend" value={formatCurrency(stats.todaySpend, settings.currency)} sub="vs $45 avg" icon={Wallet} accent="purple" trend={{ value: 8, positive: false }} delay={0.15} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Productivity ring */}
        <Card className="flex flex-col items-center justify-center">
          <CardHeader title="Productivity Score" subtitle="Blended daily index" icon={<TrendingUp size={18} />} />
          <RingProgress value={stats.productivity} sublabel="of 100" />
          <div className="mt-4 grid w-full grid-cols-3 gap-2 text-center">
            <MiniStat label="Habits" value={`${stats.todayPct}%`} />
            <MiniStat label="Goals" value={`${Math.round(goals.reduce((a, g) => a + g.progress, 0) / (goals.length || 1))}%`} />
            <MiniStat label="Learning" value={`${stats.learningPct}%`} />
          </div>
        </Card>

        {/* Weekly trend */}
        <Card className="lg:col-span-2">
          <CardHeader title="Weekly Consistency" subtitle="Habit completion over the last 7 days" icon={<TrendingUp size={18} />} />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={stats.weekTrend}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis hide domain={[0, 100]} />
              <Tooltip cursor={{ stroke: '#6366F1', strokeWidth: 1 }} formatter={(v) => [`${v}%`, 'Completion']} />
              <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={3} fill="url(#areaGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming tasks / pending habits */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="Today's Tasks"
            subtitle={`${pending.length} habits remaining`}
            icon={<CheckCircle2 size={18} />}
            action={<Link to="/habits" className="flex items-center gap-1 text-xs text-brand-indigo hover:underline">View all <ArrowRight size={12} /></Link>}
          />
          <div className="space-y-2">
            {pending.length === 0 && <p className="py-6 text-center text-sm text-slate-500">All done for today! 🎉</p>}
            {pending.map((h) => (
              <div key={h.id} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <button
                  onClick={() => toggleHabit(h.id)}
                  className="grid h-6 w-6 place-items-center rounded-full border-2 border-white/20 transition hover:border-brand-green"
                />
                <span className="text-lg">{h.icon}</span>
                <span className="flex-1 text-sm text-slate-200">{h.name}</span>
                <Badge tone="slate">{h.section}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Goal progress */}
        <Card>
          <CardHeader title="Goal Progress" subtitle="Top active goals" icon={<Target size={18} />} action={<Link to="/goals" className="text-xs text-brand-indigo hover:underline">All</Link>} />
          <div className="space-y-4">
            {goals.slice(0, 4).map((g) => (
              <div key={g.id}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="truncate text-slate-200">{g.title}</span>
                  <span className="font-semibold text-slate-400">{g.progress}%</span>
                </div>
                <Progress value={g.progress} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Learning snapshot */}
      <LearningSnapshot pct={stats.learningPct} />
    </div>
  )
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-xl bg-white/[0.03] py-2">
      <p className="text-sm font-bold text-white">{value}</p>
      <p className="text-[10px] text-slate-500">{label}</p>
    </div>
  )
}

function LearningSnapshot({ pct }) {
  const { topics, subjects } = useStore()
  const data = subjects
    .map((s) => {
      const t = topics.filter((tp) => tp.subjectId === s.id)
      const avg = t.length ? Math.round(t.reduce((a, x) => a + x.progress, 0) / t.length) : 0
      return { name: s.name, value: avg, color: s.color }
    })
    .filter((d) => d.value > 0)

  return (
    <Card>
      <CardHeader
        title="Learning Progress"
        subtitle={`${pct}% average across subjects`}
        icon={<GraduationCap size={18} />}
        action={<Link to="/learning" className="flex items-center gap-1 text-xs text-brand-indigo hover:underline">Open <ArrowRight size={12} /></Link>}
      />
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis hide domain={[0, 100]} />
          <Tooltip cursor={{ fill: 'rgba(255,255,255,0.04)' }} formatter={(v) => [`${v}%`, 'Progress']} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
