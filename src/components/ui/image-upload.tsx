'use client'

import { useState, useRef, useCallback } from 'react'
import { Upload, Image as ImageIcon, X, FileText, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageUploadProps {
  onImageSelect: (imageData: {
    base64: string
    filename: string
    size: number
    type: string
  }) => void
  onRemove?: () => void
  acceptedTypes?: string[]
  maxSize?: number
  imageType?: string
  currentImage?: {
    base64: string
    filename: string
    size: number
    type: string
  } | null
  placeholder?: string
  description?: string
}

export function ImageUpload({
  onImageSelect,
  onRemove,
  acceptedTypes = ['image/*'],
  maxSize = 10 * 1024 * 1024, // 10MB
  imageType = 'general',
  currentImage,
  placeholder = 'Upload medical image',
  description = 'Drag and drop your medical image here, or click to browse'
}: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback(async (file: File) => {
    setError('')
    setIsLoading(true)

    // Check file size
    if (file.size > maxSize) {
      setError(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`)
      setIsLoading(false)
      return
    }

    // Check file type
    const isValidType = acceptedTypes.some(type => {
      if (type === 'image/*') {
        return file.type.startsWith('image/')
      }
      return file.type === type
    })

    if (!isValidType) {
      setError(`File type not supported. Please upload: ${acceptedTypes.join(', ')}`)
      setIsLoading(false)
      return
    }

    try {
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result as string
        onImageSelect({
          base64,
          filename: file.name,
          size: file.size,
          type: file.type
        })
        setIsLoading(false)
      }
      reader.onerror = () => {
        setError('Failed to read file')
        setIsLoading(false)
      }
      reader.readAsDataURL(file)
    } catch {
      setError('Failed to process file')
      setIsLoading(false)
    }
  }, [onImageSelect, maxSize, acceptedTypes])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      processFile(files[0])
    }
  }, [processFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      processFile(files[0])
    }
  }, [processFile])

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    setError('')
    onRemove?.()
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getImageTypeDisplay = (type: string): string => {
    const typeMap: Record<string, string> = {
      'mri': 'MRI Scan',
      'ct_scan': 'CT Scan',
      'xray': 'X-Ray',
      'ultrasound': 'Ultrasound',
      'pathology': 'Pathology Sample',
      'general': 'Medical Image'
    }
    return typeMap[type] || 'Medical Image'
  }

  if (currentImage) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white rounded-xl border-2 border-gray-200 p-4"
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-lg flex items-center justify-center overflow-hidden">
              {currentImage.type.startsWith('image/') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={currentImage.base64}
                  alt={currentImage.filename}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FileText className="h-8 w-8 text-cyan-600" />
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {currentImage.filename}
            </h4>
            <p className="text-xs text-gray-500">
              {formatFileSize(currentImage.size)} • {getImageTypeDisplay(imageType)}
            </p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                <ImageIcon className="h-3 w-3 mr-1" />
                Ready for analysis
              </span>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-3">
      <motion.div
        className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 cursor-pointer ${
          isDragOver
            ? 'border-cyan-500 bg-cyan-50'
            : error
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 hover:border-cyan-400 hover:bg-cyan-50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="text-center">
          <motion.div
            className={`mx-auto w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
              error ? 'bg-red-100' : 'bg-cyan-100'
            }`}
            animate={isLoading ? { rotate: 360 } : {}}
            transition={isLoading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
          >
            {error ? (
              <AlertCircle className="h-6 w-6 text-red-600" />
            ) : isLoading ? (
              <Upload className="h-6 w-6 text-cyan-600" />
            ) : (
              <Upload className="h-6 w-6 text-cyan-600" />
            )}
          </motion.div>

          <h3 className="text-sm font-medium text-gray-900 mb-1">
            {isLoading ? 'Processing...' : placeholder}
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            {isLoading ? 'Please wait while we process your image' : description}
          </p>

          <div className="text-xs text-gray-400 space-y-1">
            <p>Supported formats: JPG, PNG, DICOM</p>
            <p>Max size: {Math.round(maxSize / (1024 * 1024))}MB</p>
            <p>Image type: {getImageTypeDisplay(imageType)}</p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 border border-red-200 rounded-lg p-3"
          >
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}