import { Metadata } from 'next'
import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: 'Login | VitalCheck Patient Portal',
  description: 'Sign in to your VitalCheck patient portal account',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <LoginForm />
      </div>
    </div>
  )
}
