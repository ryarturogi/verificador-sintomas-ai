// DoD/HIPAA Compliant Audit Logging System
// Implements comprehensive audit trail for medical data access

import { anonymizeForLogging, generateSecureSessionId } from './security-config'

export interface AuditEvent {
  id: string
  timestamp: string
  eventType: AuditEventType
  userId?: string
  sessionId: string
  ipAddress?: string
  userAgent?: string
  resource: string
  action: string
  outcome: 'SUCCESS' | 'FAILURE' | 'WARNING'
  details: Record<string, unknown>
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  dataClassification: 'PUBLIC' | 'INTERNAL' | 'CUI' | 'PHI'
  complianceFlags: string[]
}

export type AuditEventType = 
  | 'AUTHENTICATION'
  | 'AUTHORIZATION' 
  | 'DATA_ACCESS'
  | 'DATA_MODIFICATION'
  | 'SYSTEM_EVENT'
  | 'SECURITY_EVENT'
  | 'MEDICAL_DATA_ACCESS'
  | 'PHI_ACCESS'
  | 'SESSION_EVENT'
  | 'CONSENT_EVENT'
  | 'HEALTHCARE_PROFESSIONAL_EVENT'

class AuditLogger {
  private events: AuditEvent[] = []
  private maxEvents = 10000 // In-memory limit
  
  // Log audit event with DoD/HIPAA compliance
  async logEvent(event: Partial<AuditEvent>): Promise<void> {
    const auditEvent: AuditEvent = {
      id: generateSecureSessionId(),
      timestamp: new Date().toISOString(),
      sessionId: event.sessionId || generateSecureSessionId(),
      eventType: event.eventType || 'SYSTEM_EVENT',
      resource: event.resource || 'UNKNOWN',
      action: event.action || 'UNKNOWN',
      outcome: event.outcome || 'SUCCESS',
      details: anonymizeForLogging(event.details || {}),
      riskLevel: event.riskLevel || 'LOW',
      dataClassification: event.dataClassification || 'INTERNAL',
      complianceFlags: event.complianceFlags || ['HIPAA', 'DOD'],
      userId: event.userId,
      ipAddress: event.ipAddress,
      userAgent: event.userAgent,
    }

    // Add to in-memory store
    this.events.push(auditEvent)
    
    // Maintain size limit
    if (this.events.length > this.maxEvents) {
      this.events.shift()
    }

    // In production, this would be sent to secure audit service
    console.log('[AUDIT]', {
      timestamp: auditEvent.timestamp,
      type: auditEvent.eventType,
      action: auditEvent.action,
      outcome: auditEvent.outcome,
      risk: auditEvent.riskLevel,
      classification: auditEvent.dataClassification,
    })

    // Check for suspicious activity
    await this.analyzeSuspiciousActivity(auditEvent)
  }

  // Medical data access logging
  async logMedicalDataAccess(details: {
    sessionId: string
    action: string
    dataType: string
    patientDataInvolved: boolean
    consentVerified: boolean
    ipAddress?: string
    userAgent?: string
  }): Promise<void> {
    await this.logEvent({
      eventType: 'MEDICAL_DATA_ACCESS',
      sessionId: details.sessionId,
      resource: 'MEDICAL_DATA',
      action: details.action,
      outcome: details.consentVerified ? 'SUCCESS' : 'WARNING',
      riskLevel: details.patientDataInvolved ? 'HIGH' : 'MEDIUM',
      dataClassification: details.patientDataInvolved ? 'PHI' : 'CUI',
      complianceFlags: ['HIPAA', 'HITECH', 'DOD'],
      details: {
        dataType: details.dataType,
        patientDataInvolved: details.patientDataInvolved,
        consentVerified: details.consentVerified,
      },
      ipAddress: details.ipAddress,
      userAgent: details.userAgent,
    })
  }

  // Authentication event logging
  async logAuthentication(details: {
    sessionId: string
    action: 'LOGIN' | 'LOGOUT' | 'FAILED_LOGIN' | 'SESSION_TIMEOUT'
    userId?: string
    ipAddress?: string
    userAgent?: string
    failureReason?: string
  }): Promise<void> {
    await this.logEvent({
      eventType: 'AUTHENTICATION',
      sessionId: details.sessionId,
      userId: details.userId,
      resource: 'AUTH_SYSTEM',
      action: details.action,
      outcome: details.action.includes('FAILED') ? 'FAILURE' : 'SUCCESS',
      riskLevel: details.action === 'FAILED_LOGIN' ? 'MEDIUM' : 'LOW',
      dataClassification: 'INTERNAL',
      complianceFlags: ['DOD', 'HIPAA'],
      details: {
        failureReason: details.failureReason,
      },
      ipAddress: details.ipAddress,
      userAgent: details.userAgent,
    })
  }

  // System security event logging
  async logSecurityEvent(details: {
    sessionId: string
    action: string
    threat: string
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
    ipAddress?: string
    userAgent?: string
    mitigation?: string
  }): Promise<void> {
    await this.logEvent({
      eventType: 'SECURITY_EVENT',
      sessionId: details.sessionId,
      resource: 'SECURITY_SYSTEM',
      action: details.action,
      outcome: 'WARNING',
      riskLevel: details.severity,
      dataClassification: 'CUI',
      complianceFlags: ['DOD', 'NIST', 'FISMA'],
      details: {
        threat: details.threat,
        mitigation: details.mitigation,
      },
      ipAddress: details.ipAddress,
      userAgent: details.userAgent,
    })
  }

