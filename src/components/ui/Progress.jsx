import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function Progress({
  value,
  className,
  barClassName,
}



) {
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-white/[0.08]', className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn('h-full rounded-full bg-brand-gradient', barClassName)}
      />
    </div>
  )
}

/** Circular progress ring used on the dashboard. */
export function RingProgress({
  value,
  size = 120,
  stroke = 10,
  label,
  sublabel,
}





) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (Math.min(100, value) / 100) * c
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="text-2xl font-bold text-white">{label ?? `${Math.round(value)}%`}</div>
        {sublabel && <div className="text-[11px] text-slate-400">{sublabel}</div>}
      </div>
    </div>
  )
}
