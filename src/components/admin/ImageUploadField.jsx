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
      <label className="block text-xs tracking-[0.12em] uppercase text-neutral-500 mb-2">
        {label}
      </label>

      {displayUrl ? (
        <div className="relative inline-block">
          <img
            src={displayUrl}
            alt="preview"
            className="max-h-40 max-w-full object-contain rounded-sm border border-gold/15"
          />
          <button
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center border-0 cursor-pointer hover:bg-red-600"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full h-28 border border-dashed border-gold/20 rounded-sm flex flex-col items-center justify-center gap-2
                     text-neutral-500 hover:border-gold/40 hover:text-neutral-300 transition-all duration-200 cursor-pointer bg-dark-700"
        >
          <span className="text-2xl">↑</span>
          <span className="text-xs">Click to upload image</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {!displayUrl && (
        <p className="text-xs text-neutral-600 mt-1">PNG, JPG, WebP — max 5MB</p>
      )}
    </div>
  )
}
