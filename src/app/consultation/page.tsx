import { Metadata } from 'next'
import { ConsultationPortal } from '@/components/consultation/consultation-portal'
import { ChatLayout } from '@/components/layout/chat-layout'
import { ConsultationPageClient } from './consultation-page-client'

export const metadata: Metadata = {
  title: 'AI-Powered Symptom Analysis | Análisis de Síntomas con IA',
  description: 'Get intelligent diagnostic analysis with AI specialists in different medical fields | Obtén análisis diagnóstico inteligente con especialistas de IA',
}

export default function ConsultationPage() {
  return (
    <ChatLayout>
      <ConsultationPageClient>
        <ConsultationPortal />
      </ConsultationPageClient>
    </ChatLayout>
  )
}
