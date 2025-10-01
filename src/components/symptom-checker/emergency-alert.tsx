'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useTranslations } from '@/contexts/language-context'
import { Phone, MapPin, AlertTriangle, Clock, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface EmergencyAlertProps {
  isOpen: boolean
  onClose: () => void
  message?: string
}

export function EmergencyAlert({ isOpen, onClose, message }: EmergencyAlertProps) {
  const t = useTranslations()

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-red-50 to-orange-50 border-0 shadow-2xl rounded-3xl overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
            >
              <DialogHeader className="bg-gradient-to-r from-red-500 to-orange-600 p-6 -m-6 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-7 w-7 text-white animate-pulse" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold text-white">
                      🚨 {t.emergency.alert}
                    </DialogTitle>
                    <p className="text-red-100 text-sm mt-1">Immediate action required</p>
                  </div>
                </div>
              </DialogHeader>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6 p-6 -mt-6"
              >
                {/* Emergency Message */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white border-l-4 border-l-red-500 p-6 rounded-2xl shadow-lg"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-red-800 text-lg mb-2">
                        🚨 {t.emergency.immediateAction}
                      </h3>
                      <p className="text-red-700 leading-relaxed">
                        {message || t.emergency.defaultMessage}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Emergency Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white p-6 rounded-2xl shadow-lg"
                >
                  <h4 className="font-bold text-gray-900 text-lg mb-4 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <span>{t.emergency.emergencyActions}</span>
                  </h4>
                  <div className="space-y-4">
                    {[
                      { icon: Phone, text: t.emergency.callEmergencyServices, color: 'bg-red-500' },
                      { icon: MapPin, text: t.emergency.goToNearestER, color: 'bg-orange-500' },
                      { icon: AlertTriangle, text: t.emergency.doNotDelay, color: 'bg-red-600' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl"
                      >
                        <div className={`w-8 h-8 ${item.color} rounded-full flex items-center justify-center`}>
                          <item.icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-800 font-medium">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="destructive" 
                      className="w-full h-14 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl font-bold text-lg shadow-lg"
                      onClick={() => {
                        window.open('tel:911')
                        onClose()
                      }}
                    >
                      <Phone className="h-5 w-5 mr-3 animate-pulse" />
                      {t.emergency.call911}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="outline" 
                      className="w-full h-14 border-2 border-red-300 bg-white hover:bg-red-50 rounded-xl font-bold text-lg"
                      onClick={() => {
                        window.open('https://www.google.com/maps/search/emergency+room+near+me', '_blank')
                        onClose()
                      }}
                    >
                      <MapPin className="h-5 w-5 mr-3" />
                      {t.emergency.findER}
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-xl border"
                >
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">{t.emergency.alertGenerated}</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}