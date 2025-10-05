'use client'

import { useState, useEffect, useCallback } from 'react'
import { Question, QuestionOption, QuestionResponse } from '@/types/dynamic-questionnaire'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useLanguage, useTranslations } from '@/contexts/language-context'
import { Check, Sparkles, RefreshCw } from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { motion, AnimatePresence } from 'framer-motion'

interface AIAnswerSelectorProps {
  question: Question
  previousResponses: QuestionResponse[]
  selectedOptions: string[]
  onSelectionChange: (options: string[]) => void
  isMultiple?: boolean
}

export function AIAnswerSelector({
  question,
  previousResponses,
  selectedOptions,
  onSelectionChange,
  isMultiple = false
}: AIAnswerSelectorProps) {
  const [aiOptions, setAiOptions] = useState<QuestionOption[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const { language } = useLanguage()
  const t = useTranslations()

  const generateAIOptions = useCallback(async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/generate-answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestType: 'options',
          questionText: question.text,
          questionType: question.type,
          previousResponses,
          maxOptions: question.answerContext?.maxOptions || 6,
          language,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setAiOptions(data.result || [])
      } else {
        throw new Error('Failed to generate options')
      }
    } catch (error) {
      console.error('Failed to generate AI options:', error)
      setError(t.errors.analysisError)
      // Use fallback options if available
      setAiOptions(question.options || [])
    } finally {
      setIsLoading(false)
    }
  }, [question, previousResponses, language, t.errors.analysisError])

  useEffect(() => {
    if (question.generateAnswers) {
      generateAIOptions()
    }
  }, [question, language, generateAIOptions]) // Re-generate when language changes

  const handleOptionSelect = (optionValue: string) => {
    if (isMultiple) {
      // Handle multiple selection
      if (optionValue === 'none') {
        onSelectionChange(['none'])
        return
      }

      const newSelected = selectedOptions.includes(optionValue)
        ? selectedOptions.filter(opt => opt !== optionValue && opt !== 'none')
        : [...selectedOptions.filter(opt => opt !== 'none'), optionValue]
      
      onSelectionChange(newSelected)
    } else {
      // Handle single selection
      onSelectionChange([optionValue])
    }
  }

  const optionsToShow = aiOptions.length > 0 ? aiOptions : (question.options || [])

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="bg-cyan-50 border-cyan-200 shadow-sm p-6">
          <LoadingSpinner 
            size="small"
            text={t.ai.generatingOptions}
            subtext={t.ai.intelligentlyGenerated}
          />
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="space-y-2">
      {/* Ultra Compact AI header */}
      {aiOptions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between bg-cyan-50 p-2 rounded-md border border-cyan-200"
        >
          <div className="flex items-center space-x-1.5">
            <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-2.5 w-2.5 text-white" />
            </div>
            <span className="text-xs font-medium text-cyan-700">
              {t.ai.smartOptions}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={generateAIOptions}
            className="text-cyan-600 hover:bg-cyan-100 h-6 px-1.5 text-xs"
          >
            <RefreshCw className="h-2.5 w-2.5 mr-1" />
            {t.ai.refresh}
          </Button>
        </motion.div>
      )}

      {/* Ultra Compact error display */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 rounded-md p-2"
        >
          <div className="flex items-center space-x-1.5">
            <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs">!</span>
            </div>
            <span className="text-red-700 text-xs font-medium">{error}</span>
          </div>
        </motion.div>
      )}

      {/* Ultra Compact answer options */}
      <div className="space-y-1">
        <AnimatePresence>
          {optionsToShow.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
            >
              <Button
                type="button"
                onClick={() => handleOptionSelect(option.value)}
                variant={selectedOptions.includes(option.value) ? "default" : "outline"}
                className={`w-full p-2 text-left rounded-md transition-all duration-150 border relative ${
                  selectedOptions.includes(option.value)
                    ? isMultiple 
                      ? 'bg-green-50 border-green-300 text-green-800'
                      : 'bg-cyan-50 border-cyan-300 text-cyan-800'
                    : 'bg-white border-gray-200 hover:border-cyan-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-medium block truncate">
                      {option.label}
                    </span>
                  </div>
                  
                  {selectedOptions.includes(option.value) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-2 flex-shrink-0"
                    >
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        isMultiple ? 'bg-green-500' : 'bg-cyan-500'
                      }`}>
                        <Check className="h-2.5 w-2.5 text-white" />
                      </div>
                    </motion.div>
                  )}
                </div>
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Ultra Compact selected summary */}
      {isMultiple && selectedOptions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-green-50 p-2 rounded-md border border-green-200"
        >
          <div className="flex items-center space-x-1.5">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="h-2.5 w-2.5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-green-700">
                {t.ai.selected}: {selectedOptions.join(', ')}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Ultra Compact AI indicator */}
      {aiOptions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
            {t.ai.intelligentlyGenerated}
          </p>
        </motion.div>
      )}
    </div>
  )
}