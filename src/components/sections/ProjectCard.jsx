import { useState } from 'react'

export function VaProjectCard({ title, description, image_url }) {
  const [lightbox, setLightbox] = useState(false)

  return (
    <>
      <div className="project-card card-base card-hover p-7 flex flex-col gap-4">
        {image_url && (
          <button
            className="w-full overflow-hidden rounded-sm cursor-zoom-in border-0 p-0 bg-transparent"
            onClick={() => setLightbox(true)}
          >
            <img
              src={image_url}
              alt={title}
              className="w-full h-44 object-cover rounded-sm hover:scale-105 transition-transform duration-300"
            />
          </button>
        )}
        <div>
          <h3 className="font-head text-xl mb-2" style={{ color: 'var(--color-heading)' }}>
            {title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            {description}
          </p>
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-[300] flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <img
            src={image_url}
            alt={title}
            className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl"
          />
          <button
            className="absolute top-4 right-4 text-neutral-400 hover:text-white text-2xl bg-transparent border-0 cursor-pointer"
            onClick={() => setLightbox(false)}
          >
            ✕
          </button>
        </div>
      )}
    </>
  )
}

export function TechProjectCard({ name, description, icon_url }) {
  return (
    <div className="project-card card-base card-hover p-7 flex flex-col gap-3">
      {icon_url && (
        <img src={icon_url} alt={name} className="w-10 h-10 object-contain rounded" />
      )}
      <div>
        <h3 className="font-head text-xl mb-2" style={{ color: 'var(--color-heading)' }}>
          {name}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          {description}
        </p>
      </div>
    </div>
  )
}
