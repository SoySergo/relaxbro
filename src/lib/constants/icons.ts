/**
 * Icon mapping for categories and common UI elements
 */

import {
  Waves,
  Droplets,
  UtensilsCrossed,
  Trees,
  Palette,
  Music,
  Baby,
  ShoppingBag,
  Sparkles,
  Church,
  Compass,
  Camera,
  Anchor,
  Zap,
  Landmark,
  Users,
  Crown,
  Clock,
  MapPin,
  Check,
  X,
  type LucideIcon,
} from 'lucide-react'
import type { Category, ActivityCategory } from '../types'

/**
 * Category icons mapping
 * Maps each category to its corresponding Lucide icon component
 */
export const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  'active-recreation': Waves,
  'wellness-spa': Droplets,
  gastronomy: UtensilsCrossed,
  nature: Trees,
  culture: Palette,
  nightlife: Music,
  family: Baby,
  shopping: ShoppingBag,
  'unique-experience': Sparkles,
  spiritual: Church,
}

/**
 * Get icon component for a category
 * @param category Category key
 * @returns Lucide icon component
 */
export function getCategoryIcon(category: Category): LucideIcon {
  return CATEGORY_ICONS[category]
}

/**
 * Activity category icons mapping
 * Maps each activity category to its corresponding Lucide icon component
 */
export const ACTIVITY_CATEGORY_ICONS: Record<ActivityCategory, LucideIcon> = {
  'tours-excursions': Compass,
  'water-sports': Waves,
  workshops: Palette,
  photoshoots: Camera,
  'yacht-fishing': Anchor,
  'extreme-sports': Zap,
  'cultural-tours': Landmark,
  'food-tours': UtensilsCrossed,
  'team-building': Users,
  'private-experiences': Crown,
}

/**
 * Get icon component for an activity category
 * @param category Activity category key
 * @returns Lucide icon component
 */
export function getActivityCategoryIcon(category: ActivityCategory): LucideIcon {
  return ACTIVITY_CATEGORY_ICONS[category]
}

/**
 * Common UI icons
 */
export const UI_ICONS = {
  clock: Clock,
  mapPin: MapPin,
  check: Check,
  x: X,
  users: Users,
} as const
