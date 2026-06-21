import { Component } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import { Button } from './ui/Button'
import { isChunkLoadError } from '@/lib/lazyWithRetry'

const RELOAD_KEY = 'lf-chunk-reloaded'


export class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error) {
    // In production this would report to Sentry/LogRocket.
    console.error('LifeFlow crashed:', error)

    // Backstop: if a stale/failed code-split chunk slips through to here,
    // reload once to fetch fresh chunks instead of showing a dead screen.
    if (isChunkLoadError(error)) {
      let alreadyReloaded = false
      try {
        alreadyReloaded = !!sessionStorage.getItem(RELOAD_KEY)
        if (!alreadyReloaded) sessionStorage.setItem(RELOAD_KEY, '1')
      } catch { /* sessionStorage may be unavailable */ }
      if (!alreadyReloaded) window.location.reload()
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="grid min-h-screen place-items-center p-6">
          <div className="glass max-w-md p-8 text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-red-500/15 text-red-400">
              <AlertTriangle />
            </div>
            <h1 className="text-lg font-semibold text-white">Something went wrong</h1>
            <p className="mt-2 text-sm text-slate-400">{this.state.message ?? 'An unexpected error occurred.'}</p>
            <Button className="mx-auto mt-6" onClick={() => window.location.reload()}>
              <RotateCcw size={16} /> Reload app
            </Button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
