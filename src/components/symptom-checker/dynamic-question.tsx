'use client'

import { useState } from 'react'
import { Question, QuestionResponse } from '@/types/dynamic-questionnaire'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Check, ArrowRight, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslations } from '@/contexts/language-context'
import { AIAutocompleteInput } from './ai-autocomplete-input'
import { AIAnswerSelector } from './ai-answer-selector'

interface DynamicQuestionProps {
  question: Question
  onAnswer: (response: QuestionResponse) => void
  isLoading?: boolean
  questionNumber: number
  totalQuestions?: number
  previousResponses?: QuestionResponse[]
  onGoBack?: () => void
  canGoBack?: boolean
}

export function DynamicQuestion({ 
  question, 
  onAnswer, 
  isLoading, 
  questionNumber,
  totalQuestions = 8,
  previousResponses = [],
  onGoBack,
  canGoBack = false
}: DynamicQuestionProps) {
  const [answer, setAnswer] = useState<string | number | boolean | string[]>('')
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [error, setError] = useState<string>('')
  const t = useTranslations()

  const progress = (questionNumber / totalQuestions) * 100

  const handleSubmit = () => {
    setError('')

    let finalAnswer: string | number | boolean | string[]

    switch (question.type) {
      case 'ai_multiple_choice':
      case 'multiple_choice':
        if (selectedOptions.length === 0) {
          setError(t.errors.selectAtLeastOne)
          return
        }
        finalAnswer = selectedOptions
        break
      case 'ai_single_choice':
        if (selectedOptions.length === 0) {
          setError(t.errors.selectOption)
          return
        }
        finalAnswer = selectedOptions[0]
        break
      case 'single_choice':
        if (!answer) {
          setError(t.errors.selectOption)
          return
        }
        finalAnswer = answer as string
        break
      case 'boolean':
        finalAnswer = answer as boolean
        break
      case 'number_input':
      case 'scale':
        const numValue = Number(answer)
        if (isNaN(numValue)) {
          setError(t.errors.enterValidNumber)
          return
        }
        if (question.min && numValue < question.min) {
          setError(`${t.errors.valueMinimum} ${question.min}`)
          return
        }
        if (question.max && numValue > question.max) {
          setError(`${t.errors.valueMaximum} ${question.max}`)
          return
        }
        finalAnswer = numValue
        break
      case 'ai_text_input':
      case 'text_input':
        if (!answer || (answer as string).trim().length < 3) {
          setError(t.errors.provideMoreDetail)
          return
        }
        finalAnswer = (answer as string).trim()
        break
      default:
        finalAnswer = answer as string
    }

    const response: QuestionResponse = {
      questionId: question.id,
      answer: finalAnswer,
      timestamp: new Date(),
    }

    onAnswer(response)
  }

  const handleMultipleChoice = (optionValue: string) => {
    if (optionValue === 'none') {
      setSelectedOptions(['none'])
      return
    }

    const newSelected = selectedOptions.includes(optionValue)
      ? selectedOptions.filter(opt => opt !== optionValue && opt !== 'none')
      : [...selectedOptions.filter(opt => opt !== 'none'), optionValue]
    
    setSelectedOptions(newSelected)
  }

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'ai_single_choice':
        return (
          <AIAnswerSelector
            question={question}
            previousResponses={previousResponses}
            selectedOptions={selectedOptions}
            onSelectionChange={setSelectedOptions}
            isMultiple={false}
          />
        )

      case 'ai_multiple_choice':
        return (
          <AIAnswerSelector
            question={question}
            previousResponses={previousResponses}
            selectedOptions={selectedOptions}
            onSelectionChange={setSelectedOptions}
            isMultiple={true}
          />
        )

      case 'ai_text_input':
        return (
          <AIAutocompleteInput
            questionText={question.text}
            previousResponses={previousResponses}
            value={answer as string}
            onChange={(value) => setAnswer(value)}
            placeholder={question.placeholder}
            multiline={question.text.toLowerCase().includes('describe')}
            className="text-base"
          />
        )

      case 'single_choice':
        return (
          <div className="space-y-4">
            {question.options?.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="button"
                  onClick={() => setAnswer(option.value)}
                  variant={answer === option.value ? "default" : "outline"}
                  className={`w-full p-6 text-left rounded-xl transition-all duration-300 shadow-sm ${
                    answer === option.value
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-400 shadow-lg transform scale-[1.02]'
                      : 'bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${answer === option.value ? 'text-blue-700' : 'text-gray-700'}`}>
                      {option.label}
                    </span>
                    {answer === option.value && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        )

      case 'multiple_choice':
        return (
          <div className="space-y-1">
            {question.options?.map((option, index) => (
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
                  onClick={() => handleMultipleChoice(option.value)}
                  variant={selectedOptions.includes(option.value) ? "default" : "outline"}
                  className={`w-full p-2 text-left rounded-md transition-all duration-150 border ${
                    selectedOptions.includes(option.value)
                      ? 'bg-green-50 border-green-300 text-green-800'
                      : 'bg-white border-gray-200 hover:border-green-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${selectedOptions.includes(option.value) ? 'text-green-700' : 'text-gray-700'}`}>
                      {option.label}
                    </span>
                    {selectedOptions.includes(option.value) && (
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="h-2.5 w-2.5 text-white" />
                      </div>
                    )}
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        )

      case 'boolean':
        return (
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: t.common.yes, value: true },
              { label: t.common.no, value: false }
            ].map((option, index) => (
              <motion.button
                key={option.label}
                type="button"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setAnswer(option.value)}
                className={`p-3 rounded-md font-medium text-sm transition-all duration-150 border ${
                  answer === option.value
                    ? 'bg-blue-500 text-white border-blue-500 shadow-sm'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        )

      case 'scale':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-3xl font-bold text-blue-600">
                {answer || question.min || 1}
              </span>
              <p className="text-sm text-gray-600 mt-1">
                {t.scale.scaleLabel}: {question.min || 1} to {question.max || 10}
              </p>
            </div>
            <input
              type="range"
              min={question.min || 1}
              max={question.max || 10}
              value={answer as number || question.min || 1}
              onChange={(e) => setAnswer(Number(e.target.value))}
              className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer slider hover:bg-gray-300 transition-colors"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{t.scale.lowLabel} ({question.min || 1})</span>
              <span>{t.scale.highLabel} ({question.max || 10})</span>
            </div>
          </div>
        )

      case 'number_input':
        return (
          <Input
            type="number"
            min={question.min}
            max={question.max}
            placeholder={question.placeholder}
            value={answer as number || ''}
            onChange={(e) => setAnswer(Number(e.target.value))}
            className="text-lg"
          />
        )

      case 'text_input':
        return question.text.toLowerCase().includes('describe') ? (
          <Textarea
            placeholder={question.placeholder}
            value={answer as string}
            onChange={(e) => setAnswer(e.target.value)}
            rows={4}
            className="text-base"
          />
        ) : (
          <Input
            type="text"
            placeholder={question.placeholder}
            value={answer as string}
            onChange={(e) => setAnswer(e.target.value)}
            className="text-lg"
          />
        )

      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl lg:max-w-4xl mx-auto"
    >
      {/* Modern Progress Section */}
      <motion.div 
        className="mb-6 sm:mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm sm:text-base text-gray-600">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold">
              Question {questionNumber} of {totalQuestions}
            </span>
          </div>
          <div className="text-sm sm:text-base text-gray-600">
            <span className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 shadow-sm font-medium">
              {Math.round(progress)}% Complete
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200/60 rounded-full h-3 overflow-hidden shadow-inner">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-sm"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Modern Question Card */}
      <Card className="bg-white/90 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6">
          <div className="flex items-start space-x-3">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-white font-bold text-sm">{questionNumber}</span>
            </motion.div>
            <div className="flex-1">
              <motion.h2 
                className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-tight"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {question.text}
              </motion.h2>
              {question.description && (
                <motion.p 
                  className="text-gray-600 text-sm sm:text-base leading-relaxed"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {question.description}
                </motion.p>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <motion.div 
            className="min-h-[100px] sm:min-h-[120px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {renderQuestionInput()}
          </motion.div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4 shadow-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">!</span>
                </div>
                <span className="text-red-700 font-medium">{error}</span>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-3"
          >
            {/* Back Button */}
            {canGoBack && onGoBack && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-shrink-0"
              >
                <Button
                  onClick={onGoBack}
                  variant="outline"
                  className="h-12 sm:h-14 border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-semibold rounded-xl transition-all duration-300 px-6"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t.common.back}
                </Button>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full h-12 sm:h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.01]'}`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                    {t.common.processing}
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    {t.common.continue}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                )}
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          transition: all 0.2s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.6);
        }

        .slider::-moz-range-thumb {
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          transition: all 0.2s ease;
        }

        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.6);
        }
      `}</style>
    </motion.div>
  )
}