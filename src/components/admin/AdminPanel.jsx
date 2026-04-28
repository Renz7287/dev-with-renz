import { useState, useRef } from 'react'
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

// ── Profile Photo Admin ──────────────────────────────────────────────────────
function ProfilePhotoAdmin() {
  const { data, updateProfilePhoto, removeProfilePhoto, showToast } = usePortfolio()
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(data.profilePhotoUrl || null)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB.')
      return
    }

    setError(null)
    setUploading(true)

    // Show local preview immediately
    setPreview(URL.createObjectURL(file))

    try {
      const publicUrl = await updateProfilePhoto(file)
      setPreview(publicUrl)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Upload failed. Please try again.')
      setPreview(data.profilePhotoUrl || null)
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleRemove = async () => {
    if (!window.confirm('Remove profile photo?')) return
    setUploading(true)
    setError(null)
    try {
      await removeProfilePhoto()
      setPreview(null)
    } catch (err) {
      setError(err.message || 'Failed to remove photo.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-5">
      <h3 className="font-head text-sm text-gold/70 uppercase tracking-widest">
        Profile Photo
      </h3>

      <div className="flex items-center gap-6">
        {/* Avatar preview */}
        <div className="relative flex-shrink-0">
          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gold/30 shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-dark-800 border-2 border-dashed border-gold/20
                            flex items-center justify-center">
              <svg className="w-8 h-8 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}

          {uploading && (
            <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center">
              <svg className="animate-spin w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 text-sm border border-gold/30 text-gold hover:bg-gold/10
                       disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-sm cursor-pointer bg-transparent"
          >
            {uploading ? 'Uploading…' : preview ? 'Change Photo' : 'Upload Photo'}
          </button>

          {preview && !uploading && (
            <button
              onClick={handleRemove}
              className="px-4 py-2 text-sm border border-red-500/30 text-red-400 hover:bg-red-500/10
                         transition-colors rounded-sm cursor-pointer bg-transparent"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <p className="text-xs text-neutral-500">
        Recommended: square image, at least 200×200px. Max 5MB.
      </p>

      {error && (
        <p className="text-sm text-red-400 bg-red-900/20 px-3 py-2 rounded-sm">
          {error}
        </p>
      )}
    </div>
  )
}

// ── Admin Content Router ────────────────────────────────────────────────────
function AdminContent({ section }) {
  const { data, saveAvailability, removeAvailability, saveContact, removeContact } = usePortfolio()

  if (section === 'profile')       return <ProfilePhotoAdmin />
  if (section === 'summary')       return <SummaryAdmin />
  if (section === 'va-projects')   return <VaProjectsAdmin />
  if (section === 'tech-projects') return <TechProjectsAdmin />
  if (['va-skills', 'tech-skills', 'tools', 'strengths'].includes(section))
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

// ── Admin Panel ─────────────────────────────────────────────────────────────
export default function AdminPanel({ onClose }) {
  const { isAuthenticated, logout } = useAuth()
  const [section, setSection] = useState('profile')

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