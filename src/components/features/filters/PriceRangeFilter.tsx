'use client'

import * as React from 'react'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface PriceRangeFilterProps {
    value: [number, number]
    onValueChange: (value: [number, number]) => void
    min?: number
    max?: number
    step?: number
    currency?: string
    className?: string
}

// Двухсегментная шкала:
// 0-50% слайдера = 0-500€ (шаг 50€)
// 50-100% слайдера = 500-5000€ (шаг 100€)
const MIDPOINT_PRICE = 500
const MAX_PRICE = 5000
const STEP_LOW = 50 // шаг для 0-500€
const STEP_HIGH = 100 // шаг для 500-5000€

// Конвертация реальной цены в позицию слайдера (0-100)
function priceToSlider(price: number): number {
    if (price <= MIDPOINT_PRICE) {
        // Первая половина: 0-50
        return (price / MIDPOINT_PRICE) * 50
    } else {
        // Вторая половина: 50-100
        const priceAboveMid = price - MIDPOINT_PRICE
        const rangeAboveMid = MAX_PRICE - MIDPOINT_PRICE
        return 50 + (priceAboveMid / rangeAboveMid) * 50
    }
}

// Конвертация позиции слайдера (0-100) обратно в цену
function sliderToPrice(position: number): number {
    if (position <= 50) {
        // Первая половина: 0-500€
        const price = (position / 50) * MIDPOINT_PRICE
        return Math.round(price / STEP_LOW) * STEP_LOW
    } else {
        // Вторая половина: 500-5000€
        const positionAboveMid = position - 50
        const priceAboveMid = (positionAboveMid / 50) * (MAX_PRICE - MIDPOINT_PRICE)
        const price = MIDPOINT_PRICE + priceAboveMid
        return Math.round(price / STEP_HIGH) * STEP_HIGH
    }
}

export const PriceRangeFilter = React.memo(function PriceRangeFilter({
    value,
    onValueChange,
    currency = '€',
    className,
}: PriceRangeFilterProps) {
    const t = useTranslations('filters')

    // Локальное состояние для плавного UI во время перетаскивания
    const [isDragging, setIsDragging] = React.useState(false)
    const [localValue, setLocalValue] = React.useState<[number, number]>(value)

    // Таймер для debounce
    const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null)

    // Конвертация текущих значений цен в позиции слайдера
    const sliderValue = React.useMemo<[number, number]>(
        () => [priceToSlider(localValue[0]), priceToSlider(localValue[1])],
        [localValue]
    )

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

    // Обработчик изменения - конвертирует позицию слайдера обратно в цену
    const handleValueChange = React.useCallback(
        (newValue: number[]) => {
            if (newValue.length !== 2) return

            const sliderPositions = newValue as [number, number]
            const prices: [number, number] = [
                sliderToPrice(sliderPositions[0]),
                sliderToPrice(sliderPositions[1]),
            ]

            setIsDragging(true)
            setLocalValue(prices)

            // Debounce для onValueChange
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current)
            }

            debounceTimerRef.current = setTimeout(() => {
                onValueChange(prices)
            }, 300)
        },
        [onValueChange]
    )

    // Commit изменений при завершении перетаскивания
    const handleValueCommit = React.useCallback(
        (newValue: number[]) => {
            if (newValue.length !== 2) return

            const sliderPositions = newValue as [number, number]
            const prices: [number, number] = [
                sliderToPrice(sliderPositions[0]),
                sliderToPrice(sliderPositions[1]),
            ]

            // Очищаем debounce таймер
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current)
            }

            setIsDragging(false)
            setLocalValue(prices)
            onValueChange(prices)
        },
        [onValueChange]
    )

    // Форматирование цены
    const formatPrice = React.useCallback((price: number) => {
        return new Intl.NumberFormat('ru-RU').format(price)
    }, [])

    // Обработчик изменения в полях ввода
    const handleInputChange = React.useCallback(
        (index: 0 | 1, value: string) => {
            const numValue = parseInt(value) || 0
            const clampedValue = Math.min(Math.max(numValue, 0), MAX_PRICE)

            const newValue: [number, number] = [...localValue]
            newValue[index] = clampedValue

            // Проверяем, чтобы min не был больше max
            if (index === 0 && newValue[0] > newValue[1]) {
                newValue[1] = newValue[0]
            } else if (index === 1 && newValue[1] < newValue[0]) {
                newValue[0] = newValue[1]
            }

            setLocalValue(newValue)
            onValueChange(newValue)
        },
        [localValue, onValueChange]
    )

    return (
        <div className={cn('space-y-4', className)}>
            <Label className="text-sm font-semibold">{t('price-range')}</Label>

            {/* Поля ввода */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground font-semibold">
                        От
                    </Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            {currency}
                        </span>
                        <input
                            type="number"
                            value={localValue[0]}
                            onChange={(e) => handleInputChange(0, e.target.value)}
                            className="w-full h-9 pl-7 pr-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="0"
                            min="0"
                            max={MAX_PRICE}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground font-semibold">
                        До
                    </Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            {currency}
                        </span>
                        <input
                            type="number"
                            value={localValue[1]}
                            onChange={(e) => handleInputChange(1, e.target.value)}
                            className="w-full h-9 pl-7 pr-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder={MAX_PRICE.toString()}
                            min="0"
                            max={MAX_PRICE}
                        />
                    </div>
                </div>
            </div>

            {/* Слайдер */}
            <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-semibold">
                    Быстрый выбор
                </Label>
                <Slider
                    value={sliderValue}
                    onValueChange={handleValueChange}
                    onValueCommit={handleValueCommit}
                    max={100}
                    min={0}
                    step={0.1}
                    className="flex-1"
                    aria-label={t('price-range')}
                />
                <div className="relative text-xs text-muted-foreground">
                    <div className="flex justify-between">
                        <span>{currency}0</span>
                        <span className="absolute left-1/2 -translate-x-1/2">{currency}500</span>
                        <span>{currency}{formatPrice(MAX_PRICE)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
})
