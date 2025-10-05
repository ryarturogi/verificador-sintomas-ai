'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/language-context'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
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
  const { t } = useLanguage()
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
    { id: 'all', name: t.faq.categories.allQuestions, icon: HelpCircle },
    { id: 'general', name: t.faq.categories.general, icon: Users },
    { id: 'privacy', name: t.faq.categories.privacy, icon: Shield },
    { id: 'technical', name: t.faq.categories.technical, icon: Clock },
    { id: 'medical', name: t.faq.categories.medical, icon: Heart }
  ]

  const faqs = [
    {
      category: 'general',
      question: t.faq.questions.whatIsVitalCheck.question,
      answer: t.faq.questions.whatIsVitalCheck.answer
    },
    {
      category: 'general',
      question: t.faq.questions.isVitalCheckFree.question,
      answer: t.faq.questions.isVitalCheckFree.answer
    },
    {
      category: 'medical',
      question: t.faq.questions.canReplaceDoctor.question,
      answer: t.faq.questions.canReplaceDoctor.answer
    },
    {
      category: 'medical',
      question: t.faq.questions.howAccurate.question,
      answer: t.faq.questions.howAccurate.answer
    },
    {
      category: 'privacy',
      question: t.faq.questions.howProtected.question,
      answer: t.faq.questions.howProtected.answer
    },
    {
      category: 'privacy',
      question: t.faq.questions.doYouStore.question,
      answer: t.faq.questions.doYouStore.answer
    },
    {
      category: 'technical',
      question: t.faq.questions.devicesSupported.question,
      answer: t.faq.questions.devicesSupported.answer
    },
    {
      category: 'technical',
      question: t.faq.questions.technicalIssues.question,
      answer: t.faq.questions.technicalIssues.answer
    },
    {
      category: 'medical',
      question: t.faq.questions.whenSeekAttention.question,
      answer: t.faq.questions.whenSeekAttention.answer
    },
    {
      category: 'general',
      question: t.faq.questions.forChildren.question,
      answer: t.faq.questions.forChildren.answer
    },
    {
      category: 'technical',
      question: t.faq.questions.mobileApp.question,
      answer: t.faq.questions.mobileApp.answer
    },
    {
      category: 'privacy',
      question: t.faq.questions.deleteAccount.question,
      answer: t.faq.questions.deleteAccount.answer
    }
  ]

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="bg-gradient-to-br from-slate-50 via-cyan-50 to-cyan-100">

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.faq.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.faq.subtitle}
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
              placeholder={t.faq.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-lg"
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
                <category.icon className="icon-sm" />
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.faq.noResults}</h3>
                <p className="text-gray-600">{t.faq.noResultsDescription}</p>
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
          <Card className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
              <p className="text-xl mb-8 opacity-90">
                Our support team is here to help you with any additional questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="secondary" size="lg">
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-cyan-600">
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