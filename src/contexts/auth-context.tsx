'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useAuth as useClerkAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { HealthcareRole, PermissionLevel, ROLE_PERMISSIONS } from '@/types/healthcare-professional'

interface ClerkUser {
  id: string
  fullName?: string | null
  firstName?: string | null
  primaryEmailAddress?: {
    emailAddress: string
  } | null
  publicMetadata?: {
    role?: HealthcareRole
    specialty?: string
    institution?: string
    department?: string
  }
}

interface User {
  id: string
  email: string
  name: string
  role?: HealthcareRole
  specialty?: string
  permissions?: PermissionLevel[]
  institution?: string
  department?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  logout: () => Promise<void>
  isAuthenticated: boolean
  refreshSession: () => Promise<boolean>
  hasPermission: (permission: PermissionLevel) => boolean
  isHealthcareProfessional: boolean
  getDashboardRoute: () => string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isSignedIn, isLoaded, signOut } = useClerkAuth()
  const { user: clerkUser } = useUser()
  const router = useRouter()

  // Extract healthcare professional data from Clerk user
  const extractHealthcareUser = (clerkUser: ClerkUser | null): User | null => {
    if (!clerkUser) return null

    const publicMetadata = clerkUser.publicMetadata || {}
    const role = publicMetadata.role as HealthcareRole
    
    // Only allow healthcare professionals - reject all others
    const isHealthcareProfessional = role && ['doctor', 'nurse', 'medical_staff', 'specialist', 'administrator'].includes(role)
    
    if (!isHealthcareProfessional) {
      // Not a healthcare professional - deny access
      return null
    }

    // Healthcare professional
    const permissions = ROLE_PERMISSIONS[role] || []
    
    return {
      id: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress || '',
      name: clerkUser.fullName || clerkUser.firstName || '',
      role,
      specialty: publicMetadata.specialty as string,
      permissions,
      institution: publicMetadata.institution as string,
      department: publicMetadata.department as string
    }
  }

  const user: User | null = extractHealthcareUser(clerkUser || null)

  const logout = async () => {
    await signOut()
    router.push('/')
  }

  const refreshSession = async (): Promise<boolean> => {
    // With Clerk, sessions are automatically managed
    // Just return true if user is signed in
    return isSignedIn || false
  }

  const hasPermission = (permission: PermissionLevel): boolean => {
    if (!user?.permissions) return false
    return user.permissions.includes(permission)
  }

  const isHealthcareProfessional = Boolean(user?.role && ['doctor', 'nurse', 'medical_staff', 'specialist', 'administrator'].includes(user.role))

  const getDashboardRoute = (): string => {
    if (!user?.role) return '/'
    
    switch (user.role) {
      case 'doctor':
      case 'specialist':
        return '/healthcare/doctor-dashboard'
      case 'nurse':
        return '/healthcare/nurse-dashboard'
      case 'medical_staff':
        return '/healthcare/staff-dashboard'
      case 'administrator':
        return '/healthcare/admin-dashboard'
      default:
        return '/healthcare/dashboard'
    }
  }

  const value = {
    user,
    isLoading: !isLoaded,
    logout,
    isAuthenticated: isSignedIn || false,
    refreshSession,
    hasPermission,
    isHealthcareProfessional,
    getDashboardRoute
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
