'use client';

import { useState } from 'react';
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Rating,
    Badge,
    Input,
    Label,
    Separator,
    ImageUploader,
    SearchInput,
    type ImageFile,
} from '@/components/ui';
import { CategoryCard, PlaceCard, PlaceCardSkeleton } from '@/components/features';
import { ActivityCard, ActivityCardSkeleton } from '@/components/features/activity-card';
import { OrganizerBadge } from '@/components/features/organizer-badge';
import { IncludedList } from '@/components/features/included-list';
import { PriceDisplay, PriceRangeDisplay } from '@/components/ui/price-display';
import { DurationBadge } from '@/components/ui/duration-badge';
import { GroupSizeBadge } from '@/components/ui/group-size-badge';
import { MeetingPointBadge } from '@/components/ui/meeting-point-badge';
import { TagList } from '@/components/ui/tag-list';
import { FilterChips, type FilterChipItem } from '@/components/ui/filter-chips';
import { Header, Footer, Container } from '@/components/layout';
import { Waves, Sparkles, UtensilsCrossed, Trees, Palette, Music, Compass } from 'lucide-react';

export default function DemoPage() {
    const [ratingValue, setRatingValue] = useState(3.5);
    const [readonlyRating] = useState(4.5);
    const [uploadedImages, setUploadedImages] = useState<ImageFile[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [activeFilters, setActiveFilters] = useState<FilterChipItem[]>([
        { id: '1', label: 'Туры и экскурсии', icon: <Compass className="h-3 w-3" /> },
        { id: '2', label: 'от €30 до €80' },
        { id: '3', label: 'Полный день' },
    ]);

    return (
        <div className="container mx-auto py-10 space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold">Component Demo Page</h1>
                <p className="text-muted-foreground">
                    Testing ground for all UI components including Layout, UI elements, and Features
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline">25+ UI Components</Badge>
                    <Badge variant="outline">3 Custom Components</Badge>
                    <Badge variant="outline">2 Feature Components</Badge>
                    <Badge variant="outline">3 Layout Components</Badge>
                    <Badge variant="outline">Full i18n Support</Badge>
                </div>
            </div>

            <Separator />

            {/* Rating Component Demos */}
            <Card>
                <CardHeader>
                    <CardTitle>Rating Component</CardTitle>
                    <CardDescription>
                        Interactive star rating component with different variants
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Size variants */}
                    <div className="space-y-3">
                        <Label>Size Variants</Label>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-4">
                                <span className="w-24 text-sm">Small:</span>
                                <Rating size="sm" value={4} onChange={(v) => console.log(v)} />
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="w-24 text-sm">Medium:</span>
                                <Rating size="md" value={4} onChange={(v) => console.log(v)} />
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="w-24 text-sm">Large:</span>
                                <Rating size="lg" value={4} onChange={(v) => console.log(v)} />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Interactive rating */}
                    <div className="space-y-3">
                        <Label>Interactive Rating</Label>
                        <div className="flex items-center gap-4">
                            <Rating
                                value={ratingValue}
                                onChange={setRatingValue}
                                showValue
                                size="lg"
                            />
                            <Badge>{ratingValue.toFixed(1)} stars</Badge>
                        </div>
                    </div>

                    <Separator />

                    {/* Readonly ratings */}
                    <div className="space-y-3">
                        <Label>Readonly Ratings</Label>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-4">
                                <span className="w-32 text-sm">Full stars:</span>
                                <Rating value={5} readonly showValue count={1234} />
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="w-32 text-sm">Half stars:</span>
                                <Rating value={readonlyRating} readonly showValue count={567} />
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="w-32 text-sm">Low rating:</span>
                                <Rating value={2} readonly showValue count={89} />
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="w-32 text-sm">No half stars:</span>
                                <Rating
                                    value={3.7}
                                    readonly
                                    allowHalf={false}
                                    showValue
                                    count={42}
                                />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Without numeric value */}
                    <div className="space-y-3">
                        <Label>Simple Display (no numbers)</Label>
                        <div className="flex gap-6">
                            <Rating value={5} readonly />
                            <Rating value={4} readonly />
                            <Rating value={3} readonly />
                            <Rating value={2} readonly />
                            <Rating value={1} readonly />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Buttons Demo */}
            <Card>
                <CardHeader>
                    <CardTitle>Buttons</CardTitle>
                    <CardDescription>Different button variants and sizes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                        <Button>Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                    </div>
                    <Separator />
                    <div className="flex flex-wrap gap-3 items-center">
                        <Button size="sm">Small</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">Large</Button>
                        <Button size="icon">🔍</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Form Elements */}
            <Card>
                <CardHeader>
                    <CardTitle>Form Elements</CardTitle>
                    <CardDescription>Inputs and other form components</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-3">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="your@email.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="search">Search</Label>
                            <Input id="search" type="search" placeholder="Search places..." />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Badges Demo */}
            <Card>
                <CardHeader>
                    <CardTitle>Badges</CardTitle>
                    <CardDescription>Different badge variants</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="outline">Outline</Badge>
                    </div>
                </CardContent>
            </Card>

            {/* Image Uploader Demo */}
            <Card>
                <CardHeader>
                    <CardTitle>Image Uploader</CardTitle>
                    <CardDescription>
                        Drag & drop image uploader with preview and validation
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <Label>Upload Images (max 5 files)</Label>
                        <ImageUploader
                            value={uploadedImages}
                            onChange={setUploadedImages}
                            maxFiles={5}
                            maxSize={5 * 1024 * 1024}
                        />
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        <Label>Disabled State</Label>
                        <ImageUploader
                            value={[]}
                            onChange={() => { }}
                            disabled
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Search Input Demo */}
            <Card>
                <CardHeader>
                    <CardTitle>Search Input</CardTitle>
                    <CardDescription>
                        Search input with debounce, clear button, and loading state
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Basic Search</Label>
                        <SearchInput
                            value={searchValue}
                            onChange={(value) => {
                                setDebouncedSearchValue(value);
                                setSearchValue(value);
                            }}
                            placeholder="Search places..."
                        />
                        {debouncedSearchValue && (
                            <p className="text-sm text-muted-foreground">
                                Debounced value: &quot;{debouncedSearchValue}&quot;
                            </p>
                        )}
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        <Label>With Loading State</Label>
                        <SearchInput
                            value={searchValue}
                            onChange={setSearchValue}
                            onSearch={(value) => {
                                setSearchLoading(true);
                                console.log('Searching for:', value);
                                setTimeout(() => setSearchLoading(false), 2000);
                            }}
                            loading={searchLoading}
                            placeholder="Search with loading... (Press Enter to trigger)"
                        />
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                onClick={() => setSearchLoading(true)}
                            >
                                Start Loading
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSearchLoading(false)}
                            >
                                Stop Loading
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        <Label>Disabled State</Label>
                        <SearchInput
                            value=""
                            onChange={() => { }}
                            disabled
                            placeholder="Disabled search..."
                        />
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        <Label>Without Clear Button</Label>
                        <SearchInput
                            value={searchValue}
                            onChange={setSearchValue}
                            showClearButton={false}
                            placeholder="No clear button..."
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Category Card Demo */}
            <Card>
                <CardHeader>
                    <CardTitle>Category Cards</CardTitle>
                    <CardDescription>
                        Interactive category cards with icons, counts, and hover effects
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Category Grid</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <CategoryCard
                                name="Активный отдых"
                                icon={Waves}
                                count={45}
                                description="Водные виды спорта и активности"
                                isActive={selectedCategory === 'active'}
                                onClick={() => setSelectedCategory(
                                    selectedCategory === 'active' ? null : 'active'
                                )}
                                iconColor="text-blue-500"
                                gradient={{ from: '#3b82f6', to: '#60a5fa' }}
                            />
                            <CategoryCard
                                name="Wellness & SPA"
                                icon={Sparkles}
                                count={32}
                                description="Релаксация и оздоровление"
                                isActive={selectedCategory === 'spa'}
                                onClick={() => setSelectedCategory(
                                    selectedCategory === 'spa' ? null : 'spa'
                                )}
                                iconColor="text-green-500"
                                gradient={{ from: '#10b981', to: '#34d399' }}
                            />
                            <CategoryCard
                                name="Гастрономия"
                                icon={UtensilsCrossed}
                                count={128}
                                description="Рестораны и кафе"
                                isActive={selectedCategory === 'food'}
                                onClick={() => setSelectedCategory(
                                    selectedCategory === 'food' ? null : 'food'
                                )}
                                iconColor="text-orange-500"
                                gradient={{ from: '#f97316', to: '#fb923c' }}
                            />
                            <CategoryCard
                                name="Природа"
                                icon={Trees}
                                count={67}
                                description="Парки и природные места"
                                isActive={selectedCategory === 'nature'}
                                onClick={() => setSelectedCategory(
                                    selectedCategory === 'nature' ? null : 'nature'
                                )}
                                iconColor="text-emerald-600"
                                gradient={{ from: '#059669', to: '#10b981' }}
                            />
                            <CategoryCard
                                name="Культура"
                                icon={Palette}
                                count={89}
                                description="Музеи и галереи"
                                isActive={selectedCategory === 'culture'}
                                onClick={() => setSelectedCategory(
                                    selectedCategory === 'culture' ? null : 'culture'
                                )}
                                iconColor="text-purple-500"
                                gradient={{ from: '#a855f7', to: '#c084fc' }}
                            />
                            <CategoryCard
                                name="Ночная жизнь"
                                icon={Music}
                                count={54}
                                description="Бары и клубы"
                                isActive={selectedCategory === 'nightlife'}
                                onClick={() => setSelectedCategory(
                                    selectedCategory === 'nightlife' ? null : 'nightlife'
                                )}
                                iconColor="text-pink-500"
                                gradient={{ from: '#ec4899', to: '#f472b6' }}
                            />
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        <Label>Without Count</Label>
                        <div className="grid grid-cols-2 gap-4">
                            <CategoryCard
                                name="Без счётчика"
                                icon={Waves}
                                onClick={() => console.log('Clicked')}
                            />
                            <CategoryCard
                                name="С описанием"
                                icon={Sparkles}
                                description="Только с описанием, без количества"
                                onClick={() => console.log('Clicked')}
                            />
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        <Label>Non-interactive</Label>
                        <div className="grid grid-cols-2 gap-4">
                            <CategoryCard
                                name="Только отображение"
                                icon={Trees}
                                count={25}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Place Card Demo */}
            <Card>
                <CardHeader>
                    <CardTitle>Place Cards</CardTitle>
                    <CardDescription>
                        Place cards with images, ratings, favorites, and skeleton loaders
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Place Cards Grid</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <PlaceCard
                                id="1"
                                name="Park Güell"
                                images={[
                                    'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
                                    'https://images.unsplash.com/photo-1512813195452-3e6e0d4f1b0d?w=800&q=80',
                                    'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80'
                                ]}
                                category="Культура"
                                rating={4.8}
                                reviewsCount={1234}
                                location="Carrer d&apos;Olot, Barcelona"
                                price={{ from: 15, currency: 'EUR' }}
                                tags={['architecture', 'gaudi', 'park', 'unesco']}
                                organizer={{
                                    name: 'Park Güell Official',
                                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
                                    type: 'business',
                                    verified: true
                                }}
                                isVerified={true}
                                onClick={(id) => console.log('Clicked place:', id)}
                                onFavoriteClick={(id, isFav) => console.log('Favorite:', id, isFav)}
                            />
                            <PlaceCard
                                id="2"
                                name="La Sagrada Família"
                                images={[
                                    'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&q=80',
                                    'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80',
                                    'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=800&q=80',
                                    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80'
                                ]}
                                category="Культура"
                                rating={5}
                                reviewsCount={5678}
                                location="Carrer de Mallorca, Barcelona"
                                priceLevel={3}
                                tags={['basilica', 'gaudi', 'unesco', 'landmark']}
                                organizer={{
                                    name: 'Sagrada Família Foundation',
                                    avatar: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=100&q=80',
                                    type: 'business',
                                    verified: true
                                }}
                                isVerified={true}
                                isFavorite={true}
                                onClick={(id) => console.log('Clicked place:', id)}
                                onFavoriteClick={(id, isFav) => console.log('Favorite:', id, isFav)}
                            />
                            <PlaceCard
                                id="3"
                                name="Barceloneta Beach"
                                images={[
                                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
                                    'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
                                    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80'
                                ]}
                                category="Активный отдых"
                                rating={4.5}
                                reviewsCount={892}
                                location="Platja de la Barceloneta"
                                price={{ from: 0, currency: 'EUR' }}
                                tags={['beach', 'sea', 'swimming', 'free']}
                                organizer={{
                                    name: 'Barcelona City Council',
                                    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
                                    type: 'business',
                                    verified: true
                                }}
                                isSelected={true}
                                onClick={(id) => console.log('Clicked place:', id)}
                                onFavoriteClick={(id, isFav) => console.log('Favorite:', id, isFav)}
                            />
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        <Label>Skeleton Loaders</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <PlaceCardSkeleton />
                            <PlaceCardSkeleton />
                            <PlaceCardSkeleton />
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        <Label>Minimal (No location, No price)</Label>
                        <div className="grid grid-cols-2 gap-4">
                            <PlaceCard
                                id="4"
                                name="Casa Batlló"
                                images={[
                                    'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80',
                                    'https://images.unsplash.com/photo-1512699355324-f07e3106dae5?w=800&q=80'
                                ]}
                                category="Архитектура"
                                rating={4.7}
                                reviewsCount={234}
                                onClick={(id) => console.log('Clicked place:', id)}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Activity Components Demo - NEW SECTION */}
            <Card>
                <CardHeader>
                    <CardTitle>Activity Components</CardTitle>
                    <CardDescription>
                        Components specifically designed for the activities section
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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

                    <div className="space-y-3">
                        <Label>Filter Chips</Label>
                        <FilterChips
                            items={activeFilters}
                            onRemove={(id) => {
                                setActiveFilters(activeFilters.filter(f => f.id !== id));
                            }}
                            onClear={() => setActiveFilters([])}
                        />
                        {activeFilters.length === 0 && (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setActiveFilters([
                                    { id: '1', label: 'Туры и экскурсии', icon: <Compass className="h-3 w-3" /> },
                                    { id: '2', label: 'от €30 до €80' },
                                    { id: '3', label: 'Полный день' },
                                ])}
                            >
                                Восстановить фильтры
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Activity Cards Demo */}
            <Card>
                <CardHeader>
                    <CardTitle>Activity Cards</CardTitle>
                    <CardDescription>
                        Main activity cards with all features: images, ratings, organizer info, and actions
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Activity Cards Grid</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            <ActivityCard
                                id="act-1"
                                name="Тур по следам Гауди"
                                images={[
                                    'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80',
                                    'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
                                    'https://images.unsplash.com/photo-1512813195452-3e6e0d4f1b0d?w=800&q=80',
                                    'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80'
                                ]}
                                category="tours-excursions"
                                price={{ from: 45, currency: 'EUR' }}
                                duration={{ value: 4, unit: 'hours' }}
                                rating={4.8}
                                reviewsCount={156}
                                organizer={{
                                    name: 'Barcelona Tours',
                                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
                                    type: 'business',
                                    verified: true
                                }}
                                groupSize={{ max: 12 }}
                                tags={['gaudi', 'architecture', 'cultural', 'walking', 'small-group']}
                                isVerified={true}
                                isInstantBooking={true}
                                onClick={() => console.log('Activity clicked')}
                            />
                            <ActivityCard
                                id="act-2"
                                name="Фотосессия на закате"
                                images={[
                                    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
                                    'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&q=80',
                                    'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&q=80'
                                ]}
                                category="photoshoots"
                                price={{ from: 89, currency: 'EUR' }}
                                duration={{ value: 2, unit: 'hours' }}
                                rating={5.0}
                                reviewsCount={42}
                                organizer={{
                                    name: 'Maria Garcia',
                                    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
                                    type: 'individual',
                                    verified: true
                                }}
                                groupSize={{ max: 4, type: 'private' }}
                                tags={['photography', 'sunset', 'private', 'romantic']}
                                isVerified={true}
                                onClick={() => console.log('Activity clicked')}
                            />
                            <ActivityCard
                                id="act-3"
                                name="Каякинг у Коста Брава"
                                images={[
                                    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
                                    'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&q=80',
                                    'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&q=80',
                                    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80'
                                ]}
                                category="water-sports"
                                price={{ from: 65, currency: 'EUR' }}
                                duration={{ value: 6, unit: 'hours' }}
                                rating={4.6}
                                reviewsCount={89}
                                organizer={{
                                    name: 'Costa Brava Adventures',
                                    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
                                    type: 'business',
                                    verified: false
                                }}
                                groupSize={{ min: 2, max: 8 }}
                                tags={['water-sports', 'adventure', 'nature', 'active']}
                                isInstantBooking={true}
                                onClick={() => console.log('Activity clicked')}
                            />
                            <ActivityCard
                                id="act-4"
                                name="Кулинарный мастер-класс паэльи"
                                images={[
                                    'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80',
                                    'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
                                    'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80'
                                ]}
                                category="food-tours"
                                price={{ from: 75, currency: 'EUR' }}
                                duration={{ value: 3, unit: 'hours' }}
                                rating={4.9}
                                reviewsCount={127}
                                organizer={{
                                    name: 'Chef Carlos Restaurant',
                                    avatar: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=100&q=80',
                                    type: 'business',
                                    verified: true
                                }}
                                groupSize={{ max: 10 }}
                                tags={['cooking', 'food', 'cultural', 'hands-on']}
                                isVerified={true}
                                isInstantBooking={true}
                                onClick={() => console.log('Activity clicked')}
                            />
                            <ActivityCard
                                id="act-5"
                                name="Велотур по Барселоне"
                                images={[
                                    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
                                    'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80',
                                    'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=800&q=80'
                                ]}
                                category="tours-excursions"
                                price={{ from: 35, currency: 'EUR' }}
                                duration={{ value: 3, unit: 'hours' }}
                                rating={4.7}
                                reviewsCount={203}
                                organizer={{
                                    name: 'Barcelona Bike Tours',
                                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
                                    type: 'business',
                                    verified: true
                                }}
                                groupSize={{ min: 4, max: 15 }}
                                tags={['cycling', 'sightseeing', 'active', 'city']}
                                isVerified={true}
                                onClick={() => console.log('Activity clicked')}
                            />
                            <ActivityCard
                                id="act-6"
                                name="Флamenco шоу с ужином"
                                images={[
                                    'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&q=80',
                                    'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&q=80',
                                    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
                                    'https://images.unsplash.com/photo-1546039907-7fa05f864c02?w=800&q=80'
                                ]}
                                category="cultural-tours"
                                price={{ from: 95, currency: 'EUR' }}
                                duration={{ value: 2.5, unit: 'hours' }}
                                rating={5.0}
                                reviewsCount={86}
                                organizer={{
                                    name: 'Tablao Carmen',
                                    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&q=80',
                                    type: 'business',
                                    verified: true
                                }}
                                groupSize={{ max: 50 }}
                                tags={['flamenco', 'dinner', 'show', 'cultural', 'evening']}
                                isVerified={true}
                                isInstantBooking={true}
                                onClick={() => console.log('Activity clicked')}
                            />
                            <ActivityCard
                                id="act-7"
                                name="Дайвинг на Коста Дорада"
                                images={[
                                    'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&q=80',
                                    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
                                    'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80'
                                ]}
                                category="water-sports"
                                price={{ from: 120, currency: 'EUR' }}
                                duration={{ value: 5, unit: 'hours' }}
                                rating={4.8}
                                reviewsCount={64}
                                organizer={{
                                    name: 'Mediterranean Diving Center',
                                    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&q=80',
                                    type: 'business',
                                    verified: true
                                }}
                                groupSize={{ min: 2, max: 6 }}
                                tags={['diving', 'underwater', 'adventure', 'marine-life']}
                                isVerified={true}
                                onClick={() => console.log('Activity clicked')}
                            />
                            <ActivityCard
                                id="act-8"
                                name="Винный тур в Пенедес"
                                images={[
                                    'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80',
                                    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
                                    'https://images.unsplash.com/photo-1423483641154-5411ec9c0ddf?w=800&q=80',
                                    'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=800&q=80'
                                ]}
                                category="food-tours"
                                price={{ from: 85, currency: 'EUR' }}
                                duration={{ value: 1, unit: 'days' }}
                                rating={4.9}
                                reviewsCount={178}
                                organizer={{
                                    name: 'Wine Tours Barcelona',
                                    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80',
                                    type: 'business',
                                    verified: true
                                }}
                                groupSize={{ min: 4, max: 12 }}
                                tags={['wine', 'tasting', 'vineyards', 'full-day', 'transport']}
                                isVerified={true}
                                isInstantBooking={true}
                                onClick={() => console.log('Activity clicked')}
                            />
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        <Label>Activity Card Skeletons (Loading State)</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            <ActivityCardSkeleton />
                            <ActivityCardSkeleton />
                            <ActivityCardSkeleton />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Layout Components Demo */}
            <Card>
                <CardHeader>
                    <CardTitle>Layout Components</CardTitle>
                    <CardDescription>
                        Header, Footer, and Container components for page layout
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label>Header - App Variant (Authenticated)</Label>
                        <p className="text-sm text-muted-foreground mb-4">
                            Full-featured header for app pages with authenticated user
                        </p>
                        <div className="border rounded-lg overflow-hidden">
                            <Header
                                variant="app"
                                isAuthenticated={true}
                                user={{
                                    name: 'Sergio Rodriguez',
                                    email: 'sergio@example.com'
                                }}
                            />
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        <Label>Header - Landing Variant (Not Authenticated)</Label>
                        <p className="text-sm text-muted-foreground mb-4">
                            Simplified header for landing pages - only &quot;Login&quot; button shown
                        </p>
                        <div className="border rounded-lg overflow-hidden">
                            <Header variant="landing" isAuthenticated={false} />
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        <Label>Container Component</Label>
                        <p className="text-sm text-muted-foreground mb-4">
                            Responsive container with different size variants
                        </p>
                        <div className="space-y-4">
                            <div className="bg-muted p-4 rounded-lg">
                                <Container size="sm">
                                    <div className="bg-primary/10 p-4 rounded border border-primary">
                                        <p className="text-sm font-medium">Small Container (max-w-screen-sm)</p>
                                        <p className="text-xs text-muted-foreground mt-1">640px max width</p>
                                    </div>
                                </Container>
                            </div>
                            <div className="bg-muted p-4 rounded-lg">
                                <Container size="md">
                                    <div className="bg-secondary/10 p-4 rounded border border-secondary">
                                        <p className="text-sm font-medium">Medium Container (max-w-screen-md)</p>
                                        <p className="text-xs text-muted-foreground mt-1">768px max width</p>
                                    </div>
                                </Container>
                            </div>
                            <div className="bg-muted p-4 rounded-lg">
                                <Container size="lg">
                                    <div className="bg-accent/10 p-4 rounded border border-accent">
                                        <p className="text-sm font-medium">Large Container (max-w-screen-lg)</p>
                                        <p className="text-xs text-muted-foreground mt-1">1024px max width</p>
                                    </div>
                                </Container>
                            </div>
                            <div className="bg-muted p-4 rounded-lg">
                                <Container size="xl">
                                    <div className="bg-primary/10 p-4 rounded border border-primary">
                                        <p className="text-sm font-medium">XL Container (max-w-screen-xl) - Default</p>
                                        <p className="text-xs text-muted-foreground mt-1">1280px max width</p>
                                    </div>
                                </Container>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        <Label>Footer Component</Label>
                        <p className="text-sm text-muted-foreground mb-4">
                            Site footer with links, social media, and copyright
                        </p>
                        <div className="border rounded-lg overflow-hidden">
                            <Footer />
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        <Label>Full Page Layout Example</Label>
                        <p className="text-sm text-muted-foreground mb-4">
                            Complete page structure with Header, Container, and Footer
                        </p>
                        <div className="border rounded-lg overflow-hidden bg-background">
                            <div className="relative" style={{ height: '600px', overflow: 'auto' }}>
                                <Header variant="app" />
                                <Container className="py-8">
                                    <div className="space-y-6">
                                        <div>
                                            <h2 className="text-2xl font-bold mb-2">Page Title</h2>
                                            <p className="text-muted-foreground">
                                                This is an example of a complete page layout using all three layout components.
                                            </p>
                                        </div>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Content Card</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm">
                                                    Your main content goes here, wrapped in a Container component
                                                    which provides consistent spacing and max-width.
                                                </p>
                                            </CardContent>
                                        </Card>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {[1, 2, 3].map((i) => (
                                                <Card key={i}>
                                                    <CardHeader>
                                                        <CardTitle>Card {i}</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p className="text-sm text-muted-foreground">
                                                            Example content
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                </Container>
                                <Footer />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
