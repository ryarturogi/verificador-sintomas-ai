'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { QuestionResponse } from '@/types/dynamic-questionnaire'
import { Loader2, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface AIAutocompleteInputProps {
  questionText: string
  previousResponses: QuestionResponse[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  multiline?: boolean
  className?: string
}

export function AIAutocompleteInput({
  questionText,
  previousResponses,
  value,
  onChange,
  placeholder,
  multiline = false,
  className
}: AIAutocompleteInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const { language } = useLanguage()

  const fetchSuggestions = useCallback(async (currentInput: string) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/generate-answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestType: 'suggestions',
          questionText,
          currentInput,
          previousResponses,
          maxOptions: 5,
          language,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setSuggestions(data.result || [])
        setShowSuggestions(true)
        setSelectedIndex(-1)
      }
    } catch (error) {
      console.error('Failed to fetch suggestions:', error)
    } finally {
      setIsLoading(false)
    }
  }, [questionText, previousResponses, language])

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    if (value.length >= 2) {
      debounceRef.current = setTimeout(() => {
        fetchSuggestions(value)
      }, 300)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [value, questionText, fetchSuggestions])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        if (selectedIndex >= 0) {
          e.preventDefault()
          selectSuggestion(suggestions[selectedIndex])
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
    }
  }

  const selectSuggestion = (suggestion: string) => {
    onChange(suggestion)
    setShowSuggestions(false)
    setSelectedIndex(-1)
    setSuggestions([])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  const handleFocus = () => {
    if (suggestions.length > 0 && value.length >= 2) {
      setShowSuggestions(true)
    }
  }

  const handleBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }, 200)
  }

  const InputComponent = multiline ? Textarea : Input
  const inputProps = multiline ? { rows: 4 } : {}

  return (
    <div className="relative">
      <div className="relative">
        <InputComponent
          ref={inputRef as React.RefObject<HTMLInputElement & HTMLTextAreaElement>}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={className}
          {...inputProps}
        />
        
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 bg-cyan-100 rounded-full flex items-center justify-center">
              <Loader2 className="h-3 w-3 animate-spin text-cyan-600" />
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-[9999] w-full mt-1"
          >
            <Card className="border shadow-lg bg-white">
              <div className="max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => selectSuggestion(suggestion)}
                    className={`w-full px-4 py-3 text-left hover:bg-cyan-50 border-b border-gray-100 last:border-b-0 transition-colors ${
                      selectedIndex === index ? 'bg-cyan-50 text-cyan-700' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{suggestion}</span>
                      {selectedIndex === index && (
                        <CheckCircle className="h-4 w-4 text-cyan-500" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
              
              <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 border-t flex items-center space-x-2">
                <CheckCircle className="h-3 w-3" />
                <span>AI-powered suggestions • Use ↑↓ arrows and Enter to select</span>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}