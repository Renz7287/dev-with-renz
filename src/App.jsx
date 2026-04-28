import { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import { PortfolioProvider } from './context/PortfolioContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Availability from './components/sections/Availability'
import Contact from './components/sections/Contact'
import AdminPanel from './components/admin/AdminPanel'
import { Toast } from './components/ui'
import { usePortfolio } from './context/PortfolioContext'

function PortfolioApp() {
  const { toast } = usePortfolio()
  const [adminOpen, setAdminOpen] = useState(false)

  return (
    <>
      <Navbar onAdminClick={() => setAdminOpen(true)} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Availability />
        <Contact />
      </main>
      <Footer />
      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}
      <Toast toast={toast} />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <PortfolioApp />
      </PortfolioProvider>
    </AuthProvider>
  )
}
