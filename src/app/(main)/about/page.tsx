'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/language-context'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  
 
  Shield, 
  Brain,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const { t } = useLanguage()
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
            About VitalCheck
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering healthcare decisions through advanced AI technology and compassionate care guidance.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
            <CardContent className="p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    VitalCheck is dedicated to revolutionizing healthcare accessibility by providing 
                    intelligent symptom analysis and medical guidance. We bridge the gap between 
                    patients and healthcare providers through cutting-edge AI technology.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Our platform ensures that quality healthcare guidance is available 24/7, 
                    helping individuals make informed decisions about their health while 
                    maintaining the highest standards of medical ethics and patient privacy.
                  </p>
                </div>
                <div className="relative">
                  <div className="w-full h-80 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt={t.about.teamImageAlt}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: t.about.values.compassionateCare.title,
                description: t.about.values.compassionateCare.description
              },
              {
                icon: Shield,
                title: t.about.values.privacySecurity.title, 
                description: t.about.values.privacySecurity.description
              },
              {
                icon: Brain,
                title: t.about.values.advancedAI.title,
                description: t.about.values.advancedAI.description
              },
              {
                icon: CheckCircle,
                title: t.about.values.evidenceBased.title,
                description: t.about.values.evidenceBased.description
              }
            ].map((value, index) => (
              <Card key={index} className="text-center h-full">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-cyan-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Mitchell",
                role: "Chief Medical Officer",
                image: "https://images.unsplash.com/photo-1594824609072-57c2d2bb8b86?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                description: "Board-certified physician with 15+ years in emergency medicine and AI healthcare applications."
              },
              {
                name: "Alex Rodriguez",
                role: "Chief Technology Officer", 
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                description: "AI researcher specializing in natural language processing and medical data analysis."
              },
              {
                name: "Dr. Emily Chen",
                role: "Head of Clinical Research",
                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                description: "Clinical researcher focused on AI ethics in healthcare and patient safety protocols."
              }
            ].map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-cyan-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                {[
                  { number: "500K+", label: "Assessments Completed" },
                  { number: "98%", label: "User Satisfaction" },
                  { number: "24/7", label: "Availability" },
                  { number: "50+", label: "Medical Specialties" }
                ].map((stat, index) => (
                  <div key={index}>
                    <div className="text-4xl font-bold mb-2">{stat.number}</div>
                    <div className="text-cyan-100">{stat.label}</div>
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
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Ready to Experience VitalCheck?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust VitalCheck for intelligent health guidance. 
                Start your assessment today.
              </p>
              <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                <Link href="/">Start Assessment</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}