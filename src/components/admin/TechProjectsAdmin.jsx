import { useState } from 'react'
import clsx from 'clsx'
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
    try {
      await saveTechProject(
        selected === 'new' ? form : { ...form, id: selected },
        iconFile
      )
      cancel()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this project?')) return
    setDeleting(true)
    try {
      const item = data.techProjects.find((p) => p.id === selected)
      await removeTechProject(selected, item?.icon_url)
      cancel()
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-head text-lg">Tech Projects</h3>
        <button className="btn-ghost text-xs px-3 py-1.5" onClick={openNew}>+ Add</button>
      </div>

      {data.techProjects.length === 0 && selected !== 'new' ? (
        <EmptyState message="No tech projects yet." cta="Add your first" onCta={openNew} />
      ) : (
        <div className="flex flex-col gap-2 mb-5">
          {data.techProjects.map((item) => (
            <button
              key={item.id}
              onClick={() => openEdit(item)}
              className={clsx(
                'text-left px-4 py-3 rounded-sm border transition-all duration-200 bg-dark-700 cursor-pointer w-full flex items-center gap-3',
                selected === item.id ? 'border-gold/50 bg-gold/5' : 'border-gold/10 hover:border-gold/30'
              )}
            >
              {item.icon_url ? (
                <img src={item.icon_url} alt={item.name}
                  className="w-8 h-8 object-contain rounded shrink-0" />
              ) : (
                <div className="w-8 h-8 rounded bg-dark-600 flex items-center justify-center text-gold text-xs shrink-0">
                  {item.name?.[0] ?? '?'}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium text-neutral-200 truncate">{item.name}</p>
                <p className="text-xs text-neutral-500 truncate mt-0.5">{item.description}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="border border-gold/15 rounded-sm p-4 bg-dark-800">
          <p className="text-xs tracking-widest uppercase text-gold mb-4">
            {selected === 'new' ? 'New Tech Project' : 'Edit Tech Project'}
          </p>

          <ImageUploadField
            label="Icon / Logo (optional)"
            currentUrl={form.icon_url}
            onFileSelect={(f) => setIconFile(f)}
            onRemove={() => { setForm((p) => ({ ...p, icon_url: null })); setIconFile(null) }}
          />

          <FormField id="tech-name" label="Project Name" value={form.name}
            onChange={(v) => setForm((p) => ({ ...p, name: v }))}
            placeholder="e.g. Park Track" />

          <FormField id="tech-desc" label="Description" value={form.description}
            onChange={(v) => setForm((p) => ({ ...p, description: v }))}
            rows={4} placeholder="What this project does…" />

          <div className="flex gap-2 mt-2 flex-wrap">
            <button className="btn-gold flex items-center gap-2" onClick={handleSave} disabled={saving}>
              {saving && <Spinner />}
              {saving ? 'Saving…' : 'Save'}
            </button>
            {selected !== 'new' && (
              <button className="btn-danger flex items-center gap-2" onClick={handleDelete} disabled={deleting}>
                {deleting && <Spinner />}
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            )}
            <button className="btn-ghost text-xs" onClick={cancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
