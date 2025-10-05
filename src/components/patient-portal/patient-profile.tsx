'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  User, 
  Heart, 
  Shield,
  Save,
  Edit,
  X
} from 'lucide-react'
import { PatientProfile } from '@/types/patient'
import { motion } from 'framer-motion'

interface PatientProfileProps {
  profile: PatientProfile | null
  onSave: (profile: Partial<PatientProfile>) => Promise<boolean>
  isLoading?: boolean
}

export function PatientProfileComponent({ profile, onSave, isLoading = false }: PatientProfileProps) {
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<PatientProfile>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (profile) {
      setFormData(profile)
    }
  }, [profile])

  const handleInputChange = (field: string, value: string | object) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName?.trim()) {
      newErrors.firstName = t.auth.signup.errors.firstNameRequired
    }
    if (!formData.lastName?.trim()) {
      newErrors.lastName = t.auth.signup.errors.lastNameRequired
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.auth.signup.errors.emailInvalid
    }
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = t.auth.signup.errors.phoneInvalid
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return

    const success = await onSave(formData)
    if (success) {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setFormData(profile || {})
    setErrors({})
    setIsEditing(false)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return t.patientPortal.profile.dateOfBirthPlaceholder
    return new Date(dateString).toLocaleDateString()
  }

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
          <h1 className="heading-xl text-gray-900">{t.patientPortal.profile.title}</h1>
          <p className="text-gray-600">{t.patientPortal.profile.subtitle}</p>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
              >
                <X className="icon-sm mr-2" />
                {t.patientPortal.profile.cancel}
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
              >
                <Save className="icon-sm mr-2" />
                {isLoading ? t.common.loading : t.patientPortal.profile.saveChanges}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
            >
              <Edit className="icon-sm mr-2" />
              {t.patientPortal.profile.personalInfo}
            </Button>
          )}
        </div>
      </motion.div>

      {/* Personal Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <User className="h-5 w-5" />
              <span>{t.patientPortal.profile.personalInfo}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.patientPortal.profile.firstNameLabel} *
                </label>
                {isEditing ? (
                  <Input
                    value={formData.firstName || ''}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={errors.firstName ? 'border-red-500' : ''}
                    placeholder={t.patientPortal.profile.firstNamePlaceholder}
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profile?.firstName || t.patientPortal.profile.notProvided}</p>
                )}
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.patientPortal.profile.lastNameLabel} *
                </label>
                {isEditing ? (
                  <Input
                    value={formData.lastName || ''}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={errors.lastName ? 'border-red-500' : ''}
                    placeholder={t.patientPortal.profile.lastNamePlaceholder}
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profile?.lastName || t.patientPortal.profile.notProvided}</p>
                )}
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.patientPortal.profile.emailLabel}
                </label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                    placeholder={t.patientPortal.profile.emailPlaceholder}
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profile?.email || t.patientPortal.profile.notProvided}</p>
                )}
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.patientPortal.profile.phoneLabel}
                </label>
                {isEditing ? (
                  <Input
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={errors.phone ? 'border-red-500' : ''}
                    placeholder={t.patientPortal.profile.phonePlaceholder}
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profile?.phone || t.patientPortal.profile.notProvided}</p>
                )}
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.patientPortal.profile.dateOfBirthLabel}
                </label>
                {isEditing ? (
                  <Input
                    type="date"
                    value={formData.dateOfBirth || ''}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    placeholder={t.patientPortal.profile.dateOfBirthPlaceholder}
                  />
                ) : (
                  <p className="text-gray-900 py-2">{formatDate(profile?.dateOfBirth)}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.patientPortal.profile.genderLabel}
                </label>
                {isEditing ? (
                  <Select
                    value={formData.gender || ''}
                    onValueChange={(value) => handleInputChange('gender', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.patientPortal.profile.genderPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-gray-900 py-2">
                    {profile?.gender ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) : t.patientPortal.profile.notProvided}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Emergency Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-l-4 border-l-pink-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-pink-50">
            <CardTitle className="flex items-center space-x-2 text-pink-800">
              <Heart className="h-5 w-5" />
              <span>{t.patientPortal.profile.emergencyContact}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.patientPortal.profile.contactName}
                </label>
                {isEditing ? (
                  <Input
                    value={formData.emergencyContact?.name || ''}
                    onChange={(e) => handleInputChange('emergencyContact', { 
                      ...formData.emergencyContact, 
                      name: e.target.value 
                    })}
                    placeholder={t.patientPortal.profile.emergencyContactNamePlaceholder}
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profile?.emergencyContact?.name || t.patientPortal.profile.notProvided}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.patientPortal.profile.contactPhone}
                </label>
                {isEditing ? (
                  <Input
                    value={formData.emergencyContact?.phone || ''}
                    onChange={(e) => handleInputChange('emergencyContact', { 
                      ...formData.emergencyContact, 
                      phone: e.target.value 
                    })}
                    placeholder={t.patientPortal.profile.emergencyContactPhonePlaceholder}
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profile?.emergencyContact?.phone || t.patientPortal.profile.notProvided}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.patientPortal.profile.relationship}
                </label>
                {isEditing ? (
                  <Input
                    value={formData.emergencyContact?.relationship || ''}
                    onChange={(e) => handleInputChange('emergencyContact', { 
                      ...formData.emergencyContact, 
                      relationship: e.target.value 
                    })}
                    placeholder={t.patientPortal.profile.emergencyContactRelationshipPlaceholder}
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profile?.emergencyContact?.relationship || t.patientPortal.profile.notProvided}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Account Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="border-l-4 border-l-gray-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gray-50">
            <CardTitle className="flex items-center space-x-2 text-gray-800">
              <Shield className="h-5 w-5" />
              <span>{t.patientPortal.profile.accountInformation}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.patientPortal.profile.patientId}
                </label>
                <p className="text-gray-900 font-mono text-sm bg-gray-50 px-3 py-2 rounded">
                  {profile?.id || t.patientPortal.profile.notAvailable}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.patientPortal.profile.memberSince}
                </label>
                <p className="text-gray-900 py-2">
                  {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : t.patientPortal.profile.notAvailable}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.patientPortal.profile.lastUpdated}
                </label>
                <p className="text-gray-900 py-2">
                  {profile?.lastUpdated ? new Date(profile.lastUpdated).toLocaleDateString() : t.patientPortal.profile.notAvailable}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.patientPortal.profile.accountStatus}
                </label>
                <Badge variant="default" className="mt-2">
                  {t.patientPortal.profile.active}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
