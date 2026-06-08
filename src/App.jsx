import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import ContactPage from './pages/ContactPage.jsx'
import CompletedProjectsPage from './pages/CompletedProjectsPage.jsx'
import HomePage from './pages/HomePage.jsx'
import TeamPage from './pages/TeamPage.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import IntroAnimation from './components/IntroAnimation.jsx'
import logo from './assets/Logo.png'
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

const legacyHashRoutes = {
  '#home': { pathname: '/', hash: '' },
  '#projects': { pathname: '/completed-projects/', hash: '#attached-dwellings' },
  '#team': { pathname: '/meet-the-team/', hash: '#team' },
  '#contact': { pathname: '/contact/', hash: '#contact' },
}

function ScrollManager() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const legacyRoute = legacyHashRoutes[location.hash]

      if (
        legacyRoute &&
        (location.pathname !== legacyRoute.pathname || location.hash !== legacyRoute.hash)
      ) {
        navigate(`${legacyRoute.pathname}${legacyRoute.hash}`, { replace: true })
        return
      }

      if (location.hash) {
        const element = document.querySelector(location.hash)

        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }

        return
      }

      window.scrollTo({ top: 0, behavior: 'auto' })
    }, 0)

    return () => window.clearTimeout(timer)
  }, [location.hash, location.pathname, navigate])

  return null
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage company={company} />} />
      <Route path="/projects" element={<Navigate to="/completed-projects/" replace />} />
      <Route path="/team" element={<Navigate to="/meet-the-team/" replace />} />
      <Route path="/completed-projects/" element={<CompletedProjectsPage company={company} />} />
      <Route path="/meet-the-team/" element={<TeamPage company={company} teamAssets={assets.team} />} />
      <Route path="/contact/" element={<ContactPage company={company} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  const showIntro = (() => {
    if (typeof window === 'undefined') return false
    try {
      if (!window.sessionStorage.getItem('decent_intro_seen')) {
        window.sessionStorage.setItem('decent_intro_seen', 'true')
        return true
      }
    } catch {
      return false
    }
    return false
  })()

  return (
    <BrowserRouter>
      {showIntro && <IntroAnimation logo={assets.logo} />}
      <Header company={company} logo={assets.logo} />
      <main>
        <ScrollManager />
        <AppRoutes />
      </main>
      <Footer company={company} logo={assets.logo} />
    </BrowserRouter>
  )
}

export default App
