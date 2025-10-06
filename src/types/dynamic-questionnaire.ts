import { z } from 'zod'

export const QuestionType = z.enum([
  'multiple_choice',
  'single_choice', 
  'text_input',
  'number_input',
  'boolean',
  'scale',
  'body_part_selector',
  'ai_single_choice',
  'ai_multiple_choice',
  'ai_text_input',
  'image_upload'
])
export type QuestionType = z.infer<typeof QuestionType>

export const QuestionOption = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  followUp: z.boolean().optional(),
})
export type QuestionOption = z.infer<typeof QuestionOption>

export const Question = z.object({
  id: z.string(),
  type: QuestionType,
  text: z.string(),
  description: z.string().optional(),
  required: z.boolean().default(true),
  options: z.array(QuestionOption).optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  placeholder: z.string().optional(),
  validation: z.object({
    pattern: z.string().optional(),
    message: z.string().optional(),
  }).optional(),
  generateAnswers: z.boolean().default(false),
  answerContext: z.object({
    bodyPart: z.string().optional(),
    symptomType: z.string().optional(),
    maxOptions: z.number().default(6),
  }).optional(),
  imageUpload: z.object({
    acceptedTypes: z.array(z.string()).default(['image/*']),
    maxSize: z.number().default(10 * 1024 * 1024), // 10MB default
    imageType: z.enum(['mri', 'ct_scan', 'xray', 'ultrasound', 'pathology', 'general']).optional(),
    analysisPrompt: z.string().optional(),
  }).optional(),
})
export type Question = z.infer<typeof Question>

export const QuestionResponse = z.object({
  questionId: z.string(),
  answer: z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]),
  timestamp: z.date().default(() => new Date()),
  imageData: z.object({
    base64: z.string(),
    filename: z.string(),
    size: z.number(),
    type: z.string(),
    analysisResult: z.string().optional(),
  }).optional(),
})
export type QuestionResponse = z.infer<typeof QuestionResponse>

export const QuestionnaireSession = z.object({
  id: z.string(),
  responses: z.array(QuestionResponse),
  currentQuestionId: z.string().optional(),
  completed: z.boolean().default(false),
  startedAt: z.date().default(() => new Date()),
  completedAt: z.date().optional(),
})
export type QuestionnaireSession = z.infer<typeof QuestionnaireSession>

export const AIQuestionPrompt = z.object({
  previousResponses: z.array(QuestionResponse),
  context: z.string(),
  questionCount: z.number(),
  maxQuestions: z.number().default(10),
})
export type AIQuestionPrompt = z.infer<typeof AIQuestionPrompt>