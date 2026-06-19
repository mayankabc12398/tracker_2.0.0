import { CheckCircle2, AlertTriangle, Info, XCircle, Lightbulb, Sparkles } from 'lucide-react'
import { Inline } from '../lib/inline'

const variants = {
  success: { icon: CheckCircle2, ring: 'border-green-500/30 bg-green-500/[0.07]', text: 'text-green-300', iconColor: 'text-green-400' },
  warning: { icon: AlertTriangle, ring: 'border-amber-500/30 bg-amber-500/[0.07]', text: 'text-amber-300', iconColor: 'text-amber-400' },
  error: { icon: XCircle, ring: 'border-red-500/30 bg-red-500/[0.07]', text: 'text-red-300', iconColor: 'text-red-400' },
  info: { icon: Info, ring: 'border-indigo-500/30 bg-indigo-500/[0.07]', text: 'text-indigo-300', iconColor: 'text-indigo-400' },
  key: { icon: Sparkles, ring: 'border-purple-500/30 bg-purple-500/[0.07]', text: 'text-purple-300', iconColor: 'text-purple-400' },
  tip: { icon: Lightbulb, ring: 'border-cyan-500/30 bg-cyan-500/[0.07]', text: 'text-cyan-300', iconColor: 'text-cyan-400' },
}

export function Callout({ variant = 'info', title, children }) {
  const v = variants[variant] ?? variants.info
  const Icon = v.icon
  return (
    <div className={`flex gap-3 rounded-2xl border p-4 ${v.ring}`}>
      <Icon size={18} className={`mt-0.5 shrink-0 ${v.iconColor}`} />
      <div className="min-w-0">
        {title && <p className={`mb-1 text-sm font-semibold ${v.text}`}>{title}</p>}
        <div className="text-sm leading-relaxed text-slate-300">{children}</div>
      </div>
    </div>
  )
}

/** A list of good/bad items used by Best Practices & Common Mistakes. */
export function PracticeCard({ variant, title, items }) {
  const good = variant === 'success'
  const v = variants[variant]
  const Icon = v.icon
  return (
    <div className={`rounded-2xl border p-5 ${v.ring}`}>
      <div className="mb-3 flex items-center gap-2">
        <Icon size={18} className={v.iconColor} />
        <h4 className={`text-sm font-semibold ${v.text}`}>{title}</h4>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-slate-300">
            <span className={`mt-1 text-xs ${v.iconColor}`}>{good ? '✓' : '✕'}</span>
            <span className="min-w-0">
              {typeof item === 'string' ? (
                <Inline text={item} />
              ) : (
                <>
                  <span className="text-red-300/90 line-through decoration-red-500/40"><Inline text={item.bad} /></span>
                  {item.fix && (
                    <span className="mt-1 block text-green-300/90">
                      <span className="text-green-400">→ </span>
                      <Inline text={item.fix} />
                    </span>
                  )}
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
