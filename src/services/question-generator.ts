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
You are a medical AI assistant creating the first question for a symptom assessment questionnaire.

${isSpanish ? 'IMPORTANTE: Responde en español. Toda la información debe estar en español.' : 'IMPORTANT: Respond in English.'}

Generate a JSON object for an initial question that helps identify the patient's main concern. This should be an open-ended question that allows the patient to describe their primary symptom or health concern.

Return a JSON object with this exact structure:
{
  "id": "initial_symptom",
  "type": "ai_text_input",
  "text": "${isSpanish ? '¿Cuál es tu principal preocupación de salud o síntoma hoy?' : 'What is your main health concern or symptom today?'}",
  "description": "${isSpanish ? 'Por favor describe en detalle lo que te trajo aquí hoy. Sé tan específico como sea posible sobre tus síntomas, cuándo comenzaron y cómo te afectan.' : 'Please describe what brought you here today. Be as specific as possible about your symptoms, when they started, and how they affect you.'}",
  "required": true,
  "placeholder": "${isSpanish ? 'ej., Tengo un dolor de cabeza severo que comenzó ayer...' : 'e.g., I have a severe headache that started yesterday...'}",
  "generateAnswers": true
}
`

    try {
      const response = await createChatCompletion(
        [{ role: 'user', content: prompt }],
        'gpt-5-nano',
        {
          temperature: 0.3,
          maxTokens: 500,
          responseFormat: 'json_object'
        }
      )

      const questionData = JSON.parse(response)
      return Question.parse(questionData)
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
You are a medical AI assistant creating follow-up questions for a symptom assessment.

${isSpanish ? 'IMPORTANTE: Responde completamente en español. Todas las preguntas, descripciones y opciones deben estar en español.' : 'IMPORTANT: Respond in English.'}

Based on the patient's previous responses, generate the next most relevant question to help with medical assessment.

Previous responses context:
${context}

Question number: ${questionCount + 1} of maximum 8 questions.

IMPORTANT: DO NOT repeat or rephrase questions that have already been asked. Previously asked questions:
${askedQuestions}

Make sure your new question explores different aspects and doesn't duplicate information already gathered.

Generate a JSON object for the next question. Choose the most appropriate question type based on what information is needed:

Question types available:
- "ai_single_choice": For AI-generated single choice options
- "ai_multiple_choice": For AI-generated multiple choice options  
- "ai_text_input": For text input with AI-powered autocomplete
- "single_choice": For predefined single choice options
- "multiple_choice": For predefined multiple choice options
- "text_input": For basic text responses
- "number_input": For numeric values (age, duration, etc.)
- "boolean": For yes/no questions
- "scale": For rating severity (1-10 scale)

Prefer AI-powered question types (ai_single_choice, ai_multiple_choice, ai_text_input) for medical content to provide contextual, personalized options.

Focus on gathering critical information for medical assessment such as:
- Symptom severity and characteristics
- Duration and onset
- Associated symptoms
- Location/body parts affected
- Triggers or relieving factors
- Medical history relevance
- Impact on daily activities

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
            temperature: 0.4 + (attempts * 0.1), // Increase randomness with each attempt
            maxTokens: 800,
            responseFormat: 'json_object'
          }
        )

        const questionData = JSON.parse(response)
        const question = Question.parse(questionData)
        
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
Analyze these patient responses and determine if an emergency screening question should be asked:

${context}

Return a JSON object:
{
  "needsEmergencyScreen": true/false,
  "reason": "brief explanation"
}
`

    try {
      const response = await createChatCompletion(
        [{ role: 'user', content: prompt }],
        'gpt-5-nano',
        {
          temperature: 0.1,
          maxTokens: 200,
          responseFormat: 'json_object'
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
      text: 'Are you experiencing any of these symptoms right now?',
      description: 'Select all that apply. These may require immediate medical attention.',
      required: true,
      generateAnswers: false,
      options: [
        { id: 'chest_pain', label: 'Severe chest pain', value: 'chest_pain' },
        { id: 'breathing_difficulty', label: 'Difficulty breathing', value: 'breathing_difficulty' },
        { id: 'severe_bleeding', label: 'Severe bleeding', value: 'severe_bleeding' },
        { id: 'loss_consciousness', label: 'Loss of consciousness', value: 'loss_consciousness' },
        { id: 'severe_head_injury', label: 'Severe head injury', value: 'severe_head_injury' },
        { id: 'stroke_symptoms', label: 'Signs of stroke (facial drooping, arm weakness, speech difficulty)', value: 'stroke_symptoms' },
        { id: 'severe_allergic', label: 'Severe allergic reaction', value: 'severe_allergic' },
        { id: 'suicidal_thoughts', label: 'Thoughts of self-harm', value: 'suicidal_thoughts' },
        { id: 'none', label: 'None of the above', value: 'none' }
      ]
    }
  }
}

export const questionGenerator = new QuestionGenerator()