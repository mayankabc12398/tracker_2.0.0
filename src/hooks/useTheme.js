import { useEffect } from 'react'
import { useStore } from '@/store/useStore'

/** Syncs the persisted theme + accent color to the <html> element. */
export function useTheme() {
  const theme = useStore((s) => s.settings.theme)
  const accent = useStore((s) => s.settings.accent)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme === 'light')
    root.style.setProperty('--accent', accent)
  }, [theme, accent])

  return theme
}
