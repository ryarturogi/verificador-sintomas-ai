// DoD/HIPAA Compliance Security Configuration
// Implements security standards required for medical applications

export const securityConfig = {
  // HIPAA Compliance Settings
  hipaa: {
    dataRetentionDays: 2555, // 7 years as required by HIPAA
    auditLogRetentionDays: 2555,
    minimumPasswordLength: 12,
    passwordComplexityRequired: true,
    sessionTimeoutMinutes: 15,
    maxLoginAttempts: 3,
    accountLockoutMinutes: 30,
  },

  // DoD Security Requirements
  dod: {
    encryptionStandard: 'AES-256',
    hashingAlgorithm: 'SHA-256',
    requireTwoFactorAuth: true,
    requireCertificateAuth: false, // Set to true for CAC cards
    dataClassification: 'CUI', // Controlled Unclassified Information
    securityClearanceRequired: false,
  },

  // Data Protection
  dataProtection: {
    encryptAtRest: true,
    encryptInTransit: true,
    anonymizeData: true,
    pseudonymizeData: true,
    dataMinimization: true,
    consentRequired: true,
  },

  // Audit and Logging
  audit: {
    logAllAccess: true,
    logDataModifications: true,
    logAuthenticationEvents: true,
    logSystemEvents: true,
    integrityProtection: true,
    realTimeMonitoring: true,
  },

  // Session Security
  session: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict' as const,
    maxAge: 900, // 15 minutes
    regenerateOnAuth: true,
    invalidateOnSuspiciousActivity: true,
  },

  // Content Security Policy
  csp: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'", "https://api.openai.com"],
    frameSrc: ["'none'"],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: true,
  },

  // Security Headers
  headers: {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
  },

  // Medical Data Classification
  medicalDataTypes: {
    PHI: 'Protected Health Information',
    PII: 'Personally Identifiable Information',
    CUI: 'Controlled Unclassified Information',
    SENSITIVE: 'Sensitive Medical Data',
  },

  // Compliance Requirements
  compliance: {
    hipaa: true,
    hitech: true,
    gdpr: true, // For international users
    dod8500: true, // DoD Information Assurance
    nist80053: true, // NIST Security Controls
    fisma: true, // Federal Information Security Management Act
  },
}

// Data sanitization for medical information
export const sanitizeInput = (input: string | undefined | null): string => {
  // Handle null, undefined, or non-string inputs
  if (!input || typeof input !== 'string') {
    return ''
  }
  
  // Remove potential injection patterns
  return input
    .replace(/[<>\"'%;()&+]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/onload/gi, '')
    .replace(/onerror/gi, '')
    .trim()
    .substring(0, 1000) // Limit length
}

// Generate secure session ID
export const generateSecureSessionId = (): string => {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// Anonymize medical data for logging
export const anonymizeForLogging = (data: Record<string, unknown>): Record<string, unknown> => {
  const anonymized = { ...data }
  
  // Remove or hash PII/PHI
  if (anonymized.age) anonymized.age = '**'
  if (anonymized.gender) anonymized.gender = '***'
  if (anonymized.symptoms) anonymized.symptoms = '[MEDICAL_DATA]'
  if (anonymized.description) anonymized.description = '[MEDICAL_DESCRIPTION]'
  if (anonymized.sessionId && typeof anonymized.sessionId === 'string') {
    anonymized.sessionId = anonymized.sessionId.substring(0, 8) + '***'
  }
  
  return anonymized
}

// Validate data integrity
export const validateDataIntegrity = (data: unknown): boolean => {
  try {
    // Basic validation
    if (typeof data !== 'object' || data === null) return false
    
    const dataObj = data as Record<string, unknown>
    
    // Check for required security fields
    if (dataObj.timestamp && typeof dataObj.timestamp === 'string') {
      if (new Date(dataObj.timestamp).getTime() > Date.now()) return false
    }
    
    // Validate session token format
    if (dataObj.sessionId && typeof dataObj.sessionId === 'string') {
      if (!/^[a-f0-9]{64}$/.test(dataObj.sessionId)) return false
    }
    
    return true
  } catch {
    return false
  }
}