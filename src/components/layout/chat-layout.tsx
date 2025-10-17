'use client'

import { ReactNode } from 'react'
import { Header } from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'

interface ChatLayoutProps {
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

/**
 * Fullscreen chat layout that maximizes the chat interface
 * between header and footer, similar to ChatGPT's interface
 */
export function ChatLayout({ 
  children, 
  showHeader = true, 
  showFooter = true,
  headerProps = {}
}: ChatLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Global Header */}
      {showHeader && <Header {...headerProps} />}
      
      {/* Chat Content - normal flex layout */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      
      {/* Global Footer */}
      {showFooter && <Footer />}
    </div>
  )
}
