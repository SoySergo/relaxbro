import { ReactNode } from 'react'

export interface BaseFeatureCardProps {
  /**
   * Unique ID
   */
  id: string
  /**
   * Card title/name
   */
  name: string
  /**
   * Array of image URLs
   */
  images: string[]
  /**
   * Average rating (0-5)
   */
  rating: number
  /**
   * Number of reviews
   */
  reviewsCount: number
  /**
   * Price object
   */
  price?: {
    from: number
    currency: string
  }
  /**
   * Price level (1-3 for $$$) - alternative to price
   */
  priceLevel?: number
  /**
   * Tags array
   */
  tags?: string[]
  /**
   * Organizer/Owner information
   */
  organizer?: {
    name: string
    avatar?: string
    type: 'business' | 'individual'
    verified: boolean
  }
  /**
   * Whether the item is verified
   */
  isVerified?: boolean
  /**
   * Whether instant booking is available
   */
  isInstantBooking?: boolean
  /**
   * Whether the card is favorited
   */
  isFavorite?: boolean
  /**
   * Whether the card is selected
   */
  isSelected?: boolean
  /**
   * Show gradient overlay on image
   */
  showGradient?: boolean
  /**
   * Image aspect ratio
   */
  aspectRatio?: 'video' | '4/3'
  /**
   * Click handler for the card
   */
  onClick?: (id: string) => void
  /**
   * Click handler for favorite button
   */
  onFavoriteClick?: (id: string, isFavorite: boolean) => void
  /**
   * Additional content to render between organizer and tags
   */
  additionalContent?: ReactNode
  /**
   * Additional badges to render with verified/instant booking
   */
  additionalBadges?: ReactNode
  /**
   * Translation namespace for i18n
   */
  translationNamespace?: string
  /**
   * Custom className
   */
  className?: string
}
