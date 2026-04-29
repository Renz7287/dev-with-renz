import { usePortfolio } from '../../context/PortfolioContext'
import { SectionHeader, EmptyState, Skeleton } from '../ui'

function ContactCard({ c }) {
  const content = (
    <>
      <p className="text-[0.65rem] tracking-[0.15em] uppercase mb-1.5"
        style={{ color: 'var(--color-accent)' }}>
        {c.label}
      </p>
      <p className="text-sm break-all" style={{ color: 'var(--color-body)' }}>
        {c.value}
      </p>
    </>
  )

  if (c.url) {
    return (
      <a href={c.url} target="_blank" rel="noopener noreferrer"
        className="card-base card-hover px-5 py-5 block no-underline">
        {content}
      </a>
    )
  }
  return <div className="card-base px-5 py-5">{content}</div>
}

export default function Contact() {
  const { data, loading } = usePortfolio()

  return (
    <section id="contact" className="max-w-4xl mx-auto px-6 md:px-10 py-20"
      style={{ borderTop: '1px solid var(--color-border)' }}>
      <SectionHeader label="Connect" title="Get in Touch" />
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-20" />)}
        </div>
      ) : data.contacts.length === 0 ? (
        <EmptyState message="No contact info yet." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.contacts.map((c) => <ContactCard key={c.id} c={c} />)}
        </div>
      )}
    </section>
  )
}
