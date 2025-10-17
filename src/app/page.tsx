import { ModernHomepage } from '@/components/homepage/modern-homepage'
import { PageLayout } from '@/components/layout/global-layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VitalCheck - AI-Powered Symptom Checker | Intelligent Health Analysis',
  description: 'Advanced AI-powered symptom checker that analyzes your symptoms and provides intelligent diagnostic insights. Get instant health evaluation with our specialized AI medical analysis.',
  keywords: 'symptom checker, AI health analysis, medical diagnosis, health assessment, symptom analysis, AI doctor, health evaluation',
  openGraph: {
    title: 'VitalCheck - AI-Powered Symptom Checker',
    description: 'Advanced AI-powered symptom checker that analyzes your symptoms and provides intelligent diagnostic insights.',
    type: 'website',
  },
}

export default function Home() {
  return (
    <PageLayout>
      <ModernHomepage />
    </PageLayout>
  )
}
