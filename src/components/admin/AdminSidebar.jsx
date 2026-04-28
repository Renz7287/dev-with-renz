import clsx from 'clsx'

const NAV_ITEMS = [
  { key: 'summary',       label: 'Summary' },
  { key: 'va-projects',   label: 'VA Projects' },
  { key: 'tech-projects', label: 'Tech Projects' },
  { key: 'va-skills',     label: 'VA Skills' },
  { key: 'tech-skills',   label: 'Tech Skills' },
  { key: 'tools',         label: 'Tools' },
  { key: 'strengths',     label: 'Strengths' },
  { key: 'availability',  label: 'Availability' },
  { key: 'contacts',      label: 'Contacts' },
]

export default function AdminSidebar({ active, onChange, onLogout }) {
  return (
    <aside className="w-44 shrink-0 border-r border-gold/10 py-4 flex flex-col">
      <div className="flex-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            className={clsx('admin-nav-item', active === item.key && 'active')}
          >
            {item.label}
          </button>
        ))}
      </div>
      <button
        onClick={onLogout}
        className="admin-nav-item mt-4 text-red-500/60 hover:text-red-400 hover:bg-red-500/5"
      >
        Logout
      </button>
    </aside>
  )
}
