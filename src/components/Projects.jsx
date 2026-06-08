import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, LayoutGrid, Mail, Users2 } from 'lucide-react'
import projectCommercial from '../assets/stitch/project-commercial.jpg'
import projectMultiuse from '../assets/stitch/project-multiuse.jpg'
import projectRenovation from '../assets/stitch/project-renovation.jpg'

const destinations = [
  {
    label: 'Portfolio',
    title: 'See completed projects presented with a premium finish',
    copy: 'Explore completed duplex, triplex, and residential developments organised by project type and Sydney suburb.',
    to: '/projects/',
    image: projectMultiuse,
    icon: LayoutGrid,
  },
  {
    label: 'Meet the team',
    title: 'Get to know the specialists who guide each build',
    copy: 'Learn more about the people behind the construction, project management, and delivery approach.',
    to: '/meet-the-team/',
    image: projectCommercial,
    icon: Users2,
  },
  {
    label: 'Contact',
    title: 'Start the conversation about your next project',
    copy: 'Reach out directly or use the form to discuss a duplex, triplex, or single dwelling in New South Wales.',
    to: '/contact/',
    image: projectRenovation,
    icon: Mail,
  },
]

function DestinationCard({ destination, index }) {
  const reducedMotion = useReducedMotion()
  const Icon = destination.icon

  return (
    <motion.article
      className="group relative isolate overflow-hidden rounded-[1.75rem] border border-ink/10 bg-ink shadow-[0_18px_38px_rgba(18,18,18,0.08)]"
      style={{ transformStyle: 'preserve-3d' }}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      whileHover={reducedMotion ? undefined : { rotateX: -4, rotateY: 5, y: -6 }}
      transition={{ duration: 0.55, delay: reducedMotion ? 0 : index * 0.06, ease: 'easeOut' }}
    >
      <div className="absolute inset-0">
        <img
          src={destination.image}
          alt={destination.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
          decoding="async"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/15" />
      </div>

      <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-between p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-ivory backdrop-blur">
            {destination.label}
          </div>
          <Icon size={18} className="text-gold" aria-hidden="true" />
        </div>

        <div className="max-w-sm">
          <h3 className="font-display text-2xl font-normal leading-tight text-ivory">{destination.title}</h3>
          <p className="mt-3 text-sm leading-6 text-smoke">{destination.copy}</p>
        </div>

        <Link
          to={destination.to}
          className="focus-ring inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-black/35 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-ivory backdrop-blur transition duration-200 hover:border-gold hover:text-gold"
        >
          Explore
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="bg-porcelain py-20 sm:py-28">
      <div className="section-shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Explore the next step</p>
            <h2 className="mt-4 font-display text-3xl font-normal leading-tight text-ink sm:text-4xl">
              Take a closer look at the work, the people, and the presentation
            </h2>
            <p className="mt-4 max-w-xl text-base font-light leading-7 text-graphite/80">
              The homepage now leads into completed residential projects, team profiles, and the contact journey
              with a cohesive premium tone.
            </p>
          </div>

          <Link
            to="/projects/"
            className="focus-ring inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-bronze transition hover:text-ink"
          >
            View portfolio
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {destinations.map((destination, index) => (
            <DestinationCard key={destination.label} destination={destination} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
