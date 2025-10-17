import { en, es } from './translations'

/**
 * Get translations for API routes
 * Since API routes don't have access to React context, we need to determine language from headers
 */
export function getApiTranslations(request: Request): typeof en {
  const acceptLanguage = request.headers.get('accept-language') || 'en'
  const language = acceptLanguage.startsWith('es') ? 'es' : 'en'
  
  return language === 'es' ? es : en
}

/**
 * Get emergency messages for API responses
 */
export function getEmergencyMessages(request: Request) {
  const t = getApiTranslations(request)
  return {
    message: t.emergencyMessages.emergencySymptoms,
    recommendations: [
      t.emergencyMessages.call911,
      t.emergencyMessages.goToNearestER,
      t.emergencyMessages.doNotDelay
    ],
    emergencyMessage: t.emergencyMessages.seekImmediateCare
  }
}
