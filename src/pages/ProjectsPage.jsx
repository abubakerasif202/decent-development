import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import PageHero from '../components/PageHero.jsx'
import ProjectCard from '../components/projects/ProjectCard.jsx'
import ProjectImage from '../components/projects/ProjectImage.jsx'
import { projects } from '../data/projects.js'
import usePageMeta from '../hooks/usePageMeta.js'

const filters = [
  ['all', 'All'],
  ['duplex', 'Duplex'],
  ['triplex', 'Triplex'],
  ['residential', 'Residential'],
]

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const reducedMotion = useReducedMotion()
  const heroProject = projects.find((project) => project.slug === 'canley-vale-triplex-development-24-the-avenue') ?? projects[0]

  usePageMeta({
    title: 'Completed Projects | Decent Development Sydney',
    description:
      'Explore completed duplex, triplex and residential development projects by Decent Development across Auburn, Rouse Hill, Canley Vale, Canley Heights and Regents Park.',
    path: '/projects/',
  })

  const visibleProjects = useMemo(
    () =>
      activeFilter === 'all'
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  )

  return (
    <>
      <PageHero
        eyebrow="Our Projects"
        title="Recently Completed Projects"
        copy="Explore completed residential projects by Decent Development across Sydney's established and growing communities, including duplex development Sydney, triplex development Sydney and quality residential construction Sydney."
        stats={[
          { label: 'Projects', value: `${projects.length}` },
          { label: 'Focus', value: 'Residential' },
          { label: 'Region', value: 'Sydney NSW' },
        ]}
        visual={
          <div className="overflow-hidden border border-gold/20 bg-charcoal p-3 shadow-premium">
            <ProjectImage
              src={heroProject.heroImage}
              alt={`${heroProject.title} completed residential project`}
              className="aspect-[4/5] w-full object-cover"
              fallbackClassName="aspect-[4/5]"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        }
      >
        <p className="max-w-2xl text-sm leading-7 text-smoke">
          As a Sydney property developer and construction and property development NSW team, Decent Development keeps
          project presentation clear, specific and grounded in completed exterior work.
        </p>
      </PageHero>

      <section className="bg-porcelain py-16 text-ink sm:py-20">
        <div className="section-shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Project Index</p>
              <h2 className="mt-4 font-display text-3xl font-normal leading-tight text-ink sm:text-4xl">
                Duplex, triplex and residential developments
              </h2>
            </div>

            <div className="flex flex-wrap gap-2" aria-label="Project filters">
              {filters.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={`focus-ring min-h-11 border px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition ${
                    activeFilter === value
                      ? 'border-ink bg-ink text-ivory'
                      : 'border-ink/15 bg-white text-graphite hover:border-gold hover:text-bronze'
                  }`}
                  onClick={() => setActiveFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={reducedMotion ? undefined : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
