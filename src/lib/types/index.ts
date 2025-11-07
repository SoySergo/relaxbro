export type Category =
  | 'active-recreation'
  | 'wellness-spa'
  | 'gastronomy'
  | 'nature'
  | 'culture'
  | 'nightlife'
  | 'family'
  | 'shopping'
  | 'unique-experience'
  | 'spiritual'

export interface Location {
  lat: number
  lng: number
  address: string
  city: string
}

export interface Contacts {
  phone?: string
  email?: string
  website?: string
  social?: {
    instagram?: string
    facebook?: string
    twitter?: string
  }
}

export interface WorkingHours {
  monday?: string
  tuesday?: string
  wednesday?: string
  thursday?: string
  friday?: string
  saturday?: string
  sunday?: string
}

export interface Place {
  id: string
  name: string
  description: string
  category: Category
  subcategories: string[]
  location: Location
  rating: number
  reviewsCount: number
  images: string[]
  contacts: Contacts
  workingHours?: WorkingHours
  createdAt: string
  updatedAt: string
}

export interface Review {
  id: string
  placeId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  text: string
  images: string[]
  helpful: number
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  favorites: string[]
  createdAt: string
}

// ============================================
// Activity Types
// ============================================

export type ActivityCategory =
  | 'tours-excursions'
  | 'water-sports'
  | 'workshops'
  | 'photoshoots'
  | 'yacht-fishing'
  | 'extreme-sports'
  | 'cultural-tours'
  | 'food-tours'
  | 'team-building'
  | 'private-experiences'

export interface ActivityCardProps {
  id: string
  name: string
  images: string[]
  category: ActivityCategory
  price: {
    from: number
    currency: 'EUR' | 'USD' | 'RUB'
  }
  duration: {
    value: number
    unit: 'hours' | 'days'
  }
  rating: number
  reviewsCount: number
  organizer: {
    name: string
    avatar: string
    type: 'business' | 'individual'
    verified: boolean
  }
  groupSize: {
    min?: number
    max: number
    type?: 'group' | 'private'
  }
  tags: string[]
  isVerified?: boolean
  isInstantBooking?: boolean
  onClick?: () => void
}

export interface FilterState {
  priceRange: { min: number; max: number }
  duration: ('short' | 'half-day' | 'full-day' | 'multi-day')[]
  date?: Date
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'new'
}
