import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import heroBuilding from '../assets/stitch/hero-building.webp'

const heroTitleVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const heroTitleLineVariants = {
  hidden: {
    opacity: 0,
    y: 34,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function Hero({ company }) {
  const reducedMotion = useReducedMotion()

  return (
    <section id="home" className="relative isolate flex min-h-[760px] items-center overflow-hidden bg-ink lg:min-h-[870px]" aria-labelledby="hero-title">
      <motion.img
        src={heroBuilding}
        alt="Luxury residential development at sunset"
        className="hero-cinematic absolute inset-0 h-full w-full object-cover"
        decoding="async"
        fetchPriority="high"
        initial={reducedMotion ? false : { scale: 1.1 }}
        animate={reducedMotion ? undefined : { scale: 1 }}
        transition={{ duration: 10, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

      <div className="section-shell relative z-10 pt-24">
        <div className="max-w-3xl">
          <motion.h1
            id="hero-title"
            className="font-display text-5xl font-normal uppercase leading-[0.95] text-gold sm:text-7xl lg:text-8xl"
            initial={reducedMotion ? false : 'hidden'}
            animate={reducedMotion ? undefined : 'visible'}
            variants={heroTitleVariants}
          >
            <motion.span className="block" variants={heroTitleLineVariants}>
              Sydney{' '}
            </motion.span>
            <motion.span className="block" variants={heroTitleLineVariants}>
              Construction{' '}
            </motion.span>
            <motion.span className="block" variants={heroTitleLineVariants}>
              &amp; Property{' '}
            </motion.span>
            <motion.span className="block" variants={heroTitleLineVariants}>
              Development
            </motion.span>
          </motion.h1>
          <motion.div
            className="gold-divider mt-7 w-52"
            initial={reducedMotion ? false : { opacity: 0, scaleX: 0 }}
            animate={reducedMotion ? undefined : { opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.25, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'left' }}
          />
          <motion.blockquote
            className="mt-8 max-w-xl border-l border-gold/40 pl-5 text-base font-light italic leading-7 text-white/95 sm:text-lg"
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.68, ease: 'easeOut' }}
          >
            DECENT Development is a residential and commercial construction company based in North Sydney, NSW
            (Licence 476988C), focused on residential construction, property development, duplex and triplex builds,
            and project management across New South Wales.
          </motion.blockquote>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.62, ease: 'easeOut' }}
          >
            <Link
              to="/projects/"
              className="focus-ring gold-gradient-btn inline-flex min-h-12 items-center justify-center gap-2 px-7 py-3 text-xs font-bold uppercase"
            >
              View portfolio
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              to="/contact/"
              className="focus-ring outline-gold-btn inline-flex min-h-12 items-center justify-center px-7 py-3 text-xs font-bold uppercase"
            >
              Get in touch
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-10 right-5 hidden text-[10px] uppercase text-white/55 sm:right-12 md:block">
        North Sydney construction and development
      </div>
      <span className="sr-only">{company.name}</span>
    </section>
  )
}
