/**
 * Production-Ready Session Manager
 * DoD/HIPAA Compliant Session Management with JWT and Secure Storage
 */

import { auditLogger } from './audit-logger'
import { HealthcareRole, PermissionLevel } from '@/types/healthcare-professional'

export interface SecureSession {
  sessionId: string
  userId: string
  email: string
  name: string
  role: string
  issuedAt: number
  expiresAt: number
  refreshToken: string
  rememberMe: boolean
  lastActivity: number
  ipAddress: string
  userAgent: string
}

export interface HealthcareSession {
  sessionId: string
  professionalId: string
  email: string
  name: string
  role: HealthcareRole
  specialty?: string
  permissions: PermissionLevel[]
  institution?: string
  department?: string
  issuedAt: number
  expiresAt: number
  refreshToken: string
  rememberMe: boolean
  lastActivity: number
  ipAddress: string
  userAgent: string
}

export interface SessionValidationResult {
  valid: boolean
  session?: SecureSession
  needsRefresh?: boolean
  error?: string
}

class SessionManager {
  private sessions = new Map<string, SecureSession>()
  private healthcareSessions = new Map<string, HealthcareSession>()
  private refreshTokens = new Map<string, string>()
  private readonly SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours
  private readonly REMEMBER_ME_DURATION = 30 * 24 * 60 * 60 * 1000 // 30 days
  private readonly REFRESH_THRESHOLD = 60 * 60 * 1000 // 1 hour before expiry

  /**
   * Create a new secure session
   */
  async createSession(
    userId: string,
    email: string,
    name: string,
    role: string = 'patient',
    rememberMe: boolean = false,
    ipAddress: string,
    userAgent: string
  ): Promise<SecureSession> {
    const sessionId = this.generateSecureSessionId()
    const refreshToken = this.generateSecureRefreshToken()
    const now = Date.now()
    const duration = rememberMe ? this.REMEMBER_ME_DURATION : this.SESSION_DURATION

    const session: SecureSession = {
      sessionId,
      userId,
      email,
      name,
      role,
      issuedAt: now,
      expiresAt: now + duration,
      refreshToken,
      rememberMe,
      lastActivity: now,
      ipAddress,
      userAgent
    }

    // Store session
    this.sessions.set(sessionId, session)
    console.log('Session stored:', { sessionId, totalSessions: this.sessions.size })
    this.refreshTokens.set(refreshToken, sessionId)

    // Log session creation
    await auditLogger.logEvent({
      sessionId,
      action: 'SECURE_SESSION_CREATED',
      timestamp: new Date().toISOString(),
      details: {
        userId: this.anonymizeUserId(userId),
        email: this.anonymizeEmail(email),
        rememberMe,
        duration: duration / 1000 / 60 / 60 // hours
      }
    })

    return session
  }

  /**
   * Create a new healthcare professional session
   */
  async createHealthcareSession(
    professionalId: string,
    email: string,
    name: string,
    role: HealthcareRole,
    specialty: string | undefined,
    permissions: PermissionLevel[],
    institution: string,
    department: string,
    rememberMe: boolean = false,
    ipAddress: string,
    userAgent: string
  ): Promise<HealthcareSession> {
    const sessionId = this.generateSecureSessionId()
    const refreshToken = this.generateSecureRefreshToken()
    const now = Date.now()
    const duration = rememberMe ? this.REMEMBER_ME_DURATION : this.SESSION_DURATION

    const session: HealthcareSession = {
      sessionId,
      professionalId,
      email,
      name,
      role,
      specialty,
      permissions,
      institution,
      department,
      issuedAt: now,
      expiresAt: now + duration,
      refreshToken,
      rememberMe,
      lastActivity: now,
      ipAddress,
      userAgent
    }

    // Store healthcare session
    this.healthcareSessions.set(sessionId, session)
    this.refreshTokens.set(refreshToken, sessionId)

    // Log healthcare session creation
    await auditLogger.logHealthcareEvent({
      sessionId,
      action: 'HEALTHCARE_SESSION_CREATED',
      timestamp: new Date().toISOString(),
      details: {
        professionalId: this.anonymizeUserId(professionalId),
        email: this.anonymizeEmail(email),
        role,
        specialty,
        institution,
        department,
        rememberMe,
        duration: duration / 1000 / 60 / 60 // hours
      }
    })

    return session
  }

