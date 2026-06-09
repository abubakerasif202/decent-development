import { motion, useReducedMotion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
const badges = [
  {
    label: 'Quality Construction',
    description: 'Careful planning, delivery, and finish',
  },
  {
    label: 'Professional Standards',
    description: 'Clear documentation and communication',
  },
  {
    label: 'SafeWork NSW',
    description: 'Safety and compliance focused',
  },
]

export default function IndustryMemberships() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="bg-charcoal py-16 text-ivory sm:py-20" aria-labelledby="industry-memberships-title">
      <div className="section-shell">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="eyebrow">Our commitments</p>
          <h2 id="industry-memberships-title" className="mt-4 font-display text-3xl font-normal leading-tight sm:text-4xl">
            Industry Standards
          </h2>
          <div className="mx-auto mt-5 h-px w-20 bg-gold" aria-hidden="true" />
          <p className="mt-6 text-base font-light leading-7 text-smoke">
            Decent Development is committed to quality construction, safety, compliance, and trusted client outcomes
            across residential and development projects.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {badges.map((badge, index) => (
            <motion.article
              key={badge.label}
              className="flex min-h-56 flex-col items-center justify-center border border-gold/20 bg-porcelain p-6 text-center text-ink shadow-[0_20px_45px_rgba(0,0,0,0.28)]"
              aria-label={badge.label}
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: reducedMotion ? 0 : index * 0.06, ease: 'easeOut' }}
            >
              <ShieldCheck className="text-gold" size={52} strokeWidth={1.4} aria-hidden="true" />
              <p className="mt-5 font-display text-2xl font-normal">{badge.label}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-bronze">
                {badge.description}
              </p>
            </motion.article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm font-light leading-6 text-smoke">
          Our team works with a strong focus on professional standards, safe building practices, transparent
          communication, and long-term project quality.
        </p>
      </div>
    </section>
  )
}
