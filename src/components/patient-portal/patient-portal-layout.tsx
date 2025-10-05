'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, useUser } from '@clerk/nextjs'
import { useLanguage } from '@/contexts/language-context'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { PatientNav } from './patient-nav'
import { PatientDashboard } from './patient-dashboard'
import { PatientProfileComponent } from './patient-profile'
import { ConsultationHistory } from './consultation-history'
import { MedicalHistoryComponent } from './medical-history'
import { PatientSession, PatientProfile, MedicalHistory, PatientDashboardData } from '@/types/patient'
import { getPatientSession, getPatientDashboardData, updatePatientProfile, updateMedicalHistory } from '@/lib/patient-session'
import { LoadingCard } from '@/components/ui/loading-spinner'
import { Header } from '@/components/ui/header'

export function PatientPortalLayout() {
  const { t } = useLanguage()
  const { isSignedIn, isLoaded, signOut } = useAuth()
  const { user } = useUser()
  const [currentView, setCurrentView] = useState<'dashboard' | 'profile' | 'consultations' | 'medical-history'>('dashboard')
  const [session, setSession] = useState<PatientSession | null>(null)
  const [dashboardData, setDashboardData] = useState<PatientDashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    initializeSession()
  }, [])

  const initializeSession = async () => {
    try {
      setIsLoading(true)
      
      // In a real app, you'd get the session ID from cookies or authentication
      // For demo purposes, we'll create a new session
      const sessionId = 'demo-session-' + Date.now()
      
      // Check if session exists, if not create one
      let patientSession = getPatientSession(sessionId)
      if (!patientSession) {
        // Create a new patient session
        patientSession = {
          sessionId,
          patientId: 'patient-' + Date.now(),
          createdAt: new Date(),
          lastActivity: new Date(),
          expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
          consultationHistory: []
        }
      }

      setSession(patientSession)
      
      // Get dashboard data
      const dashboard = getPatientDashboardData(sessionId)
      setDashboardData(dashboard || {
        recentConsultations: [],
        upcomingConsultations: [],
        healthSummary: {
          totalConsultations: 0,
          lastConsultationDate: undefined,
          activeConditions: [],
          currentMedications: 0
        }
      })
      
    } catch (err) {
      console.error('Error initializing session:', err)
      setError('Failed to initialize patient portal')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    signOut()
  }

  const handleSaveProfile = async (profile: Partial<PatientProfile>) => {
    if (!session) return false
    
    try {
      setIsLoading(true)
      const success = await updatePatientProfile(session.sessionId, profile)
      if (success) {
        // Refresh session data
        const updatedSession = getPatientSession(session.sessionId)
        if (updatedSession) {
          setSession(updatedSession)
        }
      }
      return success
    } catch (err) {
      console.error('Error saving profile:', err)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveMedicalHistory = async (history: Partial<MedicalHistory>) => {
    if (!session) return false
    
    try {
      setIsLoading(true)
      const success = await updateMedicalHistory(session.sessionId, history)
      if (success) {
        // Refresh session data
        const updatedSession = getPatientSession(session.sessionId)
        if (updatedSession) {
          setSession(updatedSession)
        }
      }
      return success
    } catch (err) {
      console.error('Error saving medical history:', err)
      return false
    } finally {
      setIsLoading(false)
    }
  }

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
          />

          {/* Main Content */}
          <main className="flex-1 lg:ml-0">
            <div className="p-6 lg:p-8">
              {currentView === 'dashboard' && dashboardData && (
                <PatientDashboard
                  dashboardData={dashboardData}
                  onViewConsultations={() => handleNavigation('consultations')}
                  onViewProfile={() => handleNavigation('profile')}
                  onViewMedicalHistory={() => handleNavigation('medical-history')}
                />
              )}

              {currentView === 'profile' && (
                <PatientProfileComponent
                  profile={session?.profile || null}
                  onSave={handleSaveProfile}
                  isLoading={isLoading}
                />
              )}

              {currentView === 'consultations' && (
                <ConsultationHistory
                  consultations={[]} // This would be populated from your consultation system
                  onViewConsultation={(consultation) => {
                    // Handle viewing a specific consultation
                    console.log('View consultation:', consultation)
                  }}
                  onStartNewConsultation={() => {
                    // Redirect to consultation page
                    window.location.href = '/consultation'
                  }}
                  isLoading={isLoading}
                />
              )}

              {currentView === 'medical-history' && (
                <MedicalHistoryComponent
                  medicalHistory={session?.medicalHistory || null}
                  onSave={handleSaveMedicalHistory}
                  isLoading={isLoading}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
