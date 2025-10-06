'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { createChatCompletion } from '@/lib/openai'

export interface GPT5Options {
  responseFormat?: 'json_object' | 'text'
  reasoningEffort?: 'low' | 'medium' | 'high'
  verbosity?: 'low' | 'medium' | 'high'
  cacheKey?: string
  cacheTTL?: number
}

export interface GPT5Response<T = unknown> {
  data: T | null
  loading: boolean
  error: string | null
  callGPT5: (messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>, customOptions?: GPT5Options) => Promise<T | null>
  refetch: () => Promise<void>
  clearCache: () => void
}

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

const globalCache = new Map<string, CacheEntry<unknown>>()

export function useGPT5<T = unknown>(
  model: 'gpt-5-nano' = 'gpt-5-nano',
  options: GPT5Options = {}
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const requestInProgress = useRef<boolean>(false)
  const lastCallParams = useRef<{
    messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>
    options: GPT5Options
  } | null>(null)

  const getCacheKey = useCallback((
    messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
    customOptions?: GPT5Options
  ): string => {
    const mergedOptions = { ...options, ...customOptions }
    return mergedOptions.cacheKey || 
      `${model}-${JSON.stringify(messages)}-${JSON.stringify(mergedOptions)}`
  }, [model, options])

  const getCachedData = useCallback(<T>(cacheKey: string): T | null => {
    const entry = globalCache.get(cacheKey)
    if (!entry) return null

    const now = Date.now()
    if (now - entry.timestamp > entry.ttl) {
      globalCache.delete(cacheKey)
      return null
    }

    return entry.data as T
  }, [])

  const setCachedData = useCallback(<T>(cacheKey: string, data: T, ttl: number): void => {
    globalCache.set(cacheKey, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }, [])

  const callGPT5 = useCallback(async (
    messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
    customOptions?: GPT5Options
  ): Promise<T | null> => {
    if (requestInProgress.current) {
      console.log('Skipping duplicate GPT-5 API call')
      return null
    }

    const mergedOptions = { ...options, ...customOptions }
    const cacheKey = getCacheKey(messages, customOptions)
    
    if (mergedOptions.cacheKey || mergedOptions.cacheTTL) {
      const cachedData = getCachedData<T>(cacheKey)
      if (cachedData) {
        console.log('Using cached GPT-5 response:', cacheKey)
        setData(cachedData)
        return cachedData
      }
    }

    requestInProgress.current = true
    setLoading(true)
    setError(null)
    lastCallParams.current = { messages, options: mergedOptions }

    try {
      const response = await createChatCompletion(messages, model, mergedOptions)
      let parsedData: T

      if (mergedOptions.responseFormat === 'json_object') {
        try {
          parsedData = JSON.parse(response)
        } catch (parseError) {
          let fixedResponse = response.trim()
          if (fixedResponse.startsWith('{') && !fixedResponse.endsWith('}')) {
            const openBraces = (fixedResponse.match(/\{/g) || []).length
            const closeBraces = (fixedResponse.match(/\}/g) || []).length
            const missingBraces = openBraces - closeBraces
            
            if (missingBraces > 0) {
              fixedResponse += '}'.repeat(missingBraces)
            }
          }
          
          try {
            parsedData = JSON.parse(fixedResponse)
          } catch {
            throw new Error(`Failed to parse JSON response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`)
          }
        }
      } else {
        parsedData = response as T
      }

      setData(parsedData)

      if (mergedOptions.cacheKey || mergedOptions.cacheTTL) {
        const ttl = mergedOptions.cacheTTL || 5 * 60 * 1000
        setCachedData(cacheKey, parsedData, ttl)
      }

      return parsedData
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
      requestInProgress.current = false
    }
  }, [model, options, getCacheKey, getCachedData, setCachedData])

  const refetch = useCallback(async () => {
    if (!lastCallParams.current) return

    const { messages, options: callOptions } = lastCallParams.current
    const cacheKey = getCacheKey(messages, callOptions)
    globalCache.delete(cacheKey)
    
    await callGPT5(messages, callOptions)
  }, [callGPT5, getCacheKey])

  const clearCache = useCallback(() => {
    globalCache.clear()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      for (const [key, entry] of globalCache.entries()) {
        if (now - entry.timestamp > entry.ttl) {
          globalCache.delete(key)
        }
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return {
    data,
    loading,
    error,
    callGPT5,
    refetch,
    clearCache
  }
}
