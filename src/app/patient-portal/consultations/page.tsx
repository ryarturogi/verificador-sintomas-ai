import { Metadata } from 'next'
import { PatientAnalysisPage } from '@/components/patient-portal/patient-consultations-page'

export const metadata: Metadata = {
  title: 'Consultations | Patient Portal',
  description: 'View your consultation history and manage appointments',
}

export default function ConsultationsPage() {
  return <PatientAnalysisPage />
}
