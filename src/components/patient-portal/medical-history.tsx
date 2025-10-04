'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  AlertTriangle,
  Pill,
  Heart,
  Calendar,
  User
} from 'lucide-react'
import { MedicalHistory } from '@/types/patient'
import { motion } from 'framer-motion'

interface MedicalHistoryProps {
  medicalHistory: MedicalHistory | null
  onSave: (history: Partial<MedicalHistory>) => Promise<boolean>
  isLoading?: boolean
}

export function MedicalHistoryComponent({ medicalHistory, onSave, isLoading = false }: MedicalHistoryProps) {
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<MedicalHistory>>({})
  const [editingSection, setEditingSection] = useState<string | null>(null)

  useEffect(() => {
    if (medicalHistory) {
      setFormData(medicalHistory)
    }
  }, [medicalHistory])

  const handleSave = async () => {
    const success = await onSave(formData)
    if (success) {
      setIsEditing(false)
      setEditingSection(null)
    }
  }

  const handleCancel = () => {
    setFormData(medicalHistory || {})
    setIsEditing(false)
    setEditingSection(null)
  }

  const addItem = (section: string, item: string) => {
    if (!item.trim()) return

    const currentArray = formData[section as keyof MedicalHistory] as string[] || []
    setFormData(prev => ({
      ...prev,
      [section]: [...currentArray, item.trim()]
    }))
  }

  const removeItem = (section: string, index: number) => {
    const currentArray = formData[section as keyof MedicalHistory] as string[] || []
    setFormData(prev => ({
      ...prev,
      [section]: currentArray.filter((_, i) => i !== index)
    }))
  }

  const addMedication = () => {
    const newMedication = {
      name: '',
      dosage: '',
      frequency: '',
      prescribedBy: ''
    }
    
    setFormData(prev => ({
      ...prev,
      currentMedications: [...(prev.currentMedications || []), newMedication]
    }))
  }

  const updateMedication = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      currentMedications: prev.currentMedications?.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      ) || []
    }))
  }

  const removeMedication = (index: number) => {
    setFormData(prev => ({
      ...prev,
      currentMedications: prev.currentMedications?.filter((_, i) => i !== index) || []
    }))
  }

  const addSurgery = () => {
    const newSurgery = {
      procedure: '',
      date: '',
      hospital: ''
    }
    
    setFormData(prev => ({
      ...prev,
      pastSurgeries: [...(prev.pastSurgeries || []), newSurgery]
    }))
  }

  const updateSurgery = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      pastSurgeries: prev.pastSurgeries?.map((surgery, i) => 
        i === index ? { ...surgery, [field]: value } : surgery
      ) || []
    }))
  }

  const removeSurgery = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pastSurgeries: prev.pastSurgeries?.filter((_, i) => i !== index) || []
    }))
  }

  const renderListSection = (
    title: string,
    items: string[],
    sectionKey: string,
    icon: React.ReactNode,
    placeholder: string
  ) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {icon}
            <span>{title}</span>
            <Badge variant="secondary">{items.length}</Badge>
          </div>
          {isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditingSection(editingSection === sectionKey ? null : sectionKey)}
            >
              {editingSection === sectionKey ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">{item}</span>
                {isEditing && editingSection === sectionKey && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(sectionKey, index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No {title.toLowerCase()} recorded</p>
        )}

        {isEditing && editingSection === sectionKey && (
          <div className="mt-4 flex space-x-2">
            <Input
              placeholder={placeholder}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addItem(sectionKey, e.currentTarget.value)
                  e.currentTarget.value = ''
                }
              }}
            />
            <Button
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling as HTMLInputElement
                addItem(sectionKey, input.value)
                input.value = ''
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )

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
          <h1 className="text-2xl font-bold text-gray-900">Medical History</h1>
          <p className="text-gray-600">Manage your medical information and health records</p>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit History
            </Button>
          )}
        </div>
      </motion.div>

      {/* Allergies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {renderListSection(
          'Allergies',
          formData.allergies || [],
          'allergies',
          <AlertTriangle className="h-5 w-5 text-red-600" />,
          'Add allergy (e.g., Penicillin, Shellfish)'
        )}
      </motion.div>

      {/* Current Medications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Pill className="h-5 w-5 text-cyan-600" />
                <span>Current Medications</span>
                <Badge variant="secondary">{formData.currentMedications?.length || 0}</Badge>
              </div>
              {isEditing && (
                <Button variant="outline" size="sm" onClick={addMedication}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Medication
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {formData.currentMedications && formData.currentMedications.length > 0 ? (
              <div className="space-y-4">
                {formData.currentMedications.map((medication, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Medication Name
                        </label>
                        {isEditing ? (
                          <Input
                            value={medication.name}
                            onChange={(e) => updateMedication(index, 'name', e.target.value)}
                            placeholder={t.patientPortal.medicalHistory.medicationNamePlaceholder}
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{medication.name || 'Not specified'}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dosage
                        </label>
                        {isEditing ? (
                          <Input
                            value={medication.dosage || ''}
                            onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                            placeholder="e.g., 10mg"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{medication.dosage || 'Not specified'}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Frequency
                        </label>
                        {isEditing ? (
                          <Input
                            value={medication.frequency || ''}
                            onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                            placeholder="e.g., Twice daily"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{medication.frequency || 'Not specified'}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Prescribed By
                        </label>
                        {isEditing ? (
                          <Input
                            value={medication.prescribedBy || ''}
                            onChange={(e) => updateMedication(index, 'prescribedBy', e.target.value)}
                            placeholder={t.patientPortal.medicalHistory.doctorNamePlaceholder}
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{medication.prescribedBy || 'Not specified'}</p>
                        )}
                      </div>
                    </div>
                    {isEditing && (
                      <div className="mt-4 flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMedication(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No current medications recorded</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Chronic Conditions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {renderListSection(
          'Chronic Conditions',
          formData.chronicConditions || [],
          'chronicConditions',
          <Heart className="h-5 w-5 text-red-600" />,
          'Add condition (e.g., Diabetes, Hypertension)'
        )}
      </motion.div>

      {/* Past Surgeries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-cyan-600" />
                <span>Past Surgeries</span>
                <Badge variant="secondary">{formData.pastSurgeries?.length || 0}</Badge>
              </div>
              {isEditing && (
                <Button variant="outline" size="sm" onClick={addSurgery}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Surgery
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {formData.pastSurgeries && formData.pastSurgeries.length > 0 ? (
              <div className="space-y-4">
                {formData.pastSurgeries.map((surgery, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Procedure
                        </label>
                        {isEditing ? (
                          <Input
                            value={surgery.procedure}
                            onChange={(e) => updateSurgery(index, 'procedure', e.target.value)}
                            placeholder={t.patientPortal.medicalHistory.procedureNamePlaceholder}
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{surgery.procedure || 'Not specified'}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        {isEditing ? (
                          <Input
                            type="date"
                            value={surgery.date || ''}
                            onChange={(e) => updateSurgery(index, 'date', e.target.value)}
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{surgery.date || 'Not specified'}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Hospital
                        </label>
                        {isEditing ? (
                          <Input
                            value={surgery.hospital || ''}
                            onChange={(e) => updateSurgery(index, 'hospital', e.target.value)}
                            placeholder={t.patientPortal.medicalHistory.hospitalNamePlaceholder}
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{surgery.hospital || 'Not specified'}</p>
                        )}
                      </div>
                    </div>
                    {isEditing && (
                      <div className="mt-4 flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSurgery(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No past surgeries recorded</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Family History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {renderListSection(
          'Family History',
          formData.familyHistory || [],
          'familyHistory',
          <User className="h-5 w-5 text-green-600" />,
          'Add family history (e.g., Heart disease, Cancer)'
        )}
      </motion.div>
    </div>
  )
}
