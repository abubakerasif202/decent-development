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
    <section id="contact" className="bg-ink py-20 text-ivory sm:py-24" aria-labelledby="contact-title">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <h2 id="contact-title" className="font-display text-4xl font-normal leading-tight sm:text-5xl">
            Sydney Staging
            <br />
            & Construction
            <br />
            Enquiry Portal
          </h2>
          <p className="mt-8 max-w-xl text-base font-light leading-7 text-smoke">
            Speak with DECENT Development about a new build, development opportunity, renovation, extension, or
            project management engagement across New South Wales.
          </p>
          <div className="mt-12 space-y-4">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 shrink-0 text-gold" size={18} aria-hidden="true" />
              <p className="text-sm leading-6 text-smoke">{company.address}</p>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="mt-1 shrink-0 text-gold" size={18} aria-hidden="true" />
              <a className="focus-ring rounded-sm text-sm text-smoke hover:text-gold" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="mt-1 shrink-0 text-gold" size={18} aria-hidden="true" />
              <a className="focus-ring rounded-sm text-sm text-smoke hover:text-gold" href={company.phoneHref}>
                {company.phone}
              </a>
            </div>
            <div className="flex items-start gap-4">
              <BadgeCheck className="mt-1 shrink-0 text-gold" size={18} aria-hidden="true" />
              <p className="text-sm leading-6 text-smoke">
                Licence Number: {company.licence}
                <br />
                ACN: {company.acn}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="pt-2"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
        >
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="sr-only" htmlFor="quote-name">
                  Full Name
                </label>
                <input
                  id="quote-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="focus-ring min-h-12 w-full border border-gold/30 bg-transparent px-4 py-3 text-ivory placeholder:text-stone"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="quote-email">
                  Email
                </label>
                <input
                  id="quote-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="focus-ring min-h-12 w-full border border-gold/30 bg-transparent px-4 py-3 text-ivory placeholder:text-stone"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="sr-only" htmlFor="quote-phone">
                  Phone
                </label>
                <input
                  id="quote-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="focus-ring min-h-12 w-full border border-gold/30 bg-transparent px-4 py-3 text-ivory placeholder:text-stone"
                  placeholder="Phone number"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="quote-project-type">
                  Project Type
                </label>
                <select
                  id="quote-project-type"
                  name="projectType"
                  className="focus-ring min-h-12 w-full border border-gold/30 bg-transparent px-4 py-3 text-smoke"
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
              <label className="sr-only" htmlFor="quote-message">
                Project Details
              </label>
              <textarea
                id="quote-message"
                name="message"
                required
                rows="5"
                className="focus-ring w-full resize-y border border-gold/30 bg-transparent px-4 py-3 text-ivory placeholder:text-stone"
                placeholder="Tell us a little about your project brief"
              />
            </div>

            <button
              type="submit"
              className="focus-ring gold-gradient-btn inline-flex min-h-14 items-center justify-center gap-3 px-6 py-4 text-sm font-semibold uppercase"
            >
              Submit enquiry
              <ArrowRight size={18} aria-hidden="true" />
            </button>

            {submitted ? (
              <p className="border border-gold/20 bg-gold/10 px-4 py-3 text-sm leading-6 text-smoke" role="status">
                Your enquiry draft has been prepared for DECENT Development.
              </p>
            ) : null}
          </form>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <a
              href={company.phoneHref}
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 border border-gold/30 px-4 py-3 text-sm font-semibold text-ivory transition duration-200 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
            >
              <Phone size={17} aria-hidden="true" />
              Call now
            </a>
            <a
              href={`mailto:${company.email}`}
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 border border-gold/30 px-4 py-3 text-sm font-semibold text-ivory transition duration-200 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
            >
              <Mail size={17} aria-hidden="true" />
              Email us
            </a>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 border border-gold/30 px-4 py-3 text-sm font-semibold text-ivory transition duration-200 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
            >
              <MapPin size={17} aria-hidden="true" />
              Get directions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
