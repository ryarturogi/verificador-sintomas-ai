'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Shield, Phone, Users, Info, CheckCircle, XCircle, Lock, FileText, Eye } from 'lucide-react'
import { useTranslations } from '@/contexts/language-context'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { motion } from 'framer-motion'
import { audit } from '@/lib/audit-logger'
import { generateSecureSessionId } from '@/lib/security-config'

interface DisclaimerModalProps {
  isOpen: boolean
  onAccept: () => void
  onDecline: () => void
}

export function DisclaimerModal({ isOpen, onAccept, onDecline }: DisclaimerModalProps) {
  const t = useTranslations()
  const [hasScrolled, setHasScrolled] = useState(false)
  const [sessionId] = useState(() => generateSecureSessionId())
  const [hasReadPrivacyPolicy, setHasReadPrivacyPolicy] = useState(false)
  const [hasReadDoDisclaimer, setHasReadDoDisclaimer] = useState(false)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10
    setHasScrolled(isAtBottom)
  }

  // Log disclaimer view for audit trail
  useEffect(() => {
    if (isOpen) {
      audit.consent({
        sessionId,
        action: 'PRIVACY_POLICY_ACCEPTED',
        consentType: 'MEDICAL_DISCLAIMER_HIPAA_DOD',
      })
    }
  }, [isOpen, sessionId])

  const handleAccept = async () => {
    // Log consent acceptance
    await audit.consent({
      sessionId,
      action: 'CONSENT_GIVEN',
      consentType: 'MEDICAL_DISCLAIMER_HIPAA_DOD',
    })
    
    // Set consent cookie for middleware
    document.cookie = 'medical-consent=granted; path=/; secure; samesite=strict; max-age=900'
    
    onAccept()
  }

  const handleDecline = async () => {
    // Log consent decline
    await audit.consent({
      sessionId,
      action: 'CONSENT_WITHDRAWN',
      consentType: 'MEDICAL_DISCLAIMER_HIPAA_DOD',
    })
    
    onDecline()
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        className="w-full h-full sm:w-auto sm:h-auto sm:max-w-5xl sm:max-h-[90vh] overflow-hidden bg-gradient-to-br from-white to-gray-50 border-0 shadow-2xl rounded-none sm:rounded-3xl flex flex-col"
        showCloseButton={false}
      >
        <DialogHeader className="bg-gradient-to-r from-cyan-50 to-cyan-100 p-6 -m-6 mb-6 rounded-t-none sm:rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="heading-xl text-gray-900">
                  {t.medicalDisclaimer.modalTitle || 'Medical Disclaimer & Important Information'}
                </DialogTitle>
                <p className="text-gray-600 mt-1">
                  {t.medicalDisclaimer.modalSubtitle || 'Please read and accept to continue'}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <LanguageSwitcher />
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
                    <AlertTriangle className="icon-sm text-white" />
                  </div>
                  <span className="text-red-800 font-bold">{t.medicalDisclaimer.notMedicalDiagnosis}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-6 pb-6">
                <p className="text-red-700 leading-relaxed">
                  {t.medicalDisclaimer.notIntendedFor}
                </p>
                <div className="space-y-2">
                  {[
                    t.medicalDisclaimer.provideDiagnosis,
                    t.medicalDisclaimer.replaceConsultation,
                    t.medicalDisclaimer.emergencyAdvice,
                    t.medicalDisclaimer.guideTreatment
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
                    <Phone className="icon-sm text-white animate-pulse" />
                  </div>
                  <span className="text-red-800 font-bold">{t.medicalDisclaimer.emergencySituations}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-6 pb-6">
                <p className="font-bold text-red-700 text-base">
                  {t.medicalDisclaimer.emergencyInstructions}
                </p>
                <div className="space-y-2">
                  {[
                    t.medicalDisclaimer.call911,
                    t.medicalDisclaimer.goToER,
                    t.medicalDisclaimer.contactEMS
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
                    {t.medicalDisclaimer.doNotDelay}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="icon-sm text-cyan-500" />
{t.medicalDisclaimer.professionalAdvice}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                {t.medicalDisclaimer.consultProfessionals}
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>{t.medicalDisclaimer.medicalConcerns}</li>
                <li>{t.medicalDisclaimer.interpretSymptoms}</li>
                <li>{t.medicalDisclaimer.medicalDiagnosis}</li>
                <li>{t.medicalDisclaimer.medicationAdvice}</li>
                <li>{t.medicalDisclaimer.healthMonitoring}</li>
              </ul>
            </CardContent>
          </Card>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-gradient-to-r from-cyan-50 to-cyan-100 border border-cyan-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center">
                    <Shield className="icon-sm text-white" />
                  </div>
                  <span className="text-cyan-800 font-bold">{t.medicalDisclaimer.privacyNotice}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-6 pb-6">
                <div className="bg-cyan-100 p-4 rounded-xl border border-cyan-300">
                  <h4 className="font-bold text-cyan-800 mb-2 flex items-center gap-2">
                    <Lock className="icon-sm" />
                    {t.medicalDisclaimer.hipaaCompliance}
                  </h4>
                  <p className="text-cyan-700 text-sm leading-relaxed">
                    This application complies with HIPAA (Health Insurance Portability and Accountability Act) 
                    and HITECH Act requirements for protected health information (PHI).
                  </p>
                </div>
                
                <div className="bg-cyan-100 p-4 rounded-xl border border-cyan-300">
                  <h4 className="font-bold text-cyan-800 mb-2 flex items-center gap-2">
                    <FileText className="icon-sm" />
                    {t.medicalDisclaimer.dodSecurity}
                  </h4>
                  <p className="text-cyan-700 text-sm leading-relaxed">
                    Data is classified as CUI (Controlled Unclassified Information) and processed 
                    according to DoD 8570 and NIST 800-53 security controls.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-gray-800">{t.medicalDisclaimer.dataProtection}</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>{t.medicalDisclaimer.encryption}</li>
                    <li>{t.medicalDisclaimer.auditLogging}</li>
                    <li>{t.medicalDisclaimer.sessionTimeout}</li>
                    <li>{t.medicalDisclaimer.noStorage}</li>
                    <li>{t.medicalDisclaimer.dataAnonymization}</li>
                    <li>{t.medicalDisclaimer.securityMonitoring}</li>
                  </ul>
                </div>
                
                <div className="flex items-center space-x-2 bg-green-50 p-3 rounded-lg border border-green-200">
                  <input 
                    type="checkbox" 
                    id="privacy-policy" 
                    checked={hasReadPrivacyPolicy}
                    onChange={(e) => setHasReadPrivacyPolicy(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="privacy-policy" className="text-sm text-green-800 font-medium">
                    {t.medicalDisclaimer.privacyCheckbox}
                  </label>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t.medicalDisclaimer.limitations}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                {t.medicalDisclaimer.limitationsText}
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>{t.medicalDisclaimer.aiKnowledge}</li>
                <li>{t.medicalDisclaimer.medicalHistory}</li>
                <li>{t.medicalDisclaimer.accuracyNotGuaranteed}</li>
                <li>{t.medicalDisclaimer.rareConditions}</li>
                <li>{t.medicalDisclaimer.individualCircumstances}</li>
              </ul>
            </CardContent>
          </Card>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                    <Eye className="icon-sm text-white" />
                  </div>
                  <span className="text-yellow-800 font-bold">DoD INFORMATION ASSURANCE</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-6 pb-6">
                <div className="bg-yellow-100 p-4 rounded-xl border border-yellow-300">
                  <p className="text-yellow-800 text-sm leading-relaxed font-medium">
                    <strong>NOTICE:</strong> {t.medicalDisclaimer.dodNotice}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">{t.medicalDisclaimer.complianceStandards}</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>{t.medicalDisclaimer.fisma}</li>
                    <li>{t.medicalDisclaimer.nist}</li>
                    <li>{t.medicalDisclaimer.dodIA}</li>
                    <li>{t.medicalDisclaimer.fips}</li>
                  </ul>
                </div>
                
                <div className="flex items-center space-x-2 bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <input 
                    type="checkbox" 
                    id="dod-disclaimer" 
                    checked={hasReadDoDisclaimer}
                    onChange={(e) => setHasReadDoDisclaimer(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="dod-disclaimer" className="text-sm text-orange-800 font-medium">
                    {t.medicalDisclaimer.dodCheckbox}
                  </label>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-cyan-50 to-cyan-100 border border-cyan-200 p-6 rounded-2xl"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-cyan-800 text-base mb-2">{t.medicalDisclaimer.finalAcknowledgment}</h4>
                <p className="text-cyan-700 leading-relaxed font-medium">
                  {t.medicalDisclaimer.finalAcknowledgmentText}
                </p>
              </div>
            </div>
          </motion.div>
        </div>


        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 p-6 -m-6 mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-b-none sm:rounded-b-3xl border-t sticky bottom-0 z-10">
          <Button
            onClick={handleDecline}
            variant="outline"
            className="w-full sm:flex-1 bg-white hover:bg-gray-50 border-red-300 text-red-700 hover:text-red-800 hover:border-red-400"
          >
            <XCircle className="icon-sm mr-2" />
            {t.medicalDisclaimer.decline || 'I Decline'}
          </Button>
          <Button
            onClick={handleAccept}
            disabled={!hasScrolled || !hasReadPrivacyPolicy || !hasReadDoDisclaimer}
            className="w-full sm:flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="icon-sm mr-2" />
            {t.medicalDisclaimer.accept || 'I Accept & Continue'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
