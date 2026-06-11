export default function ProjectStats({ project }) {
  const stats = [
    ['Location', project.suburb],
    ['Project type', project.type],
    ['Status', project.status],
  ]

  return (
    <dl className="grid gap-3 sm:grid-cols-3">
      {stats.map(([label, value]) => (
        <div key={label} className="border border-brand-border bg-brand-surface px-5 py-5 rounded-lg shadow-sm">
          <dt className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-muted">{label}</dt>
          <dd className="mt-2 font-display text-xl font-normal text-brand-charcoal">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
