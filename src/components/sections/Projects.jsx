import { useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import { SectionHeader, Tabs, EmptyState, Skeleton } from '../ui'
import { VaProjectCard, TechProjectCard } from './ProjectCard'

const PROJECT_TABS = [
  { label: 'Virtual Assistant', value: 'va' },
  { label: 'Tech & Dev',        value: 'tech' },
]

export default function Projects() {
  const { data, loading } = usePortfolio()
  const [activeTab, setActiveTab] = useState('va')

  const projects = activeTab === 'va' ? data.vaProjects : data.techProjects

  return (
    <section id="projects" className="max-w-4xl mx-auto px-6 md:px-10 py-20"
      style={{ borderTop: '1px solid var(--color-border)' }}>
      <SectionHeader label="Work" title="Projects" />
      <Tabs tabs={PROJECT_TABS} active={activeTab} onChange={setActiveTab} />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2].map((i) => <Skeleton key={i} className="h-64" />)}
        </div>
      ) : projects.length === 0 ? (
        <EmptyState message="No projects yet." />
      ) : activeTab === 'va' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.vaProjects.map((p) => <VaProjectCard key={p.id} {...p} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.techProjects.map((p) => <TechProjectCard key={p.id} {...p} />)}
        </div>
      )}
    </section>
  )
}
