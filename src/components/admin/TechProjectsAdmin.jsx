import { useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import { FormField, EmptyState, Spinner } from '../ui'
import ImageUploadField from './ImageUploadField'

const BLANK = { name: '', description: '', icon_url: null }

export default function TechProjectsAdmin() {
  const { data, saveTechProject, removeTechProject } = usePortfolio()
  const [selected, setSelected] = useState(null)
  const [form, setForm]         = useState(BLANK)
  const [iconFile, setIconFile] = useState(null)
  const [saving, setSaving]     = useState(false)
  const [deleting, setDeleting] = useState(false)

  const openNew  = () => { setSelected('new'); setForm(BLANK); setIconFile(null) }
  const openEdit = (item) => { setSelected(item.id); setForm({ ...item }); setIconFile(null) }
  const cancel   = () => { setSelected(null); setForm(BLANK); setIconFile(null) }

  const handleSave = async () => {
    if (!form.name.trim()) return
    setSaving(true)
    try { await saveTechProject(selected === 'new' ? form : { ...form, id: selected }, iconFile); cancel() }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this project?')) return
    setDeleting(true)
    try { const item = data.techProjects.find((p) => p.id === selected); await removeTechProject(selected, item?.icon_url); cancel() }
    finally { setDeleting(false) }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-head text-lg" style={{ color: 'var(--color-heading)' }}>Tech Projects</h3>
        <button className="btn-ghost text-xs px-3 py-1.5" onClick={openNew}>+ Add</button>
      </div>

      {data.techProjects.length === 0 && selected !== 'new' ? (
        <EmptyState message="No tech projects yet." cta="Add your first" onCta={openNew} />
      ) : (
        <div className="flex flex-col gap-2 mb-5">
          {data.techProjects.map((item) => {
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
                {item.icon_url ? (
                  <img src={item.icon_url} alt={item.name} className="w-8 h-8 object-contain rounded shrink-0" />
                ) : (
                  <div className="w-8 h-8 rounded flex items-center justify-center text-xs shrink-0"
                    style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>
                    {item.name?.[0] ?? '?'}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--color-heading)' }}>{item.name}</p>
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
            {selected === 'new' ? 'New Tech Project' : 'Edit Tech Project'}
          </p>
          <ImageUploadField label="Icon / Logo (optional)" currentUrl={form.icon_url}
            onFileSelect={(f) => setIconFile(f)}
            onRemove={() => { setForm((p) => ({ ...p, icon_url: null })); setIconFile(null) }} />
          <FormField id="tech-name" label="Project Name" value={form.name}
            onChange={(v) => setForm((p) => ({ ...p, name: v }))} placeholder="e.g. Park Track" />
          <FormField id="tech-desc" label="Description" value={form.description}
            onChange={(v) => setForm((p) => ({ ...p, description: v }))}
            rows={4} placeholder="What this project does…" />
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
