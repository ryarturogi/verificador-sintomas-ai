'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/language-context'
import { DoctorSelection } from './doctor-selection'
import { ChatConsultation } from './chat-consultation'
import { ConsultationHistory } from './consultation-history'
import { Doctor, ConsultationSession } from '@/types/consultation'

/**
 * Main consultation portal component that manages the consultation flow
 * Handles doctor selection, chat consultation, and consultation history
 */
export function ConsultationPortal() {
  const { t } = useLanguage()
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [currentSession, setCurrentSession] = useState<ConsultationSession | null>(null)
  const [showHistory, setShowHistory] = useState(false)

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setShowHistory(false)
  }

  const handleStartConsultation = (session: ConsultationSession) => {
    setCurrentSession(session)
    setShowHistory(false)
  }

  const handleEndConsultation = () => {
    setCurrentSession(null)
    setSelectedDoctor(null)
  }

  const handleShowHistory = () => {
    setShowHistory(true)
    setCurrentSession(null)
  }

  const handleBackToSelection = () => {
    setSelectedDoctor(null)
    setCurrentSession(null)
    setShowHistory(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-cyan-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.consultation?.title || 'Free AI Doctor Consultation'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.consultation?.subtitle || 'Get expert medical advice from AI agents specialized in different medical fields'}
          </p>
          <div className="mt-4 p-4 bg-cyan-50 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-cyan-800">
              <strong>Note:</strong> All doctors are AI agents with specialized medical knowledge. 
              This is not a replacement for professional medical care.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <nav className="flex space-x-4 bg-white rounded-lg p-2 shadow-sm">
            <button
              onClick={handleBackToSelection}
              className={`px-4 py-2 rounded-md transition-colors ${
                !selectedDoctor && !currentSession && !showHistory
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
              onClick={handleShowHistory}
              className={`px-4 py-2 rounded-md transition-colors ${
                showHistory
                  ? 'bg-cyan-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t.consultation?.history || 'History'}
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {!selectedDoctor && !currentSession && !showHistory && (
            <DoctorSelection onDoctorSelect={handleDoctorSelect} />
          )}

          {selectedDoctor && !currentSession && !showHistory && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {t.consultation?.selectedDoctor || 'Selected Doctor'}
                </h2>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-cyan-200 relative">
                    <Image 
                      src={selectedDoctor.avatar || 'https://images.unsplash.com/photo-1677442136019-21780ccad005?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'} 
                      alt={selectedDoctor.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedDoctor.name}
                    </h3>
                    <p className="text-gray-600">{selectedDoctor.specialtyDisplayName}</p>
                    <p className="text-sm text-gray-500">{selectedDoctor.experience}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {t.common?.back || 'Back'}
                </button>
                <button
                  onClick={() => {
                    // Start consultation logic will be implemented
                    const session: ConsultationSession = {
                      id: `session-${Date.now()}`,
                      doctorId: selectedDoctor.id,
                      doctorName: selectedDoctor.name,
                      doctorSpecialty: selectedDoctor.specialty,
                      startTime: new Date(),
                      messages: [],
                      status: 'active'
                    }
                    setCurrentSession(session)
                  }}
                  className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  {t.consultation?.startConsultation || 'Start Consultation'}
                </button>
              </div>
            </div>
          )}

          {currentSession && (
            <ChatConsultation
              session={currentSession}
              onEndConsultation={handleEndConsultation}
            />
          )}

          {showHistory && (
            <ConsultationHistory
              onStartConsultation={handleStartConsultation}
              onBack={handleBackToSelection}
            />
          )}
        </div>
      </div>
    </div>
  )
}
