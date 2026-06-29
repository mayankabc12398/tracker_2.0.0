import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { AlarmClock, BellRing, BellOff, Play, X, Info } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Field, Input } from '@/components/ui/Input'
import { toast } from '@/components/ui/Toast'

const STORAGE_KEY = 'lifeflow.alarm'
const NOTIF_TAG = 'lifeflow-alarm'

/** Notification Triggers API: lets the OS show a scheduled notification even when
 *  the app is closed. Chromium-only (Chrome/Edge/Android); absent on Firefox/Safari. */
const TRIGGERS_SUPPORTED =
  typeof window !== 'undefined' &&
  'Notification' in window &&
  'serviceWorker' in navigator &&
  'showTrigger' in Notification.prototype &&
  'TimestampTrigger' in window

/** Hand a future-dated notification to the browser; it fires at `ts` with no JS running. */
async function scheduleNotification(ts, label) {
  if (!TRIGGERS_SUPPORTED || Notification.permission !== 'granted') return false
  try {
    const reg = await navigator.serviceWorker.ready
    await reg.showNotification('⏰ Alarm', {
      tag: NOTIF_TAG, // reused tag → a new schedule replaces the old one
      body: label || 'Time is up!',
      requireInteraction: true, // stays on screen until the user acts
      showTrigger: new TimestampTrigger(ts),
      data: { url: '/alarm' },
    })
    return true
  } catch {
    return false
  }
}

/** Remove any pending (or already-shown) scheduled alarm notification. */
async function cancelScheduledNotification() {
  if (!('serviceWorker' in navigator)) return
  try {
    const reg = await navigator.serviceWorker.ready
    const notes = await reg.getNotifications({ tag: NOTIF_TAG, includeTriggered: true })
    notes.forEach((n) => n.close())
  } catch {
    /* ignore */
  }
}

/** Read the persisted alarm; drop it if its time already elapsed while the tab was closed. */
function loadAlarm() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.target || typeof parsed.target !== 'number') return null
    if (parsed.target <= Date.now()) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return { target: parsed.target, label: parsed.label ?? '' }
  } catch {
    return null
  }
}

/** "HH:MM:SS" countdown from a millisecond delta. */
function formatDelta(ms) {
  const total = Math.max(0, Math.floor(ms / 1000))
  const h = String(Math.floor(total / 3600)).padStart(2, '0')
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0')
  const s = String(total % 60).padStart(2, '0')
  return `${h}:${m}:${s}`
}

/** "HH:MM" today; rolls to tomorrow if that moment already passed. */
function nextTimestampFor(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  const d = new Date()
  d.setHours(h, m, 0, 0)
  if (d.getTime() <= Date.now()) d.setDate(d.getDate() + 1)
  return d.getTime()
}

