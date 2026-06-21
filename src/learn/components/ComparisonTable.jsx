import { Inline } from '../lib/inline'

/** Renders a comparison/difference table from { headers: [], rows: [[]] }. */
export function ComparisonTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-white/[0.04]">
            {headers.map((h, i) => (
              <th key={i} className="border-b border-white/10 px-4 py-3 text-left font-semibold text-white">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="transition hover:bg-white/[0.02]">
              {row.map((cell, ci) => (
                <td key={ci} className={`border-b border-white/5 px-4 py-3 align-top ${ci === 0 ? 'font-medium text-slate-200' : 'text-slate-400'}`}>
                  <Inline text={String(cell)} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
