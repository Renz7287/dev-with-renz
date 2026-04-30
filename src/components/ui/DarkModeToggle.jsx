// src/components/ui/DarkModeToggle.jsx
import styles from './DarkModeToggle.module.css'
import { useDarkMode } from '../../hooks/useDarkMode'

function SunIcon() {
  return (
    <svg className={styles.knobIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
        d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.71.71M6.34 17.66l-.71.71M17.66 17.66l-.71-.71M6.34 6.34l-.71-.71M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className={styles.knobIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

export default function DarkModeToggle() {
  const { isDark, toggle } = useDarkMode()

  return (
    /* hitArea ensures 44x44px touch target even though the toggle is smaller */
    <span className={styles.hitArea}>
      <label className={styles.toggle} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
        <input
          type="checkbox"
          className={styles.input}
          checked={isDark}
          onChange={toggle}
        />
        <span className={styles.track}>
          <span className={styles.knob}>
            {isDark ? <MoonIcon /> : <SunIcon />}
          </span>
        </span>
      </label>
    </span>
  )
}
