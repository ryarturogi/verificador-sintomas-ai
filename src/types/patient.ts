import { z } from 'zod'

/**
 * Patient data types for session-based patient portal
 * All data is stored in encrypted sessions for HIPAA compliance
 */

export const PatientProfile = z.object({
  id: z.string(),
  email: z.string().email().optional(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  dateOfBirth: z.string().optional(), // ISO date string
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
  phone: z.string().optional(),
  emergencyContact: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    relationship: z.string().optional()
  }).optional(),
  createdAt: z.date(),
  lastUpdated: z.date()
})

export type PatientProfile = z.infer<typeof PatientProfile>

export const MedicalHistory = z.object({
  id: z.string(),
  patientId: z.string(),
  allergies: z.array(z.string()).default([]),
  currentMedications: z.array(z.object({
    name: z.string(),
    dosage: z.string().optional(),
    frequency: z.string().optional(),
    prescribedBy: z.string().optional()
  })).default([]),
  chronicConditions: z.array(z.string()).default([]),
  pastSurgeries: z.array(z.object({
    procedure: z.string(),
    date: z.string().optional(),
    hospital: z.string().optional()
  })).default([]),
  familyHistory: z.array(z.string()).default([]),
  lastUpdated: z.date()
})

export type MedicalHistory = z.infer<typeof MedicalHistory>

export const PatientSession = z.object({
  sessionId: z.string(),
  patientId: z.string(),
  profile: PatientProfile.optional(),
  medicalHistory: MedicalHistory.optional(),
  consultationHistory: z.array(z.string()).default([]), // Array of consultation session IDs
  preferences: z.object({
    language: z.enum(['en', 'es']).default('en'),
    notifications: z.boolean().default(true),
    dataSharing: z.boolean().default(false)
  }).optional(),
  createdAt: z.date(),
  lastActivity: z.date(),
  expiresAt: z.date()
})

export type PatientSession = z.infer<typeof PatientSession>

export const PatientDashboardData = z.object({
  recentConsultations: z.array(z.object({
    id: z.string(),
    doctorName: z.string(),
    specialty: z.string(),
    date: z.date(),
    status: z.enum(['active', 'completed', 'cancelled']),
    summary: z.string().optional()
  })).default([]),
  upcomingConsultations: z.array(z.object({
    id: z.string(),
    doctorName: z.string(),
    specialty: z.string(),
    scheduledDate: z.date(),
    status: z.enum(['scheduled', 'confirmed', 'cancelled'])
  })).default([]),
  healthSummary: z.object({
    totalConsultations: z.number().default(0),
    lastConsultationDate: z.date().optional(),
    activeConditions: z.array(z.string()).default([]),
    currentMedications: z.number().default(0)
  }).optional()
})

export type PatientDashboardData = z.infer<typeof PatientDashboardData>

// Patient portal navigation items
export const PatientPortalNavItem = z.object({
  id: z.string(),
  label: z.string(),
  href: z.string(),
  icon: z.string(),
  description: z.string().optional(),
  badge: z.number().optional(),
  color: z.string().optional(),
  gradient: z.string().optional(),
  borderColor: z.string().optional(),
  textColor: z.string().optional(),
  iconColor: z.string().optional()
})

export type PatientPortalNavItem = z.infer<typeof PatientPortalNavItem>

// Patient portal state management
export const PatientPortalState = z.object({
  currentView: z.enum(['dashboard', 'profile', 'consultations', 'medical-history']).default('dashboard'),
  isLoading: z.boolean().default(false),
  error: z.string().optional(),
  lastSync: z.date().optional()
})

export type PatientPortalState = z.infer<typeof PatientPortalState>
