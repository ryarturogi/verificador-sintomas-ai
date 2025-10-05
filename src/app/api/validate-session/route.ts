/**
 * Session Validation API Route
 * Production-ready session validation with secure session management
 */

import { NextRequest, NextResponse } from 'next/server'
import { sessionManager } from '@/lib/session-manager'
import { secureCookieManager } from '@/lib/secure-cookies'
import { auditLogger } from '@/lib/audit-logger'

export async function GET(request: NextRequest) {
  try {
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Get session from secure cookies
    const { sessionId, refreshToken, rememberMe } = secureCookieManager.getSessionFromCookies(request)

    if (!sessionId) {
      return NextResponse.json(
        { valid: false, error: 'No session found' },
        { status: 401 }
      )
    }

    // Validate session
    const result = await sessionManager.validateSession(sessionId, ipAddress)
    
    if (!result.valid) {
      return NextResponse.json(
        { valid: false, error: result.error || 'Invalid session' },
        { status: 401 }
      )
    }

    // Log successful validation
    await auditLogger.logEvent({
      sessionId,
      action: 'SESSION_VALIDATED',
      timestamp: new Date().toISOString(),
      details: { 
        needsRefresh: result.needsRefresh,
        rememberMe,
        ipAddress: ipAddress.substring(0, 8) + '***'
      }
    })

    return NextResponse.json({
      valid: true,
      session: {
        sessionId: result.session!.sessionId,
        userId: result.session!.userId,
        email: result.session!.email,
        name: result.session!.name,
        role: result.session!.role,
        expiresAt: result.session!.expiresAt,
        lastActivity: result.session!.lastActivity,
        rememberMe: result.session!.rememberMe
      },
      needsRefresh: result.needsRefresh
    })

  } catch (error) {
    console.error('Session validation error:', error)
    
    await auditLogger.logSecurityEvent({
      sessionId: 'unknown',
      action: 'SESSION_VALIDATION_ERROR',
      threat: 'SYSTEM_ERROR',
      severity: 'MEDIUM',
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      mitigation: 'ERROR_LOGGED'
    })

    return NextResponse.json(
      { valid: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'

    // Get session from secure cookies
    const { sessionId, refreshToken, rememberMe } = secureCookieManager.getSessionFromCookies(request)

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'No session found' },
        { status: 401 }
      )
    }

    // Refresh session
    const result = await sessionManager.refreshSession(sessionId, ipAddress)
    
    if (!result.valid) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to refresh session' },
        { status: 401 }
      )
    }

    // Create response with new cookies
    const response = NextResponse.json({
      success: true,
      session: {
        sessionId: result.session!.sessionId,
        userId: result.session!.userId,
        email: result.session!.email,
        name: result.session!.name,
        role: result.session!.role,
        expiresAt: result.session!.expiresAt,
        lastActivity: result.session!.lastActivity,
        rememberMe: result.session!.rememberMe
      }
    })

    // Set new secure cookies
    secureCookieManager.setSessionCookies(
      response,
      result.session!.sessionId,
      result.session!.refreshToken,
      result.session!.rememberMe
    )

    return response

  } catch (error) {
    console.error('Session refresh error:', error)
    
    await auditLogger.logSecurityEvent({
      sessionId: 'unknown',
      action: 'SESSION_REFRESH_ERROR',
      threat: 'SYSTEM_ERROR',
      severity: 'MEDIUM',
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      mitigation: 'ERROR_LOGGED'
    })

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
