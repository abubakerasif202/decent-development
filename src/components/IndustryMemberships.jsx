import { motion, useReducedMotion } from 'framer-motion'
import { Building2, HardHat, ShieldCheck } from 'lucide-react'
import logo from '../assets/Logo.png'

const memberships = [
  {
    name: 'Master Builders Association',
    label: 'Industry guidance',
    alt: 'Master Builders Association member logo',
    icon: Building2,
  },
  {
    name: 'Housing Industry Association',
    label: 'Industry guidance',
    alt: 'Housing Industry Association member logo',
    icon: HardHat,
  },
  {
    name: 'SafeWork NSW',
    label: 'Committed to workplace safety',
    alt: 'SafeWork NSW safety logo',
    icon: ShieldCheck,
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

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {memberships.map(({ name, label, alt, icon: Icon }, index) => (
            <motion.article
              key={name}
              className="group flex min-h-64 flex-col items-center justify-center border border-[#C9A227]/35 bg-white/[0.025] px-6 py-9 text-center shadow-[0_20px_55px_rgba(0,0,0,0.35)] transition duration-300 hover:border-[#C9A227]/70 hover:bg-white/[0.045] hover:shadow-[0_20px_60px_rgba(201,162,39,0.10)]"
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: reducedMotion ? 0 : index * 0.08, ease: 'easeOut' }}
            >
              <div
                role="img"
                aria-label={alt}
                className="flex h-20 w-20 items-center justify-center border border-[#C9A227]/40 bg-[#C9A227]/[0.06] text-[#C9A227] shadow-[0_0_30px_rgba(201,162,39,0.08)]"
              >
                <Icon size={38} strokeWidth={1.25} aria-hidden="true" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-normal leading-tight text-white">{name}</h3>
              <p className="mt-4 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#C9A227]">{label}</p>
            </motion.article>
          ))}
        </div>

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
