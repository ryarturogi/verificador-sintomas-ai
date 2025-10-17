import { Question, QuestionResponse } from '@/types/dynamic-questionnaire'
import { medicalImageAnalyzer } from './medical-image-analyzer'

export class ClientQuestionService {
  
  async generateInitialQuestion(language: string = 'en', initialTopic?: string): Promise<Question> {
    // Check if initialTopic is an image type
    const imageTypes = ['mri', 'ct_scan', 'xray', 'ultrasound', 'pathology', 'general']
    if (initialTopic && imageTypes.includes(initialTopic)) {
      return await medicalImageAnalyzer.generateImageQuestion(initialTopic, [], language)
    }

    try {
      const response = await fetch('/api/generate-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'initial',
          language,
          initialTopic,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate initial question')
      }

      const data = await response.json()
      return data.question
    } catch (error) {
      console.error('Failed to generate initial question:', error)
      // Fallback question
      const isSpanish = language === 'es'
      return {
        id: 'initial_symptom',
        type: 'ai_text_input',
        text: isSpanish ? '¿Cuál es tu principal preocupación de salud o síntoma hoy?' : 'What is your main health concern or symptom today?',
        description: isSpanish ? 'Por favor describe en detalle lo que te trajo aquí hoy.' : 'Please describe what brought you here today in detail.',
        required: true,
        placeholder: isSpanish ? 'ej., Tengo un dolor de cabeza severo que comenzó ayer...' : 'e.g., I have a severe headache that started yesterday...',
        generateAnswers: true
      }
    }
  }

  async generateNextQuestion(
    previousResponses: QuestionResponse[],
    questionCount: number,
    language: string = 'en'
  ): Promise<Question | null> {
    try {
      const response = await fetch('/api/generate-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'next',
          previousResponses,
          questionCount,
          language,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate next question')
      }

      const data = await response.json()
      return data.question
    } catch (error) {
      console.error('Failed to generate next question:', error)
      return null
    }
  }

  async shouldAskEmergencyQuestion(responses: QuestionResponse[]): Promise<boolean> {
    try {
      const response = await fetch('/api/check-emergency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ responses }),
      })

      if (!response.ok) {
        throw new Error('Failed to check emergency need')
      }

      const data = await response.json()
      return data.needsEmergencyCheck
    } catch (error) {
      console.error('Failed to check emergency need:', error)
      return false
    }
  }

  async generateEmergencyQuestion(): Promise<Question> {
    try {
      const response = await fetch('/api/generate-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'emergency',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate emergency question')
      }

      const data = await response.json()
      return data.question
    } catch (error) {
      console.error('Failed to generate emergency question:', error)
      // Fallback emergency question
      return {
        id: 'emergency_symptoms',
        type: 'multiple_choice',
        text: 'Are you experiencing any of these symptoms right now?',
        description: 'Select all that apply. These may require immediate medical attention.',
        required: true,
        generateAnswers: false,
        options: [
          { id: 'chest_pain', label: 'Severe chest pain', value: 'chest_pain' },
          { id: 'breathing_difficulty', label: 'Difficulty breathing', value: 'breathing_difficulty' },
          { id: 'severe_bleeding', label: 'Severe bleeding', value: 'severe_bleeding' },
          { id: 'loss_consciousness', label: 'Loss of consciousness', value: 'loss_consciousness' },
          { id: 'severe_head_injury', label: 'Severe head injury', value: 'severe_head_injury' },
          { id: 'stroke_symptoms', label: 'Signs of stroke (facial drooping, arm weakness, speech difficulty)', value: 'stroke_symptoms' },
          { id: 'severe_allergic', label: 'Severe allergic reaction', value: 'severe_allergic' },
          { id: 'suicidal_thoughts', label: 'Thoughts of self-harm', value: 'suicidal_thoughts' },
          { id: 'none', label: 'None of the above', value: 'none' }
        ]
      }
    }
  }

  getInitialResponseForTopic(topic: string, language: string = 'en'): QuestionResponse {
    const isSpanish = language === 'es'
    
    const topicMappings: Record<string, { en: string; es: string }> = {
      'general': {
        en: 'I have general symptoms and health concerns',
        es: 'Tengo síntomas generales y preocupaciones de salud'
      },
      'mental': {
        en: 'I have concerns about my mental health, including anxiety, depression, or stress',
        es: 'Tengo preocupaciones sobre mi salud mental, incluyendo ansiedad, depresión o estrés'
      },
      'heart': {
        en: 'I have concerns about my heart health, including chest pain or palpitations',
        es: 'Tengo preocupaciones sobre mi salud cardíaca, incluyendo dolor de pecho o palpitaciones'
      },
      'chat': {
        en: 'I want to discuss my health concerns with AI assistance',
        es: 'Quiero discutir mis preocupaciones de salud con asistencia de IA'
      },
      'preventive': {
        en: 'I want a general health checkup and preventive assessment',
        es: 'Quiero un chequeo de salud general y evaluación preventiva'
      },
      'community': {
        en: 'I want to explore health topics and connect with others',
        es: 'Quiero explorar temas de salud y conectar con otros'
      },
      'search': {
        en: 'I searched for specific health information',
        es: 'Busqué información específica de salud'
      }
    }

    const topicAnswer = topicMappings[topic] || topicMappings['general']
    
    return {
      questionId: 'initial_symptom',
      answer: isSpanish ? topicAnswer.es : topicAnswer.en,
      timestamp: new Date()
    }
  }
}

export const clientQuestionService = new ClientQuestionService()