import { useState, useCallback } from 'react'

const ADMIN_PASSWORD = 'clarence2024'

export function useAdmin() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginError, setLoginError] = useState(false)

  const openAdmin = useCallback(() => setIsOpen(true), [])
  const closeAdmin = useCallback(() => setIsOpen(false), [])

  const login = useCallback((password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setLoginError(false)
      return true
    }
    setLoginError(true)
    return false
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setLoginError(false)
    setIsOpen(false)
  }, [])

  return { isOpen, isAuthenticated, loginError, openAdmin, closeAdmin, login, logout }
}
