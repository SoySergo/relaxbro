'use client'

import * as React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ru, enUS, es } from 'date-fns/locale'

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  disabled?: boolean
  placeholder?: string
  locale?: 'ru' | 'en' | 'es'
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[]
}

const locales = {
  ru,
  en: enUS,
  es,
}

export function DatePicker({
  value,
  onChange,
  disabled,
  placeholder,
  locale = 'ru',
  minDate,
  maxDate,
  disabledDates,
}: DatePickerProps) {
  const t = useTranslations('common')
  const [open, setOpen] = React.useState(false)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(locale === 'ru' ? 'ru-RU' : locale === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    if (disabledDates && disabledDates.some((d) => d.toDateString() === date.toDateString()))
      return true
    return false
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? formatDate(value) : (placeholder || t('select-date', { default: 'Выберите дату' }))}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange?.(date)
            setOpen(false)
          }}
          disabled={(date) => isDateDisabled(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

// Date Range Picker
interface DateRangePickerProps {
  value?: { from?: Date; to?: Date }
  onChange?: (range: { from?: Date; to?: Date } | undefined) => void
  disabled?: boolean
  placeholder?: string
  locale?: 'ru' | 'en' | 'es'
  minDate?: Date
  maxDate?: Date
}

export function DateRangePicker({
  value,
  onChange,
  disabled,
  placeholder,
  locale = 'ru',
  minDate,
  maxDate,
}: DateRangePickerProps) {
  const t = useTranslations('common')
  const [open, setOpen] = React.useState(false)

  const formatDateRange = (range: { from?: Date; to?: Date }) => {
    if (!range.from) return placeholder || t('select-date-range', { default: 'Выберите период' })
    if (!range.to) return `${range.from.toLocaleDateString(locale)}`
    return `${range.from.toLocaleDateString(locale)} - ${range.to.toLocaleDateString(locale)}`
  }

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return false
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !value?.from && 'text-muted-foreground'
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatDateRange(value || {})}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={value}
          onSelect={(range) => {
            onChange?.(range)
            if (range?.from && range?.to) {
              setOpen(false)
            }
          }}
          disabled={(date) => isDateDisabled(date)}
          initialFocus
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}
