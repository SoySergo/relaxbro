'use client';

import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface CategoryCardProps {
    /**
     * Category name
     */
    name: string;
    /**
     * Category icon component
     */
    icon: LucideIcon;
    /**
     * Number of places in this category
     */
    count?: number;
    /**
     * Category description (optional)
     */
    description?: string;
    /**
     * Whether the card is selected/active
     * @default false
     */
    isActive?: boolean;
    /**
     * Click handler
     */
    onClick?: () => void;
    /**
     * Custom className
     */
    className?: string;
    /**
     * Icon color
     */
    iconColor?: string;
    /**
     * Background gradient colors
     */
    gradient?: {
        from: string;
        to: string;
    };
}

export function CategoryCard({
    name,
    icon: Icon,
    count,
    description,
    isActive = false,
    onClick,
    className,
    iconColor = 'text-primary',
    gradient,
}: CategoryCardProps) {
    const handleClick = () => {
        onClick?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        }
    };

    return (
        <Card
            className={cn(
                'group relative overflow-hidden transition-all duration-200 cursor-pointer',
                'hover:shadow-md hover:border-primary/50',
                isActive && 'ring-2 ring-primary ring-offset-2',
                className
            )}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={onClick ? 0 : undefined}
            role={onClick ? 'button' : undefined}
            aria-pressed={isActive}
        >
            {/* Background Gradient */}
            {gradient && (
                <div
                    className={cn(
                        'absolute inset-0 opacity-0 transition-opacity duration-300',
                        'group-hover:opacity-10'
                    )}
                    style={{
                        background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                    }}
                />
            )}

            <CardContent className="relative p-6">
                <div className="flex flex-col items-center text-center space-y-3">
                    {/* Icon */}
                    <div
                        className={cn(
                            'rounded-full p-4 transition-colors duration-200',
                            'bg-primary/10',
                            isActive && 'bg-primary/20'
                        )}
                    >
                        <Icon
                            className={cn(
                                'h-8 w-8',
                                iconColor,
                                isActive && 'text-primary'
                            )}
                        />
                    </div>

                    {/* Name */}
                    <h3
                        className={cn(
                            'font-semibold text-lg',
                            isActive && 'text-primary'
                        )}
                    >
                        {name}
                    </h3>

                    {/* Description */}
                    {description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {description}
                        </p>
                    )}

                    {/* Count Badge */}
                    {count !== undefined && (
                        <Badge
                            variant={isActive ? 'default' : 'secondary'}
                            className="mt-2"
                        >
                            {count.toLocaleString()} {count === 1 ? 'место' : 'мест'}
                        </Badge>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

CategoryCard.displayName = 'CategoryCard';
