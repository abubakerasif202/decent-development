import About from '../components/About.jsx'
import Hero from '../components/Hero.jsx'
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
            'text': 'DECENT Development works across New South Wales from its North Sydney office.',
          },
        },
        {
          '@type': 'Question',
          'name': 'What construction services are available?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Services include residential construction, commercial construction, property development, project management, renovations, extensions, and building consultation.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Do you specialize in duplex and triplex developments in Sydney?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, DECENT Development specializes in multi-residential developments, including attached duplex and triplex projects, ensuring optimal land utilization and premium architectural finishes under our NSW contractor licence.',
          },
        },
        {
          '@type': 'Question',
          'name': 'How do project enquiries start?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Prospective clients can call, email, or submit the contact form with the project type, contact details, and a short brief.',
          },
        },
      ],
    },
  ]

  usePageMeta({
    title: 'DECENT Development | Premium Construction & Property Development',
    description:
      'Premium construction, property development, renovation, and project management solutions delivered across New South Wales with clarity, precision, and long-term value.',
    path: '/',
    schemas: homeSchemas,
  })

  return (
    <>
      <Hero company={company} />
      <About />
      <Services />
      <IndustryMemberships />
      <TrustAndFaq company={company} />
    </>
  )
}
