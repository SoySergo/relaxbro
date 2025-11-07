'use client'

import { useTranslations } from 'next-intl'
import { Users } from 'lucide-react'
import { Badge } from './badge'
import { cn } from '@/lib/utils'

interface GroupSizeBadgeProps {
  min?: number
  max: number
  type?: 'group' | 'private'
  className?: string
}

export function GroupSizeBadge({ min, max, type, className }: GroupSizeBadgeProps) {
  const t = useTranslations('activities.common')

  const getGroupSizeText = () => {
    // Private tour
    if (type === 'private') {
      return t('private')
    }

    // Group tour with large capacity
    if (max > 10 && !min) {
      return t('group')
    }

    // Range
    if (min && max) {
      return t('group-range', { min, max })
    }

    // Up to max
    return t('up-to', { count: max })
  }

  return (
    <Badge variant="outline" className={cn('flex items-center gap-1', className)}>
      <Users className="h-3 w-3" />
      <span>{getGroupSizeText()}</span>
    </Badge>
  )
}
