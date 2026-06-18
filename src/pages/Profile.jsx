import { useRef, useState } from 'react'
import { Camera, Download, Upload, Save, Flame, Target, GraduationCap, Award } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Field, Input, Textarea } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { toast } from '@/components/ui/Toast'
import { useStore } from '@/store/useStore'
import { useDashboardStats } from '@/hooks/useAnalytics'

export default function Profile() {
  const { profile, updateProfile } = useStore()
  const stats = useDashboardStats()
  const [name, setName] = useState(profile.name)
  const [email, setEmail] = useState(profile.email)
  const [bio, setBio] = useState(profile.bio)
  const fileRef = useRef(null)

  const save = () => { updateProfile({ name, email, bio }); toast.success('Profile updated') }

  const exportData = () => {
    const data = localStorage.getItem('lifeflow-store-v2') ?? '{}'
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lifeflow-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Backup downloaded')
  }

  const importData = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        JSON.parse(reader.result )
        localStorage.setItem('lifeflow-store-v2', reader.result )
        toast.success('Backup restored — reloading…')
        setTimeout(() => window.location.reload(), 800)
      } catch {
        toast.error('Invalid backup file')
      }
    }
    reader.readAsText(file)
  }

  const badges = [
    { icon: Flame, label: `${stats.streak}-day streak`, tone: 'amber'  },
    { icon: Target, label: `${stats.goalsTotal} goals`, tone: 'green'  },
    { icon: GraduationCap, label: `${stats.learningPct}% mastery`, tone: 'indigo'  },
    { icon: Award, label: 'Early adopter', tone: 'purple'  },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" subtitle="Manage your identity & data" />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-brand-gradient text-3xl font-bold text-white shadow-glow">
              {name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-bg-subtle text-slate-300 hover:text-white"><Camera size={14} /></button>
          </div>
          <h2 className="mt-4 text-lg font-bold text-white">{profile.name}</h2>
          <p className="text-sm text-slate-400">{profile.email}</p>
          <p className="mt-3 text-sm text-slate-400">{profile.bio}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {badges.map((b) => (
              <Badge key={b.label} tone={b.tone}><b.icon size={11} /> {b.label}</Badge>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Edit Profile" subtitle="Update your personal details" />
          <div className="space-y-4">
            <Field label="Full name"><Input value={name} onChange={(e) => setName(e.target.value)} /></Field>
            <Field label="Email"><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
            <Field label="Bio"><Textarea value={bio} onChange={(e) => setBio(e.target.value)} /></Field>
            <Button onClick={save}><Save size={15} /> Save Changes</Button>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Data & Backup" subtitle="Export, back up, or restore your entire workspace" />
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={exportData}><Download size={15} /> Export / Backup</Button>
          <Button variant="outline" onClick={() => fileRef.current?.click()}><Upload size={15} /> Restore from Backup</Button>
          <input ref={fileRef} type="file" accept="application/json" hidden onChange={importData} />
        </div>
        <p className="mt-3 text-xs text-slate-500">Your data is stored locally in your browser. Back it up regularly or connect the LifeFlow API for cloud sync.</p>
      </Card>
    </div>
  )
}
