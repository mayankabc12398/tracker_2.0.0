// ────────────────────────────────────────────────────────────────────────────
// SyncIndicator — chhota, non-intrusive cloud-sync status pill (bottom-left).
// Existing UI ko touch nahi karta — bas additive overlay. Idle me kuch nahi dikhta.
// ────────────────────────────────────────────────────────────────────────────
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Cloud, RefreshCw, CloudOff } from 'lucide-react'
import { useSyncStatus } from '@/store/useSyncStatus'

export function SyncIndicator() {
  const status = useSyncStatus((s) => s.status)
  const set = useSyncStatus((s) => s.set)

  // "saved" ko thodi der baad idle kar do (pill apne aap chhup jaaye).
  useEffect(() => {
    if (status !== 'saved') return
    const id = setTimeout(() => set('idle'), 1600)
    return () => clearTimeout(id)
  }, [status, set])

  const config = {
    syncing: { icon: RefreshCw, text: 'Syncing…', cls: 'text-brand-indigo', spin: true },
    saved: { icon: Cloud, text: 'Synced', cls: 'text-brand-green', spin: false },
    error: { icon: CloudOff, text: 'Offline — local saved', cls: 'text-amber-400', spin: false },
  }
  const c = config[status]

  return (
    <AnimatePresence>
      {c && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="glass pointer-events-none fixed bottom-6 left-6 z-[90] flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium"
        >
          <c.icon size={13} className={`${c.cls} ${c.spin ? 'animate-spin' : ''}`} />
          <span className="text-slate-300">{c.text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
