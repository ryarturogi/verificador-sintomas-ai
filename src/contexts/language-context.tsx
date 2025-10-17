'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, translations, Translations } from '@/lib/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en')
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Initialize language from localStorage or browser detection
    const initializeLanguage = () => {
      try {
        // Check for saved language preference
        const savedLanguage = localStorage.getItem('preferred-language') as Language
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
          setLanguageState(savedLanguage)
          if (typeof document !== 'undefined') {
            document.documentElement.lang = savedLanguage
          }
        } else {
          // Detect browser language
          const browserLanguage = navigator.language.toLowerCase()
          
          // Check for Spanish variants
          const isSpanish = browserLanguage.startsWith('es') || 
                           browserLanguage.includes('es-') ||
                           browserLanguage === 'es'
          
          const detectedLanguage = isSpanish ? 'es' : 'en'
          setLanguageState(detectedLanguage)
          if (typeof document !== 'undefined') {
            document.documentElement.lang = detectedLanguage
          }
          localStorage.setItem('preferred-language', detectedLanguage)
        }
      } catch (error) {
        console.warn('Failed to initialize language:', error)
        setLanguageState('en')
        if (typeof document !== 'undefined') {
          document.documentElement.lang = 'en'
        }
      } finally {
        setIsInitialized(true)
      }
    }

    initializeLanguage()
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('preferred-language', lang)
    
    // Update document language and direction (only if document is available)
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
      document.documentElement.dir = 'ltr'
    }
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    isRTL: false // Currently supporting LTR languages only
  }

  // Don't render children until language is initialized to prevent flash of wrong language
  if (!isInitialized) {
    return null
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Hook for easy translation access
export function useTranslations() {
  const { t } = useLanguage()
  return t
}