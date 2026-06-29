import { Children, isValidElement, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Pull { value, label } out of <option> children so this stays a drop-in
 *  replacement for the old native <Select>. value falls back to the label. */
function parseOptions(children) {
  const opts = []
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return
    const label = child.props.children
    const value = child.props.value !== undefined ? child.props.value : label
    opts.push({ value, label, disabled: child.props.disabled })
  })
  return opts
}

/**
 * A themed dropdown that mirrors the native <select> API: pass `value`,
 * `onChange` (called with a synthetic `{ target: { value } }` event so existing
 * handlers keep working), and <option> children. Renders an attractive,
 * glass-styled popup via a portal so it never gets clipped by a modal's scroll.
 */
export function Select({ value, onChange, children, className, placeholder = 'Select…', disabled }) {
  const options = parseOptions(children)
  const selected = options.find((o) => String(o.value) === String(value))

  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const [rect, setRect] = useState(null)
  const triggerRef = useRef(null)
  const panelRef = useRef(null)
  // Unique per instance so the sliding highlight of one open dropdown never
  // animates toward another's.
  const highlightId = useId()

  const measure = () => {
    if (triggerRef.current) setRect(triggerRef.current.getBoundingClientRect())
  }

  const openMenu = () => {
    if (disabled) return
    measure()
    setActiveIdx(options.findIndex((o) => String(o.value) === String(value)))
    setOpen(true)
  }
  const close = () => setOpen(false)

  const pick = (val) => {
    onChange?.({ target: { value: val } })
    close()
    triggerRef.current?.focus()
  }

  // While open: close on any outside pointer-down OR when focus moves elsewhere
  // (e.g. into the textarea below); reposition on scroll/resize.
  useEffect(() => {
    if (!open) return
    const isOutside = (el) =>
      !panelRef.current?.contains(el) && !triggerRef.current?.contains(el)
    const onDocPointer = (e) => {
      if (isOutside(e.target)) close()
    }
    const onFocusIn = (e) => {
      if (isOutside(e.target)) close()
    }
    document.addEventListener('pointerdown', onDocPointer)
    document.addEventListener('focusin', onFocusIn)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, true)
    return () => {
      document.removeEventListener('pointerdown', onDocPointer)
      document.removeEventListener('focusin', onFocusIn)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure, true)
    }
  }, [open])

  const onKeyDown = (e) => {
    if (disabled) return
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        openMenu()
      }
      return
    }
    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        close()
        triggerRef.current?.focus()
        break
      case 'ArrowDown':
        e.preventDefault()
        setActiveIdx((i) => Math.min(options.length - 1, i + 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIdx((i) => Math.max(0, i - 1))
        break
      case 'Enter':
        e.preventDefault()
        if (activeIdx >= 0 && !options[activeIdx]?.disabled) pick(options[activeIdx].value)
        break
      default:
        break
    }
  }

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        ref={triggerRef}
        disabled={disabled}
        // stopPropagation: the Field wraps this in a <label>, which would
        // otherwise re-dispatch the click to this button and re-toggle the menu.
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          open ? close() : openMenu()
        }}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          'input-base flex w-full items-center justify-between gap-2 text-left',
          open && 'border-brand-indigo/60 ring-2 ring-brand-indigo/20',
        )}
      >
        <span className={cn('truncate', !selected && 'text-slate-500')}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={cn('shrink-0 text-slate-400 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {createPortal(
        <AnimatePresence>
          {open && rect && (
            <motion.ul
              ref={panelRef}
              role="listbox"
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 460, damping: 34 }}
              style={{
                position: 'fixed',
                top: rect.bottom + 8,
                left: rect.left,
                width: rect.width,
                transformOrigin: 'top center',
                zIndex: 200,
              }}
              className="glass max-h-60 overflow-y-auto p-1.5 [scrollbar-width:thin]"
            >
              {options.map((o, i) => {
                const isSelected = String(o.value) === String(value)
                const isActive = i === activeIdx
                return (
                  <motion.li
                    key={String(o.value)}
                    role="option"
                    aria-selected={isSelected}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: Math.min(i, 8) * 0.025, duration: 0.18 }}
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => !o.disabled && pick(o.value)}
                    className={cn(
                      'relative flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm',
                      o.disabled && 'pointer-events-none opacity-40',
                    )}
                  >
                    {/* Sliding highlight: one shared element that glides from the
                        previously active row to the new one as you hover/arrow. */}
                    {isActive && (
                      <motion.div
                        layoutId={highlightId}
                        className="absolute inset-0 rounded-xl bg-brand-gradient/15 ring-1 ring-brand-indigo/30"
                        transition={{ type: 'spring', stiffness: 520, damping: 38 }}
                      />
                    )}
                    {/* Accent bar on the selected row for a creative touch. */}
                    {isSelected && (
                      <span className="absolute left-1 top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-brand-gradient" />
                    )}
                    <span
                      className={cn(
                        'relative z-10 truncate transition-colors',
                        isSelected
                          ? 'font-semibold text-brand-indigo'
                          : isActive
                            ? 'text-white'
                            : 'text-slate-300',
                      )}
                    >
                      {o.label}
                    </span>
                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 600, damping: 24 }}
                        className="relative z-10 shrink-0 text-brand-indigo"
                      >
                        <Check size={15} />
                      </motion.span>
                    )}
                  </motion.li>
                )
              })}
            </motion.ul>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}
Select.displayName = 'Select'
