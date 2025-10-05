'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useAuth as useClerkAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  logout: () => Promise<void>
  isAuthenticated: boolean
  refreshSession: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isSignedIn, isLoaded, signOut } = useClerkAuth()
  const { user: clerkUser } = useUser()
  const router = useRouter()

  const user: User | null = clerkUser ? {
    id: clerkUser.id,
    email: clerkUser.primaryEmailAddress?.emailAddress || '',
    name: clerkUser.fullName || clerkUser.firstName || ''
  } : null

  const logout = async () => {
    await signOut()
    router.push('/')
  }

  const refreshSession = async (): Promise<boolean> => {
    // With Clerk, sessions are automatically managed
    // Just return true if user is signed in
    return isSignedIn || false
  }

  const value = {
    user,
    isLoading: !isLoaded,
    logout,
    isAuthenticated: isSignedIn || false,
    refreshSession
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
