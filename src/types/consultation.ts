import { z } from 'zod'

export const DoctorSpecialty = z.enum([
  'general_medicine',
  'cardiology', 
  'neurology',
  'pediatrics',
  'internal_medicine',
  'dermatology',
  'gastroenterology',
  'orthopedics',
  'psychiatry',
  'emergency_medicine'
])

export type DoctorSpecialty = z.infer<typeof DoctorSpecialty>

export const AIAnalysisSpecialist = z.object({
  id: z.string(),
  name: z.string(),
  specialty: DoctorSpecialty,
  specialtyDisplayName: z.string(),
  description: z.string(),
  experience: z.string(),
  avatar: z.string().optional(),
  isAvailable: z.boolean().default(true),
  responseTime: z.string().default('2-5 minutes'),
  accuracy: z.number().min(0).max(5).default(4.8),
  analysisCount: z.number().default(0)
})

export type AIAnalysisSpecialist = z.infer<typeof AIAnalysisSpecialist>

// Keep Doctor type for backward compatibility but mark as deprecated
/** @deprecated Use AIAnalysisSpecialist instead */
export const Doctor = AIAnalysisSpecialist
export type Doctor = AIAnalysisSpecialist

export const AnalysisMessage = z.object({
  id: z.string(),
  content: z.string(),
  sender: z.enum(['user', 'ai_specialist']),
  timestamp: z.date(),
  isTyping: z.boolean().default(false)
})

export type AnalysisMessage = z.infer<typeof AnalysisMessage>

// Keep ConsultationMessage for backward compatibility but mark as deprecated
/** @deprecated Use AnalysisMessage instead */
export const ConsultationMessage = AnalysisMessage
export type ConsultationMessage = AnalysisMessage

export const AnalysisSession = z.object({
  id: z.string(),
  specialistId: z.string(),
  specialistName: z.string(),
  specialistSpecialty: DoctorSpecialty,
  startTime: z.date(),
  endTime: z.date().optional(),
  messages: z.array(AnalysisMessage),
  status: z.enum(['active', 'completed', 'cancelled']),
  summary: z.string().optional(),
  recommendations: z.array(z.string()).optional()
})

export type AnalysisSession = z.infer<typeof AnalysisSession>

// Keep ConsultationSession for backward compatibility but mark as deprecated
/** @deprecated Use AnalysisSession instead */
export const ConsultationSession = AnalysisSession
export type ConsultationSession = AnalysisSession

export const AnalysisRequest = z.object({
  specialistId: z.string(),
  initialMessage: z.string().min(10, 'Please provide more details about your symptoms'),
  urgency: z.enum(['low', 'medium', 'high']).default('medium'),
  medicalHistory: z.string().optional(),
  currentMedications: z.string().optional(),
  allergies: z.string().optional(),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string()
  })).optional()
})

export type AnalysisRequest = z.infer<typeof AnalysisRequest>

// Keep ConsultationRequest for backward compatibility but mark as deprecated
/** @deprecated Use AnalysisRequest instead */
export const ConsultationRequest = AnalysisRequest
export type ConsultationRequest = AnalysisRequest

export const AnalysisResponse = z.object({
  message: z.string(),
  recommendations: z.array(z.string()).optional(),
  followUpQuestions: z.array(z.string()).optional(),
  requiresEmergencyCare: z.boolean().default(false),
  emergencyMessage: z.string().optional()
})

export type AnalysisResponse = z.infer<typeof AnalysisResponse>

// Keep ConsultationResponse for backward compatibility but mark as deprecated
/** @deprecated Use AnalysisResponse instead */
export const ConsultationResponse = AnalysisResponse
export type ConsultationResponse = AnalysisResponse
