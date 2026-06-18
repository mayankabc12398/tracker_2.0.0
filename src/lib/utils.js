import { clsx, } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Tailwind-aware className combiner used by every UI primitive. */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDate(date, opts) {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', opts ?? { month: 'short', day: 'numeric' })
}

export function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10)
}

export function clamp(n, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n))
}

export function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

/** Greeting based on local hour. */
export function greeting(d = new Date()) {
  const h = d.getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}
