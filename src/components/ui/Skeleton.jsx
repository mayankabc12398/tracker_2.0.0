import { cn } from '@/lib/utils'

export function Skeleton({ className }) {
  return (
    <div className={cn('relative overflow-hidden rounded-xl bg-white/[0.06]', className)}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="glass space-y-3 p-5">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-9 w-2/3" />
      <Skeleton className="h-2 w-full" />
    </div>
  )
}
