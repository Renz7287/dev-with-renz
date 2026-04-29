import { usePortfolio } from '../../context/PortfolioContext'
import { SectionHeader, EmptyState, Skeleton } from '../ui'

export default function Availability() {
  const { data, loading } = usePortfolio()

  return (
    <section id="availability" className="max-w-4xl mx-auto px-6 md:px-10 py-20"
      style={{ borderTop: '1px solid var(--color-border)' }}>
      <SectionHeader label="Availability" title="When I'm Available" />
      {loading ? (
        <div className="flex flex-wrap gap-4">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-20 w-48" />)}
        </div>
      ) : data.availability.length === 0 ? (
        <EmptyState message="No availability info yet." />
      ) : (
        <div className="flex flex-wrap gap-4">
          {data.availability.map((a) => (
            <div key={a.id} className="card-base px-5 py-4 min-w-[160px]">
              <p className="text-[0.65rem] tracking-[0.15em] uppercase mb-1"
                style={{ color: 'var(--color-accent)' }}>
                {a.label}
              </p>
              <p className="text-sm" style={{ color: 'var(--color-body)' }}>
                {a.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
