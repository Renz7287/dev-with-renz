// src/components/ui/AdminBtn.jsx
// Ghost-style button used for the Admin nav trigger in Navbar.
// Uses CSS Modules for scoped styling per Rule: Styling Constraints #4.
import styles from './AdminBtn.module.css'

/**
 * @param {object}   props
 * @param {Function} props.onClick
 * @param {boolean}  [props.isAuthenticated] - shows ⚙ prefix when true
 * @param {boolean}  [props.disabled]
 */
export default function AdminBtn({ onClick, isAuthenticated = false, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.btn}
      aria-label={isAuthenticated ? 'Open admin panel' : 'Sign in to admin'}
    >
      {isAuthenticated && <span className={styles.icon} aria-hidden="true">⚙</span>}
      Admin
    </button>
  )
}
