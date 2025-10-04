import { NextRequest, NextResponse } from 'next/server'
import { dynamicSymptomAnalyzer } from '@/services/dynamic-symptom-analyzer'
import { QuestionResponse } from '@/types/dynamic-questionnaire'
import { audit } from '@/lib/audit-logger'
import { sanitizeInput, validateDataIntegrity } from '@/lib/security-config'

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get('session-id')?.value || 'unknown'
  const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'

  try {
    // Log medical data access
    await audit.medicalAccess({
      sessionId,
      action: 'SYMPTOM_ANALYSIS_REQUEST',
      dataType: 'MEDICAL_QUESTIONNAIRE_RESPONSES',
      patientDataInvolved: true,
      consentVerified: request.cookies.get('medical-consent')?.value === 'granted',
      ipAddress: clientIP,
      userAgent,
    })

    const body = await request.json()
    
    // Validate data integrity
    if (!validateDataIntegrity(body)) {
      await audit.security({
        sessionId,
        action: 'DATA_INTEGRITY_VIOLATION',
        threat: 'INVALID_DATA_STRUCTURE',
        severity: 'MEDIUM',
        ipAddress: clientIP,
        userAgent,
      })
      
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      )
    }

    const { responses, language = 'en' } = body

    // Sanitize input data
    const sanitizedResponses = (responses as QuestionResponse[]).map(response => {
      let sanitizedAnswer = response.answer
      
      // Only sanitize string answers
      if (typeof response.answer === 'string') {
        sanitizedAnswer = sanitizeInput(response.answer)
      } else if (Array.isArray(response.answer)) {
        // Handle string arrays
        sanitizedAnswer = response.answer.map(item => 
          typeof item === 'string' ? sanitizeInput(item) : item
        )
      }
      
      return {
        ...response,
        questionId: sanitizeInput(response.questionId),
        answer: sanitizedAnswer,
      }
    })

    const result = await dynamicSymptomAnalyzer.analyzeResponses(
      sanitizedResponses,
      language
    )

    // Log successful analysis
    await audit.medicalAccess({
      sessionId,
      action: 'SYMPTOM_ANALYSIS_COMPLETED',
      dataType: 'MEDICAL_ASSESSMENT_RESULT',
      patientDataInvolved: true,
      consentVerified: true,
      ipAddress: clientIP,
      userAgent,
    })

    return NextResponse.json({ result })
  } catch (error) {
    // Log error event
    await audit.event({
      sessionId,
      eventType: 'SYSTEM_EVENT',
      resource: 'SYMPTOM_ANALYZER',
      action: 'ANALYSIS_ERROR',
      outcome: 'FAILURE',
      riskLevel: 'MEDIUM',
      dataClassification: 'PHI',
      complianceFlags: ['HIPAA', 'DOD'],
      details: { error: error instanceof Error ? error.message : 'Unknown error' },
      ipAddress: clientIP,
      userAgent,
    })

    console.error('Symptom analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze symptoms' },
      { status: 500 }
    )
  }
}