import { z } from 'zod'

export const SymptomSeverity = z.enum(['mild', 'moderate', 'severe', 'emergency'])
export type SymptomSeverity = z.infer<typeof SymptomSeverity>

export const SymptomData = z.object({
  primarySymptom: z.string().min(1, 'Primary symptom is required'),
  description: z.string().min(10, 'Please provide more detail about your symptoms'),
  duration: z.string().min(1, 'Duration is required'),
  severity: SymptomSeverity,
  additionalSymptoms: z.array(z.string()).optional(),
  age: z.number().min(1).max(120),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
  hasChronicConditions: z.boolean(),
  chronicConditions: z.string().optional(),
  currentMedications: z.string().optional(),
  isPregnant: z.boolean().optional(),
  allergies: z.string().optional(),
})

export type SymptomData = z.infer<typeof SymptomData>

export const AssessmentResult = z.object({
  severity: SymptomSeverity,
  possibleConditions: z.array(z.object({
    name: z.string(),
    probability: z.number(),
    description: z.string(),
  })),
  recommendations: z.array(z.string()),
  emergencyWarning: z.boolean(),
  emergencyMessage: z.string().optional(),
  followUpAdvice: z.string(),
})

export type AssessmentResult = z.infer<typeof AssessmentResult>

export const EmergencySymptoms = [
  'chest pain',
  'difficulty breathing',
  'severe head injury',
  'stroke symptoms',
  'severe bleeding',
  'loss of consciousness',
  'severe allergic reaction',
  'suicide thoughts',
  'heart attack symptoms',
  'severe abdominal pain',
] as const

export type EmergencySymptom = typeof EmergencySymptoms[number]

export interface GPTModelConfig {
  model: 'gpt-5-nano'
  temperature?: number // Optional since gpt-5-nano doesn't support temperature
  maxTokens?: number // Optional since gpt-5-nano uses default token limits
  useCase: 'primary' | 'quick' | 'emergency'
}