import { motion, useReducedMotion } from 'framer-motion'

export default function About() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="about" className="bg-porcelain py-16 text-ink sm:py-20" aria-labelledby="about-title">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <motion.div
          initial={reducedMotion ? false : { opacity: 1, y: 24 }}
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
          initial={reducedMotion ? false : { opacity: 1, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
          className="space-y-6 text-base font-light leading-8 text-graphite/80"
        >
          <p className="font-semibold text-ink">We are committed to excellence in property development.</p>
          <p>
            DECENT Development provides reliable construction and property development
            solutions across New South Wales. The team works with owners, investors,
            consultants, and trades to deliver well-managed projects with practical
            planning, transparent communication, and a strong commitment to lasting value.
          </p>
          <p>
            Every project is approached with disciplined sequencing, practical site
            coordination, and transparent reporting so clients can make confident
            decisions from early planning through final handover.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
