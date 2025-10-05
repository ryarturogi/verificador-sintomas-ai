'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/language-context'
import { Doctor } from '@/types/consultation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface DoctorSelectionProps {
  onDoctorSelect: (doctor: Doctor) => void
}

/**
 * Component for selecting an AI doctor for consultation
 * Displays available doctors with their specialties and information
 */
export function DoctorSelection({ onDoctorSelect }: DoctorSelectionProps) {
  const { t } = useLanguage()
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all')

  // AI Doctor Agents with different medical specializations
  const doctors: Doctor[] = [
    {
      id: 'dr-henry',
      name: 'Dr. Henry (AI)',
      specialty: 'general_medicine',
      specialtyDisplayName: 'General Medicine AI',
      description: 'AI agent specialized in comprehensive health assessment and general medical advice',
      experience: 'AI-powered with medical knowledge base',
      isAvailable: true,
      responseTime: '2-3 minutes',
      rating: 4.9,
      consultationCount: 1250,
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'dr-floyd-miles',
      name: 'Dr. Floyd Miles (AI)',
      specialty: 'cardiology',
      specialtyDisplayName: 'Cardiology AI',
      description: 'AI agent specialized in heart health, cardiovascular conditions, and cardiac symptoms',
      experience: 'AI-powered with cardiology expertise',
      isAvailable: true,
      responseTime: '3-5 minutes',
      rating: 4.8,
      consultationCount: 890,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'dr-mckinney',
      name: 'Dr. McKinney (AI)',
      specialty: 'neurology',
      specialtyDisplayName: 'Neurology AI',
      description: 'AI agent specialized in brain and nervous system conditions, headaches, and neurological symptoms',
      experience: 'AI-powered with neurology specialization',
      isAvailable: true,
      responseTime: '4-6 minutes',
      rating: 4.7,
      consultationCount: 650,
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'dr-jacob',
      name: 'Dr. Jacob (AI)',
      specialty: 'pediatrics',
      specialtyDisplayName: 'Pediatrics AI',
      description: 'AI agent specialized in child health, developmental concerns, and pediatric conditions',
      experience: 'AI-powered with pediatric expertise',
      isAvailable: true,
      responseTime: '2-4 minutes',
      rating: 4.9,
      consultationCount: 1100,
      avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'dr-warren',
      name: 'Dr. Warren (AI)',
      specialty: 'internal_medicine',
      specialtyDisplayName: 'Internal Medicine AI',
      description: 'AI agent specialized in adult medicine, chronic conditions, and complex medical cases',
      experience: 'AI-powered with internal medicine expertise',
      isAvailable: true,
      responseTime: '3-5 minutes',
      rating: 4.8,
      consultationCount: 980,
      avatar: 'https://images.unsplash.com/photo-1594824609072-57c2d2bb8b86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    }
  ]

  const specialties = [
    { value: 'all', label: 'All AI Specialties' },
    { value: 'general_medicine', label: 'General Medicine AI' },
    { value: 'cardiology', label: 'Cardiology AI' },
    { value: 'neurology', label: 'Neurology AI' },
    { value: 'pediatrics', label: 'Pediatrics AI' },
    { value: 'internal_medicine', label: 'Internal Medicine AI' }
  ]

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
              onClick={() => setSelectedSpecialty(specialty.value)}
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
                  fill
                  className="object-cover"
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
                <span className="text-gray-500">Response time:</span>
                <span className="font-medium">{doctor.responseTime}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Rating:</span>
                <div className="flex items-center space-x-1">
                  <span className="font-medium">{doctor.rating}</span>
                  <span className="text-yellow-400">★</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Consultations:</span>
                <span className="font-medium">{doctor.consultationCount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  doctor.isAvailable ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className="text-sm text-gray-500">
                  {doctor.isAvailable ? 'Available' : 'Busy'}
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
