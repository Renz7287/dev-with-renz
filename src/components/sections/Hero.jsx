import { usePortfolio } from '../../context/PortfolioContext'
import { GoldLine, Skeleton } from '../ui'

export default function Hero() {
  const { data, loading } = usePortfolio()
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="min-h-screen flex items-center px-6 md:px-10 pt-24 pb-16 max-w-4xl mx-auto">
      <div className="flex flex-col gap-6 animate-fade-in">
        <p className="text-xs tracking-[0.22em] uppercase text-gold">Virtual Assistant &amp; IT Student</p>
        <h1 className="font-head text-5xl md:text-7xl leading-[1.05]">
          Clarence G.<br />
          <span className="text-gold">Cabrera.</span>
        </h1>
        <GoldLine />
        {loading ? (
          <Skeleton className="h-16 w-full max-w-lg" />
        ) : (
          <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-lg">{data.summary}</p>
        )}
        <div className="flex gap-3 flex-wrap mt-2">
          <button className="btn-gold" onClick={() => scrollTo('contact')}>Get in Touch</button>
          <button className="btn-ghost" onClick={() => scrollTo('projects')}>View Projects</button>
        </div>
      </div>
    </section>
  )
}
