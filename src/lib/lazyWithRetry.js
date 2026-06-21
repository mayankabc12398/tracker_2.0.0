import { lazy } from 'react'

// Shared guard so we never reload more than once per session (avoids reload loops).
const RELOAD_KEY = 'lf-chunk-reloaded'

/** True for the various "failed to load a JS chunk" errors across browsers/bundlers. */
export function isChunkLoadError(error) {
  const msg = (error && (error.message || String(error))) || ''
  return /Loading chunk|dynamically imported module|module script failed|Failed to fetch|importing a module/i.test(msg)
}

/**
 * Drop-in replacement for React.lazy() that survives transient/stale chunk failures.
 *
 * Why: when a code-split chunk fails to download (network blip, or the file was
 * replaced by a new build), React.lazy() caches the rejected promise and the
 * route stays stuck on its loading fallback until a full page refresh. Here we
 * retry a couple of times, and if it still fails we reload ONCE to pull the
 * fresh HTML + chunk hashes — turning "stuck loading until manual refresh" into
 * automatic recovery.
 */
export function lazyWithRetry(factory, retries = 2, delay = 400) {
  return lazy(
    () =>
      new Promise((resolve, reject) => {
        const load = (remaining) => {
          factory()
            .then((mod) => {
              // Successful load → clear the guard so future stale chunks can recover too.
              try { sessionStorage.removeItem(RELOAD_KEY) } catch { /* ignore */ }
              resolve(mod)
            })
            .catch((error) => {
              if (remaining > 0) {
                setTimeout(() => load(remaining - 1), delay)
                return
              }
              // Out of retries. Most likely a stale chunk after a new deploy.
              let alreadyReloaded = false
              try {
                alreadyReloaded = !!sessionStorage.getItem(RELOAD_KEY)
                if (!alreadyReloaded) sessionStorage.setItem(RELOAD_KEY, '1')
              } catch { /* sessionStorage may be unavailable */ }

              if (!alreadyReloaded) {
                window.location.reload()
                return
              }
              reject(error)
            })
        }
        load(retries)
      }),
  )
}
