import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { usePortfolio } from '../../context/PortfolioContext'
import AdminLogin from './AdminLogin'
import AdminSidebar from './AdminSidebar'
import SummaryAdmin from './SummaryAdmin'
import VaProjectsAdmin from './VaProjectsAdmin'
import TechProjectsAdmin from './TechProjectsAdmin'
import SimpleListAdmin from './SimpleListAdmin'
import ObjectListAdmin from './ObjectListAdmin'

const AVAILABILITY_FIELDS = [
  { key: 'label', label: 'Label', placeholder: 'e.g. Work Type' },
  { key: 'value', label: 'Value', placeholder: 'e.g. Full-time or Part-time' },
]

const CONTACT_FIELDS = [
  { key: 'label', label: 'Label', placeholder: 'e.g. Email, LinkedIn' },
  { key: 'value', label: 'Display Value', placeholder: 'e.g. clarencecabrera123@gmail.com' },
  { key: 'url',   label: 'URL (optional)', placeholder: 'https://…' },
]

function AdminContent({ section }) {
  const { data, saveAvailability, removeAvailability, saveContact, removeContact } = usePortfolio()

  if (section === 'summary')       return <SummaryAdmin />
  if (section === 'va-projects')   return <VaProjectsAdmin />
  if (section === 'tech-projects') return <TechProjectsAdmin />
  if (['va-skills','tech-skills','tools','strengths'].includes(section))
    return <SimpleListAdmin sectionKey={section} />
  if (section === 'availability')
    return (
      <ObjectListAdmin
        title="Availability"
        items={data.availability}
        fields={AVAILABILITY_FIELDS}
        onSave={saveAvailability}
        onDelete={removeAvailability}
      />
    )
  if (section === 'contacts')
    return (
      <ObjectListAdmin
        title="Contacts"
        items={data.contacts}
        fields={CONTACT_FIELDS}
        onSave={saveContact}
        onDelete={removeContact}
      />
    )
  return null
}

export default function AdminPanel({ onClose }) {
  const { isAuthenticated, logout } = useAuth()
  const [section, setSection] = useState('summary')

  const handleLogout = async () => {
    await logout()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/85 z-[200] flex items-start justify-center p-4 md:p-8 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-dark-900 border border-gold/15 rounded-sm w-full max-w-3xl min-h-[580px] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gold/10">
          <h2 className="font-head text-lg">
            {isAuthenticated ? 'Admin Panel' : 'Admin — Sign In'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border border-gold/15 text-neutral-500
                       hover:border-red-500/40 hover:text-red-400 transition-all duration-200 rounded-sm text-sm bg-transparent cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex min-h-[520px]">
          {!isAuthenticated ? (
            <AdminLogin />
          ) : (
            <>
              <AdminSidebar active={section} onChange={setSection} onLogout={handleLogout} />
              <div className="flex-1 p-6 overflow-y-auto max-h-[520px]">
                <AdminContent section={section} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
