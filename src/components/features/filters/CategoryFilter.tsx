'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ACTIVITY_CATEGORY_ICONS } from '@/lib/constants/icons'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { ActivityCategory } from '@/lib/types'

interface CategoryFilterProps {
    selectedCategories: ActivityCategory[]
    onToggleCategory: (category: ActivityCategory) => void
    counts?: Record<ActivityCategory, number>
    className?: string
}

export function CategoryFilter({
    selectedCategories,
    onToggleCategory,
    counts,
    className,
}: CategoryFilterProps) {
    const t = useTranslations('categories')

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
        <div className={cn('flex flex-wrap gap-2', className)}>
            {categories.map((category) => {
                const Icon = ACTIVITY_CATEGORY_ICONS[category]
                const isSelected = selectedCategories.includes(category)
                const count = counts?.[category]

                return (
                    <Button
                        key={category}
                        variant={isSelected ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => onToggleCategory(category)}
                        className={cn('gap-2 transition-all', isSelected && 'shadow-sm')}
                    >
                        {Icon && <Icon className="h-4 w-4" />}
                        <span>{t(category)}</span>
                        {count !== undefined && (
                            <Badge
                                variant={isSelected ? 'secondary' : 'outline'}
                                className="ml-1 h-5 min-w-5 px-1 text-xs"
                            >
                                {count}
                            </Badge>
                        )}
                    </Button>
                )
            })}
        </div>
    )
}