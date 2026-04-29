import { usePortfolio } from '../../context/PortfolioContext'

function ProfileAvatar({ src }) {
  if (src) {
    return (
      <img
        src={src}
        alt="Clarence G. Cabrera"
        loading="eager"
        className="w-36 h-36 md:w-52 md:h-52 rounded-full object-cover"
        style={{ border: '1px solid var(--color-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
      />
    )
  }
  return (
    <div
      className="w-36 h-36 md:w-52 md:h-52 rounded-full flex items-center justify-center"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px dashed var(--color-border)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.10)',
      }}
    >
      <span className="font-head text-5xl md:text-6xl select-none" style={{ color: 'var(--color-accent)', opacity: 0.4 }}>
        C
      </span>
    </div>
  )
}

export default function Hero() {
  const { data } = usePortfolio()
  const { summary, profilePhotoUrl } = data

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-10 md:gap-16 animate-fade-in">

        <div className="flex-shrink-0">
          <ProfileAvatar src={profilePhotoUrl} />
        </div>

        <div className="text-center md:text-left space-y-4 max-w-xl">
          <p className="section-label">Hello, I'm</p>

          <h1 className="heading-primary text-4xl md:text-5xl">
            Clarence G. Cabrera
          </h1>

          <p className="body-text text-sm md:text-base text-justify">
            {summary || 'Motivated and detail-oriented college student taking up Information Technology, seeking a Virtual Assistant position.'}
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
            <a href="#projects" className="btn-gold">View My Work</a>
            <a href="#contact"  className="btn-ghost">Contact Me</a>
          </div>
        </div>

      </div>
    </section>
  )
}
