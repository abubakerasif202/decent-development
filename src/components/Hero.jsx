import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Building2, ClipboardCheck, ShieldCheck } from 'lucide-react'

const proofPoints = [
  { label: 'Licensed Builder', value: '476988C', icon: ShieldCheck },
  { label: 'NSW Delivery', value: 'Residential & Commercial', icon: Building2 },
  { label: 'Managed End-to-End', value: 'Planning to Handover', icon: ClipboardCheck },
]

export default function Hero({ company }) {
  const reducedMotion = useReducedMotion()

  return (
    <section id="home" className="relative isolate overflow-hidden bg-ink" aria-labelledby="hero-title">
      <div className="architecture-grid absolute inset-0 opacity-55" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-charcoal to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(198,161,91,0.18),transparent_22rem)]" />

      <div className="section-shell relative grid min-h-[calc(100svh-80px)] items-center gap-12 py-16 lg:grid-cols-[1.04fr_0.96fr] lg:py-24">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="eyebrow">North Sydney construction and development</p>
          <h1
            id="hero-title"
            className="mt-5 font-display text-5xl font-semibold leading-[1.05] text-ivory sm:text-6xl lg:text-7xl"
          >
            Building Better Futures
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-smoke sm:text-xl">
            Premium construction and development solutions delivered with precision,
            accountability, and long-term value.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 bg-gold px-6 py-3 font-semibold text-ink shadow-gold transition duration-200 hover:-translate-y-0.5 hover:bg-gold-soft"
            >
              Get a Quote
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              href="#team"
              className="focus-ring inline-flex min-h-12 items-center justify-center border border-gold/25 px-6 py-3 font-semibold text-ivory transition duration-200 hover:-translate-y-0.5 hover:border-gold/70 hover:text-gold"
            >
              Meet the Team
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 34 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="relative sm:min-h-[420px]"
          aria-label={`${company.name} project delivery principles`}
        >
          <div className="relative min-h-[360px] border border-gold/15 bg-ivory/[0.035] shadow-premium sm:absolute sm:inset-0 sm:min-h-0" />
          <div className="project-blueprint absolute inset-x-5 top-5 h-[340px] overflow-hidden border border-gold/30 sm:inset-5 sm:h-auto">
            <div className="absolute left-8 top-8 h-28 w-28 border-l border-t border-gold/55" />
            <div className="absolute bottom-8 right-8 h-28 w-28 border-b border-r border-gold/55" />
            <div className="absolute inset-x-10 top-1/2 h-px bg-gold/30" />
            <div className="absolute inset-y-10 left-1/2 w-px bg-gold/30" />
            <div className="absolute left-7 top-10 max-w-[17rem] sm:left-10 sm:top-12 sm:max-w-xs">
              <p className="text-xs font-semibold uppercase text-gold" style={{ letterSpacing: '0.2em' }}>
                Precision build systems
              </p>
              <p className="mt-3 font-display text-2xl font-semibold text-ivory sm:text-3xl">
                Construction led by planning, control, and clear accountability.
              </p>
            </div>
          </div>

          <div className="relative z-10 -mt-14 grid gap-3 px-5 sm:absolute sm:-bottom-5 sm:left-5 sm:right-5 sm:mt-0 sm:grid-cols-3 sm:px-0">
            {proofPoints.map(({ label, value, icon: Icon }) => (
              <div key={label} className="border border-gold/15 bg-charcoal/95 p-4 shadow-premium backdrop-blur">
                <Icon className="mb-3 text-gold" size={22} aria-hidden="true" />
                <p className="text-sm font-semibold text-ivory">{label}</p>
                <p className="mt-1 text-xs leading-5 text-smoke">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="gold-divider" />
    </section>
  )
}
