'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useLanguage } from '@/contexts/language-context'
import { Doctor } from '@/types/consultation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface DoctorSelectionProps {
  onDoctorSelect: (doctor: Doctor) => void
  preSelectedAgent?: string | null
}

/**
 * Component for selecting an AI doctor for consultation
 * Displays available doctors with their specialties and information
 */
export function DoctorSelection({ onDoctorSelect, preSelectedAgent }: DoctorSelectionProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all')

  // Function to update URL when specialty changes
  const updateUrlWithSpecialty = (specialty: string) => {
    const currentParams = new URLSearchParams(searchParams.toString())
    
    if (specialty === 'all') {
      currentParams.delete('agent')
    } else {
      // Map specialty back to agent type
      const specialtyToAgentMap: { [key: string]: string } = {
        'general_medicine': 'agente-general',
        'cardiology': 'agente-cardiologia',
        'neurology': 'agente-neurologia',
        'pediatrics': 'agente-pediatria',
        'internal_medicine': 'agente-medicina-interna'
      }
      
      const agentType = specialtyToAgentMap[specialty]
      if (agentType) {
        currentParams.set('agent', agentType)
      }
    }
    
    const newUrl = currentParams.toString() 
      ? `/consultation?${currentParams.toString()}`
      : '/consultation'
    
    router.replace(newUrl, { scroll: false })
  }

  // AI Doctor Agents with different medical specializations
  const doctors: Doctor[] = [
    {
      id: 'dr-henry',
      name: 'Dr. Henry (AI)',
      specialty: 'general_medicine',
      specialtyDisplayName: t.homepage.aiGeneralMedicine,
      description: t.doctorSelection.specializedInComprehensive,
      experience: t.doctorSelection.aiPoweredWithKnowledge,
      isAvailable: true,
      responseTime: '2-3 minutes',
      rating: 4.9,
      consultationCount: 1250,
      avatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'dr-floyd-miles',
      name: 'Dr. Floyd Miles (AI)',
      specialty: 'cardiology',
      specialtyDisplayName: t.homepage.aiCardiology,
      description: t.doctorSelection.specializedInHeartHealth,
      experience: t.doctorSelection.aiPoweredWithCardiology,
      isAvailable: true,
      responseTime: '3-5 minutes',
      rating: 4.8,
      consultationCount: 890,
      avatar: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'dr-mckinney',
      name: 'Dr. McKinney (AI)',
      specialty: 'neurology',
      specialtyDisplayName: t.homepage.aiNeurology,
      description: t.doctorSelection.specializedInBrainConditions,
      experience: t.doctorSelection.aiPoweredWithNeurology,
      isAvailable: true,
      responseTime: '4-6 minutes',
      rating: 4.7,
      consultationCount: 650,
      avatar: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'dr-jacob',
      name: 'Dr. Jacob (AI)',
      specialty: 'pediatrics',
      specialtyDisplayName: t.homepage.aiPediatrics,
      description: t.doctorSelection.specializedInChildHealth,
      experience: t.doctorSelection.aiPoweredWithPediatric,
      isAvailable: true,
      responseTime: '2-4 minutes',
      rating: 4.9,
      consultationCount: 1100,
      avatar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'dr-warren',
      name: 'Dr. Warren (AI)',
      specialty: 'internal_medicine',
      specialtyDisplayName: t.homepage.internalMedicine,
      description: t.doctorSelection.specializedInAdultMedicine,
      experience: t.doctorSelection.aiPoweredWithInternal,
      isAvailable: true,
      responseTime: '3-5 minutes',
      rating: 4.8,
      consultationCount: 980,
      avatar: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    }
  ]

  const specialties = [
    { value: 'all', label: t.doctorSelection.allSpecialties },
    { value: 'general_medicine', label: t.homepage.aiGeneralMedicine },
    { value: 'cardiology', label: t.homepage.aiCardiology },
    { value: 'neurology', label: t.homepage.aiNeurology },
    { value: 'pediatrics', label: t.homepage.aiPediatrics },
    { value: 'internal_medicine', label: t.homepage.internalMedicine }
  ]

  // Handle pre-selected agent
  useEffect(() => {
    if (preSelectedAgent) {
      // Map agent types to specialties
      const agentToSpecialtyMap: { [key: string]: string } = {
        'agente-general': 'general_medicine',
        'agente-cardiologia': 'cardiology',
        'agente-neurologia': 'neurology',
        'agente-pediatria': 'pediatrics',
        'agente-medicina-interna': 'internal_medicine',
        'agente-psiquiatria': 'general_medicine', // Map to general for now
        'radiologia': 'general_medicine', // Map to general for now
        'patologia': 'general_medicine' // Map to general for now
      }
      
      const specialty = agentToSpecialtyMap[preSelectedAgent]
      if (specialty) {
        setSelectedSpecialty(specialty)
      }
    }
  }, [preSelectedAgent])

  const filteredDoctors = selectedSpecialty === 'all' 
    ? doctors 
    : doctors.filter(doctor => doctor.specialty === selectedSpecialty)

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t.consultation?.chooseSpecialty || 'Choose an AI Doctor Specialty'}
        </h2>
        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty) => (
            <button
              key={specialty.value}
              onClick={() => {
                setSelectedSpecialty(specialty.value)
                updateUrlWithSpecialty(specialty.value)
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedSpecialty === specialty.value
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {specialty.label}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 ring-2 ring-cyan-200 relative">
                <Image 
                  src={doctor.avatar || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'} 
                  alt={doctor.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                  sizes="64px"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
              <p className="text-cyan-600 font-medium">{doctor.specialtyDisplayName}</p>
            </div>

            <div className="space-y-3 mb-4">
              <p className="text-sm text-gray-600">{doctor.description}</p>
              <p className="text-sm text-gray-500">{doctor.experience}</p>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{t.doctorSelection.responseTime}</span>
                <span className="font-medium">{doctor.responseTime}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{t.doctorSelection.rating}</span>
                <div className="flex items-center space-x-1">
                  <span className="font-medium">{doctor.rating}</span>
                  <span className="text-yellow-400">★</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{t.doctorSelection.consultations}</span>
                <span className="font-medium">{doctor.consultationCount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  doctor.isAvailable ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className="text-sm text-gray-500">
                  {doctor.isAvailable ? t.doctorSelection.available : t.doctorSelection.busy}
                </span>
              </div>
              
              <Button
                onClick={() => onDoctorSelect(doctor)}
                disabled={!doctor.isAvailable}
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                {doctor.isAvailable 
                  ? (t.consultation?.select || 'Select')
                  : (t.consultation?.busy || 'Busy')
                }
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {t.consultation?.noDoctorsFound || 'No doctors found for this specialty'}
          </p>
        </div>
      )}
    </div>
  )
}
