import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import ProjectGallery from '../components/projects/ProjectGallery.jsx'
import ProjectHero from '../components/projects/ProjectHero.jsx'
import ProjectStats from '../components/projects/ProjectStats.jsx'
import { getProjectBySlug } from '../data/projects.js'
import usePageMeta from '../hooks/usePageMeta.js'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  const detailSchemas = project
    ? [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://decentdevelopment.com.au/',
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Completed Projects',
              'item': 'https://decentdevelopment.com.au/projects/',
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': project.title,
              'item': `https://decentdevelopment.com.au/projects/${project.slug}/`,
            },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          'name': project.title,
          'description': project.story,
          'url': `https://decentdevelopment.com.au/projects/${project.slug}/`,
          'about': project.type,
          'spatialCoverage': {
            '@type': 'Place',
            'name': project.address,
            'address': project.address,
          },
          'provider': {
            '@type': 'Organization',
            'name': 'DECENT Development',
            'url': 'https://decentdevelopment.com.au/',
          },
        },
      ]
    : []

  usePageMeta({
    title: project ? project.seoTitle : 'Project Not Found | Decent Development Sydney',
    description: project
      ? project.seoDescription
      : 'The requested Decent Development project could not be found.',
    path: project ? `/projects/${project.slug}/` : '/projects/',
    schemas: detailSchemas,
  })

  if (!project) {
    return <Navigate to="/projects/" replace />
  }

  return (
    <>
      <ProjectHero project={project} />

      <section className="bg-ink py-16 text-ivory sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <aside>
            <ProjectStats project={project} />
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-gold/18 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-soft"
                >
                  {tag}
                </span>
              ))}
            </div>
          </aside>

          <div>
            <p className="eyebrow">Project Story</p>
            <h2 className="mt-4 font-display text-3xl font-normal leading-tight text-ivory sm:text-4xl">
              Completed residential construction with refined street presence
            </h2>
            <p className="mt-6 text-base font-light leading-8 text-smoke">{project.story}</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {project.features.map((highlight) => (
                <div key={highlight} className="flex gap-3 border border-gold/16 bg-white/5 p-4">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-gold" size={18} aria-hidden="true" />
                  <span className="text-sm leading-6 text-smoke">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProjectGallery project={project} />

      <section className="bg-charcoal py-16 text-ivory sm:py-20">
        <div className="section-shell">
          <div className="grid gap-8 border border-gold/18 bg-ink p-8 shadow-premium lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
            <div>
              <p className="eyebrow">Planning your next development?</p>
              <h2 className="mt-4 max-w-2xl font-display text-3xl font-normal leading-tight text-ivory sm:text-4xl">
                Talk to Decent Development about a duplex, triplex or residential development in Sydney.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                to="/contact/"
                className="focus-ring gold-gradient-btn inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase"
              >
                Contact Decent Development
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="focus-ring outline-gold-btn inline-flex min-h-12 items-center justify-center px-6 py-3 text-xs font-bold uppercase"
              >
                Open in Google Maps
              </a>
              <Link
                to="/projects/"
                className="focus-ring outline-gold-btn inline-flex min-h-12 items-center justify-center px-6 py-3 text-xs font-bold uppercase"
              >
                View All Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
