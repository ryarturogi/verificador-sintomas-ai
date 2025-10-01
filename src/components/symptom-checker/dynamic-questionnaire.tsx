'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Question, QuestionResponse, QuestionnaireSession } from '@/types/dynamic-questionnaire'
import { clientQuestionService } from '@/services/client-question-service'
import { DynamicQuestion } from './dynamic-question'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLanguage, useTranslations } from '@/contexts/language-context'
import { Loader2, CheckCircle, AlertTriangle, Sparkles, Brain, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { designTokens } from '@/lib/design-tokens'

interface DynamicQuestionnaireProps {
  onComplete: (responses: QuestionResponse[]) => void
  onEmergencyDetected: (responses: QuestionResponse[]) => void
  initialTopic?: string
  initialQuery?: string
}

type QuestionnaireState = 'initializing' | 'questioning' | 'generating' | 'completed' | 'emergency' | 'error'

export function DynamicQuestionnaire({ onComplete, onEmergencyDetected, initialTopic, initialQuery }: DynamicQuestionnaireProps) {
  const [state, setState] = useState<QuestionnaireState>('initializing')
  const [responses, setResponses] = useState<QuestionResponse[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [questionHistory, setQuestionHistory] = useState<Question[]>([])
  const [error, setError] = useState<string>('')
  const [questionNumber, setQuestionNumber] = useState(1)
  const [canGoBack, setCanGoBack] = useState(false)
  const { language } = useLanguage()
  const t = useTranslations()
  
  // Use refs to avoid re-renders from prop changes
  const initializedRef = useRef(false)
  const initialTopicRef = useRef(initialTopic)
  const initialQueryRef = useRef(initialQuery)
  const sessionIdRef = useRef(`session_${Date.now()}`)
  const sessionStartTimeRef = useRef(new Date())
  
  // Request deduplication
  const activeRequestsRef = useRef<Set<string>>(new Set())
  const abortControllerRef = useRef<AbortController | null>(null)

  // Memoize session object to prevent re-creation - only update when responses change
  const session = useMemo<QuestionnaireSession>(() => ({
    id: sessionIdRef.current,
    responses,
    completed: false,
    startedAt: sessionStartTimeRef.current,
  }), [responses])

  // Request deduplication helper
  const makeRequest = useCallback(async <T,>(
    requestKey: string,
    requestFn: (signal: AbortSignal) => Promise<T>
  ): Promise<T> => {
    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Check if request is already in progress
    if (activeRequestsRef.current.has(requestKey)) {
      throw new Error('Request already in progress')
    }

    // Create new abort controller
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    try {
      activeRequestsRef.current.add(requestKey)
      const result = await requestFn(abortController.signal)
      return result
    } finally {
      activeRequestsRef.current.delete(requestKey)
      if (abortControllerRef.current === abortController) {
        abortControllerRef.current = null
      }
    }
  }, [])

  // Separate function for generating initial question
  const generateInitialQuestion = useCallback(async () => {
    try {
      const initialQuestion = await makeRequest(
        'generateInitialQuestion',
        () => clientQuestionService.generateInitialQuestion(language)
      )
      setCurrentQuestion(initialQuestion)
      setQuestionHistory([initialQuestion])
      setQuestionNumber(1)
      setState('questioning')
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Failed to generate initial question:', err)
        setError(t.errors.startQuestionnaireError)
        setState('error')
      }
    }
  }, [language, makeRequest, t.errors.startQuestionnaireError])

  // Memoize the initialization function
  const initializeQuestionnaire = useCallback(async () => {
    try {
      setState('initializing')
      setResponses([]) // Reset responses
      
      // If we have an initial topic, skip the first question and start with the second
      if (initialTopicRef.current || initialQueryRef.current) {
        // Add the initial response to the session
        const initialResponse = initialQueryRef.current 
          ? {
              questionId: 'initial_symptom',
              answer: initialQueryRef.current,
              timestamp: new Date()
            }
          : clientQuestionService.getInitialResponseForTopic(initialTopicRef.current!, language)
        
        setResponses([initialResponse])
        
        // Generate the second question based on the initial response
        const secondQuestion = await makeRequest(
          'generateNextQuestion',
          () => clientQuestionService.generateNextQuestion(
            [initialResponse], 
            1, // question number 2 (1-indexed becomes 0-indexed)
            language
          )
        )
        
        if (secondQuestion) {
          setCurrentQuestion(secondQuestion)
          setQuestionHistory([secondQuestion])
          setQuestionNumber(2) // We're starting with question 2
          setState('questioning')
        } else {
          // Fallback to regular initial question
          await generateInitialQuestion()
        }
      } else {
        await generateInitialQuestion()
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Failed to initialize questionnaire:', err)
        setError(t.errors.startQuestionnaireError)
        setState('error')
      }
    }
  }, [language, generateInitialQuestion, makeRequest, t.errors.startQuestionnaireError])

  // Only initialize once or when language changes
  useEffect(() => {
    if (!initializedRef.current || initialTopicRef.current !== initialTopic || initialQueryRef.current !== initialQuery) {
      initialTopicRef.current = initialTopic
      initialQueryRef.current = initialQuery
      initializedRef.current = true
      initializeQuestionnaire()
    }
  }, [initializeQuestionnaire, initialTopic, initialQuery])

  // Cleanup effect for request cancellation
  useEffect(() => {
    const activeRequests = activeRequestsRef.current
    const abortController = abortControllerRef.current
    
    return () => {
      // Cancel any active requests on unmount
      if (abortController) {
        abortController.abort()
      }
      // Clear active requests set
      activeRequests.clear()
    }
  }, [])

  const shouldCompleteQuestionnaire = useCallback((responses: QuestionResponse[]): boolean => {
    // Complete if we have basic info and sufficient symptom details
    const hasBasicInfo = responses.some(r => r.questionId === 'initial_symptom')
    const hasEnoughDetails = responses.length >= 4
    
    return hasBasicInfo && hasEnoughDetails
  }, [])

  const handleAnswer = useCallback(async (response: QuestionResponse) => {
    // Add response to session using state setter
    const newResponses = [...responses, response]
    setResponses(newResponses)
    setState('generating')

    try {
      // Check for emergency indicators with request deduplication
      const needsEmergencyCheck = await makeRequest(
        'shouldAskEmergencyQuestion',
        () => clientQuestionService.shouldAskEmergencyQuestion(newResponses)
      )
      
      if (needsEmergencyCheck && !questionHistory.some(q => q.id === 'emergency_symptoms')) {
        const emergencyQuestion = await makeRequest(
          'generateEmergencyQuestion',
          () => clientQuestionService.generateEmergencyQuestion()
        )
        setCurrentQuestion(emergencyQuestion)
        setQuestionHistory(prev => [...prev, emergencyQuestion])
        setQuestionNumber(prev => prev + 1)
        setState('questioning')
        return
      }

      // Check if emergency symptoms were selected
      if (response.questionId === 'emergency_symptoms') {
        const emergencySymptoms = Array.isArray(response.answer) ? response.answer : [response.answer]
        if (emergencySymptoms.some(symptom => symptom !== 'none')) {
          setState('emergency')
          onEmergencyDetected(newResponses)
          return
        }
      }

      // Generate next question or complete
      if (questionNumber >= 8 || shouldCompleteQuestionnaire(newResponses)) {
        setState('completed')
        onComplete(newResponses)
        return
      }

      const nextQuestion = await makeRequest(
        'generateNextQuestion',
        () => clientQuestionService.generateNextQuestion(newResponses, questionNumber, language)
      )
      
      if (!nextQuestion) {
        setState('completed')
        onComplete(newResponses)
        return
      }

      setCurrentQuestion(nextQuestion)
      setQuestionHistory(prev => [...prev, nextQuestion])
      setQuestionNumber(prev => prev + 1)
      setState('questioning')

    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Failed to process answer:', err)
        setError(t.errors.questionError)
        setState('error')
      }
    }
  }, [responses, questionHistory, questionNumber, language, onComplete, onEmergencyDetected, shouldCompleteQuestionnaire, t.errors.questionError, makeRequest])

  const retryGeneration = useCallback(() => {
    setState('questioning')
    setError('')
  }, [])

  // Back button functionality
  const handleGoBack = useCallback(() => {
    if (questionNumber <= 1 || questionHistory.length <= 1) {
      return
    }

    // Remove the last response and question
    const newResponses = responses.slice(0, -1)
    const newQuestionHistory = questionHistory.slice(0, -1)
    const newQuestionNumber = questionNumber - 1

    setResponses(newResponses)
    setQuestionHistory(newQuestionHistory)
    setQuestionNumber(newQuestionNumber)
    setCurrentQuestion(newQuestionHistory[newQuestionHistory.length - 1])
    setCanGoBack(newQuestionNumber > 1)
    setState('questioning')
  }, [questionNumber, questionHistory, responses])

  // Update canGoBack when questionNumber changes
  useEffect(() => {
    setCanGoBack(questionNumber > 1)
  }, [questionNumber])

  // Memoize expensive computations
  const progressPercentage = useMemo(() => {
    return Math.min((responses.length / 8) * 100, 100)
  }, [responses.length])


  // Memoize the render state function to prevent unnecessary re-renders
  const renderState = useCallback(() => {
    switch (state) {
      case 'initializing':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
          >
            <Card className="max-w-lg lg:max-w-xl mx-auto bg-white/90 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="mb-6">
                  {/* Modern animated loader */}
                  <div className="relative mx-auto w-16 h-16 mb-4">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-lg"
                      animate={{ 
                        scale: [1, 1.1, 1], 
                        opacity: [0.8, 1, 0.8],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 className="h-6 w-6 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                <motion.h3 
                  className="text-xl sm:text-2xl font-bold text-gray-900 mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {t.questionnaire.preparing}
                </motion.h3>
                <motion.p 
                  className="text-base text-gray-600 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {t.questionnaire.generating}
                </motion.p>
                
                {/* Modern progress indicator */}
                <div className="space-y-4">
                  <div className="w-full bg-gray-200/60 rounded-full h-2 overflow-hidden shadow-inner">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-sm"
                      initial={{ width: '0%' }}
                      animate={{ width: '70%' }}
                      transition={{ duration: 2.5, ease: "easeOut" }}
                    />
                  </div>
                  
                  {/* Modern loading dots */}
                  <div className="flex justify-center space-x-2">
                    {[0, 1, 2].map((index) => (
                      <motion.div 
                        key={index}
                        className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.4, 1, 0.4]
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )

      case 'questioning':
        return currentQuestion ? (
          <DynamicQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            questionNumber={questionNumber}
            totalQuestions={8}
            previousResponses={responses}
            onGoBack={handleGoBack}
            canGoBack={canGoBack}
          />
        ) : null

      case 'generating':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="max-w-lg mx-auto bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
              <CardContent className="p-4 text-center">
                <div className="mb-4">
                  {/* Compact AI processing loader */}
                  <div className="relative mx-auto w-12 h-12 mb-3">
                    <motion.div
                      className="absolute inset-0 bg-green-500 rounded-full"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.9, 1, 0.9]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                      >
                        <Brain className="h-5 w-5 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {t.questionnaire.analyzing}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {t.questionnaire.generatingAssessment}
                </p>
                
                {/* Compact progress with AI indicator */}
                <div className="space-y-3">
                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      className="h-full bg-green-500 rounded-full"
                      initial={{ width: '30%' }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 2.5, ease: "easeOut" }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity
                      }}
                    >
                      <Sparkles className="h-4 w-4 text-blue-500" />
                    </motion.div>
                    <span className="text-xs font-medium">AI processing...</span>
                  </div>
                  
                  {/* Compact processing steps indicator */}
                  <div className="flex justify-center space-x-1">
                    {[0, 1, 2].map((index) => (
                      <motion.div 
                        key={index}
                        className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 1, 0.3]
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: index * 0.1
                        }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )

      case 'completed':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
          >
            <Card className={`max-w-2xl mx-auto bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-xl rounded-2xl overflow-hidden`}>
              <CardContent className={designTokens.spacing.lg + " text-center"}>
                <div className="mb-8">
                  <motion.div 
                    className="relative mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                  >
                    <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center relative z-10">
                      <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                    <motion.div 
                      className="absolute inset-0 w-20 h-20 mx-auto bg-green-400 rounded-full opacity-20"
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className={designTokens.typography.h1 + " mb-4"}>
                    {t.questionnaire.completed}
                  </h3>
                  <p className={designTokens.typography.body + " mb-8"}>
                    {t.questionnaire.generatingAssessment}
                  </p>
                  <motion.div 
                    className="bg-white/80 rounded-2xl px-8 py-4 inline-block border border-green-200"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span className={designTokens.typography.body + " font-semibold"}>
                        {session.responses.length} {t.questionnaire.questionsAnswered}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )

      case 'emergency':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
          >
            <Card className={designTokens.cards.emergency + " max-w-2xl mx-auto overflow-hidden"}>
              <CardContent className={designTokens.spacing.lg + " text-center"}>
                <div className="mb-8">
                  <motion.div 
                    className="relative mb-6"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <div className={designTokens.iconContainers.emergency + " mx-auto"}>
                      <AlertTriangle className="h-10 w-10 text-white animate-pulse" />
                    </div>
                    <motion.div 
                      className="absolute inset-0 w-20 h-20 mx-auto bg-red-400 rounded-full opacity-30"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-red-800 mb-4">
                    🚨 {t.emergency.alert}
                  </h3>
                  <p className="text-red-700 text-lg leading-relaxed mb-8">
                    {t.emergency.message}
                  </p>
                  <motion.div 
                    className="bg-red-100 border border-red-300 rounded-2xl px-8 py-4 inline-block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-700" />
                      <span className="text-red-800 font-bold">
                        {t.emergency.call911}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )

      case 'error':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
          >
            <Card className={`max-w-2xl mx-auto bg-gradient-to-br from-amber-50 to-orange-50 border-0 shadow-lg rounded-2xl`}>
              <CardContent className={designTokens.spacing.md + " text-center"}>
                <div className="mb-8">
                  <motion.div 
                    className={designTokens.iconContainers.warning + " mx-auto mb-4"}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <AlertTriangle className="h-8 w-8 text-white" />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className={designTokens.typography.h2 + " mb-4"}>
                    {t.common.error}
                  </h3>
                  <p className={designTokens.typography.body + " mb-8"}>{error}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Button
                        onClick={retryGeneration}
                        className={designTokens.buttons.emergency + " px-6 py-3"}
                      >
                        {t.questions.tryAgain}
                      </Button>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Button
                        onClick={initializeQuestionnaire}
                        className={designTokens.buttons.secondary + " px-6 py-3"}
                      >
                        {t.questions.startOver}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )

      default:
        return null
    }
  }, [state, currentQuestion, questionNumber, responses, session, t, error, retryGeneration, initializeQuestionnaire, progressPercentage, handleAnswer, handleGoBack, canGoBack]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl lg:max-w-4xl mx-auto">
        <div className="space-y-4 sm:space-y-6">
          <AnimatePresence mode="wait">
            {renderState()}
          </AnimatePresence>

          {/* Modern Progress indicator */}
          {state === 'questioning' && responses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="max-w-lg lg:max-w-xl mx-auto"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 shadow-lg text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-gray-800">
                    {responses.length} {t.questionnaire.questionsAnswered}
                  </p>
                </div>
                
                {/* Modern progress bar */}
                <div className="space-y-3">
                  <div className="w-full bg-gray-200/60 rounded-full h-3 overflow-hidden shadow-inner">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-sm"
                      initial={{ width: '0%' }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  
                  {/* Progress percentage */}
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span className="font-medium">Progress</span>
                    <span className="font-bold text-blue-600">{Math.round(progressPercentage)}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}