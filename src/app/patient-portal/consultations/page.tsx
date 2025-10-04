import { Metadata } from 'next'
import { PatientPortalLayout } from '@/components/patient-portal/patient-portal-layout'

export const metadata: Metadata = {
  title: 'Consultations | Patient Portal',
  description: 'View your consultation history and manage appointments',
}

export default function ConsultationsPage() {
  return <PatientPortalLayout />
}
