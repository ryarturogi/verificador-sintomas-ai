/**
 * Clear Session Utility
 * Helper function to clear all authentication data
 */

export function clearAllSessionData() {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return

  // Clear localStorage
  localStorage.removeItem('patient-session-id')
  localStorage.removeItem('patient-email')
  localStorage.removeItem('patient-name')
  localStorage.removeItem('patient-remember-me')
  localStorage.removeItem('patient-session-expiry')
  
  // Clear cookies (only if document is available)
  if (typeof document !== 'undefined') {
    document.cookie = 'patient-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict'
    document.cookie = 'session-id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict'
  }
  
  console.log('All session data cleared')
}

// Make it available globally for debugging
if (typeof window !== 'undefined') {
  (window as { clearSession?: () => void }).clearSession = clearAllSessionData
}
