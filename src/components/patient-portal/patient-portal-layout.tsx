'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, useUser } from '@clerk/nextjs'
import { useLanguage } from '@/contexts/language-context'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { PatientNav } from './patient-nav'
// import { PatientDashboard } from './patient-dashboard'
// import { PatientProfileComponent } from './patient-profile'
// import { ConsultationHistory } from './consultation-history'
// import { MedicalHistoryComponent } from './medical-history'
import { PatientDashboardData } from '@/types/patient'
// import { getPatientSession, updatePatientProfile, updateMedicalHistory } from '@/lib/patient-session'
import { LoadingCard } from '@/components/ui/loading-spinner'
import { Header } from '@/components/ui/header'
import { useAuth as useAppAuth } from '@/contexts/auth-context'
// import { HealthcareRole, PermissionLevel } from '@/types/healthcare-professional'

export function PatientPortalLayout() {
  const { t } = useLanguage()
  const { isSignedIn, isLoaded, signOut } = useAuth()
  const { user } = useUser()
  const { user: appUser, isHealthcareProfessional, hasPermission } = useAppAuth()
  
  // Determine available views based on healthcare professional role
  const getAvailableViews = () => {
    // Healthcare professional views only
    const views = ['dashboard', 'patients', 'consultations', 'medical-tools']
    if (hasPermission('read_medical_records')) {
      views.push('medical-records')
    }
    if (hasPermission('view_analytics')) {
      views.push('analytics')
    }
    if (hasPermission('manage_other_professionals')) {
      views.push('administration')
    }
    return views
  }

  const availableViews = getAvailableViews()
  const [currentView, setCurrentView] = useState<string>(availableViews[0])
  // const [session, setSession] = useState<PatientSession | null>(null)
  const [dashboardData, setDashboardData] = useState<PatientDashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    initializeSession()
  }, [initializeSession])

  const initializeSession = useCallback(async () => {
    try {
      setIsLoading(true)
      
      // Only healthcare professionals allowed
      if (!isHealthcareProfessional) {
        setError('Access denied. This application is for healthcare professionals only.')
        return
      }

      // Initialize healthcare professional session
      // const sessionId = `healthcare-${appUser?.id}-${Date.now()}`
      
      // For healthcare professionals, we'll create a different session structure
      // const healthcareSession = {
      //   sessionId,
      //   patientId: appUser?.id || 'unknown',
      //   createdAt: new Date(),
      //   lastActivity: new Date(),
      //   expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours for healthcare professionals
      //   consultationHistory: [],
      //   userRole: appUser?.role,
      //   specialty: appUser?.specialty,
      //   institution: appUser?.institution,
      //   department: appUser?.department
      // }

        // setSession(healthcareSession as PatientSession)
      
      // Get healthcare professional dashboard data
      const dashboard = {
        recentConsultations: [],
        upcomingConsultations: [],
        healthSummary: {
          totalConsultations: 0,
          lastConsultationDate: undefined,
          activeConditions: [],
          currentMedications: 0
        },
        // Healthcare professional specific data
        patientCount: 0,
        pendingCases: 0,
        emergencyAlerts: 0,
        recentPatients: []
      }
      
      setDashboardData(dashboard as PatientDashboardData)
      
    } catch (err) {
      console.error('Error initializing session:', err)
      setError('Failed to initialize portal')
    } finally {
      setIsLoading(false)
    }
  }, [isHealthcareProfessional])

  const handleLogout = () => {
    signOut()
  }

  // const handleSaveProfile = async (profile: Partial<PatientProfile>) => {
  //   if (!session) return false
    
  //   try {
  //     setIsLoading(true)
  //     const success = await updatePatientProfile(session.sessionId, profile)
  //     if (success) {
  //       // Refresh session data
  //       const updatedSession = getPatientSession(session.sessionId)
  //       if (updatedSession) {
  //         setSession(updatedSession)
  //       }
  //     }
  //     return success
  //   } catch (err) {
  //     console.error('Error saving profile:', err)
  //     return false
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // const handleSaveMedicalHistory = async (history: Partial<MedicalHistory>) => {
  //   if (!session) return false
    
  //   try {
  //     setIsLoading(true)
  //     const success = await updateMedicalHistory(session.sessionId, history)
  //     if (success) {
  //       // Refresh session data
  //       const updatedSession = getPatientSession(session.sessionId)
  //       if (updatedSession) {
  //         setSession(updatedSession)
  //       }
  //     }
  //     return success
  //   } catch (err) {
  //     console.error('Error saving medical history:', err)
  //     return false
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const handleNavigation = (view: 'dashboard' | 'profile' | 'consultations' | 'medical-history') => {
    setCurrentView(view)
  }

  // Handle authentication redirect
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn, router])

  // Show loading while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">{t.common.loading}</p>
        </div>
      </div>
    )
  }

  // Don't render anything if not authenticated (redirect will happen)
  if (!isSignedIn) {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50">
        {/* Global Header */}
        <Header />
        
        <div className="flex">
          <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-cyan-200/60 shadow-xl shadow-cyan-200/20">
            <div className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
          <div className="flex-1 p-8">
            <LoadingCard title={t.patientPortal.loading} />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-xl text-gray-900 mb-4">{t.common.error}</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50">
        {/* Global Header */}
        <Header />
        
        <div className="flex">
          {/* Navigation */}
          <PatientNav 
            patientName={user?.fullName || user?.firstName || ''}
            onLogout={handleLogout}
            isHealthcareProfessional={true}
            userRole={appUser?.role}
            availableViews={availableViews}
            currentView={currentView}
            onNavigate={handleNavigation}
          />

          {/* Main Content */}
          <main className="flex-1 lg:ml-0">
            <div className="p-6 lg:p-8">
              {/* Healthcare Professional Views Only */}
              {currentView === 'dashboard' && dashboardData && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {t.healthcare.dashboard.title}
                    </h2>
                    <p className="text-gray-600 mb-6">{t.healthcare.dashboard.subtitle}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-blue-900">{t.healthcare.roles[appUser?.role as keyof typeof t.healthcare.roles] || 'Role'}</h3>
                        <p className="text-blue-700 capitalize">{appUser?.role}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-green-900">Specialty</h3>
                        <p className="text-green-700">{appUser?.specialty || t.common.notSpecified}</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-purple-900">Institution</h3>
                        <p className="text-purple-700">{appUser?.institution || t.common.notSpecified}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentView === 'patients' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.healthcare.patients.title}</h2>
                  <p className="text-gray-600">{t.healthcare.patients.subtitle}</p>
                </div>
              )}

              {currentView === 'consultations' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.healthcare.consultations.title}</h2>
                  <p className="text-gray-600">{t.healthcare.consultations.subtitle}</p>
                </div>
              )}

              {currentView === 'medical-tools' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.healthcare.medicalTools.title}</h2>
                  <p className="text-gray-600">{t.healthcare.medicalTools.subtitle}</p>
                </div>
              )}

              {currentView === 'medical-records' && hasPermission('read_medical_records') && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.healthcare.medicalRecords.title}</h2>
                  <p className="text-gray-600">{t.healthcare.medicalRecords.subtitle}</p>
                </div>
              )}

              {currentView === 'analytics' && hasPermission('view_analytics') && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.healthcare.analytics.title}</h2>
                  <p className="text-gray-600">{t.healthcare.analytics.subtitle}</p>
                </div>
              )}

              {currentView === 'administration' && hasPermission('manage_other_professionals') && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.healthcare.administration.title}</h2>
                  <p className="text-gray-600">{t.healthcare.administration.subtitle}</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
