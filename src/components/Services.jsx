import { motion, useReducedMotion } from 'framer-motion'
import { Building2, ClipboardCheck, Hammer, Home, Landmark, Wrench } from 'lucide-react'

const services = [
  {
    title: 'Residential Construction',
    copy: 'New homes and residential builds managed with disciplined scheduling, site coordination, and quality control.',
    icon: Home,
  },
  {
    title: 'Commercial Construction',
    copy: 'Commercial spaces delivered with practical staging, stakeholder communication, and reliable trade management.',
    icon: Building2,
  },
  {
    title: 'Property Development',
    copy: 'Development support from feasibility thinking through delivery planning and construction execution.',
    icon: Landmark,
  },
  {
    title: 'Project Management',
    copy: 'Specialist project management that keeps scope, time, budget, and reporting under control.',
    icon: ClipboardCheck,
  },
  {
    title: 'Renovations & Extensions',
    copy: 'Careful upgrades and extensions that respect existing structures while improving liveability and value.',
    icon: Hammer,
  },
  {
    title: 'Building Consultation',
    copy: 'Straightforward guidance on buildability, planning pathways, project risk, and construction sequencing.',
    icon: Wrench,
  },
]

export default function Services() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="services" className="bg-charcoal py-20 text-ivory sm:py-24" aria-labelledby="services-title">
      <div className="section-shell">
        <motion.div
          className="max-w-3xl"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="eyebrow">Services</p>
          <h2 id="services-title" className="mt-4 font-display text-4xl font-semibold leading-[1.12] sm:text-5xl">
            Construction services built around control and certainty.
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map(({ title, copy, icon: Icon }, index) => (
            <motion.article
              key={title}
              className="group border border-gold/15 bg-ivory/[0.045] p-6 transition duration-200 hover:-translate-y-1 hover:border-gold/60 hover:bg-ivory/[0.07]"
              initial={reducedMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.48, delay: reducedMotion ? 0 : index * 0.04, ease: 'easeOut' }}
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center border border-gold/35 bg-gold/10 text-gold transition-colors duration-200 group-hover:bg-gold group-hover:text-ink">
                <Icon size={24} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-ivory">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-smoke">{copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
