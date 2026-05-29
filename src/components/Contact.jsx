import { motion, useReducedMotion } from 'framer-motion'
import { BadgeCheck, Mail, MapPin, Phone } from 'lucide-react'

const directionsUrl =
  'https://www.google.com/maps/search/?api=1&query=Level%2014%20275%20Alfred%20St%20North%20North%20Sydney%20NSW%202060'

export default function Contact({ company }) {
  const reducedMotion = useReducedMotion()

  return (
    <section id="contact" className="bg-charcoal py-20 text-ivory sm:py-24" aria-labelledby="contact-title">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="mt-4 font-display text-4xl font-semibold leading-[1.12] sm:text-5xl">
            Start a conversation about your next project.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-smoke">
            Speak with DECENT Development about construction, property development,
            renovations, extensions, or project management support across New South Wales.
          </p>
        </motion.div>

        <motion.div
          className="border border-gold/15 bg-ivory/[0.045] p-6 sm:p-8"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
        >
          <div className="grid gap-5">
            <div className="flex gap-4">
              <MapPin className="mt-1 shrink-0 text-gold" size={22} aria-hidden="true" />
              <div>
                <p className="font-semibold text-ivory">Address</p>
                <p className="mt-1 leading-7 text-smoke">
                  Level 14, 275 Alfred St North,
                  <br />
                  North Sydney NSW 2060
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="mt-1 shrink-0 text-gold" size={22} aria-hidden="true" />
              <div>
                <p className="font-semibold text-ivory">Email</p>
                <a className="focus-ring mt-1 inline-block rounded-sm text-smoke hover:text-gold" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="mt-1 shrink-0 text-gold" size={22} aria-hidden="true" />
              <div>
                <p className="font-semibold text-ivory">Phone</p>
                <a className="focus-ring mt-1 inline-block rounded-sm text-smoke hover:text-gold" href={company.phoneHref}>
                  {company.phone}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <BadgeCheck className="mt-1 shrink-0 text-gold" size={22} aria-hidden="true" />
              <div>
                <p className="font-semibold text-ivory">Credentials</p>
                <p className="mt-1 leading-7 text-smoke">Licence Number: {company.licence}</p>
                <p className="leading-7 text-smoke">ACN: {company.acn}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <a
              href={company.phoneHref}
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 bg-gold px-4 py-3 text-sm font-semibold text-ink transition duration-200 hover:-translate-y-0.5 hover:bg-gold-soft"
            >
              <Phone size={17} aria-hidden="true" />
              Call Now
            </a>
            <a
              href={`mailto:${company.email}`}
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 border border-gold/20 px-4 py-3 text-sm font-semibold text-ivory transition duration-200 hover:-translate-y-0.5 hover:border-gold/70 hover:text-gold"
            >
              <Mail size={17} aria-hidden="true" />
              Email Us
            </a>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 border border-gold/20 px-4 py-3 text-sm font-semibold text-ivory transition duration-200 hover:-translate-y-0.5 hover:border-gold/70 hover:text-gold"
            >
              <MapPin size={17} aria-hidden="true" />
              Get Directions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
