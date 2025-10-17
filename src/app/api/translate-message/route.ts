import { NextRequest, NextResponse } from 'next/server'
import { callGPT5Server } from '@/lib/gpt5-server'

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage, consultationId } = await request.json()

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Determine source and target languages
    const sourceLanguage = targetLanguage === 'en' ? 'es' : 'en'
    const languageNames = {
      'en': 'English',
      'es': 'Spanish'
    }

    const prompt = `You are a specialized medical translator with expertise in clinical terminology and patient communication. Translate the following medical consultation message from ${languageNames[sourceLanguage as keyof typeof languageNames]} to ${languageNames[targetLanguage as keyof typeof languageNames]}.

TRANSLATION GUIDELINES:
- Maintain medical accuracy and clinical precision
- Preserve the professional, empathetic tone of a healthcare provider
- Keep medical terminology consistent with standard clinical practice
- Ensure patient safety by maintaining clear, unambiguous language
- Preserve any medical abbreviations, dosages, or specific clinical terms
- Maintain the conversational flow appropriate for patient-doctor communication
- Keep the same level of formality and warmth as the original

MEDICAL CONTEXT:
- This is a real-time medical consultation between a patient and AI doctor
- Accuracy is critical for patient safety and understanding
- The translation should sound natural and professional in the target language
- Preserve any medical advice, recommendations, or instructions exactly

Original message: "${text}"

Provide only the direct translation without any explanations, labels, or additional text.`

    const translation = await callGPT5Server<string>([
      {
        role: 'system',
        content: 'You are a certified medical translator specializing in clinical communications. Your expertise includes medical terminology, patient safety protocols, and cross-cultural healthcare communication. You translate medical consultations with absolute precision, maintaining clinical accuracy while ensuring clear, empathetic patient communication. You understand the critical importance of accurate medical translation for patient safety and care quality.'
      },
      {
        role: 'user',
        content: prompt
      }
    ], 'gpt-5-nano', {
      maxTokens: 1000,
      reasoningEffort: 'minimal',
      verbosity: 'low'
    })

    if (!translation) {
      throw new Error('No translation received')
    }

    return NextResponse.json({
      translation,
      originalText: text,
      sourceLanguage,
      targetLanguage,
      consultationId
    })

  } catch (error) {
    console.error('Translation API error:', error)
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    )
  }
}
