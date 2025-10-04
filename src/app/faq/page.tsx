'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Stethoscope, 
  ChevronDown,
  ChevronUp,
  Search,
  Shield,
  Clock,
  Users,
  Heart,
  HelpCircle
} from 'lucide-react'
import Link from 'next/link'

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [openQuestions, setOpenQuestions] = useState<number[]>([])

  const toggleQuestion = (index: number) => {
    setOpenQuestions(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'general', name: 'General', icon: Users },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield },
    { id: 'technical', name: 'Technical', icon: Clock },
    { id: 'medical', name: 'Medical', icon: Heart }
  ]

  const faqs = [
    {
      category: 'general',
      question: 'What is MedicalAI and how does it work?',
      answer: 'MedicalAI is an advanced AI-powered platform that helps users assess their symptoms and provides intelligent health guidance. Our system uses sophisticated machine learning algorithms trained on comprehensive medical databases to analyze symptoms and provide personalized recommendations. The platform asks targeted questions based on your responses and generates evidence-based health insights.'
    },
    {
      category: 'general',
      question: 'Is MedicalAI free to use?',
      answer: 'Yes, MedicalAI offers a free tier that includes basic symptom assessment and health guidance. We also offer premium features for more detailed analysis and personalized health tracking. Our goal is to make quality healthcare guidance accessible to everyone.'
    },
    {
      category: 'medical',
      question: 'Can MedicalAI replace my doctor?',
      answer: 'No, MedicalAI is not a replacement for professional medical care. We are a supplementary tool designed to provide health guidance and help you make informed decisions about when to seek medical attention. Always consult with qualified healthcare professionals for medical diagnosis, treatment, and ongoing care.'
    },
    {
      category: 'medical',
      question: 'How accurate are the assessments?',
      answer: 'Our AI system is trained on extensive medical databases and validated against clinical guidelines. However, accuracy can vary based on the information provided and individual circumstances. Our assessments are designed to guide you toward appropriate next steps rather than provide definitive diagnoses. Always seek professional medical opinion for serious health concerns.'
    },
    {
      category: 'privacy',
      question: 'How is my health information protected?',
      answer: 'We take your privacy seriously and employ enterprise-grade security measures including end-to-end encryption, secure data storage, and strict access controls. Your health information is never shared with third parties without your explicit consent. We comply with HIPAA regulations and international privacy standards.'
    },
    {
      category: 'privacy',
      question: 'Do you store my personal health data?',
      answer: 'We only store essential information needed to provide you with personalized health guidance. You have full control over your data and can request deletion at any time. All data is anonymized for research purposes and never used for commercial purposes without consent.'
    },
    {
      category: 'technical',
      question: 'What devices and browsers are supported?',
      answer: 'MedicalAI works on all modern web browsers including Chrome, Firefox, Safari, and Edge. Our platform is optimized for desktop, tablet, and mobile devices. We also offer native mobile apps for iOS and Android for the best user experience.'
    },
    {
      category: 'technical',
      question: 'What should I do if I encounter technical issues?',
      answer: 'If you experience technical difficulties, try refreshing your browser or clearing your cache first. For persistent issues, contact our technical support team at support@medicalai.com or use the chat support feature available 24/7.'
    },
    {
      category: 'medical',
      question: 'When should I seek immediate medical attention?',
      answer: 'Seek immediate medical attention for severe symptoms like chest pain, difficulty breathing, severe bleeding, loss of consciousness, or any symptoms that seem life-threatening. Our system will alert you to emergency situations, but trust your instincts - when in doubt, call 911 or go to the nearest emergency room.'
    },
    {
      category: 'general',
      question: 'Can I use MedicalAI for my children?',
      answer: 'MedicalAI can provide guidance for pediatric symptoms, but we strongly recommend consulting with a pediatrician for all child health concerns. Children require specialized medical attention, and our adult-focused algorithms may not capture all pediatric considerations.'
    },
    {
      category: 'technical',
      question: 'Is there a mobile app available?',
      answer: 'Yes, we offer native mobile apps for both iOS and Android devices. You can download them from the App Store or Google Play Store. The mobile apps offer all the features of our web platform with optimized touch interfaces and offline capabilities for basic assessments.'
    },
    {
      category: 'privacy',
      question: 'Can I delete my account and data?',
      answer: 'Absolutely. You can delete your account and all associated data at any time through your account settings or by contacting our support team. Once deleted, your personal information is permanently removed from our systems within 30 days.'
    }
  ]

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MedicalAI</span>
            </Link>
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about MedicalAI, our services, and how we can help with your healthcare needs.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-4"
        >
          {filteredFAQs.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
              </CardContent>
            </Card>
          ) : (
            filteredFAQs.map((faq, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    {openQuestions.includes(index) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openQuestions.includes(index) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            ))
          )}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
              <p className="text-xl mb-8 opacity-90">
                Our support team is here to help you with any additional questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="secondary" size="lg">
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600">
                  <Link href="/">Start Assessment</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}