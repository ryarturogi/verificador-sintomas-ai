import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { input, model = 'gpt-5-nano' } = await request.json();

    if (!input || input.trim().length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: `You are a medical symptom suggestion assistant. Based on the user's partial input, suggest 5-6 relevant medical symptoms that they might be describing. Return only a JSON object with "suggestions" array. Be medically accurate and focus on symptoms, not diagnoses. Keep responses concise.

Example format: {"suggestions": ["Headache", "Head pressure", "Migraine"]}`
          },
          {
            role: 'user',
            content: `Suggest medical symptoms related to: "${input}"`
          }
        ],
        ...(model.includes('gpt-5') ? {
          max_completion_tokens: 500,
          reasoning_effort: 'low',
          verbosity: 'low'
        } : {
          max_tokens: 300
        }),
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
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