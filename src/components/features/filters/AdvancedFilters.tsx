'use client'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Star, SlidersHorizontal } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { PriceRangeFilter } from './PriceRangeFilter'

export interface AdvancedFiltersState {
    rating: number
    priceRange: [number, number]
    openNow: boolean
}

interface AdvancedFiltersProps {
    filters: AdvancedFiltersState
    onFiltersChange: (filters: Partial<AdvancedFiltersState>) => void
    className?: string
}

export function AdvancedFilters({
    filters,
    onFiltersChange,
    className,
}: AdvancedFiltersProps) {
    const t = useTranslations('filters')

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className={cn('gap-2', className)}>
                    <SlidersHorizontal className="h-4 w-4" />
                    {t('more-filters')}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel>{t('advanced-filters')}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Rating Filter */}
                <div className="p-3 space-y-3">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium flex items-center gap-2">
                            <Star className="h-4 w-4" />
                            {t('min-rating')}
                        </Label>
                        <div className="flex items-center gap-3">
                            <Slider
                                value={[filters.rating]}
                                onValueChange={(value) => onFiltersChange({ rating: value[0] })}
                                max={5}
                                min={0}
                                step={0.5}
                                className="flex-1"
                            />
                            <span className="text-sm font-medium w-8 text-right">
                                {filters.rating.toFixed(1)}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={cn(
                                        'h-3 w-3',
                                        star <= filters.rating
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300'
                                    )}
                                />
                            ))}
                        </div>
                    </div>

                    <DropdownMenuSeparator />

                    {/* Price Range Filter */}
                    <PriceRangeFilter
                        value={filters.priceRange}
                        onValueChange={(value) => onFiltersChange({ priceRange: value })}
                    />

                    <DropdownMenuSeparator />

                    {/* Open Now Switch */}
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="open-now" className="text-sm font-medium flex-1">
                            {t('open-now')}
                        </Label>
                        <Switch
                            id="open-now"
                            checked={filters.openNow}
                            onCheckedChange={(checked) =>
                                onFiltersChange({ openNow: checked })
                            }
                        />
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
