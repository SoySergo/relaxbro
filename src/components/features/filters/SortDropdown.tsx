'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, ArrowUp, ArrowDown, Star, TrendingUp, Calendar } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export type SortOption =
  | 'popular'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'new'

interface SortDropdownProps {
  value: SortOption
  onChange: (value: SortOption) => void
  disabled?: boolean
  className?: string
}

const sortIcons: Record<SortOption, React.ReactNode> = {
  popular: <TrendingUp className="h-4 w-4" />,
  'price-asc': <ArrowUp className="h-4 w-4" />,
  'price-desc': <ArrowDown className="h-4 w-4" />,
  rating: <Star className="h-4 w-4" />,
  new: <Calendar className="h-4 w-4" />,
}

export function SortDropdown({
  value,
  onChange,
  disabled,
  className,
}: SortDropdownProps) {
  const t = useTranslations('activities.filters')
  const [open, setOpen] = React.useState(false)

  const sortOptions: Array<{ value: SortOption; label: string }> = [
    { value: 'popular', label: t('popular') },
    { value: 'price-asc', label: t('price-asc') },
    { value: 'price-desc', label: t('price-desc') },
    { value: 'rating', label: t('rating') },
    { value: 'new', label: t('new') },
  ]

  const selectedOption = sortOptions.find((option) => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Выбрать сортировку"
          className={cn('w-full justify-between', className)}
          disabled={disabled}
        >
          <div className="flex items-center gap-2">
            {sortIcons[value]}
            <span>{selectedOption?.label}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>Ничего не найдено</CommandEmpty>
            <CommandGroup>
              {sortOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                  className="cursor-pointer"
                >
                  {sortIcons[option.value]}
                  <span className="ml-2">{option.label}</span>
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
