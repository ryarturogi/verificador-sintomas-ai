'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Search,
  Heart,
  Brain,
  Activity,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Users
} from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/language-context'

export default function SymptomsPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: t.symptoms.categories.all, icon: Search },
    { id: 'cardiovascular', name: t.symptoms.categories.cardiovascular, icon: Heart },
    { id: 'neurological', name: t.symptoms.categories.neurological, icon: Brain },
    { id: 'respiratory', name: t.symptoms.categories.respiratory, icon: Activity },
    { id: 'emergency', name: t.symptoms.categories.emergency, icon: AlertTriangle }
  ]

  const symptoms = [
    {
      name: t.symptoms.symptomDetails.chestPain,
      category: "cardiovascular",
      severity: "high",
      description: t.symptoms.symptomDetails.chestPainDesc,
      urgency: t.symptoms.symptomDetails.chestPainUrgency
    },
    {
      name: t.symptoms.symptomDetails.shortnessBreath,
      category: "respiratory",
      severity: "high",
      description: t.symptoms.symptomDetails.shortnessBreathDesc,
      urgency: t.symptoms.symptomDetails.shortnessBreathUrgency
    },
    {
      name: t.symptoms.symptomDetails.headache,
      category: "neurological",
      severity: "medium",
      description: t.symptoms.symptomDetails.headacheDesc,
      urgency: t.symptoms.symptomDetails.headacheUrgency
    },
    {
      name: t.symptoms.symptomDetails.fever,
      category: "all",
      severity: "medium",
      description: t.symptoms.symptomDetails.feverDesc,
      urgency: t.symptoms.symptomDetails.feverUrgency
    },
    {
      name: t.symptoms.symptomDetails.nausea,
      category: "all",
      severity: "low",
      description: t.symptoms.symptomDetails.nauseaDesc,
      urgency: t.symptoms.symptomDetails.nauseaUrgency
    },
    {
      name: t.symptoms.symptomDetails.dizziness,
      category: "neurological",
      severity: "medium",
      description: t.symptoms.symptomDetails.dizzinessDesc,
      urgency: t.symptoms.symptomDetails.dizzinessUrgency
    },
    {
      name: t.symptoms.symptomDetails.fatigue,
      category: "all",
      severity: "low",
      description: t.symptoms.symptomDetails.fatigueDesc,
      urgency: t.symptoms.symptomDetails.fatigueUrgency
    },
    {
      name: t.symptoms.symptomDetails.abdominalPain,
      category: "all",
      severity: "medium",
      description: t.symptoms.symptomDetails.abdominalPainDesc,
      urgency: t.symptoms.symptomDetails.abdominalPainUrgency
    },
    {
      name: t.symptoms.symptomDetails.jointPain,
      category: "all",
      severity: "low",
      description: t.symptoms.symptomDetails.jointPainDesc,
      urgency: t.symptoms.symptomDetails.jointPainUrgency
    },
    {
      name: t.symptoms.symptomDetails.cough,
      category: "respiratory",
      severity: "low",
      description: t.symptoms.symptomDetails.coughDesc,
      urgency: t.symptoms.symptomDetails.coughUrgency
    },
    {
      name: t.symptoms.symptomDetails.rash,
      category: "all",
      severity: "low",
      description: t.symptoms.symptomDetails.rashDesc,
      urgency: t.symptoms.symptomDetails.rashUrgency
    },
    {
      name: t.symptoms.symptomDetails.backPain,
      category: "all",
      severity: "medium",
      description: t.symptoms.symptomDetails.backPainDesc,
      urgency: t.symptoms.symptomDetails.backPainUrgency
    }
  ]

  const emergencySymptoms = [
    t.symptoms.emergencySymptoms.severeChestPain,
    t.symptoms.emergencySymptoms.difficultyBreathing,
    t.symptoms.emergencySymptoms.lossConsciousness,
    t.symptoms.emergencySymptoms.severeBleeding,
    t.symptoms.emergencySymptoms.strokeSigns,
    t.symptoms.emergencySymptoms.severeAllergic
  ]

  const filteredSymptoms = symptoms.filter(symptom => {
    const matchesCategory = selectedCategory === 'all' || symptom.category === selectedCategory
    const matchesSearch = symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         symptom.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return AlertTriangle
      case 'medium': return Clock
      case 'low': return CheckCircle
      default: return CheckCircle
    }
  }

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
            {t.symptoms.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.symptoms.subtitle}
          </p>
        </motion.div>

        {/* Emergency Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold">{t.emergency.alert}</h3>
                  <p className="text-sm opacity-90">
                    {t.emergency.message}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t.symptoms.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <category.icon className="icon-sm" />
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Symptoms Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {filteredSymptoms.map((symptom, index) => {
            const SeverityIcon = getSeverityIcon(symptom.severity)
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-cyan-600 transition-colors duration-300">
                      {symptom.name}
                    </h3>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getSeverityColor(symptom.severity)}`}>
                      <SeverityIcon className="h-3 w-3" />
                      <span className="capitalize">{symptom.severity}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{symptom.description}</p>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-amber-800">
                      <strong>Urgency:</strong> {symptom.urgency}
                    </p>
                  </div>
                  
                  <Button className="w-full group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                    Analyze Symptom
                    <ArrowRight className="ml-2 icon-sm group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </motion.div>

        {/* Emergency Symptoms */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
            <CardContent className="p-8">
              <h2 className="heading-xl mb-6 text-center">{t.emergency.alert} - {t.emergency.call911}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {emergencySymptoms.map((symptom, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white/20 rounded-lg p-3">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium">{symptom}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t.symptoms.features.intelligentAnalysis}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: t.symptoms.features.intelligentAnalysis,
                description: t.symptoms.features.intelligentAnalysisDesc
              },
              {
                icon: Shield,
                title: t.symptoms.features.privacyProtected,
                description: t.symptoms.features.privacyProtectedDesc
              },
              {
                icon: Clock,
                title: t.symptoms.features.accessible,
                description: t.symptoms.features.accessibleDesc
              },
              {
                icon: Users,
                title: t.symptoms.features.expertValidated,
                description: t.symptoms.features.expertValidatedDesc
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center h-full">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-cyan-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-4">{t.homepage.startAssessment}</h2>
              <p className="text-xl mb-8 opacity-90">
                {t.homepage.startMedicalAssessmentDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/symptom-checker">{t.homepage.startAssessment}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-cyan-600">
                  <Link href="/questionnaires">{t.navigation.questionnaires}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
