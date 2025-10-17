import { createChatCompletion } from '@/lib/openai'
import { QuestionResponse } from '@/types/dynamic-questionnaire'
import { AssessmentResult } from '@/types/symptom-checker'
import { GPT_MODELS } from '@/constants/symptom-checker'

export class DynamicSymptomAnalyzer {
  
  async analyzeResponses(responses: QuestionResponse[], language: string = 'en'): Promise<AssessmentResult> {
    // Check for emergency responses first
    const emergencyResponse = this.checkEmergencyResponses(responses, language)
    if (emergencyResponse) {
      return emergencyResponse
    }

    const context = this.buildContextFromResponses(responses)
    const severity = this.assessSeverity(responses)
    const modelConfig = this.selectModel(severity)

    try {
      const prompt = this.buildAnalysisPrompt(context, responses, language)
      
      const response = await createChatCompletion(
        [{ role: 'user', content: prompt }],
        modelConfig.model,
        {
          maxTokens: modelConfig.maxTokens,
          responseFormat: 'json_object',
          reasoningEffort: 'medium',
          verbosity: 'medium'
        }
      )

      let result
      try {
        result = JSON.parse(response)
      } catch (parseError) {
        console.error('JSON Parse Error in dynamic analyzer:', parseError)
        console.error('Response that failed to parse:', response)
        
        // Try to fix truncated JSON by attempting to complete it
        if (response.includes('"severity"') || response.includes('"possibleConditions"')) {
          console.log('Attempting to fix truncated JSON response in dynamic analyzer...')
          try {
            // Try to complete the JSON by adding missing closing braces
            let fixedResponse = response.trim()
            if (!fixedResponse.endsWith('}')) {
              // Count opening and closing braces to determine how many are missing
              const openBraces = (fixedResponse.match(/\{/g) || []).length
              const closeBraces = (fixedResponse.match(/\}/g) || []).length
              const missingBraces = openBraces - closeBraces
              
              if (missingBraces > 0) {
                fixedResponse += '}'.repeat(missingBraces)
                console.log('Fixed JSON by adding missing closing braces in dynamic analyzer')
              }
            }
            
            result = JSON.parse(fixedResponse)
            console.log('Successfully fixed truncated JSON in dynamic analyzer')
          } catch (fixError) {
            console.error('Failed to fix truncated JSON in dynamic analyzer:', fixError)
            throw new Error(`Failed to parse JSON response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`)
          }
        } else {
          throw new Error(`Failed to parse JSON response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`)
        }
      }
      
      const isSpanish = language === 'es'
      
      return {
        severity: result.severity || severity,
        possibleConditions: result.possibleConditions || [],
        recommendations: result.recommendations || [],
        emergencyWarning: false,
        followUpAdvice: result.followUpAdvice || (isSpanish 
          ? 'Consulte con un proveedor de atención médica para una evaluación adecuada.'
          : 'Consult with a healthcare provider for proper evaluation.'),
      }
    } catch (error) {
      console.error('Dynamic analysis failed:', error)
      const isSpanish = language === 'es'
      throw new Error(isSpanish 
        ? 'No se pudieron analizar tus respuestas. Inténtalo de nuevo o consulta a un proveedor de atención médica.'
        : 'Unable to analyze your responses. Please try again or consult a healthcare provider.')
    }
  }

  private checkEmergencyResponses(responses: QuestionResponse[], language: string = 'en'): AssessmentResult | null {
    const emergencyResponse = responses.find(r => r.questionId === 'emergency_symptoms')
    
    const isSpanish = language === 'es'
    
    if (emergencyResponse && Array.isArray(emergencyResponse.answer)) {
      const emergencySymptoms = emergencyResponse.answer.filter(symptom => symptom !== 'none')
      
      if (emergencySymptoms.length > 0) {
        return {
          severity: 'emergency',
          possibleConditions: [],
          recommendations: [
            isSpanish 
              ? 'Busque atención médica de emergencia inmediata' 
              : 'Seek immediate emergency medical care'
          ],
          emergencyWarning: true,
          emergencyMessage: isSpanish
            ? 'Tus respuestas indican síntomas de emergencia potenciales. Llama al 911 o ve a la sala de emergencias más cercana inmediatamente.'
            : 'Your responses indicate potential emergency symptoms. Call 911 or go to the nearest emergency room immediately.',
          followUpAdvice: isSpanish
            ? 'No retrases la búsqueda de atención médica de emergencia.'
            : 'Do not delay seeking emergency medical attention.',
        }
      }
    }

    // Check for emergency keywords in text responses
    const textResponses = responses.filter(r => typeof r.answer === 'string')
    const emergencyKeywords = [
      'chest pain', 'can\'t breathe', 'difficulty breathing', 'severe pain',
      'loss of consciousness', 'stroke', 'heart attack', 'severe bleeding',
      'suicide', 'overdose', 'allergic reaction',
      // Spanish keywords
      'dolor de pecho', 'no puedo respirar', 'dificultad para respirar', 'dolor severo',
      'pérdida de conciencia', 'derrame cerebral', 'infarto', 'sangrado severo',
      'suicidio', 'sobredosis', 'reacción alérgica'
    ]

    for (const response of textResponses) {
      const text = (response.answer as string).toLowerCase()
      if (emergencyKeywords.some(keyword => text.includes(keyword))) {
        return {
          severity: 'emergency',
          possibleConditions: [],
          recommendations: [
            isSpanish 
              ? 'Busque atención médica de emergencia inmediata' 
              : 'Seek immediate emergency medical care'
          ],
          emergencyWarning: true,
          emergencyMessage: isSpanish
            ? 'Tus síntomas pueden indicar una emergencia médica. Llama al 911 o ve a la sala de emergencias más cercana inmediatamente.'
            : 'Your symptoms may indicate a medical emergency. Call 911 or go to the nearest emergency room immediately.',
          followUpAdvice: isSpanish
            ? 'No retrases la búsqueda de atención médica de emergencia.'
            : 'Do not delay seeking emergency medical attention.',
        }
      }
    }

    return null
  }

