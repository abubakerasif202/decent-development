import { motion, useReducedMotion } from 'framer-motion'
import industryRecognised from '../assets/memberships/industry-recognised.png'

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
          <p className="eyebrow">Industry recognised</p>
          <h2 id="industry-memberships-title" className="mt-4 font-display text-3xl font-normal leading-tight sm:text-4xl">
            Proudly connected to the building industry
          </h2>
          <div className="mx-auto mt-5 h-px w-20 bg-gold" aria-hidden="true" />
          <p className="mt-6 text-base font-light leading-7 text-smoke">
            We maintain strong professional standards and industry relationships across residential construction and
            property development.
          </p>
        </motion.div>

        <motion.figure
          className="mx-auto mt-10 max-w-6xl overflow-hidden border border-gold/20 bg-porcelain shadow-[0_24px_55px_rgba(0,0,0,0.32)]"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <img
            src={industryRecognised}
            alt="DECENT Development industry recognition featuring Master Builders Association and HIA"
            className="h-auto w-full"
            loading="lazy"
            decoding="async"
          />
        </motion.figure>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm font-light leading-6 text-smoke">
          Our team works with a strong focus on professional standards, safe building practices, transparent
          communication, and long-term project quality.
        </p>
      </div>
    </section>
  )
}
