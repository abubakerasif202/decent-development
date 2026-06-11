import { motion, useReducedMotion } from 'framer-motion'
import { Building2, ClipboardCheck, Users } from 'lucide-react'

const members = [
  {
    name: 'Nemat Haidari',
    role: 'Specialist Project Manager',
    bio: 'Brings two decades of construction insight to disciplined project delivery.',
    assetKey: 'nemat',
    initials: 'NH',
  },
  {
    name: 'Mohammad Mohsini',
    role: 'Certified Builder & Specialist Project Manager',
    bio: 'Combines certified building expertise with a practical, client-focused approach.',
    assetKey: 'mohammad',
    initials: 'MM',
  },
  {
    name: 'Hussain Jafari',
    role: 'Home & Land Package Specialist',
    bio: 'Focuses on streamlined home-and-land package outcomes with a polished finish.',
    assetKey: 'hussain',
    initials: 'HJ',
  },
]

function TeamImage({ member, src }) {
  if (src) {
    return (
      <img
        src={src}
        alt={`${member.name}, ${member.role} at DECENT Development`}
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        decoding="async"
        loading="lazy"
      />
    )
  }

  return (
    <div className="project-blueprint flex h-full w-full items-center justify-center">
      <div className="grid h-24 w-24 place-items-center border border-gold/45 bg-gold/10 font-display text-3xl font-semibold text-gold">
        {member.initials}
      </div>
    </div>
  )
}

export default function Team({ assets }) {
  const reducedMotion = useReducedMotion()

  return (
    <section id="team" className="border-t border-brand-border bg-brand-bg py-16 text-brand-charcoal sm:py-20" aria-labelledby="team-title">
      <div className="section-shell">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <div className="mb-10 flex justify-center gap-10">
            <div className="flex flex-col items-center">
              <Building2 className="mb-3 text-brand-gold" size={26} aria-hidden="true" />
              <p className="text-[10px] font-bold uppercase text-brand-charcoal">Construction Services</p>
            </div>
            <div className="flex flex-col items-center">
              <ClipboardCheck className="mb-3 text-brand-gold" size={26} aria-hidden="true" />
              <p className="text-[10px] font-bold uppercase text-brand-charcoal">Project Management</p>
            </div>
          </div>
          <h2 id="team-title" className="font-display text-3xl font-normal leading-tight text-brand-charcoal sm:text-4xl">
            Specialist project managers and building professionals
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {members.map((member, index) => (
            <motion.article
              key={member.name}
              className={`group flex h-full flex-col border border-brand-border bg-brand-surface p-4 shadow-sm transition-all duration-300 hover:shadow-premium hover:-translate-y-1 hover:border-brand-gold ${index === 1 ? 'md:-translate-y-4 md:hover:-translate-y-5' : ''}`}
              initial={reducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.52, delay: reducedMotion ? 0 : index * 0.12, ease: 'easeOut' }}
            >
              <div className="aspect-[4/4.7] overflow-hidden bg-brand-bg rounded-lg">
                <TeamImage member={member} src={assets?.[member.assetKey]} />
              </div>
              <div className="flex flex-1 flex-col items-center px-2 py-6 text-center">
                <div className="mx-auto mb-4 inline-flex h-9 w-9 items-center justify-center border border-brand-gold/35 bg-brand-gold/10 text-brand-gold rounded-full">
                  <Users size={20} aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-normal text-brand-charcoal">{member.name}</h3>
                <p className="mt-2 min-h-10 max-w-[15rem] text-[11px] font-semibold uppercase leading-5 text-brand-muted">
                  {member.role}
                </p>
                <p className="mt-3 max-w-[15rem] text-sm leading-6 text-brand-muted">{member.bio}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
