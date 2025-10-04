'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/language-context'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Stethoscope, 
  ClipboardList,
  Brain,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Users,
  Target,
  Zap
} from 'lucide-react'
import Link from 'next/link'

export default function QuestionnairesPage() {
  const { t } = useLanguage()
  const questionnaireTypes = [
    {
      title: t.questionnaires.types.generalHealth.title,
      description: t.questionnaires.types.generalHealth.description,
      icon: ClipboardList,
      features: t.questionnaires.types.generalHealth.features,
      duration: t.questionnaires.types.generalHealth.duration,
      color: "from-cyan-500 to-cyan-600"
    },
    {
      title: t.questionnaires.types.symptomAnalysis.title,
      description: t.questionnaires.types.symptomAnalysis.description,
      icon: Brain,
      features: t.questionnaires.types.symptomAnalysis.features,
      duration: t.questionnaires.types.symptomAnalysis.duration,
      color: "from-cyan-500 to-cyan-600"
    },
    {
      title: t.questionnaires.types.mentalHealth.title,
      description: t.questionnaires.types.mentalHealth.description,
      icon: Shield,
      features: t.questionnaires.types.mentalHealth.features,
      duration: t.questionnaires.types.mentalHealth.duration,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: t.questionnaires.types.chronicCondition.title,
      description: t.questionnaires.types.chronicCondition.description,
      icon: Target,
      features: t.questionnaires.types.chronicCondition.features,
      duration: t.questionnaires.types.chronicCondition.duration,
      color: "from-orange-500 to-red-500"
    },
    {
      title: t.questionnaires.types.emergencyAssessment.title,
      description: t.questionnaires.types.emergencyAssessment.description,
      icon: Zap,
      features: t.questionnaires.types.emergencyAssessment.features,
      duration: t.questionnaires.types.emergencyAssessment.duration,
      color: "from-red-500 to-pink-500"
    },
    {
      title: t.questionnaires.types.preventiveCare.title,
      description: t.questionnaires.types.preventiveCare.description,
      icon: CheckCircle,
      features: t.questionnaires.types.preventiveCare.features,
      duration: t.questionnaires.types.preventiveCare.duration,
      color: "from-teal-500 to-cyan-500"
    }
  ]

  const benefits = [
    {
      icon: Brain,
      title: t.questionnaires.benefits.aiPowered.title,
      description: t.questionnaires.benefits.aiPowered.description
    },
    {
      icon: Shield,
      title: t.questionnaires.benefits.privacyProtected.title,
      description: t.questionnaires.benefits.privacyProtected.description
    },
    {
      icon: Clock,
      title: t.questionnaires.benefits.availability.title,
      description: t.questionnaires.benefits.availability.description
    },
    {
      icon: Users,
      title: t.questionnaires.benefits.expertValidated.title,
      description: t.questionnaires.benefits.expertValidated.description
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-cyan-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-xl">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">VitalCheck</span>
            </Link>
            <Button asChild variant="outline">
              <Link href="/">{t.common.backToHome}</Link>
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
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.questionnaires.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.questionnaires.subtitle}
          </p>
        </motion.div>

        {/* Questionnaire Types */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t.questionnaires.availableAssessments}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {questionnaireTypes.map((questionnaire, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${questionnaire.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <questionnaire.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{questionnaire.title}</h3>
                  <p className="text-gray-600 mb-4 text-center">{questionnaire.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {questionnaire.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{questionnaire.duration}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                    {t.questionnaires.startAssessment}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t.questionnaires.whyChoose}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center h-full">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-cyan-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t.questionnaires.howItWorks}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t.questionnaires.steps.chooseAssessment.title}</h3>
                  <p className="text-gray-600">{t.questionnaires.steps.chooseAssessment.description}</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t.questionnaires.steps.answerQuestions.title}</h3>
                  <p className="text-gray-600">{t.questionnaires.steps.answerQuestions.description}</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t.questionnaires.steps.getInsights.title}</h3>
                  <p className="text-gray-600">{t.questionnaires.steps.getInsights.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-4">{t.questionnaires.readyToStart}</h2>
              <p className="text-xl mb-8 opacity-90">
                {t.questionnaires.readyToStartDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/symptom-checker">{t.questionnaires.startGeneralAssessment}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-cyan-600">
                  <Link href="/">{t.questionnaires.learnMore}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
