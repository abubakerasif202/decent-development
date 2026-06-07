import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Home as HomeIcon, Sparkles } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import heroBuilding from '../assets/stitch/hero-building.jpg'
import projectCommercial from '../assets/stitch/project-commercial.jpg'
import projectMultiuse from '../assets/stitch/project-multiuse.jpg'
import projectResidential from '../assets/stitch/project-residential.jpg'
import projectRenovation from '../assets/stitch/project-renovation.jpg'

const attachedProjects = [
  {
    title: 'Duplex concept',
    location: 'Eastwood, NSW',
    type: 'Residential concept',
    copy: 'A refined attached-dwelling concept focused on elegance, street presence, and a balanced architectural form.',
  },
  {
    title: 'Townhouse concept',
    location: 'Auburn, NSW',
    type: 'Residential concept',
    copy: 'A polished multi-residential presentation that combines efficient planning with a premium visual finish.',
  },
  {
    title: 'Triplex concept',
    location: 'Canley Vale, NSW',
    type: 'Residential concept',
    copy: 'A bold triplex concept designed to communicate scale, quality, and a strong streetscape identity.',
  },
  {
    title: 'Duplex concept',
    location: 'Canley Heights, NSW',
    type: 'Residential concept',
    copy: 'A compact urban dual-occupancy concept with clean lines and a polished contemporary finish.',
  },
  {
    title: 'Duplex concept',
    location: 'Rouse Hill, NSW',
    type: 'Residential concept',
    copy: 'A modern family-focused duplex concept presented with a crisp architectural style.',
  },
  {
    title: 'Triplex concept',
    location: 'Canley Vale, NSW',
    type: 'Residential concept',
    copy: 'A considered infill concept demonstrating a smart three-dwelling arrangement with premium appeal.',
  },
]

const singleDwellings = [
  {
    title: 'Family home concept',
    location: 'Edmondson Park, NSW',
    type: 'Single dwelling',
    copy: 'A warm contemporary detached-home concept with an elevated façade and welcoming street appeal.',
  },
  {
    title: 'Urban home concept',
    location: 'Merrylands, NSW',
    type: 'Single dwelling',
    copy: 'A refined urban home concept that pairs practicality with a confident modern aesthetic.',
  },
  {
    title: 'Courtyard home concept',
    location: 'Greystanes, NSW',
    type: 'Single dwelling',
    copy: 'A compact courtyard home concept shaped to maximise natural light, privacy, and liveability.',
  },
]

