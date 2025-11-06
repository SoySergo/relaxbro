/**
 * Icon mapping for categories and common UI elements
 */

import {
  Waves,
  Spa,
  UtensilsCrossed,
  Trees,
  Palette,
  Music,
  Baby,
  ShoppingBag,
  Sparkles,
  Church,
  type LucideIcon,
} from 'lucide-react'
import type { Category } from '../types'

/**
 * Category icons mapping
 * Maps each category to its corresponding Lucide icon component
 */
export const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  'active-recreation': Waves,
  'wellness-spa': Spa,
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
