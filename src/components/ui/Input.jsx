import { forwardRef, } from 'react'
import { cn } from '@/lib/utils'

export function Field({ label, children, hint }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-slate-400">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-slate-500">{hint}</span>}
    </label>
  )
}

export const Input = forwardRef(
  ({ className, ...props }, ref) => <input ref={ref} className={cn('input-base', className)} {...props} />,
)
Input.displayName = 'Input'

export const Textarea = forwardRef(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn('input-base min-h-[90px] resize-y', className)} {...props} />
  ),
)
Textarea.displayName = 'Textarea'

// Re-exported so existing `import { Select } from '@/components/ui/Input'`
// call sites keep working with the new themed dropdown.
export { Select } from './Select'
