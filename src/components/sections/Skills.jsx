import { useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import { SectionHeader, Tabs, Pill, EmptyState, Skeleton } from '../ui'

const SKILL_TABS = [
  { label: 'VA Skills',  value: 'va' },
  { label: 'Tech Skills', value: 'tech' },
  { label: 'Tools',      value: 'tools' },
  { label: 'Strengths',  value: 'strengths' },
]

function ToolCard({ value }) {
  return (
    <div className="card-base px-4 py-2.5 text-sm transition-all duration-200"
      style={{ color: 'var(--color-body)' }}
      onMouseEnter={e => {
        e.currentTarget.style.color = 'var(--color-accent)'
        e.currentTarget.style.borderColor = 'var(--color-accent)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'var(--color-body)'
        e.currentTarget.style.borderColor = 'var(--color-border)'
      }}
    >
      {value}
    </div>
  )
}

function StrengthCard({ value }) {
  return (
    <div className="card-base px-4 py-4 flex items-start gap-3">
      {/* Accent dot uses token color */}
      <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
        style={{ backgroundColor: 'var(--color-accent)' }} />
      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-body)' }}>
        {value}
      </p>
    </div>
  )
}

export default function Skills() {
  const { data, loading } = usePortfolio()
  const [activeTab, setActiveTab] = useState('va')

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-8 w-28 rounded-full" />)}
        </div>
      )
    }

    if (activeTab === 'va') {
      if (!data.vaSkills.length) return <EmptyState message="No VA skills yet." />
      return <div className="flex flex-wrap gap-2">{data.vaSkills.map((s) => <Pill key={s.id}>{s.value}</Pill>)}</div>
    }

    if (activeTab === 'tech') {
      if (!data.techSkills.length) return <EmptyState message="No tech skills yet." />
      return <div className="flex flex-wrap gap-2">{data.techSkills.map((s) => <Pill key={s.id}>{s.value}</Pill>)}</div>
    }

    if (activeTab === 'tools') {
      if (!data.tools.length) return <EmptyState message="No tools listed yet." />
      return (
        <div className="flex flex-wrap gap-3">
          {data.tools.map((t) => <ToolCard key={t.id} value={t.value} />)}
        </div>
      )
    }

    if (activeTab === 'strengths') {
      if (!data.strengths.length) return <EmptyState message="No strengths listed yet." />
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.strengths.map((s) => <StrengthCard key={s.id} value={s.value} />)}
        </div>
      )
    }
  }

  return (
    <section id="skills" className="max-w-4xl mx-auto px-6 md:px-10 py-20"
      style={{ borderTop: '1px solid var(--color-border)' }}>
      <SectionHeader label="Capabilities" title="Skills & Tools" />
      <Tabs tabs={SKILL_TABS} active={activeTab} onChange={setActiveTab} />
      {renderContent()}
    </section>
  )
}
