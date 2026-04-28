import clsx from 'clsx'

export function Toast({ toast }) {
  if (!toast) return null
  const isError = toast.type === 'error'
  return (
    <div
      className={clsx(
        'fixed bottom-6 right-6 z-[999] px-4 py-2.5 text-sm rounded-sm animate-slide-up border',
        isError
          ? 'bg-dark-700 border-red-500/40 text-red-300'
          : 'bg-dark-700 border-green-500/40 text-neutral-100'
      )}
    >
      {toast.msg}
    </div>
  )
}

export function SectionHeader({ label, title }) {
  return (
    <>
      <p className="text-xs tracking-[0.22em] uppercase text-gold mb-3">{label}</p>
      <h2 className="font-head text-3xl md:text-4xl mb-10">{title}</h2>
    </>
  )
}

export function GoldLine() {
  return <div className="w-14 h-px bg-gold opacity-50" />
}

export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-6 border-b border-gold/10 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={clsx(
            'pb-3 text-xs tracking-[0.08em] uppercase border-b-2 border-transparent',
            'hover:text-neutral-200 transition-all duration-200 cursor-pointer bg-transparent border-0 -mb-px',
            active === tab.value ? 'text-gold border-b-2 border-gold' : 'text-neutral-500'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export function Pill({ children }) {
  return (
    <span className="bg-dark-700 border border-gold/10 text-neutral-300 px-4 py-1.5 text-sm rounded-full">
      {children}
    </span>
  )
}

export function Skeleton({ className }) {
  return (
    <div className={clsx('animate-pulse bg-dark-600 rounded-sm', className)} />
  )
}

export function EmptyState({ message, cta, onCta }) {
  return (
    <div className="flex flex-col items-center gap-3 py-12 text-center">
      <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-gold text-lg">+</div>
      <p className="text-neutral-500 text-sm">{message}</p>
      {cta && (
        <button
          className="bg-transparent border border-gold/20 text-neutral-400 text-xs px-4 py-2 rounded-sm hover:border-gold/50 hover:text-neutral-200 transition-all duration-200 cursor-pointer mt-1"
          onClick={onCta}
        >
          {cta}
        </button>
      )}
    </div>
  )
}

export function FormField({ label, id, type = 'text', value, onChange, rows, placeholder }) {
  const cls = 'w-full bg-dark-700 border border-gold/15 text-neutral-100 px-3 py-2.5 text-sm font-body rounded-sm outline-none focus:border-gold/50 transition-colors duration-200'
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-xs tracking-[0.12em] uppercase text-neutral-500 mb-1.5">
        {label}
      </label>
      {rows ? (
        <textarea id={id} className={cls} value={value} rows={rows} placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input id={id} type={type} className={cls} value={value} placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  )
}

export function Spinner({ size = 'sm' }) {
  const s = size === 'sm' ? 'w-4 h-4' : 'w-7 h-7'
  return (
    <div className={clsx(s, 'border-2 border-gold/20 border-t-gold rounded-full animate-spin')} />
  )
}
