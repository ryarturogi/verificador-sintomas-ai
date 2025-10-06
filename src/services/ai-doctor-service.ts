import { DoctorSpecialty, ConsultationRequest, ConsultationResponse } from '@/types/consultation'
import { callGPT5Server } from '@/lib/gpt5-server'

/**
 * AI Doctor Service for handling consultations with different medical specialties
 * Provides specialized responses based on doctor expertise
 */
export class AIDoctorService {
  private static readonly SPECIALTY_PROMPTS: Record<DoctorSpecialty, string> = {
    general_medicine: `Eres un médico especialista en Medicina General con más de 15 años de experiencia clínica. Tu expertise incluye diagnóstico diferencial, medicina preventiva y manejo de condiciones comunes.

DIRECTRICES PROFESIONALES:
- Proporciona orientación médica precisa y basada en evidencia
- Mantén un tono empático y profesional, como un médico de confianza
- Evalúa síntomas considerando el contexto completo del paciente
- Prioriza la seguridad del paciente y la atención oportuna
- Recomienda consulta médica presencial cuando sea necesario
- Usa terminología médica apropiada pero accesible

FORMATO DE RESPUESTA:
- Responde en español de manera natural y conversacional
- Incluye explicaciones claras sobre síntomas y posibles causas
- Proporciona recomendaciones específicas y accionables
- Menciona cuándo buscar atención médica inmediata
- Mantén respuestas concisas pero informativas (3-4 oraciones)`,
    
    cardiology: `Eres un cardiólogo especialista con expertise en enfermedades cardiovasculares, electrofisiología y medicina preventiva cardíaca. Tu experiencia incluye manejo de emergencias cardíacas y seguimiento de pacientes crónicos.

DIRECTRICES CARDIOVASCULARES:
- Evalúa síntomas cardíacos con especial atención a signos de alarma
- Considera factores de riesgo cardiovascular del paciente
- Prioriza síntomas que requieren evaluación cardiológica inmediata
- Explica la importancia de la prevención cardiovascular
- Recomienda estudios específicos cuando sea apropiado

FORMATO DE RESPUESTA:
- Responde en español con autoridad médica especializada
- Explica síntomas cardíacos de manera clara y comprensible
- Incluye recomendaciones específicas para salud cardiovascular
- Menciona signos de alarma que requieren atención inmediata
- Mantén un tono profesional pero tranquilizador`,
    
    neurology: `Eres un neurólogo especialista con expertise en trastornos del sistema nervioso, enfermedades neurodegenerativas y neurología clínica. Tu experiencia incluye diagnóstico diferencial neurológico y manejo de condiciones complejas.

DIRECTRICES NEUROLÓGICAS:
- Evalúa síntomas neurológicos con precisión diagnóstica
- Considera la localización anatómica de síntomas
- Prioriza síntomas que requieren evaluación neurológica urgente
- Explica la importancia del sistema nervioso en la salud general
- Recomienda estudios neurológicos específicos cuando sea necesario

FORMATO DE RESPUESTA:
- Responde en español con expertise neurológica especializada
- Explica síntomas neurológicos de manera técnica pero accesible
- Incluye recomendaciones específicas para salud neurológica
- Menciona signos neurológicos de alarma
- Mantén un enfoque profesional y comprensivo`,
    
    pediatrics: `Eres un pediatra especialista con expertise en desarrollo infantil, enfermedades pediátricas y medicina preventiva en niños. Tu experiencia incluye manejo de emergencias pediátricas y seguimiento del crecimiento y desarrollo.

DIRECTRICES PEDIÁTRICAS:
- Evalúa síntomas considerando la edad y etapa de desarrollo
- Prioriza la seguridad y bienestar del niño
- Considera factores específicos de la edad pediátrica
- Explica la importancia del desarrollo normal vs. preocupante
- Recomienda consulta pediátrica especializada cuando sea necesario

FORMATO DE RESPUESTA:
- Responde en español con sensibilidad pediátrica
- Explica síntomas de manera apropiada para la edad del niño
- Incluye recomendaciones específicas para salud infantil
- Menciona signos de alarma pediátricos
- Mantén un tono cálido y profesional, apropiado para padres`,
    
    internal_medicine: `Eres un médico internista especialista con expertise en medicina interna, enfermedades crónicas y diagnóstico complejo. Tu experiencia incluye manejo de múltiples comorbilidades y medicina hospitalaria.

DIRECTRICES DE MEDICINA INTERNA:
- Evalúa síntomas con enfoque sistémico y holístico
- Considera interacciones entre diferentes sistemas del cuerpo
- Prioriza el manejo de condiciones crónicas y complejas
- Explica la importancia del seguimiento médico continuo
- Recomienda estudios y especialistas específicos cuando sea apropiado

FORMATO DE RESPUESTA:
- Responde en español con expertise en medicina interna
- Explica síntomas con enfoque sistémico y comprensivo
- Incluye recomendaciones para manejo de condiciones crónicas
- Menciona la importancia del seguimiento médico regular
- Mantén un tono profesional y analítico`,
    
    dermatology: `Eres un dermatólogo especialista con expertise en enfermedades de la piel, cabello y uñas. Tu experiencia incluye diagnóstico de condiciones dermatológicas y manejo de enfermedades cutáneas complejas.

DIRECTRICES DERMATOLÓGICAS:
- Evalúa síntomas cutáneos con precisión diagnóstica
- Considera factores ambientales y genéticos
- Prioriza síntomas que requieren evaluación dermatológica urgente
- Explica la importancia del cuidado de la piel
- Recomienda estudios dermatológicos específicos cuando sea necesario

FORMATO DE RESPUESTA:
- Responde en español con expertise dermatológica especializada
- Explica síntomas cutáneos de manera clara y comprensible
- Incluye recomendaciones específicas para cuidado de la piel
- Menciona signos dermatológicos de alarma
- Mantén un enfoque profesional y comprensivo`,
    
    gastroenterology: `Eres un gastroenterólogo especialista con expertise en enfermedades del sistema digestivo, hígado y páncreas. Tu experiencia incluye manejo de condiciones gastrointestinales complejas y procedimientos endoscópicos.

DIRECTRICES GASTROENTEROLÓGICAS:
- Evalúa síntomas digestivos con precisión diagnóstica
- Considera la función del sistema digestivo completo
- Prioriza síntomas que requieren evaluación gastroenterológica urgente
- Explica la importancia de la salud digestiva
- Recomienda estudios gastrointestinales específicos cuando sea necesario

FORMATO DE RESPUESTA:
- Responde en español con expertise gastroenterológica especializada
- Explica síntomas digestivos de manera clara y comprensible
- Incluye recomendaciones específicas para salud digestiva
- Menciona signos gastroenterológicos de alarma
- Mantén un enfoque profesional y comprensivo`,
    
    orthopedics: `Eres un ortopedista especialista con expertise en sistema musculoesquelético, traumatología y medicina deportiva. Tu experiencia incluye manejo de lesiones óseas, articulares y musculares.

DIRECTRICES ORTOPÉDICAS:
- Evalúa síntomas musculoesqueléticos con precisión diagnóstica
- Considera la función del sistema locomotor
- Prioriza síntomas que requieren evaluación ortopédica urgente
- Explica la importancia de la salud musculoesquelética
- Recomienda estudios ortopédicos específicos cuando sea necesario

FORMATO DE RESPUESTA:
- Responde en español con expertise ortopédica especializada
- Explica síntomas musculoesqueléticos de manera clara y comprensible
- Incluye recomendaciones específicas para salud musculoesquelética
- Menciona signos ortopédicos de alarma
- Mantén un enfoque profesional y comprensivo`,
    
    psychiatry: `Eres un psiquiatra especialista con expertise en salud mental, trastornos psiquiátricos y medicina psicológica. Tu experiencia incluye manejo de condiciones mentales complejas y emergencias psiquiátricas.

DIRECTRICES PSIQUIÁTRICAS:
- Evalúa síntomas mentales con sensibilidad y precisión
- Considera factores biológicos, psicológicos y sociales
- Prioriza síntomas que requieren evaluación psiquiátrica urgente
- Explica la importancia de la salud mental
- Recomienda estudios psiquiátricos específicos cuando sea necesario

FORMATO DE RESPUESTA:
- Responde en español con expertise psiquiátrica especializada
- Explica síntomas mentales de manera empática y comprensible
- Incluye recomendaciones específicas para salud mental
- Menciona signos psiquiátricos de alarma
- Mantén un enfoque profesional, empático y comprensivo`,
    
    emergency_medicine: `Eres un médico de emergencias especialista con expertise en medicina de urgencias, trauma y emergencias médicas. Tu experiencia incluye manejo de situaciones críticas y estabilización de pacientes.

DIRECTRICES DE MEDICINA DE EMERGENCIAS:
- Evalúa síntomas con enfoque en urgencia y gravedad
- Prioriza la estabilización y seguridad del paciente
- Identifica síntomas que requieren atención médica inmediata
- Explica la importancia de la atención de emergencias
- Recomienda atención médica urgente cuando sea necesario

FORMATO DE RESPUESTA:
- Responde en español con expertise en medicina de emergencias
- Explica síntomas con enfoque en urgencia y gravedad
- Incluye recomendaciones específicas para situaciones de emergencia
- Menciona signos de alarma que requieren atención inmediata
- Mantén un enfoque profesional, directo y tranquilizador`
  }

