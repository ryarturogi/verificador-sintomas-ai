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

export const Doctor = z.object({
  id: z.string(),
  name: z.string(),
  specialty: DoctorSpecialty,
  specialtyDisplayName: z.string(),
  description: z.string(),
  experience: z.string(),
  avatar: z.string().optional(),
  isAvailable: z.boolean().default(true),
  responseTime: z.string().default('2-5 minutes'),
  rating: z.number().min(0).max(5).default(4.8),
  consultationCount: z.number().default(0)
})

export type Doctor = z.infer<typeof Doctor>

export const ConsultationMessage = z.object({
  id: z.string(),
  content: z.string(),
  sender: z.enum(['user', 'doctor']),
  timestamp: z.date(),
  isTyping: z.boolean().default(false)
})

export type ConsultationMessage = z.infer<typeof ConsultationMessage>

export const ConsultationSession = z.object({
  id: z.string(),
  doctorId: z.string(),
  doctorName: z.string(),
  doctorSpecialty: DoctorSpecialty,
  startTime: z.date(),
  endTime: z.date().optional(),
  messages: z.array(ConsultationMessage),
  status: z.enum(['active', 'completed', 'cancelled']),
  summary: z.string().optional(),
  recommendations: z.array(z.string()).optional()
})

export type ConsultationSession = z.infer<typeof ConsultationSession>

export const ConsultationRequest = z.object({
  doctorId: z.string(),
  initialMessage: z.string().min(10, 'Please provide more details about your concern'),
  urgency: z.enum(['low', 'medium', 'high']).default('medium'),
  medicalHistory: z.string().optional(),
  currentMedications: z.string().optional(),
  allergies: z.string().optional(),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string()
  })).optional()
})

export type ConsultationRequest = z.infer<typeof ConsultationRequest>

export const ConsultationResponse = z.object({
  message: z.string(),
  recommendations: z.array(z.string()).optional(),
  followUpQuestions: z.array(z.string()).optional(),
  requiresEmergencyCare: z.boolean().default(false),
  emergencyMessage: z.string().optional()
})

export type ConsultationResponse = z.infer<typeof ConsultationResponse>
