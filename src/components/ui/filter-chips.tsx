'use client'

import { useState } from 'react'
import { Badge } from './badge'
import { Button } from './button'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

export interface FilterChipItem {
  id: string
  label: string
  icon?: React.ReactNode
}

interface FilterChipsProps {
  items: FilterChipItem[]
  onRemove: (id: string) => void
  onClear?: () => void
  className?: string
  maxVisible?: number
}

export function FilterChips({
  items,
  onRemove,
  onClear,
  className,
  maxVisible = 5,
}: FilterChipsProps) {
  const t = useTranslations('ui')
  const [showAll, setShowAll] = useState(false)

  if (items.length === 0) return null

  const visibleItems = showAll ? items : items.slice(0, maxVisible)
  const hiddenCount = items.length - maxVisible

  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)}>
      <span className="text-sm text-muted-foreground">{t('active-filters')}:</span>

      <div className="flex items-center gap-2 flex-wrap">
        {visibleItems.map((item) => (
          <Badge
            key={item.id}
            variant="secondary"
            className="pl-2 pr-1 py-1 gap-1 hover:bg-secondary/80 transition-colors"
          >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
            <button
              onClick={() => onRemove(item.id)}
              className="ml-1 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
              aria-label={`Remove ${item.label} filter`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        {!showAll && hiddenCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(true)}
            className="h-7 text-xs"
          >
            +{hiddenCount} {t('more')}
          </Button>
        )}

        {showAll && items.length > maxVisible && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(false)}
            className="h-7 text-xs"
          >
            {t('show-less')}
          </Button>
        )}
      </div>

      {items.length > 1 && onClear && (
        <Button variant="ghost" size="sm" onClick={onClear} className="h-7 text-xs">
          {t('clear-all')}
        </Button>
      )}
    </div>
  )
}
