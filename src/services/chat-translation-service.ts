/**
 * Chat Translation Service
 * Handles translation of chat messages and caching with consultation
 */

export interface TranslatedMessage {
  id: string
  originalContent: string
  translatedContent: string
  language: string
  timestamp: Date
}

export interface MessageTranslationCache {
  [messageId: string]: {
    [language: string]: string
  }
}

class ChatTranslationService {
  private translationCache: MessageTranslationCache = {}
  private consultationTranslations: Map<string, MessageTranslationCache> = new Map()

  /**
   * Translate a message content
   */
  async translateMessage(
    content: string, 
    targetLanguage: string, 
    consultationId: string
  ): Promise<string> {
    // Check if translation already exists in cache
    const cacheKey = this.getCacheKey(content, targetLanguage)
    if (this.translationCache[cacheKey]) {
      return this.translationCache[cacheKey][targetLanguage]
    }

    // Check consultation-specific cache
    const consultationCache = this.consultationTranslations.get(consultationId)
    if (consultationCache && consultationCache[cacheKey] && consultationCache[cacheKey][targetLanguage]) {
      return consultationCache[cacheKey][targetLanguage]
    }

    try {
      // Call translation API
      const response = await fetch('/api/translate-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: content,
          targetLanguage: targetLanguage,
          consultationId: consultationId
        })
      })

      if (!response.ok) {
        throw new Error('Translation failed')
      }

      const data = await response.json()
      const translatedText = data.translation

      // Cache the translation
      this.cacheTranslation(content, targetLanguage, translatedText, consultationId)

      return translatedText
    } catch (error) {
      console.error('Translation error:', error)
      // Return original content if translation fails
      return content
    }
  }

  /**
   * Translate all messages in a consultation
   */
  async translateConsultationMessages(
    messages: Array<{ id: string; content: string; sender: string }>,
    targetLanguage: string,
    consultationId: string
  ): Promise<Array<{ id: string; content: string; sender: string; translatedContent?: string }>> {
    const translatedMessages = await Promise.all(
      messages.map(async (message) => {
        // Only translate doctor messages, keep user messages as is
        if (message.sender === 'doctor') {
          const translatedContent = await this.translateMessage(
            message.content,
            targetLanguage,
            consultationId
          )
          return {
            ...message,
            translatedContent
          }
        }
        return message
      })
    )

    return translatedMessages
  }

  /**
   * Get cached translation
   */
  getCachedTranslation(
    content: string, 
    targetLanguage: string, 
    consultationId: string
  ): string | null {
    const cacheKey = this.getCacheKey(content, targetLanguage)
    
    // Check consultation-specific cache first
    const consultationCache = this.consultationTranslations.get(consultationId)
    if (consultationCache && consultationCache[cacheKey] && consultationCache[cacheKey][targetLanguage]) {
      return consultationCache[cacheKey][targetLanguage]
    }

    // Check global cache
    if (this.translationCache[cacheKey] && this.translationCache[cacheKey][targetLanguage]) {
      return this.translationCache[cacheKey][targetLanguage]
    }

    return null
  }

  /**
   * Cache a translation
   */
  private cacheTranslation(
    content: string, 
    targetLanguage: string, 
    translatedContent: string, 
    consultationId: string
  ): void {
    const cacheKey = this.getCacheKey(content, targetLanguage)
    
    // Initialize consultation cache if it doesn't exist
    if (!this.consultationTranslations.has(consultationId)) {
      this.consultationTranslations.set(consultationId, {})
    }

    const consultationCache = this.consultationTranslations.get(consultationId)!
    
    // Cache in consultation-specific storage
    if (!consultationCache[cacheKey]) {
      consultationCache[cacheKey] = {}
    }
    consultationCache[cacheKey][targetLanguage] = translatedContent

    // Also cache in global cache
    if (!this.translationCache[cacheKey]) {
      this.translationCache[cacheKey] = {}
    }
    this.translationCache[cacheKey][targetLanguage] = translatedContent
  }

  /**
   * Generate cache key for content and language
   */
  private getCacheKey(content: string, language: string): string {
    return `${content.slice(0, 50)}_${language}`.replace(/[^a-zA-Z0-9_]/g, '_')
  }

  /**
   * Clear consultation cache
   */
  clearConsultationCache(consultationId: string): void {
    this.consultationTranslations.delete(consultationId)
  }

  /**
   * Get all cached translations for a consultation
   */
  getConsultationTranslations(consultationId: string): MessageTranslationCache {
    return this.consultationTranslations.get(consultationId) || {}
  }

  /**
   * Save consultation translations to session storage
   */
  saveConsultationTranslations(consultationId: string): void {
    const translations = this.getConsultationTranslations(consultationId)
    if (Object.keys(translations).length > 0) {
      sessionStorage.setItem(`chat_translations_${consultationId}`, JSON.stringify(translations))
    }
  }

  /**
   * Load consultation translations from session storage
   */
  loadConsultationTranslations(consultationId: string): void {
    try {
      const stored = sessionStorage.getItem(`chat_translations_${consultationId}`)
      if (stored) {
        const translations = JSON.parse(stored)
        this.consultationTranslations.set(consultationId, translations)
      }
    } catch (error) {
      console.error('Error loading consultation translations:', error)
    }
  }
}

export const chatTranslationService = new ChatTranslationService()
