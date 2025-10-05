import { cn } from '@/lib/utils'

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  className?: string
  children: React.ReactNode
}

const sizeClasses = {
  xs: 'heading-xs',
  sm: 'heading-sm',
  md: 'heading-md', 
  lg: 'heading-lg',
  xl: 'heading-xl',
  '2xl': 'heading-2xl',
  '3xl': 'heading-3xl'
}

export function Heading({ 
  level = 1, 
  size = 'xl', 
  className, 
  children 
}: HeadingProps) {
  const Component = `h${level}` as keyof React.JSX.IntrinsicElements
  
  return (
    <Component 
      className={cn(sizeClasses[size], className)}
    >
      {children}
    </Component>
  )
}

// Common heading variants
export function PageTitle({ className, children }: Omit<HeadingProps, 'level' | 'size'>) {
  return (
    <Heading level={1} size="xl" className={cn("text-gray-900", className)}>
      {children}
    </Heading>
  )
}

export function SectionTitle({ className, children }: Omit<HeadingProps, 'level' | 'size'>) {
  return (
    <Heading level={2} size="lg" className={cn("text-gray-900", className)}>
      {children}
    </Heading>
  )
}

export function CardTitle({ className, children }: Omit<HeadingProps, 'level' | 'size'>) {
  return (
    <Heading level={3} size="md" className={cn("text-gray-900", className)}>
      {children}
    </Heading>
  )
}
