import { useMemo } from 'react'
import { todayKey } from '@/lib/utils'

/**
 * GitHub-style contribution heatmap.
 * `data` maps YYYY-MM-DD -> intensity 0..1.
 */
export function Heatmap({ data, weeks = 26 }) {
  const grid = useMemo(() => {
    const today = new Date()
    // Snap to the most recent Sunday so columns align to weeks.
    const end = new Date(today)
    end.setDate(end.getDate() - end.getDay() + 6)
    const cols = []
    for (let w = weeks - 1; w >= 0; w--) {
      const col = []
      for (let d = 0; d < 7; d++) {
        const date = new Date(end)
        date.setDate(end.getDate() - w * 7 - (6 - d))
        const key = todayKey(date)
        col.push({ date: key, v: date > today ? -1 : data[key] ?? 0 })
      }
      cols.push(col)
    }
    return cols
  }, [data, weeks])

  const color = (v) => {
    if (v < 0) return 'transparent'
    if (v === 0) return 'rgba(255,255,255,0.05)'
    if (v < 0.3) return 'rgba(99,102,241,0.3)'
    if (v < 0.6) return 'rgba(99,102,241,0.55)'
    if (v < 0.85) return 'rgba(99,102,241,0.8)'
    return '#8B5CF6'
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex flex-col gap-1.5">
        <div className="flex gap-[3px] pl-7 text-[10px] text-slate-500">
          {grid.map((col, i) => {
            const first = new Date(col[0].date)
            const showMonth = first.getDate() <= 7
            return (
              <span key={i} className="w-[13px]">
                {showMonth ? months[first.getMonth()] : ''}
              </span>
            )
          })}
        </div>
        <div className="flex gap-[3px]">
          <div className="mr-1 flex flex-col justify-between py-[2px] text-[9px] text-slate-600">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>
          {grid.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-[3px]">
              {col.map((cell, ri) => (
                <div
                  key={ri}
                  title={cell.v >= 0 ? `${cell.date}: ${Math.round(cell.v * 100)}%` : ''}
                  className="h-[13px] w-[13px] rounded-[3px] transition-transform hover:scale-125"
                  style={{ background: color(cell.v) }}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-1.5 pt-1 text-[10px] text-slate-500">
          Less
          {[0, 0.3, 0.6, 0.85, 1].map((v) => (
            <span key={v} className="h-[11px] w-[11px] rounded-[3px]" style={{ background: color(v) }} />
          ))}
          More
        </div>
      </div>
    </div>
  )
}
