

export function EmptyState({
  icon,
  title,
  description,
  action,
}




) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-white/10 py-14 text-center">
      {icon && <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/[0.04] text-slate-400">{icon}</div>}
      <div>
        <p className="font-medium text-slate-200">{title}</p>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {action}
    </div>
  )
}
