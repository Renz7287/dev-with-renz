// src/context/AuthContext.jsx
// onAuthStateChange handles auto-logout — when Supabase session expires,
// it fires with session=null which sets isAuthenticated to false,
// and the onExpire callback closes the AdminPanel automatically.
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { signIn as apiSignIn, signOut as apiSignOut } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children, onExpire }) {
  const [session, setSession]     = useState(undefined)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      // Session went from authenticated → null = expiry or remote sign-out
      // Notify parent (App.jsx) to close the admin panel
      if (!s) onExpire?.()
    })

    return () => listener.subscription.unsubscribe()
  }, [onExpire])

  const login = useCallback(async (email, password) => {
    setAuthError('')
    try {
      await apiSignIn(email, password)
      return true
    } catch (err) {
      setAuthError(err.message ?? 'Login failed.')
      return false
    }
  }, [])

  const logout = useCallback(async () => {
    await apiSignOut()
  }, [])

  return (
    <AuthContext.Provider value={{
      session,
      isAuthenticated: !!session,
      isLoading: session === undefined,
      authError,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
