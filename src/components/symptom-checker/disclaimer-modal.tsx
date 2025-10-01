'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Shield, Phone, Users, Info, CheckCircle, XCircle } from 'lucide-react'
import { useTranslations } from '@/contexts/language-context'
import { motion } from 'framer-motion'

interface DisclaimerModalProps {
  isOpen: boolean
  onAccept: () => void
  onDecline: () => void
}

export function DisclaimerModal({ isOpen, onAccept, onDecline }: DisclaimerModalProps) {
  const t = useTranslations()
  const [hasScrolled, setHasScrolled] = useState(false)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10
    setHasScrolled(isAtBottom)
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        className="w-full h-full sm:w-auto sm:h-auto sm:max-w-5xl sm:max-h-[90vh] overflow-hidden bg-gradient-to-br from-white to-gray-50 border-0 shadow-2xl rounded-none sm:rounded-3xl flex flex-col"
        showCloseButton={false}
      >
        <DialogHeader className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 -m-6 mb-6 rounded-t-none sm:rounded-t-3xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {t.medicalDisclaimer.modalTitle || 'Medical Disclaimer & Important Information'}
              </DialogTitle>
              <p className="text-gray-600 mt-1">
                {t.medicalDisclaimer.modalSubtitle || 'Please read and accept to continue'}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div 
          className="space-y-6 text-sm p-6 -mt-6 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto flex-1 text-left"
          onScroll={handleScroll}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-0 shadow-lg rounded-2xl">
              <CardHeader className="p-6">
                <CardTitle className="text-lg flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-red-800 font-bold">NOT A MEDICAL DIAGNOSIS</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-6 pb-6">
                <p className="text-red-700 leading-relaxed">
                  This AI symptom checker is designed to provide general health information 
                  and educational content only. It is NOT intended to:
                </p>
                <div className="space-y-2">
                  {[
                    'Provide medical diagnosis or treatment recommendations',
                    'Replace consultation with qualified healthcare professionals',
                    'Serve as emergency medical advice',
                    'Guide medical treatment decisions'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-start space-x-3 bg-white/60 p-3 rounded-xl"
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-red-700 font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-r from-red-100 to-red-200 border-0 shadow-lg rounded-2xl">
              <CardHeader className="p-6">
                <CardTitle className="text-lg flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <Phone className="h-4 w-4 text-white animate-pulse" />
                  </div>
                  <span className="text-red-800 font-bold">EMERGENCY SITUATIONS</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-6 pb-6">
                <p className="font-bold text-red-700 text-base">
                  If you are experiencing a medical emergency, STOP using this tool immediately and:
                </p>
                <div className="space-y-2">
                  {[
                    'Call 911 or your local emergency number',
                    'Go to the nearest emergency room',
                    'Contact emergency medical services'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start space-x-3 bg-white/60 p-3 rounded-xl"
                    >
                      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">{index + 1}</span>
                      </div>
                      <span className="text-red-700 font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-red-200/50 p-4 rounded-xl border border-red-300">
                  <p className="text-red-800 font-semibold text-sm">
                    Do not delay seeking emergency medical care to use this symptom checker.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                PROFESSIONAL MEDICAL ADVICE
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                Always consult with qualified healthcare professionals for:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Any medical concerns or questions</li>
                <li>Interpretation of symptoms</li>
                <li>Medical diagnosis and treatment</li>
                <li>Medication advice and management</li>
                <li>Health condition monitoring</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                PRIVACY & DATA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                We take your privacy seriously:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Your symptom information is not stored permanently</li>
                <li>Data is processed securely and encrypted</li>
                <li>We do not share personal health information</li>
                <li>Session data is cleared when you close the application</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">LIMITATIONS & ACCURACY</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                Please understand that:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>AI recommendations are based on general medical knowledge</li>
                <li>Results may not account for your complete medical history</li>
                <li>Accuracy may vary and is not guaranteed</li>
                <li>Rare conditions may not be adequately represented</li>
                <li>Individual medical circumstances may require different approaches</li>
              </ul>
            </CardContent>
          </Card>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 p-6 rounded-2xl"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-blue-800 text-base mb-2">Acknowledgment</h4>
                <p className="text-blue-700 leading-relaxed font-medium">
                  By using this symptom checker, you acknowledge that you understand 
                  these limitations and agree that this tool does not replace professional medical care.
                </p>
              </div>
            </div>
          </motion.div>
        </div>


        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 p-6 -m-6 mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-b-none sm:rounded-b-3xl border-t sticky bottom-0 z-10">
          <Button
            onClick={onDecline}
            variant="outline"
            className="w-full sm:flex-1 bg-white hover:bg-gray-50 border-red-300 text-red-700 hover:text-red-800 hover:border-red-400"
          >
            <XCircle className="h-4 w-4 mr-2" />
            {t.medicalDisclaimer.decline || 'I Decline'}
          </Button>
          <Button
            onClick={onAccept}
            disabled={!hasScrolled}
            className="w-full sm:flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            {t.medicalDisclaimer.accept || 'I Accept & Continue'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
