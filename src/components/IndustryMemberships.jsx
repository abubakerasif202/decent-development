import { motion, useReducedMotion } from 'framer-motion'
import { BadgeCheck, HardHat, ShieldCheck } from 'lucide-react'
import industryRecognised from '../assets/memberships/industry-recognised-new.png'

const standards = [
  {
    name: 'Master Builders NSW',
    description: 'Professional building standards',
    icon: BadgeCheck,
  },
  {
    name: 'Housing Industry Association',
    description: 'Residential industry guidance',
    icon: HardHat,
  },
  {
    name: 'SafeWork NSW',
    description: 'Safety-led project delivery',
    icon: ShieldCheck,
  },
]

export default function IndustryMemberships() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="bg-charcoal py-16 text-ivory sm:py-20" aria-labelledby="industry-memberships-title">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <p className="eyebrow">Professional standards</p>
            <h2 id="industry-memberships-title" className="mt-4 font-display text-3xl font-normal leading-tight sm:text-4xl">
              Quality, compliance, and safety at every stage
            </h2>
            <div className="mt-5 h-px w-20 bg-gold" aria-hidden="true" />
            <p className="mt-6 text-base font-light leading-7 text-smoke">
              DECENT Development approaches every project with a clear focus on responsible construction, transparent
              delivery, and long-term client outcomes.
            </p>

            <div className="mt-8 grid gap-3">
              {standards.map(({ name, description, icon: Icon }) => (
                <div key={name} className="flex items-center gap-4 border border-white/10 bg-white/5 px-4 py-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/30 text-gold">
                    <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ivory">{name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-stone">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.figure
            className="relative overflow-hidden border border-gold/20 bg-ink shadow-[0_24px_55px_rgba(0,0,0,0.32)]"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <img
              src={industryRecognised}
              alt="Master Builders NSW, Housing Industry Association, and SafeWork NSW logos"
              className="aspect-[4/3] w-full object-cover object-top sm:aspect-[3/2]"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="border-t border-gold/15 bg-ink px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-smoke">
              Building with recognised industry guidance and a safety-first mindset
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  )
}
