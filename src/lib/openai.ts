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

// GPT-5 specific types based on the new API
interface GPT5ReasoningOptions {
  effort: 'minimal' | 'low' | 'medium' | 'high'
}

interface GPT5TextOptions {
  verbosity: 'low' | 'medium' | 'high'
}

interface GPT5CustomTool {
  type: 'custom'
  name: string
  description: string
}

interface GPT5AllowedTools {
  type: 'allowed_tools'
  mode: 'auto' | 'required'
  tools: Array<{ type: 'function'; name: string }>
}

interface GPT5ResponsesOptions {
  reasoning?: GPT5ReasoningOptions
  text?: GPT5TextOptions
  max_output_tokens?: number
  tools?: GPT5CustomTool[]
  tool_choice?: GPT5AllowedTools
}

// New GPT-5 Responses API function
export async function createGPT5Response(
  input: string,
  model: 'gpt-5' | 'gpt-5-mini' | 'gpt-5-nano' = 'gpt-5-nano',
  options: GPT5ResponsesOptions = {}
): Promise<string> {
  try {
    const openai = getOpenAIClient()
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requestBody: any = {
      model,
      input,
      ...options
    }

    const response = await openai.responses.create(requestBody)
    const outputText = response.output_text || ''
    
    // Validate that we received a non-empty response
    if (!outputText || outputText.trim().length === 0) {
      console.error('GPT-5 Responses API returned empty output_text:', {
        model,
        input,
        options,
        response: JSON.stringify(response, null, 2)
      })
      throw new Error('GPT-5 Responses API returned empty output_text')
    }
    
    return outputText
  } catch (error: unknown) {
    console.error('GPT-5 Responses API Error:', error)
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
    throw new Error(`Failed to get GPT-5 response: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Legacy function for backward compatibility - now uses Responses API for GPT-5 models
export async function createChatCompletion(
  messages: OpenAI.Chat.ChatCompletionMessageParam[],
  model: 'gpt-5-nano' | 'gpt-5-mini' | 'gpt-5' | 'gpt-4o-mini' = 'gpt-5-nano',
  options: {
    temperature?: number
    maxTokens?: number
    responseFormat?: 'json_object' | 'text'
    reasoningEffort?: 'minimal' | 'low' | 'medium' | 'high'
    verbosity?: 'low' | 'medium' | 'high'
    tools?: GPT5CustomTool[]
    tool_choice?: GPT5AllowedTools
  } = {}
) {
  const {
    temperature,
    maxTokens,
    responseFormat = 'text',
    reasoningEffort,
    verbosity,
    tools,
    tool_choice
  } = options

  try {
    const openai = getOpenAIClient()
    
    // Use Responses API for GPT-5 models
    if (model.includes('gpt-5')) {
      // Convert messages to input string for Responses API
      const input = messages
        .map(msg => {
          if (msg.role === 'system') return `System: ${msg.content}`
          if (msg.role === 'user') return `User: ${msg.content}`
          if (msg.role === 'assistant') return `Assistant: ${msg.content}`
          return msg.content
        })
        .join('\n\n')

      const gpt5Options: GPT5ResponsesOptions = {
        tools,
        tool_choice
      }

      // Add reasoning effort if specified
      if (reasoningEffort) {
        gpt5Options.reasoning = { effort: reasoningEffort }
      }

      // Add verbosity if specified
      if (verbosity) {
        gpt5Options.text = { verbosity }
      }

      const response = await createGPT5Response(input, model as 'gpt-5' | 'gpt-5-mini' | 'gpt-5-nano', gpt5Options)
      
      // Validate response is not empty
      if (!response || response.trim().length === 0) {
        console.error('GPT-5 Responses API returned empty response:', {
          input,
          model,
          options: gpt5Options,
          response
        })
        throw new Error('GPT-5 Responses API returned empty response')
      }
      
      return response
    }
    
    // Use Chat Completions API for non-GPT-5 models
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const requestBody: any = {
        model,
        messages,
        response_format: responseFormat === 'json_object' 
          ? { type: 'json_object' } 
          : undefined,
      }

      // For other models (like GPT-4), use max_tokens and temperature
      if (maxTokens !== undefined) {
        requestBody.max_tokens = maxTokens;
      }
      if (temperature !== undefined) {
        requestBody.temperature = temperature;
      }

      const completion = await openai.chat.completions.create(requestBody)
      const content = completion.choices[0]?.message?.content || ''
      
      if (!content) {
        console.error('Empty response from OpenAI API:', {
          model,
          choices: completion.choices,
          usage: completion.usage,
          fullResponse: JSON.stringify(completion, null, 2)
        })
        throw new Error('Empty response from OpenAI API')
      }
      
      return content
    } catch (modelError: unknown) {
      // If model is not available, fall back to GPT-4o-mini
      const error = modelError as { status?: number; message?: string }
      if (error?.status === 404 || 
          error?.message?.includes('model') || 
          error?.message?.includes('does not exist')) {
        console.log(`${model} model not available, falling back to GPT-4o-mini`)
        
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
          throw new Error('Both requested model and GPT-4o-mini models failed. Please check your API configuration.')
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