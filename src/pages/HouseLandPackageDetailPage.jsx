import { Link, Navigate, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  Car,
  CheckCircle2,
  Layers3,
  MapPin,
  Ruler,
} from 'lucide-react'
import { getHouseLandPackageBySlug } from '../data/houseLandPackages.js'
import usePageMeta from '../hooks/usePageMeta.js'

const siteUrl = 'https://www.decentdevelopment.com.au'

const pathwaySteps = [
  ['Review site and goals', 'Share the location, land details, preferred project type, budget direction, and intended outcome.'],
  ['Discuss feasibility', 'Consider site conditions, access, planning direction, buildability, and practical project constraints.'],
  ['Confirm design direction', 'Shape the brief around lifestyle, investment goals, site potential, and finish expectations.'],
  ['Prepare build pathway', 'Clarify consultant coordination, documentation, approvals, sequencing, and delivery requirements.'],
  ['Move toward enquiry or consultation', 'Confirm the next practical actions and the information needed to progress with confidence.'],
]

function RevealCard({ children, className = '', index = 0 }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className={`card-light rounded-2xl ${className}`}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      whileHover={reducedMotion ? undefined : { y: -5 }}
      transition={{ duration: 0.52, delay: reducedMotion ? 0 : index * 0.04, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function HouseLandPackageDetailPage() {
  const { slug } = useParams()
  const packageItem = getHouseLandPackageBySlug(slug)
  const reducedMotion = useReducedMotion()
  const pageUrl = packageItem ? `${siteUrl}/house-and-land-packages/${packageItem.slug}/` : `${siteUrl}/house-and-land-packages/`

  const schemas = packageItem
    ? [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'House & Land Packages', item: `${siteUrl}/house-and-land-packages/` },
            { '@type': 'ListItem', position: 3, name: packageItem.title, item: pageUrl },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: packageItem.title,
          description: packageItem.seoDescription,
          url: pageUrl,
          about: packageItem.packageType,
          spatialCoverage: { '@type': 'Place', name: packageItem.region },
        },
      ]
    : []

  usePageMeta({
    title: packageItem ? packageItem.seoTitle : 'House & Land Package Not Found | DECENT Development',
    description: packageItem ? packageItem.seoDescription : 'The requested house and land package could not be found.',
    path: packageItem ? `/house-and-land-packages/${packageItem.slug}/` : '/house-and-land-packages/',
    schemas,
  })

  if (!packageItem) return <Navigate to="/house-and-land-packages/" replace />

  const details = [
    ['Beds', packageItem.beds, BedDouble],
    ['Baths', packageItem.baths, Bath],
    ['Cars', packageItem.cars, Car],
    ['Storeys', packageItem.storeys, Building2],
    ['Land size', packageItem.landSize, Ruler],
    ['Region', packageItem.region, MapPin],
    ['Package type', packageItem.packageType, Layers3],
    ['Status', packageItem.status, CheckCircle2],
  ]

  const enquiryPath = `/contact/?package=${encodeURIComponent(packageItem.title)}`

  return (
    <>
      <section className="architecture-grid bg-brand-bg pb-16 pt-32 text-brand-charcoal sm:pb-20 sm:pt-36">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.58, ease: 'easeOut' }}
          >
            <p className="eyebrow">House &amp; Land Opportunity</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-gold">{packageItem.status}</span>
              <span className="rounded-full border border-brand-border bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-charcoal">{packageItem.priceLabel}</span>
            </div>
            <h1 className="mt-6 font-display text-4xl font-normal leading-[1.02] sm:text-6xl">{packageItem.title}</h1>
            <p className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">
              <MapPin size={16} aria-hidden="true" /> {packageItem.suburb} · {packageItem.region}
            </p>
            <p className="mt-6 max-w-2xl text-base font-light leading-8 text-brand-muted">{packageItem.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={enquiryPath} className="focus-ring gold-gradient-btn inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs font-bold uppercase">
                Start Enquiry <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/house-and-land-packages/" className="focus-ring outline-gold-btn inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs font-bold uppercase">
                <ArrowLeft size={16} aria-hidden="true" /> Back to Packages
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="group overflow-hidden rounded-[2rem] border border-brand-border bg-white p-3 premium-shadow"
            initial={reducedMotion ? false : { opacity: 0, y: 28, rotateY: -7 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0, rotateY: 0 }}
            whileHover={reducedMotion ? undefined : { y: -6, rotateY: -2 }}
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden rounded-[1.45rem]">
              <img src={packageItem.image} alt={`${packageItem.title} illustrative residential opportunity`} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
              <div className="absolute bottom-4 left-4 rounded-full border border-white/40 bg-white/90 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-brand-charcoal backdrop-blur">
                Illustrative opportunity
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" aria-labelledby="package-details-title">
        <div className="section-shell">
          <p className="eyebrow">Opportunity details</p>
          <h2 id="package-details-title" className="mt-4 font-display text-3xl font-normal text-brand-charcoal sm:text-4xl">Key details at a glance</h2>
          <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {details.map(([label, value, Icon], index) => (
              <RevealCard key={label} index={index} className="p-5">
                <Icon className="text-brand-gold" size={21} aria-hidden="true" />
                <dt className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-brand-muted">{label}</dt>
                <dd className="mt-2 text-sm font-semibold leading-6 text-brand-charcoal">{value}</dd>
              </RevealCard>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-brand-bg py-16 sm:py-24">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Overview</p>
            <h2 className="mt-4 font-display text-3xl font-normal leading-tight text-brand-charcoal sm:text-4xl">A considered residential pathway</h2>
            <p className="mt-6 text-base font-light leading-8 text-brand-muted">{packageItem.description}</p>
            <div className="mt-8 rounded-2xl border border-brand-border bg-white p-6 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-gold">Suitable for</p>
              <p className="mt-3 text-sm leading-7 text-brand-muted">{packageItem.bestFor}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[...packageItem.features, ...packageItem.highlights].map((feature, index) => (
              <RevealCard key={feature} index={index} className="flex gap-3 p-5">
                <CheckCircle2 className="mt-0.5 shrink-0 text-brand-gold" size={18} aria-hidden="true" />
                <span className="text-sm leading-6 text-brand-muted">{feature}</span>
              </RevealCard>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="section-shell">
          <p className="eyebrow">Development pathway</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-normal leading-tight text-brand-charcoal sm:text-4xl">From site review to a clearer build direction</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {pathwaySteps.map(([title, copy], index) => (
              <RevealCard key={title} index={index} className="p-5">
                <span className="font-display text-3xl text-brand-gold/60">0{index + 1}</span>
                <h3 className="mt-5 text-xs font-bold uppercase leading-5 tracking-[0.14em] text-brand-charcoal">{title}</h3>
                <p className="mt-3 text-xs font-light leading-6 text-brand-muted">{copy}</p>
              </RevealCard>
            ))}
          </ol>
        </div>
      </section>

      <section className="architecture-grid bg-brand-bg py-16 sm:py-24">
        <div className="section-shell grid gap-6 lg:grid-cols-2">
          <RevealCard className="p-7 sm:p-9">
            <MapPin className="text-brand-gold" size={26} aria-hidden="true" />
            <p className="eyebrow mt-6">Location</p>
            <h2 className="mt-4 font-display text-3xl font-normal text-brand-charcoal">{packageItem.suburb}, {packageItem.region}</h2>
            <p className="mt-5 text-sm font-light leading-7 text-brand-muted">{packageItem.locationNotes}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[packageItem.suburb, packageItem.region, 'Sydney & NSW'].filter((value, index, values) => values.indexOf(value) === index).map((label) => (
                <span key={label} className="rounded-full border border-brand-border bg-brand-bg px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-charcoal">{label}</span>
              ))}
            </div>
          </RevealCard>
          <RevealCard className="p-7 sm:p-9">
            <p className="eyebrow">Before you enquire</p>
            <h2 className="mt-4 font-display text-3xl font-normal text-brand-charcoal">Prepare the right project details</h2>
            <p className="mt-5 text-sm font-light leading-7 text-brand-muted">{packageItem.enquiryNotes}</p>
            <p className="mt-5 text-xs font-light leading-6 text-brand-muted">Availability, pricing, inclusions, site suitability, and delivery timing are confirmed during enquiry and consultation.</p>
          </RevealCard>
        </div>
      </section>

      <section className="bg-brand-bg pb-20">
        <div className="section-shell">
          <RevealCard className="architecture-grid p-8 text-center sm:p-14">
            <p className="eyebrow">Start the conversation</p>
            <h2 className="mt-4 font-display text-3xl font-normal text-brand-charcoal sm:text-4xl">Ready to discuss this opportunity?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-8 text-brand-muted">Speak with DECENT Development about this package, your preferred location, budget direction, and project goals.</p>
            <Link to={enquiryPath} className="focus-ring gold-gradient-btn mt-8 inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs font-bold uppercase">
              Start Enquiry <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </RevealCard>
        </div>
      </section>
    </>
  )
}
