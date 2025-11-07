'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Rating } from '@/components/ui/rating'
import { PriceDisplay } from '@/components/ui/price-display'
import { DurationBadge } from '@/components/ui/duration-badge'
import { GroupSizeBadge } from '@/components/ui/group-size-badge'
import { OrganizerBadge } from './organizer-badge'
import { TagList } from '@/components/ui/tag-list'
import { Heart, Zap, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ActivityCardProps } from '@/lib/types'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export function ActivityCard({
  // id: _id,
  name,
  images,
  // category: _category,
  price,
  duration,
  rating,
  reviewsCount,
  organizer,
  groupSize,
  tags,
  isVerified,
  isInstantBooking,
  onClick,
}: ActivityCardProps) {
  const t = useTranslations('activities.common')
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const hasMultipleImages = images.length > 1

  return (
    <Card
      className={cn(
        'group overflow-hidden cursor-pointer transition-all duration-300',
        'hover:shadow-lg hover:border-primary/50',
        'w-full',
        'p-0 gap-0',
      )}
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="relative aspect-4/3 overflow-hidden bg-muted group/image">
        <Image
          src={images[currentImageIndex] || '/placeholder.jpg'}
          alt={name}
          fill
          className={cn(
            'object-cover transition-opacity duration-300',
            !imageLoaded && 'blur-sm',
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        {/* Image Navigation Arrows */}
        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              className={cn(
                'absolute left-2 top-1/2 -translate-y-1/2 z-10',
                'bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5',
                'transition-all duration-200 opacity-0 group-hover/image:opacity-100',
                'hover:scale-110 active:scale-95 cursor-pointer'
              )}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2 z-10',
                'bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5',
                'transition-all duration-200 opacity-0 group-hover/image:opacity-100',
                'hover:scale-110 active:scale-95 cursor-pointer'
              )}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Image Indicators (Dots) */}
        {hasMultipleImages && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentImageIndex(index)
                }}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-200 cursor-pointer',
                  index === currentImageIndex
                    ? 'w-6 bg-white'
                    : 'w-1.5 bg-white/50 hover:bg-white/75'
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 right-1.5 sm:right-2 flex items-start justify-between gap-1">
          <div className="flex flex-col gap-1">
            {isVerified && (
              <Badge className="bg-primary text-primary-foreground shadow-md text-xs">
                <ShieldCheck className="h-3 w-3 mr-1" />
                {t('verified')}
              </Badge>
            )}
            {isInstantBooking && (
              <Badge className="bg-orange-500 text-white shadow-md text-xs">
                <Zap className="h-3 w-3 mr-1" />
                {t('instant-booking')}
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <button
            type="button"
            onClick={handleFavoriteClick}
            className={cn(
              'transition-all cursor-pointer shrink-0',
              'hover:scale-110 active:scale-95'
            )}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={cn(
                'h-6 w-6 sm:h-7 sm:w-7 transition-all duration-200',
                isFavorite
                  ? 'fill-red-500 text-red-500 drop-shadow-lg'
                  : 'fill-white/40 text-white stroke-white/80 stroke-[1.5] drop-shadow-md hover:fill-white/60 hover:text-white'
              )}
            />
          </button>
        </div>

        {/* Price Badge - Bottom Right */}
        <div className="absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 shadow-lg">
            <PriceDisplay
              amount={price.from}
              currency={price.currency}
              prefix={t('from-prefix')}
              size="sm"
              className="font-bold text-xs sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4 space-y-2">
        {/* Title */}
        <h3 className="font-semibold text-sm sm:text-base line-clamp-2 leading-tight">
          {name}
        </h3>

        {/* Organizer */}
        <OrganizerBadge
          name={organizer.name}
          avatar={organizer.avatar}
          type={organizer.type}
          verified={organizer.verified}
          size="sm"
        />

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Rating value={rating} readonly size="sm" />
          <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
            ({reviewsCount})
          </span>
        </div>

        {/* Duration and Group Size */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <DurationBadge value={duration.value} unit={duration.unit} variant="default" />
          <GroupSizeBadge min={groupSize.min} max={groupSize.max} />
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <TagList tags={tags} max={3} variant="compact" colorful />
        )}
      </div>
    </Card>
  )
}

// Skeleton Loader
export function ActivityCardSkeleton() {
  return (
    <Card className="overflow-hidden w-full p-0 gap-0">
      <div className="relative aspect-4/3 bg-muted animate-pulse" />
      <div className="p-3 sm:p-4 space-y-2">
        <div className="h-10 sm:h-12 bg-muted rounded animate-pulse" />
        <div className="h-6 sm:h-8 bg-muted rounded-full w-3/4 animate-pulse" />
        <div className="h-4 sm:h-5 bg-muted rounded w-1/2 animate-pulse" />
        <div className="flex gap-1.5 sm:gap-2">
          <div className="h-5 sm:h-6 bg-muted rounded w-16 sm:w-20 animate-pulse" />
          <div className="h-5 sm:h-6 bg-muted rounded w-20 sm:w-24 animate-pulse" />
        </div>
        <div className="flex gap-1.5 sm:gap-2">
          <div className="h-4 sm:h-5 bg-muted rounded w-14 sm:w-16 animate-pulse" />
          <div className="h-4 sm:h-5 bg-muted rounded w-16 sm:w-20 animate-pulse" />
          <div className="h-4 sm:h-5 bg-muted rounded w-16 sm:w-18 animate-pulse" />
        </div>
      </div>
    </Card>
  )
}
