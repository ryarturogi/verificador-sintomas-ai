'use client'

import Link from 'next/link'
import { useTranslations } from '@/contexts/language-context'

export default function NotFound() {
  const t = useTranslations()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="heading-xl text-gray-900 mb-4">{t.common.pageNotFound}</h2>
        <p className="text-gray-600 mb-6">{t.common.pageNotFoundDesc}</p>
        <Link 
          href="/" 
          className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
        >
          {t.common.goHome}
        </Link>
      </div>
    </div>
  )
}