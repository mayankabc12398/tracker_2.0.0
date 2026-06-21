// ────────────────────────────────────────────────────────────────────────────
// useSheetSync — Zustand stores ko Google Sheets se sync karta hai.
//
// Design (zero component/store change — purely additive):
//   • BOOTSTRAP (startup): Sheet se data laao → stores me bhar do. Sheet khali ho
//     to localStorage ka data ek baar Sheet me upload (localStorage→cloud migration).
//   • PUSH (CRUD ke baad): kisi bhi store me change → debounce → us tab ko overwrite.
//     UI turant update hota hai (Zustand optimistic), Sheet background me sync.
//   • REFRESH (tab focus / visible): dusre device ke changes laane ke liye refetch.
//
// localStorage persist waise hi chalu rehta hai → instant boot + offline cache.
// Sheet "source of truth" hai jab online ho.
// ────────────────────────────────────────────────────────────────────────────
import { useEffect } from 'react'
import { useStore } from '@/store/useStore'
import { useLearnProgress } from '@/store/useLearnProgress'
import { useCssProgress } from '@/store/useCssProgress'
import { useJsProgress } from '@/store/useJsProgress'
import { useReactProgress } from '@/store/useReactProgress'
import { useBrowserProgress } from '@/store/useBrowserProgress'
import { useAiProgress } from '@/store/useAiProgress'
import { useSyncStatus } from '@/store/useSyncStatus'
import { toast } from '@/components/ui/Toast'
import {
  sheetsEnabled, fetchAllData, saveExpenses, saveProgress, saveSettings, saveHabits, saveGoals,
} from '@/services/googleSheetService'

// HTML store sirf `completed` rakhta hai; baaki courses completed+bookmarks+notes.
const COURSE_STORES = {
  html: { store: useLearnProgress, fields: ['completed'] },
  css: { store: useCssProgress, fields: ['completed', 'bookmarks', 'notes'] },
  js: { store: useJsProgress, fields: ['completed', 'bookmarks', 'notes'] },
  react: { store: useReactProgress, fields: ['completed', 'bookmarks', 'notes'] },
  browser: { store: useBrowserProgress, fields: ['completed', 'bookmarks', 'notes'] },
  ai: { store: useAiProgress, fields: ['completed', 'bookmarks', 'notes'] },
}

let ready = false      // bootstrap complete? (warna push mat karo)
let hydrating = false  // abhi Sheet→store likh rahe? (warna echo loop ban jaayega)
const timers = {}

function debounce(key, fn, delay = 900) {
  clearTimeout(timers[key])
  timers[key] = setTimeout(fn, delay)
}

const statusStore = () => useSyncStatus.getState()

/** Saare 6 courses ka progress ek map me { course: {completed,bookmarks,notes} }. */
function gatherProgress() {
  const out = {}
  for (const [course, { store, fields }] of Object.entries(COURSE_STORES)) {
    const s = store.getState()
    const obj = {}
    for (const f of fields) obj[f] = s[f] ?? {}
    out[course] = obj
  }
  return out
}

const nonEmptyArr = (a) => Array.isArray(a) && a.length > 0
const nonEmptyObj = (o) => o && typeof o === 'object' && Object.keys(o).length > 0

/** Sheet ka data stores me bhar do — SIRF jab remote me actually data ho.
 *  (Empty remote se local data wipe nahi hona chahiye.) hydrating flag echo-push rokta hai. */
function applyHydration(remote) {
  hydrating = true
  try {
    if (nonEmptyArr(remote.expenses)) useStore.setState({ transactions: remote.expenses })
    if (nonEmptyArr(remote.habits)) useStore.setState({ habits: remote.habits })
    if (nonEmptyArr(remote.goals)) useStore.setState({ goals: remote.goals })
    if (nonEmptyObj(remote.settings)) {
      if (remote.settings.profile) useStore.setState({ profile: remote.settings.profile })
      if (remote.settings.settings) useStore.setState({ settings: remote.settings.settings })
    }
    if (nonEmptyObj(remote.progress)) {
      for (const [course, { store, fields }] of Object.entries(COURSE_STORES)) {
        const p = remote.progress[course]
        if (!p) continue
        const patch = {}
        for (const f of fields) if (p[f]) patch[f] = p[f]
        if (Object.keys(patch).length) store.setState(patch)
      }
    }
  } finally {
    hydrating = false
  }
}

