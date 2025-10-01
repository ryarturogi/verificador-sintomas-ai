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
  model: 'gpt-5' | 'gpt-5-mini' | 'gpt-5-nano' = 'gpt-5',
  options: {
    temperature?: number
    maxTokens?: number
    responseFormat?: 'json_object' | 'text'
  } = {}
) {
  const {
    temperature = 0.3,
    maxTokens = 1500,
    responseFormat = 'text'
  } = options

  try {
    const openai = getOpenAIClient()
    
    // First try with the requested GPT-5 model
    const modelToUse = model
    
    try {
      const completion = await openai.chat.completions.create({
        model: modelToUse,
        messages,
        temperature,
        max_tokens: maxTokens,
        response_format: responseFormat === 'json_object' 
          ? { type: 'json_object' } 
          : undefined,
      })

      return completion.choices[0]?.message?.content || ''
    } catch (modelError: unknown) {
      // If GPT-5 models are not available, fall back to GPT-4
      const error = modelError as { status?: number; message?: string }
      if (error?.status === 404 || error?.message?.includes('model') || error?.message?.includes('does not exist')) {
        console.log(`GPT-5 model ${model} not available, falling back to GPT-4o`)
        
        const fallbackModel = model === 'gpt-5' ? 'gpt-4o' : 
                            model === 'gpt-5-mini' ? 'gpt-4o-mini' : 
                            'gpt-4o-mini'
        
        const completion = await openai.chat.completions.create({
          model: fallbackModel,
          messages,
          temperature,
          max_tokens: maxTokens,
          response_format: responseFormat === 'json_object' 
            ? { type: 'json_object' } 
            : undefined,
        })

        return completion.choices[0]?.message?.content || ''
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