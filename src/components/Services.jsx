import { motion, useReducedMotion } from 'framer-motion'
import { BadgeCheck, Brain, Building2, ClipboardCheck, Hammer, Home, Landmark, Wrench } from 'lucide-react'

const proofTiles = [
  {
    title: 'Premium delivery',
    icon: BadgeCheck,
  },
  {
    title: 'Technical insight',
    icon: Brain,
  },
  {
    title: 'End-to-end control',
    icon: Hammer,
  },
]

const services = [
  {
    title: 'Residential Construction',
    copy: 'New homes and residential builds managed with disciplined scheduling, site coordination, and an unwavering focus on quality.',
    icon: Home,
  },
  {
    title: 'Commercial Construction',
    copy: 'Commercial spaces delivered with practical staging, clear stakeholder communication, and reliable trade management.',
    icon: Building2,
  },
  {
    title: 'Property Development',
    copy: 'Development support from early feasibility thinking through delivery planning and construction execution.',
    icon: Landmark,
  },
  {
    title: 'Project Management',
    copy: 'Specialist project management that keeps scope, time, budget, and reporting aligned from start to finish.',
    icon: ClipboardCheck,
  },
  {
    title: 'Renovations & Extensions',
    copy: 'Careful upgrades and extensions that respect existing structures while enhancing liveability and value.',
    icon: Hammer,
  },
  {
    title: 'Building Consultation',
    copy: 'Straightforward guidance on buildability, planning pathways, project risk, and construction sequencing.',
    icon: Wrench,
  },
]

const proofGridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const proofTileVariants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.46,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const serviceCardSpring = {
  type: 'spring',
  stiffness: 330,
  damping: 24,
  mass: 0.9,
}

export default function Services() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="services" className="bg-brand-bg py-16 text-brand-charcoal sm:py-20" aria-labelledby="services-title">
      <div className="section-shell flex flex-col gap-12 lg:flex-row">
        <motion.div
          className="lg:w-2/5 lg:pr-10"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <h2 id="services-title" className="font-display text-3xl font-normal leading-tight text-brand-charcoal sm:text-4xl">
            Construction services built around control, certainty, and quality
          </h2>
          <motion.div
            className="mt-12 grid grid-cols-3 gap-3"
            initial={reducedMotion ? false : 'hidden'}
            whileInView={reducedMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.35 }}
            variants={proofGridVariants}
          >
            {proofTiles.map(({ title, icon: Icon }) => (
              <motion.div key={title} className="border border-brand-border bg-brand-surface p-4 text-center shadow-sm sm:p-5 rounded-lg" variants={proofTileVariants}>
                <Icon className="mx-auto mb-4 text-brand-gold" size={22} aria-hidden="true" />
                <p className="text-[10px] font-semibold uppercase text-brand-muted">{title}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:w-3/5 xl:grid-cols-3">
          {services.map(({ title, copy, icon: Icon }, index) => (
            <motion.article
              key={title}
              className="group flex min-h-52 flex-col items-center justify-center border border-brand-border bg-brand-surface p-6 text-center hover:border-brand-gold hover:shadow-[0_10px_30px_rgba(201,162,39,0.08)] rounded-xl transition-all duration-300"
              initial={reducedMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.48, delay: reducedMotion ? 0 : index * 0.04, ease: 'easeOut' }}
              whileHover={reducedMotion ? undefined : 'hover'}
              variants={{
                hover: {
                  y: -8,
                  scale: 1.01,
                  transition: serviceCardSpring,
                },
              }}
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center border border-brand-gold/50 bg-brand-bg text-brand-gold transition-colors duration-200 group-hover:bg-brand-gold group-hover:text-white rounded-lg">
                <motion.span
                  className="block"
                  variants={{
                    hover: {
                      scale: 1.12,
                      transition: serviceCardSpring,
                    },
                  }}
                  aria-hidden="true"
                >
                  <Icon size={24} />
                </motion.span>
              </div>
              <h3 className="text-xs font-bold uppercase text-brand-charcoal">{title}</h3>
              <p className="mt-4 text-xs font-light leading-5 text-brand-muted">{copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
