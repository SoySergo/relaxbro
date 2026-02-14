'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'

export type DurationType = 'short' | 'half-day' | 'full-day' | 'multi-day'

interface DurationFilterProps {
  value: DurationType[]
  onChange: (value: DurationType[]) => void
  className?: string
}

export function DurationFilter({ value, onChange, className }: DurationFilterProps) {
  const t = useTranslations('activities.filters')
  const tDesc = useTranslations('activities.filters.duration-descriptions')

  const durationOptions: Array<{ value: DurationType; labelKey: string; descKey: string }> = [
    {
      value: 'short',
      labelKey: 'short',
      descKey: 'short',
    },
    {
      value: 'half-day',
      labelKey: 'half-day',
      descKey: 'half-day',
    },
    {
      value: 'full-day',
      labelKey: 'full-day',
      descKey: 'full-day',
    },
    {
      value: 'multi-day',
      labelKey: 'multi-day',
      descKey: 'multi-day',
    },
  ]

  const handleToggle = (duration: DurationType) => {
    if (value.includes(duration)) {
      onChange(value.filter((d) => d !== duration))
    } else {
      onChange([...value, duration])
    }
  }

  const selectedCount = value.length

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <Label className="text-sm font-medium">{t('duration')}</Label>
        </div>
        {selectedCount > 0 && (
          <Badge variant="secondary" className="text-xs">
            {selectedCount}
          </Badge>
        )}
      </div>
      <div className="space-y-3">
        {durationOptions.map((option) => (
          <div key={option.value} className="flex items-start space-x-3">
            <Checkbox
              id={`duration-${option.value}`}
              checked={value.includes(option.value)}
              onCheckedChange={() => handleToggle(option.value)}
            />
            <div className="grid gap-1 leading-none">
              <label
                htmlFor={`duration-${option.value}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {t(option.labelKey)}
              </label>
              <p className="text-xs text-muted-foreground">{tDesc(option.descKey)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