export default function Alarm() {
  const initial = loadAlarm()
  const [timeInput, setTimeInput] = useState('07:00')
  const [labelInput, setLabelInput] = useState(initial?.label ?? '')
  const [target, setTarget] = useState(initial?.target ?? null) // ms timestamp, null = no alarm set
  const [label, setLabel] = useState(initial?.label ?? '')
  const [now, setNow] = useState(() => Date.now())
  const [ringing, setRinging] = useState(false)
  const [permission, setPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'unsupported',
  )

  // Audio is held in refs so it survives re-renders and can be torn down cleanly.
  const audioCtxRef = useRef(null)
  const oscRef = useRef(null)
  const gainRef = useRef(null)
  const beepRef = useRef(null)

  // ── Web Audio: a looping beep, no audio file needed ───────────────────────
  /** Lazily create + resume the AudioContext during a user gesture (autoplay policy). */
  const ensureAudio = useCallback(async () => {
    if (!audioCtxRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext
      if (!Ctx) return null
      audioCtxRef.current = new Ctx()
    }
    if (audioCtxRef.current.state === 'suspended') {
      try {
        await audioCtxRef.current.resume()
      } catch {
        /* ignore — will retry on next gesture */
      }
    }
    return audioCtxRef.current
  }, [])

  const startSound = useCallback(() => {
    const ctx = audioCtxRef.current
    if (!ctx || oscRef.current) return // no context, or already ringing

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square' // brighter + louder than a sine
    osc.frequency.value = 880
    gain.gain.value = 0 // start silent; the melody steps pulse it
    osc.connect(gain).connect(ctx.destination)
    osc.start()
    oscRef.current = osc
    gainRef.current = gain

    // An urgent, ascending jingle that loops forever. 0 = a rest (silence).
    const MELODY = [988, 1319, 988, 1319, 1568, 0, 1319, 1568, 1976, 0]
    const VOLUME = 0.5 // loud
    const STEP_MS = 160
    let i = 0
    beepRef.current = setInterval(() => {
      const note = MELODY[i % MELODY.length]
      const t = ctx.currentTime
      if (note > 0) {
        osc.frequency.setValueAtTime(note, t)
        // Quick attack then a short decay = a plucky, articulated note.
        gain.gain.cancelScheduledValues(t)
        gain.gain.setValueAtTime(VOLUME, t)
        gain.gain.setTargetAtTime(0.0001, t + STEP_MS / 2000, 0.04)
      } else {
        gain.gain.setTargetAtTime(0.0001, t, 0.01)
      }
      i++
    }, STEP_MS)
  }, [])

  const stopSound = useCallback(() => {
    if (beepRef.current) {
      clearInterval(beepRef.current)
      beepRef.current = null
    }
    if (oscRef.current) {
      try {
        oscRef.current.stop()
      } catch {
        /* already stopped */
      }
      oscRef.current.disconnect()
      oscRef.current = null
    }
    if (gainRef.current) {
      gainRef.current.disconnect()
      gainRef.current = null
    }
  }, [])

  // ── Fire the alarm ────────────────────────────────────────────────────────
  const fireAlarm = useCallback(() => {
    setRinging(true)
    startSound()
    // When triggers are supported the service worker shows the notification (open
    // OR closed), so we skip the page-level one to avoid a duplicate. Where they
    // aren't, fall back to a page notification while the tab is open.
    if (
      !TRIGGERS_SUPPORTED &&
      typeof Notification !== 'undefined' &&
      Notification.permission === 'granted'
    ) {
      try {
        new Notification('⏰ Alarm', {
          body: label || 'Time is up!',
          tag: NOTIF_TAG,
          renotify: true,
        })
      } catch {
        /* notification construction can throw on some platforms — sound still plays */
      }
    }
  }, [label, startSound])

  // ── 1s tick: drives the clock AND checks the real timestamp ───────────────
  // Comparing against the absolute target (not a decremented counter) keeps it
  // accurate even if a background tab throttles the interval.
  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now())
      if (target && !ringing && Date.now() >= target) fireAlarm()
    }, 1000)
    return () => clearInterval(id)
  }, [target, ringing, fireAlarm])

  // ── Cleanup on unmount: kill audio + context, no leaks ────────────────────
  useEffect(() => {
    return () => {
      stopSound()
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {})
        audioCtxRef.current = null
      }
    }
  }, [stopSound])

  // ── Register the service worker that delivers close-app notifications ──────
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])

  // ── Controls ──────────────────────────────────────────────────────────────
  const handleSet = async () => {
    if (!timeInput) {
      toast.warning('Pick a time first')
      return
    }
    // Prime audio during this click so the alarm can sound later without a gesture.
    await ensureAudio()

    // Ask for notification permission (best-effort; alarm works regardless).
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      try {
        const result = await Notification.requestPermission()
        setPermission(result)
      } catch {
        /* ignore */
      }
    }

    const ts = nextTimestampFor(timeInput)
    const trimmed = labelInput.trim()
    setTarget(ts)
    setLabel(trimmed)
    setRinging(false)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ target: ts, label: trimmed }))

    // Schedule the OS-level notification so it fires even if the tab is closed.
    // Replace any previously scheduled one first.
    await cancelScheduledNotification()
    await scheduleNotification(ts, trimmed)

    const when = new Date(ts)
    const rolled = when.getDate() !== new Date().getDate()
    toast.success(`Alarm set for ${timeInput}${rolled ? ' (tomorrow)' : ''}`)
  }

  const clearAlarm = useCallback(() => {
    setTarget(null)
    setRinging(false)
    stopSound()
    cancelScheduledNotification()
    localStorage.removeItem(STORAGE_KEY)
  }, [stopSound])

  const handleCancel = () => {
    clearAlarm()
    toast.info('Alarm cancelled')
  }

  const handleStop = () => {
    clearAlarm()
    toast.success('Alarm dismissed')
  }

  // ── Derived display ───────────────────────────────────────────────────────
  const clock = new Date(now)
  const clockStr = clock.toLocaleTimeString('en-US', { hour12: false })
  const countdown = target ? formatDelta(target - now) : null
  const targetStr = target
    ? new Date(target).toLocaleString('en-US', {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    : null

  return (
    <div>
      <PageHeader
        title="Alarm"
        subtitle="Set a time-based alarm with a browser notification and sound."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Live clock + countdown */}
        <Card className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Current time</p>
          <p className="font-sans text-5xl font-bold tabular-nums tracking-tight text-white">
            {clockStr}
          </p>

          {target ? (
            <div className="mt-4 w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs text-slate-400">
                {ringing ? 'Ringing now' : 'Rings in'}
                {label && <span className="text-slate-300"> · {label}</span>}
              </p>
              <p
                className={
                  'mt-1 text-3xl font-bold tabular-nums ' +
                  (ringing ? 'gradient-text animate-pulse' : 'text-brand-indigo')
                }
              >
                {ringing ? '00:00:00' : countdown}
              </p>
              <p className="mt-1 text-[11px] text-slate-500">Target · {targetStr}</p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">No alarm set</p>
          )}
        </Card>

        {/* Controls */}
        <Card>
          {ringing ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-6 text-center">
              <motion.div
                animate={{ rotate: [0, -12, 12, -12, 12, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-gradient shadow-glow"
              >
                <BellRing size={30} className="text-white" />
              </motion.div>
              <div>
                <p className="text-lg font-semibold text-white">{label || 'Alarm'}</p>
                <p className="text-sm text-slate-400">Your alarm is going off.</p>
              </div>
              <Button variant="danger" size="lg" onClick={handleStop}>
                <BellOff size={18} /> Stop
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Field label="Time (24-hour)">
                <Input
                  type="time"
                  value={timeInput}
                  onChange={(e) => setTimeInput(e.target.value)}
                />
              </Field>
              <Field label="Label" hint="Optional — shown in the notification.">
                <Input
                  type="text"
                  placeholder="e.g. Stand up and stretch"
                  value={labelInput}
                  maxLength={80}
                  onChange={(e) => setLabelInput(e.target.value)}
                />
              </Field>

              <div className="flex gap-2">
                {target ? (
                  <>
                    <Button variant="primary" onClick={handleSet} className="flex-1">
                      <Play size={16} /> Update
                    </Button>
                    <Button variant="outline" onClick={handleCancel} className="flex-1">
                      <X size={16} /> Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={handleSet} className="w-full">
                    <AlarmClock size={16} /> Set alarm
                  </Button>
                )}
              </div>

              {permission === 'denied' && (
                <p className="flex items-start gap-2 rounded-xl border border-brand-amber/20 bg-brand-amber/10 p-3 text-xs text-brand-amber">
                  <Info size={14} className="mt-0.5 shrink-0" />
                  Notifications are blocked, so you won't get a system pop-up — but the in-app alarm and
                  sound will still fire.
                </p>
              )}
            </div>
          )}

          <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-slate-500">
            <Info size={13} className="mt-0.5 shrink-0" />
            {TRIGGERS_SUPPORTED
              ? 'The notification will fire even if this tab or browser is closed. The alarm sound only plays while the tab is open.'
              : 'Keep this tab open — your browser fires the alarm only while this page is running.'}
          </p>
        </Card>
      </div>
    </div>
  )
}
