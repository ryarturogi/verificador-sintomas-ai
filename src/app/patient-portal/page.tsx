import { Metadata } from 'next'
import { PatientPortalLayout } from '@/components/patient-portal/patient-portal-layout'

export const metadata: Metadata = {
  title: 'Patient Portal | Your Health Dashboard',
  description: 'Access your health information, consultation history, and medical records securely',
}

export default function PatientPortalPage() {
  return <PatientPortalLayout />
}
