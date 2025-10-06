import { createChatCompletion } from '@/lib/openai'
import { 
  Question, 
  QuestionResponse
} from '@/types/dynamic-questionnaire'

export class QuestionGenerator {
  
  // Add validation method to ensure question uniqueness
  private validateQuestionUniqueness(newQuestion: Question, previousResponses: QuestionResponse[]): boolean {
    // Check if this exact question ID has been used before
    const existingQuestionIds = previousResponses.map(r => r.questionId)
    
    if (existingQuestionIds.includes(newQuestion.id)) {
      return false
    }

    // Check for semantic similarity in question text (basic check)
    const newQuestionText = newQuestion.text.toLowerCase()
    const existingQuestions = previousResponses.map(r => r.questionId)
    
    // Simple keyword overlap check
    const newQuestionKeywords = new Set(newQuestionText.split(' ').filter(word => word.length > 3))
    
    for (const existingId of existingQuestions) {
      const existingKeywords = new Set(existingId.toLowerCase().split('_').filter(word => word.length > 3))
      const overlap = new Set([...newQuestionKeywords].filter(x => existingKeywords.has(x)))
      
      // If more than 50% keyword overlap, consider it too similar
      if (overlap.size > Math.min(newQuestionKeywords.size, existingKeywords.size) * 0.5) {
        return false
      }
    }
    
    return true
  }
  
  async generateInitialQuestion(language: string = 'en'): Promise<Question> {
    const isSpanish = language === 'es'
    
    const prompt = `
You are a medical AI assistant creating the first question for a clinical symptom assessment questionnaire. This is designed to function like a real medical diagnosis process.

${isSpanish ? 'IMPORTANTE: Responde en español. Toda la información debe estar en español.' : 'IMPORTANT: Respond in English.'}

Generate a JSON object for an initial question that follows clinical diagnostic methodology. This should be an open-ended question that allows the patient to describe their chief complaint (síntoma principal) in detail, following the medical history-taking approach.

The question should:
1. Follow the SOCRATES mnemonic (Site, Onset, Character, Radiation, Associated symptoms, Time course, Exacerbating/Relieving factors, Severity)
2. Be clinically relevant for differential diagnosis
3. Allow for comprehensive symptom description
4. Guide the patient to provide medically useful information

Return a JSON object with this exact structure:
{
  "id": "initial_symptom",
  "type": "ai_text_input",
  "text": "${isSpanish ? '¿Cuál es tu síntoma principal o preocupación de salud que te trae aquí hoy?' : 'What is your main symptom or health concern that brings you here today?'}",
  "description": "${isSpanish ? 'Por favor describe tu síntoma principal en detalle. Incluye: dónde está localizado, cuándo comenzó, cómo se siente, si se irradia a otras áreas, qué otros síntomas tienes, cómo ha evolucionado con el tiempo, qué lo mejora o empeora, y qué tan severo es (escala del 1-10).' : 'Please describe your main symptom in detail. Include: where it is located, when it started, how it feels, if it radiates to other areas, what other symptoms you have, how it has evolved over time, what makes it better or worse, and how severe it is (scale 1-10).'}",
  "required": true,
  "placeholder": "${isSpanish ? 'ej., Tengo un dolor de cabeza severo (8/10) que comenzó ayer en la región temporal derecha, se irradia al cuello, acompañado de náuseas y sensibilidad a la luz...' : 'e.g., I have a severe headache (8/10) that started yesterday in the right temporal region, radiates to the neck, accompanied by nausea and light sensitivity...'}",
  "generateAnswers": true
}
`

    try {
      const response = await createChatCompletion(
        [{ role: 'user', content: prompt }],
        'gpt-5-nano',
        {
          responseFormat: 'json_object',
          reasoningEffort: 'low',
          verbosity: 'low'
        }
      )

      // Add debugging for response
      console.log('Raw response from OpenAI (initial question):', response)
      
      if (!response || response.trim() === '') {
        throw new Error('Empty response from OpenAI API')
      }

      let questionData
      try {
        questionData = JSON.parse(response)
      } catch (parseError) {
        console.error('JSON Parse Error (initial question):', parseError)
        console.error('Response that failed to parse:', response)
        throw new Error(`Failed to parse JSON response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`)
      }
      return questionData as Question
    } catch (error) {
      console.error('Failed to generate initial question:', error)
      // Fallback question
      const isSpanish = language === 'es'
      return {
        id: 'initial_symptom',
        type: 'ai_text_input',
        text: isSpanish ? '¿Cuál es tu principal preocupación de salud o síntoma hoy?' : 'What is your main health concern or symptom today?',
        description: isSpanish ? 'Por favor describe en detalle lo que te trajo aquí hoy.' : 'Please describe what brought you here today in detail.',
        required: true,
        placeholder: isSpanish ? 'ej., Tengo un dolor de cabeza severo que comenzó ayer...' : 'e.g., I have a severe headache that started yesterday...',
        generateAnswers: true
      }
    }
  }

