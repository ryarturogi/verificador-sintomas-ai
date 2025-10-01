import { NextRequest, NextResponse } from 'next/server'
import { questionGenerator } from '@/services/question-generator'
import { QuestionResponse } from '@/types/dynamic-questionnaire'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, previousResponses, questionCount, language = 'en' } = body

    let question = null

    switch (type) {
      case 'initial':
        question = await questionGenerator.generateInitialQuestion(language)
        break
      case 'next':
        question = await questionGenerator.generateNextQuestion(
          previousResponses as QuestionResponse[],
          questionCount as number,
          language
        )
        break
      case 'emergency':
        question = await questionGenerator.generateEmergencyQuestion()
        break
      default:
        return NextResponse.json({ error: 'Invalid question type' }, { status: 400 })
    }

    return NextResponse.json({ question })
  } catch (error) {
    console.error('Question generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate question' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const question = await questionGenerator.generateInitialQuestion('en')
    return NextResponse.json({ question })
  } catch (error) {
    console.error('Initial question generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate initial question' },
      { status: 500 }
    )
  }
}