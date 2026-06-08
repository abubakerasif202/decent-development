import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import PageHero from '../components/PageHero.jsx'
import ProjectCard from '../components/projects/ProjectCard.jsx'
import projectDuplex from '../assets/stitch/project-duplex.png'
import { projects } from '../data/projects.js'
import usePageMeta from '../hooks/usePageMeta.js'

const filters = [
  ['all', 'All'],
  ['duplex', 'Duplex'],
  ['triplex', 'Triplex'],
  ['residential', 'Residential'],
]

function PortfolioVisual() {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className="relative mx-auto max-w-xl rounded-[2rem] border border-gold/20 bg-white/5 p-4 shadow-premium backdrop-blur-sm"
      style={{ transformStyle: 'preserve-3d' }}
      initial={reducedMotion ? false : { opacity: 0, y: 28, rotateY: -8 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      whileHover={reducedMotion ? undefined : { rotateY: -5, rotateX: 4, y: -6 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-ink">
        <img
          src={projectDuplex}
          alt="Premium duplex exterior"
          className="aspect-[4/5] h-full w-full object-cover"
          decoding="async"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/22 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-ivory backdrop-blur">
          Editorial selection
        </div>
        <div className="absolute bottom-5 left-5 right-5 space-y-3">
          <div className="max-w-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-soft">
              Duplex, triplex, and single dwellings
            </p>
            <h2 className="mt-2 font-display text-2xl font-normal text-ivory">Premium residential imagery</h2>
            <p className="mt-2 text-sm leading-6 text-smoke">
              A polished editorial frame that introduces the completed-projects portfolio with a darker, more
              luxurious presentation.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              { label: 'Duplex', value: '1' },
              { label: 'Triplex', value: '3' },
              { label: 'Residential', value: '2' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/35 px-3 py-3 backdrop-blur">
                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-smoke">{stat.label}</div>
                <div className="mt-1 text-sm font-semibold text-ivory">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const reducedMotion = useReducedMotion()

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
          <PortfolioVisual />
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
