import { NextRequest, NextResponse } from 'next/server'
import { audit } from '@/lib/audit-logger'
import { sanitizeInput, validateDataIntegrity } from '@/lib/security-config'

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get('session-id')?.value || 'unknown'
  const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'

  try {
    // Log medical image analysis request
    await audit.medicalAccess({
      sessionId,
      action: 'MEDICAL_IMAGE_ANALYSIS_REQUEST',
      dataType: 'MEDICAL_IMAGE',
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
        severity: 'HIGH',
        ipAddress: clientIP,
        details: 'Invalid medical image analysis request data'
      })
      
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedImage = sanitizeInput(body.image, 'base64')
    const sanitizedImageType = sanitizeInput(body.imageType, 'alphanumeric')
    const sanitizedLanguage = sanitizeInput(body.language, 'alphanumeric')
    const sanitizedSystemPrompt = sanitizeInput(body.systemPrompt, 'text')

    if (!sanitizedImage || !sanitizedImageType) {
      return NextResponse.json(
        { error: 'Missing required fields: image and imageType' },
        { status: 400 }
      )
    }

    // Validate that we have an OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key not configured')
      return NextResponse.json(
        { error: 'Image analysis service temporarily unavailable' },
        { status: 503 }
      )
    }

    // Prepare the OpenAI Vision API request
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: sanitizedSystemPrompt || 'You are a medical assistant helping to analyze medical images for educational purposes only. Always recommend professional medical consultation.'
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Please analyze this ${sanitizedImageType} medical image. Provide educational observations only, not diagnoses. Respond in JSON format with: analysis, findings (array), recommendations (array), urgencyLevel (low/medium/high/emergency), suggestedSpecialties (array), confidence (0-1).`
              },
              {
                type: 'image_url',
                image_url: {
                  url: sanitizedImage,
                  detail: 'high'
                }
              }
            ]
          }
        ],
        max_tokens: 1000,
        temperature: 0.3
      })
    })

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text()
      console.error('OpenAI API error:', errorText)
      
      await audit.security({
        sessionId,
        action: 'EXTERNAL_API_FAILURE',
        severity: 'MEDIUM',
        ipAddress: clientIP,
        details: `OpenAI Vision API failed: ${openaiResponse.status}`
      })

      return NextResponse.json(
        { error: 'Failed to analyze image. Please try again.' },
        { status: 500 }
      )
    }

    const openaiResult = await openaiResponse.json()
    const analysisContent = openaiResult.choices?.[0]?.message?.content

    if (!analysisContent) {
      return NextResponse.json(
        { error: 'No analysis content received' },
        { status: 500 }
      )
    }

    // Log successful analysis
    await audit.medicalAccess({
      sessionId,
      action: 'MEDICAL_IMAGE_ANALYSIS_COMPLETED',
      dataType: 'MEDICAL_IMAGE_ANALYSIS_RESULT',
      patientDataInvolved: true,
      ipAddress: clientIP,
      userAgent,
    })

    // Return the analysis result
    return NextResponse.json({
      analysis: analysisContent,
      metadata: {
        imageType: sanitizedImageType,
        language: sanitizedLanguage,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Medical image analysis error:', error)

    await audit.security({
      sessionId,
      action: 'MEDICAL_IMAGE_ANALYSIS_ERROR',
      severity: 'HIGH',
      ipAddress: clientIP,
      details: error instanceof Error ? error.message : 'Unknown error during image analysis'
    })

    return NextResponse.json(
      { 
        error: 'Internal server error during image analysis',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}