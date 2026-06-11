import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Building2, FileBadge2, Users2 } from 'lucide-react'
import hzHomesLogo from '../assets/collaboration/hz-homes.png'
import jufajaHomesLogo from '../assets/collaboration/jufaja-homes.png'
import milestoneDevelopmentLogo from '../assets/collaboration/milestone-live/logo.svg'

const collaborators = [
  {
    name: 'H & Z Homes Pty Ltd',
    logo: hzHomesLogo,
    logoAlt: 'H & Z Homes logo',
    details: ['Licence 376134C', 'ACN 652 322 739', 'Collaborative delivery partner'],
    surface: 'bg-white',
  },
  {
    name: 'JUFAJA Homes Pty Ltd',
    logo: jufajaHomesLogo,
    logoAlt: 'JUFAJA Homes logo',
    details: ['Licence 346427C', 'ACN 636 488 910', 'Collaborative delivery partner'],
    surface: 'bg-black',
  },
  {
    name: 'Milestone Development',
    logo: milestoneDevelopmentLogo,
    logoAlt: 'Milestone Development logo',
    description:
      'A certified-builder-led construction and property development partner supporting projects from early planning through construction and handover.',
    details: ['10+ years of construction experience', 'Residential, commercial and industrial delivery', 'Design and construct, renovations and project management'],
    surface: 'bg-neutral-950',
    href: 'https://milestonedevelopment.com.au/',
  },
]

function CollaboratorCard({ collaborator, index }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.article
      className="flex h-full flex-col overflow-hidden border border-brand-border bg-brand-surface shadow-sm rounded-xl transition duration-300 hover:border-brand-gold hover:shadow-premium hover:-translate-y-1"
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.5, delay: reducedMotion ? 0 : index * 0.06, ease: 'easeOut' }}
    >
      <div className={`flex min-h-56 items-center justify-center p-6 ${collaborator.surface}`}>
        {collaborator.logo ? (
          <img
            src={collaborator.logo}
            alt={collaborator.logoAlt}
            className="max-h-44 w-full max-w-[300px] object-contain drop-shadow-[0_0_24px_rgba(240,219,117,0.16)]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-40 w-full max-w-[240px] flex-col items-center justify-center rounded-[1.5rem] border border-brand-gold/30 bg-neutral-900 text-center p-4">
            <Building2 className="text-brand-gold" size={42} aria-hidden="true" />
            <p className="mt-4 max-w-[14rem] font-display text-2xl font-normal leading-tight text-white">
              Milestone Construction and Development
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 text-brand-charcoal">
        <h3 className="font-display text-2xl font-normal leading-tight text-brand-charcoal">{collaborator.name}</h3>
        {collaborator.description && (
          <p className="mt-3 text-sm leading-6 text-brand-muted">{collaborator.description}</p>
        )}
        <div className="mt-5 space-y-3 text-sm leading-6 text-brand-muted">
          {collaborator.details.map((detail, index) => {
            const Icon = index === 0 ? FileBadge2 : index === 1 ? Users2 : Building2

            return (
              <p key={detail} className="flex items-start gap-2">
                <Icon className="mt-0.5 shrink-0 text-brand-gold" size={16} aria-hidden="true" />
                <span>{detail}</span>
              </p>
            )
          })}
        </div>
        {collaborator.href && (
          <a
            href={collaborator.href}
            target="_blank"
            rel="noreferrer"
            className="focus-ring mt-6 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold transition hover:text-brand-charcoal"
          >
            Visit Milestone Development
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.article>
  )
}

export default function Collaboration() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="bg-brand-bg py-16 text-brand-charcoal sm:py-20" aria-labelledby="collaboration-title">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <p className="eyebrow text-brand-gold">Collaboration</p>
            <h2 id="collaboration-title" className="mt-4 font-display text-3xl font-normal leading-tight text-brand-charcoal sm:text-4xl">
              Shared expertise for larger, more complex projects
            </h2>
            <p className="mt-5 max-w-xl text-base font-light leading-7 text-brand-muted">
              DECENT Development collaborates with trusted building companies when a project needs more capacity,
              broader technical coordination, or specialist delivery support. Together we can handle larger and more
              complicated residential projects with clarity and confidence.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="border border-brand-border bg-brand-surface p-4 rounded-lg shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-muted">Completed projects</p>
                <p className="mt-2 font-display text-3xl font-normal text-brand-gold">28+</p>
              </div>
              <div className="border border-brand-border bg-brand-surface p-4 rounded-lg shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-muted">Scope</p>
                <p className="mt-2 font-display text-3xl font-normal text-brand-gold">Multi-party</p>
              </div>
              <div className="border border-brand-border bg-brand-surface p-4 rounded-lg shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-muted">Outcome</p>
                <p className="mt-2 font-display text-3xl font-normal text-brand-gold">Bigger builds</p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6">
            {collaborators.map((collaborator, index) => (
              <CollaboratorCard key={collaborator.name} collaborator={collaborator} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
