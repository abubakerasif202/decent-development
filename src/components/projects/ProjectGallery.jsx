import { motion, useReducedMotion } from 'framer-motion'
import ProjectImage from './ProjectImage.jsx'

export default function ProjectGallery({ project }) {
  const reducedMotion = useReducedMotion()
  const shots = project.shots || []

  return (
    <section className="bg-brand-bg py-16 text-brand-charcoal sm:py-20">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="eyebrow text-brand-gold">Gallery</p>
          <h2 className="mt-4 font-display text-3xl font-normal leading-tight text-brand-charcoal sm:text-4xl">
            Project gallery
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shots.map((shot, index) => (
            <motion.figure
              key={shot.key}
              className={`group overflow-hidden border border-brand-border bg-brand-surface shadow-sm rounded-xl transition duration-300 hover:border-brand-gold hover:shadow-premium ${
                index === 0 ? 'md:col-span-2 lg:col-span-2 lg:row-span-2' : ''
              }`}
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: reducedMotion ? 0 : index * 0.04 }}
            >
              <ProjectImage
                src={shot.src}
                alt={shot.alt}
                placeholderTitle={shot.placeholderTitle}
                placeholderSubtitle={shot.placeholderSubtitle}
                placeholderLabel={shot.placeholderLabel}
                className={`w-full object-cover transition duration-700 group-hover:scale-[1.045] rounded-t-xl ${
                  index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'
                }`}
                fallbackClassName={index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}
              />
              <figcaption className="border-t border-brand-border bg-brand-surface px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-muted">
                {shot.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
