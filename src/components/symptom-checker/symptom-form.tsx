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
import { SymptomData, SymptomSeverity } from '@/types/symptom-checker'
import { MEDICAL_DISCLAIMER } from '@/constants/symptom-checker'
import { useTranslations } from '@/contexts/language-context'
import { AlertTriangle, Stethoscope, User, FileText, Activity } from 'lucide-react'
import { medicalDesignTokens as designTokens } from '@/lib/design-tokens'

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
    <div className={`${designTokens.spacing.containerNarrow} space-y-6`}>
      <Alert className={designTokens.alerts.warning}>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className={designTokens.typography.bodySmall}>
          <strong>Medical Disclaimer:</strong> This tool is for informational purposes only. 
          In case of emergency, call 911 immediately.
        </AlertDescription>
      </Alert>

      <Card className={designTokens.cards.clinical}>
        <CardHeader>
          <CardTitle className={`${designTokens.typography.h3} flex items-center gap-3`}>
            <div className={designTokens.iconContainers.primary}>
              <Stethoscope className="h-5 w-5" />
            </div>
            Medical Symptom Assessment
          </CardTitle>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={designTokens.typography.label}>Step {step} of {totalSteps}</span>
              <span className={`${designTokens.badges.status.inProgress}`}>
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className={designTokens.progress.barLarge}>
              <div 
                className={designTokens.progress.fill}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            
            {step === 1 && (
              <div className={designTokens.forms.formGroup}>
                <h3 className={`${designTokens.typography.h4} flex items-center gap-3 mb-4`}>
                  <div className={designTokens.iconContainers.warning}>
                    <Activity className="h-5 w-5" />
                  </div>
                  {t.forms.primarySymptomsLabel}
                </h3>
                
                <div>
                  <label className={designTokens.forms.label}>
                    {t.questions.mainConcern}
                  </label>
                  <Input
                    {...register('primarySymptom')}
                    placeholder={t.forms.primarySymptomPlaceholder}
                    className={errors.primarySymptom ? designTokens.forms.inputError : designTokens.forms.input}
                  />
                  {errors.primarySymptom && (
                    <p className={designTokens.forms.error}>{errors.primarySymptom.message}</p>
                  )}
                </div>

                <div>
                  <label className={designTokens.forms.label}>
                    {t.forms.describeSymptomsLabel}
                  </label>
                  <Textarea
                    {...register('description')}
                    placeholder={t.forms.descriptionPlaceholder}
                    rows={4}
                    className={errors.description ? designTokens.forms.inputError : designTokens.forms.textarea}
                  />
                  {errors.description && (
                    <p className={designTokens.forms.error}>{errors.description.message}</p>
                  )}
                </div>

                <div className={designTokens.forms.formRow}>
                  <div>
                    <label className={designTokens.forms.label}>
                      {t.forms.howLongSymptomsLabel}
                    </label>
                    <Select onValueChange={(value) => setValue('duration', value)}>
                      <SelectTrigger className={designTokens.forms.select}>
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
                    <label className={designTokens.forms.label}>
                      {t.questions.severity}
                    </label>
                    <Select onValueChange={(value) => setValue('severity', value as SymptomSeverity)}>
                      <SelectTrigger className={designTokens.forms.select}>
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
              <div className={designTokens.forms.formGroup}>
                <h3 className={`${designTokens.typography.h4} flex items-center gap-3 mb-4`}>
                  <div className={designTokens.iconContainers.secondary}>
                    <User className="h-5 w-5" />
                  </div>
                  {t.forms.personalInformationLabel}
                </h3>

                <div className={designTokens.forms.formRow}>
                  <div>
                    <label className={designTokens.forms.label}>{t.forms.ageLabel}</label>
                    <Input
                      type="number"
                      {...register('age', { valueAsNumber: true })}
                      min="1"
                      max="120"
                      className={errors.age ? designTokens.forms.inputError : designTokens.forms.input}
                    />
                    {errors.age && (
                      <p className={designTokens.forms.error}>{errors.age.message}</p>
                    )}
                  </div>

                  <div>
                    <label className={designTokens.forms.label}>{t.questions.gender}</label>
                    <Select onValueChange={(value) => setValue('gender', value as 'male' | 'female' | 'other' | 'prefer_not_to_say')}>
                      <SelectTrigger className={designTokens.forms.select}>
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
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        {...register('isPregnant')}
                        className={designTokens.forms.checkbox}
                      />
                      <span className={designTokens.typography.bodySmall}>Are you currently pregnant?</span>
                    </label>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className={designTokens.forms.formGroup}>
                <h3 className={`${designTokens.typography.h4} flex items-center gap-3 mb-4`}>
                  <div className={designTokens.iconContainers.info}>
                    <FileText className="h-5 w-5" />
                  </div>
                  Medical History
                </h3>

                <div>
                  <label className="flex items-center space-x-3 mb-4">
                    <input
                      type="checkbox"
                      {...register('hasChronicConditions')}
                      className={designTokens.forms.checkbox}
                    />
                    <span className={designTokens.typography.bodySmall}>Do you have any chronic medical conditions?</span>
                  </label>

                  {watchedValues.hasChronicConditions && (
                    <Textarea
                      {...register('chronicConditions')}
                      placeholder={t.forms.chronicConditionsPlaceholder}
                      rows={3}
                      className={designTokens.forms.textarea}
                    />
                  )}
                </div>

                <div>
                  <label className={designTokens.forms.label}>
                    {t.forms.medicationsLabel}
                  </label>
                  <Textarea
                    {...register('currentMedications')}
                    placeholder={t.forms.medicationsPlaceholder}
                    rows={3}
                    className={designTokens.forms.textarea}
                  />
                </div>

                <div>
                  <label className={designTokens.forms.label}>
                    {t.forms.allergiesLabel}
                  </label>
                  <Textarea
                    {...register('allergies')}
                    placeholder={t.forms.allergiesPlaceholder}
                    rows={2}
                    className={designTokens.forms.textarea}
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className={designTokens.forms.formGroup}>
                <h3 className={`${designTokens.typography.h4} mb-4`}>{t.forms.reviewSubmitLabel}</h3>
                
                <div className={`${designTokens.cards.neutral} p-4 space-y-3`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <span className={designTokens.typography.label}>{t.forms.primarySymptomField}:</span>
                      <p className={designTokens.typography.bodySmall}>{watchedValues.primarySymptom}</p>
                    </div>
                    <div>
                      <span className={designTokens.typography.label}>{t.forms.durationField}:</span>
                      <p className={designTokens.typography.bodySmall}>{watchedValues.duration}</p>
                    </div>
                    <div>
                      <span className={designTokens.typography.label}>{t.forms.severityField}:</span>
                      <p className={designTokens.typography.bodySmall}>{watchedValues.severity}</p>
                    </div>
                    <div>
                      <span className={designTokens.typography.label}>{t.forms.ageField}:</span>
                      <p className={designTokens.typography.bodySmall}>{watchedValues.age}</p>
                    </div>
                  </div>
                </div>

                <Alert className={designTokens.alerts.clinical}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className={designTokens.typography.caption}>
                    {MEDICAL_DISCLAIMER}
                  </AlertDescription>
                </Alert>
              </div>
            )}

            <div className="flex justify-between items-center pt-6 border-t border-slate-200">
              {step > 1 && (
                <Button 
                  type="button" 
                  onClick={prevStep}
                  className={designTokens.buttons.secondary}
                >
                  Previous
                </Button>
              )}
              
              {step < totalSteps ? (
                <Button 
                  type="button" 
                  onClick={nextStep} 
                  className={`${designTokens.buttons.primary} ml-auto`}
                >
                  Next Step
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className={`${isLoading ? designTokens.buttons.disabled : designTokens.buttons.success} ml-auto`}
                >
                  {isLoading ? 'Analyzing Symptoms...' : 'Get Medical Assessment'}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}