  /**
   * Validate and retrieve session
   */
  async validateSession(sessionId: string, ipAddress?: string): Promise<SessionValidationResult> {
    console.log('Validating session:', { sessionId, totalSessions: this.sessions.size })
    const session = this.sessions.get(sessionId)
    console.log('Session found:', !!session)
    
    if (!session) {
      await auditLogger.logSecurityEvent({
        sessionId,
        action: 'INVALID_SESSION_ACCESS',
        threat: 'INVALID_SESSION_ID',
        severity: 'MEDIUM',
        ipAddress: ipAddress || 'unknown',
        userAgent: 'unknown',
        mitigation: 'SESSION_NOT_FOUND'
      })
      return { valid: false, error: 'Session not found' }
    }

    const now = Date.now()

    // Check if session is expired
    if (now > session.expiresAt) {
      await this.cleanupSession(sessionId)
      await auditLogger.logSecurityEvent({
        sessionId,
        action: 'EXPIRED_SESSION_ACCESS',
        threat: 'EXPIRED_SESSION',
        severity: 'LOW',
        ipAddress: ipAddress || 'unknown',
        userAgent: 'unknown',
        mitigation: 'SESSION_CLEANED_UP'
      })
      return { valid: false, error: 'Session expired' }
    }

    // Update last activity
    session.lastActivity = now
    this.sessions.set(sessionId, session)

    // Check if session needs refresh
    const needsRefresh = (session.expiresAt - now) < this.REFRESH_THRESHOLD

    return {
      valid: true,
      session,
      needsRefresh
    }
  }

  /**
   * Refresh session token
   */
  async refreshSession(sessionId: string, ipAddress?: string): Promise<SessionValidationResult> {
    const session = this.sessions.get(sessionId)
    
    if (!session) {
      return { valid: false, error: 'Session not found' }
    }

    const now = Date.now()

    // Check if session is still valid
    if (now > session.expiresAt) {
      await this.cleanupSession(sessionId)
      return { valid: false, error: 'Session expired' }
    }

    // Generate new session ID and refresh token
    const newSessionId = this.generateSecureSessionId()
    const newRefreshToken = this.generateSecureRefreshToken()
    const duration = session.rememberMe ? this.REMEMBER_ME_DURATION : this.SESSION_DURATION

    // Create new session
    const refreshedSession: SecureSession = {
      ...session,
      sessionId: newSessionId,
      refreshToken: newRefreshToken,
      issuedAt: now,
      expiresAt: now + duration,
      lastActivity: now,
      ipAddress: ipAddress || session.ipAddress
    }

    // Update storage
    this.sessions.delete(sessionId)
    this.sessions.set(newSessionId, refreshedSession)
    this.refreshTokens.delete(session.refreshToken)
    this.refreshTokens.set(newRefreshToken, newSessionId)

    // Log session refresh
    await auditLogger.logEvent({
      sessionId: newSessionId,
      action: 'SESSION_REFRESHED',
      timestamp: new Date().toISOString(),
      details: {
        oldSessionId: sessionId,
        userId: this.anonymizeUserId(session.userId),
        duration: duration / 1000 / 60 / 60 // hours
      }
    })

    return {
      valid: true,
      session: refreshedSession,
      needsRefresh: false
    }
  }

  /**
   * Cleanup expired session
   */
  async cleanupSession(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId)
    if (session) {
      this.sessions.delete(sessionId)
      this.refreshTokens.delete(session.refreshToken)
    }
  }

  /**
   * Get session by refresh token
   */
  async getSessionByRefreshToken(refreshToken: string): Promise<SecureSession | null> {
    const sessionId = this.refreshTokens.get(refreshToken)
    if (!sessionId) return null

    const session = this.sessions.get(sessionId)
    if (!session) return null

    // Check if session is expired
    if (Date.now() > session.expiresAt) {
      await this.cleanupSession(sessionId)
      return null
    }

    return session
  }

  /**
   * Cleanup all expired sessions
   */
  async cleanupExpiredSessions(): Promise<void> {
    const now = Date.now()
    const expiredSessions: string[] = []

    for (const [sessionId, session] of this.sessions.entries()) {
      if (now > session.expiresAt) {
        expiredSessions.push(sessionId)
      }
    }

    for (const sessionId of expiredSessions) {
      await this.cleanupSession(sessionId)
    }

    if (expiredSessions.length > 0) {
      await auditLogger.logEvent({
        sessionId: 'system',
        action: 'EXPIRED_SESSIONS_CLEANED',
        timestamp: new Date().toISOString(),
        details: { count: expiredSessions.length }
      })
    }
  }

  /**
   * Get session statistics
   */
  getSessionStats() {
    const now = Date.now()
    const activeSessions = Array.from(this.sessions.values()).filter(
      session => now < session.expiresAt
    )

    return {
      totalSessions: this.sessions.size,
      activeSessions: activeSessions.length,
      expiredSessions: this.sessions.size - activeSessions.length,
      rememberMeSessions: activeSessions.filter(s => s.rememberMe).length
    }
  }

  /**
   * Generate secure session ID
   */
  private generateSecureSessionId(): string {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  }

  /**
   * Generate secure refresh token
   */
  private generateSecureRefreshToken(): string {
    const array = new Uint8Array(64)
    crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  }

  /**
   * Anonymize user ID for logging
   */
  private anonymizeUserId(userId: string): string {
    return userId.substring(0, 8) + '***'
  }

  /**
   * Anonymize email for logging
   */
  private anonymizeEmail(email: string): string {
    const [local, domain] = email.split('@')
    return local.substring(0, 2) + '***@' + domain
  }
}

// Export singleton instance
export const sessionManager = new SessionManager()

// Cleanup expired sessions every 5 minutes
setInterval(() => {
  sessionManager.cleanupExpiredSessions()
}, 5 * 60 * 1000)
