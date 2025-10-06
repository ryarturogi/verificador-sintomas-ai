import { createChatCompletion } from './openai'

export interface GPT5ServerOptions {
  responseFormat?: 'json_object' | 'text'
  reasoningEffort?: 'low' | 'medium' | 'high'
  verbosity?: 'low' | 'medium' | 'high'
  temperature?: number
  maxTokens?: number
}

/**
 * Server-side GPT-5 utility function
 * Provides the same functionality as useGPT5 hook but for server-side use
 */
export async function callGPT5Server<T = unknown>(
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
  model: 'gpt-5-nano' | 'gpt-5-mini' | 'gpt-5' | 'gpt-4o-mini' = 'gpt-5-nano',
  options: GPT5ServerOptions = {}
): Promise<T> {
  try {
    const response = await createChatCompletion(messages, model, options)
    
    let parsedData: T

    if (options.responseFormat === 'json_object') {
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

    return parsedData
  } catch (error) {
    console.error('GPT-5 Server error:', error)
    throw new Error(`Failed to get GPT-5 response: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
