'use client'

import { useTranslations } from 'next-intl'
import { MapPin } from 'lucide-react'
import { Badge } from './badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'
import { cn } from '@/lib/utils'

interface MeetingPointBadgeProps {
  address: string
  isFlexible?: boolean
  variant?: 'compact' | 'full'
  className?: string
}

export function MeetingPointBadge({
  address,
  isFlexible = false,
  variant = 'compact',
  className,
}: MeetingPointBadgeProps) {
  const t = useTranslations('activities.common')

  const getDisplayText = () => {
    if (isFlexible) {
      return t('meeting-point-flexible')
    }

    if (variant === 'compact') {
      // Extract city/area from address (simple logic)
      const parts = address.split(',')
      return parts[0]?.trim() || address
    }

    // Full variant - truncate if too long
    if (address.length > 40) {
      return `${address.slice(0, 40)}...`
    }

    return address
  }

  const displayText = getDisplayText()
  const shouldShowTooltip = variant === 'compact' || address.length > 40

  const badgeContent = (
    <Badge variant="secondary" className={cn('flex items-center gap-1', className)}>
      <MapPin className="h-3 w-3" />
      <span>{displayText}</span>
      {isFlexible && (
        <Badge variant="default" className="ml-1 text-xs">
          {t('flexible')}
        </Badge>
      )}
    </Badge>
  )

  if (shouldShowTooltip && !isFlexible) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{badgeContent}</TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">{address}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return badgeContent
}
