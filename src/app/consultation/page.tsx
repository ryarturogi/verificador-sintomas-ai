import { Metadata } from 'next'
import { ConsultationPortal } from '@/components/consultation/consultation-portal'
import { ChatLayout } from '@/components/layout/chat-layout'
import { ConsultationPageClient } from './consultation-page-client'

export const metadata: Metadata = {
  title: 'Free Doctor Consultation | Consulta Gratuita con Doctor',
  description: 'Get free consultation with doctors specializing in different medical fields | Obtén consulta gratuita con doctores especializados',
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
