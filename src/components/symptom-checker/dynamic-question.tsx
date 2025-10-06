'use client'

import { useState } from 'react'
import { Question, QuestionResponse } from '@/types/dynamic-questionnaire'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SymptomAutocomplete } from '@/components/ui/symptom-autocomplete'
import { Option } from '@/components/ui/async-autocomplete'
import { Check, ArrowRight, ArrowLeft, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslations } from '@/contexts/language-context'
import { AIAnswerSelector } from './ai-answer-selector'
import { medicalDesignTokens as designTokens } from '@/lib/design-tokens'

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
  const [selectedAutocomplete, setSelectedAutocomplete] = useState<Option | null>(null)
  const [error, setError] = useState<string>('')
  const t = useTranslations()

  const progress = (questionNumber / totalQuestions) * 100

  // Helper function to determine if question should use autocomplete
  const shouldUseAutocomplete = (question: Question): { use: boolean; type: 'symptom' | 'destination' | 'condition' } => {
    const questionText = question.text.toLowerCase();
    const placeholder = question.placeholder?.toLowerCase() || '';
    
    // Check for symptom-related keywords
    const symptomKeywords = ['symptom', 'feel', 'experience', 'pain', 'ache', 'discomfort', 'describe', 'problem'];
    const destinationKeywords = ['doctor', 'hospital', 'clinic', 'specialist', 'facility', 'location', 'where'];
    const conditionKeywords = ['condition', 'diagnosis', 'disease', 'illness', 'medical history'];
    
    const hasSymptomKeywords = symptomKeywords.some(keyword => 
      questionText.includes(keyword) || placeholder.includes(keyword)
    );
    const hasDestinationKeywords = destinationKeywords.some(keyword => 
      questionText.includes(keyword) || placeholder.includes(keyword)
    );
    const hasConditionKeywords = conditionKeywords.some(keyword => 
      questionText.includes(keyword) || placeholder.includes(keyword)
    );
    
    if (hasSymptomKeywords) return { use: true, type: 'symptom' };
    if (hasDestinationKeywords) return { use: true, type: 'destination' };
    if (hasConditionKeywords) return { use: true, type: 'condition' };
    
    return { use: false, type: 'symptom' };
  };

  const handleSubmit = () => {
    setError('')
    
    // Scroll to top when submitting answer
    window.scrollTo({ top: 0, behavior: 'smooth' })

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
        // Check if this question should use autocomplete
        const autocompleteInfo = shouldUseAutocomplete(question);
        if (autocompleteInfo.use && selectedAutocomplete) {
          finalAnswer = selectedAutocomplete.label;
        } else if (autocompleteInfo.use && !selectedAutocomplete && (!answer || (answer as string).trim().length < 3)) {
          setError(t.errors.provideMoreDetail)
          return
        } else if (!answer || (answer as string).trim().length < 3) {
          setError(t.errors.provideMoreDetail)
          return
        } else {
          finalAnswer = (answer as string).trim()
        }
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
        const autocompleteInfo = shouldUseAutocomplete(question);
        
        if (autocompleteInfo.use) {
          return (
            <SymptomAutocomplete
              type={autocompleteInfo.type}
              onSymptomSelect={setSelectedAutocomplete}
              value={selectedAutocomplete}
              placeholder={question.placeholder}
              className="[&_.react-select__control]:border-cyan-200 [&_.react-select__control]:focus:border-cyan-500 [&_.react-select__control]:hover:border-cyan-300"
            />
          );
        }
        
        return question.text.toLowerCase().includes('describe') ? (
          <Textarea
            value={answer as string}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={question.placeholder}
            className="text-base"
            rows={4}
          />
        ) : (
          <Input
            value={answer as string}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={question.placeholder}
            className="text-base"
          />
        )

      case 'single_choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  type="button"
                  onClick={() => setAnswer(option.value)}
                  variant="outline"
                  className={`w-full p-4 ${
                    answer === option.value
                      ? `${designTokens.cards.interactive} border-cyan-500 bg-cyan-50 shadow-md`
                      : `${designTokens.cards.interactive} hover:border-cyan-300`
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`${designTokens.typography.bodySmall} font-medium text-left ${
                      answer === option.value ? 'text-cyan-700' : 'text-slate-700'
                    }`}>
                      {option.label}
                    </span>
                    {answer === option.value && (
                      <div className="flex items-center justify-center w-5 h-5 bg-cyan-500 rounded-full flex-shrink-0 ml-3">
                        <Check className="h-3 w-3 text-white" />
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
          <div className="space-y-2">
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
                  variant="outline"
                  className={`w-full p-3 ${
                    selectedOptions.includes(option.value)
                      ? `${designTokens.cards.success} border-emerald-300`
                      : `${designTokens.cards.interactive} hover:border-emerald-300`
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`${designTokens.typography.bodySmall} font-medium text-left ${
                      selectedOptions.includes(option.value) ? 'text-emerald-700' : 'text-slate-700'
                    }`}>
                      {option.label}
                    </span>
                    {selectedOptions.includes(option.value) && (
                      <div className="flex items-center justify-center w-5 h-5 bg-emerald-500 rounded-full flex-shrink-0 ml-3">
                        <Check className="h-3 w-3 text-white" />
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
          <div className="grid grid-cols-2 gap-3">
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
                className={`p-4 rounded-lg font-medium text-sm ${designTokens.animations.transitionFast} border ${
                  answer === option.value
                    ? `${designTokens.buttons.primary.replace('border border-cyan-600', 'border-2 border-cyan-600')}`
                    : `${designTokens.buttons.secondary} hover:border-cyan-300 hover:bg-cyan-50`
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
              <span className={`${designTokens.typography.h2} text-cyan-600 scale-number`}>
                {answer || question.min || 1}
              </span>
              <p className={`${designTokens.typography.bodySecondary} mt-1`}>
                <span>{t.scale.scaleLabel}: </span>
                <span className="font-medium scale-number">{question.min || 1}</span>
                <span> to </span>
                <span className="font-medium scale-number">{question.max || 10}</span>
              </p>
            </div>
            <input
              type="range"
              min={question.min || 1}
              max={question.max || 10}
              value={answer as number || question.min || 1}
              onChange={(e) => setAnswer(Number(e.target.value))}
              className={`w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer slider ${designTokens.animations.transitionFast}`}
            />
            <div className="flex justify-between">
              <span className={`${designTokens.typography.bodySmall} text-slate-600`}>
                <span>{t.scale.lowLabel} </span>
                <span className="font-medium scale-number">({question.min || 1})</span>
              </span>
              <span className={`${designTokens.typography.bodySmall} text-slate-600`}>
                <span>{t.scale.highLabel} </span>
                <span className="font-medium scale-number">({question.max || 10})</span>
              </span>
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
            className={designTokens.forms.input}
          />
        )

      case 'text_input':
        const textAutocompleteInfo = shouldUseAutocomplete(question);
        
        if (textAutocompleteInfo.use) {
          return (
            <SymptomAutocomplete
              type={textAutocompleteInfo.type}
              onSymptomSelect={setSelectedAutocomplete}
              value={selectedAutocomplete}
              placeholder={question.placeholder}
              className="[&_.react-select__control]:border-cyan-200 [&_.react-select__control]:focus:border-cyan-500 [&_.react-select__control]:hover:border-cyan-300"
            />
          );
        }
        
        return question.text.toLowerCase().includes('describe') ? (
          <Textarea
            placeholder={question.placeholder}
            value={answer as string}
            onChange={(e) => setAnswer(e.target.value)}
            rows={4}
            className={designTokens.forms.textarea}
          />
        ) : (
          <Input
            type="text"
            placeholder={question.placeholder}
            value={answer as string}
            onChange={(e) => setAnswer(e.target.value)}
            className={designTokens.forms.input}
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
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-2xl lg:max-w-4xl mx-auto"
    >
      {/* Medical Progress Section */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-3">
          <div className={designTokens.typography.label}>
            <span className={`${designTokens.typography.emphasis} text-cyan-600`}>
              Question {questionNumber} of {totalQuestions}
            </span>
          </div>
          <div>
            <span className={designTokens.badges.status.inProgress}>
              {Math.round(progress)}% Complete
            </span>
          </div>
        </div>
        <div className={designTokens.progress.barLarge}>
          <motion.div 
            className={designTokens.progress.fill}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Medical Question Card */}
      <Card className={designTokens.cards.clinical}>
        <CardHeader className="bg-cyan-50 p-4 sm:p-6 border-b border-cyan-200">
          <div className="flex items-start space-x-3">
            <motion.div 
              className={`${designTokens.iconContainers.primary} flex-shrink-0`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="icon-sm text-cyan-600" />
            </motion.div>
            <div className="flex-1">
              <motion.h2 
                className={`${designTokens.typography.h4} mb-2`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {question.text}
              </motion.h2>
              {question.description && (
                <motion.p 
                  className={designTokens.typography.bodySecondary}
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

        <CardContent className="p-4 sm:p-6 space-y-4">
          <motion.div 
            className="min-h-[80px]"
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
              className={designTokens.alerts.error}
            >
              <div className="flex items-center space-x-3">
                <div className={designTokens.iconContainers.emergency}>
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <span className={`${designTokens.typography.bodySmall} font-medium`}>{error}</span>
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
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="flex-shrink-0"
              >
                <Button
                  onClick={onGoBack}
                  className={`${designTokens.buttons.secondary} h-10 px-4`}
                >
                  <ArrowLeft className="icon-sm mr-2" />
                  {t.common.back}
                </Button>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="flex-1"
            >
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full h-10 ${
                  isLoading 
                    ? designTokens.buttons.disabled 
                    : designTokens.buttons.primary
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className={`${designTokens.progress.ringSmall} mr-2`} />
                    {t.common.processing}
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    {t.common.continue}
                    <ArrowRight className="ml-2 icon-sm" />
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