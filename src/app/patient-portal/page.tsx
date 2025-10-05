import { Metadata } from 'next'
import { PatientDashboardPage } from '@/components/patient-portal/patient-dashboard-page'

export const metadata: Metadata = {
  title: 'Patient Portal | Your Health Dashboard',
  description: 'Access your health information, consultation history, and medical records securely',
}

export default function PatientPortalPage() {
  return <PatientDashboardPage />
}
