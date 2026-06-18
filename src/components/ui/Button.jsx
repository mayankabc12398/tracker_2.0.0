import { forwardRef, } from 'react'
import { cn } from '@/lib/utils'









const variants = {
  primary:
    'bg-brand-gradient text-white shadow-lg shadow-brand-indigo/25 hover:brightness-110 active:scale-[0.98]',
  secondary: 'bg-white/[0.06] text-slate-100 border border-white/10 hover:bg-white/[0.1]',
  outline: 'border border-white/15 text-slate-200 hover:bg-white/[0.05]',
  ghost: 'text-slate-300 hover:bg-white/[0.06] hover:text-white',
  danger: 'bg-red-500/90 text-white hover:bg-red-500 active:scale-[0.98]',
}

const sizes = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
  icon: 'h-9 w-9',
}

export const Button = forwardRef(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex select-none items-center justify-center rounded-xl font-medium outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-indigo/40 disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
)
Button.displayName = 'Button'
