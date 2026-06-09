import { motion, useReducedMotion } from 'framer-motion'
import logo from '../assets/Logo.png'

const memberships = [
  {
    name: 'Master Builders Association',
    subtitle: 'Member',
    logo: '/assets/trust/master-builders-member.png',
    alt: 'Master Builders Association member logo',
    logoSurface: 'bg-white',
  },
  {
    name: 'Housing Industry Association',
    subtitle: 'Industry Guidance',
    logo: '/assets/trust/hia-member.png',
    alt: 'Housing Industry Association member logo',
    logoSurface: 'bg-white',
  },
  {
    name: 'SafeWork NSW',
    subtitle: 'Safety-led project delivery',
    logo: '/assets/trust/safework-nsw.png',
    alt: 'SafeWork NSW logo',
    logoSurface: 'bg-black',
  },
]

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

        <motion.div
          className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          {memberships.map((membership) => (
            <article
              key={membership.name}
              className="group flex h-[350px] flex-col border border-gold/45 bg-charcoal/70 px-6 py-7 text-center shadow-[0_22px_60px_rgba(0,0,0,0.42),0_0_28px_rgba(197,160,89,0.06)] transition duration-300 hover:-translate-y-1 hover:border-gold/75 hover:shadow-[0_26px_70px_rgba(0,0,0,0.5),0_0_34px_rgba(197,160,89,0.11)] sm:px-8"
            >
              <div className="flex h-44 items-center justify-center border-b border-gold/20 px-2 pb-7">
                <div
                  className={`flex h-32 w-full items-center justify-center overflow-hidden border border-white/10 p-2 shadow-[0_12px_28px_rgba(0,0,0,0.28)] ${membership.logoSurface}`}
                >
                  <img
                    src={membership.logo}
                    alt={membership.alt}
                    className="h-full w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center pt-7">
                <h3 className="font-display text-2xl leading-tight text-gold-soft">{membership.name}</h3>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-smoke">
                  {membership.subtitle}
                </p>
              </div>
            </article>
          ))}
        </motion.div>

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
