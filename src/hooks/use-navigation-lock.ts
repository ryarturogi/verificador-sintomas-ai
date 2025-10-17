'use client'

import { useEffect, useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

interface UseNavigationLockProps {
  isLocked: boolean
  onNavigationAttempt?: () => void
}

/**
 * Hook to prevent navigation when a consultation is active
 * Handles: browser refresh, browser close, back/forward buttons, programmatic navigation
 */
export function useNavigationLock({
  isLocked,
  onNavigationAttempt
}: UseNavigationLockProps) {
  const router = useRouter()
  const isNavigatingRef = useRef(false)
  const isDialogShownRef = useRef(false)

  // Handle browser refresh, close, and navigation
  useEffect(() => {
    if (!isLocked) return

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Show our custom dialog for refresh/close attempts
      if (!isDialogShownRef.current) {
        isDialogShownRef.current = true
        onNavigationAttempt?.()
      }
      
      // Always prevent the default browser dialog
      event.preventDefault()
      event.returnValue = ''
      
      return ''
    }

    // Handle browser back/forward buttons
    const handlePopState = (event: PopStateEvent) => {
      if (isNavigatingRef.current) {
        isNavigatingRef.current = false
        return
      }

      // Show our custom dialog for back/forward attempts
      if (!isDialogShownRef.current) {
        isDialogShownRef.current = true
        onNavigationAttempt?.()
      }

      // Prevent the navigation
      event.preventDefault()
      
      // Push the current state back to prevent navigation
      window.history.pushState(null, '', window.location.href)
    }

    // Add a dummy state to prevent immediate back navigation
    window.history.pushState(null, '', window.location.href)
    
    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handlePopState)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [isLocked, onNavigationAttempt])

  // Reset dialog state when lock is disabled
  useEffect(() => {
    if (!isLocked) {
      isDialogShownRef.current = false
    }
  }, [isLocked])

  // Intercept programmatic navigation
  const navigateWithConfirmation = useCallback((url: string) => {
    if (!isLocked) {
      isNavigatingRef.current = true
      router.push(url)
      return
    }

    // Show our custom dialog for programmatic navigation
    if (!isDialogShownRef.current) {
      isDialogShownRef.current = true
      onNavigationAttempt?.()
    }
  }, [isLocked, router, onNavigationAttempt])

  // Force navigation (used after confirmation)
  const forceNavigate = useCallback((url: string) => {
    isNavigatingRef.current = true
    isDialogShownRef.current = false
    router.push(url)
  }, [router])

  // Reset dialog state (called when dialog is closed)
  const resetDialogState = useCallback(() => {
    isDialogShownRef.current = false
  }, [])

  return {
    navigateWithConfirmation,
    forceNavigate,
    resetDialogState,
    isLocked
  }
}

/**
 * Hook to detect navigation attempts and show confirmation
 */
export function useNavigationConfirmation({
  isActive,
  onConfirmExit,
  onCancelExit
}: {
  isActive: boolean
  onConfirmExit: () => void
  onCancelExit: () => void
}) {
  const [showDialog, setShowDialog] = useState(false)

  const handleNavigationAttempt = useCallback(() => {
    setShowDialog(true)
  }, [])

  const handleConfirmExit = useCallback(() => {
    setShowDialog(false)
    onConfirmExit()
  }, [onConfirmExit])

  const handleCancelExit = useCallback(() => {
    setShowDialog(false)
    onCancelExit()
  }, [onCancelExit])

  const { navigateWithConfirmation, forceNavigate, resetDialogState } = useNavigationLock({
    isLocked: isActive,
    onNavigationAttempt: handleNavigationAttempt
  })

  // Reset dialog state when dialog is closed
  useEffect(() => {
    if (!showDialog) {
      resetDialogState()
    }
  }, [showDialog, resetDialogState])

  return {
    showDialog,
    handleConfirmExit,
    handleCancelExit,
    navigateWithConfirmation,
    forceNavigate
  }
}
