import { motion, useReducedMotion } from 'framer-motion'
import { Building2, ClipboardCheck, Users } from 'lucide-react'

const members = [
  { name: 'Nemat Haidari', role: 'Project Manager', assetKey: 'nemat', initials: 'NH' },
  { name: 'Mohammad Mohsini', role: 'Project Manager', assetKey: 'mohammad', initials: 'MM' },
  { name: 'Hussain Jafari', role: 'Project Manager', assetKey: 'hussain', initials: 'HJ' },
]

function TeamImage({ member, src }) {
  if (src) {
    return (
      <img
        src={src}
        alt={`${member.name}, ${member.role} at DECENT Development`}
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        decoding="async"
        loading="eager"
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
    <section id="team" className="border-t border-ink/10 bg-porcelain py-16 text-ink sm:py-20" aria-labelledby="team-title">
      <div className="section-shell">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reducedMotion ? false : { opacity: 1, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <div className="mb-10 flex justify-center gap-10">
            <div className="flex flex-col items-center">
              <Building2 className="mb-3 text-gold" size={26} aria-hidden="true" />
              <p className="text-[10px] font-bold uppercase text-graphite">Construction Services</p>
            </div>
            <div className="flex flex-col items-center">
              <ClipboardCheck className="mb-3 text-gold" size={26} aria-hidden="true" />
              <p className="text-[10px] font-bold uppercase text-graphite">Project Management</p>
            </div>
          </div>
          <h2 id="team-title" className="font-display text-3xl font-normal leading-tight text-ink sm:text-4xl">
            Specialist Project Managers
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {members.map((member, index) => (
            <motion.article
              key={member.name}
              className={`group border border-black/5 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-premium ${index === 1 ? 'md:-translate-y-4 md:hover:-translate-y-5' : ''}`}
              initial={reducedMotion ? false : { opacity: 1, y: 28 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.52, delay: reducedMotion ? 0 : index * 0.12, ease: 'easeOut' }}
            >
              <div className="aspect-[4/4.7] overflow-hidden bg-ink">
                <TeamImage member={member} src={assets?.[member.assetKey]} />
              </div>
              <div className="px-2 py-6 text-center">
                <div className="mx-auto mb-4 inline-flex h-9 w-9 items-center justify-center border border-gold/35 bg-gold/10 text-gold">
                  <Users size={20} aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-normal text-ink">{member.name}</h3>
                <p className="mt-2 text-xs font-semibold uppercase text-stone">
                  {member.role}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
