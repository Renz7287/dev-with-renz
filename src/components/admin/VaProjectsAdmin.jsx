import { useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import { FormField, EmptyState, Spinner } from '../ui'
import ImageUploadField from './ImageUploadField'

const BLANK = { title: '', description: '', image_url: null }

export default function VaProjectsAdmin() {
  const { data, saveVaProject, removeVaProject } = usePortfolio()
  const [selected, setSelected]   = useState(null)
  const [form, setForm]           = useState(BLANK)
  const [imageFile, setImageFile] = useState(null)
  const [saving, setSaving]       = useState(false)
  const [deleting, setDeleting]   = useState(false)

  const openNew  = () => { setSelected('new'); setForm(BLANK); setImageFile(null) }
  const openEdit = (item) => { setSelected(item.id); setForm({ ...item }); setImageFile(null) }
  const cancel   = () => { setSelected(null); setForm(BLANK); setImageFile(null) }

  const handleSave = async () => {
    if (!form.title.trim()) return
    setSaving(true)
    try { await saveVaProject(selected === 'new' ? form : { ...form, id: selected }, imageFile); cancel() }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this project?')) return
    setDeleting(true)
    try { const item = data.vaProjects.find((p) => p.id === selected); await removeVaProject(selected, item?.image_url); cancel() }
    finally { setDeleting(false) }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-head text-lg" style={{ color: 'var(--color-heading)' }}>VA Projects</h3>
        <button className="btn-ghost text-xs px-3 py-1.5" onClick={openNew}>+ Add</button>
      </div>

      {data.vaProjects.length === 0 && selected !== 'new' ? (
        <EmptyState message="No VA projects yet." cta="Add your first" onCta={openNew} />
      ) : (
        <div className="flex flex-col gap-2 mb-5">
          {data.vaProjects.map((item) => {
            const isActive = selected === item.id
            return (
              <button key={item.id} onClick={() => openEdit(item)}
                className="text-left px-4 py-3 rounded-sm transition-all duration-200 cursor-pointer w-full flex items-center gap-3"
                style={{
                  backgroundColor: isActive ? 'rgba(45,74,110,0.06)' : 'var(--color-surface)',
                  border: `1px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border)'}`,
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.borderColor = 'var(--color-accent)' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.borderColor = 'var(--color-border)' }}
              >
                {item.image_url && (
                  <img src={item.image_url} alt={item.title}
                    className="w-10 h-10 object-cover rounded-sm shrink-0"
                    style={{ border: '1px solid var(--color-border)' }} />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--color-heading)' }}>{item.title}</p>
                  <p className="text-xs truncate mt-0.5" style={{ color: 'var(--color-muted)' }}>{item.description}</p>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {selected && (
        <div className="rounded-sm p-4"
          style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--color-accent)' }}>
            {selected === 'new' ? 'New VA Project' : 'Edit VA Project'}
          </p>
          <FormField id="va-title" label="Title" value={form.title}
            onChange={(v) => setForm((p) => ({ ...p, title: v }))} placeholder="e.g. Task Management Sample" />
          <FormField id="va-desc" label="Description" value={form.description}
            onChange={(v) => setForm((p) => ({ ...p, description: v }))}
            rows={4} placeholder="Brief description…" />
          <ImageUploadField label="Image (optional)" currentUrl={form.image_url}
            onFileSelect={(f) => setImageFile(f)}
            onRemove={() => { setForm((p) => ({ ...p, image_url: null })); setImageFile(null) }} />
          <div className="flex gap-2 mt-2 flex-wrap">
            <button className="btn-gold flex items-center gap-2" onClick={handleSave} disabled={saving}>
              {saving && <Spinner />} {saving ? 'Saving…' : 'Save'}
            </button>
            {selected !== 'new' && (
              <button className="btn-danger flex items-center gap-2" onClick={handleDelete} disabled={deleting}>
                {deleting && <Spinner />} {deleting ? 'Deleting…' : 'Delete'}
              </button>
            )}
            <button className="btn-ghost text-xs" onClick={cancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
