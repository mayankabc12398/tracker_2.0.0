/* LifeFlow service worker — powers alarm notifications that can fire even when
   the app/tab is closed, via the Notification Triggers API (Chromium only).
   The page schedules a notification with a TimestampTrigger; the browser shows
   it at the target time without any JS running. This SW only needs to exist and
   handle the click. No push/server involved. */

self.addEventListener('install', () => {
  // Activate this version immediately instead of waiting for old tabs to close.
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  // Take control of open clients so scheduling works without a reload.
  event.waitUntil(self.clients.claim())
})

// Focus an existing window when the alarm notification is clicked, or open one.
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = (event.notification.data && event.notification.data.url) || '/'
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ('focus' in client) return client.focus()
      }
      if (self.clients.openWindow) return self.clients.openWindow(url)
    }),
  )
})
