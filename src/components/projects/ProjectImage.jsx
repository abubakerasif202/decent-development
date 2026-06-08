import { useState } from 'react'

export default function ProjectImage({ src, alt, className = '', fallbackClassName = '', loading = 'lazy', fetchPriority }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        className={`flex h-full min-h-[220px] w-full items-end bg-[linear-gradient(135deg,#121212_0%,#2a2a2a_50%,#8a6a35_140%)] p-6 ${fallbackClassName || className}`}
        role="img"
        aria-label={alt}
      >
        <span className="max-w-xs font-display text-2xl font-normal leading-tight text-ivory">{alt}</span>
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
