import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Icon } from './icon'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  iconColor?: string
  valueColor?: 'default' | 'success' | 'warning' | 'danger'
  className?: string
}

const valueColorClasses = {
  default: 'stats-number',
  success: 'stats-number-success', 
  warning: 'stats-number-warning',
  danger: 'stats-number-danger'
}

export function StatCard({ 
  title, 
  value, 
  icon, 
  iconColor = 'text-cyan-600',
  valueColor = 'default',
  className 
}: StatCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={valueColorClasses[valueColor]}>{value}</p>
          </div>
          <Icon icon={icon} size="lg" className={iconColor} />
        </div>
      </CardContent>
    </Card>
  )
}

interface StatsGridProps {
  stats: StatCardProps[]
  className?: string
}

export function StatsGrid({ stats, className }: StatsGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
