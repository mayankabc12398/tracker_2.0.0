// ────────────────────────────────────────────────────────────────────────────
// SyncManager — invisible orchestrator. App root par mount hota hai, Google Sheets
// sync chalu karta hai aur ek chhota status indicator dikhata hai. Koi feature UI
// nahi badalta — purely additive.
// ────────────────────────────────────────────────────────────────────────────
import { useSheetSync } from '@/hooks/useSheetSync'
import { SyncIndicator } from './SyncIndicator'

export function SyncManager() {
  useSheetSync()
  return <SyncIndicator />
}
