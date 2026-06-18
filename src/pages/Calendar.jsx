import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Heatmap } from '@/components/Heatmap'
import { useStore } from '@/store/useStore'
import { useHabitSeries, computeStreak } from '@/hooks/useAnalytics'
import { todayKey } from '@/lib/utils'

export default function Calendar() {
  const { habits } = useStore()
  const series = useHabitSeries(365)
  const [cursor, setCursor] = useState(() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() } })

  const heatmapData = useMemo(() => {
    const map = {}
    series.forEach((d) => (map[d.date] = d.value / 100))
    return map
  }, [series])

  // Build the month grid.
  const monthGrid = useMemo(() => {
    const first = new Date(cursor.y, cursor.m, 1)
    const startDay = first.getDay()
    const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate()
    const cells = []
    for (let i = 0; i < startDay; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) {
      const key = todayKey(new Date(cursor.y, cursor.m, d))
      cells.push({ date: key, value: heatmapData[key] ?? 0 })
    }
    return cells
  }, [cursor, heatmapData])

  const monthName = new Date(cursor.y, cursor.m).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const move = (n) => setCursor((c) => { const d = new Date(c.y, c.m + n); return { y: d.getFullYear(), m: d.getMonth() } })

  const activeThisMonth = monthGrid.filter((c) => c && c.value > 0).length
  const weeklyConsistency = Math.round((series.slice(-7).filter((d) => d.value > 0).length / 7) * 100)
  const monthlyConsistency = Math.round((series.slice(-30).filter((d) => d.value > 0).length / 30) * 100)

  const cellColor = (v) => {
    if (v === 0) return 'bg-white/[0.03] text-slate-600'
    if (v < 0.4) return 'bg-brand-indigo/25 text-slate-200'
    if (v < 0.7) return 'bg-brand-indigo/50 text-white'
    return 'bg-brand-gradient text-white'
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Calendar" subtitle="Daily activity & consistency tracking" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="text-center"><p className="flex items-center justify-center gap-1 text-2xl font-bold text-brand-amber"><Flame size={20} />{computeStreak(habits)}</p><p className="text-xs text-slate-400">Current streak</p></Card>
        <Card className="text-center"><p className="text-2xl font-bold text-white">{weeklyConsistency}%</p><p className="text-xs text-slate-400">Weekly consistency</p></Card>
        <Card className="text-center"><p className="text-2xl font-bold text-white">{monthlyConsistency}%</p><p className="text-xs text-slate-400">Monthly consistency</p></Card>
        <Card className="text-center"><p className="text-2xl font-bold text-white">{activeThisMonth}</p><p className="text-xs text-slate-400">Active days this month</p></Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-white">{monthName}</h3>
            <div className="flex gap-1">
              <button onClick={() => move(-1)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-white/5"><ChevronLeft size={16} /></button>
              <button onClick={() => move(1)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-white/5"><ChevronRight size={16} /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] text-slate-500">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <span key={i}>{d}</span>)}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1.5">
            {monthGrid.map((cell, i) => (
              <div key={i} className="aspect-square">
                {cell && (
                  <div className={`grid h-full w-full place-items-center rounded-lg text-xs font-medium ${cellColor(cell.value)} ${cell.date === todayKey() ? 'ring-2 ring-white/70' : ''}`} title={`${cell.date}: ${Math.round(cell.value * 100)}%`}>
                    {new Date(cell.date).getDate()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader title="Year in Review" subtitle="GitHub-style activity heatmap" action={<Badge tone="indigo">{series.filter((d) => d.value > 0).length} active days</Badge>} />
          <Heatmap data={heatmapData} weeks={52} />
        </Card>
      </div>
    </div>
  )
}
