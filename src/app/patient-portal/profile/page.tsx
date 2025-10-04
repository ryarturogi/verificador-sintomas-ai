import { Metadata } from 'next'
import { PatientPortalLayout } from '@/components/patient-portal/patient-portal-layout'

export const metadata: Metadata = {
  title: 'Profile | Patient Portal',
  description: 'Manage your personal information and account settings',
}

export default function ProfilePage() {
  return <PatientPortalLayout />
}
