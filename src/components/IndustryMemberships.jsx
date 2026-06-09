import { motion, useReducedMotion } from 'framer-motion'
import logo from '../assets/Logo.png'
import industryLogos from '../assets/memberships/industry-recognised-logos.webp'

export default function IndustryMemberships() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      className="relative overflow-hidden border-y border-[#C9A227]/20 bg-[#0d0d0d] py-20 text-white sm:py-24"
      aria-labelledby="industry-recognised-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,39,0.11),transparent_42%)]"
        aria-hidden="true"
      />
      <div className="section-shell relative">
        <motion.header
          className="mx-auto max-w-3xl text-center"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <img src={logo} alt="DECENT Development" className="mx-auto h-12 w-auto object-contain sm:h-14" />
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.32em] text-[#C9A227]">
            Industry recognised
          </p>
          <h2
            id="industry-recognised-title"
            className="mt-5 font-display text-3xl font-normal leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            Building with recognised industry guidance and a safety-first mindset.
          </h2>
          <div className="mx-auto mt-7 h-px w-24 bg-[#C9A227]" aria-hidden="true" />
        </motion.header>

        <motion.figure
          className="mx-auto mt-12 max-w-6xl overflow-hidden border border-[#C9A227]/35 bg-white/[0.025] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.42)] sm:p-3"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <img
            src={industryLogos}
            alt="Master Builders Association member logo, Housing Industry Association member logo, and SafeWork NSW safety logo"
            className="aspect-[3/2] w-full object-cover"
            loading="lazy"
            decoding="async"
            width="1536"
            height="1024"
          />
        </motion.figure>

        <motion.p
          className="mx-auto mt-10 max-w-3xl text-center text-sm font-light leading-7 text-smoke sm:text-base"
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Decent Development is committed to quality construction, safety, compliance, and trusted client outcomes
          across residential and development projects.
        </motion.p>
      </div>
    </section>
  )
}
