'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/language-context'
import { ConsultationSession, ConsultationMessage } from '@/types/consultation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get doctor avatar based on doctor ID
  const getDoctorAvatar = (doctorId: string): string => {
    const doctorAvatars: Record<string, string> = {
      'dr-henry': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'dr-floyd-miles': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'dr-mckinney': 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'dr-jacob': 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'dr-warren': 'https://images.unsplash.com/photo-1594824609072-57c2d2bb8b86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    }
    return doctorAvatars[doctorId] || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
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

    setMessages(prev => [...prev, userMessage])
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

      setMessages(prev => [...prev, doctorMessage])
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
      setMessages(prev => [...prev, doctorMessage])
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
      general_medicine: [
        "I understand your concern. Based on your symptoms, I recommend monitoring your condition and consulting with a healthcare provider if symptoms persist or worsen.",
        "Thank you for sharing that information. It's important to track your symptoms and seek medical attention if they don't improve within 24-48 hours.",
        "I can help you understand your symptoms better. Could you provide more details about when these symptoms started and what makes them better or worse?"
      ],
      cardiology: [
        "Given your symptoms, I recommend monitoring your heart rate and blood pressure. If you experience chest pain, shortness of breath, or dizziness, seek immediate medical attention.",
        "Your symptoms could be related to cardiovascular health. I suggest keeping a symptom diary and consulting with a cardiologist for further evaluation.",
        "It's important to track your symptoms and any triggers. If you experience severe chest pain or difficulty breathing, call emergency services immediately."
      ],
      neurology: [
        "Your neurological symptoms require careful monitoring. Keep track of frequency, duration, and any triggers. Seek immediate medical attention for severe headaches, vision changes, or weakness.",
        "I understand your concern about these symptoms. It's important to document when they occur and what activities precede them. Consider consulting a neurologist for further evaluation.",
        "Your symptoms may be related to neurological function. Monitor for any changes in severity or new symptoms, and don't hesitate to seek medical care if needed."
      ],
      pediatrics: [
        "For your child's symptoms, I recommend monitoring their temperature, activity level, and appetite. Contact your pediatrician if symptoms worsen or if your child becomes lethargic.",
        "It's important to track your child's symptoms and any changes in behavior. Keep them hydrated and comfortable, and seek medical attention if symptoms persist.",
        "Your child's symptoms should be monitored closely. If they develop a high fever, difficulty breathing, or become unresponsive, seek immediate medical care."
      ],
      internal_medicine: [
        "Your symptoms suggest we need to consider your overall health status. I recommend a comprehensive evaluation including your medical history and current medications.",
        "Given your symptoms and medical history, I suggest monitoring your condition closely and consulting with your primary care physician for a thorough evaluation.",
        "Your symptoms may be related to your existing conditions. It's important to continue your current medications and report any changes to your healthcare provider."
      ]
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
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-cyan-300">
              <Image 
                src={getDoctorAvatar(session.doctorId)} 
                alt={session.doctorName}
                fill
                className="object-cover"
                sizes="80px"
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
            onClick={onEndConsultation}
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
                <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-cyan-200 flex-shrink-0">
                  <Image 
                    src={getDoctorAvatar(session.doctorId)} 
                    alt={session.doctorName}
                    fill
                    className="object-cover"
                    sizes="40px"
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
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-cyan-200 flex-shrink-0">
                <Image 
                  src={getDoctorAvatar(session.doctorId)} 
                  alt={session.doctorName}
                  fill
                  className="object-cover"
                  sizes="40px"
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
          <p className="text-sm text-gray-600 mb-3">Quick actions:</p>
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
    </div>
  )
}
