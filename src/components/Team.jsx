import { motion, useReducedMotion } from 'framer-motion'
import { Users } from 'lucide-react'

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
    <section id="team" className="bg-porcelain py-20 text-ink sm:py-24" aria-labelledby="team-title">
      <div className="section-shell">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="eyebrow">Meet the Team</p>
          <h2 id="team-title" className="mt-4 font-display text-4xl font-semibold leading-[1.12] text-ink sm:text-5xl">
            Specialist Project Managers
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {members.map((member, index) => (
            <motion.article
              key={member.name}
              className="group border border-gold/20 bg-ivory shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-premium"
              initial={reducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.52, delay: reducedMotion ? 0 : index * 0.12, ease: 'easeOut' }}
            >
              <div className="aspect-[4/4.5] overflow-hidden border-b border-gold/20 bg-ink">
                <TeamImage member={member} src={assets?.[member.assetKey]} />
              </div>
              <div className="p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center border border-gold/35 bg-gold/10 text-gold">
                  <Users size={20} aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-ink">{member.name}</h3>
                <p className="mt-2 text-sm font-semibold uppercase text-bronze" style={{ letterSpacing: '0.14em' }}>
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
