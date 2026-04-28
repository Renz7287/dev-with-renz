import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { signIn as apiSignIn, signOut as apiSignOut } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined) // undefined = loading
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  const login = async (email, password) => {
    setAuthError('')
    try {
      await apiSignIn(email, password)
      return true
    } catch (err) {
      setAuthError(err.message ?? 'Login failed.')
      return false
    }
  }

  const logout = async () => {
    await apiSignOut()
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: !!session,
        isLoading: session === undefined,
        authError,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
