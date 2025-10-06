'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, Minimize2 } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { ConsultationSession, ConsultationMessage } from '@/types/consultation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ConsultationHistoryService } from '@/services/consultation-history-service'
import { ConsultationExitDialog } from '@/components/ui/confirmation-dialog'
import { useNavigationConfirmation } from '@/hooks/use-navigation-lock'
import { MarkdownRenderer } from '@/components/ui/markdown-renderer'
import { useScrollToTopOnMount } from '@/hooks/use-scroll-to-top'
import { chatTranslationService } from '@/services/chat-translation-service'
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
  const { t, language } = useLanguage()
  const [messages, setMessages] = useState<ConsultationMessage[]>(session.messages)
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [messageQueue, setMessageQueue] = useState<string[]>([]) // Queue for pending messages
  const [translatedMessages, setTranslatedMessages] = useState<{[key: string]: string}>({})
  const [isTranslating, setIsTranslating] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
    if (messagesContainerRef.current) {
      // Use requestAnimationFrame for smooth scrolling
      requestAnimationFrame(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTo({
            top: messagesContainerRef.current.scrollHeight,
            behavior: 'smooth'
          })
        }
      })
    }
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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
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

  // Scroll to top when component mounts
  useScrollToTopOnMount()

  // Prevent body scroll when in fullscreen mode
  useEffect(() => {
    // Check if document is available (client-side only)
    if (typeof document === 'undefined') return

    if (isFullscreen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset'
      }
    }
  }, [isFullscreen])

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

    // Keep input focused after sending
    if (inputRef.current) {
      inputRef.current.focus()
    }

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
      
      // Validate response has content
      if (!data.message || data.message.trim().length === 0) {
        console.error('API returned empty message:', data)
        throw new Error('API returned empty message')
      }
      
      const messageContent = data.message
      
      // Simulate typing delay for more realistic experience
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000))
      
      const doctorMessage: ConsultationMessage = {
        id: `msg-${Date.now() + 1}`,
        content: messageContent,
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

      // Translate the new doctor message
      try {
        const translatedContent = await chatTranslationService.translateMessage(
          messageContent,
          language,
          session.id
        )
        setTranslatedMessages(prev => ({
          ...prev,
          [doctorMessage.id]: translatedContent
        }))
      } catch (error) {
        console.error('Error translating new message:', error)
      }
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

  // Add message to queue for future processing
  const addToQueue = (message: string) => {
    setMessageQueue(prev => [...prev, message])
  }

  // Process next message in queue
  const processNextInQueue = () => {
    if (messageQueue.length > 0 && !isLoading) {
      const nextMessage = messageQueue[0]
      setMessageQueue(prev => prev.slice(1))
      setInputMessage(nextMessage)
      // Auto-send the queued message
      setTimeout(() => {
        handleSendMessage()
      }, 100)
    }
  }

  // Process queue when loading finishes
  useEffect(() => {
    if (!isLoading && messageQueue.length > 0) {
      processNextInQueue()
    }
  }, [isLoading, messageQueue.length])

  // Translate messages when language changes
  useEffect(() => {
    const translateMessages = async () => {
      if (messages.length === 0) return

      setIsTranslating(true)
      
      try {
        // Load existing translations for this consultation
        chatTranslationService.loadConsultationTranslations(session.id)
        
        const newTranslations: {[key: string]: string} = {}
        
        for (const message of messages) {
          if (message.sender === 'doctor') {
            // Check if translation already exists
            const cachedTranslation = chatTranslationService.getCachedTranslation(
              message.content,
              language,
              session.id
            )
            
            if (cachedTranslation) {
              newTranslations[message.id] = cachedTranslation
            } else {
              // Translate the message
              const translatedContent = await chatTranslationService.translateMessage(
                message.content,
                language,
                session.id
              )
              newTranslations[message.id] = translatedContent
            }
          }
        }
        
        setTranslatedMessages(newTranslations)
        
        // Save translations to session storage
        chatTranslationService.saveConsultationTranslations(session.id)
        
      } catch (error) {
        console.error('Translation error:', error)
      } finally {
        setIsTranslating(false)
      }
    }

    translateMessages()
  }, [language, session.id, messages.length])


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
    <motion.div 
      className={`flex flex-col bg-gray-50 ${isFullscreen ? 'fixed inset-0 z-50' : 'h-full max-h-full my-4'}`} 
      style={{ 
        height: isFullscreen ? '100vh' : '100%',
        minHeight: isFullscreen ? '100vh' : 'calc(100vh - 4rem - 2rem)',
        maxHeight: isFullscreen ? '100vh' : 'calc(100vh - 4rem - 2rem)'
      }}
      animate={{
        scale: isFullscreen ? 1 : 1,
        opacity: 1
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div 
        className={`${isFullscreen ? 'w-full h-full' : 'max-w-6xl mx-auto w-full h-full max-h-full'} flex flex-col bg-white ${isFullscreen ? 'rounded-none' : 'rounded-lg'} shadow-lg`} 
        style={{ 
          height: isFullscreen ? '100vh' : '100%',
          minHeight: isFullscreen ? '100vh' : 'calc(100vh - 4rem - 2rem)',
          maxHeight: isFullscreen ? '100vh' : 'calc(100vh - 4rem - 2rem)'
        }}
        animate={{
          borderRadius: isFullscreen ? 0 : 8,
          boxShadow: isFullscreen ? '0 0 0 0 rgba(0,0,0,0)' : '0 10px 15px -3px rgba(0,0,0,0.1)'
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Header */}
        <div className={`bg-cyan-600 text-white p-4 flex-shrink-0 ${isFullscreen ? 'rounded-none' : 'rounded-t-lg'}`}>
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
            <div className="flex items-center space-x-2">
              <Button
                onClick={toggleFullscreen}
                variant="outline"
                size="sm"
                className="bg-transparent border-white text-white hover:bg-white hover:text-cyan-600 p-2"
                title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button
                onClick={handleEndConsultation}
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-cyan-600"
              >
                {t.consultationChat.endConsultation}
              </Button>
            </div>
          </div>
        </div>

      {/* Messages */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 max-h-full">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>{t.consultation.startConversation}</p>
          </div>
        )}
        
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1,
                ease: "easeOut" 
              }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {message.sender === 'doctor' && (
                  <motion.div 
                    className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-cyan-200 flex-shrink-0 relative"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.1 + 0.1 }}
                  >
                    <Image 
                      src={getDoctorAvatar(session.doctorId)} 
                      alt={session.doctorName}
                      width={32}
                      height={32}
                      className="object-cover w-full h-full"
                      sizes="32px"
                    />
                  </motion.div>
                )}
                <motion.div
                  className={`px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-cyan-600 text-white rounded-br-md'
                      : 'bg-white border border-gray-200 text-gray-900 rounded-bl-md shadow-sm'
                  }`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.1 + 0.2 }}
                >
                  {message.sender === 'doctor' ? (
                    <MarkdownRenderer 
                      content={translatedMessages[message.id] || message.content} 
                      className="text-sm leading-relaxed"
                    />
                  ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  )}
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-cyan-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="loading-indicator"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex justify-start mb-4"
            >
              <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
                <motion.div 
                  className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-cyan-200 flex-shrink-0 relative"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image 
                    src={getDoctorAvatar(session.doctorId)} 
                    alt={session.doctorName}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                    sizes="32px"
                  />
                </motion.div>
                <motion.div 
                  className="bg-white border border-gray-200 rounded-2xl rounded-bl-md shadow-sm px-4 py-3"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <motion.div 
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [-4, 4, -4] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [-4, 4, -4] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [-4, 4, -4] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">
                      {t.consultationChat.doctorTyping}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <AnimatePresence>
        {messages.length === 1 && (
          <motion.div
            key="quick-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="border-t p-4 bg-gray-50 flex-shrink-0"
          >
            <motion.p 
              className="text-sm text-gray-600 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {t.doctorSelection.quickActions}
            </motion.p>
            <div className="flex flex-wrap gap-2">
              {getQuickActions(session.doctorSpecialty).map((action, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setInputMessage(action)}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {action}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className={`border-t p-4 flex-shrink-0 ${isFullscreen ? 'rounded-none' : 'rounded-b-lg'}`}>
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.consultationChat.typeMessage}
            className="flex-1"
            autoFocus
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50"
          >
            {isLoading ? t.consultationChat.sending || 'Enviando...' : t.consultationChat.send}
          </Button>
        </div>
        {isLoading && (
          <div className="mt-2 text-sm text-gray-500">
            {t.consultationChat.typingIndicator || 'El doctor está escribiendo...'}
          </div>
        )}
        {messageQueue.length > 0 && (
          <div className="mt-2 text-sm text-blue-600">
            {messageQueue.length} {t.consultationChat.messagesInQueue}
          </div>
        )}
      </div>

        {/* Navigation Lock Dialog */}
        <ConsultationExitDialog
          isOpen={showDialog || isExiting}
          onClose={handleCancelExit}
          onConfirm={handleConfirmExit}
          loading={isExiting}
        />
      </motion.div>
    </motion.div>
  )
}
