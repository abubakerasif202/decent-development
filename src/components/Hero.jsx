import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import heroBuilding from '../assets/stitch/hero-building.jpg'

export default function Hero({ company }) {
  const reducedMotion = useReducedMotion()

  return (
    <section id="home" className="relative isolate flex min-h-[760px] items-center overflow-hidden bg-ink lg:min-h-[870px]" aria-labelledby="hero-title">
      <img
        src={heroBuilding}
        alt="Luxury residential development at sunset"
        className="absolute inset-0 h-full w-full object-cover"
        decoding="async"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      <div className="section-shell relative z-10 pt-24">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <h1
            id="hero-title"
            className="font-display text-6xl font-normal uppercase leading-[0.95] text-gold sm:text-7xl lg:text-8xl"
          >
            Building
            <br />
            Better
            <br />
            Futures
          </h1>
          <p className="mt-8 max-w-xl text-base font-light leading-7 text-white/90 sm:text-lg">
            Premium construction and development solutions delivered with precision,
            accountability, and long-term value.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="focus-ring gold-gradient-btn inline-flex min-h-12 items-center justify-center gap-2 px-7 py-3 text-xs font-bold uppercase"
            >
              Get a Quote
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              href="#about"
              className="focus-ring outline-gold-btn inline-flex min-h-12 items-center justify-center px-7 py-3 text-xs font-bold uppercase"
            >
              Our Story
            </a>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-10 right-5 hidden text-[10px] uppercase text-white/55 sm:right-12 md:block">
        North Sydney construction and development
      </div>
      <span className="sr-only">{company.name}</span>
    </section>
  )
}
