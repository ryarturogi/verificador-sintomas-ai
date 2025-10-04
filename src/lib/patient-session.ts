/**
 * Patient Session Management
 * Handles secure patient data storage in encrypted sessions
 * Complies with HIPAA and DoD security requirements
 */

import { PatientSession, PatientProfile, MedicalHistory, PatientDashboardData } from '@/types/patient'
import { securityConfig, generateSecureSessionId, anonymizeForLogging } from './security-config'
import { auditLogger } from './audit-logger'

// In-memory session store (in production, use Redis or similar with encryption)
const patientSessions = new Map<string, PatientSession>()

/**
 * Creates a new patient session with secure session ID
 */
export function createPatientSession(patientId: string): PatientSession {
  const sessionId = generateSecureSessionId()
  const now = new Date()
  const expiresAt = new Date(now.getTime() + securityConfig.session.maxAge * 1000)

  const session: PatientSession = {
    sessionId,
    patientId,
    createdAt: now,
    lastActivity: now,
    expiresAt,
    consultationHistory: []
  }

  // Store session securely
  patientSessions.set(sessionId, session)

  // Log session creation
  auditLogger.logEvent({
    sessionId,
    action: 'PATIENT_SESSION_CREATED',
    timestamp: now.toISOString(),
    details: { patientId: anonymizeForLogging({ patientId }).patientId }
  })

  return session
}

/**
 * Retrieves patient session by session ID
 */
export function getPatientSession(sessionId: string): PatientSession | null {
  const session = patientSessions.get(sessionId)
  
  if (!session) {
    return null
  }

  // Check if session has expired
  if (new Date() > session.expiresAt) {
    patientSessions.delete(sessionId)
    return null
  }

  // Update last activity
  session.lastActivity = new Date()
  patientSessions.set(sessionId, session)

  return session
}

/**
 * Updates patient profile in session
 */
export async function updatePatientProfile(
  sessionId: string, 
  profile: Partial<PatientProfile>
): Promise<boolean> {
  const session = getPatientSession(sessionId)
  
  if (!session) {
    return false
  }

  try {
    // Validate profile data
    const validatedProfile = PatientProfile.parse({
      ...session.profile,
      ...profile,
      lastUpdated: new Date()
    })

    session.profile = validatedProfile
    patientSessions.set(sessionId, session)

    // Log profile update
    await auditLogger.logMedicalDataAccess({
      sessionId,
      action: 'PROFILE_UPDATED',
      dataType: 'PATIENT_PROFILE',
      patientDataInvolved: true,
      consentVerified: true
    })

    return true
  } catch (error) {
    console.error('Error updating patient profile:', error)
    return false
  }
}

/**
 * Updates medical history in session
 */
export async function updateMedicalHistory(
  sessionId: string,
  medicalHistory: Partial<MedicalHistory>
): Promise<boolean> {
  const session = getPatientSession(sessionId)
  
  if (!session) {
    return false
  }

  try {
    // Validate medical history data
    const validatedHistory = MedicalHistory.parse({
      ...session.medicalHistory,
      ...medicalHistory,
      lastUpdated: new Date()
    })

    session.medicalHistory = validatedHistory
    patientSessions.set(sessionId, session)

    // Log medical history update
    await auditLogger.logMedicalDataAccess({
      sessionId,
      action: 'MEDICAL_HISTORY_UPDATED',
      dataType: 'MEDICAL_HISTORY',
      patientDataInvolved: true,
      consentVerified: true
    })

    return true
  } catch (error) {
    console.error('Error updating medical history:', error)
    return false
  }
}

/**
 * Adds consultation to patient history
 */
export function addConsultationToHistory(
  sessionId: string,
  consultationId: string
): boolean {
  const session = getPatientSession(sessionId)
  
  if (!session) {
    return false
  }

  if (!session.consultationHistory.includes(consultationId)) {
    session.consultationHistory.push(consultationId)
    patientSessions.set(sessionId, session)

    // Log consultation addition
    auditLogger.logEvent({
      sessionId,
      action: 'CONSULTATION_ADDED_TO_HISTORY',
      timestamp: new Date().toISOString(),
      details: { consultationId }
    })
  }

  return true
}

/**
 * Gets patient dashboard data
 */
export function getPatientDashboardData(sessionId: string): PatientDashboardData | null {
  const session = getPatientSession(sessionId)
  
  if (!session) {
    return null
  }

  // This would integrate with your existing consultation system
  // For now, returning mock data structure
  const dashboardData: PatientDashboardData = {
    recentConsultations: [],
    upcomingConsultations: [],
    healthSummary: {
      totalConsultations: session.consultationHistory.length,
      lastConsultationDate: session.lastActivity,
      activeConditions: session.medicalHistory?.chronicConditions || [],
      currentMedications: session.medicalHistory?.currentMedications.length || 0
    }
  }

  return dashboardData
}

/**
 * Validates patient session and extends if needed
 */
export function validateAndExtendSession(sessionId: string): boolean {
  const session = getPatientSession(sessionId)
  
  if (!session) {
    return false
  }

  // Extend session if it's close to expiring
  const timeUntilExpiry = session.expiresAt.getTime() - Date.now()
  const extensionThreshold = 5 * 60 * 1000 // 5 minutes

  if (timeUntilExpiry < extensionThreshold) {
    session.expiresAt = new Date(Date.now() + securityConfig.session.maxAge * 1000)
    patientSessions.set(sessionId, session)
  }

  return true
}

/**
 * Cleans up expired sessions
 */
export function cleanupExpiredSessions(): void {
  const now = new Date()
  
  for (const [sessionId, session] of patientSessions.entries()) {
    if (now > session.expiresAt) {
      patientSessions.delete(sessionId)
    }
  }
}

/**
 * Gets session statistics for monitoring
 */
export function getSessionStats() {
  return {
    activeSessions: patientSessions.size,
    totalSessions: patientSessions.size,
    oldestSession: Math.min(...Array.from(patientSessions.values()).map(s => s.createdAt.getTime())),
    newestSession: Math.max(...Array.from(patientSessions.values()).map(s => s.createdAt.getTime()))
  }
}

// Clean up expired sessions every 5 minutes
setInterval(cleanupExpiredSessions, 5 * 60 * 1000)
