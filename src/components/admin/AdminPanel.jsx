import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { usePortfolio } from '../../context/PortfolioContext'
import AdminLogin from './AdminLogin'
import AdminSidebar from './AdminSidebar'
import ProfilePhotoAdmin from './ProfilePhotoAdmin'
import ResumeAdmin from './ResumeAdmin'
import SummaryAdmin from './SummaryAdmin'
import VaProjectsAdmin from './VaProjectsAdmin'
import TechProjectsAdmin from './TechProjectsAdmin'
import SimpleListAdmin from './SimpleListAdmin'
import ObjectListAdmin from './ObjectListAdmin'

const AVAILABILITY_FIELDS = [
  { key: 'label', label: 'Label',        placeholder: 'e.g. Work Type' },
  { key: 'value', label: 'Value',        placeholder: 'e.g. Full-time or Part-time' },
]
const CONTACT_FIELDS = [
  { key: 'label', label: 'Label',          placeholder: 'e.g. Email, LinkedIn' },
  { key: 'value', label: 'Display Value',  placeholder: 'e.g. clarencecabrera123@gmail.com' },
  { key: 'url',   label: 'URL (optional)', placeholder: 'https://…' },
]
const SIMPLE_LIST_SECTIONS = new Set(['va-skills', 'tech-skills', 'tools', 'strengths'])

function AdminContent({ section }) {
  const { data, saveAvailability, removeAvailability, saveContact, removeContact } = usePortfolio()
  if (section === 'profile')       return <ProfilePhotoAdmin />
  if (section === 'resume')        return <ResumeAdmin />
  if (section === 'summary')       return <SummaryAdmin />
  if (section === 'va-projects')   return <VaProjectsAdmin />
  if (section === 'tech-projects') return <TechProjectsAdmin />
  if (SIMPLE_LIST_SECTIONS.has(section)) return <SimpleListAdmin sectionKey={section} />
  if (section === 'availability')
    return <ObjectListAdmin title="Availability" items={data.availability} fields={AVAILABILITY_FIELDS} onSave={saveAvailability} onDelete={removeAvailability} />
  if (section === 'contacts')
    return <ObjectListAdmin title="Contacts" items={data.contacts} fields={CONTACT_FIELDS} onSave={saveContact} onDelete={removeContact} />
  return null
}

export default function AdminPanel({ onClose }) {
  const { isAuthenticated, logout } = useAuth()
  const [section, setSection] = useState('profile')

  const handleLogout = async () => { await logout(); onClose() }

  return (
    <div
      className="fixed inset-0 bg-black/80 z-[200] flex items-start justify-center p-4 md:p-8 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="rounded-sm w-full max-w-3xl min-h-[580px] overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>

        <div className="flex justify-between items-center px-6 py-4"
          style={{ borderBottom: '1px solid var(--color-border)' }}>
          <h2 className="font-head text-lg" style={{ color: 'var(--color-heading)' }}>
            {isAuthenticated ? 'Admin Panel' : 'Admin — Sign In'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close admin panel"
            className="w-11 h-11 flex items-center justify-center rounded-sm text-sm bg-transparent cursor-pointer transition-all duration-200"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)'; e.currentTarget.style.color = '#f87171' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-muted)' }}
          >✕</button>
        </div>

        <div className="flex min-h-[520px]">
          {!isAuthenticated ? <AdminLogin /> : (
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
