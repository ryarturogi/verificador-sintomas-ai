'use client'

import { ReactNode } from 'react'
import { Header } from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'

interface GlobalLayoutProps {
  children: ReactNode
  showHeader?: boolean
  showFooter?: boolean
  headerProps?: {
    showBackButton?: boolean
    backButtonText?: string
    onBackClick?: () => void
    className?: string
  }
}

export function GlobalLayout({ 
  children, 
  showHeader = true, 
  showFooter = true,
  headerProps = {}
}: GlobalLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Global Header */}
      {showHeader && <Header {...headerProps} />}
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Global Footer */}
      {showFooter && <Footer />}
    </div>
  )
}

// Specialized layout variants

export function PageLayout({ 
  children, 
  headerProps = {} 
}: { 
  children: ReactNode
  headerProps?: {
    showBackButton?: boolean
    backButtonText?: string
    onBackClick?: () => void
    className?: string
  }
}) {
  return (
    <GlobalLayout 
      showHeader={true} 
      showFooter={true}
      headerProps={headerProps}
    >
      {children}
    </GlobalLayout>
  )
}

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <GlobalLayout showHeader={true} showFooter={false}>
      {children}
    </GlobalLayout>
  )
}
