import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

import { Button } from './Button'

// Smooth, mobile-friendly easing (ease-out cubic) used across overlay UI.
const EASE = [0.22, 1, 0.36, 1]

export function Modal({ open, onClose, title, children, footer }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          {/* Overlay: only opacity animates (blur stays constant) → no per-frame
              re-rasterization of the backdrop on mobile. */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            onClick={onClose}
          />
          {/* Panel: translate + opacity only (no scale → blur isn't resampled at
              every step). transform-gpu + will-change promote it to its own GPU
              layer so the glass blur is composited smoothly. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.24, ease: EASE }}
            style={{ willChange: 'transform, opacity' }}
            className="glass relative z-10 w-full max-w-lg transform-gpu p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
                <X size={18} />
              </Button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto pr-1">{children}</div>
            {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
