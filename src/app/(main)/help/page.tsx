'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/language-context'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Search,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  Users,
  Shield,
  Brain,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  BookOpen,
  Video,
  Download
} from 'lucide-react'
import Link from 'next/link'

export default function HelpPage() {
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
    { id: 'all', name: t.help.categories.allTopics, icon: HelpCircle },
    { id: 'getting-started', name: t.help.categories.gettingStarted, icon: BookOpen },
    { id: 'features', name: t.help.categories.features, icon: Brain },
    { id: 'technical', name: t.help.categories.technical, icon: Shield },
    { id: 'account', name: t.help.categories.account, icon: Users }
  ]

  const helpTopics = [
    {
      category: 'getting-started',
      question: t.help.topics.startAssessment.question,
      answer: t.help.topics.startAssessment.answer
    },
    {
      category: 'getting-started',
      question: t.help.topics.informationNeeded.question,
      answer: t.help.topics.informationNeeded.answer
    },
    {
      category: 'features',
      question: t.help.topics.aiAnalysis.question,
      answer: t.help.topics.aiAnalysis.answer
    },
    {
      category: 'features',
      question: t.help.topics.saveResults.question,
      answer: t.help.topics.saveResults.answer
    },
    {
      category: 'technical',
      question: t.help.topics.devicesSupported.question,
      answer: t.help.topics.devicesSupported.answer
    },
    {
      category: 'technical',
      question: t.help.topics.technicalIssues.question,
      answer: t.help.topics.technicalIssues.answer
    },
    {
      category: 'account',
      question: t.help.topics.createAccount.question,
      answer: t.help.topics.createAccount.answer
    },
    {
      category: 'account',
      question: t.help.topics.resetPassword.question,
      answer: t.help.topics.resetPassword.answer
    },
    {
      category: 'features',
      question: t.help.topics.security.question,
      answer: t.help.topics.security.answer
    },
    {
      category: 'getting-started',
      question: t.help.topics.emergency.question,
      answer: t.help.topics.emergency.answer
    }
  ]

  const supportOptions = [
    {
      title: t.help.supportOptions.liveChat.title,
      description: t.help.supportOptions.liveChat.description,
      icon: MessageCircle,
      availability: t.help.supportOptions.liveChat.availability,
      action: t.help.supportOptions.liveChat.action
    },
    {
      title: t.help.supportOptions.email.title,
      description: t.help.supportOptions.email.description,
      icon: Mail,
      availability: t.help.supportOptions.email.availability,
      action: t.help.supportOptions.email.action
    },
    {
      title: t.help.supportOptions.phone.title,
      description: t.help.supportOptions.phone.description,
      icon: Phone,
      availability: t.help.supportOptions.phone.availability,
      action: t.help.supportOptions.phone.action
    },
    {
      title: t.help.supportOptions.helpCenter.title,
      description: t.help.supportOptions.helpCenter.description,
      icon: BookOpen,
      availability: t.help.supportOptions.helpCenter.availability,
      action: t.help.supportOptions.helpCenter.action
    }
  ]

  const resources = [
    {
      title: t.help.resources.userGuide.title,
      description: t.help.resources.userGuide.description,
      icon: BookOpen,
      type: t.help.resources.userGuide.type
    },
    {
      title: t.help.resources.videoTutorials.title,
      description: t.help.resources.videoTutorials.description,
      icon: Video,
      type: t.help.resources.videoTutorials.type
    },
    {
      title: t.help.resources.mobileApp.title,
      description: t.help.resources.mobileApp.description,
      icon: Download,
      type: t.help.resources.mobileApp.type
    },
    {
      title: t.help.resources.communityForum.title,
      description: t.help.resources.communityForum.description,
      icon: Users,
      type: t.help.resources.communityForum.type
    }
  ]

  const filteredTopics = helpTopics.filter(topic => {
    const matchesCategory = activeCategory === 'all' || topic.category === activeCategory
    const matchesSearch = topic.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.answer.toLowerCase().includes(searchTerm.toLowerCase())
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
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.help.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.help.subtitle}
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
              placeholder={t.help.searchPlaceholder}
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
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">{t.help.faqTitle}</h2>
          <div className="space-y-4">
            {filteredTopics.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.help.noResults}</h3>
                  <p className="text-gray-600">{t.help.noResultsDescription}</p>
                </CardContent>
              </Card>
            ) : (
              filteredTopics.map((topic, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">{topic.question}</h3>
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
                            <p className="text-gray-600 leading-relaxed">{topic.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </motion.div>

        {/* Support Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t.help.getSupport}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-200 transition-colors duration-300">
                    <option.icon className="h-8 w-8 text-cyan-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-3">{option.description}</p>
                  <p className="text-sm text-cyan-600 font-semibold mb-4">{option.availability}</p>
                  <Button className="w-full group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                    {option.action}
                    <ArrowRight className="ml-2 icon-sm group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t.help.additionalResources}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <resource.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-3">{resource.description}</p>
                  <div className="text-sm text-cyan-600 font-semibold mb-4">{resource.type}</div>
                  <Button variant="outline" className="w-full group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-600 transition-colors duration-300">
                    {t.help.accessResource}
                    <ArrowRight className="ml-2 icon-sm group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-4">{t.help.stillNeedHelp}</h2>
              <p className="text-xl mb-8 opacity-90">
                {t.help.stillNeedHelpDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/contact">{t.help.contactSupport}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-white bg-transparent border-white hover:bg-white hover:text-cyan-600">
                  <Link href="/">{t.help.startAssessment}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
