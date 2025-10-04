// DoD/HIPAA Compliant Security Middleware
// Implements security headers, CSP, and access controls

import { NextRequest, NextResponse } from 'next/server'
import { securityConfig } from './lib/security-config'
import { auditLogger } from './lib/audit-logger'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'
  const sessionId = request.cookies.get('session-id')?.value || generateSessionId()

  try {
    // Apply security headers
    applySecurityHeaders(response)

    // Apply Content Security Policy
    applyCspHeaders(response)

    // Rate limiting
    if (await isRateLimited(clientIP)) {
      await auditLogger.logSecurityEvent({
        sessionId,
        action: 'RATE_LIMIT_EXCEEDED',
        threat: 'POTENTIAL_DOS_ATTACK',
        severity: 'MEDIUM',
        ipAddress: clientIP,
        userAgent,
        mitigation: 'REQUEST_BLOCKED',
      })

      return new NextResponse('Rate limit exceeded', { 
        status: 429,
        headers: {
          'Retry-After': '60',
          ...Object.fromEntries(response.headers.entries()),
        },
      })
    }

    // Check for suspicious requests
    if (await isSuspiciousRequest(request)) {
      await auditLogger.logSecurityEvent({
        sessionId,
        action: 'SUSPICIOUS_REQUEST_DETECTED',
        threat: 'POTENTIAL_SECURITY_THREAT',
        severity: 'HIGH',
        ipAddress: clientIP,
        userAgent,
        mitigation: 'REQUEST_BLOCKED',
      })

      return new NextResponse('Request blocked for security reasons', { 
        status: 403,
        headers: Object.fromEntries(response.headers.entries()),
      })
    }

    // Log API access for medical routes
    if (request.nextUrl.pathname.startsWith('/api/')) {
      await auditLogger.logMedicalDataAccess({
        sessionId,
        action: `API_${request.method}`,
        dataType: extractDataType(request.nextUrl.pathname),
        patientDataInvolved: isPatientDataRoute(request.nextUrl.pathname),
        consentVerified: hasValidConsent(request),
        ipAddress: clientIP,
        userAgent,
      })
    }

    // Set secure session cookie
    if (!request.cookies.get('session-id')) {
      response.cookies.set('session-id', sessionId, {
        httpOnly: securityConfig.session.httpOnly,
        secure: securityConfig.session.secure,
        sameSite: securityConfig.session.sameSite,
        maxAge: securityConfig.session.maxAge,
        path: '/',
      })
    }

    return response

  } catch (error) {
    // Log security middleware errors
    await auditLogger.logSecurityEvent({
      sessionId,
      action: 'MIDDLEWARE_ERROR',
      threat: 'SYSTEM_ERROR',
      severity: 'MEDIUM',
      ipAddress: clientIP,
      userAgent,
      mitigation: 'ERROR_LOGGED',
    })

    console.error('Security middleware error:', error)
    return response
  }
}

// Apply DoD/HIPAA required security headers
function applySecurityHeaders(response: NextResponse) {
  Object.entries(securityConfig.headers).forEach(([header, value]) => {
    response.headers.set(header, value)
  })

  // Additional medical compliance headers
  response.headers.set('X-Medical-Compliance', 'HIPAA,HITECH,DOD')
  response.headers.set('X-Data-Classification', 'CUI')
  response.headers.set('X-Audit-Required', 'true')
}

// Apply Content Security Policy
function applyCspHeaders(response: NextResponse) {
  const cspDirectives = Object.entries(securityConfig.csp)
    .map(([directive, sources]) => {
      if (directive === 'upgradeInsecureRequests') {
        return sources ? 'upgrade-insecure-requests' : ''
      }
      return `${directive.replace(/([A-Z])/g, '-$1').toLowerCase()} ${
        Array.isArray(sources) ? sources.join(' ') : sources
      }`
    })
    .filter(Boolean)
    .join('; ')

  response.headers.set('Content-Security-Policy', cspDirectives)
}

// Rate limiting implementation
async function isRateLimited(clientIP: string): Promise<boolean> {
  const now = Date.now()
  const windowMs = 60000 // 1 minute
  const maxRequests = 100 // Max requests per window

  const record = rateLimitStore.get(clientIP)
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(clientIP, { count: 1, resetTime: now + windowMs })
    return false
  }

  record.count++
  
  if (record.count > maxRequests) {
    return true
  }

  return false
}

// Detect suspicious request patterns
async function isSuspiciousRequest(request: NextRequest): Promise<boolean> {
  const url = request.nextUrl
  const userAgent = request.headers.get('user-agent') || ''
  
  // Check for common attack patterns
  const suspiciousPatterns = [
    /\.\.\//,  // Directory traversal
    /<script/i, // XSS attempts
    /union.*select/i, // SQL injection
    /javascript:/i, // Javascript injection
    /eval\(/i, // Code injection
    /document\.cookie/i, // Cookie theft
  ]

  const urlString = url.toString()
  const isSuspiciousUrl = suspiciousPatterns.some(pattern => pattern.test(urlString))
  
  // Check for suspicious user agents
  const suspiciousUserAgents = [
    /curl/i,
    /wget/i,
    /python/i,
    /bot/i,
    /scanner/i,
    /crawler/i,
  ]
  
  const isSuspiciousUA = suspiciousUserAgents.some(pattern => pattern.test(userAgent))
  
  // Check for unusual request sizes
  const contentLength = parseInt(request.headers.get('content-length') || '0')
  const isUnusualSize = contentLength > 1000000 // 1MB limit
  
  return isSuspiciousUrl || isSuspiciousUA || isUnusualSize
}

// Extract data type from API route
function extractDataType(pathname: string): string {
  if (pathname.includes('symptom')) return 'SYMPTOM_DATA'
  if (pathname.includes('analyze')) return 'MEDICAL_ANALYSIS'
  if (pathname.includes('emergency')) return 'EMERGENCY_DATA'
  if (pathname.includes('question')) return 'QUESTIONNAIRE_DATA'
  return 'GENERAL_API'
}

// Check if route involves patient data
function isPatientDataRoute(pathname: string): boolean {
  const patientDataRoutes = [
    '/api/analyze-symptoms',
    '/api/generate-answers',
    '/api/generate-question',
  ]
  return patientDataRoutes.some(route => pathname.startsWith(route))
}

// Check for valid consent (simplified for demo)
function hasValidConsent(request: NextRequest): boolean {
  const consentCookie = request.cookies.get('medical-consent')
  return consentCookie?.value === 'granted'
}

// Generate secure session ID
function generateSessionId(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}