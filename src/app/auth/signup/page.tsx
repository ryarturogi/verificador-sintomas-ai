import { Metadata } from 'next'
import { SignupForm } from '@/components/auth/signup-form'

export const metadata: Metadata = {
  title: 'Sign Up | VitalCheck Patient Portal',
  description: 'Create your VitalCheck patient portal account',
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <SignupForm />
      </div>
    </div>
  )
}
