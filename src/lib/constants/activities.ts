import { ActivityCategory, FilterState } from '@/lib/types'

export const ACTIVITY_CATEGORIES: ActivityCategory[] = [
  'tours-excursions',
  'water-sports',
  'workshops',
  'photoshoots',
  'yacht-fishing',
  'extreme-sports',
  'cultural-tours',
  'food-tours',
  'team-building',
  'private-experiences',
]

export const DURATION_PRESETS = {
  short: { max: 3, unit: 'hours' },
  'half-day': { min: 3, max: 6, unit: 'hours' },
  'full-day': { min: 6, max: 10, unit: 'hours' },
  'multi-day': { min: 1, unit: 'days' },
} as const

export const PRICE_PRESETS = {
  budget: { min: 0, max: 30 },
  medium: { min: 30, max: 70 },
  premium: { min: 70, max: 200 },
} as const

export const DEFAULT_ACTIVITY_FILTERS: FilterState = {
  priceRange: { min: 0, max: 200 },
  duration: [],
  sortBy: 'popular',
}
