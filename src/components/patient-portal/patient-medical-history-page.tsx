'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { useLanguage } from '@/contexts/language-context'
import { PatientLayout } from '@/components/layout/patient-layout'
import { MedicalHistoryComponent } from './medical-history'
import { PatientSession } from '@/types/patient'
import { getPatientSession, createPatientSession } from '@/lib/patient-session'
import { createPatientDataService } from '@/lib/patient-data-service'
import { LoadingCard } from '@/components/ui/loading-spinner'
import { motion } from 'framer-motion'
import { FileText, Pill, Heart, Activity } from 'lucide-react'

export function PatientMedicalHistoryPage() {
  const { t } = useLanguage()
  const { isSignedIn, isLoaded } = useAuth()
  const [session, setSession] = useState<PatientSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const initializeSession = useCallback(async () => {
    try {
      setIsLoading(true)
      
      // No need to check isSignedIn here since we only call this when signed in

      // Use a session ID based on the current timestamp for demo purposes
      const sessionId = `session-${Date.now()}`
      let patientSession = getPatientSession(sessionId)
      
      if (!patientSession) {
        // Create a new patient session for authenticated user
        patientSession = createPatientSession(`user-${Date.now()}`)
      }

      setSession(patientSession)
      
    } catch (err) {
      console.error('Error initializing session:', err)
      setError('Failed to initialize patient portal')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        initializeSession()
      } else {
        setIsLoading(false)
      }
    }
  }, [isLoaded, isSignedIn, initializeSession])


  const handleSaveMedicalHistory = async () => {
    if (!session) return false
    
    try {
      setIsLoading(true)
      const dataService = createPatientDataService(session.sessionId)
      const success = await dataService.updateMedicalHistory()
      if (success) {
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

  // Handle authentication redirect
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn, router])

  // Show loading while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">{t.common.loading}</p>
        </div>
      </div>
    )
  }

  // Don't render anything if not authenticated
  if (!isSignedIn) {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50">
        <div className="flex">
          <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-purple-200/60 shadow-xl shadow-purple-200/20">
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
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <PatientLayout>
        {/* Main Content - Medical History Specific Layout */}
        <main className="flex-1">
          <div className="p-6 lg:p-8">
            {/* Medical History Header with Unique Styling */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-bold mb-2 flex items-center">
                      <FileText className="mr-3 h-10 w-10" />
                      {t.patientPortal.medicalHistory.title}
                    </h1>
                    <p className="text-purple-100 text-lg">{t.patientPortal.medicalHistory.subtitle}</p>
                  </div>
                  <div className="hidden md:flex space-x-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                        <Pill className="h-6 w-6" />
                      </div>
                      <span className="text-sm">Medications</span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                        <Heart className="h-6 w-6" />
                      </div>
                      <span className="text-sm">Conditions</span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                        <Activity className="h-6 w-6" />
                      </div>
                      <span className="text-sm">Allergies</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Medical History Content */}
            <MedicalHistoryComponent
              medicalHistory={session?.medicalHistory || null}
              onSave={handleSaveMedicalHistory}
              isLoading={isLoading}
            />
          </div>
        </main>
    </PatientLayout>
  )
}
