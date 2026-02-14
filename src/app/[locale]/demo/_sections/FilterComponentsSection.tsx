'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { SortDropdown, type SortOption } from '@/components/features/filters/SortDropdown'
import { DurationFilter, type DurationType } from '@/components/features/filters/DurationFilter'
import { Badge } from '@/components/ui/badge'

export function FilterComponentsSection() {
  const [sortValue, setSortValue] = useState<SortOption>('popular')
  const [durationValue, setDurationValue] = useState<DurationType[]>([])

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Filter Components</CardTitle>
        <CardDescription>
          Новые компоненты фильтрации: сортировка и длительность
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Sort Dropdown */}
        <div className="space-y-3">
          <Label>Sort Dropdown (NEW)</Label>
          <p className="text-sm text-muted-foreground">
            Dropdown для сортировки с иконками
          </p>
          <div className="max-w-xs">
            <SortDropdown
              value={sortValue}
              onChange={setSortValue}
            />
          </div>
          <div className="mt-2">
            <Badge variant="secondary">Выбрано: {sortValue}</Badge>
          </div>
        </div>

        <Separator />

        {/* Duration Filter */}
        <div className="space-y-3">
          <Label>Duration Filter (NEW)</Label>
          <p className="text-sm text-muted-foreground">
            Multi-select фильтр по длительности активностей
          </p>
          <div className="max-w-md">
            <DurationFilter
              value={durationValue}
              onChange={setDurationValue}
            />
          </div>
          {durationValue.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-sm text-muted-foreground">Выбрано:</span>
              {durationValue.map((duration) => (
                <Badge key={duration} variant="secondary">
                  {duration}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Separator />

        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">Интеграция с FilterBar</p>
          <p className="text-sm text-muted-foreground">
            Эти компоненты уже интегрированы в FilterBar компонент, который отображается в основном demo выше.
            FilterBar объединяет поиск, категории, расширенные фильтры (рейтинг, цена, "открыто сейчас")
            и эти новые фильтры в единый интерфейс.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
