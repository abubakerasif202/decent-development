import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { featuredProjects } from '../data/projects.js'
import ProjectCard from './projects/ProjectCard.jsx'

const featuredOrder = [
  '10-dorian-street-rouse-hill',
  '24-the-avenue-canley-vale',
  '34-antwerp-street-auburn',
]

export default function FeaturedDevelopments() {
  const projects = featuredOrder
    .map((slug) => featuredProjects.find((project) => project.slug === slug))
    .filter(Boolean)

  return (
    <section className="bg-ink py-20 text-ivory sm:py-28" aria-labelledby="featured-developments-title">
      <div className="section-shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold">Recently Completed Work</p>
            <h2
              id="featured-developments-title"
              className="mt-4 font-display text-3xl font-normal leading-tight text-ivory sm:text-4xl"
            >
              Recent residential projects delivered across Sydney
            </h2>
            <p className="mt-4 max-w-xl text-base font-light leading-7 text-smoke">
              Recent work includes the 10 Dorian Street duplex in Rouse Hill, the 24 The Avenue triplex in Canley
              Vale, and the 34 Antwerp Street duplex in Auburn. Explore these projects and more from a growing
              portfolio of 28+ completed developments.
            </p>
          </div>

          <Link
            to="/projects/"
            className="focus-ring inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-gold transition hover:text-gold-soft"
          >
            View portfolio
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
