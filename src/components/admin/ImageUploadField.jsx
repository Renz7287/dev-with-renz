import { useRef, useState } from 'react'

export default function ImageUploadField({ label, currentUrl, onFileSelect, onRemove }) {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(null)

  const handleChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    onFileSelect(file)
  }

  const handleRemove = () => {
    setPreview(null)
    if (inputRef.current) inputRef.current.value = ''
    onRemove?.()
  }

  const displayUrl = preview || currentUrl

  return (
    <div className="mb-4">
      <label className="block text-xs tracking-[0.12em] uppercase mb-2"
        style={{ color: 'var(--color-muted)' }}>
        {label}
      </label>

      {displayUrl ? (
        <div className="relative inline-block">
          <img src={displayUrl} alt="preview"
            className="max-h-40 max-w-full object-contain rounded-sm"
            style={{ border: '1px solid var(--color-border)' }} />
          <button
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 hover:bg-red-600
                       text-white text-xs flex items-center justify-center border-0 cursor-pointer"
          >✕</button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full h-28 rounded-sm flex flex-col items-center justify-center gap-2
                     transition-all duration-200 cursor-pointer bg-transparent"
          style={{ border: '1px dashed var(--color-border)', color: 'var(--color-muted)' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-muted)' }}
        >
          <span className="text-2xl">↑</span>
          <span className="text-xs">Click to upload image</span>
        </button>
      )}

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />

      {!displayUrl && (
        <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
          PNG, JPG, WebP — max 5MB
        </p>
      )}
    </div>
  )
}
