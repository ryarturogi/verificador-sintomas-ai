import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconProps {
  icon: LucideIcon
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  xs: 'icon-xs',
  sm: 'icon-sm', 
  md: 'icon-md',
  lg: 'icon-lg',
  xl: 'icon-xl'
}

export function Icon({ icon: IconComponent, size = 'sm', className }: IconProps) {
  return (
    <IconComponent 
      className={cn(sizeClasses[size], className)} 
    />
  )
}

// Common icon components for frequently used icons
export function IconButton({ 
  icon: IconComponent, 
  size = 'sm', 
  className,
  ...props 
}: IconProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button 
      className={cn("btn-icon", sizeClasses[size], className)}
      {...props}
    >
      <IconComponent className={cn(sizeClasses[size])} />
    </button>
  )
}
