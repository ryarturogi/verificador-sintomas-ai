'use client'

// import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/language-context'
import { ConsultationSession } from '@/types/consultation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ConsultationHistoryProps {
  onStartConsultation: (session: ConsultationSession) => void
  onBack: () => void
}

/**
 * Component for displaying consultation history
 * Shows past consultations and allows restarting them
 */
export function ConsultationHistory({ onStartConsultation, onBack }: ConsultationHistoryProps) {
  const { t } = useLanguage()
  // const [selectedSession, setSelectedSession] = useState<string | null>(null)

  // Get doctor avatar based on doctor ID
  const getDoctorAvatar = (doctorId: string): string => {
    const doctorAvatars: Record<string, string> = {
      'dr-henry': 'https://images.unsplash.com/photo-1677442136019-21780ccad005?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'dr-floyd-miles': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'dr-mckinney': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'dr-jacob': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'dr-warren': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    }
    return doctorAvatars[doctorId] || 'https://images.unsplash.com/photo-1677442136019-21780ccad005?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }

  // Mock consultation history data
  const consultationHistory: ConsultationSession[] = [
    {
      id: 'session-1',
      doctorId: 'dr-henry',
      doctorName: 'Dr. Henry',
      doctorSpecialty: 'general_medicine',
      startTime: new Date('2024-01-15T10:30:00'),
      endTime: new Date('2024-01-15T10:45:00'),
      messages: [
        {
          id: 'msg-1',
          content: 'I have been experiencing headaches for the past week',
          sender: 'user',
          timestamp: new Date('2024-01-15T10:30:00'),
          isTyping: false
        },
        {
          id: 'msg-2',
          content: 'I understand your concern about the headaches. Can you describe the intensity and any triggers?',
          sender: 'doctor',
          timestamp: new Date('2024-01-15T10:31:00'),
          isTyping: false
        }
      ],
      status: 'completed',
      summary: 'Headache consultation - recommended monitoring and follow-up',
      recommendations: [
        'Monitor headache frequency and intensity',
        'Keep a symptom diary',
        'Consult primary care physician if symptoms persist'
      ]
    },
    {
      id: 'session-2',
      doctorId: 'dr-floyd-miles',
      doctorName: 'Dr. Floyd Miles',
      doctorSpecialty: 'cardiology',
      startTime: new Date('2024-01-10T14:20:00'),
      endTime: new Date('2024-01-10T14:35:00'),
      messages: [
        {
          id: 'msg-3',
          content: 'I have been feeling chest discomfort and shortness of breath',
          sender: 'user',
          timestamp: new Date('2024-01-10T14:20:00'),
          isTyping: false
        },
        {
          id: 'msg-4',
          content: 'Chest discomfort and shortness of breath require immediate attention. Please describe the exact nature of the discomfort.',
          sender: 'doctor',
          timestamp: new Date('2024-01-10T14:21:00'),
          isTyping: false
        }
      ],
      status: 'completed',
      summary: 'Cardiac symptoms consultation - urgent evaluation recommended',
      recommendations: [
        'Seek immediate medical evaluation',
        'Monitor vital signs',
        'Avoid strenuous activities until evaluated'
      ]
    }
  ]

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          {t.consultation?.consultationHistory || 'Consultation History'}
        </h2>
        <Button onClick={onBack} variant="outline">
          {t.common?.back || 'Back'}
        </Button>
      </div>

      {/* History List */}
      {consultationHistory.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500 text-lg">
            {t.consultation?.noHistory || 'No consultation history found'}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {consultationHistory.map((session) => (
            <Card key={session.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-cyan-200 relative">
                      <Image 
                        src={getDoctorAvatar(session.doctorId)} 
                        alt={session.doctorName}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{session.doctorName}</h3>
                      <p className="text-sm text-gray-600">
                        {session.doctorSpecialty.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
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
                    onClick={() => onStartConsultation(session)}
                    size="sm"
                    className="bg-cyan-600 hover:bg-cyan-700"
                  >
                    {t.consultation?.viewDetails || 'View Details'}
                  </Button>
                  {session.status === 'completed' && (
                    <Button
                      onClick={() => {
                        // Create a new session based on this one
                        const newSession: ConsultationSession = {
                          ...session,
                          id: `session-${Date.now()}`,
                          startTime: new Date(),
                          endTime: undefined,
                          messages: [],
                          status: 'active'
                        }
                        onStartConsultation(newSession)
                      }}
                      size="sm"
                      variant="outline"
                    >
                      {t.consultation?.restartConsultation || 'Restart Consultation'}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
