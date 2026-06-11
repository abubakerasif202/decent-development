import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Building2, ClipboardCheck, Home, Layers3 } from 'lucide-react'
import projectResidential from '../assets/stitch/project-residential.webp'

const points = [
  { label: 'Family homes', icon: Home },
  { label: 'Duplex opportunities', icon: Building2 },
  { label: 'Triplex developments', icon: Layers3 },
  { label: 'Project feasibility', icon: ClipboardCheck },
]

export default function HouseAndLandPreview() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="bg-porcelain py-16 text-ink sm:py-24" aria-labelledby="house-land-preview-title">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div
          className="relative overflow-hidden border border-ink/10 bg-ink p-3 shadow-premium"
          initial={reducedMotion ? false : { opacity: 0, x: -24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="relative overflow-hidden">
            <img
              src={projectResidential}
              alt="Illustrative premium residential house and land concept"
              className="aspect-[5/4] h-full w-full object-cover"
              decoding="async"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 border-l border-gold/70 pl-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-soft">
                Sydney &amp; New South Wales
              </p>
              <p className="mt-2 font-display text-2xl font-normal text-ivory">Premium residential opportunities</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="eyebrow">Residential pathways</p>
          <h2 id="house-land-preview-title" className="mt-4 font-display text-3xl font-normal leading-tight sm:text-4xl">
            House &amp; Land Packages
          </h2>
          <p className="mt-5 max-w-2xl text-base font-light leading-8 text-graphite/80">
            Explore premium residential house and land opportunities across Sydney and New South Wales, supported
            by practical construction guidance and trusted project delivery.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {points.map(({ label, icon: Icon }, index) => (
              <motion.div
                key={label}
                className="flex items-center gap-3 border border-ink/10 bg-white px-4 py-4"
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.42, delay: reducedMotion ? 0 : index * 0.05, ease: 'easeOut' }}
              >
                <Icon className="text-gold" size={20} aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-graphite">{label}</span>
              </motion.div>
            ))}
          </div>

          <Link
            to="/house-and-land-packages/"
            className="focus-ring gold-gradient-btn mt-8 inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs font-bold uppercase"
          >
            Explore house &amp; land packages
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
