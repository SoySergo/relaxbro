'use client'

import { useTranslations } from 'next-intl'
import { Clock } from 'lucide-react'
import { Badge } from './badge'
import { cn } from '@/lib/utils'

interface DurationBadgeProps {
  value: number
  unit: 'hours' | 'days'
  variant?: 'default' | 'compact'
  className?: string
}

export function DurationBadge({
  value,
  unit,
  variant = 'default',
  className,
}: DurationBadgeProps) {
  const t = useTranslations('activities.common')

  const getDurationText = () => {
    // Compact variant
    if (variant === 'compact') {
      if (unit === 'hours') {
        return `${value}${t('hour-short')}`
      }
      return `${value}${t('day-short')}`
    }

    // Full variant
    if (unit === 'hours') {
      // Handle special case for full day
      if (value >= 8 && value <= 10) {
        return t('full-day')
      }

      // Pluralization for hours
      if (value === 1) {
        return `${value} ${t('hour')}`
      }
      if (value >= 2 && value <= 4) {
        return `${value} ${t('hours-few')}`
      }
      return `${value} ${t('hours')}`
    }

    // Days
    if (value === 1) {
      return t('full-day')
    }
    if (value >= 2 && value <= 4) {
      return `${value} ${t('days-few')}`
    }
    return `${value} ${t('days')}`
  }

  return (
    <Badge variant="secondary" className={cn('flex items-center gap-1', className)}>
      <Clock className="h-3 w-3" />
      <span>{getDurationText()}</span>
    </Badge>
  )
}
