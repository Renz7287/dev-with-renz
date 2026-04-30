// src/components/admin/ResumeAdmin.jsx
import { useRef, useState } from 'react'
import clsx from 'clsx'
import { usePortfolio } from '../../context/PortfolioContext'

const MAX_BYTES = 10 * 1024 * 1024

export default function ResumeAdmin() {
  const { data, updateResume, removeResume } = usePortfolio()
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError]             = useState(null)
  const fileInputRef = useRef(null)

  const resumeUrl = data?.resumeUrl ?? ''
  const hasResume = resumeUrl.length > 0

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') { setError('Only PDF files are accepted.'); return }
    if (file.size > MAX_BYTES)           { setError('File must be smaller than 10 MB.'); return }
    setError(null)
    setIsUploading(true)
    try {
      await updateResume(file)
    } catch (err) {
      setError('Upload failed — please check your connection and try again.')
      console.error('[ResumeAdmin]', err)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleRemove = async () => {
    if (!window.confirm('Remove the resume? Visitors will no longer be able to download it.')) return
    setIsUploading(true)
    setError(null)
    try { await removeResume() }
    catch { setError('Could not remove the resume. Please try again.') }
    finally { setIsUploading(false) }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Title */}
      <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', color: 'var(--color-heading, #111827)', margin: 0 }}>
        Resume
      </h3>

      <p style={{ fontSize: '0.75rem', color: 'var(--color-muted, #6b7280)', margin: 0 }}>
        Upload a PDF resume. A download button will appear on the public site once uploaded.
      </p>

      {/* Status card */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '1rem', borderRadius: '2px',
        backgroundColor: 'var(--color-surface, #f9fafb)',
        border: '1px solid var(--color-border, #e5e7eb)',
      }}>
        {/* PDF icon */}
        <div style={{
          width: '2.5rem', height: '2.5rem', borderRadius: '4px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: hasResume ? 'rgba(239,68,68,0.08)' : 'rgba(128,128,128,0.06)',
          border: '1px solid var(--color-border, #e5e7eb)',
        }}>
          <svg width="20" height="20" fill="none" stroke={hasResume ? '#f87171' : 'var(--color-muted, #9ca3af)'} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {hasResume ? (
            <>
              <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-heading, #111827)', margin: 0 }}>
                Resume uploaded
              </p>
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '0.75rem', color: 'var(--color-accent, #2d4a6e)', textDecoration: 'none' }}>
                Preview ↗
              </a>
            </>
          ) : (
            <p style={{ fontSize: '0.875rem', color: 'var(--color-muted, #6b7280)', margin: 0 }}>
              No resume uploaded yet
            </p>
          )}
        </div>

        {isUploading && (
          <svg style={{ width: '1rem', height: '1rem', color: 'var(--color-accent, #2d4a6e)', animation: 'spin 1s linear infinite', flexShrink: 0 }}
            fill="none" viewBox="0 0 24 24">
            <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        )}
      </div>

      {/* Upload zone */}
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        style={{
          width: '100%', height: '6rem', borderRadius: '2px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          border: '1px dashed var(--color-border, #e5e7eb)',
          backgroundColor: 'transparent',
          color: 'var(--color-muted, #6b7280)',
          cursor: isUploading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          opacity: isUploading ? 0.5 : 1,
        }}
        onMouseEnter={e => { if (!isUploading) { e.currentTarget.style.borderColor = 'var(--color-accent, #2d4a6e)'; e.currentTarget.style.color = 'var(--color-accent, #2d4a6e)' }}}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border, #e5e7eb)'; e.currentTarget.style.color = 'var(--color-muted, #6b7280)' }}
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        <span style={{ fontSize: '0.75rem' }}>
          {isUploading ? 'Uploading…' : hasResume ? 'Click to replace resume' : 'Click to upload resume'}
        </span>
        <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>PDF only · max 10 MB</span>
      </button>

      <input ref={fileInputRef} type="file" accept="application/pdf"
        style={{ display: 'none' }} onChange={handleFileChange} />

      {hasResume && !isUploading && (
        <button onClick={handleRemove} className="btn-danger"
          style={{ fontSize: '0.75rem', width: '100%' }}>
          Delete Resume
        </button>
      )}

      {error && (
        <p role="alert" style={{
          fontSize: '0.75rem', color: '#f87171', margin: 0,
          padding: '0.5rem 0.75rem', borderRadius: '2px',
          backgroundColor: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.2)',
        }}>
          {error}
        </p>
      )}
    </div>
  )
}
