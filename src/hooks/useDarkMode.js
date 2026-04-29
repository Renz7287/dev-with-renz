// src/hooks/useDarkMode.js
// Syncs dark mode preference with localStorage and the <html> class.
// Respects prefers-color-scheme on first visit per Rule: Adaptive Dark Themes #5.
import { useEffect, useState } from 'react'

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggle = () => setIsDark((prev) => !prev)

  return { isDark, toggle }
}
