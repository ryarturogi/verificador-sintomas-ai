import { NextRequest, NextResponse } from 'next/server'
import { dynamicSymptomAnalyzer } from '@/services/dynamic-symptom-analyzer'
import { QuestionResponse } from '@/types/dynamic-questionnaire'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { responses, language = 'en' } = body

    const result = await dynamicSymptomAnalyzer.analyzeResponses(
      responses as QuestionResponse[],
      language
    )

    return NextResponse.json({ result })
  } catch (error) {
    console.error('Symptom analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze symptoms' },
      { status: 500 }
    )
  }
}