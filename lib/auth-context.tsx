'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

interface User {
  telegramUserId: number
  telegramUsername: string
  telegramFirstName: string
  loggedAt: number
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (code: string) => Promise<{ ok: boolean; error?: string }>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

function getSessionId(): string | null {
  if (typeof window === 'undefined') return null
  const match = document.cookie.match(/itshopping_session=([^;]+)/)
  return match ? match[1] : null
}

function setSessionId(id: string) {
  document.cookie = `itshopping_session=${id}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`
}

function clearSessionId() {
  document.cookie = 'itshopping_session=; path=/; max-age=0'
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    const sid = getSessionId()
    if (!sid) {
      setUser(null)
      setLoading(false)
      return
    }
    try {
      const res = await fetch('/api/auth/me', { headers: { 'x-session-id': sid } })
      const data = await res.json()
      if (data.user) {
        setUser(data.user)
      } else {
        clearSessionId()
        setUser(null)
      }
    } catch {
      setUser(null)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const login = useCallback(async (code: string) => {
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()
      if (data.ok && data.sessionId) {
        setSessionId(data.sessionId)
        setUser(data.user)
        return { ok: true }
      }
      return { ok: false, error: data.error || 'Noto\'g\'ri kod' }
    } catch {
      return { ok: false, error: 'Xatolik yuz berdi' }
    }
  }, [])

  const logout = useCallback(async () => {
    const sid = getSessionId()
    if (sid) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sid }),
      }).catch(() => {})
    }
    clearSessionId()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
