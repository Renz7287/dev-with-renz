import { useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import { EmptyState, Spinner } from '../ui'

export const SIMPLE_LIST_CONFIG = {
  'va-skills':   { field: 'vaSkills',   category: 'va_skills',   title: 'VA Skills' },
  'tech-skills': { field: 'techSkills', category: 'tech_skills', title: 'Tech Skills' },
  tools:         { field: 'tools',      category: 'tools',       title: 'Tools' },
  strengths:     { field: 'strengths',  category: 'strengths',   title: 'Strengths' },
}

export default function SimpleListAdmin({ sectionKey }) {
  const config = SIMPLE_LIST_CONFIG[sectionKey]
  const { data, addToList, updateInList, removeFromList } = usePortfolio()
  const items = data[config.field] ?? []

  const [editId, setEditId]   = useState(null)
  const [editVal, setEditVal] = useState('')
  const [newVal, setNewVal]   = useState('')
  const [adding, setAdding]   = useState(false)
  const [saving, setSaving]   = useState(false)

  const startEdit  = (item) => { setEditId(item.id); setEditVal(item.value); setAdding(false) }
  const cancelEdit = () => { setEditId(null); setEditVal('') }

  const handleUpdate = async () => {
    if (!editVal.trim()) return
    setSaving(true)
    await updateInList(config.field, editId, editVal.trim())
    setSaving(false); cancelEdit()
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return
    await removeFromList(config.field, id)
    if (editId === id) cancelEdit()
  }

  const handleAdd = async () => {
    if (!newVal.trim()) return
    setSaving(true)
    await addToList(config.field, config.category, newVal.trim())
    setSaving(false); setNewVal(''); setAdding(false)
  }

  const inputStyle = {
    backgroundColor: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-heading)',
    borderRadius: '2px',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    outline: 'none',
    width: '100%',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-head text-lg" style={{ color: 'var(--color-heading)' }}>{config.title}</h3>
        <button className="btn-ghost text-xs px-3 py-1.5"
          onClick={() => { setAdding(true); cancelEdit() }}>+ Add</button>
      </div>

      {items.length === 0 && !adding ? (
        <EmptyState message={`No ${config.title.toLowerCase()} yet.`}
          cta="Add one" onCta={() => setAdding(true)} />
      ) : (
        <div className="flex flex-col gap-2 mb-4">
          {items.map((item) =>
            editId === item.id ? (
              <div key={item.id} className="flex gap-2 items-center">
                <input style={inputStyle} value={editVal}
                  onChange={(e) => setEditVal(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-accent)' }}
                  onBlur={e =>  { e.currentTarget.style.borderColor = 'var(--color-border)' }}
                  autoFocus />
                <button className="btn-gold px-3 py-2 text-xs flex items-center gap-1"
                  onClick={handleUpdate} disabled={saving}>
                  {saving && <Spinner />} Save
                </button>
                <button className="btn-danger px-3 py-2 text-xs"
                  onClick={() => handleDelete(item.id)}>Del</button>
                <button className="btn-ghost px-3 py-2 text-xs" onClick={cancelEdit}>✕</button>
              </div>
            ) : (
              <div key={item.id}
                className="flex items-center justify-between px-4 py-2.5 rounded-sm transition-all duration-200"
                style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)' }}
              >
                <span className="text-sm" style={{ color: 'var(--color-body)' }}>{item.value}</span>
                <button
                  className="text-xs bg-transparent border-0 cursor-pointer transition-colors"
                  style={{ color: 'var(--color-muted)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-muted)' }}
                  onClick={() => startEdit(item)}
                >Edit</button>
              </div>
            )
          )}
        </div>
      )}

      {adding && (
        <div className="flex gap-2 items-center rounded-sm p-3"
          style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
          <input style={{ ...inputStyle, flex: 1 }} value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-accent)' }}
            onBlur={e =>  { e.currentTarget.style.borderColor = 'var(--color-border)' }}
            placeholder="Enter value…" autoFocus />
          <button className="btn-gold px-3 py-2 text-xs flex items-center gap-1"
            onClick={handleAdd} disabled={saving}>
            {saving && <Spinner />} Add
          </button>
          <button className="btn-ghost px-3 py-2 text-xs"
            onClick={() => { setAdding(false); setNewVal('') }}>✕</button>
        </div>
      )}
    </div>
  )
}
