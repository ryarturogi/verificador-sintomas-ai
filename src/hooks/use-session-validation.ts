/**
 * Session Validation Hook (Simplified for Clerk)
 * With Clerk, sessions are automatically managed, so this is mostly a compatibility layer
 */

import { useAuth } from '@/contexts/auth-context'

interface UseSessionValidationOptions {
  redirectOnExpiry?: string
  refreshInterval?: number // in milliseconds (unused with Clerk)
  autoRefresh?: boolean // unused with Clerk
}

export function useSessionValidation(options: UseSessionValidationOptions = {}) {
  const { isAuthenticated } = useAuth()

  // With Clerk, sessions are automatically validated and refreshed
  // This hook is now mainly for compatibility with existing code
  const validateSession = async () => {
    // Clerk handles session validation automatically
    return isAuthenticated
  }

  return {
    validateSession,
    isSessionValid: isAuthenticated
  }
}
