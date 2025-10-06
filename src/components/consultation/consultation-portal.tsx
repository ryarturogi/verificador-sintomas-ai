'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/language-context'
import { DoctorSelection } from './doctor-selection'
import { ChatConsultation } from './chat-consultation'
import { ConsultationHistory } from './consultation-history'
import { Doctor, ConsultationSession } from '@/types/consultation'
import { ConsultationHistoryService } from '@/services/consultation-history-service'
import { ConsultationExitDialog } from '@/components/ui/confirmation-dialog'
import { useNavigationConfirmation } from '@/hooks/use-navigation-lock'
import { useScrollToTop } from '@/hooks/use-scroll-to-top'

/**
 * Main consultation portal component that manages the consultation flow
 * Handles doctor selection, chat consultation, and consultation history
 */
export function ConsultationPortal() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const [currentSession, setCurrentSession] = useState<ConsultationSession | null>(null)
  const [showHistory, setShowHistory] = useState(false)
  const [preSelectedAgent, setPreSelectedAgent] = useState<string | null>(null)
  const [isExiting, setIsExiting] = useState(false)

  // Navigation lock for active consultations
  const {
    showDialog,
    handleConfirmExit,
    handleCancelExit
  } = useNavigationConfirmation({
    isActive: !!currentSession,
    onConfirmExit: () => {
      handleEndConsultation()
      setIsExiting(false)
    },
    onCancelExit: () => {
      setIsExiting(false)
    }
  })

  // Handle agent parameter from URL
  useEffect(() => {
    const agentParam = searchParams.get('agent')
    if (agentParam) {
      setPreSelectedAgent(agentParam)
    }
  }, [searchParams])

  // Scroll to top when component mounts or when session changes
  useScrollToTop([currentSession, showHistory])

  const handleDoctorSelect = (doctor: Doctor) => {
    // Auto-start consultation immediately when doctor is selected
    const session: ConsultationSession = {
      id: `session-${Date.now()}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      startTime: new Date(),
      messages: [],
      status: 'active'
    }
    
    // Save the session to history
    ConsultationHistoryService.saveSession(session)
    setCurrentSession(session)
    setShowHistory(false)
  }


  const handleEndConsultation = () => {
    // Complete the session before ending
    if (currentSession) {
      ConsultationHistoryService.completeSession(
        currentSession.id,
        `Consultation completed with ${currentSession.doctorName}`,
        ['Follow up as needed', 'Monitor symptoms', 'Contact healthcare provider if concerns arise']
      )
    }
    
    setCurrentSession(null)
    setIsExiting(false)
  }

  const handleShowHistory = () => {
    setShowHistory(true)
    setCurrentSession(null)
  }

  const handleBackToSelection = () => {
    if (currentSession) {
      setIsExiting(true)
      return
    }
    
    setCurrentSession(null)
    setShowHistory(false)
  }

  // Navigation is handled by the hook automatically

  return (
    <div className="flex flex-col min-h-full">
      {/* Show header and navigation only when not in active chat */}
      <AnimatePresence>
        {!currentSession && (
          <motion.div
            key="header-section"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-gradient-to-br from-cyan-50 to-cyan-100 flex-shrink-0"
          >
            <div className="container mx-auto px-4 py-8">
              {/* Header */}
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {t.consultation?.title || 'Free AI Doctor Consultation'}
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {t.consultation?.subtitle || 'Get expert medical advice from AI agents specialized in different medical fields'}
                </p>
                <motion.div 
                  className="mt-4 p-4 bg-cyan-50 rounded-lg max-w-2xl mx-auto"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <p className="text-sm text-cyan-800">
                    <strong>Note:</strong> All doctors are AI agents with specialized medical knowledge. 
                    This is not a replacement for professional medical care.
                  </p>
                </motion.div>
              </motion.div>

              {/* Navigation */}
              <motion.div 
                className="flex justify-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <nav className="flex space-x-4 bg-white rounded-lg p-2 shadow-sm">
              <button
                onClick={handleBackToSelection}
                className={`px-4 py-2 rounded-md transition-colors ${
                  !currentSession && !showHistory
                    ? 'bg-cyan-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {t.consultation?.selectDoctor || 'Select Doctor'}
              </button>
                  {currentSession && (
                    <button
                      onClick={() => setShowHistory(false)}
                      className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      {t.consultation?.currentConsultation || 'Current Consultation'}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (currentSession) {
                        setIsExiting(true)
                        return
                      }
                      handleShowHistory()
                    }}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      showHistory
                        ? 'bg-cyan-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {t.consultation?.history || 'History'}
                  </button>
                </nav>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 min-h-0">
          <AnimatePresence mode="wait">
            {!currentSession && !showHistory && (
              <motion.div
                key="doctor-selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="max-w-6xl mx-auto w-full px-4 py-8"
              >
                <DoctorSelection 
                  onDoctorSelect={handleDoctorSelect} 
                  preSelectedAgent={preSelectedAgent}
                />
              </motion.div>
            )}

            {currentSession && (
              <motion.div
                key="chat-consultation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full"
              >
                <ChatConsultation
                  session={currentSession}
                  onEndConsultation={handleEndConsultation}
                />
              </motion.div>
            )}

            {showHistory && (
              <motion.div
                key="consultation-history"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="max-w-6xl mx-auto w-full px-4 py-8"
              >
                <ConsultationHistory
                  onStartConsultation={(session) => {
                    ConsultationHistoryService.saveSession(session)
                    setCurrentSession(session)
                    setShowHistory(false)
                  }}
                  onBack={handleBackToSelection}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Lock Dialog */}
      <ConsultationExitDialog
        isOpen={showDialog || isExiting}
        onClose={handleCancelExit}
        onConfirm={handleConfirmExit}
        loading={isExiting}
      />
    </div>
  )
}
