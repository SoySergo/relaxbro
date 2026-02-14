'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { PriceDisplay, PriceRangeDisplay } from '@/components/ui/price-display'
import { DurationBadge } from '@/components/ui/duration-badge'
import { GroupSizeBadge } from '@/components/ui/group-size-badge'
import { MeetingPointBadge } from '@/components/ui/meeting-point-badge'
import { TagList } from '@/components/ui/tag-list'
import { OrganizerBadge } from '@/components/features/organizer-badge'
import { IncludedList } from '@/components/features/included-list'
import { DatePicker, DateRangePicker } from '@/components/ui/date-picker'
import { CalendarAvailability, type AvailabilitySlot } from '@/components/features/calendar-availability'

export function ActivityComponentsSection() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>()
  const [availabilityDate, setAvailabilityDate] = useState<Date>()

  // Mock availability data
  const mockAvailability: AvailabilitySlot[] = [
    { date: new Date(2025, 10, 10), available: true, slots: 8, price: 45, currency: 'EUR' },
    { date: new Date(2025, 10, 11), available: true, slots: 2, price: 45, currency: 'EUR' },
    { date: new Date(2025, 10, 12), available: true, slots: 12, price: 50, currency: 'EUR' },
    { date: new Date(2025, 10, 13), available: false, slots: 0, price: 45, currency: 'EUR' },
    { date: new Date(2025, 10, 14), available: true, slots: 1, price: 45, currency: 'EUR' },
    { date: new Date(2025, 10, 15), available: true, slots: 10, price: 40, currency: 'EUR' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Components (NEW)</CardTitle>
        <CardDescription>
          Новые компоненты для раздела активностей
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Price Display */}
        <div className="space-y-3">
          <Label>Price Display Component</Label>
          <div className="flex flex-wrap gap-4 items-center">
            <PriceDisplay amount={45} currency="EUR" prefix="от" size="sm" />
            <PriceDisplay amount={99} currency="EUR" size="md" />
            <PriceDisplay amount={150} currency="USD" size="lg" />
            <PriceDisplay amount={3500} currency="RUB" prefix="от" suffix="на человека" />
            <PriceRangeDisplay min={30} max={80} currency="EUR" />
          </div>
        </div>

        <Separator />

        {/* Duration Badges */}
        <div className="space-y-3">
          <Label>Duration Badges</Label>
          <div className="flex flex-wrap gap-3">
            <DurationBadge value={2} unit="hours" variant="default" />
            <DurationBadge value={4} unit="hours" variant="compact" />
            <DurationBadge value={8} unit="hours" />
            <DurationBadge value={1} unit="days" />
            <DurationBadge value={3} unit="days" />
          </div>
        </div>

        <Separator />

        {/* Group Size Badges */}
        <div className="space-y-3">
          <Label>Group Size Badges</Label>
          <div className="flex flex-wrap gap-3">
            <GroupSizeBadge max={8} />
            <GroupSizeBadge min={2} max={10} />
            <GroupSizeBadge max={15} type="group" />
            <GroupSizeBadge max={4} type="private" />
          </div>
        </div>

        <Separator />

        {/* Meeting Point Badges */}
        <div className="space-y-3">
          <Label>Meeting Point Badges</Label>
          <div className="flex flex-wrap gap-3">
            <MeetingPointBadge address="Plaça de Catalunya, Barcelona" variant="compact" />
            <MeetingPointBadge
              address="Carrer de Mallorca, 401, L'Eixample, 08013 Barcelona, España"
              variant="full"
            />
            <MeetingPointBadge address="Центр города" isFlexible={true} />
          </div>
        </div>

        <Separator />

        {/* Organizer Badges */}
        <div className="space-y-3">
          <Label>Organizer Badges</Label>
          <div className="flex flex-col gap-3">
            <OrganizerBadge
              name="Barcelona Adventures"
              avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
              type="business"
              verified={true}
              size="sm"
            />
            <OrganizerBadge
              name="Maria Garcia - Local Guide"
              avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
              type="individual"
              verified={false}
              size="md"
            />
          </div>
        </div>

        <Separator />

        {/* Tag Lists */}
        <div className="space-y-3">
          <Label>Tag Lists</Label>
          <div className="space-y-4">
            <TagList
              tags={['adventure', 'photography', 'sunset', 'small-group', 'english', 'español']}
              max={4}
            />
            <TagList
              tags={['gaudi', 'architecture', 'cultural', 'walking']}
              variant="compact"
              colorful
            />
          </div>
        </div>

        <Separator />

        {/* Included/Not Included Lists */}
        <div className="space-y-3">
          <Label>Included/Not Included Lists</Label>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-3">Minimal variant:</p>
              <IncludedList
                included={[
                  'Профессиональный гид',
                  'Входные билеты в музеи',
                  'Транспорт на автобусе',
                  'Бутылка воды'
                ]}
                notIncluded={['Обед', 'Личные расходы']}
                variant="minimal"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-3">Detailed variant (two columns):</p>
              <IncludedList
                included={[
                  'Профессиональный гид',
                  'Входные билеты',
                  'Транспорт',
                  'Буклет с картой',
                  'Бутылка воды'
                ]}
                notIncluded={[
                  'Обед и напитки',
                  'Чаевые',
                  'Личные расходы'
                ]}
                variant="detailed"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Date Picker */}
        <div className="space-y-3">
          <Label>Date Picker (NEW)</Label>
          <div className="space-y-4 max-w-sm">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Single Date:</p>
              <DatePicker
                value={selectedDate}
                onChange={setSelectedDate}
                placeholder="Выберите дату активности"
              />
              {selectedDate && (
                <p className="text-xs text-muted-foreground mt-2">
                  Выбрано: {selectedDate.toLocaleDateString('ru-RU')}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Date Range:</p>
              <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
                placeholder="Выберите период"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Calendar Availability */}
        <div className="space-y-3">
          <Label>Calendar Availability (NEW)</Label>
          <p className="text-sm text-muted-foreground">
            Календарь с индикацией доступности мест и цен
          </p>
          <CalendarAvailability
            availableDates={mockAvailability}
            selectedDate={availabilityDate}
            onDateSelect={(slot) => setAvailabilityDate(slot?.date)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
