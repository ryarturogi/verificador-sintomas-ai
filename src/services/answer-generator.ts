import { createChatCompletion } from '@/lib/openai'
import { QuestionResponse, QuestionOption } from '@/types/dynamic-questionnaire'

export class AnswerGenerator {
  
  async generateAnswerOptions(
    questionText: string,
    questionType: string,
    previousResponses: QuestionResponse[] = [],
    maxOptions: number = 6,
    language: string = 'en'
  ): Promise<QuestionOption[]> {
    
    const context = this.buildContext(previousResponses)
    const isSpanish = language === 'es'
    
    const prompt = `
You are a medical AI assistant generating contextual answer options for a symptom assessment questionnaire.

${isSpanish ? 'IMPORTANTE: Responde completamente en español. Todas las opciones y etiquetas deben estar en español.' : 'IMPORTANT: Respond in English.'}

Question: "${questionText}"
Question Type: ${questionType}
Previous Patient Responses: ${context}

Generate ${maxOptions} relevant, medical-appropriate answer options for this question. Consider:

1. Medical accuracy and relevance
2. Common patient responses and terminology  
3. Range from mild to severe options when applicable
4. Context from previous responses
5. Age-appropriate language
6. Logical progression of options

For symptom-related questions, include:
- Severity levels (mild, moderate, severe)
- Duration options (minutes, hours, days, weeks)
- Common descriptors (throbbing, sharp, dull, burning, etc.)
- Location specifics when relevant

For frequency/timing questions, include:
- Specific timeframes
- Frequency patterns
- Triggers or patterns

Return a JSON array of options with this structure:
[
  {
    "id": "unique_id",
    "label": "User-friendly display text",
    "value": "technical_value"
  }
]

Make sure options are:
- Medically accurate
- Easy to understand
- Comprehensive but not overwhelming
- Contextually relevant to the patient's situation
`

    try {
      console.log('Generating answer options with prompt:', {
        questionText,
        questionType,
        maxOptions,
        language,
        context: context.substring(0, 100) + '...'
      })
      
      const response = await createChatCompletion(
        [{ role: 'user', content: prompt }],
        'gpt-5-nano', // Using gpt-5-nano as requested
        {
          responseFormat: 'json_object'
        }
      )

      // Add debugging for response
      console.log('Raw response from OpenAI (answer generator):', response)
      
      if (!response || response.trim() === '') {
        throw new Error('Empty response from OpenAI API')
      }

      let result
      try {
        result = JSON.parse(response)
      } catch (parseError) {
        console.error('JSON Parse Error in answer generator:', parseError)
        console.error('Response that failed to parse:', response)
        
        // Try to fix truncated JSON by attempting to complete it
        if (response.includes('[') || response.includes('"id"') || response.includes('"label"')) {
          console.log('Attempting to fix truncated JSON response in answer generator...')
          try {
            // Try to complete the JSON by adding missing closing brackets/braces
            let fixedResponse = response.trim()
            
            // Check if it's an array that needs closing
            if (fixedResponse.startsWith('[') && !fixedResponse.endsWith(']')) {
              // Count opening and closing brackets
              const openBrackets = (fixedResponse.match(/\[/g) || []).length
              const closeBrackets = (fixedResponse.match(/\]/g) || []).length
              const missingBrackets = openBrackets - closeBrackets
              
              if (missingBrackets > 0) {
                fixedResponse += ']'.repeat(missingBrackets)
                console.log('Fixed JSON array by adding missing closing brackets')
              }
            }
            
            // Check for missing closing braces in objects
            if (!fixedResponse.endsWith('}') && !fixedResponse.endsWith(']')) {
              const openBraces = (fixedResponse.match(/\{/g) || []).length
              const closeBraces = (fixedResponse.match(/\}/g) || []).length
              const missingBraces = openBraces - closeBraces
              
              if (missingBraces > 0) {
                fixedResponse += '}'.repeat(missingBraces)
                console.log('Fixed JSON by adding missing closing braces')
              }
            }
            
            result = JSON.parse(fixedResponse)
            console.log('Successfully fixed truncated JSON in answer generator')
          } catch (fixError) {
            console.error('Failed to fix truncated JSON in answer generator:', fixError)
            throw new Error(`Failed to parse JSON response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`)
          }
        } else {
          throw new Error(`Failed to parse JSON response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`)
        }
      }
      return result.options || this.getFallbackOptions(questionType, language)
    } catch (error) {
      console.error('Failed to generate answer options:', error)
      return this.getFallbackOptions(questionType, language)
    }
  }

