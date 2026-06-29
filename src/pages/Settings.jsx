import { Palette, Globe, Bell, RotateCcw, Moon, Sun } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Field, Select } from '@/components/ui/Input'
import { toast } from '@/components/ui/Toast'
import { useStore } from '@/store/useStore'


const ACCENTS = ['#6366F1', '#8B5CF6', '#22C55E', '#F59E0B', '#EC4899', '#06B6D4']
const LANGS = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Japanese']
const TZS = ['Asia/Kolkata', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney', 'UTC']
const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD']

export default function Settings() {
  const { settings, updateSettings, resetData } = useStore()

  const notifKeys = Object.keys(settings.notifications) 

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Customize LifeFlow to fit your workflow" />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Appearance */}
        <Card>
          <CardHeader title="Appearance" subtitle="Theme & accent color" icon={<Palette size={18} />} />
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-xs font-medium text-slate-400">Theme</p>
              <div className="grid grid-cols-2 gap-2">
                {(['dark', 'light'] ).map((t) => (
                  <button key={t} onClick={() => updateSettings({ theme: t })} className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium capitalize transition ${settings.theme === t ? 'border-brand-indigo/40 bg-brand-indigo/15 text-white' : 'border-white/10 text-slate-400'}`}>
                    {t === 'dark' ? <Moon size={15} /> : <Sun size={15} />} {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-slate-400">Accent color</p>
              <div className="flex gap-2">
                {ACCENTS.map((c) => (
                  <button key={c} onClick={() => updateSettings({ accent: c })} className={`h-9 w-9 rounded-lg ring-2 transition ${settings.accent === c ? 'ring-white' : 'ring-transparent'}`} style={{ background: c }} />
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Localization */}
        <Card>
          <CardHeader title="Localization" subtitle="Language, timezone & currency" icon={<Globe size={18} />} />
          <div className="space-y-4">
            <Field label="Language"><Select value={settings.language} onChange={(e) => updateSettings({ language: e.target.value })}>{LANGS.map((l) => <option key={l}>{l}</option>)}</Select></Field>
            <Field label="Timezone"><Select value={settings.timezone} onChange={(e) => updateSettings({ timezone: e.target.value })}>{TZS.map((t) => <option key={t}>{t}</option>)}</Select></Field>
            <Field label="Currency"><Select value={settings.currency} onChange={(e) => updateSettings({ currency: e.target.value })}>{CURRENCIES.map((c) => <option key={c}>{c}</option>)}</Select></Field>
          </div>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader title="Notifications & Reminders" subtitle="Choose what to be reminded about" icon={<Bell size={18} />} />
          <div className="space-y-1">
            {notifKeys.map((k) => (
              <label key={k} className="flex cursor-pointer items-center justify-between rounded-xl px-2 py-2.5 transition hover:bg-white/[0.03]">
                <span className="text-sm capitalize text-slate-200">{k}</span>
                <button
                  onClick={() => updateSettings({ notifications: { ...settings.notifications, [k]: !settings.notifications[k] } })}
                  className={`relative h-6 w-11 rounded-full transition ${settings.notifications[k] ? 'bg-brand-gradient' : 'bg-slate-400/50'}`}
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm ring-1 ring-black/10 transition-all ${settings.notifications[k] ? 'left-[22px]' : 'left-0.5'}`} />
                </button>
              </label>
            ))}
          </div>
        </Card>

        {/* Danger zone */}
        <Card>
          <CardHeader title="Data Management" subtitle="Reset or restore demo data" icon={<RotateCcw size={18} />} />
          <p className="mb-4 text-sm text-slate-400">Reset all habits, goals, expenses and learning topics back to the seeded demo data. This cannot be undone.</p>
          <Button variant="danger" onClick={() => { resetData(); toast.success('Data reset to defaults') }}><RotateCcw size={15} /> Reset all data</Button>
        </Card>
      </div>
    </div>
  )
}
