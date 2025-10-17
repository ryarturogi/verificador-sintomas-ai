import { NextRequest, NextResponse } from 'next/server';
import { createChatCompletion } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { input, model = 'gpt-5-nano' } = await request.json();

    if (!input || input.trim().length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    const messages = [
      {
        role: 'system' as const,
        content: `You are a medical symptom suggestion assistant. Based on the user's partial input, suggest 5-6 relevant medical symptoms that they might be describing. Return only a JSON object with "suggestions" array. Be medically accurate and focus on symptoms, not diagnoses. Keep responses concise.

Example format: {"suggestions": ["Headache", "Head pressure", "Migraine"]}`
      },
      {
        role: 'user' as const,
        content: `Suggest medical symptoms related to: "${input}"`
      }
    ];

    const options = {
      responseFormat: 'json_object' as const,
      maxTokens: 500,
      reasoningEffort: 'low' as const,
      verbosity: 'low' as const
    };

    const content = await createChatCompletion(messages, model, options);
    
    if (!content) {
      return NextResponse.json({ suggestions: [] });
    }

    try {
      const parsed = JSON.parse(content);
      const suggestions = Array.isArray(parsed.suggestions) ? parsed.suggestions : 
                         Array.isArray(parsed) ? parsed : [];
      
      return NextResponse.json({ 
        suggestions: suggestions.slice(0, 6) // Limit to 6 suggestions for faster response
      });
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      return NextResponse.json({ suggestions: [] });
    }

  } catch (error) {
    console.error('Error generating symptom suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions' }, 
      { status: 500 }
    );
  }
}