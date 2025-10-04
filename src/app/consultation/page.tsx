import { Metadata } from 'next'
import { ConsultationPortal } from '@/components/consultation/consultation-portal'

export const metadata: Metadata = {
  title: 'Free AI Doctor Consultation | Consulta Gratuita con IA',
  description: 'Get free consultation with AI doctors specializing in different medical fields | Obtén consulta gratuita con doctores IA especializados',
}

export default function ConsultationPage() {
  return <ConsultationPortal />
}
