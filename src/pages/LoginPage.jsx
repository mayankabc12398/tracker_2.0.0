import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, LogIn, User, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Field, Input } from '@/components/ui/Input'
import { toast } from '@/components/ui/Toast'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const { isAuthed, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [showPw, setShowPw] = useState(false)
  const [busy, setBusy] = useState(false)

  // Pehle se logged in → seedha app par.
  if (isAuthed) return <Navigate to={from} replace />

  const validate = () => {
    const e = {}
    if (!username.trim()) e.username = 'Username zaroori hai'
    if (!password) e.password = 'Password zaroori hai'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setBusy(true)
    try {
      login({ username, password })
      toast.success(`Welcome back, ${username.trim()}! 👋`)
      navigate(from, { replace: true })
    } catch (err) {
      if (err.code === 'INVALID_CREDENTIALS') {
        setErrors({ form: 'Galat username ya password. Dobara try karo.' })
        toast.error('Invalid credentials')
      } else {
        toast.error('Login fail hua — dobara try karo')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-bg-base px-4">
      {/* Ambient glow — baaki app jaisा */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-indigo/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-brand-purple/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass relative w-full max-w-md p-8"
      >
        {/* Brand */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient shadow-glow">
            <Sparkles size={22} className="text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">LifeFlow me login karo</h1>
          <p className="mt-1 text-sm text-slate-500">Apna account access karne ke liye sign in karo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Field label="Username">
            <div className="relative">
              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <Input
                value={username}
                onChange={(e) => { setUsername(e.target.value); if (errors.username || errors.form) setErrors((x) => ({ ...x, username: undefined, form: undefined })) }}
                placeholder="mayank"
                autoFocus
                autoComplete="username"
                className={`pl-9 ${errors.username ? 'border-red-500/50' : ''}`}
              />
            </div>
            {errors.username && <span className="mt-1 block text-[11px] text-red-400">{errors.username}</span>}
          </Field>

          <Field label="Password">
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <Input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (errors.password || errors.form) setErrors((x) => ({ ...x, password: undefined, form: undefined })) }}
                placeholder="••••••"
                autoComplete="current-password"
                className={`pl-9 pr-10 ${errors.password ? 'border-red-500/50' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.password && <span className="mt-1 block text-[11px] text-red-400">{errors.password}</span>}
          </Field>

          {errors.form && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {errors.form}
            </div>
          )}

          <Button type="submit" disabled={busy} className="w-full justify-center">
            {busy ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
            {busy ? 'Signing in…' : 'Login'}
          </Button>
        </form>

        <p className="mt-5 text-center text-[11px] text-slate-600">
          Demo credentials — <span className="text-slate-400">mayank</span> / <span className="text-slate-400">123456</span>
        </p>
      </motion.div>
    </div>
  )
}