  private buildContextFromResponses(responses: QuestionResponse[]): string {
    const contextParts: string[] = []

    responses.forEach(response => {
      const answer = Array.isArray(response.answer) 
        ? response.answer.join(', ')
        : response.answer.toString()
      
      // Format based on question ID for better context
      switch (response.questionId) {
        case 'initial_symptom':
          contextParts.push(`Primary complaint: ${answer}`)
          break
        case 'age':
          contextParts.push(`Patient age: ${answer}`)
          break
        case 'gender':
          contextParts.push(`Gender: ${answer}`)
          break
        default:
          contextParts.push(`${response.questionId}: ${answer}`)
      }
    })

    return contextParts.join('\n')
  }

  private assessSeverity(responses: QuestionResponse[]): 'mild' | 'moderate' | 'severe' | 'emergency' {
    // Look for severity indicators in responses
    const severityResponse = responses.find(r => 
      r.questionId.includes('severity') || 
      r.questionId.includes('pain') ||
      r.questionId.includes('scale')
    )

    if (severityResponse && typeof severityResponse.answer === 'number') {
      const scale = severityResponse.answer
      if (scale >= 8) return 'severe'
      if (scale >= 6) return 'moderate'
      if (scale >= 3) return 'mild'
    }

    // Analyze text responses for severity indicators
    const textResponses = responses.filter(r => typeof r.answer === 'string')
    const severeKeywords = ['severe', 'excruciating', 'unbearable', 'worst', 'intense']
    const moderateKeywords = ['moderate', 'noticeable', 'bothering', 'uncomfortable']

    for (const response of textResponses) {
      const text = (response.answer as string).toLowerCase()
      if (severeKeywords.some(keyword => text.includes(keyword))) {
        return 'severe'
      }
      if (moderateKeywords.some(keyword => text.includes(keyword))) {
        return 'moderate'
      }
    }

    return 'mild'
  }

  private selectModel(severity: string) {
    switch (severity) {
      case 'emergency':
      case 'severe':
        return GPT_MODELS.PRIMARY
      case 'moderate':
        return GPT_MODELS.QUICK
      case 'mild':
      default:
        return GPT_MODELS.QUICK
    }
  }

  private buildAnalysisPrompt(context: string, responses: QuestionResponse[], language: string = 'en'): string {
    const isSpanish = language === 'es'
    
    return `
You are an AI medical assistant providing symptom analysis based on a dynamic questionnaire.

${isSpanish ? 'IMPORTANTE: Responde completamente en español. Todas las condiciones, recomendaciones y consejos deben estar en español.' : 'IMPORTANT: Respond in English.'}

Patient Information and Responses:
${context}

Number of responses: ${responses.length}

Based on this information, provide a comprehensive medical assessment. Focus on:

1. Analyzing the primary symptoms and their characteristics
2. Considering the patient's responses in medical context
3. Identifying possible conditions with probability estimates
4. Providing appropriate recommendations based on symptom severity
5. Determining appropriate follow-up care

IMPORTANT: Always include appropriate medical disclaimers and emphasize that this is not a medical diagnosis.

Format your response as a JSON object with this exact structure:
{
  "severity": "mild" | "moderate" | "severe" | "emergency",
  "possibleConditions": [
    {
      "name": "condition name",
      "probability": 0.0-1.0,
      "description": "brief explanation of the condition and why it matches"
    }
  ],
  "recommendations": [
    "specific actionable recommendation 1",
    "specific actionable recommendation 2"
  ],
  "followUpAdvice": "detailed advice on when and how to seek further medical care",
  "redFlags": [
    "warning sign 1 to watch for",
    "warning sign 2 to watch for"
  ],
  "selfCare": [
    "appropriate self-care suggestion 1",
    "appropriate self-care suggestion 2"
  ]
}

Guidelines:
- Be conservative with assessments
- Encourage professional medical consultation when appropriate
- Provide practical, actionable advice
- Consider the patient's age and gender in recommendations
- Include red flag symptoms to watch for
- Suggest appropriate self-care measures when safe to do so
`
  }
}

export const dynamicSymptomAnalyzer = new DynamicSymptomAnalyzer()