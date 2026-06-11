import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  ClipboardCheck,
  DraftingCompass,
  Home,
  KeyRound,
  Layers3,
  MapPin,
  SearchCheck,
} from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import projectResidential from '../assets/stitch/project-residential.webp'

const siteUrl = 'https://decentdevelopment.com.au'

const packages = [
  {
    title: 'Family House & Land',
    copy: 'Suitable for clients looking to build a quality new home with practical layouts, premium finishes, and long-term value.',
    icon: Home,
  },
  {
    title: 'Duplex Opportunities',
    copy: 'Designed for clients exploring attached duplex projects, land utilisation, residential construction, and development potential.',
    icon: Building2,
  },
  {
    title: 'Triplex & Multi-Residential',
    copy: 'For clients considering higher-yield residential projects with efficient planning, construction sequencing, and premium project outcomes.',
    icon: Layers3,
  },
]

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
            Whether you are planning a new family residence, attached duplex, triplex, or investment-focused
            residential project, DECENT Development provides practical guidance across design, feasibility,
            construction planning, and delivery.
          </motion.p>
        </div>
      </section>

      <section id="opportunities" className="bg-ink py-16 text-ivory sm:py-24" aria-labelledby="opportunities-title">
        <div className="section-shell">
          <div className="max-w-2xl">
            <p className="eyebrow">Residential opportunities</p>
            <h2 id="opportunities-title" className="mt-4 font-display text-3xl font-normal leading-tight sm:text-4xl">
              House and land pathways shaped around your goals
            </h2>
            <p className="mt-5 text-base font-light leading-7 text-smoke">
              Explore a considered starting point for a new home, duplex development in Sydney, or a
              multi-residential project across NSW.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {packages.map(({ title, copy, icon: Icon }, index) => (
              <motion.article
                key={title}
                className="group flex min-h-80 flex-col border border-gold/25 bg-charcoal p-7 transition-colors duration-300 hover:border-gold hover:bg-[#1d1b18]"
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                whileHover={reducedMotion ? undefined : { y: -8 }}
                transition={{ duration: 0.5, delay: reducedMotion ? 0 : index * 0.06, ease: 'easeOut' }}
              >
                <div className="inline-flex h-12 w-12 items-center justify-center border border-gold/45 bg-ink text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
                  <Icon size={23} aria-hidden="true" />
                </div>
                <h3 className="mt-8 font-display text-2xl font-normal leading-tight text-ivory">{title}</h3>
                <p className="mt-4 flex-1 text-sm font-light leading-7 text-smoke">{copy}</p>
                <Link
                  to="/contact/"
                  className="focus-ring mt-8 inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold transition hover:text-gold-soft"
                >
                  Enquire now
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </motion.article>
            ))}
          </div>
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