/** Push wrapper — status update + error handling (Phase 6: no data loss, toasts). */
async function safePush(fn) {
  try {
    statusStore().set('syncing')
    await fn()
    statusStore().set('saved')
  } catch (e) {
    console.error('[sync] push failed', e)
    statusStore().set('error')
    toast.error('Cloud sync fail hua — data local me safe hai, agli baar retry hoga')
  }
}

export function useSheetSync() {
  useEffect(() => {
    if (!sheetsEnabled) return // URL nahi → app localStorage-only mode (no crash)

    let cancelled = false
    const unsubs = []

    async function bootstrap() {
      statusStore().set('syncing')
      try {
        const remote = await fetchAllData()
        if (cancelled) return
        // 1) Cloud me jo hai woh neeche le aao (safe — empty se wipe nahi hota).
        applyHydration(remote)
        // 2) Jo entity cloud me missing hai par local me hai → upload (per-entity migration).
        //    Isse purane sheet me bhi naye Habits/Goals tabs bina data loss ke ban jaate hain.
        const st = useStore.getState()
        if (!nonEmptyArr(remote.expenses) && st.transactions.length) await saveExpenses(st.transactions)
        if (!nonEmptyArr(remote.habits) && st.habits.length) await saveHabits(st.habits)
        if (!nonEmptyArr(remote.goals) && st.goals.length) await saveGoals(st.goals)
        if (!nonEmptyObj(remote.settings)) await saveSettings({ profile: st.profile, settings: st.settings })
        if (!nonEmptyObj(remote.progress)) await saveProgress(gatherProgress())
        statusStore().set('saved')
      } catch (e) {
        console.error('[sync] bootstrap failed', e)
        statusStore().set('error')
        toast.error('Cloud se data laane me dikkat — filhaal local data dikha rahe hain')
      } finally {
        ready = true
      }
    }

    async function refresh() {
      if (!ready || cancelled) return
      try {
        const remote = await fetchAllData()
        if (cancelled) return
        applyHydration(remote)
      } catch (e) {
        console.error('[sync] refresh failed', e)
      }
    }

    bootstrap().then(() => {
      if (cancelled) return

      // (Phase 5) Main store change → expenses / settings tab push (debounced).
      unsubs.push(
        useStore.subscribe((s, prev) => {
          if (!ready || hydrating) return
          if (s.transactions !== prev.transactions) {
            debounce('expenses', () => safePush(() => saveExpenses(useStore.getState().transactions)))
          }
          if (s.habits !== prev.habits) {
            debounce('habits', () => safePush(() => saveHabits(useStore.getState().habits)))
          }
          if (s.goals !== prev.goals) {
            debounce('goals', () => safePush(() => saveGoals(useStore.getState().goals)))
          }
          if (s.profile !== prev.profile || s.settings !== prev.settings) {
            debounce('settings', () => safePush(() => saveSettings({
              profile: useStore.getState().profile,
              settings: useStore.getState().settings,
            })))
          }
        }),
      )

      // 6 course progress stores → ek hi Progress tab (debounced).
      for (const { store, fields } of Object.values(COURSE_STORES)) {
        unsubs.push(
          store.subscribe((s, prev) => {
            if (!ready || hydrating) return
            if (fields.some((f) => s[f] !== prev[f])) {
              debounce('progress', () => safePush(() => saveProgress(gatherProgress())))
            }
          }),
        )
      }
    })

    // (Phase 5) Dusre device ke changes — jab tab wapas focus/visible ho refetch.
    const onVisible = () => { if (document.visibilityState === 'visible') refresh() }
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      cancelled = true
      ready = false
      unsubs.forEach((u) => u())
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])
}
