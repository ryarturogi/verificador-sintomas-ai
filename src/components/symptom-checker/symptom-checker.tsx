'use client'

import { useState, useEffect } from 'react'
import { AssessmentResult } from '@/types/symptom-checker'
import { QuestionResponse } from '@/types/dynamic-questionnaire'
import { clientSymptomAnalyzer } from '@/services/client-symptom-analyzer'
import { DynamicQuestionnaire } from './dynamic-questionnaire'
import { AssessmentResults } from './assessment-results'
import { EmergencyAlert } from './emergency-alert'
import { DisclaimerModal } from './disclaimer-modal'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { useTranslations, useLanguage } from '@/contexts/language-context'
import { AlertTriangle, Settings } from 'lucide-react'
import { LoadingCard } from '@/components/ui/loading-spinner'
import { motion, AnimatePresence } from 'framer-motion'

type AppState = 'disclaimer' | 'questionnaire' | 'loading' | 'results' | 'error' | 'config-error' | 'declined'

export function SymptomChecker() {
  const [state, setState] = useState<AppState>('disclaimer')
  const [results, setResults] = useState<AssessmentResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false)
  const [responses, setResponses] = useState<QuestionResponse[]>([])
  const t = useTranslations()
  const { language } = useLanguage()

  // Scroll to top when component mounts or state changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [state])

  useEffect(() => {
    // Check if disclaimer was previously accepted
    const checkDisclaimerStatus = () => {
      try {
        const accepted = localStorage.getItem('disclaimer-accepted')
        if (accepted === 'true') {
          setState('questionnaire')
        } else {
          setState('disclaimer')
        }
      } catch {
        // If localStorage is not available, show disclaimer
        console.warn('localStorage not available, showing disclaimer')
        setState('disclaimer')
      }
    }
    
    checkDisclaimerStatus()
  }, [])

  useEffect(() => {
    // Simple check to show config screen if no API key is detected
    // The actual validation happens when the API call is made
    const checkConfig = () => {
      try {
        // This will trigger the error in OpenAI lib if no API key is set
        fetch('/api/health-check', { method: 'HEAD' }).catch(() => {
          // If health check fails, assume we need configuration
        })
      } catch {
        // Config error will be caught during actual API calls
      }
    }
    checkConfig()
  }, [])

  const handleQuestionnaireComplete = async (questionnaireResponses: QuestionResponse[]) => {
    setState('loading')
    setError(null)
    setResponses(questionnaireResponses)

    try {
      const result = await clientSymptomAnalyzer.analyzeResponses(questionnaireResponses, language)
      
      if (result.emergencyWarning) {
        setShowEmergencyAlert(true)
      }
      
      setResults(result)
      setState('results')
    } catch (err) {
      console.error('Analysis error:', err)
      
      if (err instanceof Error) {
        if (err.message.includes('API key')) {
          setState('config-error')
          return
        }
        setError(err.message)
      } else {
        setError(t.errors.analysisError)
      }
      
      setState('error')
    }
  }

  const handleEmergencyDetected = (questionnaireResponses: QuestionResponse[]) => {
    setResponses(questionnaireResponses)
    setShowEmergencyAlert(true)
    
    // Generate emergency result
    const emergencyResult: AssessmentResult = {
      severity: 'emergency',
      possibleConditions: [],
      recommendations: [t.emergency.call911, t.emergency.findER],
      emergencyWarning: true,
      emergencyMessage: t.emergency.message,
      followUpAdvice: t.emergency.doNotDelay,
    }
    
    setResults(emergencyResult)
    setState('results')
  }

  const handleDisclaimerAccept = () => {
    localStorage.setItem('disclaimer-accepted', 'true')
    setState('questionnaire')
  }

  const handleDisclaimerDecline = () => {
    setState('declined')
  }

  const handleNewAssessment = () => {
    setState('questionnaire')
    setResults(null)
    setError(null)
    setShowEmergencyAlert(false)
    setResponses([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-end mb-4">
            <LanguageSwitcher />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t.title}
          </h1>
          <p className="text-lg text-gray-600">
            {t.subtitle}
          </p>
        </motion.header>


        {/* Disclaimer Modal - Always render but control visibility */}
        <DisclaimerModal
          isOpen={state === 'disclaimer'}
          onAccept={handleDisclaimerAccept}
          onDecline={handleDisclaimerDecline}
        />

        <AnimatePresence mode="wait">

          {state === 'declined' && (
            <motion.div
              key="declined"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <AlertDescription className="text-red-800">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                            <p className="font-semibold text-lg">{t.medicalDisclaimer.declinedTitle}</p>
                          </div>
                          <p className="text-sm mb-4">
                            {t.medicalDisclaimer.declinedMessage}
                          </p>
                        </div>
                        
                        <Button 
                          onClick={() => window.location.reload()}
                          className="mt-4"
                        >
                          {t.errors.refreshPage}
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {state === 'config-error' && (
            <motion.div
              key="config-error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <Alert className="border-amber-200 bg-amber-50">
                    <Settings className="h-5 w-5 text-amber-600" />
                    <AlertDescription className="text-amber-800">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Settings className="h-5 w-5 text-blue-600" />
                            <p className="font-semibold text-lg">{t.errors.configRequired}</p>
                          </div>
                          <p className="text-sm mb-4">
                            {t.errors.apiKeyInstructions}
                          </p>
                        </div>
                        
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                          <p className="mb-2"># Add this to your .env.local file:</p>
                          <p>OPENAI_API_KEY=your_openai_api_key_here</p>
                        </div>
                        
                        <div className="text-sm space-y-2">
                          <p><strong>Steps to get started:</strong></p>
                          <ol className="list-decimal list-inside space-y-1 ml-4">
                            <li>{t.errors.getApiKey} <a href="https://platform.openai.com/api-keys" target="_blank" className="text-blue-600 hover:underline">OpenAI Platform</a></li>
                            <li>{t.errors.addToEnv} <code className="bg-gray-200 px-1 rounded">.env.local</code></li>
                            <li>{t.errors.restartServer}</li>
                          </ol>
                        </div>
                        
                        <Button 
                          onClick={() => window.location.reload()}
                          className="mt-4"
                        >
                          {t.errors.refreshPage}
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </motion.div>
          )}
          
          {state === 'questionnaire' && (
            <motion.div
              key="questionnaire"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <DynamicQuestionnaire 
                onComplete={handleQuestionnaireComplete}
                onEmergencyDetected={handleEmergencyDetected}
              />
            </motion.div>
          )}

          {state === 'loading' && (
            <LoadingCard
              title={t.questionnaire.analyzing}
              description={t.questionnaire.generatingAssessment}
              showSteps={true}
              steps={[
                `${t.questionnaire.processing} ${responses.length} ${t.questionnaire.questionsAnswered}`,
                t.questionnaire.checkingDatabases,
                t.questionnaire.generatingAssessment
              ]}
            />
          )}

          {state === 'results' && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AssessmentResults 
                result={results}
                onNewAssessment={handleNewAssessment}
              />
            </motion.div>
          )}

          {state === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="max-w-md mx-auto">
                <CardContent className="p-8">
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      <p className="font-semibold mb-2">{t.common.error}</p>
                      <p className="text-sm mb-4">{error}</p>
                      <Button
                        onClick={handleNewAssessment}
                        variant="link"
                        className="text-blue-600 hover:text-blue-800 underline text-sm p-0 h-auto"
                      >
                        {t.questions.tryAgain}
                      </Button>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <EmergencyAlert
          isOpen={showEmergencyAlert}
          onClose={() => setShowEmergencyAlert(false)}
          message={results?.emergencyMessage}
        />

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-xs text-gray-500"
        >
          <p>
            {t.homepage.footerDisclaimer}
          </p>
          <p className="mt-1">
            {t.homepage.consultProfessionals}
          </p>
        </motion.footer>
      </div>
    </div>
  )
}