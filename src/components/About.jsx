import { motion, useReducedMotion } from 'framer-motion'
import { BadgeCheck, MapPin, Ruler } from 'lucide-react'

const strengths = [
  {
    title: 'Accountable delivery',
    copy: 'Structured project oversight keeps stakeholders informed from early planning through final handover.',
    icon: BadgeCheck,
  },
  {
    title: 'NSW market knowledge',
    copy: 'Local construction experience supports practical decisions across residential and commercial work.',
    icon: MapPin,
  },
  {
    title: 'Detail-led outcomes',
    copy: 'Clear scopes, measured sequencing, and disciplined site coordination protect quality and value.',
    icon: Ruler,
  },
]

export default function About() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="about" className="bg-porcelain py-20 text-ink sm:py-24" aria-labelledby="about-title">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="eyebrow">About</p>
          <h2 id="about-title" className="mt-4 font-display text-4xl font-semibold leading-[1.12] text-ink sm:text-5xl">
            About DECENT Development
          </h2>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
        >
          <p className="text-lg leading-8 text-graphite/80">
            DECENT Development provides reliable construction and property development
            solutions across New South Wales. The team works with owners, investors,
            consultants, and trades to deliver well-managed projects with practical
            planning, transparent communication, and a strong commitment to lasting value.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {strengths.map(({ title, copy, icon: Icon }) => (
              <article key={title} className="border border-gold/20 bg-ivory p-5 shadow-sm">
                <Icon className="mb-4 text-gold" size={24} aria-hidden="true" />
                <h3 className="font-semibold text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-graphite/70">{copy}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
