'use client'

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
}

export function FilterChips({ items, onRemove, onClear, className }: FilterChipsProps) {
  const t = useTranslations('ui')

  if (items.length === 0) return null

  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)}>
      <span className="text-sm text-muted-foreground">{t('active-filters')}:</span>

      <div className="flex items-center gap-2 flex-wrap">
        {items.map((item) => (
          <Badge
            key={item.id}
            variant="secondary"
            className="pl-2 pr-1 py-1 gap-1 hover:bg-secondary/80 transition-colors"
          >
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
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
      </div>

      {items.length > 1 && onClear && (
        <Button variant="ghost" size="sm" onClick={onClear} className="h-7 text-xs">
          {t('clear-all')}
        </Button>
      )}
    </div>
  )
}
