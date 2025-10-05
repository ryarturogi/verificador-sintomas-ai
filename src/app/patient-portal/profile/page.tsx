import { Metadata } from 'next'
import { PatientProfilePage } from '@/components/patient-portal/patient-profile-page'

export const metadata: Metadata = {
  title: 'Profile | Patient Portal',
  description: 'Manage your personal information and account settings',
}

export default function ProfilePage() {
  return <PatientProfilePage />
}
