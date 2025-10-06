import { NextRequest, NextResponse } from 'next/server'
import { answerGenerator } from '@/services/answer-generator'
import { QuestionResponse } from '@/types/dynamic-questionnaire'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      questionText, 
      questionType, 
      previousResponses, 
      maxOptions = 6,
      currentInput,
      requestType = 'options', // 'options', 'suggestions', 'symptoms'
      language = 'en'
    } = body

    let result = null

    switch (requestType) {
      case 'options':
        result = await answerGenerator.generateAnswerOptions(
          questionText,
          questionType,
          previousResponses as QuestionResponse[],
          maxOptions,
          language
        )
        break

      case 'suggestions':
        result = await answerGenerator.generateSmartSuggestions(
          questionText,
          currentInput,
          previousResponses as QuestionResponse[],
          maxOptions,
          language
        )
        break

      case 'symptoms':
        const { bodyPart, symptomType, query } = body
        result = await answerGenerator.generateSymptomOptions(bodyPart, symptomType, language, query)
        break

      default:
        return NextResponse.json({ error: 'Invalid request type' }, { status: 400 })
    }

    return NextResponse.json({ result })
  } catch (error) {
    console.error('Answer generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate answers' },
      { status: 500 }
    )
  }
}