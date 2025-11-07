'use client'

import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface PriceDisplayProps {
  amount: number
  currency?: 'EUR' | 'USD' | 'RUB'
  prefix?: string // 'от', '~', etc.
  suffix?: string // 'на человека', '/ чел', etc.
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showCurrency?: boolean
}

const currencySymbols = {
  EUR: '€',
  USD: '$',
  RUB: '₽',
} as const

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg font-semibold',
} as const

export function PriceDisplay({
  amount,
  currency = 'EUR',
  prefix,
  suffix,
  size = 'md',
  className,
  showCurrency = true,
}: PriceDisplayProps) {
  const t = useTranslations('activities.common')

  const formatPrice = (value: number, curr: 'EUR' | 'USD' | 'RUB') => {
    const symbol = currencySymbols[curr]

    // Format number with proper thousands separator
    const formatter = new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })

    const formattedNumber = formatter.format(value)

    if (!showCurrency) {
      return formattedNumber
    }

    // For EUR and USD, symbol before number
    // For RUB, symbol after number
    if (curr === 'RUB') {
      return `${formattedNumber}${symbol}`
    }

    return `${symbol}${formattedNumber}`
  }

  const formattedPrice = formatPrice(amount, currency)

  return (
    <span className={cn('font-medium', sizeClasses[size], className)}>
      {prefix && <span className="font-normal">{prefix} </span>}
      {formattedPrice}
      {suffix && <span className="font-normal text-muted-foreground"> {suffix}</span>}
    </span>
  )
}

// Helper component for range display
interface PriceRangeDisplayProps {
  min: number
  max: number
  currency?: 'EUR' | 'USD' | 'RUB'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PriceRangeDisplay({
  min,
  max,
  currency = 'EUR',
  size = 'md',
  className,
}: PriceRangeDisplayProps) {
  return (
    <span className={cn('font-medium', sizeClasses[size], className)}>
      <PriceDisplay amount={min} currency={currency} size={size} showCurrency={true} />
      {' - '}
      <PriceDisplay amount={max} currency={currency} size={size} showCurrency={true} />
    </span>
  )
}
