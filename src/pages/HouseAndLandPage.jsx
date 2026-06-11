import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  Car,
  ClipboardCheck,
  DraftingCompass,
  KeyRound,
  MapPin,
  Ruler,
  SearchCheck,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import projectResidential from '../assets/stitch/project-residential.webp'
import {
  houseLandPackages,
  packageRegions,
  packageTypes,
} from '../data/houseLandPackages.js'

const siteUrl = 'https://decentdevelopment.com.au'

const processSteps = [
  { title: 'Site & brief review', icon: SearchCheck },
  { title: 'Feasibility guidance', icon: ClipboardCheck },
  { title: 'Concept and planning support', icon: DraftingCompass },
  { title: 'Construction pathway', icon: Building2 },
  { title: 'Project delivery support', icon: KeyRound },
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
  const enquiryPath = `/contact/?package=${encodeURIComponent(packageItem.title)}`
  const specifications = [
    { label: 'Beds', value: packageItem.beds, icon: BedDouble },
    { label: 'Baths', value: packageItem.baths, icon: Bath },
    { label: 'Cars', value: packageItem.cars, icon: Car },
    { label: 'Storeys', value: packageItem.storeys, icon: Building2 },
  ]

  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden border border-gold/25 bg-charcoal transition-colors duration-300 hover:border-gold"
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={reducedMotion ? undefined : { y: -7 }}
      transition={{ duration: 0.48, delay: reducedMotion ? 0 : (index % 3) * 0.04, ease: 'easeOut' }}
    >
      <div className="relative overflow-hidden">
        <img
          src={packageItem.image}
          alt={`${packageItem.title} illustrative residential opportunity`}
          className="aspect-[16/10] h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          decoding="async"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 border border-gold/40 bg-ink/85 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-gold backdrop-blur">
          {packageItem.status}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-soft">
            {packageItem.suburb} · {packageItem.region}
          </p>
          <h3 className="mt-2 font-display text-2xl font-normal leading-tight text-ivory">{packageItem.title}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="border border-gold/25 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-smoke">
            {packageItem.packageType}
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-gold">{packageItem.priceLabel}</span>
        </div>

        <dl className="mt-5 grid grid-cols-4 border-y border-white/10 py-4">
          {specifications.map(({ label, value, icon: Icon }) => (
            <div key={label} className="border-r border-white/10 px-2 text-center last:border-r-0">
              <Icon className="mx-auto text-gold" size={17} aria-hidden="true" />
              <dd className="mt-2 text-sm font-semibold text-ivory">{value}</dd>
              <dt className="mt-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-stone">{label}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex items-center gap-2 text-xs text-smoke">
          <Ruler className="text-gold" size={16} aria-hidden="true" />
          <span>{packageItem.landSize}</span>
        </div>
        <p className="mt-4 text-sm font-light leading-6 text-smoke">{packageItem.description}</p>

        <ul className="mt-5 grid gap-2" aria-label={`${packageItem.title} features`}>
          {packageItem.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone">
              <span className="h-px w-4 bg-gold" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        <Link
          to={enquiryPath}
          className="focus-ring gold-gradient-btn mt-6 inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase"
          aria-label={`Enquire about ${packageItem.title}`}
        >
          Enquire about this package
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  )
}

function HouseAndLandVisual() {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className="relative mx-auto max-w-xl overflow-hidden rounded-[2rem] border border-gold/20 bg-white/5 p-4 shadow-premium backdrop-blur-sm"
      style={{ transformStyle: 'preserve-3d' }}
      initial={reducedMotion ? false : { opacity: 0, y: 24, rotateY: -8 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      whileHover={reducedMotion ? undefined : { rotateY: -4, rotateX: 3, y: -6 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-ink">
        <img
          src={projectResidential}
          alt="Illustrative premium residential house and land concept"
          className="aspect-[4/5] h-full w-full object-cover"
          decoding="async"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-ivory backdrop-blur">
          Illustrative opportunity
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-soft">
            From land review to delivery
          </p>
          <h2 className="mt-2 font-display text-2xl font-normal text-ivory">
            A clearer pathway to a premium residential project
          </h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {['Family homes', 'Duplexes', 'Triplexes'].map((label) => (
              <div
                key={label}
                className="border border-white/10 bg-black/40 px-3 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-smoke backdrop-blur"
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

export default function HouseAndLandPage() {
  const reducedMotion = useReducedMotion()
  const [filters, setFilters] = useState(initialFilters)
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
      '@type': 'Service',
      'name': 'House & Land Packages',
      'description': description,
      'url': pageUrl,
      'provider': {
        '@type': 'GeneralContractor',
        'name': 'DECENT Development',
        'url': `${siteUrl}/`,
      },
      'areaServed': {
        '@type': 'AdministrativeArea',
        'name': 'New South Wales',
      },
      'serviceType': [
        'House and land packages',
        'Residential construction',
        'Duplex development',
        'Triplex development',
      ],
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

  const filtersActive = Object.entries(initialFilters).some(([key, value]) => filters[key] !== value)
  const updateFilter = (name, value) => setFilters((current) => ({ ...current, [name]: value }))

  return (
    <>
      <PageHero
        eyebrow="House & Land Packages"
        title="House & Land Packages"
        copy="Premium residential opportunities across Sydney and New South Wales."
        stats={[
          { label: 'Project types', value: 'Homes to triplexes' },
          { label: 'Guidance', value: 'Land to delivery' },
          { label: 'Region', value: 'Sydney & NSW' },
        ]}
        visual={<HouseAndLandVisual />}
      >
        <p className="max-w-2xl text-sm font-light leading-7 text-smoke">
          DECENT Development helps clients explore house and land package opportunities, from family homes to
          duplex and triplex development-ready sites. Our team brings construction knowledge, project planning, and
          local NSW experience to help clients move from enquiry to build-ready confidence.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="#opportunities"
            className="focus-ring gold-gradient-btn inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs font-bold uppercase"
          >
            View opportunities
            <ArrowRight size={17} aria-hidden="true" />
          </a>
          <Link
            to="/contact/"
            className="focus-ring outline-gold-btn inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs font-bold uppercase"
          >
            Start an enquiry
          </Link>
        </div>
      </PageHero>

      <section className="bg-porcelain py-16 text-ink sm:py-20" aria-labelledby="house-land-intro-title">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <p className="eyebrow">Land to completion</p>
            <h2 id="house-land-intro-title" className="mt-4 font-display text-3xl font-normal leading-tight sm:text-4xl">
              Build with confidence from land to completion
            </h2>
          </motion.div>
          <motion.p
            className="max-w-3xl text-base font-light leading-8 text-graphite/80"
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: reducedMotion ? 0 : 0.08, ease: 'easeOut' }}
          >
            DECENT Development helps clients explore house and land package opportunities, from new family homes to
            duplex and triplex development-ready sites. Our team provides practical construction knowledge, project
            planning, and NSW development experience to help clients move from enquiry to build-ready confidence.
          </motion.p>
        </div>
      </section>

      <section id="opportunities" className="bg-ink py-16 text-ivory sm:py-24" aria-labelledby="opportunities-title">
        <div className="section-shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Residential inventory</p>
              <h2 id="opportunities-title" className="mt-4 font-display text-3xl font-normal leading-tight sm:text-4xl">
                Current Opportunities
              </h2>
              <p className="mt-5 text-base font-light leading-7 text-smoke">
                Explore illustrative Decent package pathways for family homes, duplex development in Sydney,
                triplex development in NSW, and broader multi-residential opportunities.
              </p>
            </div>
            <div className="border border-gold/25 bg-charcoal px-5 py-4">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-stone">Showing opportunities</p>
              <p className="mt-2 font-display text-3xl text-gold">{visiblePackages.length}</p>
            </div>
          </div>

          <div className="mt-10 border border-gold/20 bg-charcoal p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="text-gold" size={20} aria-hidden="true" />
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ivory">Filter opportunities</h3>
              </div>
              {filtersActive ? (
                <button
                  type="button"
                  className="focus-ring inline-flex min-h-11 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gold transition hover:text-gold-soft"
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
                <label key={name} className="grid gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-stone">
                  {label}
                  <select
                    value={filters[name]}
                    onChange={(event) => updateFilter(name, event.target.value)}
                    className="focus-ring min-h-12 w-full border border-gold/25 bg-ink px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-ivory"
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
            <div className="mt-8 border border-gold/25 bg-charcoal px-6 py-14 text-center">
              <p className="font-display text-2xl text-ivory">No opportunities match those filters.</p>
              <p className="mt-3 text-sm text-smoke">Clear the filters or start an enquiry for a tailored project discussion.</p>
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

          <p className="mt-6 text-xs font-light leading-6 text-stone">
            Opportunities shown are illustrative package pathways and remain subject to site availability, planning,
            feasibility, design development, approvals, and a formal project enquiry.
          </p>
        </div>
      </section>

      <section className="bg-porcelain py-16 text-ink sm:py-24" aria-labelledby="house-land-process-title">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="eyebrow">A considered pathway</p>
              <h2 id="house-land-process-title" className="mt-4 font-display text-3xl font-normal leading-tight sm:text-4xl">
                Our house and land process
              </h2>
            </div>
            <p className="max-w-3xl text-base font-light leading-8 text-graphite/80">
              We help clients understand the project pathway before major decisions are made, giving clearer
              expectations around design, timing, approvals, construction, and delivery.
            </p>
          </div>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map(({ title, icon: Icon }, index) => (
              <motion.li
                key={title}
                className="border border-ink/10 bg-white p-5 shadow-[0_18px_38px_rgba(18,18,18,0.07)]"
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: reducedMotion ? 0 : index * 0.05, ease: 'easeOut' }}
              >
                <div className="flex items-center justify-between gap-4">
                  <Icon className="text-gold" size={21} aria-hidden="true" />
                  <span className="font-display text-3xl text-gold/60">0{index + 1}</span>
                </div>
                <h3 className="mt-7 text-xs font-bold uppercase leading-5 tracking-[0.16em] text-graphite">{title}</h3>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-charcoal py-16 text-ivory sm:py-24" aria-labelledby="locations-title">
        <div className="absolute inset-0 architecture-grid opacity-20" aria-hidden="true" />
        <div className="section-shell relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <MapPin className="text-gold" size={28} aria-hidden="true" />
            <p className="eyebrow mt-7">Local NSW experience</p>
            <h2 id="locations-title" className="mt-4 font-display text-3xl font-normal leading-tight sm:text-4xl">
              Focused across Sydney and NSW
            </h2>
            <p className="mt-5 max-w-2xl text-base font-light leading-8 text-smoke">
              DECENT Development works across New South Wales from its North Sydney office, with project experience
              across Auburn, Regents Park, Rouse Hill, Canley Vale, Canley Heights, and surrounding Sydney suburbs.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-3">
            {locations.map((location, index) => (
              <motion.span
                key={location}
                className="border border-gold/30 bg-ink/50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-smoke"
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

      <section className="bg-ink py-16 text-ivory sm:py-24" aria-labelledby="house-land-cta-title">
        <div className="section-shell">
          <motion.div
            className="relative overflow-hidden border border-gold/30 bg-charcoal px-6 py-12 text-center shadow-premium sm:px-10 sm:py-16"
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 architecture-grid opacity-15" aria-hidden="true" />
            <div className="relative z-10 mx-auto max-w-3xl">
              <p className="eyebrow">Start the conversation</p>
              <h2 id="house-land-cta-title" className="mt-4 font-display text-3xl font-normal leading-tight sm:text-4xl">
                Looking for a house and land opportunity?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-8 text-smoke">
                Speak with DECENT Development about your goals, preferred location, budget direction, and project
                type. Our team can help you understand the next steps.
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
