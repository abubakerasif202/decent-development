import { useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  Car,
  ChevronDown,
  ClipboardCheck,
  DraftingCompass,
  Home,
  KeyRound,
  Layers3,
  MapPin,
  Ruler,
  SearchCheck,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import { HOUSE_LAND_ENABLED } from '../config/featureFlags.js'
import usePageMeta from '../hooks/usePageMeta.js'
import projectResidential from '../assets/stitch/project-residential.webp'
import {
  houseLandPackages,
  packageRegions,
  packageTypes,
} from '../data/houseLandPackages.js'
import { homeDesignOptions } from '../data/homeDesignOptions.js'

const siteUrl = 'https://www.decentdevelopment.com.au'

const processSteps = [
  {
    title: 'Site & brief review',
    icon: SearchCheck,
    description: 'We start by understanding your goals, preferred location, project type, budget direction, and any land or property details you already have. This helps establish whether the opportunity is best suited to a family home, duplex, triplex, or multi-residential pathway.'
  },
  {
    title: 'Feasibility guidance',
    icon: ClipboardCheck,
    description: 'Our team considers practical construction factors, site conditions, access, potential constraints, planning direction, and delivery expectations. The goal is to help you understand the project pathway before committing to major decisions.'
  },
  {
    title: 'Concept and planning support',
    icon: DraftingCompass,
    description: 'Once the project direction is clearer, we help shape the concept around lifestyle goals, land potential, construction efficiency, and finish expectations. This stage supports better decision-making before approvals and build planning progress.'
  },
  {
    title: 'Construction pathway',
    icon: Building2,
    description: 'DECENT Development helps clients understand the construction process, likely sequencing, required documentation, consultant coordination, and the steps needed to move from planning into delivery.'
  },
  {
    title: 'Project delivery support',
    icon: KeyRound,
    description: 'From preparation through to construction delivery, our focus is on communication, quality control, safety, and practical project management so clients can move forward with confidence.'
  },
]

const locations = [
  'North Sydney',
  'Auburn',
  'Regents Park',
  'Rouse Hill',
  'Canley Vale',
  'Canley Heights',
  'Greater Sydney',
  'NSW',
]

const initialFilters = {
  region: 'All regions',
  packageType: 'All package types',
  bedrooms: 'Any bedrooms',
  storeys: 'Any storeys',
}

function PackageCard({ packageItem, index, reducedMotion }) {
  const detailPath = `/house-and-land-packages/${packageItem.slug}/`
  const specifications = [
    { label: 'Beds', value: packageItem.beds, icon: BedDouble },
    { label: 'Baths', value: packageItem.baths, icon: Bath },
    { label: 'Cars', value: packageItem.cars, icon: Car },
    { label: 'Storeys', value: packageItem.storeys, icon: Building2 },
  ]

  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden border border-brand-border bg-white rounded-2xl transition-colors duration-300 hover:border-brand-gold hover:shadow-premium"
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={reducedMotion ? undefined : { y: -7 }}
      transition={{ duration: 0.48, delay: reducedMotion ? 0 : (index % 3) * 0.04, ease: 'easeOut' }}
    >
      <Link to={detailPath} className="focus-ring relative block overflow-hidden" aria-label={`View ${packageItem.title} details`}>
        <img
          src={packageItem.image}
          alt={`${packageItem.title} illustrative residential opportunity`}
          className="aspect-[16/10] h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          decoding="async"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 border border-brand-gold/30 bg-white/95 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-brand-gold backdrop-blur shadow-sm">
          {packageItem.status}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-soft">
            {packageItem.suburb} · {packageItem.region}
          </p>
          <h3 className="mt-2 font-display text-2xl font-normal leading-tight text-white">{packageItem.title}</h3>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="border border-brand-border px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-brand-muted">
            {packageItem.packageType}
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">{packageItem.priceLabel}</span>
        </div>

        <dl className="mt-5 grid grid-cols-4 border-y border-brand-border py-4">
          {specifications.map(({ label, value, icon: Icon }) => (
            <div key={label} className="border-r border-brand-border px-2 text-center last:border-r-0">
              <Icon className="mx-auto text-brand-gold" size={17} aria-hidden="true" />
              <dd className="mt-2 text-sm font-semibold text-brand-charcoal">{value}</dd>
              <dt className="mt-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-brand-muted">{label}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex items-center gap-2 text-xs text-brand-charcoal">
          <Ruler className="text-brand-gold" size={16} aria-hidden="true" />
          <span>{packageItem.landSize}</span>
        </div>
        <p className="mt-4 line-clamp-2 text-sm font-light leading-6 text-brand-muted">{packageItem.summary}</p>

        <ul className="mt-5 grid gap-2" aria-label={`${packageItem.title} features`}>
          {packageItem.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-charcoal">
              <span className="h-px w-4 bg-brand-gold" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto grid gap-3 pt-6 sm:grid-cols-2">
          <Link
            to={detailPath}
            className="focus-ring gold-gradient-btn inline-flex min-h-12 items-center justify-center gap-2 px-4 py-3 text-center text-[10px] font-bold uppercase"
          >
            View Package Details
            <ArrowRight className="transition-transform group-hover:translate-x-1" size={15} aria-hidden="true" />
          </Link>
          <Link
            to="/contact/"
            className="focus-ring outline-gold-btn inline-flex min-h-12 items-center justify-center px-4 py-3 text-center text-[10px] font-bold uppercase"
            aria-label={`Start enquiry about ${packageItem.title}`}
          >
            Start Enquiry
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

function HouseAndLandVisual() {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className="relative mx-auto max-w-xl overflow-hidden rounded-[2rem] border border-brand-border bg-brand-surface p-4 premium-shadow backdrop-blur-sm"
      style={{ transformStyle: 'preserve-3d' }}
      initial={reducedMotion ? false : { opacity: 0, y: 24, rotateY: -8 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      whileHover={reducedMotion ? undefined : { rotateY: -4, rotateX: 3, y: -6 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative overflow-hidden rounded-[1.5rem] border border-brand-border bg-brand-surface">
        <img
          src={projectResidential}
          alt="Illustrative premium residential house and land concept"
          className="aspect-[4/5] h-full w-full object-cover"
          decoding="async"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full border border-brand-border bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-charcoal backdrop-blur">
          Illustrative opportunity
        </div>
        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-brand-border bg-white/90 p-5 backdrop-blur shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-brand-gold">
            From land review to delivery
          </p>
          <h2 className="mt-2 font-display text-xl font-normal text-brand-charcoal leading-tight">
            A clearer pathway to a premium residential project
          </h2>
          <div className="mt-4 grid gap-2 grid-cols-3">
            {['Family homes', 'Duplexes', 'Triplexes'].map((label) => (
              <div
                key={label}
                className="border border-brand-border bg-brand-surface px-3 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-charcoal"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function FAQItem({ question, answer, isOpen, onClick, reducedMotion }) {
  return (
    <div className="border-b border-brand-border last:border-b-0 py-5">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 text-left font-display text-lg font-normal text-brand-charcoal hover:text-brand-gold transition-colors duration-250 py-2"
        aria-expanded={isOpen}
      >
        <span className="pr-4">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="text-brand-gold flex-shrink-0"
        >
          <ChevronDown size={20} aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={reducedMotion ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
            animate={reducedMotion ? { opacity: 1, height: 'auto' } : { opacity: 1, height: 'auto' }}
            exit={reducedMotion ? { opacity: 0, height: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="mt-2 text-sm font-light leading-7 text-brand-muted pb-2 pr-6">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function HouseAndLandPage() {
  const reducedMotion = useReducedMotion()
  const [filters, setFilters] = useState(initialFilters)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const pageUrl = `${siteUrl}/house-and-land-packages/`
  const description =
    'Explore premium house and land package opportunities with DECENT Development across Sydney and New South Wales. Enquire about residential builds, duplexes, triplexes, and development-ready land options.'

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': `${siteUrl}/`,
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'House & Land Packages',
          'item': pageUrl,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'House & Land Packages',
      'description': description,
      'url': pageUrl,
    },
  ]

  usePageMeta({
    title: 'House & Land Packages | DECENT Development',
    description,
    path: '/house-and-land-packages/',
    schemas,
  })

  const visiblePackages = useMemo(
    () =>
      houseLandPackages.filter((packageItem) => {
        const matchesRegion = filters.region === initialFilters.region || packageItem.region === filters.region
        const matchesType =
          filters.packageType === initialFilters.packageType || packageItem.packageType === filters.packageType
        const matchesBedrooms =
          filters.bedrooms === initialFilters.bedrooms || packageItem.beds === Number(filters.bedrooms)
        const matchesStoreys =
          filters.storeys === initialFilters.storeys || packageItem.storeys === Number(filters.storeys)

        return matchesRegion && matchesType && matchesBedrooms && matchesStoreys
      }),
    [filters],
  )

  if (!HOUSE_LAND_ENABLED) {
    return <Navigate to="/" replace />
  }

  const filtersActive = Object.entries(initialFilters).some(([key, value]) => filters[key] !== value)
  const updateFilter = (name, value) => setFilters((current) => ({ ...current, [name]: value }))

  return (
    <>
      <PageHero
        eyebrow="Premium Residential Opportunities"
        title="House & Land Packages"
        copy="Premium house and land package opportunities across Sydney and New South Wales, backed by practical construction knowledge and end-to-end development guidance."
        stats={[
          { label: 'Project types', value: 'Homes to triplexes' },
          { label: 'Guidance', value: 'Land to delivery' },
          { label: 'Region', value: 'Sydney & NSW' },
        ]}
        visual={<HouseAndLandVisual />}
      >
        <p className="max-w-2xl text-sm font-light leading-7 text-brand-muted">
          DECENT Development helps clients explore residential opportunities with confidence, from new family homes to duplex, triplex, and multi-residential development-ready sites. Our team supports early feasibility, design direction, construction planning, and project delivery so clients can understand the full pathway before committing to their next move.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="#opportunities"
            className="focus-ring gold-gradient-btn inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs font-bold uppercase"
          >
            View Opportunities
            <ArrowRight size={17} aria-hidden="true" />
          </a>
          <Link
            to="/contact/"
            className="focus-ring outline-gold-btn inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs font-bold uppercase"
          >
            Start an Enquiry
          </Link>
        </div>
      </PageHero>

      <section className="bg-porcelain py-16 text-brand-charcoal sm:py-20" aria-labelledby="house-land-intro-title">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <p className="eyebrow text-brand-gold">Land to completion</p>
              <h2 id="house-land-intro-title" className="mt-4 font-display text-3xl font-normal leading-tight sm:text-4xl text-brand-charcoal">
                Build with confidence from land to completion
              </h2>
            </motion.div>
            <motion.div
              className="space-y-6 max-w-3xl text-base font-light leading-8 text-brand-muted"
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: reducedMotion ? 0 : 0.08, ease: 'easeOut' }}
            >
              <p>
                A successful house and land package starts long before construction begins. It requires the right site, a suitable design direction, realistic planning, and a builder who understands how to turn an idea into a practical build pathway. DECENT Development works with clients to review project goals, site suitability, design intent, construction requirements, and delivery expectations.
              </p>
              <p>
                Whether you are looking for a family residence, investment-focused duplex, triplex development, or a multi-residential opportunity, our role is to help you make informed decisions from the earliest stage.
              </p>
            </motion.div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Site-aware planning',
                description: 'Early review of the site, project goals, constraints, and practical construction pathway.',
                icon: SearchCheck,
              },
              {
                title: 'Residential construction experience',
                description: 'Practical guidance shaped by real residential construction and project-delivery considerations.',
                icon: DraftingCompass,
              },
              {
                title: 'Duplex and triplex development guidance',
                description: 'Relevant support for attached, dual occupancy, triplex, and multi-residential pathways.',
                icon: ClipboardCheck,
              },
              {
                title: 'Clear communication from enquiry to delivery',
                description: 'A considered process that keeps decisions, expectations, and next steps clear.',
                icon: Building2,
              },
            ].map(({ title, description: desc, icon: Icon }, index) => (
              <motion.div
                key={title}
                className="border border-brand-border bg-white rounded-2xl p-6 shadow-sm hover:border-brand-gold hover:shadow-premium transition-all duration-300"
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: reducedMotion ? 0 : index * 0.05, ease: 'easeOut' }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-surface border border-brand-border text-brand-gold">
                  <Icon size={24} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-sm font-bold uppercase tracking-[0.12em] text-brand-charcoal">{title}</h3>
                <p className="mt-3 text-xs font-light leading-6 text-brand-muted">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 text-brand-charcoal sm:py-24 border-t border-brand-border" aria-labelledby="package-options-title">
        <div className="section-shell">
          <div className="text-center max-w-3xl mx-auto">
            <p className="eyebrow text-brand-gold">Flexible Build Options</p>
            <h2 id="package-options-title" className="mt-4 font-display text-3xl font-normal leading-tight text-brand-charcoal sm:text-4xl">
              Tailored NSW Residential Development Solutions
            </h2>
            <p className="mt-4 text-base font-light leading-7 text-brand-muted">
              Explore residential pathways suited to families, investors, landowners, and development-focused clients.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Family House & Land',
                label: 'New Home Opportunity',
                bestFor: 'Families and owner-occupiers',
                description: 'A practical pathway for clients looking to build a quality new home with strong street presence, functional layouts, and long-term value.',
                icon: Home,
                features: [
                  'Practical family layouts',
                  'Quality finishes',
                  'Strong street presence',
                  'Long-term liveability',
                ],
              },
              {
                title: 'Duplex Opportunities',
                label: 'Attached Residential Development',
                bestFor: 'Investors, landowners, and dual occupancy projects',
                description: 'A development-focused option for clients exploring attached duplex projects across Sydney and NSW, from early feasibility through delivery expectations.',
                icon: Building2,
                features: [
                  'Dual occupancy potential',
                  'Better land utilisation',
                  'Residential investment pathway',
                  'Duplex development guidance',
                ],
              },
              {
                title: 'Triplex & Multi-Residential',
                label: 'Higher-Yield Residential Projects',
                bestFor: 'Development-focused clients',
                description: 'A premium pathway for clients considering triplex or multi-residential opportunities requiring careful planning, sequencing, access coordination, and finish control.',
                icon: Layers3,
                features: [
                  'Triplex planning',
                  'Multi-residential construction',
                  'Efficient sequencing',
                  'Premium project outcomes',
                ],
              },
              {
                title: 'Custom Build Pathways',
                label: 'Tailored Residential Projects',
                bestFor: 'Clients with land or a specific build vision',
                description: 'For clients who already own land or want a more tailored construction pathway, DECENT Development can help shape the project from concept to build-ready planning.',
                icon: DraftingCompass,
                features: [
                  'Site-specific planning',
                  'Custom home direction',
                  'Construction feasibility',
                  'Build-ready support',
                ],
              },
            ].map(({ title, label, bestFor, description: desc, icon: Icon, features }, index) => (
              <motion.div
                key={title}
                className="flex flex-col border border-brand-border bg-brand-bg rounded-2xl p-6 shadow-sm hover:border-brand-gold hover:shadow-premium transition-all duration-300"
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.48, delay: reducedMotion ? 0 : index * 0.04, ease: 'easeOut' }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-brand-border text-brand-gold">
                  <Icon size={24} aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display text-xl font-normal text-brand-charcoal">{title}</h3>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-gold">{label}</p>
                <p className="mt-3 text-xs font-semibold leading-5 text-brand-charcoal">Best suited for: {bestFor}</p>
                <p className="mt-4 text-xs font-light leading-6 text-brand-muted flex-1">{desc}</p>
                <ul className="mt-6 space-y-2 border-t border-brand-border pt-5" aria-label={`${title} features`}>
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-charcoal">
                      <span className="mt-1.5 h-1 w-3 bg-brand-gold flex-shrink-0" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="#opportunities" className="focus-ring mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-gold">
                  Enquire Now <ArrowRight size={14} aria-hidden="true" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-porcelain py-16 text-brand-charcoal sm:py-24 border-t border-brand-border" aria-labelledby="home-design-options-title">
        <div className="section-shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-brand-gold">Indicative Design Pathways</p>
            <h2 id="home-design-options-title" className="mt-4 font-display text-3xl font-normal leading-tight sm:text-4xl">Home Design Options</h2>
            <p className="mt-4 text-base font-light leading-7 text-brand-muted">Indicative residential design pathways for family homes, duplexes, triplexes, and multi-residential projects.</p>
            <p className="mt-4 text-sm font-light leading-7 text-brand-muted">Every site requires its own review. Final layouts, inclusions, and construction scope are confirmed after site assessment, planning review, and project consultation.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {homeDesignOptions.map((design, index) => (
              <motion.article
                key={design.id}
                className="group flex h-full flex-col rounded-2xl border border-brand-border bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-gold hover:shadow-premium sm:p-8"
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={reducedMotion ? undefined : { y: -6 }}
                transition={{ duration: 0.5, delay: reducedMotion ? 0 : index * 0.05, ease: 'easeOut' }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-gold">{design.bestFor}</p>
                <h3 className="mt-3 font-display text-3xl font-normal text-brand-charcoal">{design.name}</h3>
                <p className="mt-4 text-sm font-light leading-7 text-brand-muted">{design.summary}</p>
                <dl className="mt-6 grid grid-cols-4 border-y border-brand-border py-4 text-center">
                  {[['Beds', design.beds], ['Baths', design.baths], ['Cars', design.cars], ['Storeys', design.storeys]].map(([label, value]) => (
                    <div key={label} className="border-r border-brand-border px-1 last:border-r-0">
                      <dd className="text-sm font-semibold text-brand-charcoal">{value}</dd>
                      <dt className="mt-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-brand-muted">{label}</dt>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-xs font-semibold text-brand-charcoal">Suitable block width: {design.blockWidth}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {design.features.slice(0, 4).map((feature) => <li key={feature} className="flex gap-2 text-xs leading-5 text-brand-muted"><span className="mt-2 h-px w-4 shrink-0 bg-brand-gold" aria-hidden="true" />{feature}</li>)}
                </ul>
                <p className="mt-6 text-[10px] uppercase leading-5 tracking-[0.12em] text-brand-muted">Indicative design pathway · Subject to site review · Subject to planning requirements</p>
                <Link to="/contact/" className="focus-ring gold-gradient-btn mt-6 inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase">
                  Discuss This Design <ArrowRight className="transition-transform group-hover:translate-x-1" size={16} aria-hidden="true" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="opportunities" className="bg-brand-bg py-16 text-brand-charcoal sm:py-24" aria-labelledby="opportunities-title">
        <div className="section-shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-brand-gold">Residential inventory</p>
              <h2 id="opportunities-title" className="mt-4 font-display text-3xl font-normal leading-tight text-brand-charcoal sm:text-4xl">
                Current Opportunities
              </h2>
              <p className="mt-5 text-base font-light leading-7 text-brand-muted">
                A curated selection of residential package pathways and development-ready opportunities.
              </p>
              <p className="mt-4 text-sm font-light leading-7 text-brand-muted">
                The opportunities listed below are designed to help clients understand the types of projects DECENT Development can support. Availability, pricing, inclusions, site suitability, and delivery timelines are confirmed during enquiry and consultation.
              </p>
            </div>
            <div className="border border-brand-border bg-white rounded-xl px-5 py-4 shadow-sm">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-brand-muted">Showing opportunities</p>
              <p className="mt-2 font-display text-3xl text-brand-gold">{visiblePackages.length}</p>
            </div>
          </div>

          <div className="mt-10 border border-brand-border bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="text-brand-gold" size={20} aria-hidden="true" />
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-charcoal">Filter opportunities</h3>
              </div>
              {filtersActive ? (
                <button
                  type="button"
                  className="focus-ring inline-flex min-h-11 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-gold transition hover:text-brand-gold/80"
                  onClick={() => setFilters(initialFilters)}
                >
                  Clear filters
                  <X size={15} aria-hidden="true" />
                </button>
              ) : null}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { name: 'region', label: 'Region', options: [initialFilters.region, ...packageRegions] },
                { name: 'packageType', label: 'Package type', options: [initialFilters.packageType, ...packageTypes] },
                { name: 'bedrooms', label: 'Bedrooms', options: [initialFilters.bedrooms, '4', '6', '8', '9'] },
                { name: 'storeys', label: 'Storeys', options: [initialFilters.storeys, '1', '2'] },
              ].map(({ name, label, options }) => (
                <label htmlFor={`house-land-filter-${name}`} key={name} className="grid gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-brand-muted">
                  {label}
                  <select
                    id={`house-land-filter-${name}`}
                    name={name}
                    autoComplete="off"
                    value={filters[name]}
                    onChange={(event) => updateFilter(name, event.target.value)}
                    className="focus-ring min-h-12 w-full border border-brand-border bg-brand-bg rounded-lg px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-brand-charcoal"
                  >
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </div>

          {visiblePackages.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visiblePackages.map((packageItem, index) => (
                <PackageCard
                  key={packageItem.id}
                  packageItem={packageItem}
                  index={index}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 border border-brand-border bg-white rounded-2xl px-6 py-14 text-center shadow-sm">
              <p className="font-display text-2xl text-brand-charcoal">No opportunities match those filters.</p>
              <p className="mt-3 text-sm text-brand-muted">Clear the filters or start an enquiry for a tailored project discussion.</p>
              <button
                type="button"
                className="focus-ring outline-gold-btn mt-6 inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs font-bold uppercase"
                onClick={() => setFilters(initialFilters)}
              >
                Clear filters
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          )}

          <p className="mt-6 text-xs font-light leading-6 text-brand-muted">
            Opportunities shown are illustrative package pathways and remain subject to site availability, planning,
            feasibility, design development, approvals, and a formal project enquiry.
          </p>
        </div>
      </section>

      <section className="bg-porcelain py-16 text-brand-charcoal sm:py-24" aria-labelledby="house-land-process-title">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="eyebrow text-brand-gold">A considered pathway</p>
              <h2 id="house-land-process-title" className="mt-4 font-display text-3xl font-normal leading-tight sm:text-4xl text-brand-charcoal">
                Our house and land process
              </h2>
            </div>
            <p className="max-w-3xl text-base font-light leading-8 text-brand-muted">
              A clearer pathway from early enquiry to build-ready confidence.
            </p>
          </div>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map(({ title, icon: Icon, description }, index) => (
              <motion.li
                key={title}
                className="border border-brand-border bg-white rounded-2xl p-5 shadow-sm flex flex-col h-full"
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: reducedMotion ? 0 : index * 0.05, ease: 'easeOut' }}
              >
                <div className="flex items-center justify-between gap-4">
                  <Icon className="text-brand-gold" size={21} aria-hidden="true" />
                  <span className="font-display text-3xl text-brand-gold/60">0{index + 1}</span>
                </div>
                <h3 className="mt-7 text-xs font-bold uppercase leading-5 tracking-[0.16em] text-brand-charcoal">{title}</h3>
                <p className="mt-3 text-[11px] font-light leading-5 text-brand-muted flex-1">{description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-brand-bg py-16 text-brand-charcoal sm:py-24" aria-labelledby="locations-title">
        <div className="absolute inset-0 architecture-grid opacity-40" aria-hidden="true" />
        <div className="section-shell relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <MapPin className="text-brand-gold" size={28} aria-hidden="true" />
            <p className="eyebrow mt-7 text-brand-gold">Local NSW experience</p>
            <h2 id="locations-title" className="mt-4 font-display text-3xl font-normal leading-tight text-brand-charcoal sm:text-4xl">
              Focused across Sydney and NSW
            </h2>
            <p className="mt-5 max-w-2xl text-base font-light leading-8 text-brand-muted">
              DECENT Development works across New South Wales from its North Sydney office, with project experience and residential development interest across established and growing Sydney suburbs. Our house and land package enquiries may include family home builds, duplex development, triplex development, and multi-residential opportunities across Sydney and surrounding NSW locations.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-3">
            {locations.map((location, index) => (
              <motion.span
                key={location}
                className="border border-brand-border bg-white rounded-lg px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-charcoal shadow-sm"
                initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: reducedMotion ? 0 : index * 0.04, ease: 'easeOut' }}
              >
                {location}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-porcelain py-16 text-brand-charcoal sm:py-24 border-t border-brand-border" aria-labelledby="why-choose-title">
        <div className="section-shell">
          <div className="text-center max-w-3xl mx-auto">
            <p className="eyebrow text-brand-gold">The Decent Difference</p>
            <h2 id="why-choose-title" className="mt-4 font-display text-3xl font-normal leading-tight text-brand-charcoal sm:text-4xl">
              Why choose DECENT Development?
            </h2>
            <p className="mt-4 text-base font-light leading-7 text-brand-muted">
              Practical construction knowledge, relevant residential experience, and a considered approach to every enquiry.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Construction-first guidance',
                description: 'We approach opportunities with practical construction knowledge, helping clients understand buildability, sequencing, materials, and delivery considerations before major commitments are made.',
              },
              {
                title: 'Duplex and triplex experience',
                description: 'Our project portfolio includes residential development work across duplex and triplex-style projects, giving clients relevant guidance for attached and multi-residential pathways.',
              },
              {
                title: 'Premium finish focus',
                description: 'We focus on quality finishes, strong street presence, practical layouts, and long-term value rather than generic package outcomes.',
              },
              {
                title: 'NSW project knowledge',
                description: 'Based in North Sydney, DECENT Development works with clients across Sydney and New South Wales, supporting project enquiries with local construction and development awareness.',
              },
            ].map(({ title, description: desc }, index) => (
              <motion.div
                key={title}
                className="border border-brand-border bg-white rounded-2xl p-6 shadow-sm hover:border-brand-gold hover:shadow-premium transition-all duration-300"
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: reducedMotion ? 0 : index * 0.05, ease: 'easeOut' }}
              >
                <span className="text-xs font-bold text-brand-gold uppercase tracking-[0.2em] block">0{index + 1}</span>
                <h3 className="mt-3 text-sm font-bold uppercase tracking-[0.12em] text-brand-charcoal">{title}</h3>
                <p className="mt-3 text-xs font-light leading-6 text-brand-muted">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-bg py-16 text-brand-charcoal sm:py-24 border-t border-brand-border" aria-labelledby="house-land-faq-title">
        <div className="section-shell max-w-4xl">
          <div className="text-center">
            <p className="eyebrow text-brand-gold">Common Queries</p>
            <h2 id="house-land-faq-title" className="mt-4 font-display text-3xl font-normal leading-tight text-brand-charcoal sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-base font-light leading-7 text-brand-muted">
              Practical answers to common house and land package enquiries.
            </p>
          </div>

          <div className="mt-12 border border-brand-border bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
            {[
              {
                question: 'Do you offer fixed house and land package prices?',
                answer: 'Package pricing depends on location, land details, design requirements, inclusions, approvals, and construction scope. DECENT Development provides pricing guidance after reviewing the project brief and opportunity details.',
              },
              {
                question: 'Can you help with duplex or triplex development?',
                answer: 'Yes. DECENT Development supports clients exploring duplex, triplex, and multi-residential development pathways across Sydney and New South Wales.',
              },
              {
                question: 'Do I need to already own land?',
                answer: 'No. Clients can enquire with or without secured land. If land is already available, we can help review the project direction and construction pathway. If land is not secured, we can discuss the type of opportunity that may suit your goals.',
              },
              {
                question: 'What areas do you service?',
                answer: 'DECENT Development works across New South Wales from its North Sydney office, with project interest across Sydney suburbs including Auburn, Regents Park, Rouse Hill, Canley Vale, Canley Heights, and surrounding areas.',
              },
              {
                question: 'How do I start a house and land enquiry?',
                answer: 'You can start by contacting DECENT Development with your preferred location, project type, budget direction, and any land or property details. Our team will review the enquiry and guide you on the next steps.',
              },
            ].map(({ question, answer }, index) => (
              <FAQItem
                key={question}
                question={question}
                answer={answer}
                isOpen={openFaqIndex === index}
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-bg py-16 text-brand-charcoal sm:py-24 border-t border-brand-border" aria-labelledby="house-land-cta-title">
        <div className="section-shell">
          <motion.div
            className="relative overflow-hidden border border-brand-border bg-white rounded-3xl px-6 py-12 text-center premium-shadow sm:px-10 sm:py-16"
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 architecture-grid opacity-30" aria-hidden="true" />
            <div className="relative z-10 mx-auto max-w-3xl">
              <p className="eyebrow text-brand-gold">Start the conversation</p>
              <h2 id="house-land-cta-title" className="mt-4 font-display text-3xl font-normal leading-tight text-brand-charcoal sm:text-4xl">
                Looking for a house and land opportunity?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-8 text-brand-muted">
                Speak with DECENT Development about your preferred location, project goals, budget direction, and residential development plans. Whether you are considering a family home, duplex, triplex, or multi-residential project, our team can help you understand the next step.
              </p>
              <Link
                to="/contact/"
                className="focus-ring gold-gradient-btn mt-8 inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs font-bold uppercase"
              >
                Start your house &amp; land enquiry
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
