import About from '../components/About.jsx'
import Hero from '../components/Hero.jsx'
import HouseAndLandPreview from '../components/HouseAndLandPreview.jsx'
import IndustryMemberships from '../components/IndustryMemberships.jsx'
import Services from '../components/Services.jsx'
import TrustAndFaq from '../components/TrustAndFaq.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

export default function HomePage({ company }) {
  const homeSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'DECENT Development',
      'url': 'https://www.decentdevelopment.com.au/',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What areas does DECENT Development service?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'DECENT Development services Greater Sydney and across New South Wales from its North Sydney office.',
          },
        },
        {
          '@type': 'Question',
          'name': 'What is the cost of building a duplex in Sydney NSW?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Building a dual occupancy or duplex in Sydney typically ranges between $800,000 and $1,400,000+ ($2,200 to $3,800+ per sqm) for construction, depending on site topography, architectural specifications, and council DA/CDC requirements.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Do you specialize in duplex and triplex developments in Sydney?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, DECENT Development specializes in multi-residential developments, including attached duplex and triplex projects, ensuring optimal land utilization and premium architectural finishes under NSW contractor licence 476988C.',
          },
        },
        {
          '@type': 'Question',
          'name': 'What is the difference between a DA and CDC for Sydney residential developments?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'A Complying Development Certificate (CDC) is a fast-track approval through a private certifier taking 20–40 days if the design meets strict NSW Housing SEPP criteria. A Development Application (DA) goes through local council, taking 3–6+ months for site-specific variations or complex land conditions.',
          },
        },
        {
          '@type': 'Question',
          'name': 'How do project enquiries start?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Prospective clients can call 1800 008 883, email info@decentdevelopment.com.au, or submit the contact form with site details and a brief.',
          },
        },
      ],
    },
  ]

  usePageMeta({
    title: 'Sydney Duplex Builder & Property Development | DECENT Development',
    description:
      'DECENT Development delivers residential construction, duplex & triplex property development, and project management across Sydney and New South Wales. Licence 476988C.',
    path: '/',
    schemas: homeSchemas,
  })

  return (
    <>
      <Hero company={company} />
      <About />
      <Services />
      <HouseAndLandPreview />
      <IndustryMemberships />
      <TrustAndFaq company={company} />
    </>
  )
}
