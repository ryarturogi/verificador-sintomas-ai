/**
 * Production Logout API Route
 * Secure session termination with cleanup
 */

import { NextRequest, NextResponse } from 'next/server'
import { sessionManager } from '@/lib/session-manager'
import { secureCookieManager } from '@/lib/secure-cookies'
import { auditLogger } from '@/lib/audit-logger'

export async function POST(request: NextRequest) {
  try {
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Get session from secure cookies
    const { sessionId } = secureCookieManager.getSessionFromCookies(request)

    if (sessionId) {
      // Cleanup session
      await sessionManager.cleanupSession(sessionId)

      // Log logout
      await auditLogger.logEvent({
        sessionId,
        action: 'USER_LOGOUT',
        timestamp: new Date().toISOString(),
        details: {
          ipAddress: ipAddress.substring(0, 8) + '***',
          userAgent: userAgent.substring(0, 50) + '...'
        }
      })
    }

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    })

    // Clear all session cookies
    secureCookieManager.clearSessionCookies(response)

    return response

  } catch (error) {
    console.error('Logout error:', error)
    
    await auditLogger.logSecurityEvent({
      sessionId: 'unknown',
      action: 'LOGOUT_ERROR',
      threat: 'SYSTEM_ERROR',
      severity: 'LOW',
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
