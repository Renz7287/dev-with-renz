import { useState, useCallback } from 'react'
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

function PortfolioApp({ onExpire }) {
  const { toast } = usePortfolio()
  const [adminOpen, setAdminOpen] = useState(false)

  // Closes admin panel when Supabase session expires or user signs out remotely
  const handleExpire = useCallback(() => {
    setAdminOpen(false)
  }, [])

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
  const [adminOpen, setAdminOpen] = useState(false)

  // Passed to AuthProvider — fires when Supabase session expires
  const handleExpire = useCallback(() => {
    setAdminOpen(false)
  }, [])

  return (
    <AuthProvider onExpire={handleExpire}>
      <PortfolioProvider>
        <PortfolioAppInner adminOpen={adminOpen} setAdminOpen={setAdminOpen} />
      </PortfolioProvider>
    </AuthProvider>
  )
}

function PortfolioAppInner({ adminOpen, setAdminOpen }) {
  const { toast } = usePortfolio()

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
