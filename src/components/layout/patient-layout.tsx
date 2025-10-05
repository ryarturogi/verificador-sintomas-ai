'use client'

import { ReactNode } from 'react'
import { Header } from '@/components/ui/header'

interface PatientLayoutProps {
  children: ReactNode
}

export function PatientLayout({ children }: PatientLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50">
      {/* Global Header */}
      <Header />
      
      {/* Patient Portal Content */}
      {children}
    </div>
  )
}