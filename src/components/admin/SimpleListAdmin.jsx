import { useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import { EmptyState, Spinner } from '../ui'

// fieldMap maps section key → { field, category, title }
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

  const startEdit = (item) => { setEditId(item.id); setEditVal(item.value); setAdding(false) }
  const cancelEdit = () => { setEditId(null); setEditVal('') }

  const handleUpdate = async () => {
    if (!editVal.trim()) return
    setSaving(true)
    await updateInList(config.field, editId, editVal.trim())
    setSaving(false)
    cancelEdit()
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
    setSaving(false)
    setNewVal('')
    setAdding(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-head text-lg">{config.title}</h3>
        <button className="btn-ghost text-xs px-3 py-1.5"
          onClick={() => { setAdding(true); cancelEdit() }}>
          + Add
        </button>
      </div>

      {items.length === 0 && !adding ? (
        <EmptyState message={`No ${config.title.toLowerCase()} yet.`}
          cta="Add one" onCta={() => setAdding(true)} />
      ) : (
        <div className="flex flex-col gap-2 mb-4">
          {items.map((item) =>
            editId === item.id ? (
              <div key={item.id} className="flex gap-2 items-center">
                <input
                  className="flex-1 bg-dark-700 border border-gold/30 text-neutral-100 px-3 py-2 text-sm rounded-sm outline-none focus:border-gold/60"
                  value={editVal}
                  onChange={(e) => setEditVal(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
                  autoFocus
                />
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
                className="flex items-center justify-between px-4 py-2.5 rounded-sm border border-gold/10 bg-dark-700 hover:border-gold/30 transition-all duration-200">
                <span className="text-sm text-neutral-300">{item.value}</span>
                <button
                  className="text-xs text-neutral-600 hover:text-gold transition-colors bg-transparent border-0 cursor-pointer"
                  onClick={() => startEdit(item)}
                >
                  Edit
                </button>
              </div>
            )
          )}
        </div>
      )}

      {adding && (
        <div className="flex gap-2 items-center border border-gold/15 rounded-sm p-3 bg-dark-800">
          <input
            className="flex-1 bg-dark-700 border border-gold/20 text-neutral-100 px-3 py-2 text-sm rounded-sm outline-none focus:border-gold/50"
            value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Enter value…"
            autoFocus
          />
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
