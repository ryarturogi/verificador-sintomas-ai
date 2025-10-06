import { Metadata } from 'next'
import { ConsultationPortal } from '@/components/consultation/consultation-portal'
import { PageLayout } from '@/components/layout/global-layout'

export const metadata: Metadata = {
  title: 'Free Doctor Consultation | Consulta Gratuita con Doctor',
  description: 'Get free consultation with doctors specializing in different medical fields | Obtén consulta gratuita con doctores especializados',
}

export default function ConsultationPage() {
  return (
    <PageLayout>
      <ConsultationPortal />
    </PageLayout>
  )
}
