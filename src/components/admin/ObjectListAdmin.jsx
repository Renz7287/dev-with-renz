import { useState } from 'react'
import { FormField, EmptyState, Spinner } from '../ui'

export default function ObjectListAdmin({ title, items, fields, onSave, onDelete }) {
  const [selected, setSelected] = useState(null)
  const [form, setForm]         = useState({})
  const [saving, setSaving]     = useState(false)
  const [deleting, setDeleting] = useState(false)

  const openNew  = () => { setSelected('new'); setForm({}) }
  const openEdit = (item) => { setSelected(item.id); setForm({ ...item }) }
  const cancel   = () => { setSelected(null); setForm({}) }

  const handleSave = async () => {
    const payload = {}
    fields.forEach(({ key }) => { payload[key] = (form[key] ?? '').trim() })
    if (!payload[fields[0].key]) return
    setSaving(true)
    try { await onSave(selected === 'new' ? payload : { ...payload, id: selected }); cancel() }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this item?')) return
    setDeleting(true)
    try { await onDelete(selected); cancel() }
    finally { setDeleting(false) }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-head text-lg" style={{ color: 'var(--color-heading)' }}>{title}</h3>
        <button className="btn-ghost text-xs px-3 py-1.5" onClick={openNew}>+ Add</button>
      </div>

      {items.length === 0 && selected !== 'new' ? (
        <EmptyState message={`No ${title.toLowerCase()} yet.`} cta="Add your first" onCta={openNew} />
      ) : (
        <div className="flex flex-col gap-2 mb-5">
          {items.map((item) => {
            const isActive = selected === item.id
            return (
              <button key={item.id} onClick={() => openEdit(item)}
                className="text-left px-4 py-3 rounded-sm transition-all duration-200 cursor-pointer w-full"
                style={{
                  backgroundColor: isActive ? 'rgba(var(--accent-rgb,45,74,110),0.06)' : 'var(--color-surface)',
                  border: `1px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border)'}`,
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.borderColor = 'var(--color-accent)' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.borderColor = 'var(--color-border)' }}
              >
                <p className="text-sm font-medium" style={{ color: 'var(--color-heading)' }}>
                  {item[fields[0].key]}
                </p>
                {fields[1] && (
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
                    {item[fields[1].key]}
                  </p>
                )}
              </button>
            )
          })}
        </div>
      )}

      {selected && (
        <div className="rounded-sm p-4"
          style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--color-accent)' }}>
            {selected === 'new' ? 'New Item' : 'Edit Item'}
          </p>
          {fields.map(({ key, label, rows, placeholder }) => (
            <FormField key={key} id={key} label={label} rows={rows} placeholder={placeholder}
              value={form[key] ?? ''}
              onChange={(v) => setForm((p) => ({ ...p, [key]: v }))} />
          ))}
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
