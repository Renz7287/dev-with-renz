import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { FormField, Spinner } from '../ui'

export default function AdminLogin({ onSuccess }) {
  const { login, authError } = useAuth()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async () => {
    if (!email || !password) return
    setLoading(true)
    const ok = await login(email, password)
    setLoading(false)
    if (ok) onSuccess?.()
  }

  return (
    <div className="flex flex-col items-center justify-center py-14 px-8 gap-5 w-full">
      <div className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ backgroundColor: 'rgba(var(--color-accent-rgb, 45,74,110), 0.1)', border: '1px solid var(--color-border)' }}>
        <span className="font-head text-xl" style={{ color: 'var(--color-accent)' }}>A</span>
      </div>

      <div className="text-center">
        <h3 className="font-head text-xl mb-1" style={{ color: 'var(--color-heading)' }}>
          Admin Access
        </h3>
        <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
          Sign in with your Supabase account
        </p>
      </div>

      <div className="w-full max-w-xs flex flex-col gap-1">
        <FormField id="email" label="Email" type="email" value={email}
          onChange={setEmail} placeholder="admin@example.com" />
        <FormField id="password" label="Password" type="password" value={password}
          onChange={setPassword} placeholder="••••••••" />
      </div>

      {authError && (
        <p className="text-red-400 text-xs text-center max-w-xs">{authError}</p>
      )}

      <button className="btn-gold px-10 flex items-center gap-2" onClick={handleSubmit} disabled={loading}>
        {loading && <Spinner />}
        {loading ? 'Signing in…' : 'Sign In'}
      </button>
    </div>
  )
}
