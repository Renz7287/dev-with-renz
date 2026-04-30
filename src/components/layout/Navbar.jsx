// src/components/layout/Navbar.jsx
import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useAuth } from '../../context/AuthContext'
import { useDarkMode } from '../../hooks/useDarkMode'

const NAV_LINKS = ['about', 'projects', 'skills', 'contact']

function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.71.71M6.34 17.66l-.71.71M17.66 17.66l-.71-.71M6.34 6.34l-.71-.71M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

function DarkModeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm bg-transparent cursor-pointer transition-all duration-200"
      style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)'; e.currentTarget.style.borderColor = 'var(--color-accent)' }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-muted)';  e.currentTarget.style.borderColor = 'var(--color-border)' }}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function NavLink({ id, onClick }) {
  return (
    <button
      onClick={() => onClick(id)}
      className="hidden md:block text-xs tracking-[0.1em] uppercase capitalize
                 bg-transparent border-0 cursor-pointer min-h-[44px] px-1
                 transition-colors duration-200"
      style={{ color: 'var(--color-muted)' }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)' }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-muted)' }}
    >
      {id}
    </button>
  )
}

export default function Navbar({ onAdminClick }) {
  const { isAuthenticated } = useAuth()
  const { isDark, toggle } = useDarkMode()
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav className="navbar-glass fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-10 py-4">
      <span className="font-head tracking-widest text-base select-none" style={{ color: 'var(--color-accent)' }}>
        CGC
      </span>

      <div className="flex items-center gap-4 md:gap-6">
        {NAV_LINKS.map((id) => (
          <NavLink key={id} id={id} onClick={scrollTo} />
        ))}
        <DarkModeToggle isDark={isDark} onToggle={toggle} />
        <button onClick={onAdminClick} className="btn-ghost text-xs tracking-[0.1em] uppercase px-4 py-2">
          {isAuthenticated ? '⚙ Admin' : 'Admin'}
        </button>
      </div>
    </nav>
  )
}
