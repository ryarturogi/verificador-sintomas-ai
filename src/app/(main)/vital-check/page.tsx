'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/language-context'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Stethoscope, 
  Brain,
  Shield,
  Zap,
  Target,
  CheckCircle,
  Users,
  Clock,
  Heart,
  Activity,
  Star,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

export default function VitalCheckPage() {
  const { t } = useLanguage()
  const aiFeatures = [
    {
      title: t.vitalCheck.features.intelligentAnalysis.title,
      description: t.vitalCheck.features.intelligentAnalysis.description,
      icon: Brain,
      features: t.vitalCheck.features.intelligentAnalysis.features,
      color: "from-cyan-500 to-cyan-600"
    },
    {
      title: t.vitalCheck.features.dynamicQuestionnaires.title,
      description: t.vitalCheck.features.dynamicQuestionnaires.description,
      icon: Target,
      features: t.vitalCheck.features.dynamicQuestionnaires.features,
      color: "from-cyan-500 to-cyan-600"
    },
    {
      title: t.vitalCheck.features.riskAssessment.title,
      description: t.vitalCheck.features.riskAssessment.description,
      icon: Shield,
      features: t.vitalCheck.features.riskAssessment.features,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: t.vitalCheck.features.emergencyDetection.title,
      description: t.vitalCheck.features.emergencyDetection.description,
      icon: Zap,
      features: t.vitalCheck.features.emergencyDetection.features,
      color: "from-red-500 to-orange-500"
    }
  ]

  const aiCapabilities = [
    {
      icon: Brain,
      title: t.vitalCheck.capabilities.machineLearning.title,
      description: t.vitalCheck.capabilities.machineLearning.description
    },
    {
      icon: Shield,
      title: t.vitalCheck.capabilities.hipaaCompliant.title,
      description: t.vitalCheck.capabilities.hipaaCompliant.description
    },
    {
      icon: Users,
      title: t.vitalCheck.capabilities.expertValidated.title,
      description: t.vitalCheck.capabilities.expertValidated.description
    },
    {
      icon: Clock,
      title: t.vitalCheck.capabilities.realTimeProcessing.title,
      description: t.vitalCheck.capabilities.realTimeProcessing.description
    },
    {
      icon: Heart,
      title: t.vitalCheck.capabilities.personalizedCare.title,
      description: t.vitalCheck.capabilities.personalizedCare.description
    },
    {
      icon: Activity,
      title: t.vitalCheck.capabilities.continuousMonitoring.title,
      description: t.vitalCheck.capabilities.continuousMonitoring.description
    }
  ]

  const statistics = [
    { number: "98.5%", label: t.vitalCheck.statistics.accuracyRate, icon: CheckCircle },
    { number: "500K+", label: t.vitalCheck.statistics.assessmentsCompleted, icon: Users },
    { number: "24/7", label: t.vitalCheck.statistics.availability, icon: Clock },
    { number: "50+", label: t.vitalCheck.statistics.medicalSpecialties, icon: Stethoscope }
  ]

  const testimonials = [
    {
      name: t.vitalCheck.testimonials.drMitchell.name,
      role: t.vitalCheck.testimonials.drMitchell.role,
      quote: t.vitalCheck.testimonials.drMitchell.quote,
      rating: 5
    },
    {
      name: t.vitalCheck.testimonials.drChen.name,
      role: t.vitalCheck.testimonials.drChen.role,
      quote: t.vitalCheck.testimonials.drChen.quote,
      rating: 5
    },
    {
      name: t.vitalCheck.testimonials.drRodriguez.name,
      role: t.vitalCheck.testimonials.drRodriguez.role,
      quote: t.vitalCheck.testimonials.drRodriguez.quote,
      rating: 5
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
            {t.vitalCheck.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.vitalCheck.subtitle}
          </p>
        </motion.div>

        {/* AI Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t.vitalCheck.aiPoweredFeatures}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiFeatures.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="heading-xl text-gray-900 mb-4 text-center">{feature.title}</h3>
                  <p className="text-gray-600 mb-6 text-center">{feature.description}</p>
                  
                  <div className="space-y-3">
                    {feature.features.map((item, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-center mb-12">{t.vitalCheck.performanceMetrics}</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {statistics.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-8 w-8" />
                    </div>
                    <div className="text-4xl font-bold mb-2">{stat.number}</div>
                    <div className="text-cyan-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t.vitalCheck.advancedCapabilities}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiCapabilities.map((capability, index) => (
              <Card key={index} className="text-center h-full group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-200 transition-colors duration-300">
                    <capability.icon className="h-8 w-8 text-cyan-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{capability.title}</h3>
                  <p className="text-gray-600">{capability.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* How AI Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t.vitalCheck.howItWorks}</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="heading-xl text-white">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t.vitalCheck.steps.dataInput.title}</h3>
                  <p className="text-gray-600">{t.vitalCheck.steps.dataInput.description}</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="heading-xl text-white">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t.vitalCheck.steps.aiAnalysis.title}</h3>
                  <p className="text-gray-600">{t.vitalCheck.steps.aiAnalysis.description}</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="heading-xl text-white">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t.vitalCheck.steps.riskAssessment.title}</h3>
                  <p className="text-gray-600">{t.vitalCheck.steps.riskAssessment.description}</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="heading-xl text-white">4</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t.vitalCheck.steps.recommendations.title}</h3>
                  <p className="text-gray-600">{t.vitalCheck.steps.recommendations.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Expert Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t.vitalCheck.trustedByProfessionals}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center h-full">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                  <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-cyan-600 font-semibold">{testimonial.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-center mb-12">{t.vitalCheck.technologyStack}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { name: t.vitalCheck.technologies.nlp.name, description: t.vitalCheck.technologies.nlp.description },
                  { name: t.vitalCheck.technologies.ml.name, description: t.vitalCheck.technologies.ml.description },
                  { name: t.vitalCheck.technologies.databases.name, description: t.vitalCheck.technologies.databases.description },
                  { name: t.vitalCheck.technologies.realTime.name, description: t.vitalCheck.technologies.realTime.description }
                ].map((tech, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{tech.name}</h3>
                    <p className="text-slate-300 text-sm">{tech.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-4">{t.vitalCheck.experienceAI}</h2>
              <p className="text-xl mb-8 opacity-90">
                {t.vitalCheck.experienceAIDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/symptom-checker">{t.vitalCheck.tryAIAssessment}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-cyan-600">
                  <Link href="/questionnaires">{t.vitalCheck.viewQuestionnaires}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
