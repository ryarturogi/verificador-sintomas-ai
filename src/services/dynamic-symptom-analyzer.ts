import { createChatCompletion } from '@/lib/openai'
import { QuestionResponse } from '@/types/dynamic-questionnaire'
import { AssessmentResult } from '@/types/symptom-checker'
import { GPT_MODELS } from '@/constants/symptom-checker'

export class DynamicSymptomAnalyzer {
  
  async analyzeResponses(responses: QuestionResponse[], language: string = 'en'): Promise<AssessmentResult> {
    // Check for emergency responses first
    const emergencyResponse = this.checkEmergencyResponses(responses)
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
          temperature: modelConfig.temperature,
          maxTokens: modelConfig.maxTokens,
          responseFormat: 'json_object'
        }
      )

      const result = JSON.parse(response)
      
      return {
        severity: result.severity || severity,
        possibleConditions: result.possibleConditions || [],
        recommendations: result.recommendations || [],
        emergencyWarning: false,
        followUpAdvice: result.followUpAdvice || 'Consult with a healthcare provider for proper evaluation.',
      }
    } catch (error) {
      console.error('Dynamic analysis failed:', error)
      throw new Error('Unable to analyze your responses. Please try again or consult a healthcare provider.')
    }
  }

  private checkEmergencyResponses(responses: QuestionResponse[]): AssessmentResult | null {
    const emergencyResponse = responses.find(r => r.questionId === 'emergency_symptoms')
    
    if (emergencyResponse && Array.isArray(emergencyResponse.answer)) {
      const emergencySymptoms = emergencyResponse.answer.filter(symptom => symptom !== 'none')
      
      if (emergencySymptoms.length > 0) {
        return {
          severity: 'emergency',
          possibleConditions: [],
          recommendations: ['Seek immediate emergency medical care'],
          emergencyWarning: true,
          emergencyMessage: 'Your responses indicate potential emergency symptoms. Call 911 or go to the nearest emergency room immediately.',
          followUpAdvice: 'Do not delay seeking emergency medical attention.',
        }
      }
    }

    // Check for emergency keywords in text responses
    const textResponses = responses.filter(r => typeof r.answer === 'string')
    const emergencyKeywords = [
      'chest pain', 'can\'t breathe', 'difficulty breathing', 'severe pain',
      'loss of consciousness', 'stroke', 'heart attack', 'severe bleeding',
      'suicide', 'overdose', 'allergic reaction'
    ]

    for (const response of textResponses) {
      const text = (response.answer as string).toLowerCase()
      if (emergencyKeywords.some(keyword => text.includes(keyword))) {
        return {
          severity: 'emergency',
          possibleConditions: [],
          recommendations: ['Seek immediate emergency medical care'],
          emergencyWarning: true,
          emergencyMessage: 'Your symptoms may indicate a medical emergency. Call 911 or go to the nearest emergency room immediately.',
          followUpAdvice: 'Do not delay seeking emergency medical attention.',
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