import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'

const navItems = [
  ['Home', '/'],
  ['About', '/#about'],
  ['Services', '/#services'],
  ['Projects', '/projects/'],
  ['Partners', '/collaboration/'],
  ['Meet the Team', '/meet-the-team/'],
  ['Contact', '/contact/'],
]

function BrandMark({ company, logo }) {
  return (
    <span className="flex items-center gap-3">
      <span className="logo-frame h-12 w-14 sm:h-14 sm:w-16">
        <img
          src={logo}
          alt=""
          className="h-full w-full object-contain"
          decoding="async"
          aria-hidden="true"
        />
      </span>
      <span className="hidden leading-none sm:block" aria-hidden="true">
        <span className="block text-sm font-bold uppercase text-ivory">DECENT</span>
        <span className="block text-[10px] font-semibold uppercase text-smoke">Development</span>
      </span>
      <span className="sr-only">{company.name}</span>
    </span>
  )
}

export default function Header({ company, logo }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef(null)
  const closeButtonRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 24)

    updateScrolled()
    window.addEventListener('scroll', updateScrolled, { passive: true })
    return () => window.removeEventListener('scroll', updateScrolled)
  }, [])

  useEffect(() => {
    const closeOnWideScreen = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }

    window.addEventListener('resize', closeOnWideScreen)
    return () => window.removeEventListener('resize', closeOnWideScreen)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <motion.header
      className="fixed left-0 top-0 z-50 w-full px-0 py-3 transition-shadow duration-300 sm:py-4"
      initial={false}
      animate={{
        backgroundColor: scrolled || open ? 'rgba(18, 18, 18, 0.9)' : 'rgba(18, 18, 18, 0)',
        backdropFilter: scrolled || open ? 'blur(18px)' : 'blur(0px)',
        borderBottomColor: scrolled || open ? 'rgba(197, 160, 89, 0.18)' : 'rgba(197, 160, 89, 0)',
      }}
      transition={{ duration: reducedMotion ? 0.01 : 0.28, ease: 'easeOut' }}
      style={{ borderBottomWidth: 1, borderBottomStyle: 'solid' }}
    >
      <div className="section-shell">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="focus-ring rounded-sm">
            <BrandMark company={company} logo={logo} />
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
            {navItems.map(([label, to]) => (
              <Link
                key={label}
                to={to}
                className="nav-link focus-ring rounded-sm text-xs font-semibold uppercase text-ivory transition-colors duration-200 hover:text-gold"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/contact/"
              className="focus-ring gold-gradient-btn inline-flex min-h-11 items-center gap-2 px-5 py-3 text-xs font-bold uppercase"
            >
              Get in touch
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <button
            ref={menuButtonRef}
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
                <BrandMark company={company} logo={logo} />
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="focus-ring inline-flex min-h-11 min-w-11 items-center justify-center border border-gold/25 text-ivory"
                  aria-label="Close navigation menu"
                  onClick={() => {
                    setOpen(false)
                    menuButtonRef.current?.focus()
                  }}
                >
                  <X size={22} aria-hidden="true" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col items-center justify-center gap-7" aria-label="Mobile navigation">
                {navItems.map(([label, to], index) => (
                  <motion.div
                    key={label}
                    initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                    animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ delay: reducedMotion ? 0 : 0.05 + index * 0.04, duration: 0.28 }}
                  >
                    <Link
                      to={to}
                      className="focus-ring block rounded-sm font-display text-4xl font-semibold text-smoke transition-colors duration-200 hover:text-gold"
                      onClick={() => setOpen(false)}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <Link
                to="/contact/"
                className="focus-ring gold-gradient-btn inline-flex min-h-14 items-center justify-center gap-3 px-6 py-4 text-sm font-semibold uppercase"
                onClick={() => setOpen(false)}
              >
                Get in touch
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <p className="mt-8 border-t border-gold/15 pt-6 text-center text-xs uppercase text-stone">
                DECENT Development
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
