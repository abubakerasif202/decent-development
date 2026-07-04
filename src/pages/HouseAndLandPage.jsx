import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  Car,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Home,
  KeyRound,
  Sparkles,
  SunMedium,
} from 'lucide-react'
import { HOUSE_LAND_ENABLED } from '../config/featureFlags.js'
import { featuredHouseLandPackages } from '../data/houseLandPackages.js'
import { houseLandInclusions } from '../data/houseLandInclusions.js'
import usePageMeta from '../hooks/usePageMeta.js'

const siteUrl = 'https://www.decentdevelopment.com.au'

const pageDescription =
  'Explore Ava Residence and Bela Residence house and land package opportunities with DECENT Development across Sydney and New South Wales. Enquire about single-storey and double-storey residential packages.'

const processSteps = [
  ['Package enquiry', 'Share the package you prefer, your land details if available, timing, budget direction, and decision priorities.'],
  ['Site and land review', 'DECENT Development reviews site fit, access, land requirements, planning constraints, and practical build considerations.'],
  ['Design and inclusion confirmation', 'Facade direction, floor plan suitability, turnkey inclusions, and customisation requirements are confirmed in writing.'],
  ['Pricing and documentation', 'Package scope, assumptions, exclusions, approvals, and construction documentation are prepared for review.'],
  ['Approvals and construction planning', 'DA or CDC pathway, engineering, BASIX, certificates, procurement, and build sequencing are planned.'],
  ['Build delivery', 'Construction proceeds through a managed delivery pathway with clear communication and quality control.'],
]

const faqs = [
  {
    question: 'Are Ava and Bela fixed-price packages?',
    answer:
      'Package pricing depends on land availability, site conditions, inclusions, approvals, and final contract documentation. Ava includes a supplied guide from $1,200,000, while Bela is available by enquiry.',
  },
  {
    question: 'Can the designs be customised?',
    answer:
      'Yes. Ava is referenced as customisable, and Bela can be reviewed against the client land, budget, and design requirements. Final changes are subject to planning, engineering, and construction feasibility.',
  },
  {
    question: 'What is included in the turnkey package?',
    answer:
      'Turnkey inclusions may include site works, approvals, structure, facade finishes, roofing, garage, kitchen, bathrooms, laundry, internal finishes, electrical, heating/cooling, landscaping, and BASIX-related items. Final inclusions are confirmed in writing before contract.',
  },
  {
    question: 'What areas do you service?',
    answer: 'DECENT Development works across Sydney and New South Wales from its North Sydney office.',
  },
  {
    question: 'How do I start?',
    answer:
      'Contact DECENT Development with your preferred package, land details if available, budget direction, and timing. The team will guide you through the next steps.',
  },
]

const comparisonRows = [
  ['Residence type', 'Double-storey family residence', 'Single-storey house and land design'],
  ['Storeys', '2 storeys', '1 storey'],
  ['Approx size', 'Approx. 230 sqm', 'Approx. 152 sqm'],
  ['Bedrooms', '4 bedrooms', '3 bedrooms'],
  ['Bathrooms', '3 bathrooms', '2 bathrooms'],
  ['Garage', 'Double garage', 'Garage provision'],
  ['Land requirement', 'Lot 4612 / 251m2 reference', 'Minimum 10m front x 28m depth'],
  ['Best suited for', 'Families wanting more space, premium layout, and customisation', 'Compact blocks, owner-occupiers, practical new-home buyers'],
  ['Price guide', 'From $1,200,000', 'Enquire for pricing'],
  ['Key strengths', 'Space, energy efficiency, double glazing, solar, customisation', 'Turnkey inclusions, compact layout, facade options, BASIX consideration'],
]

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
      transition={{ duration: 0.5, delay: reducedMotion ? 0 : index * 0.04, ease: 'easeOut' }}
    >
      {children}
    </Component>
  )
}

