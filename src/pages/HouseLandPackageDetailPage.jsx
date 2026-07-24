import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  Car,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Home,
  Layers3,
  MapPin,
  Ruler,
} from 'lucide-react'
import { HOUSE_LAND_ENABLED } from '../config/featureFlags.js'
import { getHouseLandPackageBySlug } from '../data/houseLandPackages.js'
import { houseLandInclusions } from '../data/houseLandInclusions.js'
import usePageMeta from '../hooks/usePageMeta.js'

const siteUrl = 'https://www.decentdevelopment.com.au'

const designIntent = {
  'ava-residence': [
    'Double-storey family layout',
    'Ground-floor living, kitchen, dining, garage, and sitting or living areas',
    'First-floor bedrooms and family zones',
    'Designed for practical everyday flow',
  ],
  'bela-residence': [
    'Single-storey compact family layout',
    '3-bedroom arrangement',
    'Kitchen, living, and dining connection',
    'Garage and practical site fit',
    'Designed for 10m front x 28m depth minimum land reference',
  ],
}

const getHouseLandImageDimensions = (src) => {
  if (src.includes('/ava/')) {
    return src.includes('hero-exterior') || src.includes('floor-plan') || src.includes('lot-plan') || src.includes('aerial-exterior')
      ? { width: 2688, height: 2284 }
      : { width: 2688, height: 1792 }
  }

  if (src.includes('turnkey-inclusions-cover')) {
    return { width: 1240, height: 930 }
  }

  return { width: 1240, height: 1654 }
}

function Reveal({ children, className = '', index = 0, as: Component = motion.div }) {
  const reducedMotion = useReducedMotion()

  return (
    <Component
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      whileHover={reducedMotion ? undefined : { y: -5 }}
      transition={{ duration: 0.5, delay: reducedMotion ? 0 : index * 0.04, ease: 'easeOut' }}
    >
      {children}
    </Component>
  )
}

