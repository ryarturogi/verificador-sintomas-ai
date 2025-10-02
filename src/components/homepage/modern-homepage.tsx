'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLanguage } from '@/contexts/language-context'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SearchAutocomplete } from './search-autocomplete'
import { DynamicQuestionnaire } from '@/components/symptom-checker/dynamic-questionnaire'
import { AssessmentResults } from '@/components/symptom-checker/assessment-results'
import { EmergencyAlert } from '@/components/symptom-checker/emergency-alert'
import { DisclaimerModal } from '@/components/symptom-checker/disclaimer-modal'
import { clientSymptomAnalyzer } from '@/services/client-symptom-analyzer'
import { QuestionResponse } from '@/types/dynamic-questionnaire'
import { AssessmentResult } from '@/types/symptom-checker'
import { 
  Heart, 
  Brain, 
  Activity, 
  Shield, 
  Stethoscope,
  ArrowLeft,
  UserCheck,
  ClipboardList,
  FileText,
  Phone,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react'
import { LoadingCard } from '@/components/ui/loading-spinner'
import { motion, AnimatePresence } from 'framer-motion'

type AppState = 'disclaimer' | 'homepage' | 'questionnaire' | 'loading' | 'results' | 'error' | 'declined'

export function ModernHomepage() {
  const [appState, setAppState] = useState<AppState>('disclaimer')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [results, setResults] = useState<AssessmentResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false)
  const [responses, setResponses] = useState<QuestionResponse[]>([])
  const t = useTranslations()
  const { language } = useLanguage()

  // Check disclaimer status on component mount
  useEffect(() => {
    const checkDisclaimerStatus = () => {
      try {
        const accepted = localStorage.getItem('disclaimer-accepted')
        if (accepted === 'true') {
          setAppState('homepage')
        } else {
          setAppState('disclaimer')
        }
      } catch {
        setAppState('disclaimer')
      }
    }
    
    checkDisclaimerStatus()
  }, [])

  const handleDisclaimerAccept = () => {
    localStorage.setItem('disclaimer-accepted', 'true')
    setAppState('homepage')
  }

  const handleDisclaimerDecline = () => {
    setAppState('declined')
  }

  const handleStartAssessment = (topic?: string, initialQuery?: string) => {
    setSelectedTopic(topic || null)
    if (initialQuery) {
      setSearchQuery(initialQuery)
    }
    setAppState('questionnaire')
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      handleStartAssessment('search', searchQuery)
    }
  }

  const handleSearchSelect = (selectedQuery: string) => {
    setSearchQuery(selectedQuery)
    handleStartAssessment('search', selectedQuery)
  }

  const handleBackToHome = () => {
    setAppState('homepage')
    setSelectedTopic(null)
    setSearchQuery('')
    setResults(null)
    setError(null)
    setShowEmergencyAlert(false)
    setResponses([])
  }

  const handleQuestionnaireComplete = async (questionnaireResponses: QuestionResponse[]) => {
    setAppState('loading')
    setError(null)
    setResponses(questionnaireResponses)

    try {
      const result = await clientSymptomAnalyzer.analyzeResponses(questionnaireResponses, language)
      
      if (result.emergencyWarning) {
        setShowEmergencyAlert(true)
      }
      
      setResults(result)
      setAppState('results')
    } catch (err) {
      console.error('Analysis error:', err)
      
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred while analyzing your responses.')
      }
      
      setAppState('error')
    }
  }

  const handleEmergencyDetected = (questionnaireResponses: QuestionResponse[]) => {
    setResponses(questionnaireResponses)
    setShowEmergencyAlert(true)
    
    // Generate emergency result
    const emergencyResult: AssessmentResult = {
      severity: 'emergency',
      possibleConditions: [],
      recommendations: ['Call 911 immediately', 'Go to the nearest emergency room'],
      emergencyWarning: true,
      emergencyMessage: 'Emergency symptoms detected. Seek immediate medical attention.',
      followUpAdvice: 'Do not delay seeking emergency medical care.',
    }
    
    setResults(emergencyResult)
    setAppState('results')
  }

  const healthTopics = [
    {
      id: 'general',
      title: t.healthTopics.physicalSymptoms,
      description: t.healthTopics.physicalDescription,
      icon: Activity,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      tags: [t.healthTopics.tags.pain, t.healthTopics.tags.fever, t.healthTopics.tags.fatigue]
    },
    {
      id: 'mental',
      title: t.healthTopics.mentalWellness,
      description: t.healthTopics.mentalDescription,
      icon: Brain,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      tags: [t.healthTopics.tags.anxiety, t.healthTopics.tags.mood, t.healthTopics.tags.stress]
    },
    {
      id: 'heart',
      title: t.healthTopics.cardiacSymptoms,
      description: t.healthTopics.cardiacDescription,
      icon: Heart,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      tags: [t.healthTopics.tags.chest, t.healthTopics.tags.palpitations, t.healthTopics.tags.pressure]
    },
    {
      id: 'chat',
      title: t.healthTopics.guidedAssessment,
      description: t.healthTopics.guidedDescription,
      icon: Stethoscope,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      tags: [t.healthTopics.tags.ai, t.healthTopics.tags.personalized, t.healthTopics.tags.adaptive]
    },
    {
      id: 'preventive',
      title: t.healthTopics.generalCheckup,
      description: t.healthTopics.generalDescription,
      icon: Shield,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      tags: [t.healthTopics.tags.prevention, t.healthTopics.tags.complete, t.healthTopics.tags.wellness]
    },
    {
      id: 'emergency',
      title: t.homepage.emergencyAssessment,
      description: t.homepage.emergencyDescription,
      icon: AlertTriangle,
      iconColor: 'text-red-700',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-300',
      isEmergency: true,
      tags: [t.homepage.emergencyTags.emergency, t.homepage.emergencyTags.critical, t.homepage.emergencyTags.immediate]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Disclaimer Modal - Always render but control visibility */}
      <DisclaimerModal
        isOpen={appState === 'disclaimer'}
        onAccept={handleDisclaimerAccept}
        onDecline={handleDisclaimerDecline}
      />

      {/* Declined State */}
      {appState === 'declined' && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-red-800">{t.medicalDisclaimer.declinedTitle}</h2>
                <p className="text-red-700">
                  {t.medicalDisclaimer.declinedMessage}
                </p>
                <Button 
                  onClick={() => window.location.reload()}
                  className="mt-4"
                >
                  {t.errors.refreshPage}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main App Content - Only show if not disclaimer or declined */}
      {appState !== 'disclaimer' && appState !== 'declined' && (
        <>
          {/* Modern Glass Navigation Header */}
          <nav className="backdrop-blur-md bg-white/80 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Button 
                onClick={handleBackToHome}
                variant="ghost"
                className="flex items-center space-x-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 p-0 h-auto"
              >
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <span>MedicalAI</span>
              </Button>
              {appState !== 'homepage' && (
                <Button
                  variant="ghost"
                  onClick={handleBackToHome}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-xl transition-all duration-300"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>{t.navigation.home}</span>
                </Button>
              )}
              <div className="hidden md:flex space-x-6">
                <Button variant="ghost" className="text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium hover:bg-white/50 px-3 py-2 rounded-lg">
                  {t.navigation.questionnaires}
                </Button>
                <Button variant="ghost" className="text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium hover:bg-white/50 px-3 py-2 rounded-lg">
                  {t.navigation.symptoms}
                </Button>
                <Button variant="ghost" className="text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium hover:bg-white/50 px-3 py-2 rounded-lg">
                  {t.navigation.medicalAI}
                </Button>
                <Button variant="ghost" className="text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium hover:bg-white/50 px-3 py-2 rounded-lg">
                  {t.navigation.help}
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <div className="flex items-center space-x-2 bg-white/50 px-4 py-2 rounded-xl backdrop-blur-sm">
                <UserCheck className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-700 hidden sm:block font-medium">Patient Portal</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Medical Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {appState === 'homepage' && (
            <motion.div
              key="homepage"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Modern Hero Section - Two Column Layout */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="min-h-screen flex items-start relative py-8 sm:py-12 md:py-16 lg:py-20"
              >
                {/* Enhanced Background Elements */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div 
                    className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"
                    animate={{ 
                      scale: [1, 0.8, 1],
                      opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{ 
                      duration: 10, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                  />
                  <motion.div 
                    className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{ 
                      duration: 12, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 4
                    }}
                  />
                  <motion.div 
                    className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-400/10 rounded-full blur-3xl"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </div>

                <div className="relative z-10 w-full">
                  {/* Main Hero Section - Responsive Layout */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 2xl:gap-12 xl:items-start w-full">
                    {/* Left Column - Main Content */}
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-center xl:text-left"
                    >
                      <motion.h1 
                        className="text-4xl xl:text-6xl font-bold mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        <motion.span 
                          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                          animate={{ 
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          {t.homepage.mainTitle}
                        </motion.span>
                      </motion.h1>
                      <motion.p 
                        className="text-xl text-gray-600 leading-relaxed font-light mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        {t.homepage.mainSubtitle}
                      </motion.p>
                      
                      {/* Enhanced Description */}
                      <div className="mb-8">
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">
                          Get instant, personalized health insights powered by advanced AI technology. 
                          Our intelligent questionnaire adapts to your responses, providing accurate 
                          medical assessments tailored to your specific symptoms.
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Instant Results</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Privacy Protected</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>{t.homepage.medicalAccuracy}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced Status Indicators */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-wrap gap-4 mb-8"
                      >
                        {[
                          { icon: CheckCircle, label: t.homepage.aiPowered, color: "green", bgColor: "bg-green-100", textColor: "text-green-600" },
                          { icon: Shield, label: t.homepage.hipaaCompliant, color: "blue", bgColor: "bg-blue-100", textColor: "text-blue-600" },
                          { icon: FileText, label: t.homepage.medicalGrade, color: "purple", bgColor: "bg-purple-100", textColor: "text-purple-600" }
                        ].map((item, index) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                            whileHover={{ 
                              scale: 1.05, 
                              y: -2,
                              transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-3 bg-white/70 backdrop-blur-md px-4 py-3 rounded-xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                          >
                            <motion.div 
                              className={`p-2 ${item.bgColor} rounded-lg group-hover:scale-110 transition-transform duration-300`}
                              whileHover={{ rotate: 5 }}
                            >
                              <item.icon className={`h-4 w-4 ${item.textColor}`} />
                            </motion.div>
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                              {item.label}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Enhanced Trust Indicators */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="grid grid-cols-3 gap-6 mb-8"
                      >
                        {[
                          { value: "98%", label: t.homepage.accuracyRate, color: "text-blue-600", bgColor: "bg-blue-50" },
                          { value: "50K+", label: t.homepage.assessments, color: "text-green-600", bgColor: "bg-green-50" },
                          { value: "24/7", label: t.homepage.available, color: "text-purple-600", bgColor: "bg-purple-50" }
                        ].map((stat, index) => (
                          <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                            whileHover={{ 
                              scale: 1.05, 
                              y: -3,
                              transition: { duration: 0.2 }
                            }}
                            className={`text-center p-4 rounded-xl ${stat.bgColor} border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                          >
                            <motion.div 
                              className={`text-2xl font-bold ${stat.color} mb-1 group-hover:scale-110 transition-transform duration-300`}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ 
                                duration: 0.8, 
                                delay: 0.8 + index * 0.2,
                                type: "spring",
                                stiffness: 200
                              }}
                            >
                              {stat.value}
                            </motion.div>
                            <div className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                              {stat.label}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Enhanced Call to Action */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            onClick={handleSearch}
                            className="relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                          >
                            <motion.span
                              className="relative z-10 flex items-center space-x-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1 }}
                            >
                              <span>Start Free Assessment</span>
                              <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ 
                                  duration: 1.5, 
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                →
                              </motion.div>
                            </motion.span>
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: "100%" }}
                              transition={{ duration: 0.6 }}
                            />
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            variant="outline"
                            className="border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-blue-50 group"
                          >
                            <span className="flex items-center space-x-2">
                              <span>Learn More</span>
                              <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ 
                                  duration: 2, 
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                ℹ️
                              </motion.div>
                            </span>
                          </Button>
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    {/* Enhanced Right Column - Search Panel */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="p-6 bg-white/80 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl hover:shadow-3xl transition-all duration-500 group">
                        <div className="text-center mb-6">
                          <motion.div
                            initial={{ scale: 0.9, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200 }}
                            whileHover={{ 
                              scale: 1.1, 
                              rotate: 5,
                              transition: { duration: 0.3 }
                            }}
                            className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl mb-3 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                          >
                            <motion.div
                              animate={{ 
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, 0]
                              }}
                              transition={{ 
                                duration: 2, 
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <Stethoscope className="h-7 w-7 text-white" />
                            </motion.div>
                          </motion.div>
                          <motion.h2 
                            className="text-xl font-bold text-gray-900 mb-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                          >
                            {t.homepage.describeYourSymptoms}
                          </motion.h2>
                          <motion.p 
                            className="text-sm text-gray-600"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                          >
                            {t.homepage.startMedicalAssessment}
                          </motion.p>
                        </div>
                        <div className="flex flex-col gap-4">
                          <motion.div 
                            className="relative"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                          >
                            <SearchAutocomplete
                              value={searchQuery}
                              onChange={setSearchQuery}
                              onSelect={handleSearchSelect}
                              placeholder={t.homepage.searchPlaceholder}
                              className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl pl-4 pr-4 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:border-blue-300 hover:shadow-lg"
                            />
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button 
                              onClick={handleSearch}
                              className="w-full h-12 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                            >
                              <motion.span
                                className="relative z-10 flex items-center justify-center space-x-2"
                                animate={{ opacity: [0.8, 1, 0.8] }}
                                transition={{ 
                                  duration: 2, 
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                <span>{t.homepage.assessButton}</span>
                                <motion.div
                                  animate={{ x: [0, 3, 0] }}
                                  transition={{ 
                                    duration: 1.5, 
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                  }}
                                >
                                  →
                                </motion.div>
                              </motion.span>
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.6 }}
                              />
                            </Button>
                          </motion.div>
                        </div>
                      </Card>
                    </motion.div>
                  </div>

                </div>
              </motion.div>

              {/* Modern Assessment Categories */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Medical Assessment Categories
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Choose the type of assessment that best matches your needs
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {healthTopics.map((topic, index) => (
                    <motion.div
                      key={topic.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className={`${topic.bgColor} ${topic.borderColor} ${topic.isEmergency ? 'border-2' : 'border'} h-full cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-opacity-80 group backdrop-blur-sm bg-white/60 relative z-10`}
                        onClick={() => handleStartAssessment(topic.id)}
                      >
                        <CardContent className="p-8">
                          <div className="space-y-6">
                            {/* Modern Icon and Title */}
                            <div className="flex items-start space-x-4">
                              <motion.div 
                                className={`p-4 rounded-2xl bg-white ${topic.iconColor} shadow-lg group-hover:shadow-xl transition-all duration-300 ${topic.isEmergency ? 'border-2 border-red-200' : 'border border-gray-200'}`}
                                whileHover={{ rotate: 5, scale: 1.1 }}
                              >
                                <topic.icon className="h-8 w-8" />
                              </motion.div>
                              <div className="flex-1">
                                <h3 className={`text-xl font-bold ${topic.isEmergency ? 'text-red-900' : 'text-gray-900'} leading-tight mb-2`}>
                                  {topic.title}
                                </h3>
                                {topic.isEmergency && (
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Phone className="h-4 w-4 text-red-600" />
                                    <span className="text-sm text-red-600 font-semibold">Call 911 if emergency</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Enhanced Description */}
                            <p className={`text-base leading-relaxed ${topic.isEmergency ? 'text-red-800' : 'text-gray-600'}`}>
                              {topic.description}
                            </p>
                            
                            {/* Modern Tags */}
                            {topic.tags && (
                              <div className="flex flex-wrap gap-3">
                                {topic.tags.map((tag, tagIndex) => (
                                  <span 
                                    key={tagIndex}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                                      topic.isEmergency 
                                        ? 'bg-red-200 text-red-800 hover:bg-red-300' 
                                        : 'bg-white/80 border border-gray-200 text-gray-700 hover:bg-white hover:shadow-md'
                                    }`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            {/* Modern Action Indicator */}
                            <div className="pt-4 border-t border-white/30">
                              <div className={`flex items-center justify-between text-sm font-semibold ${topic.isEmergency ? 'text-red-600' : 'text-blue-600'}`}>
                                <span>
                                  {topic.isEmergency ? t.homepage.emergencyAssessment : t.homepage.startAssessment}
                                </span>
                                <motion.div
                                  className="w-6 h-6 rounded-full bg-current flex items-center justify-center"
                                  whileHover={{ scale: 1.2 }}
                                >
                                  <span className="text-white text-xs">→</span>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Modern Information Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-20"
              >
                <Card className="max-w-5xl mx-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-white/20 shadow-2xl rounded-3xl backdrop-blur-sm">
                  <CardContent className="p-12">
                    <div className="text-center mb-12">
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl mb-6 shadow-xl"
                      >
                        <Stethoscope className="h-10 w-10 text-white" />
                      </motion.div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Advanced Medical AI Assessment
                      </h2>
                      <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        Our AI-powered system provides comprehensive symptom analysis using medical-grade algorithms to help guide your healthcare decisions.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                      <motion.div 
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="p-4 bg-green-100 rounded-2xl mx-auto mb-4 w-fit shadow-lg">
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Evidence-Based</h3>
                        <p className="text-gray-600 leading-relaxed">Analysis based on current medical literature and guidelines</p>
                      </motion.div>
                      <motion.div 
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.0 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="p-4 bg-blue-100 rounded-2xl mx-auto mb-4 w-fit shadow-lg">
                          <Shield className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Private</h3>
                        <p className="text-gray-600 leading-relaxed">Your health information is protected and confidential</p>
                      </motion.div>
                      <motion.div 
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="p-4 bg-purple-100 rounded-2xl mx-auto mb-4 w-fit shadow-lg">
                          <ClipboardList className="h-8 w-8 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive</h3>
                        <p className="text-gray-600 leading-relaxed">Detailed assessment covering all relevant symptoms</p>
                      </motion.div>
                    </div>
                    
                    <div className="text-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          onClick={() => handleStartAssessment('general')}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-12 py-4 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                          {t.homepage.startQuestionnaire}
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Modern Disclaimer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-16"
              >
                <Card className="max-w-5xl mx-auto bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 shadow-xl rounded-2xl backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-amber-100 rounded-2xl shadow-lg">
                        <Info className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-amber-900 mb-3">Medical Disclaimer</h3>
                        <p className="text-base text-amber-800 leading-relaxed">
                          This tool is for informational purposes only and does not replace professional medical advice, diagnosis, or treatment. 
                          Always consult with qualified healthcare providers for medical concerns. In case of emergency, call 911 immediately.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {appState === 'questionnaire' && (
            <motion.div
              key="questionnaire"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <DynamicQuestionnaire 
                onComplete={handleQuestionnaireComplete}
                onEmergencyDetected={handleEmergencyDetected}
                initialTopic={selectedTopic || undefined}
                initialQuery={selectedTopic === 'search' ? searchQuery : undefined}
              />
            </motion.div>
          )}

          {appState === 'loading' && (
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

          {appState === 'results' && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <AssessmentResults 
                result={results}
                onNewAssessment={handleBackToHome}
              />
            </motion.div>
          )}

          {appState === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-md mx-auto"
            >
              <Card>
                <CardContent className="p-8">
                  <div className="text-center text-red-600">
                    <p className="font-semibold mb-2">{t.common.error}</p>
                    <p className="text-sm mb-4">{error}</p>
                    <Button
                      onClick={handleBackToHome}
                      variant="outline"
                    >
                      {t.questions.tryAgain}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <EmergencyAlert
        isOpen={showEmergencyAlert}
        onClose={() => setShowEmergencyAlert(false)}
        message={results?.emergencyMessage}
      />

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-16 text-center px-6 pb-8"
      >
        <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <p className="text-sm text-gray-600 leading-relaxed">
            {t.homepage.footerDisclaimer}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {t.homepage.consultProfessionals}
          </p>
        </div>
      </motion.footer>
        </>
      )}
    </div>
  )
}