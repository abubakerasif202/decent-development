import { motion, useReducedMotion } from 'framer-motion'

export default function About() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="about" className="bg-porcelain py-16 text-ink sm:py-20" aria-labelledby="about-title">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <h2 id="about-title" className="font-display text-4xl font-normal leading-tight text-ink sm:text-5xl">
            About DECENT
            <br />
            Development
          </h2>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
          className="space-y-6 text-base font-light leading-8 text-graphite/80"
        >
          <p className="font-semibold text-ink">We deliver construction and development with a premium standard of care.</p>
          <p>
            DECENT Development provides construction and property development solutions across New South Wales with
            a focus on disciplined planning, strong coordination, and a refined delivery experience.
          </p>
          <p>
            Every project is approached with practical sequencing, transparent communication, and a clear commitment
            to quality so clients can move from early planning to final handover with confidence.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
