import { Question } from '@/types/dynamic-questionnaire'

interface ImageAnalysisRequest {
  base64Image: string
  imageType: 'mri' | 'ct_scan' | 'xray' | 'ultrasound' | 'pathology' | 'general'
  filename: string
  additionalContext?: string
  language?: string
}

interface ImageAnalysisResult {
  analysis: string
  findings: string[]
  recommendations: string[]
  urgencyLevel: 'low' | 'medium' | 'high' | 'emergency'
  suggestedSpecialties: string[]
  confidence: number
  disclaimer: string
}

export class MedicalImageAnalyzer {
  private readonly baseUrl = '/api'

  async analyzeImage(request: ImageAnalysisRequest): Promise<ImageAnalysisResult> {
    try {
      // Use OpenAI Vision API for medical image analysis
      const response = await fetch(`${this.baseUrl}/openai/analyze-medical-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: request.base64Image,
          imageType: request.imageType,
          filename: request.filename,
          context: request.additionalContext,
          language: request.language || 'en',
          // Specific medical analysis prompt for OpenAI Vision
          systemPrompt: this.generateSystemPrompt(request.imageType, request.language || 'en')
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to analyze medical image')
      }

      const result = await response.json()
      return this.processOpenAIResponse(result, request)
    } catch (error) {
      console.error('Medical image analysis error:', error)
      
      // Fallback response for when the service is unavailable
      return this.getFallbackAnalysis(request)
    }
  }

  private generateSystemPrompt(imageType: string, language: string): string {
    const isSpanish = language === 'es'
    
    const basePrompt = isSpanish 
      ? `Eres un asistente médico especializado en análisis de imágenes médicas. Tu tarea es analizar la imagen médica proporcionada y proporcionar información educativa y observaciones generales.

IMPORTANTE: 
- NO proporciones diagnósticos definitivos
- NO reemplaces la consulta médica profesional
- Proporciona solo observaciones educativas generales
- Recomienda siempre consultar con un especialista médico`

      : `You are a medical assistant specialized in medical image analysis. Your task is to analyze the provided medical image and provide educational information and general observations.

IMPORTANT:
- DO NOT provide definitive diagnoses
- DO NOT replace professional medical consultation
- Provide only general educational observations
- Always recommend consulting with a medical specialist`

    const typeSpecificPrompts = {
      mri: isSpanish 
        ? 'Analiza esta resonancia magnética y describe las estructuras visibles y cualquier característica notable.'
        : 'Analyze this MRI scan and describe visible structures and any notable characteristics.',
      ct_scan: isSpanish
        ? 'Analiza esta tomografía computarizada y describe las estructuras anatómicas visibles.'
        : 'Analyze this CT scan and describe visible anatomical structures.',
      xray: isSpanish
        ? 'Analiza esta radiografía e identifica las estructuras anatómicas visibles.'
        : 'Analyze this X-ray and identify visible anatomical structures.',
      ultrasound: isSpanish
        ? 'Analiza esta ecografía y describe las estructuras y patrones visibles.'
        : 'Analyze this ultrasound and describe visible structures and patterns.',
      pathology: isSpanish
        ? 'Analiza esta muestra patológica y describe las características celulares o tisulares visibles.'
        : 'Analyze this pathology sample and describe visible cellular or tissue characteristics.',
      general: isSpanish
        ? 'Analiza esta imagen médica y proporciona observaciones generales sobre las estructuras visibles.'
        : 'Analyze this medical image and provide general observations about visible structures.'
    }

    const specificPrompt = typeSpecificPrompts[imageType as keyof typeof typeSpecificPrompts] || typeSpecificPrompts.general

    return `${basePrompt}\n\n${specificPrompt}\n\n${isSpanish 
      ? 'Responde en formato JSON con: analysis (análisis detallado), findings (hallazgos clave), recommendations (recomendaciones), urgencyLevel (low/medium/high/emergency), suggestedSpecialties (especialidades sugeridas), confidence (0-1)'
      : 'Respond in JSON format with: analysis (detailed analysis), findings (key findings), recommendations (recommendations), urgencyLevel (low/medium/high/emergency), suggestedSpecialties (suggested specialties), confidence (0-1)'
    }`
  }

  private processOpenAIResponse(openaiResult: unknown, request: ImageAnalysisRequest): ImageAnalysisResult {
    const isSpanish = request.language === 'es'
    
    try {
      // Attempt to parse OpenAI response if it's JSON
      const parsed = typeof openaiResult === 'string' ? JSON.parse(openaiResult) : openaiResult
      
      return {
        analysis: parsed.analysis || (isSpanish ? 'Análisis completado' : 'Analysis completed'),
        findings: Array.isArray(parsed.findings) ? parsed.findings : [isSpanish ? 'Imagen procesada exitosamente' : 'Image processed successfully'],
        recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [
          isSpanish ? 'Consulta con un especialista médico' : 'Consult with a medical specialist'
        ],
        urgencyLevel: parsed.urgencyLevel || 'medium',
        suggestedSpecialties: Array.isArray(parsed.suggestedSpecialties) ? parsed.suggestedSpecialties : this.getSuggestedSpecialties(request.imageType),
        confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.8,
        disclaimer: isSpanish
          ? 'Este análisis es solo para fines educativos. Consulta siempre con un profesional médico.'
          : 'This analysis is for educational purposes only. Always consult with a medical professional.'
      }
    } catch (error) {
      console.error('Failed to parse OpenAI response:', error)
      return this.getFallbackAnalysis(request)
    }
  }

  private getFallbackAnalysis(request: ImageAnalysisRequest): ImageAnalysisResult {
    const isSpanish = request.language === 'es'
    
    const typeDescriptions: Record<string, { en: string; es: string }> = {
      mri: {
        en: 'MRI scan',
        es: 'Resonancia magnética'
      },
      ct_scan: {
        en: 'CT scan',
        es: 'Tomografía computarizada'
      },
      xray: {
        en: 'X-ray',
        es: 'Radiografía'
      },
      ultrasound: {
        en: 'Ultrasound',
        es: 'Ecografía'
      },
      pathology: {
        en: 'Pathology sample',
        es: 'Muestra patológica'
      },
      general: {
        en: 'Medical image',
        es: 'Imagen médica'
      }
    }

    const imageTypeName = typeDescriptions[request.imageType]?.[isSpanish ? 'es' : 'en'] || 
                         typeDescriptions.general[isSpanish ? 'es' : 'en']

    return {
      analysis: isSpanish 
        ? `Se ha recibido tu ${imageTypeName} (${request.filename}). Por favor, consulta con un especialista médico para una interpretación profesional de esta imagen.`
        : `Your ${imageTypeName} (${request.filename}) has been received. Please consult with a medical specialist for professional interpretation of this image.`,
      findings: isSpanish 
        ? ['Imagen médica cargada exitosamente', 'Requiere interpretación por especialista']
        : ['Medical image uploaded successfully', 'Requires specialist interpretation'],
      recommendations: isSpanish
        ? [
            'Programa una consulta con un especialista médico',
            'Lleva esta imagen a tu próxima cita médica',
            'No autodiagnostiques basándote únicamente en la imagen'
          ]
        : [
            'Schedule a consultation with a medical specialist',
            'Bring this image to your next medical appointment',
            'Do not self-diagnose based on the image alone'
          ],
      urgencyLevel: 'medium',
      suggestedSpecialties: this.getSuggestedSpecialties(request.imageType),
      confidence: 0.7,
      disclaimer: isSpanish
        ? 'Esta es una evaluación preliminar. Siempre consulta con un profesional médico calificado para un diagnóstico preciso.'
        : 'This is a preliminary assessment. Always consult with a qualified medical professional for accurate diagnosis.'
    }
  }

  private getSuggestedSpecialties(imageType: string): string[] {
    const specialtyMap: Record<string, string[]> = {
      mri: ['Radiology', 'Neurology', 'Orthopedics'],
      ct_scan: ['Radiology', 'Emergency Medicine', 'Internal Medicine'],
      xray: ['Radiology', 'Orthopedics', 'Pulmonology'],
      ultrasound: ['Radiology', 'Obstetrics and Gynecology', 'Cardiology'],
      pathology: ['Pathology', 'Oncology', 'Hematology'],
      general: ['Radiology', 'Internal Medicine']
    }

    return specialtyMap[imageType] || specialtyMap.general
  }

  async generateImageQuestion(
    imageType: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    previousResponses: unknown[] = [],
    language: string = 'en'
  ): Promise<Question> {
    const isSpanish = language === 'es'
    
    // Generate a specific question for image upload based on the type
    const questionTemplates = {
      mri: {
        en: 'Upload your MRI scan to begin analysis',
        es: 'Sube tu resonancia magnética para comenzar el análisis'
      },
      ct_scan: {
        en: 'Upload your CT scan to begin analysis',
        es: 'Sube tu tomografía computarizada para comenzar el análisis'
      },
      xray: {
        en: 'Upload your X-ray to begin analysis',
        es: 'Sube tu radiografía para comenzar el análisis'
      },
      ultrasound: {
        en: 'Upload your ultrasound image to begin analysis',
        es: 'Sube tu ecografía para comenzar el análisis'
      },
      pathology: {
        en: 'Upload your pathology sample image to begin analysis',
        es: 'Sube la imagen de tu muestra patológica para comenzar el análisis'
      },
      general: {
        en: 'Upload your medical image to begin analysis',
        es: 'Sube tu imagen médica para comenzar el análisis'
      }
    }

    const template = questionTemplates[imageType as keyof typeof questionTemplates] || questionTemplates.general

    return {
      generateAnswers: true,
      id: `image_upload_${imageType}`,
      type: 'image_upload',
      text: template[isSpanish ? 'es' : 'en'],
      description: isSpanish 
        ? 'Este es el primer paso de tu análisis médico. Sube una imagen clara de tu estudio médico. Asegúrate de que la imagen sea legible y de buena calidad.'
        : 'This is the first step of your medical analysis. Upload a clear image of your medical study. Make sure the image is readable and of good quality.',
      required: true,
      placeholder: isSpanish 
        ? `Subir imagen de ${imageType}`
        : `Upload ${imageType} image`,
      imageUpload: {
        acceptedTypes: ['image/*', 'application/dicom'],
        maxSize: 10 * 1024 * 1024, // 10MB
        imageType: imageType as 'mri' | 'ct_scan' | 'xray' | 'ultrasound' | 'pathology' | 'general',
        analysisPrompt: isSpanish
          ? `Analiza esta imagen médica tipo ${imageType} y proporciona hallazgos clínicos relevantes.`
          : `Analyze this ${imageType} medical image and provide relevant clinical findings.`
      }
    }
  }
}

export const medicalImageAnalyzer = new MedicalImageAnalyzer()