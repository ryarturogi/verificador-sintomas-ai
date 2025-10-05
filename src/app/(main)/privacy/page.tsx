'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  Lock, 
  Eye, 
  Database,
  UserCheck,
  FileText,
  AlertTriangle
} from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-cyan-50 to-cyan-100">

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-cyan-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your privacy and the security of your health information are our highest priorities. 
            Learn how we collect, use, and protect your data.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: January 1, 2025
          </p>
        </motion.div>

        {/* Quick Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-cyan-50 border border-cyan-200">
            <CardContent className="p-8">
              <h2 className="heading-xl text-cyan-900 mb-4">Privacy at a Glance</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Lock className="h-8 w-8 text-cyan-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-cyan-900 mb-2">Encrypted & Secure</h3>
                  <p className="text-cyan-800 text-sm">All data is encrypted in transit and at rest</p>
                </div>
                <div className="text-center">
                  <UserCheck className="h-8 w-8 text-cyan-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-cyan-900 mb-2">Your Control</h3>
                  <p className="text-cyan-800 text-sm">You control your data and can delete it anytime</p>
                </div>
                <div className="text-center">
                  <Eye className="h-8 w-8 text-cyan-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-cyan-900 mb-2">No Sharing</h3>
                  <p className="text-cyan-800 text-sm">We never sell or share your personal health data</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-8"
        >
          {/* Information We Collect */}
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Database className="h-6 w-6 text-cyan-600 mr-3" />
                <h2 className="heading-xl text-gray-900">Information We Collect</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Health Information</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Symptoms and health concerns you report</li>
                    <li>Responses to health assessment questionnaires</li>
                    <li>Medical history information you choose to provide</li>
                    <li>Assessment results and recommendations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Information</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Email address and account credentials</li>
                    <li>Profile information (age, gender, location if provided)</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Information</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Device information and browser type</li>
                    <li>IP address and location data</li>
                    <li>Usage analytics and interaction data</li>
                    <li>Cookies and similar technologies</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <FileText className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="heading-xl text-gray-900">How We Use Your Information</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600"><strong>Provide Health Assessments:</strong> Analyze your symptoms and provide personalized health guidance</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600"><strong>Improve Our Services:</strong> Enhance our AI algorithms and platform functionality</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600"><strong>Communicate:</strong> Send you assessment results, updates, and support messages</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600"><strong>Ensure Security:</strong> Protect against fraud, abuse, and security threats</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600"><strong>Comply with Laws:</strong> Meet legal requirements and respond to legal requests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Lock className="h-6 w-6 text-cyan-600 mr-3" />
                <h2 className="heading-xl text-gray-900">Data Security & Protection</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Encryption</h3>
                  <p className="text-gray-600 mb-4">
                    All data is encrypted using industry-standard AES-256 encryption both in transit and at rest.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Access Controls</h3>
                  <p className="text-gray-600 mb-4">
                    Strict access controls ensure only authorized personnel can access your data.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">HIPAA Compliance</h3>
                  <p className="text-gray-600 mb-4">
                    We maintain HIPAA compliance standards for handling protected health information.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Regular Audits</h3>
                  <p className="text-gray-600 mb-4">
                    Regular security audits and penetration testing ensure our systems remain secure.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <UserCheck className="h-6 w-6 text-orange-600 mr-3" />
                <h2 className="heading-xl text-gray-900">Your Rights & Choices</h2>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-semibold text-orange-900 mb-2">Access Your Data</h3>
                  <p className="text-orange-800 text-sm">Request access to all personal information we have about you</p>
                </div>
                <div className="p-4 bg-cyan-50 rounded-lg">
                  <h3 className="font-semibold text-cyan-900 mb-2">Correct Information</h3>
                  <p className="text-cyan-800 text-sm">Update or correct any inaccurate personal information</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Delete Your Account</h3>
                  <p className="text-green-800 text-sm">Request deletion of your account and all associated data</p>
                </div>
                <div className="p-4 bg-cyan-50 rounded-lg">
                  <h3 className="font-semibold text-cyan-900 mb-2">Data Portability</h3>
                  <p className="text-cyan-800 text-sm">Export your data in a portable format</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notice */}
          <Card className="bg-amber-50 border border-amber-200">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-amber-900 mb-2">Important Notice</h3>
                  <p className="text-amber-800 leading-relaxed">
                    VitalCheck is not a substitute for professional medical advice, diagnosis, or treatment. 
                    The information provided through our platform is for educational and informational purposes only. 
                    Always seek the advice of your physician or other qualified health provider with any questions 
                    you may have regarding a medical condition.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
            <CardContent className="p-8">
              <h2 className="heading-xl text-gray-900 mb-6">Contact Us About Privacy</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  If you have questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700"><strong>Email:</strong> privacy@medicalai.com</p>
                  <p className="text-gray-700"><strong>Address:</strong> 123 Healthcare Innovation Blvd, Suite 100, San Francisco, CA 94102</p>
                  <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Card className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white">
            <CardContent className="p-8">
              <h2 className="heading-xl mb-4">Ready to Get Started?</h2>
              <p className="text-lg mb-6 opacity-90">
                Experience secure, AI-powered health guidance with complete privacy protection.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link href="/">Start Your Assessment</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}