'use client';

import * as React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RatingProps {
    /**
     * Current rating value (0 to max)
     */
    value: number;
    /**
     * Maximum rating value
     * @default 5
     */
    max?: number;
    /**
     * Whether the rating is readonly (display only)
     * @default false
     */
    readonly?: boolean;
    /**
     * Callback when rating changes
     */
    onChange?: (value: number) => void;
    /**
     * Size variant
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Whether to show half stars
     * @default true
     */
    allowHalf?: boolean;
    /**
     * Custom className
     */
    className?: string;
    /**
     * Whether to show the numeric value
     * @default false
     */
    showValue?: boolean;
    /**
     * Whether to show the count of ratings
     */
    count?: number;
}

const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
};

const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
};

export function Rating({
    value,
    max = 5,
    readonly = false,
    onChange,
    size = 'md',
    allowHalf = true,
    className,
    showValue = false,
    count,
}: RatingProps) {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);
    const [localValue, setLocalValue] = React.useState(value);

    React.useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleStarClick = (starIndex: number, isHalf: boolean) => {
        if (readonly) return;

        const newValue = isHalf ? starIndex + 0.5 : starIndex + 1;
        setLocalValue(newValue);
        onChange?.(newValue);
    };

    const handleStarHover = (starIndex: number, isHalf: boolean) => {
        if (readonly) return;

        const newValue = isHalf ? starIndex + 0.5 : starIndex + 1;
        setHoverValue(newValue);
    };

    const handleMouseLeave = () => {
        if (!readonly) {
            setHoverValue(null);
        }
    };

    const displayValue = hoverValue ?? localValue;

    const getStarFill = (starIndex: number): 'full' | 'half' | 'empty' => {
        const currentValue = displayValue;

        if (currentValue >= starIndex + 1) {
            return 'full';
        } else if (allowHalf && currentValue >= starIndex + 0.5) {
            return 'half';
        }
        return 'empty';
    };

    return (
        <div className={cn('flex items-center gap-1', className)}>
            <div
                className="flex items-center gap-0.5"
                onMouseLeave={handleMouseLeave}
                role="radiogroup"
                aria-label={`Rating: ${value} out of ${max}`}
            >
                {Array.from({ length: max }, (_, i) => {
                    const starIndex = i;
                    const fill = getStarFill(starIndex);

                    return (
                        <div
                            key={starIndex}
                            className={cn(
                                'relative inline-flex',
                                !readonly && 'cursor-pointer transition-transform hover:scale-110'
                            )}
                            role="radio"
                            aria-checked={starIndex < value}
                            tabIndex={readonly ? -1 : 0}
                            onKeyDown={(e) => {
                                if (readonly) return;
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleStarClick(starIndex, false);
                                }
                            }}
                        >
                            {/* Full star or empty star background */}
                            <Star
                                className={cn(
                                    sizeClasses[size],
                                    'transition-colors',
                                    fill === 'empty' && !readonly && 'text-muted-foreground/20',
                                    fill === 'empty' && readonly && 'text-muted-foreground/30',
                                    fill !== 'empty' && 'text-amber-400 fill-amber-400'
                                )}
                                onMouseEnter={() => handleStarHover(starIndex, false)}
                                onClick={() => handleStarClick(starIndex, false)}
                            />

                            {/* Half star overlay */}
                            {allowHalf && fill !== 'full' && (
                                <div
                                    className="absolute inset-0 overflow-hidden"
                                    style={{ width: '50%' }}
                                    onMouseEnter={() => handleStarHover(starIndex, true)}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleStarClick(starIndex, true);
                                    }}
                                >
                                    <Star
                                        className={cn(
                                            sizeClasses[size],
                                            'transition-colors',
                                            fill === 'half' && 'text-amber-400 fill-amber-400',
                                            fill === 'empty' && !readonly && 'text-muted-foreground/20',
                                            fill === 'empty' && readonly && 'text-muted-foreground/30'
                                        )}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Numeric value and count */}
            {(showValue || count !== undefined) && (
                <div className={cn('flex items-center gap-1', textSizeClasses[size])}>
                    {showValue && (
                        <span className="font-medium text-foreground">
                            {displayValue.toFixed(1)}
                        </span>
                    )}
                    {count !== undefined && (
                        <span className="text-muted-foreground">
                            ({count.toLocaleString()})
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

Rating.displayName = 'Rating';
