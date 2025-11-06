import { format, parseISO } from 'date-fns'
import { ru, enUS, es } from 'date-fns/locale'

const locales = { ru, en: enUS, es }

export function formatDate(
  date: string | Date,
  formatStr = 'PPP',
  locale = 'ru'
): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, formatStr, {
    locale: locales[locale as keyof typeof locales],
  })
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function formatReviewCount(count: number, locale = 'ru'): string {
  if (locale === 'ru') {
    const lastDigit = count % 10
    const lastTwoDigits = count % 100

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return `${count} отзывов`
    }

    if (lastDigit === 1) {
      return `${count} отзыв`
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return `${count} отзыва`
    }

    return `${count} отзывов`
  }

  return `${count} review${count !== 1 ? 's' : ''}`
}
