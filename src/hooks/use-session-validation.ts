/**
 * Session Validation Hook (Simplified for Clerk)
 * With Clerk, sessions are automatically managed, so this is mostly a compatibility layer
 */

import { useAuth } from '@/contexts/auth-context'


export function useSessionValidation() {
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
