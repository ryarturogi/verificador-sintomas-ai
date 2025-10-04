'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useLanguage, useTranslations } from '@/contexts/language-context'
import { Loader2, Search, TrendingUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onSelect: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder,
  className
}: SearchAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const { language } = useLanguage()
  const t = useTranslations()

  // Popular symptom suggestions - memoized to prevent re-creation
  const popularSuggestions = useMemo(() => language === 'es' ? [
    'dolor de cabeza',
    'fiebre',
    'dolor de garganta',
    'tos',
    'dolor de estómago',
    'mareos',
    'fatiga',
    'dolor de pecho'
  ] : [
    'headache',
    'fever',
    'sore throat',
    'cough',
    'stomach pain',
    'dizziness',
    'fatigue',
    'chest pain'
  ], [language])

  const fetchSuggestions = useCallback(async (query: string) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/generate-answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestType: 'autocomplete',
          query,
          language,
          maxSuggestions: 6,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const aiSuggestions = data.result || []
        
        // Filter popular suggestions that match the query
        const filteredPopular = popularSuggestions.filter(suggestion =>
          suggestion.toLowerCase().includes(query.toLowerCase())
        )
        
        // Combine AI suggestions with filtered popular ones
        const allSuggestions = [...new Set([...aiSuggestions, ...filteredPopular])]
        setSuggestions(allSuggestions.slice(0, 6))
      } else {
        // Fallback to filtered popular suggestions
        const filtered = popularSuggestions.filter(suggestion =>
          suggestion.toLowerCase().includes(query.toLowerCase())
        )
        setSuggestions(filtered.slice(0, 6))
      }
    } catch (error) {
      console.error('Failed to fetch suggestions:', error)
      // Fallback to filtered popular suggestions
      const filtered = popularSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      )
      setSuggestions(filtered.slice(0, 6))
    } finally {
      setIsLoading(false)
      setShowSuggestions(true)
    }
  }, [language, popularSuggestions])

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    if (value.length >= 2) {
      debounceRef.current = setTimeout(() => {
        fetchSuggestions(value)
      }, 300)
    } else if (value.length === 0) {
      // Show popular suggestions when input is empty and focused
      setSuggestions(popularSuggestions)
      setShowSuggestions(document.activeElement === inputRef.current)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [value, language, fetchSuggestions, popularSuggestions])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
    setSelectedIndex(-1)
  }

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
        e.preventDefault()
        if (selectedIndex >= 0) {
          selectSuggestion(suggestions[selectedIndex])
        } else if (value.trim()) {
          onSelect(value.trim())
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const selectSuggestion = (suggestion: string) => {
    onChange(suggestion)
    onSelect(suggestion)
    setShowSuggestions(false)
    setSelectedIndex(-1)
    inputRef.current?.blur()
  }

  const handleFocus = () => {
    if (value.length === 0) {
      setSuggestions(popularSuggestions)
      setShowSuggestions(true)
    } else if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  const handleBlur = () => {
    // Delay hiding suggestions to allow click selection
    setTimeout(() => {
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }, 200)
  }

  return (
    <div className="relative flex-1">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={className}
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          </div>
        )}
      </div>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 z-[9999] mt-2"
          >
            <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
              <div className="p-2">
                {value.length === 0 && (
                  <div className="flex items-center space-x-2 px-3 py-2 text-xs text-gray-500 border-b">
                    <TrendingUp className="h-3 w-3" />
                    <span>
                      {t.navigation.popularSymptoms}
                    </span>
                  </div>
                )}
                
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={`${suggestion}-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => selectSuggestion(suggestion)}
                    className={`w-full text-left px-3 py-3 rounded-lg transition-all duration-200 ${
                      selectedIndex === index
                        ? 'bg-cyan-50 border-l-4 border-l-cyan-500'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span className={`text-sm ${
                        selectedIndex === index ? 'text-cyan-700 font-medium' : 'text-gray-700'
                      }`}>
                        {suggestion}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}