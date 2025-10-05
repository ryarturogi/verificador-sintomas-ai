'use client'

import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { medicalDesignTokens as designTokens } from '@/lib/design-tokens'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  text?: string
  subtext?: string
  showProgress?: boolean
  progress?: number
  className?: string
}

export function LoadingSpinner({ 
  size = 'medium', 
  text, 
  subtext, 
  showProgress = false, 
  progress = 0,
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6', 
    large: 'w-8 h-8'
  }

  const containerClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className={`${designTokens.iconContainers.primary} ${containerClasses[size]} flex items-center justify-center`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className={`${sizeClasses[size]} text-cyan-600`} />
        </motion.div>
      </div>
      
      {text && (
        <div className="text-center">
          <h3 className={`${designTokens.typography.h4} mb-1`}>
            {text}
          </h3>
          {subtext && (
            <p className={`${designTokens.typography.bodySecondary}`}>
              {subtext}
            </p>
          )}
        </div>
      )}
      
      {showProgress && (
        <div className="w-full max-w-xs">
          <div className={designTokens.progress.barLarge}>
            <motion.div 
              className={designTokens.progress.fill}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-center mt-2">
            <span className={`${designTokens.typography.caption}`}>
              {Math.round(progress)}% Complete
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

interface LoadingCardProps {
  title: string
  description?: string
  showSteps?: boolean
  steps?: string[]
  className?: string
}

export function LoadingCard({ 
  title, 
  description, 
  showSteps = false, 
  steps = [],
  className = ''
}: LoadingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`${designTokens.cards.primary} max-w-lg mx-auto ${className}`}
    >
      <div className={`${designTokens.spacing.md} text-center`}>
        <LoadingSpinner 
          size="medium" 
          text={title}
          subtext={description}
        />
        
        {showSteps && steps.length > 0 && (
          <div className="mt-6 space-y-2">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-center space-x-2"
              >
                <div className={`${designTokens.progress.loadingDot} ${
                  index === 0 ? 'bg-green-500' : 
                  index === 1 ? 'bg-cyan-500' : 
                  'bg-cyan-600'
                }`} />
                <span className={`${designTokens.typography.caption}`}>
                  {step}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
