import { useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import { FormField, Spinner } from '../ui'

export default function SummaryAdmin() {
  const { data, updateSummary } = usePortfolio()
  const [value, setValue] = useState(data.summary)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await updateSummary(value)
    setSaving(false)
  }

  return (
    <div>
      <h3 className="font-head text-lg mb-5">Edit Summary</h3>
      <FormField id="summary" label="About Text" value={value} onChange={setValue} rows={6} />
      <button className="btn-gold flex items-center gap-2" onClick={handleSave} disabled={saving}>
        {saving && <Spinner />}
        {saving ? 'Saving…' : 'Save Changes'}
      </button>
    </div>
  )
}
