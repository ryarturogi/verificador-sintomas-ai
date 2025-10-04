import { QuestionResponse } from '@/types/dynamic-questionnaire'
import { AssessmentResult } from '@/types/symptom-checker'

export class ClientSymptomAnalyzer {
  
  async analyzeResponses(responses: QuestionResponse[], language: string = 'en'): Promise<AssessmentResult> {
    try {
      const response = await fetch('/api/analyze-symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ responses, language }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze symptoms')
      }

      const data = await response.json()
      return data.result
    } catch (error) {
      console.error('Symptom analysis failed:', error)
      const isSpanish = language === 'es'
      throw new Error(isSpanish 
        ? 'No se pudieron analizar tus respuestas. Inténtalo de nuevo o consulta a un proveedor de atención médica.'
        : 'Unable to analyze your responses. Please try again or consult a healthcare provider.')
    }
  }
}

export const clientSymptomAnalyzer = new ClientSymptomAnalyzer()