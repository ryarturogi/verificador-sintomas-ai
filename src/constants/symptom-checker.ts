import type { GPTModelConfig } from '@/types/symptom-checker'

export const GPT_MODELS: Record<string, GPTModelConfig> = {
  PRIMARY: {
    model: 'gpt-5',
    temperature: 0.3,
    maxTokens: 1500,
    useCase: 'primary',
  },
  QUICK: {
    model: 'gpt-5-mini',
    temperature: 0.2,
    maxTokens: 800,
    useCase: 'quick',
  },
  EMERGENCY: {
    model: 'gpt-5-nano',
    temperature: 0.1,
    maxTokens: 300,
    useCase: 'emergency',
  },
}

export const EMERGENCY_KEYWORDS = [
  'chest pain',
  'can\'t breathe',
  'difficulty breathing',
  'shortness of breath',
  'heart attack',
  'stroke',
  'severe bleeding',
  'unconscious',
  'suicide',
  'overdose',
  'severe pain',
  'head injury',
  'allergic reaction',
  'anaphylaxis',
  'choking',
  'burn',
  'broken bone',
  'severe abdominal pain',
]

export const MEDICAL_DISCLAIMER = `
⚠️ IMPORTANT MEDICAL DISCLAIMER:

This AI symptom checker is for informational purposes only and is NOT a substitute for professional medical advice, diagnosis, or treatment. 

• Always consult with a qualified healthcare provider for medical concerns
• In case of emergency, call 911 or go to the nearest emergency room immediately
• This tool does not provide medical diagnosis or treatment recommendations
• Do not delay seeking medical care based on information from this tool

If you are experiencing a medical emergency, stop using this tool and seek immediate medical attention.
`

export const EMERGENCY_MESSAGE = `
🚨 EMERGENCY ALERT 🚨

Your symptoms may indicate a medical emergency. 

IMMEDIATE ACTION REQUIRED:
• Call 911 or emergency services NOW
• Go to the nearest emergency room immediately
• Do not delay seeking medical attention

This is not a diagnosis, but your symptoms require immediate professional medical evaluation.
`

export const SYMPTOM_PROMPTS = {
  EMERGENCY_CHECK: `
You are a medical emergency detection system. Analyze the following symptoms and determine if they indicate a potential medical emergency.

Symptoms to analyze: {symptoms}

Respond with a JSON object containing:
{
  "isEmergency": boolean,
  "confidence": number (0-1),
  "reason": "explanation of why this may or may not be an emergency"
}

Consider emergency situations like:
- Severe chest pain or heart attack symptoms
- Stroke symptoms (FAST test)
- Difficulty breathing or respiratory distress
- Severe bleeding or trauma
- Loss of consciousness
- Severe allergic reactions
- Suicidal ideation
- Severe pain that is sudden onset

Be conservative - err on the side of caution for emergency detection.
`,

  SYMPTOM_ANALYSIS: `
You are an AI medical assistant providing symptom analysis for informational purposes only. 

IMPORTANT: You must always include appropriate medical disclaimers and emphasize that this is not a medical diagnosis.

Analyze these symptoms and provide insights:

Patient Information:
- Age: {age}
- Gender: {gender}
- Primary Symptom: {primarySymptom}
- Description: {description}
- Duration: {duration}
- Severity: {severity}
- Additional Symptoms: {additionalSymptoms}
- Chronic Conditions: {chronicConditions}
- Current Medications: {currentMedications}
- Pregnancy Status: {isPregnant}
- Allergies: {allergies}

Provide a comprehensive assessment including:

1. Possible conditions (with probability estimates)
2. Recommended actions
3. When to seek medical care
4. Self-care suggestions (if appropriate)
5. Red flag symptoms to watch for

Format your response as a JSON object matching this structure:
{
  "severity": "mild" | "moderate" | "severe" | "emergency",
  "possibleConditions": [
    {
      "name": "condition name",
      "probability": 0.0-1.0,
      "description": "brief explanation"
    }
  ],
  "recommendations": ["recommendation 1", "recommendation 2"],
  "emergencyWarning": boolean,
  "emergencyMessage": "emergency message if applicable",
  "followUpAdvice": "when and how to seek further care"
}

Remember: Always be conservative with assessments and encourage professional medical consultation when in doubt.
`,
}