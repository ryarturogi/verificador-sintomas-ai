import { NextRequest, NextResponse } from 'next/server'
import { AIDoctorService } from '@/services/ai-doctor-service'
import { AnalysisRequest, DoctorSpecialty } from '@/types/consultation'
import { getEmergencyMessages } from '@/lib/api-translations'
import { z } from 'zod'

const AnalysisRequestSchema = z.object({
  specialistId: z.string(),
  initialMessage: z.string().min(10, 'Please provide more details about your symptoms'),
  urgency: z.enum(['low', 'medium', 'high']).default('medium'),
  medicalHistory: z.string().optional(),
  currentMedications: z.string().optional(),
  allergies: z.string().optional(),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string()
  })).optional()
})

/**
 * API route for handling AI symptom analysis
 * POST /api/consultation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validationResult = AnalysisRequestSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const analysisRequest: AnalysisRequest = validationResult.data
    
    // Map specialist ID to specialty (in a real app, this would come from a database)
    const specialistSpecialtyMap: Record<string, DoctorSpecialty> = {
      'dr-henry': 'general_medicine',
      'dr-floyd-miles': 'cardiology',
      'dr-mckinney': 'neurology',
      'dr-jacob': 'pediatrics',
      'dr-warren': 'internal_medicine'
    }
    
    const specialty = specialistSpecialtyMap[analysisRequest.specialistId]
    if (!specialty) {
      return NextResponse.json(
        { error: 'Invalid AI specialist ID' },
        { status: 400 }
      )
    }

    // Check for emergency symptoms
    const isEmergency = AIDoctorService.checkEmergencySymptoms(analysisRequest.initialMessage)
    
    if (isEmergency) {
      const emergencyMessages = getEmergencyMessages(request)
      return NextResponse.json({
        message: emergencyMessages.message,
        recommendations: emergencyMessages.recommendations,
        requiresEmergencyCare: true,
        emergencyMessage: emergencyMessages.emergencyMessage
      })
    }

    // Generate AI analysis response
    const response = await AIDoctorService.generateConsultationResponse(
      analysisRequest,
      specialty
    )

    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Analysis API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint for retrieving analysis history or AI specialist information
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    
    if (action === 'specialists') {
      // Return available AI analysis specialists
      const specialists = [
        {
          id: 'dr-henry',
          name: 'AI General Analysis Specialist',
          specialty: 'general_medicine',
          specialtyDisplayName: 'General Medicine AI',
          description: 'AI specialist for comprehensive symptom analysis and general health assessment',
          experience: 'AI-powered with medical knowledge base',
          isAvailable: true,
          responseTime: '2-3 minutes',
          accuracy: 4.9,
          analysisCount: 1250,
          avatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'dr-floyd-miles',
          name: 'AI Cardiology Analysis Specialist',
          specialty: 'cardiology',
          specialtyDisplayName: 'Cardiology AI',
          description: 'AI specialist for heart health analysis, cardiovascular conditions, and cardiac symptoms',
          experience: 'AI-powered with cardiology expertise',
          isAvailable: true,
          responseTime: '3-5 minutes',
          accuracy: 4.8,
          analysisCount: 890,
          avatar: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'dr-mckinney',
          name: 'AI Neurology Analysis Specialist',
          specialty: 'neurology',
          specialtyDisplayName: 'Neurology AI',
          description: 'AI specialist for brain and nervous system analysis, headaches, and neurological symptoms',
          experience: 'AI-powered with neurology specialization',
          isAvailable: true,
          responseTime: '4-6 minutes',
          accuracy: 4.7,
          analysisCount: 650,
          avatar: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'dr-jacob',
          name: 'AI Pediatrics Analysis Specialist',
          specialty: 'pediatrics',
          specialtyDisplayName: 'Pediatrics AI',
          description: 'AI specialist for child health analysis, developmental concerns, and pediatric conditions',
          experience: 'AI-powered with pediatric expertise',
          isAvailable: true,
          responseTime: '2-4 minutes',
          accuracy: 4.9,
          analysisCount: 1100,
          avatar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'dr-warren',
          name: 'AI Internal Medicine Analysis Specialist',
          specialty: 'internal_medicine',
          specialtyDisplayName: 'Internal Medicine AI',
          description: 'AI specialist for adult medicine analysis, chronic conditions, and complex medical cases',
          experience: 'AI-powered with internal medicine expertise',
          isAvailable: true,
          responseTime: '3-5 minutes',
          accuracy: 4.8,
          analysisCount: 980,
          avatar: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        }
      ]
      
      return NextResponse.json({ specialists })
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    
  } catch (error) {
    console.error('Analysis GET API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
