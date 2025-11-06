'use client';

import * as React from 'react';
import Image from 'next/image';
import { Heart, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@/components/ui/rating';
import { Skeleton } from '@/components/ui/skeleton';

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
     * Main image URL
     */
    image: string;
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
     * Price range (1-4, $$$)
     */
    priceLevel?: number;
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
    image,
    category,
    rating,
    reviewsCount,
    location,
    priceLevel,
    isFavorite = false,
    isSelected = false,
    onClick,
    onFavoriteClick,
    className,
}: PlaceCardProps) {
    const [imageError, setImageError] = React.useState(false);
    const [localFavorite, setLocalFavorite] = React.useState(isFavorite);

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

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(id);
        }
    };

    const priceSymbols = priceLevel ? '$'.repeat(priceLevel) : null;

    return (
        <Card
            className={cn(
                'group overflow-hidden transition-all duration-300 cursor-pointer',
                'hover:shadow-lg hover:border-primary/50',
                'pt-0 gap-0', // Убираем дефолтный padding и gap от Card
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
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
                {!imageError ? (
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover"
                        onError={() => setImageError(true)}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-muted">
                        <MapPin className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                )}

                {/* Favorite Button */}
                <button
                    type="button"
                    className={cn(
                        'absolute right-3 top-3 z-10 transition-all cursor-pointer',
                        'hover:scale-110 active:scale-95'
                    )}
                    onClick={handleFavoriteClick}
                    aria-label={localFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <Heart
                        className={cn(
                            'h-7 w-7 transition-all duration-200',
                            localFavorite
                                ? 'fill-red-500 text-red-500 drop-shadow-lg'
                                : 'fill-white/40 text-white stroke-white/80 stroke-[1.5] drop-shadow-md hover:fill-white/60 hover:text-white'
                        )}
                    />
                </button>

                {/* Category Badge */}
                <div className="absolute bottom-2 left-2">
                    <Badge variant="default" className="backdrop-blur-sm bg-primary/90 text-primary-foreground">
                        {category}
                    </Badge>
                </div>
            </div>

            <CardContent className="pt-3">
                {/* Name */}
                <h3
                    className={cn(
                        'font-semibold text-lg line-clamp-1 transition-colors',
                        'group-hover:text-primary'
                    )}
                >
                    {name}
                </h3>

                {/* Location */}
                {location && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="line-clamp-1">{location}</span>
                    </div>
                )}

                {/* Rating and Price */}
                <div className="flex mt-4 items-center justify-between gap-2">
                    <Rating
                        value={rating}
                        readonly
                        showValue
                        count={reviewsCount}
                        size="sm"
                    />
                    {priceSymbols && (
                        <span className="text-sm font-medium text-muted-foreground">
                            {priceSymbols}
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

PlaceCard.displayName = 'PlaceCard';

// Skeleton loader version
export function PlaceCardSkeleton({ className }: { className?: string }) {
    return (
        <Card className={cn('overflow-hidden p-0 gap-0', className)}>
            {/* Image Skeleton */}
            <Skeleton className="aspect-video w-full" />

            <CardContent className="p-4 pt-3 space-y-2">
                {/* Name Skeleton */}
                <Skeleton className="h-6 w-3/4" />

                {/* Location Skeleton */}
                <div className="flex items-center gap-1">
                    <Skeleton className="h-3.5 w-3.5 rounded-full" />
                    <Skeleton className="h-4 w-1/2" />
                </div>

                {/* Rating Skeleton */}
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-4 w-8" />
                </div>
            </CardContent>
        </Card>
    );
}

PlaceCardSkeleton.displayName = 'PlaceCardSkeleton';
