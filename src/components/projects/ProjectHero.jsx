import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import ProjectImage from './ProjectImage.jsx'

export default function ProjectHero({ project }) {
  return (
    <section className="relative isolate min-h-[82svh] overflow-hidden bg-ink pt-28 text-ivory sm:pt-32">
      <div className="absolute inset-0">
        <ProjectImage
          src={project.heroImage}
          alt={`${project.title} exterior project image`}
          placeholderTitle={project.title}
          placeholderSubtitle={project.address}
          placeholderLabel={project.type}
          className="h-full w-full object-cover"
          fallbackClassName="h-full min-h-[82svh]"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/52 to-black/15" />
      </div>

      <div className="section-shell relative z-10 flex min-h-[calc(82svh-7rem)] flex-col justify-end pb-14">
        <Link
          to="/projects/"
          className="focus-ring mb-10 inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-smoke transition hover:text-gold"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          All projects
        </Link>

        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-2">
            <span className="border border-gold/35 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gold backdrop-blur">
              {project.type}
            </span>
            <span className="border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-ivory backdrop-blur">
              {project.status}
            </span>
          </div>
          <h1 className="mt-6 font-display text-5xl font-normal leading-[0.95] text-ivory sm:text-7xl">
            {project.title}
          </h1>
          <p className="mt-5 text-base font-semibold leading-7 text-gold-soft">{project.address}</p>
          <p className="mt-6 max-w-2xl text-base font-light leading-8 text-smoke">{project.summary}</p>
          <Link
            to="/contact/"
            className="focus-ring gold-gradient-btn mt-8 inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs font-bold uppercase"
          >
            Discuss a similar project
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