function VisualCard({ image, title, copy, badge, stats, loading = 'lazy', fetchPriority }) {
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
          src={image}
          alt={title}
          className="aspect-[4/5] h-full w-full object-cover"
          decoding="async"
          loading={loading}
          fetchPriority={fetchPriority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-ivory backdrop-blur">
          {badge}
        </div>
        <div className="absolute bottom-5 left-5 right-5 space-y-3">
          <div className="max-w-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-soft">AI-generated render</p>
            <h2 className="mt-2 font-display text-2xl font-normal text-ivory">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-smoke">{copy}</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {stats.map((stat) => (
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

function ProjectCard({ project, index }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.article
      className="group h-full rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-[0_18px_38px_rgba(18,18,18,0.08)]"
      style={{ transformStyle: 'preserve-3d' }}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={reducedMotion ? undefined : { rotateX: -3, rotateY: 4, y: -6 }}
      transition={{ duration: 0.5, delay: reducedMotion ? 0 : index * 0.05, ease: 'easeOut' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-bronze">{project.type}</p>
          <h3 className="mt-2 font-display text-lg font-normal leading-snug text-ink">{project.title}</h3>
          <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-stone">{project.location}</p>
        </div>
        <CheckCircle2 className="shrink-0 text-gold" size={18} aria-hidden="true" />
      </div>
      <p className="mt-4 text-sm leading-6 text-graphite/75">{project.copy}</p>
      <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone">
        <HomeIcon size={14} aria-hidden="true" />
        Concept showcase
      </div>
    </motion.article>
  )
}

function ProjectSection({ id, eyebrow, title, copy, image, badge, stats, projects, reverse = false }) {
  const reducedMotion = useReducedMotion()
  const projectGridClass = projects.length > 3 ? 'sm:grid-cols-2 xl:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <section id={id} className="bg-porcelain py-16 text-ink sm:py-20">
      <div
        className={`section-shell grid gap-10 lg:items-center ${reverse ? 'lg:grid-cols-[1.04fr_0.96fr]' : 'lg:grid-cols-[0.96fr_1.04fr]'}`}
      >
        <motion.div
          className={reverse ? 'lg:order-2' : ''}
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-normal leading-tight text-ink sm:text-4xl">{title}</h2>
          <p className="mt-5 max-w-xl text-base font-light leading-7 text-graphite/80">{copy}</p>

          <div className={`mt-8 grid gap-4 ${projectGridClass}`}>
            {projects.map((project, index) => (
              <ProjectCard key={`${project.title}-${project.location}`} project={project} index={index} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className={`${reverse ? 'lg:order-1' : ''} [perspective:1800px]`}
          initial={reducedMotion ? false : { opacity: 0, y: 28, rotateY: reverse ? 8 : -8 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, rotateY: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          whileHover={reducedMotion ? undefined : { rotateY: reverse ? 4 : -4, rotateX: 3, y: -6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <VisualCard image={image} title={title} copy={copy} badge={badge} stats={stats} />
        </motion.div>
      </div>
    </section>
  )
}

export default function CompletedProjectsPage({ company }) {
  usePageMeta({
    title: 'Premium Dwelling Portfolio | DECENT Development',
    description:
      'Browse premium AI-generated concept showcases for attached duplexes, triplexes, single homes, commercial fit-outs, and heritage restoration in Sydney and NSW.',
    path: '/completed-projects/',
  })

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={
          <>
            Attached and single dwellings
            <br />
            presented as concept showcases
          </>
        }
        copy="This curated portfolio uses AI-generated concept imagery and sample project details to showcase the DECENT Development standard in a polished, client-ready format."
        stats={[
          { label: 'Attached concepts', value: '6' },
          { label: 'Single concepts', value: '3' },
          { label: 'Portfolio showcases', value: '9' },
        ]}
        visual={
          <VisualCard
            image={heroBuilding}
            title="Portfolio concept overview"
            copy="A cinematic portfolio presentation designed to communicate quality, scale, and delivery confidence."
            badge="AI-generated concept"
            loading="eager"
            fetchPriority="high"
            stats={[
              { label: 'Residential', value: '4' },
              { label: 'Commercial', value: '2' },
              { label: 'Heritage', value: '3' },
            ]}
          />
        }
      >
        <blockquote className="mb-6 border-l border-gold/40 pl-5 text-sm font-light italic leading-6 text-smoke">
          This portfolio showcases premium architectural design concepts for attached duplexes, triplexes, single-family dwellings, and commercial fit-outs. Each project represents the standard of craftsmanship and staging delivered by DECENT Development in NSW.
        </blockquote>

        <div className="flex flex-wrap gap-4">
          <a
            href="#attached-dwellings"
            className="focus-ring gold-gradient-btn inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs font-bold uppercase"
          >
            Attached dwellings
            <ArrowRight size={17} aria-hidden="true" />
          </a>
          <a
            href="#single-dwellings"
            className="focus-ring outline-gold-btn inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs font-bold uppercase"
          >
            Single dwellings
          </a>
          <Link
            to="/contact"
            className="focus-ring inline-flex min-h-12 items-center gap-2 border border-gold/30 px-6 py-3 text-xs font-bold uppercase text-ivory transition duration-200 hover:border-gold hover:text-gold"
          >
            Start a project
          </Link>
        </div>
        <p className="mt-4 max-w-2xl text-xs uppercase tracking-[0.24em] text-smoke">
          Imagery is illustrative only and uses AI-generated presentation renders.
        </p>
      </PageHero>

      <ProjectSection
        id="attached-dwellings"
        eyebrow="Attached dwellings"
        title="Duplex and triplex concept presentation"
        copy="The attached-dwelling showcase pairs elegant concept imagery with sample locations to reflect how DECENT Development presents premium multi-residential work."
        image={projectMultiuse}
        badge="AI concept"
        stats={[
          { label: 'Scope', value: 'Attached' },
          { label: 'Type', value: 'Duplex + triplex' },
          { label: 'Format', value: 'Concept' },
        ]}
        projects={attachedProjects}
      />

      <ProjectSection
        id="single-dwellings"
        eyebrow="Single dwellings"
        title="Free-standing home concept presentation"
        copy="The detached-home showcase uses AI-generated imagery and brochure-style copy to deliver a polished and memorable portfolio section."
        image={projectResidential}
        badge="AI concept"
        stats={[
          { label: 'Scope', value: 'Free-standing' },
          { label: 'Type', value: 'Single homes' },
          { label: 'Format', value: 'Concept' },
        ]}
        projects={singleDwellings}
        reverse
      />

      <section className="bg-porcelain py-16 text-ink sm:py-20">
        <div className="section-shell">
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.article
              className="overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-[0_18px_38px_rgba(18,18,18,0.08)]"
              initial={false}
            >
              <img
                src={projectCommercial}
                alt="AI-generated commercial concept render"
                className="h-72 w-full object-cover"
                decoding="async"
                loading="lazy"
              />
              <div className="p-6">
                <p className="eyebrow">Commercial fit-out</p>
                <h3 className="mt-3 font-display text-2xl font-normal text-ink">Workspace concept showcase</h3>
                <p className="mt-3 text-sm leading-6 text-graphite/75">
                  A polished presentation visual for office and retail environments, styled to feel high-end and
                  commercially confident.
                </p>
              </div>
            </motion.article>

            <motion.article
              className="overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-[0_18px_38px_rgba(18,18,18,0.08)]"
              initial={false}
            >
              <img
                src={projectRenovation}
                alt="AI-generated heritage concept render"
                className="h-72 w-full object-cover"
                decoding="async"
                loading="lazy"
              />
              <div className="p-6">
                <p className="eyebrow">Heritage renovation</p>
                <h3 className="mt-3 font-display text-2xl font-normal text-ink">Restoration concept showcase</h3>
                <p className="mt-3 text-sm leading-6 text-graphite/75">
                  A refined presentation image that rounds out the portfolio with a heritage-inspired finish.
                </p>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-ivory sm:py-20">
        <div className="section-shell">
          <motion.div
            className="relative overflow-hidden rounded-[2rem] border border-gold/18 bg-charcoal shadow-premium"
            initial={false}
          >
            <img
              src={projectRenovation}
              alt="Abstract AI-generated architectural artwork"
              className="absolute inset-0 h-full w-full object-cover opacity-35"
              decoding="async"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/35" />
            <div className="relative z-10 grid gap-8 p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
              <div>
                <p className="eyebrow text-gold">Next step</p>
                <h2 className="mt-3 max-w-2xl font-display text-3xl font-normal leading-tight text-ivory sm:text-4xl">
                  Planning a duplex, triplex, or single dwelling of your own?
                </h2>
                <p className="mt-4 max-w-xl text-sm font-light leading-7 text-smoke">
                  Talk to DECENT Development about your next Sydney project and keep the process clear, premium, and
                  professionally presented from first conversation through to completion.
                </p>
              </div>
              <Link
                to="/contact"
                className="focus-ring gold-gradient-btn inline-flex min-h-14 items-center justify-center gap-3 px-6 py-4 text-sm font-semibold uppercase"
              >
                Contact DECENT Development
                <Sparkles size={18} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <span className="sr-only">{company.name}</span>
    </>
  )
}
