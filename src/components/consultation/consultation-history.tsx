'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/language-context'
import { AnalysisSession } from '@/types/consultation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConsultationHistoryService } from '@/services/consultation-history-service'

interface AnalysisHistoryProps {
  onStartAnalysis: (session: AnalysisSession) => void
  onBack: () => void
}

/**
 * Component for displaying analysis history
 * Shows past analyses and allows restarting them
 */
export function ConsultationHistory({ onStartAnalysis, onBack }: AnalysisHistoryProps) {
  const { t } = useLanguage()
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisSession[]>([])
  const [loading, setLoading] = useState(true)

  // Load analysis history on component mount
  useEffect(() => {
    const loadHistory = () => {
      try {
        const history = ConsultationHistoryService.getHistory()
        setAnalysisHistory(history)
      } catch (error) {
        console.error('Error loading consultation history:', error)
      } finally {
        setLoading(false)
      }
    }

    loadHistory()
  }, [])

  // Get doctor avatar based on doctor ID
  const getDoctorAvatar = (doctorId: string): string => {
    const doctorAvatars: Record<string, string> = {
      'dr-henry': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'dr-floyd-miles': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'dr-mckinney': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'dr-jacob': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'dr-warren': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    }
    return doctorAvatars[doctorId] || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }

  // Handle session deletion
  const handleDeleteSession = (sessionId: string) => {
    try {
      ConsultationHistoryService.deleteSession(sessionId)
      setAnalysisHistory(prev => prev.filter(s => s.id !== sessionId))
    } catch (error) {
      console.error('Error deleting session:', error)
    }
  }

  // Handle session restart
  const handleRestartSession = (session: AnalysisSession) => {
    const newSession: AnalysisSession = {
      ...session,
      id: `session-${Date.now()}`,
      startTime: new Date(),
      endTime: undefined,
      messages: [],
      status: 'active'
    }
    onStartAnalysis(newSession)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'active':
        return 'bg-cyan-100 text-cyan-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">
            {t.consultation?.consultationHistory || 'Consultation History'}
          </h2>
          <Button onClick={onBack} variant="outline">
            {t.common?.back || 'Back'}
          </Button>
        </div>
        <Card className="p-8 text-center">
          <p className="text-gray-500 text-lg">Loading consultation history...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          {t.healthcare?.analysis?.analysisHistory || 'Analysis History'}
        </h2>
        <Button onClick={onBack} variant="outline">
          {t.common?.back || 'Back'}
        </Button>
      </div>

      {/* History List */}
      {analysisHistory.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500 text-lg">
            {t.consultation?.noHistory || 'No analysis history found'}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {analysisHistory.map((session) => (
            <Card key={session.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-cyan-200 relative">
                      <Image 
                        src={getDoctorAvatar(session.specialistId)} 
                        alt={session.specialistName}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{session.specialistName}</h3>
                      <p className="text-sm text-gray-600">
                        {session.specialistSpecialty.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Start Time</p>
                      <p className="font-medium">{formatDate(session.startTime)}</p>
                    </div>
                    {session.endTime && (
                      <div>
                        <p className="text-sm text-gray-500">End Time</p>
                        <p className="font-medium">{formatDate(session.endTime)}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                        {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Messages</p>
                      <p className="font-medium">{session.messages.length}</p>
                    </div>
                  </div>

                  {session.summary && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Summary</p>
                      <p className="text-sm text-gray-700">{session.summary}</p>
                    </div>
                  )}

                  {session.recommendations && session.recommendations.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Recommendations</p>
                      <ul className="list-disc list-inside space-y-1">
                        {session.recommendations.map((recommendation, index) => (
                          <li key={index} className="text-sm text-gray-700">
                            {recommendation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button
                    onClick={() => onStartAnalysis(session)}
                    size="sm"
                    className="bg-cyan-600 hover:bg-cyan-700"
                  >
                    {t.consultation?.viewDetails || 'View Details'}
                  </Button>
                  {session.status === 'completed' && (
                    <Button
                      onClick={() => handleRestartSession(session)}
                      size="sm"
                      variant="outline"
                    >
                      {t.consultation?.restartConsultation || 'Restart Analysis'}
                    </Button>
                  )}
                  <Button
                    onClick={() => handleDeleteSession(session.id)}
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
