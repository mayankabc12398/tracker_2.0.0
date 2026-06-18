import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

const accents = {
  indigo: 'from-brand-indigo/20 text-brand-indigo',
  purple: 'from-brand-purple/20 text-brand-purple',
  green: 'from-brand-green/20 text-brand-green',
  amber: 'from-brand-amber/20 text-brand-amber',
}

export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent = 'indigo',
  trend,
  delay = 0,
}







) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="glass glass-hover relative overflow-hidden p-5"
    >
      <div className={cn('absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br to-transparent blur-2xl', accents[accent])} />
      <div className="relative flex items-start justify-between">
        <div className={cn('grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br to-transparent', accents[accent])}>
          <Icon size={20} />
        </div>
        {trend && (
          <span className={cn('text-xs font-semibold', trend.positive ? 'text-brand-green' : 'text-red-400')}>
            {trend.positive ? '▲' : '▼'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <p className="relative mt-4 text-2xl font-bold text-white">{value}</p>
      <p className="relative text-sm font-medium text-slate-300">{label}</p>
      {sub && <p className="relative mt-0.5 text-xs text-slate-500">{sub}</p>}
    </motion.div>
  )
}
