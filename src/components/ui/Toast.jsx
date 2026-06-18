import { create } from 'zustand'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, XCircle, AlertTriangle } from 'lucide-react'
import { uid } from '@/lib/utils'














const useToastStore = create((set) => ({
  toasts: [],
  push: (kind, message) => {
    const id = uid('toast')
    set((s) => ({ toasts: [...s.toasts, { id, kind, message }] }))
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 3200)
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))

/** Imperative helper: `toast.success('Saved')`. */
export const toast = {
  success: (m) => useToastStore.getState().push('success', m),
  error: (m) => useToastStore.getState().push('error', m),
  info: (m) => useToastStore.getState().push('info', m),
  warning: (m) => useToastStore.getState().push('warning', m),
}

const config = {
  success: { icon: CheckCircle2, color: 'text-brand-green' },
  error: { icon: XCircle, color: 'text-red-400' },
  info: { icon: Info, color: 'text-brand-indigo' },
  warning: { icon: AlertTriangle, color: 'text-brand-amber' },
}

export function Toaster() {
  const { toasts, dismiss } = useToastStore()
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex w-80 flex-col gap-3">
      <AnimatePresence>
        {toasts.map((t) => {
          const { icon: Icon, color } = config[t.kind]
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              onClick={() => dismiss(t.id)}
              className="glass pointer-events-auto flex items-center gap-3 p-4 text-sm"
            >
              <Icon className={color} size={18} />
              <span className="text-slate-200">{t.message}</span>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
