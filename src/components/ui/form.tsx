import { Input } from './input'
import { Textarea } from './textarea'
import { Button } from './button'
import { Icon } from './icon'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function FormField({ label, error, required, children, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="form-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="form-error">{error}</p>}
    </div>
  )
}

interface PasswordInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function PasswordInput({ 
  value, 
  onChange, 
  placeholder = "Enter password", 
  disabled = false,
  className 
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn("form-input pr-10", className)}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        disabled={disabled}
      >
        {showPassword ? <Icon icon={EyeOff} size="sm" /> : <Icon icon={Eye} size="sm" />}
      </button>
    </div>
  )
}

interface FormActionsProps {
  onCancel?: () => void
  onSave?: () => void
  isLoading?: boolean
  cancelText?: string
  saveText?: string
  className?: string
}

export function FormActions({ 
  onCancel, 
  onSave, 
  isLoading = false, 
  cancelText = "Cancel",
  saveText = "Save",
  className 
}: FormActionsProps) {
  return (
    <div className={cn("flex space-x-2", className)}>
      {onCancel && (
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          {cancelText}
        </Button>
      )}
      {onSave && (
        <Button onClick={onSave} disabled={isLoading}>
          {isLoading ? "Saving..." : saveText}
        </Button>
      )}
    </div>
  )
}
