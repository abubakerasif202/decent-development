import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'

const navItems = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Services', '#services'],
  ['Projects', '#projects'],
  ['Team', '#team'],
  ['Contact', '#contact'],
]

function BrandMark({ company }) {
  return (
    <span className="flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center border-2 border-gold bg-ink/25 font-display text-xl font-bold text-ivory">
        D
      </span>
      <span className="leading-none">
        <span className="block text-sm font-bold uppercase text-ivory">DECENT</span>
        <span className="block text-[10px] font-semibold uppercase text-smoke">Development</span>
      </span>
      <span className="sr-only">{company.name}</span>
    </span>
  )
}

export default function Header({ company }) {
  const [open, setOpen] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const closeOnWideScreen = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }

    window.addEventListener('resize', closeOnWideScreen)
    return () => window.removeEventListener('resize', closeOnWideScreen)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="absolute left-0 top-0 z-50 w-full bg-transparent px-0 py-4 sm:py-6">
      <div className="section-shell">
        <div className="flex items-center justify-between gap-4">
          <a href="#home" className="focus-ring rounded-sm" aria-label={`${company.name} home`}>
            <BrandMark company={company} />
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="focus-ring rounded-sm text-xs font-semibold uppercase text-ivory transition-colors duration-200 hover:text-gold"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#contact"
              className="focus-ring gold-gradient-btn inline-flex min-h-11 items-center gap-2 px-5 py-3 text-xs font-bold uppercase"
            >
              Get a Quote
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>

          <button
            type="button"
            className="focus-ring inline-flex min-h-11 min-w-11 items-center justify-center border border-gold/45 bg-ink/40 text-ivory transition-colors duration-200 hover:border-gold hover:text-gold md:hidden"
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              id="mobile-menu"
              className="fixed inset-0 z-[60] flex flex-col bg-ink px-5 py-6 md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={reducedMotion ? false : { opacity: 0, y: -18 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -18 }}
              transition={{ duration: reducedMotion ? 0.01 : 0.28, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between gap-4">
                <BrandMark company={company} />
                <button
                  type="button"
                  className="focus-ring inline-flex min-h-11 min-w-11 items-center justify-center border border-gold/25 text-ivory"
                  aria-label="Close navigation menu"
                  onClick={() => setOpen(false)}
                >
                  <X size={22} aria-hidden="true" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col items-center justify-center gap-7" aria-label="Mobile navigation">
                {navItems.map(([label, href], index) => (
                  <motion.a
                    key={label}
                    href={href}
                    className="focus-ring rounded-sm font-display text-4xl font-semibold text-smoke transition-colors duration-200 hover:text-gold"
                    onClick={() => setOpen(false)}
                    initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                    animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ delay: reducedMotion ? 0 : 0.05 + index * 0.04, duration: 0.28 }}
                  >
                    {label}
                  </motion.a>
                ))}
              </nav>

              <a
                href="#contact"
                className="focus-ring gold-gradient-btn inline-flex min-h-14 items-center justify-center gap-3 px-6 py-4 text-sm font-semibold uppercase"
                onClick={() => setOpen(false)}
              >
                Get a Quote
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <p className="mt-8 border-t border-gold/15 pt-6 text-center text-xs uppercase text-stone">
                DECENT Development
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  )
}
