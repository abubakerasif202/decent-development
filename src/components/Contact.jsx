import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, BadgeCheck, Mail, MapPin, Phone } from 'lucide-react'

const directionsUrl =
  'https://www.google.com/maps/search/?api=1&query=Level%2014%20275%20Alfred%20St%20North%20North%20Sydney%20NSW%202060'

export default function Contact({ company }) {
  const reducedMotion = useReducedMotion()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const body = [
      `Full name: ${form.get('name')}`,
      `Email: ${form.get('email')}`,
      `Phone: ${form.get('phone') || 'Not supplied'}`,
      `Project type: ${form.get('projectType')}`,
      '',
      'Project details:',
      form.get('message'),
    ].join('\n')

    const href = `mailto:${company.email}?subject=${encodeURIComponent('Project inquiry for DECENT Development')}&body=${encodeURIComponent(body)}`
    window.location.href = href
    setSubmitted(true)
  }

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
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase text-smoke" htmlFor="quote-name" style={{ letterSpacing: '0.14em' }}>
                  Full Name
                </label>
                <input
                  id="quote-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="focus-ring mt-2 min-h-12 w-full border border-gold/15 bg-ink px-4 py-3 text-ivory placeholder:text-stone"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-smoke" htmlFor="quote-email" style={{ letterSpacing: '0.14em' }}>
                  Email
                </label>
                <input
                  id="quote-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="focus-ring mt-2 min-h-12 w-full border border-gold/15 bg-ink px-4 py-3 text-ivory placeholder:text-stone"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase text-smoke" htmlFor="quote-phone" style={{ letterSpacing: '0.14em' }}>
                  Phone
                </label>
                <input
                  id="quote-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="focus-ring mt-2 min-h-12 w-full border border-gold/15 bg-ink px-4 py-3 text-ivory placeholder:text-stone"
                  placeholder="Best contact number"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-smoke" htmlFor="quote-project-type" style={{ letterSpacing: '0.14em' }}>
                  Project Type
                </label>
                <select
                  id="quote-project-type"
                  name="projectType"
                  className="focus-ring mt-2 min-h-12 w-full border border-gold/15 bg-ink px-4 py-3 text-ivory"
                  defaultValue="Residential Construction"
                >
                  <option className="bg-ink text-ivory">Residential Construction</option>
                  <option className="bg-ink text-ivory">Commercial Construction</option>
                  <option className="bg-ink text-ivory">Property Development</option>
                  <option className="bg-ink text-ivory">Renovations & Extensions</option>
                  <option className="bg-ink text-ivory">Building Consultation</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-smoke" htmlFor="quote-message" style={{ letterSpacing: '0.14em' }}>
                Project Details
              </label>
              <textarea
                id="quote-message"
                name="message"
                required
                rows="5"
                className="focus-ring mt-2 w-full resize-y border border-gold/15 bg-ink px-4 py-3 text-ivory placeholder:text-stone"
                placeholder="Tell us about your site, timeline, scope, and priorities."
              />
            </div>

            <button
              type="submit"
              className="focus-ring inline-flex min-h-14 items-center justify-center gap-3 bg-gold px-6 py-4 text-sm font-semibold uppercase text-ink transition duration-200 hover:-translate-y-0.5 hover:bg-gold-soft"
              style={{ letterSpacing: '0.16em' }}
            >
              Submit Inquiry
              <ArrowRight size={18} aria-hidden="true" />
            </button>

            {submitted ? (
              <p className="border border-gold/20 bg-gold/10 px-4 py-3 text-sm leading-6 text-smoke" role="status">
                Your email draft has been prepared for DECENT Development.
              </p>
            ) : null}
          </form>

          <div className="mt-8 grid gap-5 border-t border-gold/15 pt-8">
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
