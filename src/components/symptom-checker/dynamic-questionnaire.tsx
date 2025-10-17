'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Question, QuestionResponse, QuestionnaireSession } from '@/types/dynamic-questionnaire'
import { clientQuestionService } from '@/services/client-question-service'
import { DynamicQuestion } from './dynamic-question'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { useLanguage, useTranslations } from '@/contexts/language-context'
import { CheckCircle, AlertTriangle, Shield, Heart } from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { motion, AnimatePresence } from 'framer-motion'
import { medicalDesignTokens as designTokens } from '@/lib/design-tokens'
import { useScrollToTop } from '@/hooks/use-scroll-to-top'
import { useNavigationConfirmation } from '@/hooks/use-navigation-lock'

interface DynamicQuestionnaireProps {
  onComplete: (responses: QuestionResponse[]) => void
  onEmergencyDetected: (responses: QuestionResponse[]) => void
  initialTopic?: string
  initialQuery?: string
  onBackToHome?: () => void
  allowNavigation?: boolean
}

type QuestionnaireState = 'initializing' | 'questioning' | 'generating' | 'completed' | 'emergency' | 'error'

export function DynamicQuestionnaire({ 
  onComplete, 
  onEmergencyDetected, 
  initialTopic, 
  initialQuery, 
  onBackToHome,
  allowNavigation = false 
}: DynamicQuestionnaireProps) {
  const [state, setState] = useState<QuestionnaireState>('initializing')
  const [responses, setResponses] = useState<QuestionResponse[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [questionHistory, setQuestionHistory] = useState<Question[]>([])
  const [error, setError] = useState<string>('')
  const [questionNumber, setQuestionNumber] = useState(1)
  const [canGoBack, setCanGoBack] = useState(false)
  const { language } = useLanguage()
  const t = useTranslations()
  
  // Navigation lock to prevent accidental exits during questionnaire
  const isQuestionnaireActive = !allowNavigation && (
    state === 'questioning' || 
    state === 'generating' || 
    (responses.length > 0 && state !== 'completed' && state !== 'error')
  )

  const {
    showDialog: showNavigationDialog,
    handleConfirmExit,
    handleCancelExit
  } = useNavigationConfirmation({
    isActive: isQuestionnaireActive,
    onConfirmExit: () => {
      // Clear questionnaire data and navigate home
      setResponses([])
      setCurrentQuestion(null)
      setQuestionHistory([])
      setState('initializing')
      onBackToHome?.()
    },
    onCancelExit: () => {
      // Just close the dialog, stay in questionnaire
    }
  })
  
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
      
      // Check if this is an image analysis flow
      const imageTypes = ['mri', 'ct_scan', 'xray', 'ultrasound', 'pathology', 'general']
      const isImageAnalysis = initialTopicRef.current && imageTypes.includes(initialTopicRef.current)
      
      if (isImageAnalysis) {
        // For image analysis, start directly with the image upload question
        const imageQuestion = await makeRequest(
          'generateInitialQuestion',
          () => clientQuestionService.generateInitialQuestion(language, initialTopicRef.current!)
        )
        
        setCurrentQuestion(imageQuestion)
        setQuestionHistory([imageQuestion])
        setQuestionNumber(1)
        setState('questioning')
      } else if (initialTopicRef.current || initialQueryRef.current) {
        // For other topics, add the initial response and generate next question
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
  useScrollToTop([state, questionNumber])

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
    // Check if this is an image analysis flow
    const imageTypes = ['mri', 'ct_scan', 'xray', 'ultrasound', 'pathology', 'general']
    const isImageAnalysis = initialTopicRef.current && imageTypes.includes(initialTopicRef.current)
    
    if (isImageAnalysis) {
      // For image analysis, complete after we have the image and a few follow-up questions
      const hasImage = responses.some(r => r.imageData)
      const hasFollowUpQuestions = responses.length >= 2 // Image + at least 1 follow-up
      
      return hasImage && hasFollowUpQuestions
    } else {
      // Complete if we have basic info and sufficient symptom details
      const hasBasicInfo = responses.some(r => r.questionId === 'initial_symptom')
      const hasEnoughDetails = responses.length >= 4
      
      return hasBasicInfo && hasEnoughDetails
    }
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

      // Check if this is an image analysis flow for different completion criteria
      const imageTypes = ['mri', 'ct_scan', 'xray', 'ultrasound', 'pathology', 'general']
      const isImageAnalysis = initialTopicRef.current && imageTypes.includes(initialTopicRef.current)
      
      // Generate next question or complete
      const maxQuestions = isImageAnalysis ? 3 : 8 // Shorter questionnaire for image analysis
      if (questionNumber >= maxQuestions || shouldCompleteQuestionnaire(newResponses)) {
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
    const imageTypes = ['mri', 'ct_scan', 'xray', 'ultrasound', 'pathology', 'general']
    const isImageAnalysis = initialTopicRef.current && imageTypes.includes(initialTopicRef.current)
    const totalQuestions = isImageAnalysis ? 3 : 8
    return Math.min((responses.length / totalQuestions) * 100, 100)
  }, [responses.length])


  // Memoize the render state function to prevent unnecessary re-renders
  const renderState = useCallback(() => {
    switch (state) {
      case 'initializing':
        return (
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
        )

      case 'questioning':
        return currentQuestion ? (
          <DynamicQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            questionNumber={questionNumber}
            totalQuestions={(() => {
              const imageTypes = ['mri', 'ct_scan', 'xray', 'ultrasound', 'pathology', 'general']
              const isImageAnalysis = initialTopicRef.current && imageTypes.includes(initialTopicRef.current)
              return isImageAnalysis ? 3 : 8
            })()}
            previousResponses={responses}
            onGoBack={handleGoBack}
            canGoBack={canGoBack}
          />
        ) : null

      case 'generating':
        return (
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
        )

      case 'completed':
        return (
          <Card className={`${designTokens.cards.success} max-w-lg mx-auto`}>
            <CardContent className={`${designTokens.spacing.md} text-center`}>
              <div className="mb-6">
                <div className={`${designTokens.iconContainers.success} w-16 h-16 mx-auto mb-4`}>
                  <CheckCircle className="h-8 w-8" />
                </div>
              </div>
              <div>
                <h3 className={`${designTokens.typography.h4} mb-3`}>
                  {t.questionnaire.completed}
                </h3>
                <p className={`${designTokens.typography.bodySecondary} mb-4`}>
                  {t.questionnaire.generatingAssessment}
                </p>
                <div className={`${designTokens.cards.clinical} px-4 py-3 inline-block`}>
                  <div className="flex items-center space-x-2">
                    <Shield className="icon-sm text-emerald-600" />
                    <span className={`${designTokens.typography.bodySmall}`}>
                      {session.responses.length} {t.questionnaire.questionsAnswered}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 'emergency':
        return (
          <Card className={`${designTokens.cards.emergency} max-w-2xl mx-auto`}>
            <CardContent className={`${designTokens.spacing.lg} text-center`}>
              <div className="mb-8">
                <div className={`${designTokens.iconContainers.emergency} w-20 h-20 mx-auto mb-6`}>
                  <AlertTriangle className="h-10 w-10" />
                </div>
              </div>
              <div>
                <h3 className={`${designTokens.typography.h2} text-red-800 mb-4`}>
                  {t.emergency.alert}
                </h3>
                <p className={`${designTokens.typography.bodyLarge} text-red-700 mb-8`}>
                  {t.emergency.message}
                </p>
                <div className={`${designTokens.alerts.emergency} inline-block`}>
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-red-700" />
                    <span className={`${designTokens.typography.emphasis} text-red-800`}>
                      {t.emergency.call911}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 'error':
        return (
          <Card className={`${designTokens.cards.warning} max-w-2xl mx-auto`}>
            <CardContent className={`${designTokens.spacing.md} text-center`}>
              <div className="mb-8">
                <div className={`${designTokens.iconContainers.warning} mx-auto mb-4`}>
                  <AlertTriangle className="h-8 w-8" />
                </div>
              </div>
              <div>
                <h3 className={`${designTokens.typography.h3} mb-4`}>
                  {t.common.error}
                </h3>
                <p className={`${designTokens.typography.body} mb-8`}>{error}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={retryGeneration}
                    className={`${designTokens.buttons.primary} px-6 py-3`}
                  >
                    {t.questions.tryAgain}
                  </Button>
                  <Button
                    onClick={initializeQuestionnaire}
                    className={`${designTokens.buttons.secondary} px-6 py-3`}
                  >
                    {t.questions.startOver}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }, [state, currentQuestion, questionNumber, responses, session, t, error, retryGeneration, initializeQuestionnaire, progressPercentage, handleAnswer, handleGoBack, canGoBack]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="min-h-screen bg-slate-50 py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        <div className={designTokens.spacing.containerLarge}>
          <div className="space-y-4 sm:space-y-6">
            {/* Single persistent container */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={state + (currentQuestion?.id || '')}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {renderState()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Confirmation Dialog */}
      <Dialog open={showNavigationDialog} onOpenChange={() => {}}>
        <DialogContent
          className="sm:max-w-md"
          handleCancelExit={handleCancelExit}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>{t.common.confirmExit || 'Confirm Exit'}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <p className="text-gray-600">
              {t.questionnaire.exitWarning ||
                "Are you sure you want to leave? Your progress will be lost and you'll need to start over."}
            </p>
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancelExit}
              className="flex-1"
            >
              {t.common.cancel || 'Cancel'}
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmExit}
              className="flex-1"
            >
              {t.common.exitQuestionnaire || 'Exit Questionnaire'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}