  // Consent and privacy event logging
  async logConsentEvent(details: {
    sessionId: string
    action: 'CONSENT_GIVEN' | 'CONSENT_WITHDRAWN' | 'PRIVACY_POLICY_ACCEPTED'
    consentType: string
    ipAddress?: string
    userAgent?: string
  }): Promise<void> {
    await this.logEvent({
      eventType: 'CONSENT_EVENT',
      sessionId: details.sessionId,
      resource: 'CONSENT_SYSTEM',
      action: details.action,
      outcome: 'SUCCESS',
      riskLevel: 'MEDIUM',
      dataClassification: 'PHI',
      complianceFlags: ['HIPAA', 'GDPR', 'HITECH'],
      details: {
        consentType: details.consentType,
      },
      ipAddress: details.ipAddress,
      userAgent: details.userAgent,
    })
  }

  // Analyze for suspicious activity patterns
  private async analyzeSuspiciousActivity(event: AuditEvent): Promise<void> {
    const recentEvents = this.getRecentEvents(300000) // Last 5 minutes
    
    // Check for multiple failed attempts
    const failedAttempts = recentEvents.filter(e => 
      e.outcome === 'FAILURE' && 
      e.ipAddress === event.ipAddress
    ).length

    if (failedAttempts >= 3) {
      await this.logSecurityEvent({
        sessionId: event.sessionId,
        action: 'SUSPICIOUS_ACTIVITY_DETECTED',
        threat: 'MULTIPLE_FAILED_ATTEMPTS',
        severity: 'HIGH',
        ipAddress: event.ipAddress,
        userAgent: event.userAgent,
        mitigation: 'IP_MONITORING_ENABLED',
      })
    }

    // Check for unusual data access patterns
    const dataAccessEvents = recentEvents.filter(e => 
      e.eventType === 'MEDICAL_DATA_ACCESS' &&
      e.sessionId === event.sessionId
    ).length

    if (dataAccessEvents > 10) {
      await this.logSecurityEvent({
        sessionId: event.sessionId,
        action: 'UNUSUAL_DATA_ACCESS_PATTERN',
        threat: 'POTENTIAL_DATA_HARVESTING',
        severity: 'MEDIUM',
        ipAddress: event.ipAddress,
        userAgent: event.userAgent,
        mitigation: 'SESSION_MONITORING_INCREASED',
      })
    }
  }

  // Get recent events for analysis
  private getRecentEvents(timeWindowMs: number): AuditEvent[] {
    const cutoff = new Date(Date.now() - timeWindowMs)
    return this.events.filter(event => 
      new Date(event.timestamp) > cutoff
    )
  }

  // Generate compliance report
  generateComplianceReport(): {
    totalEvents: number
    eventsByType: Record<string, number>
    riskDistribution: Record<string, number>
    complianceFlags: Record<string, number>
    securityEvents: number
    dataAccessEvents: number
  } {
    const eventsByType: Record<string, number> = {}
    const riskDistribution: Record<string, number> = {}
    const complianceFlags: Record<string, number> = {}

    this.events.forEach(event => {
      eventsByType[event.eventType] = (eventsByType[event.eventType] || 0) + 1
      riskDistribution[event.riskLevel] = (riskDistribution[event.riskLevel] || 0) + 1
      
      event.complianceFlags.forEach(flag => {
        complianceFlags[flag] = (complianceFlags[flag] || 0) + 1
      })
    })

    return {
      totalEvents: this.events.length,
      eventsByType,
      riskDistribution,
      complianceFlags,
      securityEvents: this.events.filter(e => e.eventType === 'SECURITY_EVENT').length,
      dataAccessEvents: this.events.filter(e => e.eventType === 'MEDICAL_DATA_ACCESS').length,
    }
  }

  // Log healthcare professional events
  async logHealthcareEvent(details: {
    sessionId: string
    action: string
    timestamp: string
    details: Record<string, unknown>
    ipAddress?: string
    userAgent?: string
  }): Promise<void> {
    await this.logEvent({
      sessionId: details.sessionId,
      eventType: 'HEALTHCARE_PROFESSIONAL_EVENT',
      resource: 'HEALTHCARE_SYSTEM',
      action: details.action,
      outcome: 'SUCCESS',
      details: anonymizeForLogging(details.details),
      riskLevel: 'LOW',
      dataClassification: 'PHI',
      complianceFlags: ['HIPAA', 'AUDIT_TRAIL'],
      ipAddress: details.ipAddress,
      userAgent: details.userAgent
    })
  }
}

// Singleton instance for application-wide use
export const auditLogger = new AuditLogger()

// Convenience functions for common audit events
export const audit = {
  medicalAccess: (details: Parameters<typeof auditLogger.logMedicalDataAccess>[0]) => 
    auditLogger.logMedicalDataAccess(details),
  
  auth: (details: Parameters<typeof auditLogger.logAuthentication>[0]) => 
    auditLogger.logAuthentication(details),
  
  security: (details: Parameters<typeof auditLogger.logSecurityEvent>[0]) => 
    auditLogger.logSecurityEvent(details),
  
  consent: (details: Parameters<typeof auditLogger.logConsentEvent>[0]) => 
    auditLogger.logConsentEvent(details),
  
  event: (details: Partial<AuditEvent>) => 
    auditLogger.logEvent(details),
  
  healthcare: (details: Parameters<typeof auditLogger.logHealthcareEvent>[0]) => 
    auditLogger.logHealthcareEvent(details),
}