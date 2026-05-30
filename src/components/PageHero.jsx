import { motion, useReducedMotion } from 'framer-motion'

export default function PageHero({ eyebrow, title, copy, children, visual, stats = [] }) {
  const reducedMotion = useReducedMotion()

  return (
    <section className="relative isolate overflow-hidden bg-ink pt-28 text-ivory sm:pt-32">
      <div className="absolute inset-0 architecture-grid opacity-30" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(197,160,89,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,250,242,0.07),transparent_32%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent"
        aria-hidden="true"
      />

      <div className="section-shell relative z-10 grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="eyebrow text-gold/90">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-normal leading-[0.95] text-gold sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-base font-light leading-7 text-smoke">{copy}</p>
          {children ? <div className="mt-8">{children}</div> : null}

          {stats.length ? (
            <dl className="mt-10 grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="border border-gold/18 bg-white/5 px-4 py-4 backdrop-blur-sm">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.28em] text-smoke">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 font-display text-2xl font-normal text-ivory">{stat.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </motion.div>

        <motion.div
          className="[perspective:1800px]"
          initial={reducedMotion ? false : { opacity: 0, y: 24, rotateX: 0, rotateY: 0 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {visual}
        </motion.div>
      </div>
    </section>
  )
}
