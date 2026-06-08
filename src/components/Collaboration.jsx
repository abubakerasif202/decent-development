import { motion, useReducedMotion } from 'framer-motion'
import { Building2, FileBadge2, Users2 } from 'lucide-react'
import hzHomesLogo from '../assets/collaboration/hz-homes.png'
import milestoneDevelopmentLogo from '../assets/collaboration/milestone-live/logo.svg'
import jufajaHomesLogo from '../assets/collaboration/jufaja-homes.png'

const collaborators = [
  {
    name: 'H & Z Homes Pty Ltd',
    logo: hzHomesLogo,
    logoAlt: 'H & Z Homes logo',
    details: ['Licence 376134C', 'ACN 652 322 739', '15 years of experience'],
    surface: 'bg-white',
  },
  {
    name: 'JUFAJA Homes Pty Ltd',
    logo: jufajaHomesLogo,
    logoAlt: 'JUFAJA Homes logo',
    details: ['Licence 346427C', 'ACN 636 488 910', '12 years of experience'],
    surface: 'bg-black',
  },
  {
    name: 'Milestone Construction and Development Pty Ltd',
    logo: milestoneDevelopmentLogo,
    logoAlt: 'Milestone Development logo',
    details: ['ACN 697 166 715', 'Collaborative delivery partner', 'For larger and more complicated projects'],
    surface: 'bg-charcoal',
  },
]

function CollaboratorCard({ collaborator, index }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.article
      className="flex h-full flex-col overflow-hidden border border-white/10 bg-white/6 shadow-[0_20px_42px_rgba(0,0,0,0.24)]"
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
          <div className="flex h-40 w-full max-w-[240px] flex-col items-center justify-center rounded-[1.5rem] border border-gold/20 bg-black/20 text-center">
            <Building2 className="text-gold" size={42} aria-hidden="true" />
            <p className="mt-4 max-w-[14rem] font-display text-2xl font-normal leading-tight text-ivory">
              Milestone Construction and Development
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 text-ivory">
        <h3 className="font-display text-2xl font-normal leading-tight text-ivory">{collaborator.name}</h3>
        <div className="mt-5 space-y-3 text-sm leading-6 text-smoke">
          {collaborator.details.map((detail, index) => {
            const Icon = index === 0 ? FileBadge2 : index === 1 ? Users2 : Building2

            return (
              <p key={detail} className="flex items-start gap-2">
                <Icon className="mt-0.5 shrink-0 text-gold" size={16} aria-hidden="true" />
                <span>{detail}</span>
              </p>
            )
          })}
        </div>
      </div>
    </motion.article>
  )
}

export default function Collaboration() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="bg-ink py-16 text-ivory sm:py-20" aria-labelledby="collaboration-title">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <p className="eyebrow text-gold">Collaboration</p>
            <h2 id="collaboration-title" className="mt-4 font-display text-3xl font-normal leading-tight sm:text-4xl">
              Shared expertise for larger, more complex projects
            </h2>
            <p className="mt-5 max-w-xl text-base font-light leading-7 text-smoke">
              DECENT Development collaborates with trusted building companies when a project needs more capacity,
              broader technical coordination, or specialist delivery support. Together we can handle larger and more
              complicated residential projects with clarity and confidence.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="border border-gold/20 bg-white/5 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-smoke">Completed projects</p>
                <p className="mt-2 font-display text-3xl font-normal text-ivory">28+</p>
              </div>
              <div className="border border-gold/20 bg-white/5 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-smoke">Scope</p>
                <p className="mt-2 font-display text-3xl font-normal text-ivory">Multi-party</p>
              </div>
              <div className="border border-gold/20 bg-white/5 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-smoke">Outcome</p>
                <p className="mt-2 font-display text-3xl font-normal text-ivory">Bigger builds</p>
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