function InclusionCard({ group, index }) {
  const [open, setOpen] = useState(index < 2)
  const reducedMotion = useReducedMotion()

  return (
    <div className="rounded-2xl border border-brand-border bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="focus-ring flex min-h-16 w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left sm:px-6 sm:py-5"
        aria-expanded={open}
      >
        <span className="text-sm font-bold uppercase leading-6 tracking-[0.12em] text-brand-charcoal">{group.category}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="text-brand-gold" size={18} aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, height: 0 }}
            animate={reducedMotion ? undefined : { opacity: 1, height: 'auto' }}
            exit={reducedMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <ul className="grid gap-3 px-5 pb-5 sm:px-6 sm:pb-6">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm font-light leading-7 text-brand-muted">
                  <CheckCircle2 className="mt-1 shrink-0 text-brand-gold" size={14} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default function HouseLandPackageDetailPage() {
  const { slug } = useParams()
  const packageItem = getHouseLandPackageBySlug(slug)
  const reducedMotion = useReducedMotion()
  const heroImageDimensions = packageItem ? getHouseLandImageDimensions(packageItem.image) : null

  const schemas = packageItem
    ? [
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'House & Land Packages', item: `${siteUrl}/house-and-land-packages/` },
            { '@type': 'ListItem', position: 3, name: packageItem.title, item: `${siteUrl}/house-and-land-packages/${packageItem.slug}/` },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${siteUrl}/house-and-land-packages/${packageItem.slug}/#webpage`,
          name: packageItem.title,
          description: packageItem.seoDescription,
          url: `${siteUrl}/house-and-land-packages/${packageItem.slug}/`,
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

  if (!HOUSE_LAND_ENABLED) return <Navigate to="/" replace />
  if (!packageItem) return <Navigate to="/house-and-land-packages/" replace />

  const enquiryPath = `/contact/?package=${encodeURIComponent(packageItem.title)}`
  const detailStats = [
    ['Residence type', packageItem.packageType, Home],
    ['Storeys', `${packageItem.storeys}`, Building2],
    ['Approx size', packageItem.size, Ruler],
    ['Beds', `${packageItem.beds}`, BedDouble],
    ['Baths', `${packageItem.baths}`, Bath],
    ['Garage', packageItem.cars === 2 ? 'Double garage' : 'Garage provision', Car],
    ['Land reference', packageItem.minimumLand, MapPin],
    ['Build time', packageItem.buildTime, ClipboardCheck],
    ['Customisation', packageItem.slug === 'ava-residence' ? '100% customisable reference' : 'Reviewed against land and brief', Layers3],
  ]

  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand-bg pt-28 text-brand-charcoal sm:pt-32">
        <div className="absolute inset-0 architecture-grid opacity-45" aria-hidden="true" />
        <div className="section-shell relative z-10 grid gap-12 pb-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <p className="eyebrow">House &amp; Land Package</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-brand-gold/35 bg-brand-gold/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-gold">{packageItem.status}</span>
              <span className="rounded-full border border-brand-border bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-charcoal">{packageItem.priceLabel}</span>
            </div>
            <h1 className="mt-6 font-display text-4xl font-normal leading-[0.98] sm:text-6xl">{packageItem.title}</h1>
            <p className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">
              <MapPin size={16} aria-hidden="true" /> {packageItem.suburb} / {packageItem.region}
            </p>
            <p className="mt-6 max-w-2xl text-base font-light leading-8 text-brand-muted">{packageItem.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={enquiryPath} className="focus-ring gold-gradient-btn inline-flex min-h-14 items-center gap-2 px-7 py-4 text-sm font-bold uppercase">
                Start Enquiry <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/house-and-land-packages/" className="focus-ring outline-gold-btn inline-flex min-h-14 items-center gap-2 px-7 py-4 text-sm font-bold uppercase">
                <ArrowLeft size={16} aria-hidden="true" /> Back to Packages
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="group rounded-[2rem] border border-brand-gold/25 bg-white p-3 shadow-gold"
            initial={reducedMotion ? false : { opacity: 0, y: 28, rotateY: -5 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0, rotateY: 0 }}
            whileHover={reducedMotion ? undefined : { y: -6, rotateY: -2 }}
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden rounded-[1.55rem]">
              <img
                src={packageItem.image}
                alt={packageItem.gallery[0].alt}
                width={heroImageDimensions.width}
                height={heroImageDimensions.height}
                className="aspect-[4/3] w-full object-cover object-bottom transition duration-700 group-hover:scale-[1.04]"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/45 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/40 bg-white/95 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-charcoal shadow-sm backdrop-blur sm:bottom-5 sm:left-5 sm:right-auto">Illustrative package imagery</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16 text-brand-charcoal sm:py-24" aria-labelledby="details-title">
        <div className="section-shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Key Details</p>
            <h2 id="details-title" className="mt-4 font-display text-3xl font-normal sm:text-5xl">Package details at a glance</h2>
          </Reveal>
          <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {detailStats.map(([label, value, Icon], index) => (
              <Reveal key={label} index={index} className="rounded-2xl border border-brand-border bg-brand-bg p-6 shadow-sm">
                <Icon className="text-brand-gold" size={21} aria-hidden="true" />
                <dt className="mt-5 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-muted">{label}</dt>
                <dd className="mt-2 text-base font-semibold leading-7 text-brand-charcoal">{value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-brand-bg py-16 text-brand-charcoal sm:py-24">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="eyebrow">Overview</p>
            <h2 className="mt-4 font-display text-3xl font-normal sm:text-5xl">A considered package pathway</h2>
            <p className="mt-6 text-base font-light leading-8 text-brand-muted sm:text-lg">{packageItem.description}</p>
            <p className="mt-6 rounded-2xl border border-brand-border bg-white p-6 text-sm font-light leading-7 text-brand-muted sm:text-base sm:leading-8">{packageItem.disclaimer}</p>
          </Reveal>
          <Reveal className="rounded-[1.5rem] border border-brand-border bg-white p-6 shadow-sm sm:p-8">
            <p className="eyebrow">Floor Plan / Design Intent</p>
            <ul className="mt-6 grid gap-3">
              {designIntent[packageItem.slug].map((item) => (
                <li key={item} className="flex gap-3 text-base leading-8 text-brand-muted">
                  <CheckCircle2 className="mt-1 shrink-0 text-brand-gold" size={18} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 text-brand-charcoal sm:py-24" aria-labelledby="gallery-title">
        <div className="section-shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Gallery</p>
            <h2 id="gallery-title" className="mt-4 font-display text-3xl font-normal sm:text-5xl">Package imagery and planning references</h2>
            <p className="mt-5 text-base font-light leading-8 text-brand-muted">Images are adapted from supplied package reference material and presented as a web gallery for enquiry review. Final plans and specifications are confirmed during consultation.</p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {packageItem.gallery.map((image, index) => (
              <Reveal key={image.src} index={index} className={`group overflow-hidden rounded-2xl border border-brand-border bg-brand-bg shadow-sm ${index === 0 ? 'sm:col-span-2 lg:col-span-2' : ''}`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  width={getHouseLandImageDimensions(image.src).width}
                  height={getHouseLandImageDimensions(image.src).height}
                  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-porcelain py-16 text-brand-charcoal sm:py-24" aria-labelledby="features-title">
        <div className="section-shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Features</p>
            <h2 id="features-title" className="mt-4 font-display text-3xl font-normal sm:text-5xl">Package features</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packageItem.features.map((feature, index) => (
              <Reveal key={feature} index={index} className="flex gap-3 rounded-2xl border border-brand-border bg-white p-5 shadow-sm">
                <CheckCircle2 className="mt-0.5 shrink-0 text-brand-gold" size={18} aria-hidden="true" />
                <span className="text-base leading-7 text-brand-muted">{feature}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-bg py-16 text-brand-charcoal sm:py-24" aria-labelledby="inclusions-title">
        <div className="section-shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Turnkey Inclusions</p>
            <h2 id="inclusions-title" className="mt-4 font-display text-3xl font-normal sm:text-5xl">Inclusion categories</h2>
            <p className="mt-5 text-base font-light leading-8 text-brand-muted">The categories below may be included, where applicable, subject to final specification, selected package scope, site conditions, approvals, and written contract documentation.</p>
          </Reveal>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {houseLandInclusions.map((group, index) => (
              <InclusionCard key={group.category} group={group} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 text-brand-charcoal sm:py-24">
        <div className="section-shell grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-[1.5rem] border border-brand-border bg-brand-bg p-7 shadow-sm sm:p-9">
            <p className="eyebrow">Exclusions / Notes</p>
            <h2 className="mt-4 font-display text-3xl font-normal">Confirm before contract</h2>
            <p className="mt-5 text-base font-light leading-8 text-brand-muted">{packageItem.exclusions[0]}</p>
          </Reveal>
          <Reveal className="rounded-[1.5rem] border border-brand-border bg-brand-bg p-7 shadow-sm sm:p-9">
            <p className="eyebrow">Location / Land Notes</p>
            <h2 className="mt-4 font-display text-3xl font-normal">Land suitability review</h2>
            <p className="mt-5 text-base font-light leading-8 text-brand-muted">{packageItem.locationNotes}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-brand-bg pb-20 text-brand-charcoal">
        <div className="section-shell">
          <Reveal className="rounded-[1.75rem] border border-brand-gold/30 bg-white p-8 text-center shadow-gold sm:p-14">
            <p className="eyebrow">Start the conversation</p>
            <h2 className="mt-4 font-display text-3xl font-normal sm:text-5xl">Discuss this package with DECENT Development</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-8 text-brand-muted">{packageItem.enquiryNotes}</p>
            <Link to={enquiryPath} className="focus-ring gold-gradient-btn mt-8 inline-flex min-h-14 items-center gap-2 px-7 py-4 text-sm font-bold uppercase">
              Start Enquiry <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
