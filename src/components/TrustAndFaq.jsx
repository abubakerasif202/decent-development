import { motion, useReducedMotion } from 'framer-motion'
import { BadgeCheck, Building2, HelpCircle, MapPin, ShieldCheck } from 'lucide-react'

const trustItems = [
  {
    label: 'NSW contractor licence',
    getValue: (company) => company.licence,
    icon: ShieldCheck,
  },
  {
    label: 'Registered company',
    getValue: (company) => `ACN ${company.acn}`,
    icon: BadgeCheck,
  },
  {
    label: 'Office',
    getValue: () => 'North Sydney, NSW',
    icon: MapPin,
  },
  {
    label: 'Services',
    getValue: () => 'Construction, development, project management',
    icon: Building2,
  },
]

const faqs = [
  {
    question: 'What areas does DECENT Development service?',
    answer: 'DECENT Development works across New South Wales from its North Sydney office.',
  },
  {
    question: 'What construction services are available?',
    answer:
      'Services include residential construction, commercial construction, property development, project management, renovations, extensions, and building consultation.',
  },
  {
    question: 'How do project enquiries start?',
    answer:
      'Prospective clients can call, email, or submit the contact form with the project type, contact details, and a short brief.',
  },
]

export default function TrustAndFaq({ company }) {
  const reducedMotion = useReducedMotion()

  return (
    <section className="bg-porcelain py-16 text-ink sm:py-20" aria-labelledby="trust-title">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="eyebrow">Trust signals</p>
          <h2 id="trust-title" className="mt-4 font-display text-3xl font-normal leading-tight text-ink sm:text-4xl">
            Clear business details before the first conversation
          </h2>
          <p className="mt-5 max-w-xl text-base font-light leading-7 text-graphite/80">
            DECENT Development publishes its licence, company registration, location, and direct contact details so
            clients can assess the business before making an enquiry.
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-stone">Last updated 8 June 2026</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {trustItems.map(({ label, getValue, icon: Icon }, index) => (
            <motion.article
              key={label}
              className="border border-ink/10 bg-white p-5 shadow-[0_18px_38px_rgba(18,18,18,0.08)]"
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: reducedMotion ? 0 : index * 0.05, ease: 'easeOut' }}
            >
              <Icon className="text-gold" size={20} aria-hidden="true" />
              <h3 className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-bronze">{label}</h3>
              <p className="mt-3 text-sm leading-6 text-graphite">{getValue(company)}</p>
            </motion.article>
          ))}
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-4 lg:grid-cols-3">
            {faqs.map(({ question, answer }, index) => (
              <motion.article
                key={question}
                className="border border-ink/10 bg-white p-5 shadow-[0_18px_38px_rgba(18,18,18,0.08)]"
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: reducedMotion ? 0 : index * 0.05, ease: 'easeOut' }}
              >
                <HelpCircle className="text-gold" size={20} aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-normal leading-tight text-ink">{question}</h3>
                <p className="mt-3 text-sm leading-6 text-graphite/80">{answer}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