function PackageCard({ packageItem, index }) {
  const reducedMotion = useReducedMotion()
  const isAva = packageItem.slug === 'ava-residence'
  const detailPath = `/house-and-land-packages/${packageItem.slug}/`
  const imageDimensions = getHouseLandImageDimensions(packageItem.image)
  const stats = [
    [packageItem.beds, 'Beds', BedDouble],
    [packageItem.baths, 'Baths', Bath],
    [packageItem.cars, 'Cars', Car],
    [packageItem.storeys, 'Storeys', Building2],
  ]

  return (
    <motion.article
      className={`group flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-white shadow-sm transition-all duration-300 hover:border-brand-gold hover:shadow-gold ${isAva ? 'border-brand-gold/45 lg:col-span-7' : 'border-brand-border lg:col-span-5'}`}
      initial={reducedMotion ? false : { opacity: 0, y: 26 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      whileHover={reducedMotion ? undefined : { y: -7 }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: 'easeOut' }}
    >
      <Link to={detailPath} className="focus-ring relative block overflow-hidden" aria-label={`View ${packageItem.title}`}>
        <img
          src={packageItem.image}
          alt={packageItem.gallery[0].alt}
          width={imageDimensions.width}
          height={imageDimensions.height}
          className={`${isAva ? 'aspect-[16/10]' : 'aspect-[4/3]'} w-full object-cover object-bottom transition duration-700 group-hover:scale-[1.04]`}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={index === 0 ? 'high' : undefined}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/82 via-brand-charcoal/10 to-transparent" />
        <span className="absolute left-5 top-5 rounded-full border border-brand-gold/30 bg-white/95 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-gold shadow-sm">
          {packageItem.status}
        </span>
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-soft">{packageItem.packageType}</p>
          <h3 className="mt-2 font-display text-3xl font-normal leading-tight text-white">{packageItem.title}</h3>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-7 lg:p-9">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-base font-semibold text-brand-charcoal">{packageItem.size}</p>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-gold">{packageItem.priceLabel}</p>
        </div>
        <dl className="mt-7 grid grid-cols-4 border-y border-brand-border py-5 text-center sm:px-1 lg:px-2">
          {stats.map(([value, label, Icon]) => (
            <div key={label} className="border-r border-brand-border px-3 last:border-r-0 sm:px-4">
              <Icon className="mx-auto text-brand-gold" size={20} aria-hidden="true" />
              <dd className="mt-2 text-base font-semibold text-brand-charcoal">{value}</dd>
              <dt className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-muted">{label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-base font-light leading-8 text-brand-muted">{packageItem.summary}</p>
        <ul className="mt-7 grid gap-4 sm:grid-cols-2">
          {packageItem.features.slice(0, 4).map((feature) => (
            <li key={feature} className="flex gap-2 text-[13px] font-semibold uppercase leading-6 tracking-[0.1em] text-brand-charcoal">
              <CheckCircle2 className="mt-1 shrink-0 text-brand-gold" size={16} aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-auto grid gap-4 pt-8 sm:grid-cols-2">
          <Link to={detailPath} className="focus-ring gold-gradient-btn inline-flex min-h-14 items-center justify-center gap-2 px-6 py-4 text-sm font-bold uppercase">
            View Package <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link to={`/contact/?package=${encodeURIComponent(packageItem.title)}`} className="focus-ring outline-gold-btn inline-flex min-h-14 items-center justify-center px-6 py-4 text-sm font-bold uppercase">
            Enquire
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

function HeroVisual() {
  const reducedMotion = useReducedMotion()
  const ava = featuredHouseLandPackages[0]
  const imageDimensions = getHouseLandImageDimensions(ava.image)

  return (
    <motion.div
      className="relative mx-auto max-w-xl rounded-[2rem] border border-brand-gold/30 bg-white p-3 shadow-gold"
      initial={reducedMotion ? false : { opacity: 0, y: 24, rotateY: -5 }}
      animate={reducedMotion ? undefined : { opacity: 1, y: 0, rotateY: 0 }}
      whileHover={reducedMotion ? undefined : { y: -6, rotateY: -2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative overflow-hidden rounded-[1.55rem]">
        <img
          src={ava.image}
          alt={ava.gallery[0].alt}
          width={imageDimensions.width}
          height={imageDimensions.height}
          className="aspect-[4/3] w-full object-cover object-bottom"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/12 to-white/10" />
        <div className="absolute left-4 top-4 rounded-full border border-brand-gold/40 bg-white/95 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-gold sm:left-5 sm:top-5">
          Premium release
        </div>
        <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/35 bg-white/96 p-4 shadow-[0_18px_45px_rgba(17,24,39,0.18)] backdrop-blur sm:bottom-5 sm:left-5 sm:right-5 sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">Ava & Bela Residence</p>
          <h2 className="mt-2 font-display text-[1.55rem] font-normal leading-tight text-brand-charcoal sm:text-3xl">Real package pathways, refined for web enquiry.</h2>
          <dl className="mt-4 grid grid-cols-1 gap-2 text-center min-[420px]:grid-cols-3">
            {['Single & double-storey', 'Sydney & NSW', 'By enquiry'].map((value) => (
              <div key={value} className="rounded-xl border border-brand-border bg-brand-bg px-3 py-3">
                <dt className="sr-only">{value}</dt>
                <dd className="text-[11px] font-bold uppercase leading-4 tracking-[0.1em] text-brand-charcoal">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </motion.div>
  )
}

function FAQItem({ question, answer, isOpen, onClick }) {
  const reducedMotion = useReducedMotion()

  return (
    <div className="border-b border-brand-border py-4 last:border-b-0 sm:py-5">
      <button
        type="button"
        onClick={onClick}
        className="focus-ring flex min-h-16 w-full items-center justify-between gap-4 rounded-sm py-4 text-left font-display text-xl leading-7 text-brand-charcoal transition-colors hover:text-brand-gold sm:py-5"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="text-brand-gold" size={20} aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, height: 0 }}
            animate={reducedMotion ? undefined : { opacity: 1, height: 'auto' }}
            exit={reducedMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="pb-3 pr-5 pt-2 text-base font-light leading-8 text-brand-muted">{answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default function HouseAndLandPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'House & Land Packages', item: `${siteUrl}/house-and-land-packages/` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${siteUrl}/house-and-land-packages/#webpage`,
      name: 'House & Land Packages',
      description: pageDescription,
      url: `${siteUrl}/house-and-land-packages/`,
    },
  ]

  usePageMeta({
    title: 'House & Land Packages | DECENT Development',
    description: pageDescription,
    path: '/house-and-land-packages/',
    schemas,
  })

  if (!HOUSE_LAND_ENABLED) return <Navigate to="/" replace />

  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand-bg pt-28 text-brand-charcoal sm:pt-32">
        <div className="absolute inset-0 architecture-grid opacity-45" aria-hidden="true" />
        <div className="section-shell relative z-10 grid gap-12 pb-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">Premium House &amp; Land Packages</p>
            <h1 className="mt-4 max-w-4xl font-display text-3xl font-normal leading-[1.04] sm:text-4xl sm:leading-tight lg:text-6xl lg:leading-[0.98]">Ava &amp; Bela Residence Packages</h1>
            <p className="mt-6 max-w-2xl text-lg font-light leading-8 text-brand-muted">
              Explore premium single-storey and double-storey house and land pathways designed for practical Sydney living, modern finishes, and confident project delivery.
            </p>
            <p className="mt-5 max-w-2xl text-sm font-light leading-7 text-brand-muted">
              DECENT Development presents Ava Residence and Bela Residence as premium house and land package pathways for clients seeking quality residential construction across Sydney and New South Wales. Each package is subject to land availability, planning review, final inclusions, and construction scope confirmation.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#packages" className="focus-ring gold-gradient-btn inline-flex min-h-14 items-center gap-2 px-7 py-4 text-sm font-bold uppercase">
                View Packages <ArrowRight size={17} aria-hidden="true" />
              </a>
              <Link to="/contact/" className="focus-ring outline-gold-btn inline-flex min-h-14 items-center px-7 py-4 text-sm font-bold uppercase">
                Start an Enquiry
              </Link>
            </div>
          </Reveal>
          <HeroVisual />
        </div>
      </section>

      <section id="packages" className="bg-white py-16 text-brand-charcoal sm:py-24" aria-labelledby="featured-packages-title">
        <div className="section-shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Current release</p>
            <h2 id="featured-packages-title" className="mt-4 font-display text-3xl font-normal sm:text-5xl">Featured House &amp; Land Packages</h2>
            <p className="mt-5 text-base font-light leading-8 text-brand-muted">Two real package references, shaped into a clear web enquiry experience with responsible pricing, inclusion, and availability language.</p>
          </Reveal>
          <div className="mt-10 grid gap-7 lg:grid-cols-12">
            {featuredHouseLandPackages.map((packageItem, index) => (
              <PackageCard key={packageItem.id} packageItem={packageItem} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-bg py-16 text-brand-charcoal sm:py-24" aria-labelledby="compare-title">
        <div className="section-shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Package comparison</p>
            <h2 id="compare-title" className="mt-4 font-display text-3xl font-normal sm:text-5xl">Compare Ava &amp; Bela</h2>
          </Reveal>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-brand-muted lg:hidden">Scroll sideways to compare packages.</p>
          <div className="mt-6 overflow-x-auto pb-4 sm:mt-8 lg:mt-10">
            <div className="min-w-[640px] overflow-hidden rounded-[1.5rem] border border-brand-border bg-white shadow-sm lg:min-w-full">
              <div className="grid grid-cols-[0.72fr_1fr_1fr] border-b border-brand-border bg-brand-charcoal text-white">
                <div className="px-5 py-4 text-[12px] font-bold uppercase tracking-[0.14em] text-white/75">Detail</div>
                <div className="px-5 py-4 text-[12px] font-bold uppercase tracking-[0.14em] text-white">Ava Residence</div>
                <div className="px-5 py-4 text-[12px] font-bold uppercase tracking-[0.14em] text-white">Bela Residence</div>
              </div>
              {comparisonRows.map(([label, ava, bela], index) => (
                <div key={label} className="grid grid-cols-[0.72fr_1fr_1fr] gap-0 border-b border-brand-border last:border-b-0">
                  <div className="bg-brand-bg px-5 py-4 text-[12px] font-bold uppercase tracking-[0.14em] text-brand-muted">{label}</div>
                  <div className="px-5 py-4 text-sm leading-6 text-brand-charcoal">{ava}</div>
                  <div className={`px-5 py-4 text-sm leading-6 text-brand-charcoal ${index % 2 ? 'bg-brand-bg/60' : ''}`}>{bela}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 text-brand-charcoal sm:py-24" aria-labelledby="inclusions-title">
        <div className="section-shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Turnkey Inclusions</p>
            <h2 id="inclusions-title" className="mt-4 font-display text-3xl font-normal sm:text-5xl">Turnkey Inclusions</h2>
            <p className="mt-5 text-base font-light leading-8 text-brand-muted">
              A clear inclusion structure designed to help clients understand what may be included before final contract documentation. Items may include the categories below, subject to final specification, site conditions, package scope, and written confirmation during consultation.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {houseLandInclusions.map((group, index) => (
              <Reveal key={group.category} index={index} className="min-h-44 rounded-2xl border border-brand-border bg-brand-bg p-6 shadow-sm transition hover:border-brand-gold hover:shadow-gold sm:p-7">
                <Sparkles className="text-brand-gold" size={22} aria-hidden="true" />
                <h3 className="mt-5 text-base font-bold uppercase leading-6 tracking-[0.12em] text-brand-charcoal">{group.category}</h3>
                <p className="mt-4 line-clamp-2 text-sm font-light leading-7 text-brand-muted">{group.items.slice(0, 2).join('. ')}.</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-porcelain py-16 text-brand-charcoal sm:py-24" aria-labelledby="process-title">
        <div className="section-shell">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">House &amp; Land Process</p>
            <h2 id="process-title" className="mt-4 font-display text-3xl font-normal sm:text-5xl">House &amp; Land Process</h2>
          </Reveal>
          <ol className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {processSteps.map(([title, copy], index) => (
              <Reveal key={title} index={index} as={motion.li} className="flex min-h-60 flex-col rounded-2xl border border-brand-border bg-white p-6 shadow-sm sm:p-7">
                <span className="font-display text-4xl text-brand-gold/70">0{index + 1}</span>
                <h3 className="mt-6 text-sm font-bold uppercase leading-6 tracking-[0.13em] text-brand-charcoal">{title}</h3>
                <p className="mt-4 text-sm font-light leading-7 text-brand-muted">{copy}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-brand-bg py-16 text-brand-charcoal sm:py-24" aria-labelledby="faq-title">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="eyebrow">Client questions</p>
            <h2 id="faq-title" className="mt-4 font-display text-3xl font-normal sm:text-5xl">Frequently Asked Questions</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                [Home, 'Ava and Bela package pathways'],
                [SunMedium, 'Energy and BASIX considerations'],
                [ClipboardCheck, 'Scope confirmed before contract'],
              ].map(([Icon, label]) => (
                <div key={label} className="rounded-2xl border border-brand-border bg-white p-5 shadow-sm">
                  <Icon className="text-brand-gold" size={20} aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold uppercase leading-6 tracking-[0.11em] text-brand-charcoal">{label}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="rounded-[1.5rem] border border-brand-border bg-white p-6 shadow-sm sm:p-8">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaqIndex === index}
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              />
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 text-brand-charcoal sm:py-24">
        <div className="section-shell">
          <Reveal className="rounded-[1.75rem] border border-brand-gold/30 bg-brand-bg p-8 text-center shadow-gold sm:p-14">
            <KeyRound className="mx-auto text-brand-gold" size={28} aria-hidden="true" />
            <h2 className="mt-5 font-display text-3xl font-normal sm:text-5xl">Ready to discuss Ava or Bela Residence?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-8 text-brand-muted">
              Speak with DECENT Development about package suitability, land requirements, inclusions, pricing, and the construction pathway.
            </p>
            <Link to="/contact/" className="focus-ring gold-gradient-btn mt-8 inline-flex min-h-14 items-center gap-2 px-7 py-4 text-sm font-bold uppercase">
              Start Your Enquiry <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
