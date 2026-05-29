import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const projects = [
  {
    title: 'Residential Development',
    copy: 'Contemporary residential delivery with a focus on planning clarity, quality finishes, and long-term owner value.',
  },
  {
    title: 'Commercial Fit-out',
    copy: 'Efficient commercial fit-out coordination designed to reduce disruption and keep handover milestones clear.',
  },
  {
    title: 'Multi-unit Development',
    copy: 'Multi-dwelling project delivery supported by structured sequencing, consultant coordination, and site control.',
  },
  {
    title: 'Renovation Project',
    copy: 'Targeted renovations and extensions planned around existing structures, client priorities, and liveability gains.',
  },
]

export default function Projects() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="projects" className="bg-ink py-20 text-ivory sm:py-24" aria-labelledby="projects-title">
      <div className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <p className="eyebrow">Projects</p>
            <h2 id="projects-title" className="mt-4 font-display text-4xl font-semibold leading-[1.12] sm:text-5xl">
              Premium project capability across key property sectors.
            </h2>
          </motion.div>
          <p className="max-w-2xl text-base leading-7 text-smoke lg:justify-self-end">
            Project examples are structured as premium placeholders so completed
            development photography can be added without changing the page layout.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {projects.map(({ title, copy }, index) => (
            <motion.article
              key={title}
              className="group overflow-hidden border border-gold/15 bg-ivory/[0.045]"
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: reducedMotion ? 0 : index * 0.05, ease: 'easeOut' }}
            >
              <div className="project-blueprint relative aspect-[16/10] overflow-hidden">
                <div className="absolute inset-0 transition duration-300 group-hover:scale-105">
                  <div className="absolute left-6 top-6 h-20 w-20 border-l border-t border-gold/60" />
                  <div className="absolute bottom-6 right-6 h-20 w-20 border-b border-r border-gold/60" />
                  <div className="absolute left-1/2 top-0 h-full w-px bg-ivory/10" />
                  <div className="absolute left-0 top-1/2 h-px w-full bg-ivory/10" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-ivory">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-smoke">{copy}</p>
                <a
                  href="#contact"
                  className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors duration-200 hover:text-gold-soft"
                >
                  Discuss a similar project
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
