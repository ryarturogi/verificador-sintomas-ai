import { z } from 'zod'

/**
 * Healthcare Professional User Types and Roles
 * Defines the different types of healthcare professionals who will use the symptom analysis system
 */

// User roles in the healthcare system
export const HealthcareRole = z.enum([
  'doctor',
  'nurse', 
  'medical_staff',
  'administrator',
  'specialist'
])

export type HealthcareRole = z.infer<typeof HealthcareRole>

// Medical specialties for doctors
export const MedicalSpecialty = z.enum([
  'general_medicine',
  'cardiology',
  'neurology',
  'pediatrics',
  'internal_medicine',
  'emergency_medicine',
  'surgery',
  'psychiatry',
  'dermatology',
  'orthopedics',
  'gynecology',
  'urology',
  'ophthalmology',
  'otolaryngology',
  'radiology',
  'pathology',
  'anesthesiology',
  'oncology',
  'endocrinology',
  'gastroenterology',
  'pulmonology',
  'rheumatology',
  'nephrology',
  'infectious_disease',
  'family_medicine'
])

export type MedicalSpecialty = z.infer<typeof MedicalSpecialty>

// Professional license information
export const ProfessionalLicense = z.object({
  licenseNumber: z.string(),
  issuingAuthority: z.string(),
  issueDate: z.string(),
  expirationDate: z.string(),
  status: z.enum(['active', 'expired', 'suspended', 'revoked']),
  specialty: MedicalSpecialty.optional()
})

export type ProfessionalLicense = z.infer<typeof ProfessionalLicense>

// Healthcare professional user profile
export const HealthcareProfessional = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  role: HealthcareRole,
  specialty: MedicalSpecialty.optional(),
  licenses: z.array(ProfessionalLicense),
  institution: z.string().optional(), // Hospital, clinic, practice
  department: z.string().optional(),
  phoneNumber: z.string().optional(),
  isActive: z.boolean().default(true),
  permissions: z.array(z.string()), // Specific permissions
  createdAt: z.string(),
  lastLogin: z.string().optional(),
  profileImage: z.string().optional()
})

export type HealthcareProfessional = z.infer<typeof HealthcareProfessional>

// Permission levels for different roles
export const PermissionLevel = z.enum([
  'read_patients',
  'write_patients', 
  'read_medical_records',
  'write_medical_records',
  'prescribe_medications',
  'order_tests',
  'access_emergency_cases',
  'manage_other_professionals',
  'view_analytics',
  'manage_system_settings',
  'access_ai_tools',
  'create_analysis',
  'review_cases',
  'approve_treatments'
])

export type PermissionLevel = z.infer<typeof PermissionLevel>

// Role-based permissions mapping for symptom analysis system
export const ROLE_PERMISSIONS: Record<HealthcareRole, PermissionLevel[]> = {
  doctor: [
    'read_patients',
    'write_patients',
    'read_medical_records', 
    'write_medical_records',
    'prescribe_medications',
    'order_tests',
    'access_emergency_cases',
    'access_ai_tools',
    'create_analysis',
    'review_cases',
    'approve_treatments'
  ],
  nurse: [
    'read_patients',
    'write_patients',
    'read_medical_records',
    'write_medical_records',
    'order_tests',
    'access_emergency_cases',
    'access_ai_tools',
    'create_analysis'
  ],
  medical_staff: [
    'read_patients',
    'read_medical_records',
    'access_ai_tools'
  ],
  specialist: [
    'read_patients',
    'write_patients',
    'read_medical_records',
    'write_medical_records',
    'prescribe_medications',
    'order_tests',
    'access_emergency_cases',
    'access_ai_tools',
    'create_analysis',
    'review_cases',
    'approve_treatments'
  ],
  administrator: [
    'read_patients',
    'write_patients',
    'read_medical_records',
    'write_medical_records',
    'manage_other_professionals',
    'view_analytics',
    'manage_system_settings',
    'access_ai_tools'
  ]
}

// Session information for healthcare professionals
export const HealthcareSession = z.object({
  sessionId: z.string(),
  professionalId: z.string(),
  email: z.string(),
  name: z.string(),
  role: HealthcareRole,
  specialty: MedicalSpecialty.optional(),
  permissions: z.array(PermissionLevel),
  institution: z.string().optional(),
  department: z.string().optional(),
  createdAt: z.string(),
  expiresAt: z.string(),
  lastActivity: z.string(),
  ipAddress: z.string(),
  userAgent: z.string()
})

export type HealthcareSession = z.infer<typeof HealthcareSession>

// Authentication request for healthcare professionals
export const HealthcareLoginRequest = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  rememberMe: z.boolean().optional(),
  institution: z.string().optional() // For multi-tenant support
})

export type HealthcareLoginRequest = z.infer<typeof HealthcareLoginRequest>

// Registration request for new healthcare professionals
export const HealthcareRegistrationRequest = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string(),
  lastName: z.string(),
  role: HealthcareRole,
  specialty: MedicalSpecialty.optional(),
  institution: z.string(),
  department: z.string().optional(),
  phoneNumber: z.string().optional(),
  licenses: z.array(ProfessionalLicense),
  invitedBy: z.string().optional() // Admin who invited them
})

export type HealthcareRegistrationRequest = z.infer<typeof HealthcareRegistrationRequest>



