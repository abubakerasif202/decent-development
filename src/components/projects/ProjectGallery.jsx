import { motion, useReducedMotion } from 'framer-motion'
import ProjectImage from './ProjectImage.jsx'

export default function ProjectGallery({ project }) {
  const reducedMotion = useReducedMotion()
  const shots = project.shots || []

  return (
    <section className="bg-porcelain py-16 text-ink sm:py-20">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="eyebrow">Gallery</p>
          <h2 className="mt-4 font-display text-3xl font-normal leading-tight text-ink sm:text-4xl">
            Five-shot project gallery
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shots.map((shot, index) => (
            <motion.figure
              key={shot.key}
              className={`group overflow-hidden border border-ink/10 bg-white shadow-[0_16px_34px_rgba(18,18,18,0.08)] ${
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
                className={`w-full object-cover transition duration-700 group-hover:scale-[1.045] ${
                  index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'
                }`}
                fallbackClassName={index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}
              />
              <figcaption className="border-t border-ink/10 bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-stone">
                {shot.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