  async generateSmartSuggestions(
    questionText: string,
    currentInput: string,
    previousResponses: QuestionResponse[] = [],
    maxSuggestions: number = 5,
    language: string = 'en'
  ): Promise<string[]> {
    
    if (currentInput.length < 2) return []

    const context = this.buildContext(previousResponses)
    const isSpanish = language === 'es'
    
    const prompt = `
You are a medical AI providing smart autocomplete suggestions for a symptom questionnaire.

${isSpanish ? 'IMPORTANTE: Responde completamente en español. Todas las sugerencias deben estar en español.' : 'IMPORTANT: Respond in English.'}

Question: "${questionText}"
Current Input: "${currentInput}"
Previous Responses: ${context}

Generate ${maxSuggestions} relevant autocomplete suggestions that:
1. Start with or contain the current input
2. Are medically accurate
3. Are commonly used by patients
4. Fit the context of the question
5. Help patients express their symptoms clearly

Focus on:
- Common symptom descriptions
- Medical terminology in simple language
- Specific body parts, sensations, timings
- Severity descriptors
- Trigger descriptions

Return a JSON array of suggestion strings:
["suggestion1", "suggestion2", "suggestion3"]

Keep suggestions concise and patient-friendly.
`

    try {
      const response = await createChatCompletion(
        [{ role: 'user', content: prompt }],
        'gpt-5-nano',
        {
          responseFormat: 'json_object'
        }
      )

      const result = JSON.parse(response)
      return result.suggestions || []
    } catch (error) {
      console.error('Failed to generate suggestions:', error)
      return []
    }
  }

  async generateSymptomOptions(bodyPart?: string, symptomType?: string, language: string = 'en', query?: string): Promise<QuestionOption[]> {
    const isSpanish = language === 'es'
    
    const prompt = `
Generate common symptom options for medical questionnaire.

${isSpanish ? 'IMPORTANTE: Responde completamente en español. Todas las opciones y etiquetas deben estar en español.' : 'IMPORTANT: Respond in English.'}

${query ? `Search query: "${query}" - Include symptoms that match or relate to this query` : ''}
${bodyPart ? `Body part: ${bodyPart}` : ''}
${symptomType ? `Symptom type: ${symptomType}` : ''}

${query ? 'Focus on generating symptoms that contain or relate to the search query.' : 'Generate general common symptoms.'}

Return JSON array of symptom options:
[
  {
    "id": "symptom_id",
    "label": "Patient-friendly symptom description", 
    "value": "medical_term"
  }
]

Include 8-10 most relevant symptoms for this context.
`

    try {
      const response = await createChatCompletion(
        [{ role: 'user', content: prompt }],
        'gpt-5-nano',
        {
          responseFormat: 'json_object'
        }
      )

      const result = JSON.parse(response)
      return result.options || []
    } catch (error) {
      console.error('Failed to generate symptom options:', error)
      return []
    }
  }

  private buildContext(responses: QuestionResponse[]): string {
    if (responses.length === 0) return 'No previous responses'
    
    return responses
      .map(response => {
        const answer = Array.isArray(response.answer) 
          ? response.answer.join(', ')
          : response.answer.toString()
        return `${response.questionId}: ${answer}`
      })
      .join('; ')
  }

