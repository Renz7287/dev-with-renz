import clsx from 'clsx'

export function Toast({ toast }) {
  if (!toast) return null
  const isError = toast.type === 'error'
  return (
    <div
      className="fixed bottom-6 right-6 z-[999] px-4 py-2.5 text-sm rounded-sm animate-slide-up border"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: isError ? 'rgba(239,68,68,0.4)' : 'rgba(34,197,94,0.4)',
        color: isError ? '#fca5a5' : 'var(--color-heading)',
      }}
    >
      {toast.msg}
    </div>
  )
}

export function SectionHeader({ label, title }) {
  return (
    <>
      <p className="text-xs tracking-[0.22em] uppercase mb-3"
        style={{ color: 'var(--color-accent)' }}>
        {label}
      </p>
      <h2 className="font-head text-3xl md:text-4xl mb-10"
        style={{ color: 'var(--color-heading)' }}>
        {title}
      </h2>
    </>
  )
}

export function GoldLine() {
  return (
    <div className="w-14 h-px opacity-50"
      style={{ backgroundColor: 'var(--color-accent)' }} />
  )
}

export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-6 mb-8"
      style={{ borderBottom: '1px solid var(--color-border)' }}>
      {tabs.map((tab) => {
        const isActive = active === tab.value
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className="pb-3 text-xs tracking-[0.08em] uppercase -mb-px
                       transition-all duration-200 cursor-pointer bg-transparent border-0"
            style={{
              color: isActive ? 'var(--color-accent)' : 'var(--color-muted)',
              borderBottom: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--color-body)' }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--color-muted)' }}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export function Pill({ children }) {
  return (
    <span className="px-4 py-1.5 text-sm rounded-full"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-body)',
      }}>
      {children}
    </span>
  )
}

export function Skeleton({ className }) {
  return (
    <div className={clsx('animate-pulse rounded-sm', className)}
      style={{ backgroundColor: 'var(--color-surface)' }} />
  )
}

export function EmptyState({ message, cta, onCta }) {
  return (
    <div className="flex flex-col items-center gap-3 py-12 text-center">
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
        style={{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-accent)',
          border: '1px solid var(--color-border)',
        }}>
        +
      </div>
      <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{message}</p>
      {cta && (
        <button
          className="text-xs px-4 py-2 rounded-sm transition-all duration-200 cursor-pointer mt-1 bg-transparent"
          style={{
            border: '1px solid var(--color-border)',
            color: 'var(--color-muted)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--color-accent)'
            e.currentTarget.style.color = 'var(--color-body)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--color-border)'
            e.currentTarget.style.color = 'var(--color-muted)'
          }}
          onClick={onCta}
        >
          {cta}
        </button>
      )}
    </div>
  )
}

export function FormField({ label, id, type = 'text', value, onChange, rows, placeholder }) {
  return (
    <div className="mb-4">
      <label htmlFor={id}
        className="block text-xs tracking-[0.12em] uppercase mb-1.5"
        style={{ color: 'var(--color-muted)' }}>
        {label}
      </label>
      {rows ? (
        <textarea
          id={id}
          className="w-full px-3 py-2.5 text-sm font-body rounded-sm outline-none transition-colors duration-200"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-heading)',
          }}
          value={value}
          rows={rows}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-accent)' }}
          onBlur={e =>  { e.currentTarget.style.borderColor = 'var(--color-border)' }}
        />
      ) : (
        <input
          id={id}
          type={type}
          className="w-full px-3 py-2.5 text-sm font-body rounded-sm outline-none transition-colors duration-200"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-heading)',
          }}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-accent)' }}
          onBlur={e =>  { e.currentTarget.style.borderColor = 'var(--color-border)' }}
        />
      )}
    </div>
  )
}

export function Spinner({ size = 'sm' }) {
  const s = size === 'sm' ? 'w-4 h-4' : 'w-7 h-7'
  return (
    <div className={clsx(s, 'rounded-full animate-spin')}
      style={{
        border: '2px solid var(--color-border)',
        borderTopColor: 'var(--color-accent)',
      }} />
  )
}
