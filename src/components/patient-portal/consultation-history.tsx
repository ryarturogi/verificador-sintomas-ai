'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  MessageSquare, 
  Calendar, 
  Clock, 
  Search,
  Filter,
  Eye,
  X
} from 'lucide-react'
import { ConsultationSession } from '@/types/consultation'
import { motion } from 'framer-motion'

interface ConsultationHistoryProps {
  consultations: ConsultationSession[]
  onViewConsultation?: (consultation: ConsultationSession) => void
  onStartNewConsultation?: () => void
  isLoading?: boolean
}

export function ConsultationHistory({ 
  consultations, 
  onViewConsultation, 
  onStartNewConsultation,
  isLoading = false 
}: ConsultationHistoryProps) {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('date')
  const [filteredConsultations, setFilteredConsultations] = useState<ConsultationSession[]>([])

  useEffect(() => {
    let filtered = consultations

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(consultation =>
        consultation.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultation.doctorSpecialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultation.summary?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(consultation => consultation.status === statusFilter)
    }

    // Sort consultations
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
        case 'doctor':
          return a.doctorName.localeCompare(b.doctorName)
        case 'status':
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })

    setFilteredConsultations(filtered)
  }, [consultations, searchTerm, statusFilter, sortBy])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      completed: { variant: 'secondary' as const, color: 'bg-cyan-100 text-cyan-800' },
      cancelled: { variant: 'destructive' as const, color: 'bg-red-100 text-red-800' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.completed
    
    return (
      <Badge variant={config.variant} className={config.color}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const formatDuration = (startTime: Date, endTime?: Date) => {
    if (!endTime) return 'Ongoing'
    
    const duration = new Date(endTime).getTime() - new Date(startTime).getTime()
    const minutes = Math.floor(duration / 60000)
    const hours = Math.floor(minutes / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`
    }
    return `${minutes}m`
  }

  const getConsultationStats = () => {
    const total = consultations.length
    const completed = consultations.filter(c => c.status === 'completed').length
    const active = consultations.filter(c => c.status === 'active').length
    const cancelled = consultations.filter(c => c.status === 'cancelled').length

    return { total, completed, active, cancelled }
  }

  const stats = getConsultationStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="heading-xl text-gray-900">{t.patientPortal.consultationHistory.title}</h1>
          <p className="text-muted">{t.patientPortal.consultationHistory.subtitle}</p>
        </div>
        <Button onClick={onStartNewConsultation} disabled={isLoading}>
          <MessageSquare className="icon-sm mr-2" />
{t.patientPortal.consultationHistory.newConsultation}
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
        <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t.patientPortal.consultationHistory.stats.totalConsultations}</p>
                <p className="stats-number">{stats.total}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
        <Card className="border-l-4 border-l-green-500 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t.patientPortal.consultationHistory.stats.completed}</p>
                <p className="stats-number-success">{stats.completed}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
        <Card className="border-l-4 border-l-orange-500 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t.patientPortal.consultationHistory.stats.active}</p>
                <p className="stats-number-warning">{stats.active}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
        <Card className="border-l-4 border-l-red-500 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t.patientPortal.consultationHistory.stats.cancelled}</p>
                <p className="stats-number-danger">{stats.cancelled}</p>
              </div>
              <X className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="border-l-4 border-l-indigo-500 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 icon-sm" />
                  <Input
                    placeholder={t.patientPortal.consultationHistory.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="icon-sm mr-2" />
                  <SelectValue placeholder={t.patientPortal.consultationHistory.filterByStatus} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.patientPortal.consultationHistory.allStatus}</SelectItem>
                  <SelectItem value="active">{t.patientPortal.consultationHistory.active}</SelectItem>
                  <SelectItem value="completed">{t.patientPortal.consultationHistory.completed}</SelectItem>
                  <SelectItem value="cancelled">{t.patientPortal.consultationHistory.cancelled}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder={t.patientPortal.consultationHistory.sortBy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">{t.patientPortal.consultationHistory.date}</SelectItem>
                  <SelectItem value="doctor">{t.patientPortal.consultationHistory.doctor}</SelectItem>
                  <SelectItem value="status">{t.patientPortal.consultationHistory.status}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Consultations List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="border-l-4 border-l-teal-500 shadow-md">
          <CardHeader className="bg-teal-50">
            <CardTitle className="text-teal-800">{t.patientPortal.consultationHistory.consultationRecords}</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredConsultations.length > 0 ? (
              <div className="space-y-4">
                {filteredConsultations.map((consultation, index) => (
                  <motion.div
                    key={consultation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-cyan-600">
                              {consultation.doctorName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{consultation.doctorName}</h3>
                            <p className="text-sm text-gray-600">{consultation.doctorSpecialty}</p>
                          </div>
                        </div>

                        {consultation.summary && (
                          <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                            {consultation.summary}
                          </p>
                        )}

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="icon-sm" />
                            <span>{new Date(consultation.startTime).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="icon-sm" />
                            <span>{formatDuration(consultation.startTime, consultation.endTime)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="icon-sm" />
                            <span>{consultation.messages.length} {t.patientPortal.consultationHistory.messages}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        {getStatusBadge(consultation.status)}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onViewConsultation?.(consultation)}
                        >
                          <Eye className="icon-sm mr-1" />
                          {t.patientPortal.consultationHistory.view}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t.patientPortal.consultationHistory.noConsultationsFound}</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || statusFilter !== 'all' 
                    ? t.patientPortal.consultationHistory.tryAdjustingSearch
                    : t.patientPortal.consultationHistory.noConsultationsYet
                  }
                </p>
                {!searchTerm && statusFilter === 'all' && (
                  <Button onClick={onStartNewConsultation}>
                    <MessageSquare className="icon-sm mr-2" />
                    {t.patientPortal.consultationHistory.startFirstConsultation}
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
