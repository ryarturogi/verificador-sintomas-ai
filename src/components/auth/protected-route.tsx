/**
 * Protected Route Component
 * Wraps components that require authentication using Clerk
 */

'use client'

import { ReactNode, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

interface ProtectedRouteProps {
  children: ReactNode
  fallback?: ReactNode
  redirectTo?: string
  requireAuth?: boolean
}

export function ProtectedRoute({ 
  children, 
  fallback,
  redirectTo = '/sign-in',
  requireAuth = true 
}: ProtectedRouteProps) {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && requireAuth && !isSignedIn) {
      router.push(redirectTo)
    }
  }, [isSignedIn, isLoaded, router, redirectTo, requireAuth])

  // Show loading spinner while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isSignedIn) {
    if (fallback) {
      return <>{fallback}</>
    }
    
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-600 mb-4">
            Please log in to access this page.
          </p>
          <a 
            href={redirectTo}
            className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  // If user is authenticated or authentication is not required, render children
  return <>{children}</>
}
