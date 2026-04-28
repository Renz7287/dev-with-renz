import { usePortfolio } from '../../context/PortfolioContext'
import { SectionHeader, EmptyState, Skeleton } from '../ui'

export default function Contact() {
  const { data, loading } = usePortfolio()

  return (
    <section id="contact" className="max-w-4xl mx-auto px-6 md:px-10 py-20 border-t border-gold/10">
      <SectionHeader label="Connect" title="Get in Touch" />
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1,2,3,4,5].map((i) => <Skeleton key={i} className="h-20" />)}
        </div>
      ) : data.contacts.length === 0 ? (
        <EmptyState message="No contact info yet." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.contacts.map((c) =>
            c.url ? (
              <a key={c.id} href={c.url} target="_blank" rel="noopener noreferrer"
                className="card-base card-hover px-5 py-5 block no-underline">
                <p className="text-[0.65rem] tracking-[0.15em] uppercase text-gold mb-1.5">{c.label}</p>
                <p className="text-sm text-neutral-200 break-all">{c.value}</p>
              </a>
            ) : (
              <div key={c.id} className="card-base px-5 py-5">
                <p className="text-[0.65rem] tracking-[0.15em] uppercase text-gold mb-1.5">{c.label}</p>
                <p className="text-sm text-neutral-200">{c.value}</p>
              </div>
            )
          )}
        </div>
      )}
    </section>
  )
}