  async generateNextQuestion(
    previousResponses: QuestionResponse[],
    questionCount: number,
    language: string = 'en'
  ): Promise<Question | null> {
    
    if (questionCount >= 8) {
      return null // End questionnaire
    }

    const context = this.buildContext(previousResponses)
    const askedQuestions = this.extractAskedQuestions(previousResponses)
    const isSpanish = language === 'es'
    
    const prompt = `
You are a medical AI assistant creating follow-up questions for a clinical symptom assessment. This follows real medical diagnostic methodology.

${isSpanish ? 'IMPORTANTE: Responde completamente en español. Todas las preguntas, descripciones y opciones deben estar en español.' : 'IMPORTANT: Respond in English.'}

Based on the patient's previous responses, generate the next most clinically relevant question following medical diagnostic principles.

Previous responses context:
${context}

Question number: ${questionCount + 1} of maximum 8 questions.

IMPORTANT: DO NOT repeat or rephrase questions that have already been asked. Previously asked questions:
${askedQuestions}

Follow clinical diagnostic methodology:
1. Use SOCRATES mnemonic (Site, Onset, Character, Radiation, Associated symptoms, Time course, Exacerbating/Relieving factors, Severity)
2. Focus on differential diagnosis
3. Identify red flag symptoms
4. Gather information for risk stratification
5. Consider organ systems involved
6. Assess symptom progression and timeline

Generate a JSON object for the next question. Choose the most appropriate question type based on what information is needed:

Question types available:
- "ai_single_choice": For AI-generated single choice options (symptom characteristics, locations, etc.)
- "ai_multiple_choice": For AI-generated multiple choice options (associated symptoms, risk factors)
- "ai_text_input": For text input with AI-powered autocomplete (detailed descriptions)
- "number_input": For numeric input (duration, severity scale, vital signs)
- "boolean": For yes/no questions (red flags, medical history)

Prefer AI-powered question types (ai_single_choice, ai_multiple_choice, ai_text_input) for medical content to provide contextual, personalized options.

Focus on gathering critical information for medical assessment such as:
- Symptom severity and characteristics (quality, intensity, progression)
- Duration and onset (acute vs chronic, sudden vs gradual)
- Associated symptoms and systemic manifestations
- Location/body parts affected (precise anatomical references)
- Triggers or relieving factors (environmental, positional, medication)
- Medical history relevance (comorbidities, medications, allergies)
- Red flag symptoms and warning signs
- Impact on daily activities and functional status
- Risk factors and family history

Return a JSON object with this structure:
{
  "id": "unique_question_id",
  "type": "question_type",
  "text": "Clear, concise question text",
  "description": "Optional helpful description",
  "required": true,
  "generateAnswers": true, // set to true for AI-generated options
  "options": [{"id": "opt1", "label": "Option 1", "value": "value1"}], // only for choice types
  "min": 1, // only for scale/number types
  "max": 10, // only for scale/number types
  "placeholder": "placeholder text", // only for text inputs
  "answerContext": {
    "maxOptions": 6
  }
}

Make sure the question is medically relevant and builds on previous responses.
`

    try {
      let attempts = 0
      const maxAttempts = 3
      let currentPrompt = prompt
      
      while (attempts < maxAttempts) {
        const response = await createChatCompletion(
          [{ role: 'user', content: currentPrompt }],
          'gpt-5-nano',
          {
            responseFormat: 'json_object',
            reasoningEffort: 'medium',
            verbosity: 'low'
          }
        )

        // Add debugging for response
        console.log('Raw response from OpenAI:', response)
        
        if (!response || response.trim() === '') {
          throw new Error('Empty response from OpenAI API')
        }

        let questionData
        try {
          questionData = JSON.parse(response)
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError)
          console.error('Response that failed to parse:', response)
          
          // Try to fix truncated JSON by attempting to complete it
          if (response.includes('"id"') && response.includes('"type"')) {
            console.log('Attempting to fix truncated JSON response...')
            try {
              // Try to complete the JSON by adding missing closing braces
              let fixedResponse = response.trim()
              if (!fixedResponse.endsWith('}')) {
                // Count opening and closing braces to determine how many are missing
                const openBraces = (fixedResponse.match(/\{/g) || []).length
                const closeBraces = (fixedResponse.match(/\}/g) || []).length
                const missingBraces = openBraces - closeBraces
                
                if (missingBraces > 0) {
                  fixedResponse += '}'.repeat(missingBraces)
                  console.log('Fixed JSON by adding missing closing braces')
                }
              }
              
              questionData = JSON.parse(fixedResponse)
              console.log('Successfully fixed truncated JSON')
            } catch (fixError) {
              console.error('Failed to fix truncated JSON:', fixError)
              throw new Error(`Failed to parse JSON response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`)
            }
          } else {
            throw new Error(`Failed to parse JSON response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`)
          }
        }
        const question = questionData as Question
        
        console.log('Generated question:', {
          id: question.id,
          type: question.type,
          text: question.text,
          generateAnswers: question.generateAnswers,
          answerContext: question.answerContext
        })
        
        // Validate question uniqueness
        if (this.validateQuestionUniqueness(question, previousResponses)) {
          return question
        }
        
        attempts++
        console.warn(`Generated duplicate question (attempt ${attempts}/${maxAttempts}): ${question.text}`)
        
        // Update prompt for retry to be more specific about avoiding duplicates
        if (attempts < maxAttempts) {
          currentPrompt += `\n\nNOTE: The previous attempt generated a duplicate question. Please generate a completely different question that asks about a new aspect of the patient's condition.`
        }
      }
      
      console.error('Failed to generate unique question after maximum attempts')
      return null
    } catch (error) {
      console.error('Failed to generate next question:', error)
      return null
    }
  }

  async generateBasicInfoQuestions(): Promise<Question[]> {
    const questions: Question[] = [
      {
        id: 'age',
        type: 'number_input',
        text: 'What is your age?',
        required: true,
        min: 1,
        max: 120,
        placeholder: 'Enter your age',
        generateAnswers: false
      },
      {
        id: 'gender',
        type: 'single_choice',
        text: 'What is your gender?',
        required: true,
        generateAnswers: false,
        options: [
          { id: 'male', label: 'Male', value: 'male' },
          { id: 'female', label: 'Female', value: 'female' },
          { id: 'other', label: 'Other', value: 'other' },
          { id: 'prefer_not_to_say', label: 'Prefer not to say', value: 'prefer_not_to_say' }
        ]
      }
    ]

    return questions
  }

  private buildContext(responses: QuestionResponse[]): string {
    return responses
      .map(response => {
        const answer = Array.isArray(response.answer) 
          ? response.answer.join(', ')
          : response.answer.toString()
        return `Question ${response.questionId}: ${answer}`
      })
      .join('\n')
  }

  private extractAskedQuestions(responses: QuestionResponse[]): string {
    if (responses.length === 0) {
      return "No previous questions asked."
    }

    // Create a set to store unique question topics to avoid duplicates
    const questionTopics = new Set<string>()
    
    responses.forEach(response => {
      // Extract the general topic/theme of each question based on question ID
      const questionId = response.questionId
      
      // Map common question patterns to their general topics
      if (questionId.includes('initial') || questionId.includes('symptom')) {
        questionTopics.add('Primary symptoms and health concerns')
      } else if (questionId.includes('pain') || questionId.includes('severity')) {
        questionTopics.add('Pain severity and characteristics')
      } else if (questionId.includes('duration') || questionId.includes('time')) {
        questionTopics.add('Symptom duration and timeline')
      } else if (questionId.includes('location') || questionId.includes('where')) {
        questionTopics.add('Symptom location and affected areas')
      } else if (questionId.includes('trigger') || questionId.includes('cause')) {
        questionTopics.add('Triggers and contributing factors')
      } else if (questionId.includes('emergency')) {
        questionTopics.add('Emergency symptoms screening')
      } else if (questionId.includes('age') || questionId.includes('gender')) {
        questionTopics.add('Basic demographic information')
      } else if (questionId.includes('medical') || questionId.includes('history')) {
        questionTopics.add('Medical history and conditions')
      } else if (questionId.includes('medication') || questionId.includes('treatment')) {
        questionTopics.add('Current medications and treatments')
      } else if (questionId.includes('activity') || questionId.includes('impact')) {
        questionTopics.add('Impact on daily activities')
      } else if (questionId.includes('associated') || questionId.includes('additional')) {
        questionTopics.add('Associated symptoms')
      } else {
        // For other questions, try to infer the topic from the question ID
        questionTopics.add(`Questions about ${questionId.replace(/_/g, ' ')}`)
      }
    })

    return Array.from(questionTopics).join('\n- ')
  }

  async shouldAskEmergencyQuestion(responses: QuestionResponse[]): Promise<boolean> {
    if (responses.length === 0) return false

    const context = this.buildContext(responses)
    
    const prompt = `
Analyze these patient responses and determine if an emergency screening question should be asked based on clinical red flag symptoms and emergency indicators.

${context}

Consider these emergency indicators:
- Severe pain (chest, abdominal, head)
- Difficulty breathing or shortness of breath
- Loss of consciousness or altered mental status
- Severe bleeding or trauma
- Signs of stroke (FAST: Face drooping, Arm weakness, Speech difficulty, Time)
- Signs of heart attack (chest pain, pressure, radiating pain)
- Severe allergic reactions
- Signs of shock (pale, cold, rapid pulse)
- Severe dehydration
- High fever with other concerning symptoms
- Neurological symptoms (seizures, paralysis, severe headache)
- Severe abdominal pain
- Signs of infection (high fever, rapid deterioration)

Return a JSON object:
{
  "needsEmergencyScreen": true/false,
  "reason": "brief explanation of why emergency screening is/is not needed"
}
`

    try {
      const response = await createChatCompletion(
        [{ role: 'user', content: prompt }],
        'gpt-5-nano',
        {
          responseFormat: 'json_object',
          reasoningEffort: 'low',
          verbosity: 'low'
        }
      )

      const result = JSON.parse(response)
      return result.needsEmergencyScreen === true
    } catch (error) {
      console.error('Failed to check emergency need:', error)
      return false
    }
  }

  async generateEmergencyQuestion(): Promise<Question> {
    return {
      id: 'emergency_symptoms',
      type: 'multiple_choice',
      text: '¿Estás experimentando alguno de estos síntomas en este momento?',
      description: 'Selecciona todos los que apliquen. Estos síntomas pueden requerir atención médica inmediata.',
      required: true,
      generateAnswers: false,
      options: [
        { id: 'chest_pain', label: 'Dolor torácico severo o presión en el pecho', value: 'chest_pain' },
        { id: 'breathing_difficulty', label: 'Dificultad para respirar o falta de aire', value: 'breathing_difficulty' },
        { id: 'stroke_symptoms', label: 'Signos de accidente cerebrovascular (caída facial, debilidad en brazo, dificultad para hablar)', value: 'stroke_symptoms' },
        { id: 'severe_bleeding', label: 'Hemorragia severa o sangrado incontrolable', value: 'severe_bleeding' },
        { id: 'loss_consciousness', label: 'Pérdida de conciencia o desmayo', value: 'loss_consciousness' },
        { id: 'severe_head_injury', label: 'Lesión severa en la cabeza o trauma craneal', value: 'severe_head_injury' },
        { id: 'severe_allergic', label: 'Reacción alérgica severa (hinchazón facial, dificultad para respirar)', value: 'severe_allergic' },
        { id: 'severe_abdominal_pain', label: 'Dolor abdominal severo o rigidez abdominal', value: 'severe_abdominal_pain' },
        { id: 'high_fever', label: 'Fiebre alta con otros síntomas preocupantes', value: 'high_fever' },
        { id: 'seizures', label: 'Convulsiones o crisis epilépticas', value: 'seizures' },
        { id: 'severe_headache', label: 'Dolor de cabeza severo y repentino (como un trueno)', value: 'severe_headache' },
        { id: 'suicidal_thoughts', label: 'Pensamientos de autolesión o suicidio', value: 'suicidal_thoughts' },
        { id: 'none', label: 'Ninguno de los anteriores', value: 'none' }
      ]
    }
  }
}

export const questionGenerator = new QuestionGenerator()