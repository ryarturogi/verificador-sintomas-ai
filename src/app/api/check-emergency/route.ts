import { NextRequest, NextResponse } from 'next/server'
import { questionGenerator } from '@/services/question-generator'
import { QuestionResponse } from '@/types/dynamic-questionnaire'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { responses } = body

    const needsEmergencyCheck = await questionGenerator.shouldAskEmergencyQuestion(
      responses as QuestionResponse[]
    )

    return NextResponse.json({ needsEmergencyCheck })
  } catch (error) {
    console.error('Emergency check error:', error)
    return NextResponse.json(
      { error: 'Failed to check for emergency' },
      { status: 500 }
    )
  }
}