import { Metadata } from 'next'
import { PatientPortalLayout } from '@/components/patient-portal/patient-portal-layout'

export const metadata: Metadata = {
  title: 'Medical History | Patient Portal',
  description: 'Manage your medical history, medications, and health records',
}

export default function MedicalHistoryPage() {
  return <PatientPortalLayout />
}
