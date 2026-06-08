import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

const quickLinks = [
  ['Home', '/'],
  ['Projects', '/projects/'],
  ['Meet the Team', '/meet-the-team/'],
  ['Contact', '/contact/'],
]

const serviceLinks = [
  ['About', '/#about'],
  ['Services', '/#services'],
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
        <span className="block text-sm font-bold uppercase text-ivory">DECENT</span>
        <span className="block text-[10px] font-semibold uppercase text-smoke">Development</span>
      </span>
      <span className="sr-only">{company.name}</span>
    </span>
  )
}

export default function Footer({ company, logo }) {
  const reducedMotion = useReducedMotion()
  const year = new Date().getFullYear()

  return (
    <motion.footer
      className="bg-ink text-ivory"
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="section-shell border-t border-graphite py-12">
        <div className="grid gap-10 md:grid-cols-[1fr_0.7fr_0.7fr_0.9fr] md:items-start">
          <div>
            <BrandMark company={company} logo={logo} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-ivory">Company</p>
            <nav className="mt-4 grid gap-2" aria-label="Footer company navigation">
              {quickLinks.map(([label, to]) => (
                <Link
                  key={label}
                  to={to}
                  className="focus-ring rounded-sm text-[11px] uppercase text-smoke transition-colors duration-200 hover:text-gold"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-ivory">Services</p>
            <nav className="mt-4 grid gap-2" aria-label="Footer services navigation">
              {serviceLinks.map(([label, to]) => (
                <Link
                  key={label}
                  to={to}
                  className="focus-ring rounded-sm text-[11px] uppercase text-smoke transition-colors duration-200 hover:text-gold"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-ivory">Connect</p>
            <address className="mt-4 not-italic text-[11px] leading-6 text-smoke">
              {company.address}
              <br />
              <a className="focus-ring rounded-sm hover:text-gold" href={company.phoneHref}>
                {company.phone}
              </a>
              <br />
              <a className="focus-ring rounded-sm hover:text-gold" href={`mailto:${company.email}`}>
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

      <div className="pb-8 text-center text-[10px] uppercase text-stone">
        &copy; {year} {company.name}. All rights reserved.
      </div>
    </motion.footer>
  )
}
