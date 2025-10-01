import { createChatCompletion } from '@/lib/openai'
import { 
  SymptomData, 
  AssessmentResult, 
  type GPTModelConfig 
} from '@/types/symptom-checker'
import { 
  GPT_MODELS, 
  EMERGENCY_KEYWORDS, 
  SYMPTOM_PROMPTS 
} from '@/constants/symptom-checker'

export class SymptomAnalyzer {
  
  async checkForEmergency(symptoms: string): Promise<boolean> {
    const lowerSymptoms = symptoms.toLowerCase()
    
    const hasEmergencyKeywords = EMERGENCY_KEYWORDS.some(keyword => 
      lowerSymptoms.includes(keyword)
    )
    
    if (hasEmergencyKeywords) {
      return true
    }

    try {
      const prompt = SYMPTOM_PROMPTS.EMERGENCY_CHECK.replace('{symptoms}', symptoms)
      
      const response = await createChatCompletion(
        [{ role: 'user', content: prompt }],
        GPT_MODELS.EMERGENCY.model,
        {
          temperature: GPT_MODELS.EMERGENCY.temperature,
          maxTokens: GPT_MODELS.EMERGENCY.maxTokens,
          responseFormat: 'json_object'
        }
      )

      const result = JSON.parse(response)
      return result.isEmergency && result.confidence > 0.7
    } catch (error) {
      console.error('Emergency check failed:', error)
      return hasEmergencyKeywords
    }
  }

  async analyzeSymptoms(data: SymptomData): Promise<AssessmentResult> {
    const isEmergency = await this.checkForEmergency(
      `${data.primarySymptom} ${data.description} ${data.additionalSymptoms?.join(' ') || ''}`
    )

    if (isEmergency) {
      return {
        severity: 'emergency',
        possibleConditions: [],
        recommendations: ['Seek immediate emergency medical care'],
        emergencyWarning: true,
        emergencyMessage: 'Your symptoms may indicate a medical emergency. Call 911 or go to the nearest emergency room immediately.',
        followUpAdvice: 'Do not delay seeking emergency medical attention.',
      }
    }

    const modelConfig = this.selectModel(data.severity)
    
    try {
      const prompt = this.buildAnalysisPrompt(data)
      
      const response = await createChatCompletion(
        [{ role: 'user', content: prompt }],
        modelConfig.model,
        {
          temperature: modelConfig.temperature,
          maxTokens: modelConfig.maxTokens,
          responseFormat: 'json_object'
        }
      )

      const result = JSON.parse(response)
      
      const assessment = AssessmentResult.parse({
        ...result,
        emergencyWarning: false
      })

      return assessment
    } catch (error) {
      console.error('Symptom analysis failed:', error)
      throw new Error('Unable to analyze symptoms. Please try again or consult a healthcare provider.')
    }
  }

  private selectModel(severity: string): GPTModelConfig {
    switch (severity) {
      case 'emergency':
      case 'severe':
        return GPT_MODELS.PRIMARY
      case 'moderate':
        return GPT_MODELS.QUICK
      case 'mild':
      default:
        return GPT_MODELS.QUICK
    }
  }

  private buildAnalysisPrompt(data: SymptomData): string {
    return SYMPTOM_PROMPTS.SYMPTOM_ANALYSIS
      .replace('{age}', data.age.toString())
      .replace('{gender}', data.gender)
      .replace('{primarySymptom}', data.primarySymptom)
      .replace('{description}', data.description)
      .replace('{duration}', data.duration)
      .replace('{severity}', data.severity)
      .replace('{additionalSymptoms}', data.additionalSymptoms?.join(', ') || 'None')
      .replace('{chronicConditions}', data.chronicConditions || 'None')
      .replace('{currentMedications}', data.currentMedications || 'None')
      .replace('{isPregnant}', data.isPregnant ? 'Yes' : 'No')
      .replace('{allergies}', data.allergies || 'None')
  }
}

export const symptomAnalyzer = new SymptomAnalyzer()