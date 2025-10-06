import OpenAI from 'openai'

let openaiClient: OpenAI | null = null

function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured. Please add OPENAI_API_KEY to your environment variables.')
  }
  
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }
  
  return openaiClient
}

export async function createChatCompletion(
  messages: OpenAI.Chat.ChatCompletionMessageParam[],
  model: 'gpt-5-nano' | 'gpt-5-mini' | 'gpt-5' | 'gpt-4o-mini' = 'gpt-5-nano',
  options: {
    temperature?: number
    maxTokens?: number
    responseFormat?: 'json_object' | 'text'
    reasoningEffort?: 'low' | 'medium' | 'high'
    verbosity?: 'low' | 'medium' | 'high'
  } = {}
) {
  const {
    temperature,
    maxTokens,
    responseFormat = 'text',
    reasoningEffort,
    verbosity
  } = options

  try {
    const openai = getOpenAIClient()
    
    // First try with the requested GPT-5 model
    const modelToUse = model
    
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const requestBody: any = {
        model: modelToUse,
        messages,
        response_format: responseFormat === 'json_object' 
          ? { type: 'json_object' } 
          : undefined,
      };

      // Add parameters based on model type
      if (modelToUse.includes('gpt-5')) {
        // GPT-5 models use max_completion_tokens instead of max_tokens
        if (maxTokens !== undefined) {
          requestBody.max_completion_tokens = maxTokens;
        }
        
        // GPT-5 models support reasoning_effort and verbosity parameters
        if (reasoningEffort) {
          requestBody.reasoning_effort = reasoningEffort;
        }
        if (verbosity) {
          requestBody.verbosity = verbosity;
        }
        // GPT-5 models don't use temperature parameter
      } else {
        // For other models (like GPT-4), use max_tokens and temperature
        if (maxTokens !== undefined) {
          requestBody.max_tokens = maxTokens;
        }
        if (temperature !== undefined) {
          requestBody.temperature = temperature;
        }
      }

      const completion = await openai.chat.completions.create(requestBody)

      // Handle different response formats for GPT-5 models
      let content = completion.choices[0]?.message?.content || ''
      
      // For GPT-5 models, check if content is in a different field
      if (!content && modelToUse.includes('gpt-5')) {
        const choice = completion.choices[0]
        if (choice?.message) {
          // Check for alternative content fields that might exist in GPT-5 responses
          const messageObj = choice.message as unknown as Record<string, unknown>
          content = (messageObj?.text as string) || 
                   (messageObj?.response as string) || 
                   (messageObj?.reasoning as string) ||
                   choice.message.content || ''
        }
      }
      
      if (!content) {
        console.error('Empty response from OpenAI API:', {
          model: modelToUse,
          choices: completion.choices,
          usage: completion.usage,
          fullResponse: JSON.stringify(completion, null, 2)
        })
        
        // For GPT-5 models, try to provide a more helpful error message
        if (modelToUse.includes('gpt-5')) {
          console.log('GPT-5 model may not be available or may have different response format')
          throw new Error('GPT-5 model returned empty response. This may indicate the model is not available or has a different response format.')
        }
        
        throw new Error('Empty response from OpenAI API')
      }
      
      return content
    } catch (modelError: unknown) {
      // If GPT-5-nano is not available, fall back to GPT-4o-mini
      const error = modelError as { status?: number; message?: string }
      if (error?.status === 404 || 
          error?.message?.includes('model') || 
          error?.message?.includes('does not exist') ||
          error?.message?.includes('GPT-5 model returned empty response')) {
        console.log(`GPT-5-nano model not available or returned empty response, falling back to GPT-4o-mini`)
        
        try {
          const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages,
            temperature,
            max_tokens: maxTokens,
            response_format: responseFormat === 'json_object' 
              ? { type: 'json_object' } 
              : undefined,
          })

          const content = completion.choices[0]?.message?.content || ''
          
          if (!content) {
            console.error('Empty response from OpenAI API (fallback):', {
              model: 'gpt-4o-mini',
              choices: completion.choices,
              usage: completion.usage
            })
            throw new Error('Empty response from OpenAI API')
          }
          
          return content
        } catch (fallbackError) {
          console.error('Fallback to GPT-4o-mini also failed:', fallbackError)
          throw new Error('Both GPT-5 and GPT-4o-mini models failed. Please check your API configuration.')
        }
      }
      throw modelError
    }
  } catch (error: unknown) {
    console.error('OpenAI API Error:', error)
    const apiError = error as { message?: string; status?: number }
    if (apiError?.message?.includes('API key') || apiError?.status === 401) {
      throw new Error('OpenAI API key is not configured correctly. Please check your environment variables.')
    }
    if (apiError?.status === 429) {
      throw new Error('API rate limit exceeded. Please try again in a moment.')
    }
    if (apiError?.status === 500) {
      throw new Error('OpenAI service is temporarily unavailable. Please try again later.')
    }
    throw new Error(`Failed to get AI response: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}