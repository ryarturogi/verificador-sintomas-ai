'use client'

import { ReactNode } from 'react'
import { useScrollToTopOnMount } from '@/hooks/use-scroll-to-top'

interface ConsultationPageClientProps {
  children: ReactNode
}

export function ConsultationPageClient({ children }: ConsultationPageClientProps) {
  // Scroll to top when page loads
  useScrollToTopOnMount()

  return <>{children}</>
}
