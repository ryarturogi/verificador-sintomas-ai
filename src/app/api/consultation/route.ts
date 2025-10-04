import { NextRequest, NextResponse } from 'next/server'
import { AIDoctorService } from '@/services/ai-doctor-service'
import { ConsultationRequest, DoctorSpecialty } from '@/types/consultation'
import { z } from 'zod'

const ConsultationRequestSchema = z.object({
  doctorId: z.string(),
  initialMessage: z.string().min(10, 'Please provide more details about your concern'),
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
 * API route for handling AI doctor consultations
 * POST /api/consultation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validationResult = ConsultationRequestSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const consultationRequest: ConsultationRequest = validationResult.data
    
    // Map doctor ID to specialty (in a real app, this would come from a database)
    const doctorSpecialtyMap: Record<string, DoctorSpecialty> = {
      'dr-henry': 'general_medicine',
      'dr-floyd-miles': 'cardiology',
      'dr-mckinney': 'neurology',
      'dr-jacob': 'pediatrics',
      'dr-warren': 'internal_medicine'
    }
    
    const specialty = doctorSpecialtyMap[consultationRequest.doctorId]
    if (!specialty) {
      return NextResponse.json(
        { error: 'Invalid doctor ID' },
        { status: 400 }
      )
    }

    // Check for emergency symptoms
    const isEmergency = AIDoctorService.checkEmergencySymptoms(consultationRequest.initialMessage)
    
    if (isEmergency) {
      return NextResponse.json({
        message: "Your symptoms may indicate a medical emergency. Please call 911 or go to the nearest emergency room immediately.",
        recommendations: [
          "Call 911 or emergency services immediately",
          "Go to the nearest emergency room",
          "Do not delay seeking emergency medical care"
        ],
        requiresEmergencyCare: true,
        emergencyMessage: "This appears to be a medical emergency. Please seek immediate medical attention."
      })
    }

    // Generate AI doctor response
    const response = await AIDoctorService.generateConsultationResponse(
      consultationRequest,
      specialty
    )

    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Consultation API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint for retrieving consultation history or doctor information
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    
    if (action === 'doctors') {
      // Return available AI doctor agents
      const doctors = [
        {
          id: 'dr-henry',
          name: 'Dr. Henry (AI)',
          specialty: 'general_medicine',
          specialtyDisplayName: 'General Medicine AI',
          description: 'AI agent specialized in comprehensive health assessment and general medical advice',
          experience: 'AI-powered with medical knowledge base',
          isAvailable: true,
          responseTime: '2-3 minutes',
          rating: 4.9,
          consultationCount: 1250,
          avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'dr-floyd-miles',
          name: 'Dr. Floyd Miles (AI)',
          specialty: 'cardiology',
          specialtyDisplayName: 'Cardiology AI',
          description: 'AI agent specialized in heart health, cardiovascular conditions, and cardiac symptoms',
          experience: 'AI-powered with cardiology expertise',
          isAvailable: true,
          responseTime: '3-5 minutes',
          rating: 4.8,
          consultationCount: 890,
          avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'dr-mckinney',
          name: 'Dr. McKinney (AI)',
          specialty: 'neurology',
          specialtyDisplayName: 'Neurology AI',
          description: 'AI agent specialized in brain and nervous system conditions, headaches, and neurological symptoms',
          experience: 'AI-powered with neurology specialization',
          isAvailable: true,
          responseTime: '4-6 minutes',
          rating: 4.7,
          consultationCount: 650,
          avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'dr-jacob',
          name: 'Dr. Jacob (AI)',
          specialty: 'pediatrics',
          specialtyDisplayName: 'Pediatrics AI',
          description: 'AI agent specialized in child health, developmental concerns, and pediatric conditions',
          experience: 'AI-powered with pediatric expertise',
          isAvailable: true,
          responseTime: '2-4 minutes',
          rating: 4.9,
          consultationCount: 1100,
          avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 'dr-warren',
          name: 'Dr. Warren (AI)',
          specialty: 'internal_medicine',
          specialtyDisplayName: 'Internal Medicine AI',
          description: 'AI agent specialized in adult medicine, chronic conditions, and complex medical cases',
          experience: 'AI-powered with internal medicine expertise',
          isAvailable: true,
          responseTime: '3-5 minutes',
          rating: 4.8,
          consultationCount: 980,
          avatar: 'https://images.unsplash.com/photo-1594824609072-57c2d2bb8b86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        }
      ]
      
      return NextResponse.json({ doctors })
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    
  } catch (error) {
    console.error('Consultation GET API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
