'use client'

import { Check, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface IncludedListProps {
  included: string[]
  notIncluded?: string[]
  variant?: 'minimal' | 'detailed'
  className?: string
}

export function IncludedList({
  included,
  notIncluded = [],
  variant = 'minimal',
  className,
}: IncludedListProps) {
  const t = useTranslations('activities.common')

  if (variant === 'minimal') {
    return (
      <div className={cn('space-y-2', className)}>
        {/* Included */}
        <ul className="space-y-1.5">
          {included.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Not Included (if any) */}
        {notIncluded.length > 0 && (
          <ul className="space-y-1.5 mt-4">
            {notIncluded.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  // Detailed variant with headers and columns
  return (
    <div className={cn('grid gap-6 md:grid-cols-2', className)}>
      {/* Included Section */}
      <div>
        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <Check className="h-4 w-4 text-green-600" />
          {t('included')}
        </h4>
        <ul className="space-y-2">
          {included.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Not Included Section */}
      {notIncluded.length > 0 && (
        <div>
          <h4 className="font-semibold text-sm mb-3 flex items-center gap-2 text-muted-foreground">
            <X className="h-4 w-4 text-red-500" />
            {t('not-included')}
          </h4>
          <ul className="space-y-2">
            {notIncluded.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
