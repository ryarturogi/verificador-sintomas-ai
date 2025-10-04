'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/language-context'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  User, 
  MessageSquare, 
  FileText, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { PatientPortalNavItem } from '@/types/patient'

interface PatientNavProps {
  patientName?: string
  onLogout?: () => void
}

const getNavigationItems = (t: any): PatientPortalNavItem[] => [
  {
    id: 'dashboard',
    label: t.patientPortal.nav.dashboard,
    href: '/patient-portal',
    icon: 'LayoutDashboard',
    description: t.patientPortal.nav.dashboardDescription
  },
  {
    id: 'profile',
    label: t.patientPortal.nav.profile,
    href: '/patient-portal/profile',
    icon: 'User',
    description: t.patientPortal.nav.profileDescription
  },
  {
    id: 'consultations',
    label: t.patientPortal.nav.consultations,
    href: '/patient-portal/consultations',
    icon: 'MessageSquare',
    description: t.patientPortal.nav.consultationsDescription
  },
  {
    id: 'medical-history',
    label: t.patientPortal.nav.medicalHistory,
    href: '/patient-portal/medical-history',
    icon: 'FileText',
    description: t.patientPortal.nav.medicalHistoryDescription
  }
]

export function PatientNav({ patientName, onLogout }: PatientNavProps) {
  const { t } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const navigationItems = getNavigationItems(t)

  const getIcon = (iconName: string) => {
    const icons = {
      LayoutDashboard,
      User,
      MessageSquare,
      FileText,
      Settings
    }
    return icons[iconName as keyof typeof icons] || LayoutDashboard
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white shadow-lg"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Navigation */}
      <nav className={cn(
        "fixed left-0 top-0 h-full w-64 bg-white/80 backdrop-blur-sm border-r border-cyan-200/60 shadow-xl shadow-cyan-200/20 z-50 transform transition-transform duration-300 ease-in-out",
        "lg:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-cyan-200/60">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full flex items-center justify-center shadow-lg shadow-cyan-200/30">
                <span className="text-lg font-bold text-cyan-600">
                  {patientName ? patientName.charAt(0).toUpperCase() : 'P'}
                </span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {t.patientPortal.nav.title}
                </h2>
                {patientName && (
                  <p className="text-sm text-slate-600">{t.patientPortal.nav.welcome}, {patientName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = getIcon(item.icon)
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                    "hover:bg-cyan-50/80 focus:bg-cyan-50/80 focus:outline-none hover:shadow-md hover:shadow-cyan-200/20",
                    isActive 
                      ? "bg-gradient-to-r from-cyan-50 to-teal-50 text-cyan-700 border-r-2 border-cyan-600 shadow-md shadow-cyan-200/20" 
                      : "text-slate-700 hover:text-slate-900"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.label}</p>
                    {item.description && (
                      <p className="text-xs text-gray-500 truncate">
                        {item.description}
                      </p>
                    )}
                  </div>
                  {item.badge && (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-cyan-200/60">
            <Button
              variant="ghost"
              onClick={onLogout}
              className="w-full justify-start text-slate-700 hover:text-red-700 hover:bg-red-50/80 transition-all duration-200"
            >
              <LogOut className="h-4 w-4 mr-3" />
              {t.patientPortal.nav.signOut}
            </Button>
          </div>
        </div>
      </nav>

      {/* Main content spacer for desktop */}
      <div className="hidden lg:block w-64 flex-shrink-0" />
    </>
  )
}
