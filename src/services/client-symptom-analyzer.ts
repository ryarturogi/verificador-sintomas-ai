import { QuestionResponse } from '@/types/dynamic-questionnaire'
import { AssessmentResult } from '@/types/symptom-checker'

export class ClientSymptomAnalyzer {
  
  async analyzeResponses(responses: QuestionResponse[], language: string = 'en'): Promise<AssessmentResult> {
    try {
      const response = await fetch('/api/analyze-symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ responses, language }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze symptoms')
      }

      const data = await response.json()
      const result = data.result

      // Check for image analysis data in responses
      const imageResponses = responses.filter(r => r.imageData?.analysisResult)
      if (imageResponses.length > 0) {
        // Extract image analysis information
        const imageAnalysisData = imageResponses[0].imageData
        if (imageAnalysisData?.analysisResult) {
          // Create a comprehensive image analysis section
          result.imageAnalysis = {
            findings: this.extractFindings(imageAnalysisData.analysisResult),
            analysis: imageAnalysisData.analysisResult,
            suggestedSpecialties: this.extractSpecialties(imageAnalysisData.analysisResult),
            urgencyLevel: this.determineUrgency(imageAnalysisData.analysisResult),
            confidence: 0.8 // Default confidence level
          }
        }
      }

      return result
    } catch (error) {
      console.error('Symptom analysis failed:', error)
      const isSpanish = language === 'es'
      throw new Error(isSpanish 
        ? 'No se pudieron analizar tus respuestas. Inténtalo de nuevo o consulta a un proveedor de atención médica.'
        : 'Unable to analyze your responses. Please try again or consult a healthcare provider.')
    }
  }

  private extractFindings(analysisText: string): string[] {
    // Extract key findings from the analysis text
    const findings = []
    
    // Look for common medical imaging findings patterns
    const patterns = [
      /findings?\s*:?\s*([^.]+)/gi,
      /observed?\s*:?\s*([^.]+)/gi,
      /shows?\s*:?\s*([^.]+)/gi,
      /indicates?\s*:?\s*([^.]+)/gi
    ]

    for (const pattern of patterns) {
      const matches = analysisText.match(pattern)
      if (matches) {
        findings.push(...matches.map(match => match.trim()))
      }
    }

    // If no specific patterns found, create generic findings
    if (findings.length === 0) {
      findings.push('Medical image uploaded successfully')
      findings.push('Professional interpretation recommended')
    }

    return findings.slice(0, 3) // Limit to top 3 findings
  }

  private extractSpecialties(analysisText: string): string[] {
    const specialties = []
    const text = analysisText.toLowerCase()

    // Map keywords to specialties
    const specialtyMap = {
      'cardiology': ['heart', 'cardiac', 'coronary', 'ecg', 'ekg'],
      'neurology': ['brain', 'neural', 'neurological', 'mri brain', 'ct brain'],
      'orthopedics': ['bone', 'fracture', 'joint', 'spine', 'orthopedic'],
      'radiology': ['scan', 'imaging', 'radiological', 'contrast'],
      'pulmonology': ['lung', 'pulmonary', 'chest', 'respiratory'],
      'oncology': ['tumor', 'mass', 'cancer', 'oncology', 'malignant']
    }

    for (const [specialty, keywords] of Object.entries(specialtyMap)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        specialties.push(specialty.charAt(0).toUpperCase() + specialty.slice(1))
      }
    }

    // Default specialty if none detected
    if (specialties.length === 0) {
      specialties.push('Radiology')
    }

    return specialties
  }

  private determineUrgency(analysisText: string): 'low' | 'medium' | 'high' | 'emergency' {
    const text = analysisText.toLowerCase()

    // Emergency keywords
    if (text.includes('emergency') || text.includes('immediate') || text.includes('urgent')) {
      return 'emergency'
    }

    // High urgency keywords
    if (text.includes('abnormal') || text.includes('concerning') || text.includes('significant')) {
      return 'high'
    }

    // Medium urgency keywords
    if (text.includes('follow-up') || text.includes('monitor') || text.includes('further evaluation')) {
      return 'medium'
    }

    return 'medium' // Default to medium urgency
  }
}

export const clientSymptomAnalyzer = new ClientSymptomAnalyzer()