import { useAuth } from '../../context/AuthContext'

export default function Navbar({ onAdminClick }) {
  const { isAuthenticated } = useAuth()
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-10 py-4 bg-dark-900/90 backdrop-blur-md border-b border-gold/10">
      <span className="font-head text-gold tracking-widest text-base">CGC</span>
      <div className="flex items-center gap-6 md:gap-8">
        {['about', 'projects', 'skills', 'contact'].map((id) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="text-neutral-500 text-xs tracking-[0.1em] uppercase hover:text-gold transition-colors duration-200 bg-transparent border-0 cursor-pointer capitalize hidden md:block"
          >
            {id}
          </button>
        ))}
        <button onClick={onAdminClick} className="btn-ghost text-xs tracking-[0.1em] uppercase px-4 py-2">
          {isAuthenticated ? '⚙ Admin' : 'Admin'}
        </button>
      </div>
    </nav>
  )
}
