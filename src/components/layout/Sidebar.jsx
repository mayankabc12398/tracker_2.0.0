import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X } from 'lucide-react'
import { navItems, footerNav } from '@/config/nav'
import { cn } from '@/lib/utils'

function NavList({ onNavigate, idPrefix }) {
  return (
    <>
      <div className="flex items-center gap-2.5 px-3 py-1">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient shadow-glow">
          <Sparkles size={18} className="text-white" />
        </div>
        <div>
          <p className="text-base font-bold tracking-tight text-white">LifeFlow</p>
          <p className="-mt-0.5 text-[11px] text-slate-500">Life Management</p>
        </div>
      </div>

      <nav className="mt-6 min-h-0 flex-1 space-y-1 overflow-y-auto pr-1 [scrollbar-width:thin]">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-600">Menu</p>
        {navItems.map((item) => (
          <SideLink key={item.to} {...item} onNavigate={onNavigate} idPrefix={idPrefix} />
        ))}
      </nav>

      <div className="space-y-1 border-t border-white/5 pt-3">
        {footerNav.map((item) => (
          <SideLink key={item.to} {...item} onNavigate={onNavigate} idPrefix={idPrefix} />
        ))}
      </div>
    </>
  )
}

function SideLink({ to, label, icon: Icon, onNavigate, idPrefix }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
          isActive ? 'text-white' : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200',
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.div
              // layoutId must be unique per sidebar instance, otherwise the
              // always-mounted desktop sidebar and the mobile drawer collide.
              layoutId={`${idPrefix}-sidebar-active`}
              className="absolute inset-0 rounded-xl bg-brand-gradient/15 ring-1 ring-brand-indigo/30"
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          )}
          <Icon size={18} />
          <span className="relative z-10">{label}</span>
        </>
      )}
    </NavLink>
  )
}

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 flex-col gap-1 border-r border-white/5 bg-white/[0.02] p-4 backdrop-blur-xl lg:flex">
      <NavList idPrefix="desktop" />
    </aside>
  )
}

export function MobileSidebar({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 360, damping: 36 }}
            className="glass absolute left-0 top-0 flex h-full w-72 flex-col gap-1 rounded-none rounded-r-3xl p-4"
          >
            <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-white">
              <X size={20} />
            </button>
            <NavList onNavigate={onClose} idPrefix="mobile" />
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
