// ────────────────────────────────────────────────────────────────────────────
// googleSheetService — saari Google Sheets communication ek hi jagah (Service Layer).
//
// Backend = Apps Script Web App (Code.gs). React kabhi seedhe Sheets ko nahi
// chhuti — bas isi service ke through. URL .env se aata hai (source me hardcode nahi).
//
// Transport detail (IMPORTANT): POST me Content-Type "text/plain" rakha hai —
// isse browser CORS "preflight" (OPTIONS) skip kar deta hai, jo Apps Script
// handle nahi karta. Apps Script doPost me JSON.parse(e.postData.contents) chalta hai.
// ────────────────────────────────────────────────────────────────────────────
const API_URL = import.meta.env.VITE_SHEETS_API_URL
const TOKEN = import.meta.env.VITE_SHEETS_TOKEN || '' // optional shared secret

/** Agar URL set nahi hai → sync off, app localStorage par chalegi (no crash). */
export const sheetsEnabled = Boolean(API_URL)

function withToken(url) {
  if (!TOKEN) return url
  return url + (url.includes('?') ? '&' : '?') + 'token=' + encodeURIComponent(TOKEN)
}

// ── Low-level transport ───────────────────────────────────────────────────────
// Mobile networks flaky hote hain + Apps Script cold-start/redirect slow hota hai.
// Isliye har request ke saath: (a) timeout (warna hang ho jaata, indicator atak jaata),
// (b) chhota retry-with-backoff (transient blip apne aap recover ho jaaye).
const REQUEST_TIMEOUT = 15000 // ms — Apps Script cold start ke liye thoda generous
const MAX_RETRIES = 2

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** Browser offline? (mobile me tab-switch / tunnel / lift me common.) */
export function isOffline() {
  return typeof navigator !== 'undefined' && navigator.onLine === false
}

/** Network error ko "transient" (retry worth) maano vs "hard" (4xx) — taaki spam na ho. */
export class OfflineError extends Error {
  constructor(msg = 'offline') { super(msg); this.name = 'OfflineError'; this.offline = true }
}

/** fetch + AbortController timeout. Hang hone par REQUEST_TIMEOUT baad reject. */
async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(id)
  }
}

/** Retry wrapper: network/abort/5xx → backoff retry; 4xx → turant fail (retry bekaar). */
async function request(url, options, label) {
  if (isOffline()) throw new OfflineError() // timeout ka wait kiye bina turant — UI quiet rahe
  let lastErr
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetchWithTimeout(url, options)
      if (!res.ok) {
        // 5xx / 429 → server transient, retry; baaki (4xx) → permanent, mat retry.
        if ((res.status >= 500 || res.status === 429) && attempt < MAX_RETRIES) {
          lastErr = new Error(`${label} ${res.status}`)
          await sleep(500 * 2 ** attempt)
          continue
        }
        throw new Error(`${label} failed: ${res.status}`)
      }
      const data = await res.json()
      if (data && data.error) throw new Error('Sheets error: ' + data.error)
      return data
    } catch (e) {
      lastErr = e
      // AbortError (timeout) ya network failure → retry; warna (parse/server 4xx) → throw.
      const transient = e.name === 'AbortError' || e instanceof TypeError || /\b(429|5\d\d)\b/.test(e.message)
      if (transient && attempt < MAX_RETRIES) {
        await sleep(500 * 2 ** attempt)
        continue
      }
      throw lastErr
    }
  }
  throw lastErr
}

/** Poora dataset laao: { expenses:[...], progress:{...}, settings:{...} } */
export async function fetchAllData() {
  return request(withToken(API_URL), { method: 'GET' }, 'Sheets GET')
}

/** Ek tab ko overwrite karo (last-writer-wins). tab: 'expenses'|'progress'|'settings'. */
async function postTab(tab, payload) {
  return request(
    API_URL,
    {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // simple request → no CORS preflight
      body: JSON.stringify({ tab, payload, token: TOKEN || undefined }),
    },
    'Sheets POST',
  )
}

// Tab-level savers (sync layer inhe use karta hai — har save = 1 API call).
export const saveExpenses = (list) => postTab('expenses', list)
export const saveProgress = (map) => postTab('progress', map)
export const saveSettings = (obj) => postTab('settings', obj)
export const saveHabits = (list) => postTab('habits', list)
export const saveGoals = (list) => postTab('goals', list)
export const saveTopics = (list) => postTab('topics', list)
export const saveNotifications = (list) => postTab('notifications', list)

// ── Login activity logging (append-only audit log) ────────────────────────────
/** userAgent se DeviceType + Browser nikaalo. */
function getDeviceInfo() {
  const ua = navigator.userAgent || ''
  let deviceType = 'Desktop'
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) deviceType = 'Tablet'
  else if (/Mobi|Android|iPhone|iPod|Windows Phone/i.test(ua)) deviceType = 'Mobile'

  let browser = 'Unknown'
  if (/Edg\//i.test(ua)) browser = 'Edge'
  else if (/OPR\/|Opera/i.test(ua)) browser = 'Opera'
  else if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) browser = 'Chrome'
  else if (/Firefox\//i.test(ua)) browser = 'Firefox'
  else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = 'Safari'
  return { deviceType, browser }
}

/** Local time → DD-MM-YYYY + hh:mm AM/PM. */
function nowParts() {
  const d = new Date()
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  let h = d.getHours()
  const min = String(d.getMinutes()).padStart(2, '0')
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12 || 12
  return { loginDate: `${dd}-${mm}-${yyyy}`, loginTime: `${h}:${min} ${ampm}` }
}

/** Successful login ko LoginActivity tab me append karo (LoginId backend auto deta hai). */
export async function logLoginActivity(username) {
  if (!sheetsEnabled) return
  const { deviceType, browser } = getDeviceInfo()
  const { loginDate, loginTime } = nowParts()
  await postTab('loginActivity', { username, loginDate, loginTime, deviceType, browser, loginStatus: 'Success' })
}

// ── CRUD facade (Phase 3 spec: getAll/getById/create/update/delete/search) ────
// Note: app khud Zustand + sync layer use karti hai. Yeh methods standalone /
// programmatic use ke liye hain (expenses entity par operate karte hain).
function genId() {
  return 'txn_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export async function getAll() {
  const data = await fetchAllData()
  return data.expenses ?? []
}

export async function getById(id) {
  const all = await getAll()
  return all.find((e) => e.id === id) ?? null
}

export async function create(item) {
  const all = await getAll()
  const row = { id: item.id ?? genId(), ...item }
  await saveExpenses([row, ...all]) // newest first (app jaisa)
  return row
}

export async function update(id, patch) {
  const all = await getAll()
  await saveExpenses(all.map((e) => (e.id === id ? { ...e, ...patch } : e)))
}

// `delete` JS reserved word hai → function ka naam remove, alias bhi export.
export async function remove(id) {
  const all = await getAll()
  await saveExpenses(all.filter((e) => e.id !== id))
}
export { remove as deleteById }

export async function search(query) {
  const all = await getAll()
  const q = String(query ?? '').toLowerCase()
  return all.filter((e) => (e.title ?? '').toLowerCase().includes(q))
}
