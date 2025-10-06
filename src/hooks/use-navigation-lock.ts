'use client'

import { useEffect, useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

interface UseNavigationLockProps {
  isLocked: boolean
  onBeforeUnload?: () => void
  onNavigationAttempt?: () => void
}

/**
 * Hook to prevent navigation when a consultation is active
 * Shows confirmation dialog before allowing navigation
 */
export function useNavigationLock({
  isLocked,
  onBeforeUnload,
  onNavigationAttempt
}: UseNavigationLockProps) {
  const router = useRouter()
  const isNavigatingRef = useRef(false)

  // Handle browser back/forward buttons
  useEffect(() => {
    if (!isLocked) return

    const handlePopState = (event: PopStateEvent) => {
      if (isNavigatingRef.current) {
        isNavigatingRef.current = false
        return
      }

      event.preventDefault()
      onNavigationAttempt?.()
    }

    // Add a dummy state to prevent immediate back navigation
    window.history.pushState(null, '', window.location.href)
    
    window.addEventListener('popstate', handlePopState)
    
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [isLocked, onNavigationAttempt])

  // Handle browser refresh/close
  useEffect(() => {
    if (!isLocked) return

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      onBeforeUnload?.()
      
      // Standard way to show confirmation dialog
      event.preventDefault()
      event.returnValue = ''
      
      return ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isLocked, onBeforeUnload])

  // Intercept programmatic navigation
  const navigateWithConfirmation = useCallback((url: string) => {
    if (!isLocked) {
      isNavigatingRef.current = true
      router.push(url)
      return
    }

    onNavigationAttempt?.()
  }, [isLocked, router, onNavigationAttempt])

  // Force navigation (used after confirmation)
  const forceNavigate = useCallback((url: string) => {
    isNavigatingRef.current = true
    router.push(url)
  }, [router])

  return {
    navigateWithConfirmation,
    forceNavigate,
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

  const { navigateWithConfirmation, forceNavigate } = useNavigationLock({
    isLocked: isActive,
    onNavigationAttempt: handleNavigationAttempt,
    onBeforeUnload: handleNavigationAttempt
  })

  return {
    showDialog,
    handleConfirmExit,
    handleCancelExit,
    navigateWithConfirmation,
    forceNavigate
  }
}
