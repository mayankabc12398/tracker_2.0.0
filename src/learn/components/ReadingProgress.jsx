import { useEffect, useState } from 'react'

/** A thin gradient bar at the top that fills as the user scrolls the page. */
export function ReadingProgress({ target }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const el = target?.current
    const onScroll = () => {
      const scrollEl = el ?? document.documentElement
      const max = scrollEl.scrollHeight - scrollEl.clientHeight
      const current = el ? el.scrollTop : window.scrollY
      setPct(max > 0 ? Math.min(100, (current / max) * 100) : 0)
    }
    const node = el ?? window
    node.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => node.removeEventListener('scroll', onScroll)
  }, [target])

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-[width] duration-150"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
