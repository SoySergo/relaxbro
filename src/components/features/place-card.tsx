'use client';

import * as React from 'react';
import Image from 'next/image';
import { Heart, MapPin, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@/components/ui/rating';
import { Skeleton } from '@/components/ui/skeleton';
import { OrganizerBadge } from './organizer-badge';
import { TagList } from '@/components/ui/tag-list';
import { PriceDisplay } from '@/components/ui/price-display';

export interface PlaceCardProps {
    /**
     * Place ID
     */
    id: string;
    /**
     * Place name
     */
    name: string;
    /**
     * Array of image URLs
     */
    images: string[];
    /**
     * Category name
     */
    category: string;
    /**
     * Average rating (0-5)
     */
    rating: number;
    /**
     * Number of reviews
     */
    reviewsCount: number;
    /**
     * Address or location
     */
    location?: string;
    /**
     * Price object with amount and currency, or price level (1-3 for $$$)
     */
    price?: {
        from?: number;
        currency?: string;
    };
    /**
     * Price range (1-3, $$$) - deprecated, use price object
     */
    priceLevel?: number;
    /**
     * Tags for the place
     */
    tags?: string[];
    /**
     * Organizer/Owner information
     */
    organizer?: {
        name: string;
        avatar?: string;
        type: 'business' | 'individual';
        verified: boolean;
    };
    /**
     * Whether the place is verified
     */
    isVerified?: boolean;
    /**
     * Whether the place is favorited
     * @default false
     */
    isFavorite?: boolean;
    /**
     * Whether the card is selected
     * @default false
     */
    isSelected?: boolean;
    /**
     * Click handler for the card
     */
    onClick?: (id: string) => void;
    /**
     * Click handler for favorite button
     */
    onFavoriteClick?: (id: string, isFavorite: boolean) => void;
    /**
     * Custom className
     */
    className?: string;
}

export function PlaceCard({
    id,
    name,
    images,
    // category: _category,
    rating,
    reviewsCount,
    location,
    price,
    priceLevel,
    tags,
    organizer,
    isVerified = false,
    isFavorite = false,
    isSelected = false,
    onClick,
    onFavoriteClick,
    className,
}: PlaceCardProps) {
    const [imageError, setImageError] = React.useState(false);
    const [localFavorite, setLocalFavorite] = React.useState(isFavorite);
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [touchStart, setTouchStart] = React.useState(0);
    const [touchEnd, setTouchEnd] = React.useState(0);

    React.useEffect(() => {
        setLocalFavorite(isFavorite);
    }, [isFavorite]);

    const handleCardClick = () => {
        onClick?.(id);
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newFavoriteState = !localFavorite;
        setLocalFavorite(newFavoriteState);
        onFavoriteClick?.(id, newFavoriteState);
    };

    const handlePrevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    // Touch handlers for swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            e.stopPropagation();
            setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }
        if (isRightSwipe) {
            e.stopPropagation();
            setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        }

        // Reset values
        setTouchStart(0);
        setTouchEnd(0);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(id);
        }
    };

    const hasMultipleImages = images.length > 1;

    return (
        <Card
            className={cn(
                'group overflow-hidden transition-all duration-300 cursor-pointer',
                'hover:shadow-lg hover:border-primary/30',
                'w-full',
                'pt-0 pb-0 gap-0',
                isSelected && 'ring-2 ring-primary ring-offset-2',
                className
            )}
            onClick={handleCardClick}
            onKeyDown={handleKeyDown}
            tabIndex={onClick ? 0 : undefined}
            role={onClick ? 'button' : undefined}
            aria-pressed={isSelected}
        >
            {/* Image */}
            <div
                className="relative aspect-video w-full overflow-hidden bg-muted group/image"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {!imageError ? (
                    <Image
                        src={images[currentImageIndex] || '/placeholder.jpg'}
                        alt={name}
                        fill
                        className={cn(
                            'object-cover transition-opacity duration-300',
                            !imageLoaded && 'blur-sm'
                        )}
                        onError={() => setImageError(true)}
                        onLoad={() => setImageLoaded(true)}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-muted">
                        <MapPin className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                )}

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
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentImageIndex(index);
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
                                Verified
                            </Badge>
                        )}
                    </div>

                    {/* Favorite Button */}
                    <button
                        type="button"
                        className={cn(
                            'transition-all cursor-pointer shrink-0',
                            'hover:scale-110 active:scale-95'
                        )}
                        onClick={handleFavoriteClick}
                        aria-label={localFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <Heart
                            className={cn(
                                'h-6 w-6 sm:h-7 sm:w-7 transition-all duration-200',
                                localFavorite
                                    ? 'fill-red-500 text-red-500 drop-shadow-lg'
                                    : 'fill-white/40 text-white stroke-white/80 stroke-[1.5] drop-shadow-md hover:fill-white/60 hover:text-white'
                            )}
                        />
                    </button>
                </div>

                {/* Price Badge - Bottom Right */}
                <div className="absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2">
                    {price?.from && price?.currency ? (
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 shadow-lg">
                            <PriceDisplay
                                amount={price.from}
                                currency={price.currency as 'EUR' | 'USD' | 'RUB'}
                                prefix="от"
                                size="sm"
                                className="font-bold text-xs sm:text-sm"
                            />
                        </div>
                    ) : priceLevel && priceLevel >= 1 && priceLevel <= 3 ? (
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 shadow-lg">
                            <div className="flex items-center gap-0.5">
                                {[1, 2, 3].map((level) => (
                                    <span
                                        key={level}
                                        className={cn(
                                            'text-sm sm:text-base font-medium',
                                            level <= priceLevel
                                                ? 'text-primary'
                                                : 'text-muted-foreground/30'
                                        )}
                                    >
                                        $
                                    </span>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>

            <CardContent className="p-3 sm:p-4 space-y-2.5">
                {/* Name */}
                <h3 className="font-semibold text-lg line-clamp-2 leading-snug min-h-14 flex items-start">
                    {name}
                </h3>

                {/* Organizer */}
                {organizer && (
                    <OrganizerBadge
                        name={organizer.name}
                        avatar={organizer.avatar || ''}
                        type={organizer.type}
                        verified={organizer.verified}
                        size="sm"
                    />
                )}

                {/* Rating and Reviews */}
                <div className="flex items-center gap-2">
                    <Rating value={rating} readonly size="sm" />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                        ({reviewsCount})
                    </span>
                </div>

                {/* Location */}
                {location && (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="line-clamp-1">{location}</span>
                    </div>
                )}

                {/* Tags */}
                {tags && tags.length > 0 && (
                    <TagList tags={tags} max={3} variant="compact" colorful />
                )}
            </CardContent>
        </Card>
    );
}

PlaceCard.displayName = 'PlaceCard';

// Skeleton loader version
export function PlaceCardSkeleton({ className }: { className?: string }) {
    return (
        <Card className={cn('overflow-hidden w-full p-0 gap-0', className)}>
            {/* Image Skeleton */}
            <Skeleton className="aspect-video w-full" />

            <CardContent className="p-3 sm:p-4 pt-3 space-y-2">
                {/* Name Skeleton */}
                <Skeleton className="h-5 sm:h-6 w-3/4" />

                {/* Location Skeleton */}
                <div className="flex items-center gap-1">
                    <Skeleton className="h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full" />
                    <Skeleton className="h-3 sm:h-4 w-1/2" />
                </div>

                {/* Rating Skeleton */}
                <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-3 sm:h-4 w-10 sm:w-12" />
                    </div>
                    <Skeleton className="h-3 sm:h-4 w-8" />
                </div>
            </CardContent>
        </Card>
    );
}

PlaceCardSkeleton.displayName = 'PlaceCardSkeleton';
