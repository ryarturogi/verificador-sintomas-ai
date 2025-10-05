'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/contexts/language-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, LogIn } from 'lucide-react'
import { motion } from 'framer-motion'

export function LoginForm() {
  const { t } = useLanguage()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSignIn = () => {
    router.push('/sign-in')
  }

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center">
                <LogIn className="w-6 h-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {t.auth.login.title}
            </CardTitle>
            <p className="text-gray-600 mt-2">
              {t.auth.login.subtitle}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                {t.auth.login.clerkRedirect}
              </p>
              
              <Button
                onClick={handleSignIn}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <LogIn className="w-5 h-5 mr-2" />
                {t.auth.login.signIn}
              </Button>
            </div>

            <div className="text-center">
              <p className="text-gray-600">
                {t.auth.login.noAccount}{' '}
                <Link 
                  href="/sign-up" 
                  className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
                >
                  {t.auth.login.signUp}
                </Link>
              </p>
            </div>

            <div className="text-center">
              <Link 
                href="/" 
                className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.auth.login.backToHome}
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}