import { Metadata } from 'next'
import { PatientMedicalHistoryPage } from '@/components/patient-portal/patient-medical-history-page'

export const metadata: Metadata = {
  title: 'Medical History | Patient Portal',
  description: 'Manage your medical history, medications, and health records',
}

export default function MedicalHistoryPage() {
  return <PatientMedicalHistoryPage />
}
