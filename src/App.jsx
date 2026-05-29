import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import IntroAnimation from './components/IntroAnimation.jsx'
import Projects from './components/Projects.jsx'
import Services from './components/Services.jsx'
import Team from './components/Team.jsx'
import logo from './assets/logo-optimized.webp'
import teamHussain from './assets/team-hussain.webp'
import teamMohammad from './assets/team-mohammad.webp'
import teamNemat from './assets/team-nemat.webp'

const company = {
  name: 'DECENT Development',
  address: 'Level 14, 275 Alfred St North, North Sydney NSW 2060',
  email: 'info@decentdevelopment.com.au',
  phone: '1800 008 883',
  phoneHref: 'tel:1800008883',
  licence: '476988C',
  acn: '679 810 327',
}

const assets = {
  logo,
  team: {
    nemat: teamNemat,
    mohammad: teamMohammad,
    hussain: teamHussain,
  },
}

function App() {
  return (
    <>
      <IntroAnimation logo={assets.logo} />
      <Header company={company} logo={assets.logo} />
      <main>
        <Hero company={company} />
        <About />
        <Services />
        <Projects />
        <Team assets={assets.team} />
        <Contact company={company} />
      </main>
      <Footer company={company} />
    </>
  )
}

export default App
