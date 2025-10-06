'use client'

import { ReactNode } from 'react'
import { Button } from './button'
import { Card } from './card'
import { X, AlertTriangle } from 'lucide-react'

interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'warning' | 'danger'
  icon?: ReactNode
  loading?: boolean
}

/**
 * Custom confirmation dialog component
 * Provides a modal-like experience for user confirmations
 */
export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  icon,
  loading = false
}: ConfirmationDialogProps) {
  if (!isOpen) return null

  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
        return {
          iconColor: 'text-amber-600',
          iconBg: 'bg-amber-100',
          confirmButton: 'bg-amber-600 hover:bg-amber-700 text-white'
        }
      case 'danger':
        return {
          iconColor: 'text-red-600',
          iconBg: 'bg-red-100',
          confirmButton: 'bg-red-600 hover:bg-red-700 text-white'
        }
      default:
        return {
          iconColor: 'text-blue-600',
          iconBg: 'bg-blue-100',
          confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white'
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <Card className="relative z-10 w-full max-w-md mx-4 p-0 overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start space-x-4">
            {/* Icon */}
            <div className={`flex-shrink-0 w-10 h-10 rounded-full ${styles.iconBg} flex items-center justify-center`}>
              {icon || (
                <AlertTriangle className={`w-5 h-5 ${styles.iconColor}`} />
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={loading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Actions */}
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              onClick={onClose}
              variant="outline"
              disabled={loading}
              className="px-4 py-2"
            >
              {cancelText}
            </Button>
            <Button
              onClick={onConfirm}
              disabled={loading}
              className={`px-4 py-2 ${styles.confirmButton} ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                confirmText
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

/**
 * Specialized confirmation dialog for consultation exit
 */
export function ConsultationExitDialog({
  isOpen,
  onClose,
  onConfirm,
  loading = false
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading?: boolean
}) {
  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="End Current Consultation?"
      description="You have an active consultation. Ending it will save your conversation to your consultation history. Are you sure you want to continue?"
      confirmText="End Consultation"
      cancelText="Continue Consultation"
      variant="warning"
      loading={loading}
    />
  )
}
