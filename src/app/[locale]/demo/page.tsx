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
import { Header, Footer, Container } from '@/components/layout';
import { Waves, Sparkles, UtensilsCrossed, Trees, Palette, Music } from 'lucide-react';

export default function DemoPage() {
    const [ratingValue, setRatingValue] = useState(3.5);
    const [readonlyRating] = useState(4.5);
    const [uploadedImages, setUploadedImages] = useState<ImageFile[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
                                image="https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80"
                                category="Культура"
                                rating={4.8}
                                reviewsCount={1234}
                                location="Carrer d&apos;Olot, Barcelona"
                                priceLevel={2}
                                onClick={(id) => console.log('Clicked place:', id)}
                                onFavoriteClick={(id, isFav) => console.log('Favorite:', id, isFav)}
                            />
                            <PlaceCard
                                id="2"
                                name="La Sagrada Família"
                                image="https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&q=80"
                                category="Культура"
                                rating={5}
                                reviewsCount={5678}
                                location="Carrer de Mallorca, Barcelona"
                                priceLevel={3}
                                isFavorite={true}
                                onClick={(id) => console.log('Clicked place:', id)}
                                onFavoriteClick={(id, isFav) => console.log('Favorite:', id, isFav)}
                            />
                            <PlaceCard
                                id="3"
                                name="Barceloneta Beach"
                                image="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
                                category="Активный отдых"
                                rating={4.5}
                                reviewsCount={892}
                                location="Platja de la Barceloneta"
                                priceLevel={1}
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
                                image="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80"
                                category="Архитектура"
                                rating={4.7}
                                reviewsCount={234}
                                onClick={(id) => console.log('Clicked place:', id)}
                            />
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
