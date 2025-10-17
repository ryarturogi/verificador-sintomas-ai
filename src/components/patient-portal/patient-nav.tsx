'use client'

import { useState } from 'react'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
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
// import { PatientPortalNavItem } from '@/types/patient'

interface PatientNavProps {
  patientName?: string
  onLogout?: () => void
  isHealthcareProfessional?: boolean
  userRole?: string
  availableViews?: string[]
  currentView?: string
  onNavigate?: (view: string) => void
}

// const getNavigationItems = (t: ReturnType<typeof useLanguage>['t']): PatientPortalNavItem[] => [
//   {
//     id: 'dashboard',
//     label: t.patientPortal.nav.dashboard,
//     href: '/patient-portal',
//     icon: 'LayoutDashboard',
//     description: t.patientPortal.nav.dashboardDescription,
//     color: 'cyan',
//     gradient: 'from-cyan-50 to-blue-50',
//     borderColor: 'border-cyan-500',
//     textColor: 'text-cyan-700',
//     iconColor: 'text-cyan-600',
//     badge: 3 // Example: 3 new updates
//   },
//   {
//     id: 'profile',
//     label: t.patientPortal.nav.profile,
//     href: '/patient-portal/profile',
//     icon: 'User',
//     description: t.patientPortal.nav.profileDescription,
//     color: 'blue',
//     gradient: 'from-blue-50 to-indigo-50',
//     borderColor: 'border-blue-500',
//     textColor: 'text-blue-700',
//     iconColor: 'text-blue-600'
//   },
//   {
//     id: 'consultations',
//     label: t.patientPortal.nav.consultations,
//     href: '/patient-portal/consultations',
//     icon: 'MessageSquare',
//     description: t.patientPortal.nav.consultationsDescription,
//     color: 'green',
//     gradient: 'from-green-50 to-emerald-50',
//     borderColor: 'border-green-500',
//     textColor: 'text-green-700',
//     iconColor: 'text-green-600',
//     badge: 1 // Example: 1 new consultation
//   },
//   {
//     id: 'medical-history',
//     label: t.patientPortal.nav.medicalHistory,
//     href: '/patient-portal/medical-history',
//     icon: 'FileText',
//     description: t.patientPortal.nav.medicalHistoryDescription,
//     color: 'purple',
//     gradient: 'from-purple-50 to-violet-50',
//     borderColor: 'border-purple-500',
//     textColor: 'text-purple-700',
//     iconColor: 'text-purple-600'
//   }
// ]

export function PatientNav({ 
  patientName, 
  onLogout, 
  // isHealthcareProfessional = false, 
  // userRole, 
  availableViews = [], 
  currentView, 
  onNavigate 
}: PatientNavProps) {
  const { t } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // const pathname = usePathname()
  
  // Get navigation items for healthcare professionals only
  const getNavigationItemsForUser = () => {
    return [
      {
        id: 'dashboard',
        label: t.healthcare.nav.dashboard,
        href: '/patient-portal',
        icon: 'LayoutDashboard',
        description: t.healthcare.dashboard.overview,
        color: 'cyan',
        gradient: 'from-cyan-50 to-blue-50',
        borderColor: 'border-cyan-500',
        textColor: 'text-cyan-700',
        iconColor: 'text-cyan-600'
      },
      {
        id: 'patients',
        label: t.healthcare.nav.patients,
        href: '/patient-portal/patients',
        icon: 'User',
        description: t.healthcare.patients.subtitle,
        color: 'blue',
        gradient: 'from-blue-50 to-indigo-50',
        borderColor: 'border-blue-500',
        textColor: 'text-blue-700',
        iconColor: 'text-blue-600'
      },
      {
        id: 'consultations',
        label: t.healthcare.nav.consultations,
        href: '/patient-portal/consultations',
        icon: 'MessageSquare',
        description: t.healthcare.consultations.subtitle,
        color: 'green',
        gradient: 'from-green-50 to-emerald-50',
        borderColor: 'border-green-500',
        textColor: 'text-green-700',
        iconColor: 'text-green-600'
      },
      {
        id: 'medical-tools',
        label: t.healthcare.nav.medicalTools,
        href: '/patient-portal/medical-tools',
        icon: 'FileText',
        description: t.healthcare.medicalTools.subtitle,
        color: 'purple',
        gradient: 'from-purple-50 to-violet-50',
        borderColor: 'border-purple-500',
        textColor: 'text-purple-700',
        iconColor: 'text-purple-600'
      }
    ].filter(item => availableViews.includes(item.id))
  }
  
  const navigationItems = getNavigationItemsForUser()

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
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white shadow-lg"
        >
          {isMobileMenuOpen ? <X className="icon-sm" /> : <Menu className="icon-sm" />}
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
        "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white/80 backdrop-blur-sm border-r border-cyan-200/60 shadow-xl shadow-cyan-200/20 z-40 transform transition-transform duration-300 ease-in-out",
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
              const isActive = currentView === item.id
              
              const handleClick = () => {
                setIsMobileMenuOpen(false)
                if (onNavigate) {
                  onNavigate(item.id)
                }
              }
              
              return (
                <button
                  key={item.id}
                  onClick={handleClick}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-300 group w-full text-left",
                    "hover:shadow-lg focus:outline-none hover:-translate-y-1",
                    isActive 
                      ? `bg-gradient-to-r ${item.gradient} ${item.textColor} border-r-4 ${item.borderColor} shadow-lg` 
                      : `text-slate-700 hover:text-slate-900 hover:bg-${item.color}-50/80 hover:shadow-md hover:shadow-${item.color}-200/20`
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-all duration-300 relative",
                    isActive 
                      ? `bg-${item.color}-100 ${item.iconColor}` 
                      : `text-slate-500 group-hover:bg-${item.color}-100 group-hover:${item.iconColor}`
                  )}>
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {/* Unique indicator for each section */}
                    {item.id === 'dashboard' && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                    )}
                    {item.id === 'consultations' && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm font-semibold truncate transition-colors duration-200",
                      isActive ? item.textColor : "text-slate-700 group-hover:text-slate-900"
                    )}>
                      {item.label}
                    </p>
                    {item.description && (
                      <p className={cn(
                        "text-xs truncate transition-colors duration-200",
                        isActive ? "text-slate-600" : "text-gray-500 group-hover:text-gray-600"
                      )}>
                        {item.description}
                      </p>
                    )}
                    {/* Unique status indicators */}
                    {item.id === 'profile' && (
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-blue-600 font-medium">Complete</span>
                      </div>
                    )}
                    {item.id === 'medical-history' && (
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        <span className="text-xs text-purple-600 font-medium">Updated</span>
                      </div>
                    )}
                  </div>
                </button>
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
              <LogOut className="icon-sm mr-3" />
{t.healthcare.nav.signOut}
            </Button>
          </div>
        </div>
      </nav>

      {/* Main content spacer for desktop */}
      <div className="hidden lg:block w-64 flex-shrink-0" />
    </>
  )
}
