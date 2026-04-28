// src/components/sections/Hero.jsx
// Replace your existing Hero.jsx with this file.
// It reads `profile_photo_url` from PortfolioContext and renders it.

import { usePortfolio } from "../../context/PortfolioContext";

export default function Hero() {
  const { summary, profilePhotoUrl } = usePortfolio();

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 py-24"
    >
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-10 md:gap-16">

        {/* ── Profile Photo ─────────────────────────────────── */}
        <div className="flex-shrink-0">
          {profilePhotoUrl ? (
            <img
              src={profilePhotoUrl}
              alt="Clarence G. Cabrera"
              className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover
                         border-4 border-indigo-500 shadow-xl shadow-indigo-500/20"
            />
          ) : (
            /* Placeholder avatar when no photo is set */
            <div
              className="w-40 h-40 md:w-52 md:h-52 rounded-full
                          bg-gradient-to-br from-indigo-600 to-purple-600
                          flex items-center justify-center
                          border-4 border-indigo-500 shadow-xl shadow-indigo-500/20"
            >
              <span className="text-5xl md:text-6xl font-bold text-white select-none">
                C
              </span>
            </div>
          )}
        </div>

        {/* ── Text Content ──────────────────────────────────── */}
        <div className="text-center md:text-left space-y-4">
          <p className="text-indigo-400 font-medium tracking-widest uppercase text-sm">
            Hello, I'm
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Clarence G. Cabrera
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
            {summary ||
              "Motivated and detail-oriented college student taking up Information Technology, seeking a Virtual Assistant position."}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
            <a
              href="#projects"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg
                         font-medium transition-colors shadow-lg shadow-indigo-500/25"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10
                         rounded-lg font-medium transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
