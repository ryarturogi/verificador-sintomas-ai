'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/language-context'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
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
  const router = useRouter()
  const questionnaireTypes = [
    {
      title: t.questionnaire.types.generalHealth.title,
      description: t.questionnaire.types.generalHealth.description,
      icon: ClipboardList,
      features: t.questionnaire.types.generalHealth.features,
      duration: t.questionnaire.types.generalHealth.duration,
      color: "from-cyan-500 to-cyan-600"
    },
    {
      title: t.questionnaire.types.symptomAnalysis.title,
      description: t.questionnaire.types.symptomAnalysis.description,
      icon: Brain,
      features: t.questionnaire.types.symptomAnalysis.features,
      duration: t.questionnaire.types.symptomAnalysis.duration,
      color: "from-cyan-500 to-cyan-600"
    },
    {
      title: t.questionnaire.types.mentalHealth.title,
      description: t.questionnaire.types.mentalHealth.description,
      icon: Shield,
      features: t.questionnaire.types.mentalHealth.features,
      duration: t.questionnaire.types.mentalHealth.duration,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: t.questionnaire.types.chronicCondition.title,
      description: t.questionnaire.types.chronicCondition.description,
      icon: Target,
      features: t.questionnaire.types.chronicCondition.features,
      duration: t.questionnaire.types.chronicCondition.duration,
      color: "from-orange-500 to-red-500"
    },
    {
      title: t.questionnaire.types.emergencyAssessment.title,
      description: t.questionnaire.types.emergencyAssessment.description,
      icon: Zap,
      features: t.questionnaire.types.emergencyAssessment.features,
      duration: t.questionnaire.types.emergencyAssessment.duration,
      color: "from-red-500 to-pink-500"
    },
    {
      title: t.questionnaire.types.preventiveCare.title,
      description: t.questionnaire.types.preventiveCare.description,
      icon: CheckCircle,
      features: t.questionnaire.types.preventiveCare.features,
      duration: t.questionnaire.types.preventiveCare.duration,
      color: "from-teal-500 to-cyan-500"
    }
  ]

  const handleStartAssessment = (questionnaireType: string) => {
    // Map questionnaire types to appropriate routes or parameters
    const typeMapping: Record<string, string> = {
      'generalHealth': 'general',
      'symptomAnalysis': 'symptoms', 
      'mentalHealth': 'mental',
      'chronicCondition': 'chronic',
      'emergencyAssessment': 'emergency',
      'preventiveCare': 'preventive'
    }
    
    const topic = typeMapping[questionnaireType] || 'general'
    router.push(`/symptom-checker?topic=${topic}`)
  }

  const benefits = [
    {
      icon: Brain,
      title: t.questionnaire.benefits.aiPowered.title,
      description: t.questionnaire.benefits.aiPowered.description
    },
    {
      icon: Shield,
      title: t.questionnaire.benefits.privacyProtected.title,
      description: t.questionnaire.benefits.privacyProtected.description
    },
    {
      icon: Clock,
      title: t.questionnaire.benefits.availability.title,
      description: t.questionnaire.benefits.availability.description
    },
    {
      icon: Users,
      title: t.questionnaire.benefits.expertValidated.title,
      description: t.questionnaire.benefits.expertValidated.description
    }
  ]

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
            {t.questionnaire.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.questionnaire.subtitle}
          </p>
        </motion.div>

        {/* Questionnaire Types */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t.questionnaire.availableAssessments}</h2>
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
                        <CheckCircle className="icon-sm text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="icon-sm" />
                      <span>{questionnaire.duration}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleStartAssessment(questionnaire.title.toLowerCase().replace(/\s+/g, ''))}
                    className="w-full group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300"
                  >
                    {t.questionnaire.startAssessment}
                    <ArrowRight className="ml-2 icon-sm group-hover:translate-x-1 transition-transform duration-300" />
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
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t.questionnaire.whyChoose}</h2>
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
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t.questionnaire.howItWorks}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="heading-xl text-white">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t.questionnaire.steps.chooseAssessment.title}</h3>
                  <p className="text-gray-600">{t.questionnaire.steps.chooseAssessment.description}</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="heading-xl text-white">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t.questionnaire.steps.answerQuestions.title}</h3>
                  <p className="text-gray-600">{t.questionnaire.steps.answerQuestions.description}</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="heading-xl text-white">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t.questionnaire.steps.getInsights.title}</h3>
                  <p className="text-gray-600">{t.questionnaire.steps.getInsights.description}</p>
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
              <h2 className="text-3xl font-bold mb-4">{t.questionnaire.readyToStart}</h2>
              <p className="text-xl mb-8 opacity-90">
                {t.questionnaire.readyToStartDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/symptom-checker">{t.questionnaire.startGeneralAssessment}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-white border-white bg-transparent hover:bg-white hover:text-cyan-600">
                  <Link href="/">{t.questionnaire.learnMore}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
