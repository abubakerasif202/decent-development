import { useState } from 'react'

export default function ProjectImage({
  src,
  alt,
  className = '',
  fallbackClassName = '',
  loading = 'lazy',
  fetchPriority,
  placeholderTitle,
  placeholderSubtitle,
  placeholderLabel,
}) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        className={`relative flex h-full min-h-[220px] w-full items-end overflow-hidden bg-[linear-gradient(145deg,#0d1117_0%,#1c2430_52%,#7d642f_160%)] p-6 ${fallbackClassName || className}`}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,162,39,0.22),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.18))]" />
        <div className="absolute inset-0 opacity-35 bg-[linear-gradient(90deg,transparent_0,rgba(255,255,255,0.08)_50%,transparent_100%)]" />
        <div className="relative z-10 max-w-md">
          {placeholderLabel ? (
            <span className="inline-flex border border-gold/30 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-soft backdrop-blur">
              {placeholderLabel}
            </span>
          ) : null}
          <p className="mt-4 max-w-xs font-display text-2xl font-normal leading-tight text-ivory">
            {placeholderTitle || alt}
          </p>
          {placeholderSubtitle ? (
            <p className="mt-2 text-sm leading-6 text-smoke">{placeholderSubtitle}</p>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      decoding="async"
      loading={loading}
      fetchPriority={fetchPriority}
      onError={() => setFailed(true)}
    />
  )
}
