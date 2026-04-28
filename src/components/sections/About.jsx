import { SectionHeader } from '../ui'

export default function About() {
  return (
    <section id="about" className="max-w-4xl mx-auto px-6 md:px-10 py-20 border-t border-gold/10">
      <SectionHeader label="Background" title="Education" />
      <div className="card-base p-7">
        <p className="font-head text-xl mb-2">Bachelor of Science in Information Technology</p>
        <p className="text-neutral-500 text-sm">Western Mindanao State University</p>
        <p className="text-gold text-xs mt-3 tracking-wider">2022 — 2026</p>
      </div>
    </section>
  )
}
