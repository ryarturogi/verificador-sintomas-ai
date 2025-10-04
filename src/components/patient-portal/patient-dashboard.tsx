'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Activity, 
  MessageSquare, 
  FileText, 
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { PatientDashboardData } from '@/types/patient'
import { motion } from 'framer-motion'

interface PatientDashboardProps {
  dashboardData: PatientDashboardData
  onViewConsultations?: () => void
  onViewProfile?: () => void
  onViewMedicalHistory?: () => void
}

export function PatientDashboard({ 
  dashboardData, 
  onViewConsultations, 
  onViewProfile, 
  onViewMedicalHistory 
}: PatientDashboardProps) {
  const [isLoading, setIsLoading] = useState(false)

  // Show loading state if dashboardData is not available
  if (!dashboardData) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const handleAction = async (action: () => void) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate loading
      action()
    } finally {
      setIsLoading(false)
    }
  }

  const stats = [
    {
      title: 'Total Consultations',
      value: dashboardData?.healthSummary?.totalConsultations || 0,
      icon: MessageSquare,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50'
    },
    {
      title: 'Current Medications',
      value: dashboardData?.healthSummary?.currentMedications || 0,
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Conditions',
      value: dashboardData?.healthSummary?.activeConditions?.length || 0,
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Recent Activity',
      value: dashboardData?.recentConsultations?.length || 0,
      icon: Clock,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-lg p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">Welcome to Your Patient Portal</h1>
        <p className="text-cyan-100">
          Manage your health information, view consultation history, and track your medical journey.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Consultations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Recent Consultations</span>
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleAction(() => onViewConsultations?.())}
                disabled={isLoading}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {dashboardData?.recentConsultations?.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.recentConsultations.slice(0, 3).map((consultation, index) => (
                  <motion.div
                    key={consultation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-cyan-600">
                          {consultation.doctorName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{consultation.doctorName}</p>
                        <p className="text-sm text-gray-600">{consultation.specialty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={consultation.status === 'completed' ? 'default' : 'secondary'}
                        className="mb-1"
                      >
                        {consultation.status}
                      </Badge>
                      <p className="text-xs text-gray-500">
                        {new Date(consultation.date).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No consultations yet</p>
                <Button 
                  onClick={() => handleAction(() => onViewConsultations?.())}
                  disabled={isLoading}
                >
                  Start Your First Consultation
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col space-y-2"
                onClick={() => handleAction(() => onViewProfile?.())}
                disabled={isLoading}
              >
                <Activity className="h-6 w-6" />
                <span>Update Profile</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col space-y-2"
                onClick={() => handleAction(() => onViewMedicalHistory?.())}
                disabled={isLoading}
              >
                <FileText className="h-6 w-6" />
                <span>Medical History</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col space-y-2"
                onClick={() => handleAction(() => onViewConsultations?.())}
                disabled={isLoading}
              >
                <MessageSquare className="h-6 w-6" />
                <span>New Consultation</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Health Summary */}
      {dashboardData?.healthSummary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Health Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Active Conditions</h4>
                  {dashboardData.healthSummary.activeConditions.length > 0 ? (
                    <div className="space-y-2">
                      {dashboardData.healthSummary.activeConditions.map((condition, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-orange-500" />
                          <span className="text-sm text-gray-700">{condition}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No active conditions recorded</p>
                  )}
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Last Activity</h4>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-700">
                      {dashboardData.healthSummary.lastConsultationDate 
                        ? `Last consultation: ${new Date(dashboardData.healthSummary.lastConsultationDate).toLocaleDateString()}`
                        : 'No consultations yet'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
