import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import ProjectImage from './ProjectImage.jsx'

export default function ProjectCard({ project, index = 0, featured = false }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.article
      className={`group flex h-full flex-col overflow-hidden border border-brand-border bg-brand-surface shadow-sm transition-all duration-300 hover:shadow-premium hover:-translate-y-1 hover:border-brand-gold ${
        featured ? 'lg:grid lg:grid-cols-[1.1fr_0.9fr]' : ''
      }`}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.52, delay: reducedMotion ? 0 : index * 0.05, ease: 'easeOut' }}
    >
      <Link to={`/projects/${project.slug}/`} className="focus-ring block overflow-hidden bg-brand-bg">
        <ProjectImage
          src={project.thumbnailImage || project.heroImage}
          alt={`${project.title} exterior at ${project.suburb}`}
          placeholderTitle={project.title}
          placeholderSubtitle={`${project.address} • ${project.type}`}
          placeholderLabel={project.status}
          className={`w-full object-cover transition duration-700 group-hover:scale-[1.055] ${
            featured ? 'h-full min-h-[360px] lg:min-h-[520px]' : 'aspect-[4/3]'
          }`}
          fallbackClassName={featured ? 'min-h-[360px] lg:min-h-[520px]' : 'aspect-[4/3]'}
        />
      </Link>

      <div className={`flex flex-1 flex-col p-6 ${featured ? 'justify-end lg:p-8' : ''}`}>
        <div className="flex flex-wrap gap-2">
          <span className="border border-brand-gold/30 bg-brand-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
            {project.type}
          </span>
          <span className="border border-brand-border bg-brand-bg px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-charcoal">
            {project.status}
          </span>
        </div>

        <p className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-muted">
          <MapPin size={14} aria-hidden="true" />
          {project.suburb}
        </p>
        <h3 className="mt-3 font-display text-2xl font-normal leading-tight text-brand-charcoal">{project.title}</h3>
        <p className="mt-2 text-sm font-semibold leading-6 text-brand-charcoal">{project.address}</p>
        <p className="mt-4 flex-1 text-sm font-light leading-7 text-brand-muted">
          {project.shortDescription || project.summary}
        </p>

        <Link
          to={`/projects/${project.slug}/`}
          className="focus-ring mt-6 inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-gold transition hover:text-brand-charcoal"
        >
          View Project
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  )
}
