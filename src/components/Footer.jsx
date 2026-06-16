import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { HOUSE_LAND_ENABLED } from '../config/featureFlags.js'

const quickLinks = [
  ['Home', '/'],
  ['Projects', '/projects/'],
  ['Meet the Team', '/meet-the-team/'],
  ['Contact', '/contact/'],
]

const serviceLinks = [
  ['About', '/#about'],
  ['Services', '/#services'],
  ['House & Land Packages', '/house-and-land-packages/'],
  ['Project Management', '/#services'],
]

function BrandMark({ company, logo }) {
  return (
    <span className="flex items-center gap-4">
      <span className="logo-frame h-14 w-16">
        <img
          src={logo}
          alt="DECENT Development logo"
          className="h-full w-full object-contain"
          decoding="async"
          loading="lazy"
        />
      </span>
      <span className="leading-none">
        <span className="block text-sm font-bold uppercase text-white">DECENT</span>
        <span className="block text-[10px] font-semibold uppercase text-brand-gold">Development</span>
      </span>
      <span className="sr-only">{company.name}</span>
    </span>
  )
}

export default function Footer({ company, logo }) {
  const reducedMotion = useReducedMotion()
  const year = new Date().getFullYear()
  const visibleServiceLinks = HOUSE_LAND_ENABLED
    ? serviceLinks
    : serviceLinks.filter(([label]) => label !== 'House & Land Packages')

  return (
    <motion.footer
      className="bg-[#111827] text-white border-t border-brand-gold/15"
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="border-y border-brand-gold/15 bg-white/[0.01]">
        <div className="section-shell flex flex-col items-center justify-between gap-3 py-5 text-center sm:flex-row sm:text-left">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-gold">Industry standards</p>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-300">
            Quality. Safety. Compliance. Trusted Outcomes.
          </p>
        </div>
      </div>
      <div className="section-shell py-12">
        <div className="grid gap-10 md:grid-cols-[1fr_0.7fr_0.7fr_0.9fr] md:items-start">
          <div>
            <BrandMark company={company} logo={logo} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-white">Company</p>
            <nav className="mt-4 grid gap-2" aria-label="Footer company navigation">
              {quickLinks.map(([label, to]) => (
                <Link
                  key={label}
                  to={to}
                  className="focus-ring rounded-sm text-[11px] uppercase text-neutral-400 transition-colors duration-200 hover:text-brand-gold"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-white">Services</p>
            <nav className="mt-4 grid gap-2" aria-label="Footer services navigation">
              {visibleServiceLinks.map(([label, to]) => (
                <Link
                  key={label}
                  to={to}
                  className="focus-ring rounded-sm text-[11px] uppercase text-neutral-400 transition-colors duration-200 hover:text-brand-gold"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-white">Connect</p>
            <address className="mt-4 not-italic text-[11px] leading-6 text-neutral-400">
              {company.address}
              <br />
              <a className="focus-ring rounded-sm hover:text-brand-gold" href={company.phoneHref}>
                {company.phone}
              </a>
              <br />
              <a className="focus-ring rounded-sm hover:text-brand-gold" href={`mailto:${company.email}`}>
                {company.email}
              </a>
              <br />
              Licence Number: {company.licence}
              <br />
              ACN: {company.acn}
            </address>
          </div>
        </div>
      </div>

      <div className="pb-8 text-center text-[10px] uppercase text-neutral-500">
        &copy; {year} {company.name}. All rights reserved.
      </div>
    </motion.footer>
  )
}
