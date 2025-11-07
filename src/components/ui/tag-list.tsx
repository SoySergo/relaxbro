'use client'

import { useState } from 'react'
import { Badge } from './badge'
import { Button } from './button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface TagListProps {
  tags: string[]
  max?: number
  variant?: 'default' | 'compact'
  className?: string
  colorful?: boolean
}

const tagColors = [
  'bg-blue-100 text-blue-700 hover:bg-blue-200',
  'bg-green-100 text-green-700 hover:bg-green-200',
  'bg-purple-100 text-purple-700 hover:bg-purple-200',
  'bg-orange-100 text-orange-700 hover:bg-orange-200',
  'bg-pink-100 text-pink-700 hover:bg-pink-200',
  'bg-cyan-100 text-cyan-700 hover:bg-cyan-200',
]

export function TagList({
  tags,
  max = 5,
  variant = 'default',
  className,
  colorful = false,
}: TagListProps) {
  const t = useTranslations('ui')
  const [showAll, setShowAll] = useState(false)

  if (tags.length === 0) return null

  const displayTags = showAll ? tags : tags.slice(0, max)
  const hasMore = tags.length > max

  const getTagColor = (index: number) => {
    if (!colorful) return undefined
    return tagColors[index % tagColors.length]
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex flex-wrap gap-1.5">
        {displayTags.map((tag, index) => (
          <Badge
            key={tag}
            variant={colorful ? 'secondary' : 'outline'}
            className={cn(
              variant === 'compact' && 'text-xs px-2 py-0.5',
              colorful && getTagColor(index),
            )}
          >
            {tag}
          </Badge>
        ))}
      </div>

      {hasMore && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          className="h-6 text-xs"
        >
          {showAll ? (
            <>
              {t('show-less')}
              <ChevronUp className="ml-1 h-3 w-3" />
            </>
          ) : (
            <>
              {t('show-more')} (+{tags.length - max})
              <ChevronDown className="ml-1 h-3 w-3" />
            </>
          )}
        </Button>
      )}
    </div>
  )
}
