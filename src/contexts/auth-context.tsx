'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string
  sessionId: string
}

interface SignupData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (userData: SignupData) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session on mount
    const sessionId = localStorage.getItem('patient-session-id')
    const email = localStorage.getItem('patient-email')
    const name = localStorage.getItem('patient-name')

    if (sessionId && email) {
      setUser({
        id: sessionId,
        email,
        name: name || email,
        sessionId
      })
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo purposes, accept any valid email/password
      if (email && password) {
        const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        const userData = {
          id: sessionId,
          email,
          name: email.split('@')[0],
          sessionId
        }
        
        localStorage.setItem('patient-session-id', sessionId)
        localStorage.setItem('patient-email', email)
        localStorage.setItem('patient-name', userData.name)
        
        setUser(userData)
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const signup = async (userData: SignupData): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const newUser = {
        id: sessionId,
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        sessionId
      }
      
      localStorage.setItem('patient-session-id', sessionId)
      localStorage.setItem('patient-email', userData.email)
      localStorage.setItem('patient-name', newUser.name)
      
      setUser(newUser)
      return true
    } catch (error) {
      console.error('Signup error:', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('patient-session-id')
    localStorage.removeItem('patient-email')
    localStorage.removeItem('patient-name')
    setUser(null)
    router.push('/auth/login')
  }

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
