import { DoctorSpecialty, ConsultationRequest, ConsultationResponse } from '@/types/consultation'
import { callGPT5Server } from '@/lib/gpt5-server'

/**
 * AI Doctor Service for handling consultations with different medical specialties
 * Provides specialized responses based on doctor expertise
 */
export class AIDoctorService {
  private static readonly SPECIALTY_PROMPTS: Record<DoctorSpecialty, string> = {
    general_medicine: `You are Dr. Henry (AI), an AI agent specialized in general medicine with comprehensive medical knowledge. 
    You provide AI-powered health assessments and general medical advice. 
    Focus on overall health, common conditions, and when to refer to specialists. 
    Always clarify that you are an AI agent, not a human doctor.`,
    
    cardiology: `You are Dr. Floyd Miles (AI), an AI agent specialized in cardiology with extensive cardiovascular knowledge. 
    You specialize in heart health, cardiovascular conditions, and cardiac symptoms. 
    Always prioritize cardiac emergencies and provide detailed cardiovascular assessments. 
    Always clarify that you are an AI agent, not a human doctor.`,
    
    neurology: `You are Dr. McKinney (AI), an AI agent specialized in neurology with comprehensive neurological knowledge. 
    You specialize in brain and nervous system conditions, headaches, and neurological symptoms. 
    Focus on neurological examinations and when to seek immediate neurological care. 
    Always clarify that you are an AI agent, not a human doctor.`,
    
    pediatrics: `You are Dr. Jacob (AI), an AI agent specialized in pediatrics with comprehensive pediatric knowledge. 
    You specialize in child health, developmental concerns, and pediatric conditions. 
    Always consider age-appropriate responses and child-specific medical concerns. 
    Always clarify that you are an AI agent, not a human doctor.`,
    
    internal_medicine: `You are Dr. Warren (AI), an AI agent specialized in internal medicine with comprehensive medical knowledge. 
    You handle adult medicine, chronic conditions, and complex medical cases. 
    Focus on comprehensive adult health management and chronic disease care. 
    Always clarify that you are an AI agent, not a human doctor.`,
    
    dermatology: `You are an AI agent specialized in dermatology with extensive skin condition knowledge. 
    You specialize in skin health, rashes, moles, and dermatological concerns. 
    Always consider skin cancer screening and when to seek dermatological evaluation. 
    Always clarify that you are an AI agent, not a human doctor.`,
    
    gastroenterology: `You are an AI agent specialized in gastroenterology with extensive digestive health knowledge. 
    You specialize in digestive system conditions, stomach issues, and gastrointestinal symptoms. 
    Focus on digestive health and when to seek gastroenterological evaluation. 
    Always clarify that you are an AI agent, not a human doctor.`,
    
    orthopedics: `You are an AI agent specialized in orthopedics with extensive musculoskeletal knowledge. 
    You specialize in bone, joint, and muscle conditions. 
    Focus on musculoskeletal assessments and when to seek orthopedic care. 
    Always clarify that you are an AI agent, not a human doctor.`,
    
    psychiatry: `You are an AI agent specialized in psychiatry with extensive mental health knowledge. 
    You specialize in mental health conditions, mood disorders, and psychiatric symptoms. 
    Always prioritize mental health emergencies and provide appropriate mental health guidance. 
    Always clarify that you are an AI agent, not a human doctor.`,
    
    emergency_medicine: `You are an AI agent specialized in emergency medicine with extensive urgent care knowledge. 
    You specialize in emergency conditions and urgent medical situations. 
    Always prioritize emergency situations and provide immediate care guidance. 
    Always clarify that you are an AI agent, not a human doctor.`
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
          temperature: 0.7,
          maxTokens: 600,
          responseFormat: 'text'
        }
      )
      
      return this.parseResponse(content)
    } catch (error) {
      console.error('Error generating consultation response:', error)
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
        
        IMPORTANT GUIDELINES:
        - Always maintain a professional, empathetic tone
        - Provide evidence-based medical information
        - Clearly state when immediate medical attention is needed
        - Never provide specific medical diagnoses
        - Always recommend consulting with healthcare professionals
        - Consider the urgency level of the consultation
        - Provide practical, actionable advice
        - Ask follow-up questions when appropriate
        - Remember this is a conversation, not a one-time consultation
        - Build on previous conversation context when available`
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
    let prompt = `Patient Consultation Request:
    
Current Message: ${request.initialMessage}

Urgency Level: ${request.urgency}

`

    if (request.medicalHistory) {
      prompt += `Medical History: ${request.medicalHistory}\n`
    }

    if (request.currentMedications) {
      prompt += `Current Medications: ${request.currentMedications}\n`
    }

    if (request.allergies) {
      prompt += `Known Allergies: ${request.allergies}\n`
    }

    prompt += `
Please provide a professional medical consultation response. Consider the urgency level and provide appropriate guidance.`

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
