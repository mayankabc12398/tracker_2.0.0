import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Menu, Search, Moon, Sun, Check, LogOut } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { greeting } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { useAuth } from '@/context/AuthContext'
import { toast } from '@/components/ui/Toast'

export function Topbar({ onMenu }) {
  const { profile, settings, updateSettings, notifications, markAllRead, markNotificationRead } = useStore()
  const { username, logout } = useAuth()
  const [showNotifs, setShowNotifs] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const unread = notifications.filter((n) => !n.read).length
  const first = profile.name.split(' ')[0]

  const handleLogout = () => {
    setShowMenu(false)
    logout() // ProtectedRoute turant /login par bhej dega
    toast.info('Logged out')
  }

  const toggleTheme = () =>
    updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/5 bg-bg-base/60 px-4 py-3 backdrop-blur-xl sm:px-6">
      <button
        onClick={onMenu}
        className="grid h-10 w-10 place-items-center rounded-xl text-slate-300 hover:bg-white/5 lg:hidden"
      >
        <Menu size={20} />
      </button>

      <div className="hidden sm:block">
        <p className="text-sm font-semibold text-white">
          {greeting()}, {first} 👋
        </p>
        <p className="text-xs text-slate-500">Here's your day at a glance</p>
      </div>

      <div className="relative ml-auto hidden max-w-xs flex-1 md:block">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          placeholder="Search anything…"
          className="input-base pl-9"
        />
      </div>

      <button
        onClick={toggleTheme}
        className="grid h-10 w-10 place-items-center rounded-xl text-slate-300 transition hover:bg-white/5"
        aria-label="Toggle theme"
      >
        {settings.theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="relative">
        <button
          onClick={() => setShowNotifs((v) => !v)}
          className="relative grid h-10 w-10 place-items-center rounded-xl text-slate-300 transition hover:bg-white/5"
          aria-label="Notifications"
        >
          <Bell size={18} />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand-indigo px-1 text-[9px] font-bold text-white">
              {unread}
            </span>
          )}
        </button>

        <AnimatePresence>
          {showNotifs && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowNotifs(false)} />
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: 'transform, opacity' }}
                className="glass absolute right-0 top-12 z-20 w-80 transform-gpu p-3"
              >
                <div className="mb-2 flex items-center justify-between px-1">
                  <p className="text-sm font-semibold text-white">Notifications</p>
                  <button onClick={markAllRead} className="flex items-center gap-1 text-xs text-brand-indigo hover:underline">
                    <Check size={12} /> Mark all read
                  </button>
                </div>
                <div className="max-h-80 space-y-1 overflow-y-auto">
                  {notifications.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className="flex w-full gap-3 rounded-xl p-2.5 text-left transition hover:bg-white/5"
                    >
                      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? 'bg-slate-600' : 'bg-brand-indigo'}`} />
                      <span className="flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium text-slate-100">{n.title}</span>
                          <Badge tone="indigo">{n.type}</Badge>
                        </span>
                        <span className="block text-xs text-slate-400">{n.message}</span>
                        <span className="block text-[10px] text-slate-600">{n.time}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowMenu((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white outline-none ring-2 ring-transparent transition hover:ring-white/20"
          aria-label="Account menu"
        >
          {first.charAt(0)}
        </button>

        <AnimatePresence>
          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: 'transform, opacity' }}
                className="glass absolute right-0 top-12 z-20 w-52 transform-gpu p-3"
              >
                <div className="border-b border-white/5 px-1 pb-2.5">
                  <p className="text-sm font-semibold text-white">{profile.name}</p>
                  {username && <p className="text-xs text-slate-500">@{username}</p>}
                </div>
                <button
                  onClick={handleLogout}
                  className="mt-1 flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-sm text-slate-300 transition hover:bg-white/5"
                >
                  <LogOut size={15} /> Logout
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
