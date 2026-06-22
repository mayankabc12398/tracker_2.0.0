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
/** Poora dataset laao: { expenses:[...], progress:{...}, settings:{...} } */
export async function fetchAllData() {
  const res = await fetch(withToken(API_URL), { method: 'GET' })
  if (!res.ok) throw new Error('Sheets GET failed: ' + res.status)
  const data = await res.json()
  if (data && data.error) throw new Error('Sheets error: ' + data.error)
  return data
}

/** Ek tab ko overwrite karo (last-writer-wins). tab: 'expenses'|'progress'|'settings'. */
async function postTab(tab, payload) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // simple request → no CORS preflight
    body: JSON.stringify({ tab, payload, token: TOKEN || undefined }),
  })
  if (!res.ok) throw new Error('Sheets POST failed: ' + res.status)
  const data = await res.json()
  if (data && data.error) throw new Error('Sheets error: ' + data.error)
  return data
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
