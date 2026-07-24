import { Link } from 'react-router-dom'
import { ArrowRight, Building2, ClipboardCheck, DraftingCompass, Hammer, Home, Landmark } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Services from '../components/Services.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

const siteUrl = 'https://www.decentdevelopment.com.au'

const serviceNames = [
  'Residential construction',
  'Commercial construction',
  'Property development',
  'Project management',
  'Renovations and extensions',
  'Building consultation',
]

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  '@id': `${siteUrl}/#organization`,
  name: 'DECENT Development',
  url: siteUrl,
  image: `${siteUrl}/og-image.webp`,
  email: 'info@decentdevelopment.com.au',
  telephone: '1800 008 883',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Level 14, 275 Alfred St North',
    addressLocality: 'North Sydney',
    addressRegion: 'NSW',
    postalCode: '2060',
    addressCountry: 'AU',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'New South Wales',
  },
  identifier: [
    {
      '@type': 'PropertyValue',
      name: 'NSW contractor licence',
      value: '476988C',
    },
    {
      '@type': 'PropertyValue',
      name: 'ACN',
      value: '679 810 327',
    },
  ],
}

const deliveryStages = [
  {
    title: 'Define the brief',
    copy: 'We review project objectives, site constraints, planning considerations, scope, budget expectations, and the information needed for an informed next step.',
    icon: DraftingCompass,
  },
  {
    title: 'Plan the delivery',
    copy: 'The team coordinates programme, responsibilities, procurement, approvals, consultant inputs, and construction sequencing before work progresses.',
    icon: ClipboardCheck,
  },
  {
    title: 'Manage construction',
    copy: 'Site delivery is supported by clear communication, quality control, practical reporting, and disciplined coordination through to handover.',
    icon: Hammer,
  },
]

export default function ServicesPage() {
  const schemas = [
    organizationSchema,
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/services/` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${siteUrl}/#services`,
      name: 'Construction and development services',
      itemListElement: serviceNames.map((name, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name,
          provider: {
            '@id': `${siteUrl}/#organization`,
          },
          areaServed: {
            '@type': 'AdministrativeArea',
            name: 'New South Wales',
          },
        },
      })),
    },
  ]

  usePageMeta({
    title: 'Sydney Construction Services | DECENT Development',
    description:
      'Explore residential and commercial construction, property development, project management, renovations and building consultation across Sydney and NSW.',
    path: '/services/',
    schemas,
    socialImageAlt: 'Sydney construction services from planning to handover by DECENT Development',
  })

  return (
    <>
      <PageHero
        eyebrow="Construction and development services"
        title="Sydney construction services from planning to handover"
        copy="DECENT Development supports residential and commercial projects across Sydney and New South Wales with coordinated construction, development, consultation, and project management."
        stats={[
          { label: 'Service area', value: 'NSW' },
          { label: 'Licence', value: '476988C' },
          { label: 'Delivery', value: 'End-to-end' },
        ]}
        visual={
          <div className="border border-brand-border bg-brand-surface p-6 shadow-premium sm:p-8 rounded-2xl">
            <p className="eyebrow text-brand-gold">Core capability</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ['Residential construction', Home],
                ['Commercial construction', Building2],
                ['Property development', Landmark],
                ['Project management', ClipboardCheck],
              ].map(([label, Icon]) => (
                <div key={label} className="flex items-center gap-3 border border-brand-border bg-brand-bg px-4 py-4 rounded-xl">
                  <Icon className="shrink-0 text-brand-gold" size={21} aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-brand-charcoal">{label}</span>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <Link
          to="/contact/"
          className="focus-ring gold-gradient-btn inline-flex min-h-12 items-center gap-2 px-6 py-3 text-xs font-bold uppercase"
        >
          Discuss your project
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </PageHero>

      <Services />

      <section className="bg-brand-surface py-16 text-brand-charcoal sm:py-24" aria-labelledby="delivery-title">
        <div className="section-shell">
          <p className="eyebrow text-brand-gold">A structured delivery approach</p>
          <h2 id="delivery-title" className="mt-4 max-w-3xl font-display text-3xl font-normal leading-tight sm:text-5xl">
            Clear decisions before construction, disciplined coordination during delivery
          </h2>
          <p className="mt-6 max-w-3xl text-base font-light leading-8 text-brand-muted">
            Every brief is different. Our process is designed to clarify the project, identify constraints early, and keep the people, programme, and construction scope aligned.
          </p>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {deliveryStages.map(({ title, copy, icon: Icon }, index) => (
              <article key={title} className="border border-brand-border bg-brand-bg p-6 rounded-2xl">
                <div className="flex items-center justify-between gap-4">
                  <Icon className="text-brand-gold" size={25} aria-hidden="true" />
                  <span className="font-display text-3xl text-brand-gold/35">0{index + 1}</span>
                </div>
                <h3 className="mt-7 font-display text-2xl font-normal">{title}</h3>
                <p className="mt-4 text-sm font-light leading-7 text-brand-muted">{copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-brand-border pt-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-3xl font-normal">See the work behind the capability</h2>
              <p className="mt-3 max-w-2xl text-sm font-light leading-7 text-brand-muted">
                Review completed duplex, triplex, and residential projects, then contact the team with your site, plans, or early project brief.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/projects/" className="focus-ring outline-gold-btn inline-flex min-h-12 items-center gap-2 px-5 py-3 text-xs font-bold uppercase">
                View projects
              </Link>
              <Link to="/contact/" className="focus-ring gold-gradient-btn inline-flex min-h-12 items-center gap-2 px-5 py-3 text-xs font-bold uppercase">
                Start a conversation
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
