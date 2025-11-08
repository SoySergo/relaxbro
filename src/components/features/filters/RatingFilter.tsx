'use client'

import * as React from 'react'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'

interface RatingFilterProps {
    value: number
    onValueChange: (value: number) => void
    className?: string
}

export const RatingFilter = React.memo(function RatingFilter({
    value,
    onValueChange,
    className,
}: RatingFilterProps) {
    const t = useTranslations('filters')

    // Локальное состояние для плавного UI во время перетаскивания
    const [isDragging, setIsDragging] = React.useState(false)
    const [localValue, setLocalValue] = React.useState(value)

    // Таймер для debounce
    const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null)

    // Синхронизация только если не перетаскиваем
    React.useEffect(() => {
        if (!isDragging) {
            setLocalValue(value)
        }
    }, [value, isDragging])

    // Очистка таймера при размонтировании
    React.useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current)
            }
        }
    }, [])

    // Обработчик изменения - обновляет UI мгновенно
    const handleValueChange = React.useCallback(
        (newValue: number[]) => {
            if (newValue.length !== 1) return

            const rating = newValue[0]
            setIsDragging(true)
            setLocalValue(rating)

            // Debounce для onValueChange
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current)
            }

            debounceTimerRef.current = setTimeout(() => {
                onValueChange(rating)
            }, 300)
        },
        [onValueChange]
    )

    // Commit изменений при завершении перетаскивания
    const handleValueCommit = React.useCallback(
        (newValue: number[]) => {
            if (newValue.length !== 1) return

            const rating = newValue[0]

            // Очищаем debounce таймер
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current)
            }

            setIsDragging(false)
            setLocalValue(rating)
            onValueChange(rating)
        },
        [onValueChange]
    )

    // Обработчик клика по звезде
    const handleStarClick = React.useCallback(
        (rating: number) => {
            setLocalValue(rating)
            onValueChange(rating)
        },
        [onValueChange]
    )

    return (
        <div className={cn('space-y-3', className)}>
            <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    {t('min-rating')}
                </Label>
                <span className="text-sm font-semibold tabular-nums">
                    {localValue.toFixed(1)}
                </span>
            </div>

            <Slider
                value={[localValue]}
                onValueChange={handleValueChange}
                onValueCommit={handleValueCommit}
                max={5}
                min={0}
                step={0.5}
                className="flex-1"
                aria-label={t('min-rating')}
            />

            <div className="flex items-center gap-1 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star)}
                        className="focus:outline-none focus:ring-2 focus:ring-ring rounded p-0.5"
                    >
                        <Star
                            className={cn(
                                'h-5 w-5 transition-all cursor-pointer hover:scale-110',
                                star <= localValue
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300 hover:text-gray-400'
                            )}
                        />
                    </button>
                ))}
            </div>
        </div>
    )
})
