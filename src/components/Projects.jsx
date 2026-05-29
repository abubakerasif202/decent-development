import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import projectCommercial from '../assets/stitch/project-commercial.jpg'
import projectMultiuse from '../assets/stitch/project-multiuse.jpg'
import projectRenovation from '../assets/stitch/project-renovation.jpg'
import projectResidential from '../assets/stitch/project-residential.jpg'

const projects = [
  {
    title: 'Residential Development',
    copy: 'Contemporary residential delivery with a focus on planning clarity, quality finishes, and long-term owner value.',
    image: projectResidential,
  },
  {
    title: 'Commercial Fit-out',
    copy: 'Efficient commercial fit-out coordination designed to reduce disruption and keep handover milestones clear.',
    image: projectCommercial,
  },
  {
    title: 'Multi-unit Development',
    copy: 'Multi-dwelling project delivery supported by structured sequencing, consultant coordination, and site control.',
    image: projectMultiuse,
  },
  {
    title: 'Renovation Project',
    copy: 'Targeted renovations and extensions planned around existing structures, client priorities, and liveability gains.',
    image: projectRenovation,
  },
]

export default function Projects() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="projects" className="bg-porcelain py-16 text-ink sm:py-20" aria-labelledby="projects-title">
      <div className="section-shell">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reducedMotion ? false : { opacity: 1, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <h2 id="projects-title" className="font-display text-3xl font-normal leading-tight sm:text-4xl">
            Premium project capability across
            <br />
            key property sectors
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {projects.map(({ title, copy, image }, index) => (
            <motion.article
              key={title}
              className="group"
              initial={reducedMotion ? false : { opacity: 1, y: 24 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: reducedMotion ? 0 : index * 0.05, ease: 'easeOut' }}
            >
              <div className="relative mb-6 aspect-[16/9] overflow-hidden bg-stone/20">
                <img
                  src={image}
                  alt={`${title} example`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="eager"
                  decoding="async"
                />
                <a
                  href="#contact"
                  className="focus-ring absolute inset-0 flex items-center justify-center bg-gold/85 opacity-0 transition duration-300 group-hover:opacity-100"
                >
                  <span className="border border-white px-6 py-2 text-xs font-semibold uppercase text-white">
                    Discuss Project
                  </span>
                </a>
              </div>
              <h3 className="font-display text-xl font-normal text-ink">{title}</h3>
              <p className="mt-2 max-w-md text-sm font-light leading-6 text-graphite/70">{copy}</p>
              <a
                href="#contact"
                className="focus-ring mt-4 inline-flex items-center gap-2 text-sm font-semibold text-bronze transition-colors duration-200 hover:text-ink"
              >
                Discuss a similar project
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
