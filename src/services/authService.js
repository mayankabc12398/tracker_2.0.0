// ────────────────────────────────────────────────────────────────────────────
// authService — saari auth logic ek jagah (static credentials wala simple gate).
//
// NOTE: ye client-side static login hai (real cryptographic auth nahi). Personal
// app ke liye theek — ek "gate" hai. Credentials niche VALID me hain.
// ────────────────────────────────────────────────────────────────────────────
import { logLoginActivity } from '@/services/googleSheetService'

const VALID = { username: 'mayank', password: '123456' }
const SESSION_KEY = 'lifeflow-auth'

/** localStorage se session padho (page refresh ke baad bhi logged-in rehne ke liye). */
export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  } catch {
    return null
  }
}

/**
 * Static credentials check. Sahi → session save + login activity Sheet me log.
 * Galat → INVALID_CREDENTIALS error throw.
 */
export function login({ username, password }) {
  const u = (username || '').trim()
  if (u !== VALID.username || password !== VALID.password) {
    const err = new Error('Galat username ya password')
    err.code = 'INVALID_CREDENTIALS'
    throw err
  }
  const session = { username: u, loginAt: new Date().toISOString() }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))

  // Login activity ko fire-and-forget log karo — Sheet fail ho to bhi login na ruke.
  logLoginActivity(u).catch((e) => console.error('[auth] login activity log failed', e))

  return session
}

/** Session clear → logout. */
export function logout() {
  localStorage.removeItem(SESSION_KEY)
}
