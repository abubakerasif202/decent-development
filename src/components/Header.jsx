import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'

const navItems = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Services', '#services'],
  ['Projects', '#projects'],
  ['Team', '#team'],
  ['Contact', '#contact'],
]

function BrandMark({ logo }) {
  return (
    <span className="flex items-center gap-3">
      {logo ? (
        <span className="h-14 w-40 bg-ivory p-2 shadow-premium sm:w-52 lg:w-56">
          <img
            src={logo}
            alt="DECENT Development logo"
            className="h-full w-full object-contain object-center"
            decoding="async"
            fetchPriority="high"
          />
        </span>
      ) : (
        <span className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center border border-gold/50 bg-gold/10 font-display text-lg font-bold text-gold">
            DD
          </span>
          <span className="leading-none">
            <span className="block font-display text-base font-semibold text-ivory sm:text-lg">
              DECENT
            </span>
            <span className="block text-[11px] font-semibold uppercase text-smoke" style={{ letterSpacing: '0.18em' }}>
              Development
            </span>
          </span>
        </span>
      )}
    </span>
  )
}

export default function Header({ company, logo }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const closeOnWideScreen = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }

    window.addEventListener('resize', closeOnWideScreen)
    return () => window.removeEventListener('resize', closeOnWideScreen)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-gold/15 bg-ink/90 backdrop-blur-xl">
      <div className="section-shell">
        <div className="flex min-h-20 items-center justify-between gap-4">
          <a href="#home" className="focus-ring rounded-sm" aria-label={`${company.name} home`}>
            <BrandMark logo={logo} />
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="focus-ring rounded-sm text-sm font-medium text-smoke transition-colors duration-200 hover:text-ivory"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#contact"
              className="focus-ring inline-flex min-h-11 items-center gap-2 bg-gold px-5 py-3 text-sm font-semibold text-ink shadow-gold transition duration-200 hover:-translate-y-0.5 hover:bg-gold-soft"
            >
              Get a Quote
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>

          <button
            type="button"
            className="focus-ring inline-flex min-h-11 min-w-11 items-center justify-center border border-gold/20 text-ivory transition-colors duration-200 hover:border-gold/60 hover:text-gold md:hidden"
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>

        {open ? (
          <nav
            id="mobile-menu"
            className="grid gap-2 border-t border-gold/15 py-4 md:hidden"
            aria-label="Mobile navigation"
          >
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="focus-ring px-1 py-3 text-base font-medium text-smoke transition-colors duration-200 hover:text-ivory"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="focus-ring mt-2 inline-flex min-h-11 items-center justify-center gap-2 bg-gold px-5 py-3 text-sm font-semibold text-ink transition duration-200 hover:bg-gold-soft"
              onClick={() => setOpen(false)}
            >
              Get a Quote
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </nav>
        ) : null}
      </div>
    </header>
  )
}
