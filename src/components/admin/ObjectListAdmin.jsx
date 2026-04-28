import { useState } from 'react'
import clsx from 'clsx'
import { FormField, EmptyState, Spinner } from '../ui'

/**
 * fields: [{ key, label, rows?, placeholder? }]
 * onSave(formObj) → Promise
 * onDelete(id)    → Promise
 */
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
    try {
      await onSave(selected === 'new' ? payload : { ...payload, id: selected })
      cancel()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this item?')) return
    setDeleting(true)
    try {
      await onDelete(selected)
      cancel()
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-head text-lg">{title}</h3>
        <button className="btn-ghost text-xs px-3 py-1.5" onClick={openNew}>+ Add</button>
      </div>

      {items.length === 0 && selected !== 'new' ? (
        <EmptyState message={`No ${title.toLowerCase()} yet.`} cta="Add your first" onCta={openNew} />
      ) : (
        <div className="flex flex-col gap-2 mb-5">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => openEdit(item)}
              className={clsx(
                'text-left px-4 py-3 rounded-sm border transition-all duration-200 bg-dark-700 cursor-pointer w-full',
                selected === item.id ? 'border-gold/50 bg-gold/5' : 'border-gold/10 hover:border-gold/30'
              )}
            >
              <p className="text-sm font-medium text-neutral-200">{item[fields[0].key]}</p>
              {fields[1] && <p className="text-xs text-neutral-500 mt-0.5">{item[fields[1].key]}</p>}
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="border border-gold/15 rounded-sm p-4 bg-dark-800">
          <p className="text-xs tracking-widest uppercase text-gold mb-4">
            {selected === 'new' ? 'New Item' : 'Edit Item'}
          </p>
          {fields.map(({ key, label, rows, placeholder }) => (
            <FormField
              key={key} id={key} label={label} rows={rows} placeholder={placeholder}
              value={form[key] ?? ''}
              onChange={(v) => setForm((p) => ({ ...p, [key]: v }))}
            />
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
