import { CardSkeleton } from './ui/Skeleton'

/** Loading placeholder shown while a lazy page chunk is being fetched. */
export function PageFallback() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
