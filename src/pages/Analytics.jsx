import { useMemo, useState } from 'react'
import {
  LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar,
} from 'recharts'
import { TrendingUp, Flame, Target, GraduationCap, Wallet } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Card, CardHeader } from '@/components/ui/Card'
import { useStore } from '@/store/useStore'
import { useHabitSeries } from '@/hooks/useAnalytics'
import { formatCurrency, } from '@/lib/utils'


const RANGES = ['Daily', 'Weekly', 'Monthly', 'Yearly']

export default function Analytics() {
  const [range, setRange] = useState('Weekly')
  const { goals, topics, transactions, settings } = useStore()
  const daySeries = useHabitSeries(365)

  // Productivity series adapts to selected range.
  const productivity = useMemo(() => {
    const map = { Daily: 14, Weekly: 12, Monthly: 12, Yearly: 12 }
    const points = map[range]
    if (range === 'Daily') {
      return daySeries.slice(-14).map((d) => ({ label: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }), value: d.value }))
    }
    if (range === 'Weekly') {
      return Array.from({ length: points }, (_, i) => {
        const slice = daySeries.slice(-(points - i) * 7, daySeries.length - (points - i - 1) * 7)
        const avg = slice.length ? Math.round(slice.reduce((a, x) => a + x.value, 0) / slice.length) : 0
        return { label: `W${i + 1}`, value: avg }
      })
    }
    // Monthly / Yearly: bucket by ~30 days
    return Array.from({ length: points }, (_, i) => {
      const slice = daySeries.slice(-(points - i) * 30, daySeries.length - (points - i - 1) * 30)
      const avg = slice.length ? Math.round(slice.reduce((a, x) => a + x.value, 0) / slice.length) : 0
      const d = new Date()
      d.setMonth(d.getMonth() - (points - 1 - i))
      return { label: d.toLocaleDateString('en-US', { month: 'short' }), value: avg }
    })
  }, [range, daySeries])

  // Streak trend (cumulative active days per week).
  const streakTrend = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const slice = daySeries.slice(-(12 - i) * 7, daySeries.length - (11 - i) * 7)
        return { label: `W${i + 1}`, days: slice.filter((d) => d.value > 0).length }
      }),
    [daySeries],
  )

  const goalRadar = goals.map((g) => ({ subject: g.category, value: g.progress }))
  const learningBars = topics.map((t) => ({ name: t.title, value: t.progress }))

  const expenseTrend = useMemo(() => {
    const out = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date(); d.setMonth(d.getMonth() - i)
      const key = d.toISOString().slice(0, 7)
      out.push({
        month: d.toLocaleDateString('en-US', { month: 'short' }),
        value: transactions.filter((t) => t.type === 'expense' && t.date.startsWith(key)).reduce((a, t) => a + t.amount, 0),
      })
    }
    return out
  }, [transactions])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        subtitle="Trends across productivity, streaks, goals, learning & spending"
        action={
          <div className="flex gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
            {RANGES.map((r) => (
              <button key={r} onClick={() => setRange(r)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${range === r ? 'bg-brand-gradient text-white' : 'text-slate-400 hover:text-white'}`}>{r}</button>
            ))}
          </div>
        }
      />

      <Card>
        <CardHeader title={`Productivity Trend · ${range}`} subtitle="Habit completion rate over time" icon={<TrendingUp size={18} />} />
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={productivity}>
            <defs>
              <linearGradient id="prodGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="label" axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v) => [`${v}%`, 'Productivity']} />
            <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={3} fill="url(#prodGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Streak Trend" subtitle="Active days per week" icon={<Flame size={18} />} />
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={streakTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="label" axisLine={false} tickLine={false} />
              <YAxis domain={[0, 7]} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => [`${v} days`, 'Active']} />
              <Line type="monotone" dataKey="days" stroke="#F59E0B" strokeWidth={3} dot={{ r: 3, fill: '#F59E0B' }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader title="Goal Completion" subtitle="Progress by category" icon={<Target size={18} />} />
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={goalRadar}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Radar dataKey="value" stroke="#6366F1" fill="#6366F1" fillOpacity={0.35} />
              <Tooltip formatter={(v) => [`${v}%`, 'Progress']} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader title="Learning Trend" subtitle="Mastery per topic" icon={<GraduationCap size={18} />} />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={learningBars} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis type="category" dataKey="name" width={80} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => [`${v}%`, 'Mastery']} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <Bar dataKey="value" fill="#22C55E" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader title="Expense Trend" subtitle="Monthly spending" icon={<Wallet size={18} />} />
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={expenseTrend}>
              <defs>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => [formatCurrency(v, settings.currency), 'Spent']} />
              <Area type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={3} fill="url(#expGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
