import { useEffect } from 'react'

/**
 * Custom hook to automatically scroll to top when component mounts
 * or when dependencies change
 */
export function useScrollToTop(dependencies: unknown[] = []) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [dependencies])
}

/**
 * Custom hook to scroll to top immediately when component mounts
 */
export function useScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
}