  private getFallbackOptions(questionType: string, language: string = 'en'): QuestionOption[] {
    const isSpanish = language === 'es'
    
    switch (questionType) {
      case 'severity':
        return isSpanish ? [
          { id: 'mild', label: 'Leve - Apenas perceptible', value: 'mild' },
          { id: 'moderate', label: 'Moderado - Molestia notable', value: 'moderate' },
          { id: 'severe', label: 'Severo - Dolor/molestia significativa', value: 'severe' },
          { id: 'unbearable', label: 'Insoportable - Lo peor posible', value: 'unbearable' }
        ] : [
          { id: 'mild', label: 'Mild - Barely noticeable', value: 'mild' },
          { id: 'moderate', label: 'Moderate - Noticeable discomfort', value: 'moderate' },
          { id: 'severe', label: 'Severe - Significant pain/discomfort', value: 'severe' },
          { id: 'unbearable', label: 'Unbearable - Worst possible', value: 'unbearable' }
        ]
      
      case 'duration':
        return isSpanish ? [
          { id: 'minutes', label: 'Unos minutos', value: 'minutes' },
          { id: 'hours', label: 'Unas horas', value: 'hours' },
          { id: 'days', label: 'Unos días', value: 'days' },
          { id: 'weeks', label: 'Unas semanas', value: 'weeks' },
          { id: 'months', label: 'Unos meses', value: 'months' }
        ] : [
          { id: 'minutes', label: 'A few minutes', value: 'minutes' },
          { id: 'hours', label: 'A few hours', value: 'hours' },
          { id: 'days', label: 'A few days', value: 'days' },
          { id: 'weeks', label: 'A few weeks', value: 'weeks' },
          { id: 'months', label: 'A few months', value: 'months' }
        ]
      
      case 'frequency':
        return isSpanish ? [
          { id: 'constant', label: 'Constante/Siempre', value: 'constant' },
          { id: 'frequent', label: 'Frecuentemente (diario)', value: 'frequent' },
          { id: 'occasional', label: 'Ocasionalmente (semanal)', value: 'occasional' },
          { id: 'rare', label: 'Raramente (mensual)', value: 'rare' }
        ] : [
          { id: 'constant', label: 'Constant/Always', value: 'constant' },
          { id: 'frequent', label: 'Frequently (daily)', value: 'frequent' },
          { id: 'occasional', label: 'Occasionally (weekly)', value: 'occasional' },
          { id: 'rare', label: 'Rarely (monthly)', value: 'rare' }
        ]
      
      case 'ai_multiple_choice':
        // For AI multiple choice questions, provide contextual medical options
        return isSpanish ? [
          { id: 'cough', label: 'Tos (Cough)', value: 'cough' },
          { id: 'sore_throat', label: 'Dolor de garganta (Sore throat)', value: 'sore_throat' },
          { id: 'headache', label: 'Dolor de cabeza (Headache)', value: 'headache' },
          { id: 'muscle_aches', label: 'Dolores musculares (Muscle aches)', value: 'muscle_aches' },
          { id: 'fatigue', label: 'Fatiga (Fatigue)', value: 'fatigue' },
          { id: 'nausea', label: 'Náuseas (Nausea)', value: 'nausea' }
        ] : [
          { id: 'cough', label: 'Cough', value: 'cough' },
          { id: 'sore_throat', label: 'Sore throat', value: 'sore_throat' },
          { id: 'headache', label: 'Headache', value: 'headache' },
          { id: 'muscle_aches', label: 'Muscle aches', value: 'muscle_aches' },
          { id: 'fatigue', label: 'Fatigue', value: 'fatigue' },
          { id: 'nausea', label: 'Nausea', value: 'nausea' }
        ]
      
      default:
        return isSpanish ? [
          { id: 'yes', label: 'Sí', value: 'yes' },
          { id: 'no', label: 'No', value: 'no' },
          { id: 'unsure', label: 'No estoy seguro', value: 'unsure' }
        ] : [
          { id: 'yes', label: 'Yes', value: 'yes' },
          { id: 'no', label: 'No', value: 'no' },
          { id: 'unsure', label: 'Not sure', value: 'unsure' }
        ]
    }
  }
}

export const answerGenerator = new AnswerGenerator()