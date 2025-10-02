'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Question, QuestionResponse, QuestionnaireSession } from '@/types/dynamic-questionnaire'
import { clientQuestionService } from '@/services/client-question-service'
import { DynamicQuestion } from './dynamic-question'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLanguage, useTranslations } from '@/contexts/language-context'
import { CheckCircle, AlertTriangle, Shield, Heart, Clock } from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { motion, AnimatePresence } from 'framer-motion'
import { medicalDesignTokens as designTokens } from '@/lib/design-tokens'

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

  // Scroll to top when component mounts or state changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [state, questionNumber])

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

    // Scroll to top when going back
    window.scrollTo({ top: 0, behavior: 'smooth' })

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
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Card className={`${designTokens.cards.clinical} max-w-lg mx-auto`}>
              <CardContent className={`${designTokens.spacing.md} text-center`}>
                <LoadingSpinner 
                  size="medium"
                  text={t.questionnaire.preparing}
                  subtext={t.questionnaire.generating}
                  showProgress={true}
                  progress={70}
                />
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
            transition={{ duration: 0.3 }}
          >
            <Card className={`${designTokens.cards.primary} max-w-lg mx-auto`}>
              <CardContent className={`${designTokens.spacing.md} text-center`}>
                <LoadingSpinner 
                  size="medium"
                  text={t.questionnaire.analyzing}
                  subtext={t.questionnaire.generatingAssessment}
                  showProgress={true}
                  progress={85}
                />
              </CardContent>
            </Card>
          </motion.div>
        )

      case 'completed':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Card className={`${designTokens.cards.success} max-w-lg mx-auto`}>
              <CardContent className={`${designTokens.spacing.md} text-center`}>
                <div className="mb-6">
                  <motion.div 
                    className="relative mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, ease: "easeOut" }}
                  >
                    <div className={`${designTokens.iconContainers.success} w-16 h-16 mx-auto`}>
                      <CheckCircle className="h-8 w-8" />
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className={`${designTokens.typography.h4} mb-3`}>
                    {t.questionnaire.completed}
                  </h3>
                  <p className={`${designTokens.typography.bodySecondary} mb-4`}>
                    {t.questionnaire.generatingAssessment}
                  </p>
                  <div className={`${designTokens.cards.clinical} px-4 py-3 inline-block`}>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-emerald-600" />
                      <span className={`${designTokens.typography.bodySmall}`}>
                        {session.responses.length} {t.questionnaire.questionsAnswered}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )

      case 'emergency':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Card className={`${designTokens.cards.emergency} max-w-2xl mx-auto`}>
              <CardContent className={`${designTokens.spacing.lg} text-center`}>
                <div className="mb-8">
                  <motion.div 
                    className="relative mb-6"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <div className={`${designTokens.iconContainers.emergency} w-20 h-20 mx-auto`}>
                      <AlertTriangle className="h-10 w-10" />
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className={`${designTokens.typography.h2} text-red-800 mb-4`}>
                    {t.emergency.alert}
                  </h3>
                  <p className={`${designTokens.typography.bodyLarge} text-red-700 mb-8`}>
                    {t.emergency.message}
                  </p>
                  <motion.div 
                    className={`${designTokens.alerts.emergency} inline-block`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Heart className="h-5 w-5 text-red-700" />
                      <span className={`${designTokens.typography.emphasis} text-red-800`}>
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
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Card className={`${designTokens.cards.warning} max-w-2xl mx-auto`}>
              <CardContent className={`${designTokens.spacing.md} text-center`}>
                <div className="mb-8">
                  <div className={`${designTokens.iconContainers.warning} mx-auto mb-4`}>
                    <AlertTriangle className="h-8 w-8" />
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className={`${designTokens.typography.h3} mb-4`}>
                    {t.common.error}
                  </h3>
                  <p className={`${designTokens.typography.body} mb-8`}>{error}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Button
                        onClick={retryGeneration}
                        className={`${designTokens.buttons.primary} px-6 py-3`}
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
                        className={`${designTokens.buttons.secondary} px-6 py-3`}
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
    <div className="min-h-screen bg-slate-50 py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className={designTokens.spacing.containerLarge}>
        <div className="space-y-4 sm:space-y-6">
          <AnimatePresence mode="wait">
            {renderState()}
          </AnimatePresence>

          {/* Medical Progress indicator */}
          {state === 'questioning' && responses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="max-w-lg lg:max-w-xl mx-auto"
            >
              <div className={`${designTokens.cards.clinical} p-4 sm:p-6 text-center`}>
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className={designTokens.iconContainers.primary}>
                    <Clock className="h-4 w-4" />
                  </div>
                  <p className={`${designTokens.typography.emphasis}`}>
                    {responses.length} {t.questionnaire.questionsAnswered}
                  </p>
                </div>
                
                {/* Medical progress bar */}
                <div className="space-y-3">
                  <div className={designTokens.progress.barLarge}>
                    <motion.div 
                      className={designTokens.progress.fill}
                      initial={{ width: '0%' }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  
                  {/* Progress percentage */}
                  <div className="flex justify-between items-center">
                    <span className={designTokens.typography.label}>Assessment Progress</span>
                    <span className={`${designTokens.typography.emphasis} text-blue-600`}>
                      {Math.round(progressPercentage)}%
                    </span>
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