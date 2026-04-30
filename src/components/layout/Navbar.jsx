// src/components/layout/Navbar.jsx
import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useAuth } from '../../context/AuthContext'
import DarkModeToggle from '../ui/DarkModeToggle'
import AdminBtn from '../ui/AdminBtn'
import styles from './Navbar.module.css'

const NAV_LINKS = ['about', 'projects', 'skills', 'contact']

// Tracks which section is in the viewport via IntersectionObserver
function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const observers = NAV_LINKS.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])
  return active
}

function MobileDrawer({ onClose, onAdminClick, isAuthenticated, activeSection }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    onClose()
  }
  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.drawer}>
        <div className={styles.drawerHeader}>
          <button className={styles.drawerClose} onClick={onClose} aria-label="Close menu">✕</button>
        </div>
        <nav className={styles.drawerNav}>
          {NAV_LINKS.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={clsx(styles.drawerLink, { [styles.drawerLinkActive]: activeSection === id })}
            >
              {id}
            </button>
          ))}
        </nav>
        <div className={styles.drawerFooter}>
          <DarkModeToggle />
          <AdminBtn onClick={() => { onClose(); onAdminClick() }} isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </>
  )
}

export default function Navbar({ onAdminClick }) {
  const { isAuthenticated } = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const activeSection = useActiveSection()
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <nav className="navbar-glass fixed top-0 left-0 right-0 z-50
                      flex justify-between items-center px-6 md:px-10 py-4">

        {/* Desktop nav links */}
        <div className={styles.desktopNav}>
          {NAV_LINKS.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={clsx(styles.navLink, { [styles.navLinkActive]: activeSection === id })}
            >
              {id}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Desktop: toggle + admin */}
          <div className={styles.desktopControls}>
            <DarkModeToggle />
            <AdminBtn onClick={onAdminClick} isAuthenticated={isAuthenticated} />
          </div>
          {/* Mobile: hamburger — hidden at md via CSS Module media query */}
          <button
            className={styles.hamburger}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
          >
            <div className={styles.hamburgerLines}>
              <span className={styles.line} />
              <span className={styles.line} />
              <span className={styles.line} />
            </div>
          </button>
        </div>
      </nav>

      {drawerOpen && (
        <MobileDrawer
          onClose={() => setDrawerOpen(false)}
          onAdminClick={onAdminClick}
          isAuthenticated={isAuthenticated}
          activeSection={activeSection}
        />
      )}
    </>
  )
}
