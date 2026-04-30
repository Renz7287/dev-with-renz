import clsx from 'clsx'

const SECTIONS = [
  { id: 'profile',       label: 'Profile Photo' },
  { id: 'summary',       label: 'Summary' },
  { id: 'va-projects',   label: 'VA Projects' },
  { id: 'tech-projects', label: 'Tech Projects' },
  { id: 'va-skills',     label: 'VA Skills' },
  { id: 'tech-skills',   label: 'Tech Skills' },
  { id: 'tools',         label: 'Tools' },
  { id: 'strengths',     label: 'Strengths' },
  { id: 'availability',  label: 'Availability' },
  { id: 'contacts',      label: 'Contacts' },
]

export default function AdminSidebar({ active, onChange, onLogout }) {
  return (
    <aside className="w-44 flex-shrink-0 flex flex-col py-3"
      style={{ borderRight: '1px solid var(--color-border)' }}>
      <nav className="flex-1 flex flex-col">
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={clsx('admin-nav-item', { active: active === id })}
          >
            {label}
          </button>
        ))}
      </nav>
      <div className="pt-2" style={{ borderTop: '1px solid var(--color-border)' }}>
        <button
          onClick={onLogout}
          className="w-full text-left px-5 py-2.5 text-xs tracking-[0.06em] uppercase
                     bg-transparent border-0 cursor-pointer transition-all duration-200 min-h-[44px]"
          style={{ color: 'rgba(239,68,68,0.6)' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.05)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(239,68,68,0.6)'; e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          Sign Out
        </button>
      </div>
    </aside>
  )
}
