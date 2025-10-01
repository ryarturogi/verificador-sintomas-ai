'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { SymptomData, SymptomSeverity } from '@/types/symptom-checker'
import { MEDICAL_DISCLAIMER } from '@/constants/symptom-checker'
import { useTranslations } from '@/contexts/language-context'
import { AlertTriangle, Heart, Clock, User } from 'lucide-react'

interface SymptomFormProps {
  onSubmit: (data: SymptomData) => Promise<void>
  isLoading: boolean
}

export function SymptomForm({ onSubmit, isLoading }: SymptomFormProps) {
  const [step, setStep] = useState(1)
  const totalSteps = 4
  const t = useTranslations()

  const form = useForm<SymptomData>({
    resolver: zodResolver(SymptomData),
    defaultValues: {
      primarySymptom: 'headache',
      description: 'I have been experiencing a persistent throbbing headache on the right side of my head for the past two days. It gets worse when I move around or when there are bright lights. I also feel slightly nauseous.',
      duration: '2-3-days',
      severity: 'moderate',
      additionalSymptoms: [],
      age: 28,
      gender: 'female',
      hasChronicConditions: false,
      chronicConditions: '',
      currentMedications: '',
      isPregnant: false,
      allergies: '',
    },
  })

  const { register, handleSubmit, watch, setValue, formState: { errors } } = form
  const watchedValues = watch()

  const progress = (step / totalSteps) * 100

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const onFormSubmit = async (data: SymptomData) => {
    await onSubmit(data)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Alert className="border-amber-200 bg-amber-50">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800 text-sm">
          <strong>Medical Disclaimer:</strong> This tool is for informational purposes only. 
          In case of emergency, call 911 immediately.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            AI Symptom Assessment
          </CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Step {step} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  {t.forms.primarySymptomsLabel}
                </h3>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.questions.mainConcern}
                  </label>
                  <Input
                    {...register('primarySymptom')}
                    placeholder={t.forms.primarySymptomPlaceholder}
                    className={errors.primarySymptom ? 'border-red-500' : ''}
                  />
                  {errors.primarySymptom && (
                    <p className="text-red-500 text-sm mt-1">{errors.primarySymptom.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.forms.describeSymptomsLabel}
                  </label>
                  <Textarea
                    {...register('description')}
                    placeholder={t.forms.descriptionPlaceholder}
                    rows={4}
                    className={errors.description ? 'border-red-500' : ''}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.forms.howLongSymptomsLabel}
                    </label>
                    <Select onValueChange={(value) => setValue('duration', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.forms.durationPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less-than-hour">Less than 1 hour</SelectItem>
                        <SelectItem value="few-hours">A few hours</SelectItem>
                        <SelectItem value="1-day">1 day</SelectItem>
                        <SelectItem value="2-3-days">2-3 days</SelectItem>
                        <SelectItem value="1-week">About 1 week</SelectItem>
                        <SelectItem value="2-weeks">About 2 weeks</SelectItem>
                        <SelectItem value="1-month">About 1 month</SelectItem>
                        <SelectItem value="longer">Longer than 1 month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.questions.severity}
                    </label>
                    <Select onValueChange={(value) => setValue('severity', value as SymptomSeverity)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.forms.severityPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mild">Mild - Barely noticeable</SelectItem>
                        <SelectItem value="moderate">Moderate - Noticeable discomfort</SelectItem>
                        <SelectItem value="severe">Severe - Significant pain/discomfort</SelectItem>
                        <SelectItem value="emergency">Emergency - Unbearable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {t.forms.personalInformationLabel}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.forms.ageLabel}</label>
                    <Input
                      type="number"
                      {...register('age', { valueAsNumber: true })}
                      min="1"
                      max="120"
                      className={errors.age ? 'border-red-500' : ''}
                    />
                    {errors.age && (
                      <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t.questions.gender}</label>
                    <Select onValueChange={(value) => setValue('gender', value as 'male' | 'female' | 'other' | 'prefer_not_to_say')}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.forms.genderPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {watchedValues.gender === 'female' && (
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...register('isPregnant')}
                        className="rounded"
                      />
                      <span className="text-sm">Are you currently pregnant?</span>
                    </label>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Medical History
                </h3>

                <div>
                  <label className="flex items-center space-x-2 mb-4">
                    <input
                      type="checkbox"
                      {...register('hasChronicConditions')}
                      className="rounded"
                    />
                    <span className="text-sm">Do you have any chronic medical conditions?</span>
                  </label>

                  {watchedValues.hasChronicConditions && (
                    <Textarea
                      {...register('chronicConditions')}
                      placeholder={t.forms.chronicConditionsPlaceholder}
                      rows={3}
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.forms.medicationsLabel}
                  </label>
                  <Textarea
                    {...register('currentMedications')}
                    placeholder={t.forms.medicationsPlaceholder}
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.forms.allergiesLabel}
                  </label>
                  <Textarea
                    {...register('allergies')}
                    placeholder={t.forms.allergiesPlaceholder}
                    rows={2}
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t.forms.reviewSubmitLabel}</h3>
                
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <p><strong>{t.forms.primarySymptomField}:</strong> {watchedValues.primarySymptom}</p>
                  <p><strong>{t.forms.durationField}:</strong> {watchedValues.duration}</p>
                  <p><strong>{t.forms.severityField}:</strong> {watchedValues.severity}</p>
                  <p><strong>{t.forms.ageField}:</strong> {watchedValues.age}</p>
                  <p><strong>{t.questions.gender}:</strong> {watchedValues.gender}</p>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-xs leading-relaxed">
                    {MEDICAL_DISCLAIMER}
                  </AlertDescription>
                </Alert>
              </div>
            )}

            <div className="flex justify-between pt-6">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}
              
              {step < totalSteps ? (
                <Button type="button" onClick={nextStep} className="ml-auto">
                  Next
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="ml-auto"
                >
                  {isLoading ? 'Analyzing...' : 'Get Assessment'}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}