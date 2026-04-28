// src/components/admin/AdminSidebar.jsx
// Replace your existing AdminSidebar.jsx with this file.

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
    <aside className="w-44 flex-shrink-0 border-r border-gold/10 flex flex-col py-4">
      <nav className="flex-1 flex flex-col gap-0.5 px-2">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => onChange(s.id)}
            className={`w-full text-left px-3 py-2 text-xs rounded-sm transition-colors cursor-pointer bg-transparent
              ${active === s.id
                ? 'bg-gold/10 text-gold border-l-2 border-gold'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5 border-l-2 border-transparent'
              }`}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <div className="px-2 pt-2 border-t border-gold/10 mt-2">
        <button
          onClick={onLogout}
          className="w-full text-left px-3 py-2 text-xs text-red-400 hover:text-red-300
                     hover:bg-red-500/10 rounded-sm transition-colors cursor-pointer bg-transparent"
        >
          Sign Out
        </button>
      </div>
    </aside>
  )
}