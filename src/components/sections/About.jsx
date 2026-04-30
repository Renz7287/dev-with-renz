import { SectionHeader } from '../ui'

export default function About() {
  return (
    <section id="about" className="max-w-4xl mx-auto px-6 md:px-10 py-20"
      style={{ borderTop: '1px solid var(--color-border)' }}>
      <SectionHeader label="Background" title="Education" />
      <div className="card-base p-7">
        <p className="font-head text-xl mb-2" style={{ color: 'var(--color-heading)' }}>
          Bachelor of Science in Information Technology
        </p>
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          Western Mindanao State University
        </p>
        <p className="text-xs mt-3 tracking-wider" style={{ color: 'var(--color-accent)' }}>
          2022 — 2026
        </p>
      </div>
    </section>
  )
}
