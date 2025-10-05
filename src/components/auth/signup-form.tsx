'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/contexts/language-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, UserPlus, Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

interface SignupFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export function SignupForm() {
  const { t } = useLanguage()
  // const { signUp } = useAuth() // TODO: Fix Clerk signup integration
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleInputChange = (field: keyof SignupFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError(null)
  }

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      setError(t.auth.signup.errors.firstNameRequired)
      return false
    }
    if (!formData.lastName.trim()) {
      setError(t.auth.signup.errors.lastNameRequired)
      return false
    }
    if (!formData.email.trim()) {
      setError(t.auth.signup.errors.emailRequired)
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError(t.auth.signup.errors.emailInvalid)
      return false
    }
    if (!formData.phone.trim()) {
      setError(t.auth.signup.errors.phoneRequired)
      return false
    }
    if (!formData.password.trim()) {
      setError(t.auth.signup.errors.passwordRequired)
      return false
    }
    if (formData.password.length < 8) {
      setError(t.auth.signup.errors.passwordMinLength)
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError(t.auth.signup.errors.passwordsMatch)
      return false
    }
    if (!formData.agreeToTerms) {
      setError(t.auth.signup.errors.termsRequired)
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    setError(null)

    try {
      // const success = await signUp(formData) // TODO: Fix Clerk signup integration
      const success = false // Temporary placeholder
      
      if (success) {
        router.push('/patient-portal')
      } else {
        setError(t.auth.signup.errors.signupFailed)
      }
    } catch {
      setError(t.auth.signup.errors.signupFailed)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full flex items-center justify-center shadow-lg shadow-cyan-200/30">
                <UserPlus className="h-6 w-6 text-cyan-600" />
              </div>
            </div>
          <CardTitle className="heading-xl text-gray-900">
            {t.auth.signup.title}
          </CardTitle>
          <p className="text-gray-600">
            {t.auth.signup.subtitle}
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t.auth.signup.firstNameLabel}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 icon-sm" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder={t.auth.signup.firstNamePlaceholder}
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">{t.auth.signup.lastNameLabel}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 icon-sm" />
                  <Input
                    id="lastName"
                    type="text"
                    placeholder={t.auth.signup.lastNamePlaceholder}
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t.auth.signup.emailLabel}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 icon-sm" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t.auth.signup.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t.auth.signup.phoneLabel}</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 icon-sm" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t.auth.signup.phonePlaceholder}
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t.auth.signup.passwordLabel}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 icon-sm" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t.auth.signup.passwordPlaceholder}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10 pr-10"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="icon-sm" /> : <Eye className="icon-sm" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t.auth.signup.confirmPasswordLabel}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 icon-sm" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={t.auth.signup.confirmPasswordPlaceholder}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="pl-10 pr-10"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="icon-sm" /> : <Eye className="icon-sm" />}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                className="mt-1 rounded border-gray-300"
                disabled={isLoading}
                required
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                {t.auth.signup.agreeToTerms}
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t.common.loading}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <UserPlus className="icon-sm" />
                  <span>{t.auth.signup.signupButton}</span>
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t.auth.signup.haveAccount}{' '}
              <Link href="/auth/login" className="text-cyan-600 hover:text-cyan-700 font-medium">
                {t.auth.signup.loginLink}
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="icon-sm mr-1" />
              {t.auth.signup.backToHome}
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
