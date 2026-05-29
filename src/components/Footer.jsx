const quickLinks = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Services', '#services'],
  ['Projects', '#projects'],
  ['Team', '#team'],
  ['Contact', '#contact'],
]

export default function Footer({ company }) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-ivory">
      <div className="gold-divider" />
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.2fr_0.7fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold">{company.name}</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-smoke">
            Premium construction and development solutions for residential,
            commercial, and property development projects across New South Wales.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase text-gold" style={{ letterSpacing: '0.16em' }}>
            Quick links
          </p>
          <nav className="mt-4 grid gap-2" aria-label="Footer navigation">
            {quickLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="focus-ring rounded-sm text-sm text-smoke transition-colors duration-200 hover:text-ivory"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase text-gold" style={{ letterSpacing: '0.16em' }}>
            Contact
          </p>
          <address className="mt-4 not-italic text-sm leading-7 text-smoke">
            Level 14, 275 Alfred St North,
            <br />
            North Sydney NSW 2060
            <br />
            <a className="focus-ring rounded-sm hover:text-ivory" href={company.phoneHref}>
              {company.phone}
            </a>
            <br />
            <a className="focus-ring rounded-sm hover:text-ivory" href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </address>
          <p className="mt-4 text-sm text-smoke">Licence Number: {company.licence}</p>
          <p className="text-sm text-smoke">ACN: {company.acn}</p>
        </div>
      </div>
      <div className="border-t border-gold/15 py-5">
        <div className="section-shell flex flex-col gap-2 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} {company.name}. All rights reserved.</p>
          <p>Licensed construction and development services in NSW.</p>
        </div>
      </div>
    </footer>
  )
}
