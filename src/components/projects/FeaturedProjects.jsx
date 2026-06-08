import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { projects } from '../../data/projects.js'
import ProjectCard from './ProjectCard.jsx'

const leadProject = projects.find((project) => project.slug === 'canley-vale-triplex-development-24-the-avenue')
const secondaryProjects = projects.filter((project) =>
  ['auburn-duplex-development', 'rouse-hill-duplex-development'].includes(project.slug),
)
const remainingProjects = projects.filter(
  (project) => ![leadProject?.slug, ...secondaryProjects.map((item) => item.slug)].includes(project.slug),
)

export default function FeaturedProjects() {
  return (
    <section id="recently-completed" className="bg-ink py-20 text-ivory sm:py-28">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow">Recently Completed</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-normal leading-tight text-ivory sm:text-5xl">
              Built Across Sydney's Growing Communities
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-base font-light leading-8 text-smoke">
              From duplex developments to multi-residential triplex projects, Decent Development delivers carefully
              planned homes with strong street presence, quality finishes and long-term value.
            </p>
            <Link
              to="/projects/"
              className="focus-ring mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-gold transition hover:text-gold-soft"
            >
              View all projects
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-6">
          {leadProject ? <ProjectCard project={leadProject} featured /> : null}

          <div className="grid gap-6 lg:grid-cols-2">
            {secondaryProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {remainingProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
