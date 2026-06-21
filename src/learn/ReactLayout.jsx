import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ReactSidebarContent } from './ReactSidebar'

export function ReactLayout() {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-sky-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex max-w-[1400px]">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-white/5 bg-[#0F172A]/80 p-4 backdrop-blur-xl lg:flex">
          <ReactSidebarContent />
        </aside>

        <div className="fixed inset-x-0 top-0 z-40 flex items-center gap-3 border-b border-white/5 bg-[#0F172A]/90 px-4 py-3 backdrop-blur-xl lg:hidden">
          <button onClick={() => setOpen(true)} className="grid h-9 w-9 place-items-center rounded-xl text-slate-300 hover:bg-white/5"><Menu size={20} /></button>
          <span className="text-sm font-semibold text-white">React Course</span>
        </div>

        <AnimatePresence>
          {open && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
              <motion.aside initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} transition={{ type: 'spring', stiffness: 360, damping: 36 }} className="absolute left-0 top-0 h-full w-80 border-r border-white/10 bg-[#0F172A] p-4">
                <button onClick={() => setOpen(false)} className="absolute right-3 top-3 text-slate-400 hover:text-white"><X size={20} /></button>
                <ReactSidebarContent onNavigate={() => setOpen(false)} />
              </motion.aside>
            </div>
          )}
        </AnimatePresence>

        <main className="min-w-0 flex-1 px-5 pb-24 pt-20 sm:px-8 lg:pt-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
