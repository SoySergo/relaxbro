'use client'

import { SearchWithResults, type SearchResult } from '@/components/ui/search-with-results'
import { FilterChips, FilterChipItem } from '@/components/ui/filter-chips'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { ActivityCategory } from '@/lib/types'
import { useTranslations } from 'next-intl'
import { Save, Filter, Star, Euro } from 'lucide-react'
import { ACTIVITY_CATEGORY_ICONS } from '@/lib/constants/icons'
import { PriceRangeFilter } from './PriceRangeFilter'
import { RatingFilter } from './RatingFilter'

export interface FilterBarState {
    searchQuery: string
    categories: ActivityCategory[]
    rating: number
    priceRange: [number, number]
    openNow: boolean
}

interface FilterBarProps {
    filters: FilterBarState
    onFiltersChange: (filters: Partial<FilterBarState>) => void
    onReset: () => void
    variant?: 'floating' | 'sidebar' | 'inline'
    categoryCounts?: Record<ActivityCategory, number>
    className?: string
    // Search results props
    searchResults?: SearchResult[]
    searchTotalCount?: number
    searchLoading?: boolean
    onSearchResultSelect?: (result: SearchResult) => void
    onShowAllResults?: () => void
}

export function FilterBar({
    filters,
    onFiltersChange,
    onReset,
    variant = 'inline',
    categoryCounts,
    className,
    searchResults = [],
    searchTotalCount = 0,
    searchLoading = false,
    onSearchResultSelect,
    onShowAllResults,
}: FilterBarProps) {
    const t = useTranslations('search')
    const tFilters = useTranslations('filters')
    const tCategories = useTranslations('categories')

    const handleSearchChange = (value: string) => {
        onFiltersChange({ searchQuery: value })
    }

    const handleToggleCategory = (category: ActivityCategory) => {
        const newCategories = filters.categories.includes(category)
            ? filters.categories.filter((c) => c !== category)
            : [...filters.categories, category]
        onFiltersChange({ categories: newCategories })
    }

    // Build active filter chips
    const activeFilterChips: FilterChipItem[] = []

    if (filters.searchQuery) {
        activeFilterChips.push({
            id: 'search',
            label: `"${filters.searchQuery}"`,
        })
    }

    filters.categories.forEach((category) => {
        activeFilterChips.push({
            id: `category-${category}`,
            label: tCategories(category),
        })
    })

    if (filters.rating > 0) {
        activeFilterChips.push({
            id: 'rating',
            label: `${tFilters('rating')}: ${filters.rating}+★`,
        })
    }

    const hasMinPrice = filters.priceRange[0] > 0
    const hasMaxPrice = filters.priceRange[1] !== null && filters.priceRange[1] !== Infinity

    if (hasMinPrice || hasMaxPrice) {
        let priceLabel = ''
        if (hasMinPrice && hasMaxPrice) {
            priceLabel = `€${filters.priceRange[0]} - €${filters.priceRange[1]}`
        } else if (hasMinPrice) {
            priceLabel = `${tFilters('from')} €${filters.priceRange[0]}`
        } else if (hasMaxPrice) {
            priceLabel = `${tFilters('up-to')} €${filters.priceRange[1]}`
        }

        activeFilterChips.push({
            id: 'price',
            label: priceLabel,
        })
    }

    if (filters.openNow) {
        activeFilterChips.push({
            id: 'open-now',
            label: tFilters('open-now'),
        })
    }

    const handleRemoveFilter = (id: string) => {
        if (id === 'search') {
            onFiltersChange({ searchQuery: '' })
        } else if (id.startsWith('category-')) {
            const category = id.replace('category-', '') as ActivityCategory
            handleToggleCategory(category)
        } else if (id === 'rating') {
            onFiltersChange({ rating: 0 })
        } else if (id === 'price') {
            onFiltersChange({ priceRange: [0, Infinity] })
        } else if (id === 'open-now') {
            onFiltersChange({ openNow: false })
        }
    }

    const hasActiveFilters = activeFilterChips.length > 0

    const containerClasses = cn(
        'space-y-3',
        variant === 'floating' &&
        'fixed top-20 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-4xl bg-white/95 backdrop-blur-sm border rounded-lg shadow-lg p-4',
        variant === 'sidebar' && 'sticky top-0 z-10 bg-background border-b p-4',
        className
    )

    const categories: ActivityCategory[] = [
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

    return (
        <div className={containerClasses}>
            {/* Desktop Version */}
            <div className="hidden sm:flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    {/* Search Input with Results */}
                    <SearchWithResults
                        value={filters.searchQuery}
                        onChange={handleSearchChange}
                        results={searchResults}
                        totalCount={searchTotalCount}
                        loading={searchLoading}
                        onResultSelect={onSearchResultSelect}
                        onShowAll={onShowAllResults}
                        placeholder={t('placeholder')}
                        className="w-64 shrink-0"
                        maxResults={5}
                    />

                    {/* Categories Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2 shrink-0">
                                <Filter className="h-4 w-4" />
                                <span>{tFilters('categories')}</span>
                                {filters.categories.length > 0 && (
                                    <Badge variant="secondary" className="h-5 min-w-5 px-1">
                                        {filters.categories.length}
                                    </Badge>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-80" align="start">
                            <DropdownMenuLabel>{tFilters('select-categories')}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="max-h-[300px] overflow-y-auto">
                                {categories.map((category) => {
                                    const Icon = ACTIVITY_CATEGORY_ICONS[category]
                                    const count = categoryCounts?.[category]
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={category}
                                            checked={filters.categories.includes(category)}
                                            onCheckedChange={() => handleToggleCategory(category)}
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <div className="flex items-center justify-between w-full gap-2">
                                                <div className="flex items-center gap-2">
                                                    {Icon && <Icon className="h-4 w-4" />}
                                                    <span className="text-sm">{tCategories(category)}</span>
                                                </div>
                                                {count !== undefined && (
                                                    <span className="text-xs text-muted-foreground">
                                                        {count}
                                                    </span>
                                                )}
                                            </div>
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Rating Filter */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2 min-w-[100px] justify-center shrink-0">
                                <Star className="h-4 w-4" />
                                <span className="text-sm">
                                    {filters.rating > 0 ? `${filters.rating}★` : tFilters('rating')}
                                </span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-96" align="start">
                            <RatingFilter
                                value={filters.rating}
                                onValueChange={(value) => onFiltersChange({ rating: value })}
                            />
                        </PopoverContent>
                    </Popover>

                    {/* Price Range Filter */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2 min-w-[110px] shrink-0">
                                <Euro className="h-4 w-4" />
                                <span className="text-sm truncate">
                                    {(() => {
                                        const hasMin = filters.priceRange[0] > 0
                                        const hasMax = filters.priceRange[1] < Infinity

                                        if (!hasMin && !hasMax) return tFilters('price')
                                        if (hasMin && hasMax) return `${filters.priceRange[0]}-${filters.priceRange[1]}`
                                        if (hasMin) return `${filters.priceRange[0]}+`
                                        return `<${filters.priceRange[1]}`
                                    })()}
                                </span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-96" align="start">
                            <PriceRangeFilter
                                value={[
                                    filters.priceRange[0],
                                    filters.priceRange[1] === Infinity ? 5000 : filters.priceRange[1]
                                ]}
                                onValueChange={(value) => onFiltersChange({ priceRange: value })}
                            />
                        </PopoverContent>
                    </Popover>

                    {/* Open Now Switch */}
                    <div className="flex items-center gap-2 px-2 py-1 shrink-0">
                        <Switch
                            id="open-now-filter"
                            checked={filters.openNow}
                            onCheckedChange={(checked) => onFiltersChange({ openNow: checked })}
                        />
                        <Label htmlFor="open-now-filter" className="text-sm cursor-pointer whitespace-nowrap">
                            {tFilters('open-now')}
                        </Label>
                    </div>

                    <div className="flex-1" />

                    {/* Save Button - desktop only */}
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 shrink-0 hidden lg:flex"
                        disabled={!hasActiveFilters}
                    >
                        <Save className="h-4 w-4" />
                        <span className="hidden xl:inline">{tFilters('save-filter')}</span>
                    </Button>
                </div>

                {/* Active Filters Chips */}
                {hasActiveFilters && (
                    <FilterChips
                        items={activeFilterChips}
                        onRemove={handleRemoveFilter}
                        onClear={onReset}
                    />
                )}
            </div>

            {/* Mobile Version */}
            <div className="sm:hidden space-y-3">
                {/* Mobile Filters Row */}
                <div className="flex items-center gap-2">
                    {/* Search Button - opens popup */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                size="default"
                                className="h-10 px-3"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[calc(100vw-2rem)]" align="start">
                            <div className="space-y-3">
                                <Label className="text-sm font-semibold">{t('placeholder')}</Label>
                                <SearchWithResults
                                    value={filters.searchQuery}
                                    onChange={handleSearchChange}
                                    results={searchResults}
                                    totalCount={searchTotalCount}
                                    loading={searchLoading}
                                    onResultSelect={onSearchResultSelect}
                                    onShowAll={onShowAllResults}
                                    placeholder={t('placeholder')}
                                    className="w-full"
                                    maxResults={5}
                                />
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Categories Button */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="default"
                                className="flex-1 h-10 gap-2 justify-center relative text-sm"
                            >
                                <Filter className="h-4 w-4" />
                                <span>{tFilters('categories')}</span>
                                {filters.categories.length > 0 && (
                                    <Badge variant="secondary" className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-xs">
                                        {filters.categories.length}
                                    </Badge>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[calc(100vw-2rem)]" align="start">
                            <DropdownMenuLabel className="text-sm font-semibold">{tFilters('select-categories')}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="max-h-[60vh] overflow-y-auto">
                                {categories.map((category) => {
                                    const Icon = ACTIVITY_CATEGORY_ICONS[category]
                                    const count = categoryCounts?.[category]
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={category}
                                            checked={filters.categories.includes(category)}
                                            onCheckedChange={() => handleToggleCategory(category)}
                                            onSelect={(e) => e.preventDefault()}
                                            className="py-2.5"
                                        >
                                            <div className="flex items-center justify-between w-full gap-2">
                                                <div className="flex items-center gap-2.5">
                                                    {Icon && <Icon className="h-4 w-4" />}
                                                    <span className="text-sm">{tCategories(category)}</span>
                                                </div>
                                                {count !== undefined && (
                                                    <span className="text-xs text-muted-foreground">
                                                        {count}
                                                    </span>
                                                )}
                                            </div>
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Advanced Filters Button */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                size="default"
                                className="h-10 px-3 relative"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                                {(filters.rating > 0 || filters.priceRange[0] > 0 || filters.priceRange[1] < Infinity || filters.openNow) && (
                                    <Badge variant="secondary" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs">
                                        •
                                    </Badge>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[calc(100vw-2rem)]" align="end">
                            <div className="space-y-5">
                                {/* Rating */}
                                <div>
                                    <RatingFilter
                                        value={filters.rating}
                                        onValueChange={(value) => onFiltersChange({ rating: value })}
                                    />
                                </div>

                                <div className="border-t pt-5">
                                    {/* Price */}
                                    <PriceRangeFilter
                                        value={[
                                            filters.priceRange[0],
                                            filters.priceRange[1] === Infinity ? 5000 : filters.priceRange[1]
                                        ]}
                                        onValueChange={(value) => onFiltersChange({ priceRange: value })}
                                    />
                                </div>

                                <div className="border-t pt-5">
                                    {/* Open Now */}
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="open-now-mobile" className="text-sm font-semibold">
                                            {tFilters('open-now')}
                                        </Label>
                                        <Switch
                                            id="open-now-mobile"
                                            checked={filters.openNow}
                                            onCheckedChange={(checked) => onFiltersChange({ openNow: checked })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Active Filters Chips */}
                {hasActiveFilters && (
                    <FilterChips
                        items={activeFilterChips}
                        onRemove={handleRemoveFilter}
                        onClear={onReset}
                    />
                )}
            </div>
        </div>
    )
}