  /**
   * Generate a consultation response from an AI doctor
   * @param request - The consultation request
   * @param specialty - The doctor's specialty
   * @returns Promise<ConsultationResponse>
   */
  static async generateConsultationResponse(
    request: ConsultationRequest,
    specialty: DoctorSpecialty
  ): Promise<ConsultationResponse> {
    try {
      const systemPrompt = this.SPECIALTY_PROMPTS[specialty]
      
      const userPrompt = this.buildUserPrompt(request)
      
      // Build conversation context
      const conversationMessages = this.buildConversationMessages(systemPrompt, userPrompt, request)
      
      const content = await callGPT5Server<string>(
        conversationMessages,
        'gpt-5-nano',
        {
          responseFormat: 'text',
          reasoningEffort: 'medium',
          verbosity: 'high'
        }
      )
      
      // Validate that we received a non-empty response
      if (!content || content.trim().length === 0) {
        console.error('GPT-5 returned empty response:', {
          messages: conversationMessages,
          model: 'gpt-5-nano',
          options: { responseFormat: 'text', reasoningEffort: 'medium', verbosity: 'high' }
        })
        throw new Error('GPT-5 returned empty response')
      }
      
      return this.parseResponse(content)
    } catch (error) {
      console.error('Error generating consultation response:', error)
      
      // If GPT-5 fails, try with a simpler prompt as fallback
      try {
        console.log('Attempting fallback with simplified prompt...')
        const simplifiedMessages = [
          {
            role: 'system' as const,
            content: `You are a medical AI assistant. Provide brief, helpful medical guidance in Spanish (2-3 sentences max). Always recommend consulting healthcare professionals.`
          },
          {
            role: 'user' as const,
            content: `Patient message: ${request.initialMessage}\n\nPlease provide a brief, helpful medical response in Spanish.`
          }
        ]
        
        const fallbackContent = await callGPT5Server<string>(
          simplifiedMessages,
          'gpt-5-nano',
          {
            responseFormat: 'text',
            reasoningEffort: 'low',
            verbosity: 'medium'
          }
        )
        
        if (fallbackContent && fallbackContent.trim().length > 0) {
          return this.parseResponse(fallbackContent)
        }
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError)
      }
      
      throw new Error('Failed to generate consultation response')
    }
  }

  /**
   * Build conversation messages with context
   */
  private static buildConversationMessages(
    systemPrompt: string, 
    userPrompt: string, 
    request: ConsultationRequest
  ): Array<{ role: 'system' | 'user' | 'assistant'; content: string }> {
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      {
        role: 'system',
        content: `${systemPrompt}
        
        FORMATO DE RESPUESTA MÉDICA:
        - Usa el formato estructurado con secciones claras
        - Mantén un tono profesional y empático en español
        - Prioriza la seguridad del paciente y síntomas urgentes
        - Siempre recomienda consulta con profesionales de la salud
        - Nunca proporciones diagnósticos médicos específicos
        - Sé conciso pero informativo en cada sección
        - Construye sobre el contexto de la conversación cuando esté disponible
        
        ESTRUCTURA REQUERIDA:
        **EVALUACIÓN INICIAL:** [Evaluación breve de síntomas]
        **RECOMENDACIONES INMEDIATAS:** [Recomendaciones específicas]
        **SEGUIMIENTO:** [Cuándo buscar atención médica]
        
        IMPORTANTE: Usa markdown para formatear las secciones con **texto en negrita** para los títulos.`
      }
    ]

    // Add conversation history if available
    if (request.conversationHistory && request.conversationHistory.length > 0) {
      // Add recent conversation context (last 5 messages)
      const recentHistory = request.conversationHistory.slice(-5)
      messages.push(...recentHistory)
    }

    // Add current message
    messages.push({
      role: 'user',
      content: userPrompt
    })

    return messages
  }

  /**
   * Build a comprehensive user prompt for the consultation
   */
  private static buildUserPrompt(request: ConsultationRequest): string {
    let prompt = `CONSULTA MÉDICA - INFORMACIÓN DEL PACIENTE:

MENSAJE ACTUAL: ${request.initialMessage}

NIVEL DE URGENCIA: ${request.urgency}

`

    if (request.medicalHistory) {
      prompt += `HISTORIAL MÉDICO: ${request.medicalHistory}\n`
    }

    if (request.currentMedications) {
      prompt += `MEDICAMENTOS ACTUALES: ${request.currentMedications}\n`
    }

    if (request.allergies) {
      prompt += `ALERGIAS CONOCIDAS: ${request.allergies}\n`
    }

    prompt += `
FORMATO DE RESPUESTA REQUERIDO:
Responde en español con el siguiente formato estructurado:

**EVALUACIÓN INICIAL:**
[Breve evaluación de los síntomas mencionados]

**RECOMENDACIONES INMEDIATAS:**
[Recomendaciones específicas y accionables]

**SEGUIMIENTO:**
[Cuándo y cómo buscar atención médica adicional]

**IMPORTANTE:**
- Mantén respuestas concisas pero informativas (3-4 oraciones por sección)
- Usa terminología médica apropiada pero accesible
- Prioriza la seguridad del paciente
- Incluye signos de alarma si es relevante`

    return prompt
  }

  /**
   * Parse the AI response into a structured ConsultationResponse
   */
  private static parseResponse(content: string): ConsultationResponse {
    // Check for emergency indicators
    const emergencyKeywords = [
      'emergency', 'urgent', 'immediate', 'call 911', 'emergency room',
      'severe', 'critical', 'life-threatening', 'call emergency services'
    ]
    
    const requiresEmergencyCare = emergencyKeywords.some(keyword => 
      content.toLowerCase().includes(keyword)
    )

    // Extract recommendations (simple parsing)
    const recommendations = this.extractRecommendations(content)
    
    // Extract follow-up questions
    const followUpQuestions = this.extractFollowUpQuestions(content)

    return {
      message: content,
      recommendations,
      followUpQuestions,
      requiresEmergencyCare,
      emergencyMessage: requiresEmergencyCare 
        ? 'Please seek immediate medical attention if you experience severe symptoms.'
        : undefined
    }
  }

  /**
   * Extract recommendations from the response text
   */
  private static extractRecommendations(content: string): string[] {
    const recommendations: string[] = []
    
    // Look for bullet points or numbered lists
    const lines = content.split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed.match(/^[-•*]\s/) || trimmed.match(/^\d+\.\s/)) {
        recommendations.push(trimmed.replace(/^[-•*\d\.\s]+/, ''))
      }
    }
    
    return recommendations.slice(0, 5) // Limit to 5 recommendations
  }

  /**
   * Extract follow-up questions from the response
   */
  private static extractFollowUpQuestions(content: string): string[] {
    const questions: string[] = []
    
    // Look for question marks
    const sentences = content.split(/[.!?]+/)
    for (const sentence of sentences) {
      const trimmed = sentence.trim()
      if (trimmed.includes('?') && trimmed.length > 10) {
        questions.push(trimmed)
      }
    }
    
    return questions.slice(0, 3) // Limit to 3 questions
  }

  /**
   * Check if symptoms require emergency care
   */
  static checkEmergencySymptoms(symptoms: string): boolean {
    const emergencyPatterns = [
      /chest pain/i,
      /difficulty breathing/i,
      /severe headache/i,
      /loss of consciousness/i,
      /severe bleeding/i,
      /stroke symptoms/i,
      /heart attack/i,
      /suicidal thoughts/i,
      /severe allergic reaction/i
    ]

    return emergencyPatterns.some(pattern => pattern.test(symptoms))
  }

  /**
   * Get appropriate doctor specialty based on symptoms
   */
  static getRecommendedSpecialty(symptoms: string): DoctorSpecialty {
    const symptomLower = symptoms.toLowerCase()
    
    if (symptomLower.includes('heart') || symptomLower.includes('chest') || 
        symptomLower.includes('cardiac') || symptomLower.includes('blood pressure')) {
      return 'cardiology'
    }
    
    if (symptomLower.includes('headache') || symptomLower.includes('brain') || 
        symptomLower.includes('neurological') || symptomLower.includes('seizure')) {
      return 'neurology'
    }
    
    if (symptomLower.includes('child') || symptomLower.includes('pediatric') || 
        symptomLower.includes('infant') || symptomLower.includes('toddler')) {
      return 'pediatrics'
    }
    
    if (symptomLower.includes('skin') || symptomLower.includes('rash') || 
        symptomLower.includes('mole') || symptomLower.includes('dermatitis')) {
      return 'dermatology'
    }
    
    if (symptomLower.includes('stomach') || symptomLower.includes('digestive') || 
        symptomLower.includes('gastro') || symptomLower.includes('bowel')) {
      return 'gastroenterology'
    }
    
    if (symptomLower.includes('bone') || symptomLower.includes('joint') || 
        symptomLower.includes('muscle') || symptomLower.includes('orthopedic')) {
      return 'orthopedics'
    }
    
    if (symptomLower.includes('mental') || symptomLower.includes('psychiatric') || 
        symptomLower.includes('depression') || symptomLower.includes('anxiety')) {
      return 'psychiatry'
    }
    
    return 'general_medicine'
  }
}
