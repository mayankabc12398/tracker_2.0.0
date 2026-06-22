// ────────────────────────────────────────────────────────────────────────────
// AuthContext — current login state poore app me. Session localStorage se
// SYNCHRONOUSLY restore hota hai (useState init me) → refresh par koi flicker/
// loading nahi, user logged-in rehta hai.
// ────────────────────────────────────────────────────────────────────────────
import { createContext, useContext, useCallback, useMemo, useState } from 'react'
import { getSession, login as svcLogin, logout as svcLogout } from '@/services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSession()) // refresh-safe restore

  const login = useCallback((creds) => {
    const session = svcLogin(creds) // throws on invalid
    setUser(session)
    return session
  }, [])

  const logout = useCallback(() => {
    svcLogout()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, username: user?.username ?? null, isAuthed: !!user, login, logout }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/** Clean consumer. <AuthProvider> ke bahar use karne par saaf error. */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth() ko <AuthProvider> ke andar use karein.')
  return ctx
}
