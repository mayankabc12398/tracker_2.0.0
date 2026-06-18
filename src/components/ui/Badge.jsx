import { cn } from '@/lib/utils'


const tones = {
  indigo: 'bg-brand-indigo/15 text-indigo-300 border-brand-indigo/20',
  purple: 'bg-brand-purple/15 text-purple-300 border-brand-purple/20',
  green: 'bg-brand-green/15 text-green-300 border-brand-green/20',
  amber: 'bg-brand-amber/15 text-amber-300 border-brand-amber/20',
  red: 'bg-red-500/15 text-red-300 border-red-500/20',
  slate: 'bg-white/[0.06] text-slate-300 border-white/10',
}

export function Badge({
  children,
  tone = 'slate',
  className,
}



) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium',
        tones[tone] ?? tones.slate,
        className,
      )}
    >
      {children}
    </span>
  )
}
