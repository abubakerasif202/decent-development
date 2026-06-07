import About from '../components/About.jsx'
import Hero from '../components/Hero.jsx'
import Projects from '../components/Projects.jsx'
import Services from '../components/Services.jsx'
import TrustAndFaq from '../components/TrustAndFaq.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

export default function HomePage({ company }) {
  usePageMeta({
    title: 'DECENT Development | Premium Construction & Property Development',
    description:
      'Premium construction, property development, renovation, and project management solutions delivered across New South Wales with clarity, precision, and long-term value.',
    path: '/',
  })

  return (
    <>
      <Hero company={company} />
      <About />
      <Services />
      <Projects />
      <TrustAndFaq company={company} />
    </>
  )
}
