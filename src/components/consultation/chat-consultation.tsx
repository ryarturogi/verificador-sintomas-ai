'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/language-context'
import { ConsultationSession, ConsultationMessage } from '@/types/consultation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ConsultationHistoryService } from '@/services/consultation-history-service'
import { ConsultationExitDialog } from '@/components/ui/confirmation-dialog'
import { useNavigationConfirmation } from '@/hooks/use-navigation-lock'
// import { Card } from '@/components/ui/card'
// import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface ChatConsultationProps {
  session: ConsultationSession
  onEndConsultation: () => void
}

/**
 * Chat interface for AI doctor consultation
 * Handles real-time messaging with AI doctors
 */
export function ChatConsultation({ session, onEndConsultation }: ChatConsultationProps) {
  const { t } = useLanguage()
  const [messages, setMessages] = useState<ConsultationMessage[]>(session.messages)
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Navigation lock for active chat consultation
  const {
    showDialog,
    handleConfirmExit,
    handleCancelExit
  } = useNavigationConfirmation({
    isActive: true, // Chat is always active when rendered
    onConfirmExit: () => {
      handleEndConsultation()
      setIsExiting(false)
    },
    onCancelExit: () => {
      setIsExiting(false)
    }
  })

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleEndConsultation = () => {
    // Complete the session before ending
    ConsultationHistoryService.completeSession(
      session.id,
      `Consultation completed with ${session.doctorName}`,
      ['Follow up as needed', 'Monitor symptoms', 'Contact healthcare provider if concerns arise']
    )
    onEndConsultation()
  }

  const getWelcomeMessage = useCallback((specialty: string): string => {
    const welcomeMessages = {
      general_medicine: t.consultationChat.welcomeMessages.generalMedicine,
      cardiology: t.consultationChat.welcomeMessages.cardiology,
      neurology: t.consultationChat.welcomeMessages.neurology,
      pediatrics: t.consultationChat.welcomeMessages.pediatrics,
      internal_medicine: t.consultationChat.welcomeMessages.internalMedicine
    }
    return welcomeMessages[specialty as keyof typeof welcomeMessages] || welcomeMessages.general_medicine
  }, [t])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Add welcome message when consultation starts
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ConsultationMessage = {
        id: `welcome-${Date.now()}`,
        content: getWelcomeMessage(session.doctorSpecialty),
        sender: 'doctor',
        timestamp: new Date(),
        isTyping: false
      }
      setMessages([welcomeMessage])
    }
  }, [session.doctorSpecialty, messages.length, getWelcomeMessage])

  const getQuickActions = (specialty: string): string[] => {
    const quickActions = {
      general_medicine: [t.consultationChat.quickActions.generalMedicine],
      cardiology: [t.consultationChat.quickActions.cardiology],
      neurology: [t.consultationChat.quickActions.neurology],
      pediatrics: [t.consultationChat.quickActions.pediatrics],
      internal_medicine: [t.consultationChat.quickActions.internalMedicine]
    }
    return quickActions[specialty as keyof typeof quickActions] || quickActions.general_medicine
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: ConsultationMessage = {
      id: `msg-${Date.now()}`,
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      isTyping: false
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    
    // Save user message to history
    ConsultationHistoryService.addMessage(session.id, userMessage)
    
    const currentMessage = inputMessage
    setInputMessage('')
    setIsLoading(true)

    try {
      // Call the consultation API with conversation context
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId: session.doctorId,
          initialMessage: currentMessage,
          urgency: 'medium',
          medicalHistory: '',
          currentMedications: '',
          allergies: '',
          conversationHistory: messages.slice(-5).map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.content
          }))
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get consultation response')
      }

      const data = await response.json()
      
      // Simulate typing delay for more realistic experience
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000))
      
      const doctorMessage: ConsultationMessage = {
        id: `msg-${Date.now() + 1}`,
        content: data.message,
        sender: 'doctor',
        timestamp: new Date(),
        isTyping: false
      }

      const finalMessages = [...updatedMessages, doctorMessage]
      setMessages(finalMessages)
      
      // Save doctor message to history
      ConsultationHistoryService.addMessage(session.id, doctorMessage)
      
      // Update session with new messages
      const updatedSession = { ...session, messages: finalMessages }
      ConsultationHistoryService.saveSession(updatedSession)
    } catch (error) {
      console.error('Error sending message:', error)
      // Fallback to mock response with typing delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500))
      
      const doctorMessage: ConsultationMessage = {
        id: `msg-${Date.now() + 1}`,
        content: generateDoctorResponse(currentMessage, session.doctorSpecialty),
        sender: 'doctor',
        timestamp: new Date(),
        isTyping: false
      }
      
      const finalMessages = [...updatedMessages, doctorMessage]
      setMessages(finalMessages)
      
      // Save doctor message to history
      ConsultationHistoryService.addMessage(session.id, doctorMessage)
      
      // Update session with new messages
      const updatedSession = { ...session, messages: finalMessages }
      ConsultationHistoryService.saveSession(updatedSession)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const generateDoctorResponse = (userMessage: string, specialty: string): string => {
    // Mock AI responses based on specialty
    const responses = {
      general_medicine: t.mockResponses.generalMedicine,
      cardiology: t.mockResponses.cardiology,
      neurology: t.mockResponses.neurology,
      pediatrics: t.mockResponses.pediatrics,
      internal_medicine: t.mockResponses.internalMedicine
    }

    const specialtyResponses = responses[specialty as keyof typeof responses] || responses.general_medicine
    return specialtyResponses[Math.floor(Math.random() * specialtyResponses.length)]
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-cyan-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-cyan-300 relative">
              <Image 
                src={getDoctorAvatar(session.doctorId)} 
                alt={session.doctorName}
                width={40}
                height={40}
                className="object-cover w-full h-full"
                sizes="40px"
              />
            </div>
            <div>
              <h3 className="font-semibold">{session.doctorName}</h3>
              <p className="text-sm text-cyan-100">
                {session.doctorSpecialty.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} AI Agent
              </p>
            </div>
          </div>
          <Button
            onClick={handleEndConsultation}
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-cyan-600"
          >
            {t.consultationChat.endConsultation}
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>{t.consultation.startConversation}</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {message.sender === 'doctor' && (
                <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-cyan-200 flex-shrink-0 relative">
                  <Image 
                    src={getDoctorAvatar(session.doctorId)} 
                    alt={session.doctorName}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                    sizes="32px"
                  />
                </div>
              )}
              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-cyan-600 text-white rounded-br-md'
                    : 'bg-white border border-gray-200 text-gray-900 rounded-bl-md shadow-sm'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-cyan-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-cyan-200 flex-shrink-0 relative">
                <Image 
                  src={getDoctorAvatar(session.doctorId)} 
                  alt={session.doctorName}
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                  sizes="32px"
                />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md shadow-sm px-4 py-3">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {t.consultationChat.doctorTyping}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="border-t p-4 bg-gray-50">
          <p className="text-sm text-gray-600 mb-3">{t.doctorSelection.quickActions}</p>
          <div className="flex flex-wrap gap-2">
            {getQuickActions(session.doctorSpecialty).map((action, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(action)}
                className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.consultationChat.typeMessage}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            {t.consultationChat.send}
          </Button>
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
