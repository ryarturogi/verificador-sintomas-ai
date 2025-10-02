'use client'

import { AssessmentResult } from '@/types/symptom-checker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTranslations } from '@/contexts/language-context'
import { 
  AlertTriangle, 
  Phone, 
  Clock, 
  TrendingUp, 
  Heart,
  AlertCircle,
  CheckCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface AssessmentResultsProps {
  result: AssessmentResult
  onNewAssessment: () => void
}

export function AssessmentResults({ result, onNewAssessment }: AssessmentResultsProps) {
  const t = useTranslations()
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'emergency':
        return 'text-red-800 from-red-100 to-red-200'
      case 'severe':
        return 'text-orange-800 from-orange-100 to-orange-200'
      case 'moderate':
        return 'text-yellow-800 from-yellow-100 to-yellow-200'
      case 'mild':
        return 'text-green-800 from-green-100 to-green-200'
      default:
        return 'text-gray-800 from-gray-100 to-gray-200'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'emergency':
        return <Phone className="h-5 w-5" />
      case 'severe':
        return <AlertTriangle className="h-5 w-5" />
      case 'moderate':
        return <AlertCircle className="h-5 w-5" />
      case 'mild':
        return <CheckCircle className="h-5 w-5" />
      default:
        return <Heart className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl lg:max-w-3xl mx-auto space-y-4 px-4 sm:px-6 py-4 sm:py-6"
      >
        {/* Emergency Alert Section */}
        <AnimatePresence>
          {result.emergencyWarning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-red-50 border-2 border-red-200 shadow-lg rounded-lg">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h2 className="text-lg font-bold text-red-800 mb-2">
                          🚨 {t.emergency.alert}
                        </h2>
                        <p className="text-red-700 text-sm leading-relaxed">
                          {result.emergencyMessage}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Button 
                          variant="destructive" 
                          className="w-full h-10 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-sm"
                          onClick={() => window.open('tel:911')}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          {t.emergency.call911}
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full h-10 border-2 border-red-300 bg-white hover:bg-red-50 rounded-lg font-semibold text-sm"
                          onClick={() => window.open('https://www.google.com/maps/search/emergency+room+near+me')}
                        >
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Find Emergency Room
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Results Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white border border-gray-200 shadow-lg rounded-lg">
            <CardHeader className="bg-blue-50 p-4 sm:p-6 border-b border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-gray-900 mb-1">
                    {t.results.assessmentResults}
                  </CardTitle>
                  <p className="text-gray-600 text-sm">{t.ai.intelligentlyGenerated}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Severity Level Section */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={`p-4 rounded-lg border ${getSeverityColor(result.severity)} bg-gradient-to-r`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      {getSeverityIcon(result.severity)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg capitalize mb-1">
                        Severity: {result.severity}
                      </h3>
                      <p className="text-xs opacity-90">
                        Assessment confidence level
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold opacity-90">•••</div>
                  </div>
                </div>
              </motion.div>

              {/* Possible Conditions Section */}
              {result.possibleConditions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="mb-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {t.results.possibleConditions}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {result.possibleConditions
                        .sort((a, b) => b.probability - a.probability)
                        .map((condition, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            whileHover={{ scale: 1.01, y: -1 }}
                            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-base text-gray-900">{condition.name}</h4>
                              <div className="text-right">
                                <span className="text-blue-600 font-bold text-base">
                                  {Math.round(condition.probability * 100)}%
                                </span>
                                <p className="text-xs text-gray-500">match</p>
                              </div>
                            </div>
                            <p className="text-gray-700 text-xs leading-relaxed mb-3">{condition.description}</p>
                            <div className="relative">
                              <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                                <motion.div 
                                  className="h-full bg-blue-500 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${condition.probability * 100}%` }}
                                  transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Recommendations Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-green-50 p-4 rounded-lg border border-green-200"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {t.results.recommendations}
                  </h3>
                </div>
                <div className="space-y-2">
                  {result.recommendations.map((recommendation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-start space-x-3 bg-white p-3 rounded-lg"
                    >
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-gray-800 font-medium leading-relaxed text-sm">{recommendation}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Follow-up Advice Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-blue-50 p-4 rounded-lg border border-blue-200"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {t.results.followUpAdvice}
                  </h3>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-gray-800 leading-relaxed font-medium text-sm">
                    {result.followUpAdvice}
                  </p>
                </div>
              </motion.div>

              {/* Disclaimer Section */}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"
              >
                <Button 
                  onClick={onNewAssessment} 
                  variant="outline" 
                  className="w-full h-10 border-2 border-gray-300 bg-white hover:bg-gray-50 rounded-lg font-semibold text-sm"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {t.results.newAssessment}
                </Button>
                <Button 
                  onClick={() => window.open('https://www.google.com/maps/search/doctor+near+me')}
                  className="w-full h-10 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-sm"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  {t.results.findProvider}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}