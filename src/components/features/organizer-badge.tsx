'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OrganizerBadgeProps {
  name: string
  avatar: string
  type: 'business' | 'individual'
  verified?: boolean
  size?: 'sm' | 'md'
  className?: string
  onClick?: () => void
}

export function OrganizerBadge({
  name,
  avatar,
  type,
  verified = false,
  size = 'sm',
  className,
  onClick,
}: OrganizerBadgeProps) {
  const avatarSize = size === 'sm' ? 'h-6 w-6' : 'h-8 w-8'
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm'

  // Truncate long names
  const displayName = name.length > 20 ? `${name.slice(0, 20)}...` : name

  // Get initials for fallback
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-muted/50  py-1',
        onClick && 'cursor-pointer hover:bg-muted transition-colors',
        className,
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <Avatar className={avatarSize}>
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback className={textSize}>{initials}</AvatarFallback>
      </Avatar>

      <div className="flex items-center gap-1">
        <span className={cn('font-medium', textSize)}>{displayName}</span>

        {verified && (
          <CheckCircle2 className="h-3.5 w-3.5 text-primary" aria-label="Verified" />
        )}
      </div>

      {size === 'md' && type === 'business' && (
        <Badge variant="secondary" className="text-[10px] px-1 py-0">
          Business
        </Badge>
      )}
    </div>
  )
}
