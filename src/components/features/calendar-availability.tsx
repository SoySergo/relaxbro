'use client'

import * as React from 'react'
import { useTranslations } from 'next-intl'
import { Calendar } from '@/components/ui/calendar'
import { PriceDisplay } from '@/components/ui/price-display'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export interface AvailabilitySlot {
  date: Date
  available: boolean
  slots: number // количество доступных мест
  price: number
  currency?: 'EUR' | 'USD' | 'RUB'
}

interface CalendarAvailabilityProps {
  availableDates: AvailabilitySlot[]
  onDateSelect: (slot: AvailabilitySlot | undefined) => void
  selectedDate?: Date
  className?: string
}

export function CalendarAvailability({
  availableDates,
  onDateSelect,
  selectedDate,
  className,
}: CalendarAvailabilityProps) {
  const t = useTranslations('activities.common')

  const getAvailabilityForDate = (date: Date): AvailabilitySlot | undefined => {
    return availableDates.find(
      (slot) => slot.date.toDateString() === date.toDateString()
    )
  }

  const getAvailabilityStatus = (slots: number): 'available' | 'low' | 'unavailable' => {
    if (slots === 0) return 'unavailable'
    if (slots <= 3) return 'low'
    return 'available'
  }

  const getStatusColor = (status: 'available' | 'low' | 'unavailable') => {
    switch (status) {
      case 'available':
        return 'bg-green-100 hover:bg-green-200 text-green-900 dark:bg-green-900/20 dark:text-green-100 border-green-500'
      case 'low':
        return 'bg-yellow-100 hover:bg-yellow-200 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-100 border-yellow-500'
      case 'unavailable':
        return 'bg-gray-100 text-gray-400 dark:bg-gray-900/20 dark:text-gray-600 cursor-not-allowed'
    }
  }

  const modifiers = {
    available: availableDates
      .filter((slot) => slot.available && slot.slots > 3)
      .map((slot) => slot.date),
    low: availableDates
      .filter((slot) => slot.available && slot.slots > 0 && slot.slots <= 3)
      .map((slot) => slot.date),
    unavailable: availableDates
      .filter((slot) => !slot.available || slot.slots === 0)
      .map((slot) => slot.date),
  }

  return (
    <div className={cn('space-y-4', className)}>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          const slot = date ? getAvailabilityForDate(date) : undefined
          onDateSelect(slot)
        }}
        disabled={(date) => {
          const slot = getAvailabilityForDate(date)
          return !slot || !slot.available || slot.slots === 0
        }}
        modifiers={modifiers}
        modifiersClassNames={{
          available: getStatusColor('available'),
          low: getStatusColor('low'),
          unavailable: getStatusColor('unavailable'),
        }}
        // Remove custom Day component as it's causing issues with react-day-picker v9
        // The modifiers and modifiersClassNames handle the visual styling
      />

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500" />
          <span>{t('availability-available')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-500" />
          <span>{t('availability-low')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-300" />
          <span>{t('availability-unavailable')}</span>
        </div>
      </div>

      {/* Selected Date Info */}
      {selectedDate && (() => {
        const slot = getAvailabilityForDate(selectedDate)
        if (!slot) return null

        return (
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">
              {selectedDate.toLocaleDateString('ru-RU', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </h4>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {t('slots-left', { count: slot.slots })}
              </div>
              <PriceDisplay
                amount={slot.price}
                currency={slot.currency || 'EUR'}
                size="lg"
                className="font-bold"
              />
            </div>
          </div>
        )
      })()}
    </div>
  )
}
