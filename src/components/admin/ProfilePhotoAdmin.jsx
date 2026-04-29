import { useRef, useState } from 'react'
import clsx from 'clsx'
import { usePortfolio } from '../../context/PortfolioContext'

const MAX_BYTES = 5 * 1024 * 1024

function AvatarPlaceholder() {
  return (
    <div className="w-24 h-24 rounded-full flex items-center justify-center"
      style={{ backgroundColor: 'var(--color-surface)', border: '1px dashed var(--color-border)' }}>
      <svg className="w-7 h-7" style={{ color: 'var(--color-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </div>
  )
}

function SpinnerOverlay() {
  return (
    <div className="absolute inset-0 rounded-full flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <svg className="animate-spin w-5 h-5" style={{ color: 'var(--color-accent)' }} fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
    </div>
  )
}

export default function ProfilePhotoAdmin() {
  const { data, updateProfilePhoto, removeProfilePhoto } = usePortfolio()
  const [localPreview, setLocalPreview] = useState(null)
  const [isUploading, setIsUploading]   = useState(false)
  const [error, setError]               = useState(null)
  const fileInputRef = useRef(null)

  const displaySrc = localPreview || data.profilePhotoUrl

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { setError("Please choose a JPG, PNG, or WebP image."); return }
    if (file.size > MAX_BYTES)           { setError("Image must be smaller than 5 MB."); return }
    setError(null)
    setIsUploading(true)
    setLocalPreview(URL.createObjectURL(file))
    try {
      const url = await updateProfilePhoto(file)
      setLocalPreview(url)
    } catch (err) {
      setError('Upload failed — please check your connection and try again.')
      setLocalPreview(null)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleRemove = async () => {
    if (!window.confirm('Remove your profile photo?')) return
    setIsUploading(true)
    try { await removeProfilePhoto(); setLocalPreview(null) }
    catch { setError('Could not remove the photo. Please try again.') }
    finally { setIsUploading(false) }
  }

  return (
    <div className="space-y-5">
      <h3 className="font-head text-base" style={{ color: 'var(--color-heading)' }}>Profile Photo</h3>

      <div className="flex items-center gap-6">
        <div className="relative flex-shrink-0">
          {displaySrc
            ? <img src={displaySrc} alt="Profile preview"
                className="w-24 h-24 rounded-full object-cover"
                style={{ border: '1px solid var(--color-border)' }} />
            : <AvatarPlaceholder />
          }
          {isUploading && <SpinnerOverlay />}
        </div>

        <div className="flex flex-col gap-2">
          <button onClick={() => fileInputRef.current?.click()} disabled={isUploading}
            className={clsx('btn-ghost text-xs px-4 py-2', { 'opacity-40 cursor-not-allowed': isUploading })}>
            {isUploading ? 'Uploading…' : displaySrc ? 'Change Photo' : 'Upload Photo'}
          </button>
          {displaySrc && !isUploading && (
            <button onClick={handleRemove} className="btn-danger text-xs">Remove</button>
          )}
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden" onChange={handleFileChange} />

      <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
        Square image recommended, at least 200 × 200 px. Max 5 MB.
      </p>

      {error && (
        <p role="alert" className="text-xs text-red-400 px-3 py-2 rounded-sm"
          style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
          {error}
        </p>
      )}
    </div>
  )
}
