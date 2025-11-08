'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, User, Heart, Search, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Container } from './container';
import { cn } from '@/lib/utils';

interface HeaderProps {
    variant?: 'landing' | 'app';
    className?: string;
    isAuthenticated?: boolean; // Add auth state prop
    user?: {
        name?: string;
        email?: string;
        avatar?: string;
    };
}

/**
 * Header component
 * Main navigation header with logo, menu, language switcher, and mobile menu
 */
export function Header({ variant = 'app', className, isAuthenticated = false, user }: HeaderProps) {
    const t = useTranslations();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const isLanding = variant === 'landing';

    // Handle scroll to hide/show mobile header
    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    // Hide header when scrolling down (after 50px), show when scrolling up
                    if (currentScrollY > 50 && currentScrollY > lastScrollY) {
                        setIsScrolled(true);
                    } else {
                        setIsScrolled(false);
                    }
                    lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine active tab based on pathname
    const isActivitiesPage = pathname?.includes('/activities');
    const isPlacesPage = pathname?.includes('/explore');

    const languages = [
        { code: 'ru', name: 'Русский', flag: '🇷🇺' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
    ];

    const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

    const handleLanguageChange = (newLocale: string) => {
        router.push(`/${newLocale}`);
    };

    const navigation = isLanding
        ? [
            { name: t('header.places'), href: `/${locale}/explore` },
            { name: t('header.activities'), href: `/${locale}/activities` },
        ]
        : [
            { name: t('common.search'), href: `/${locale}/explore` },
        ];

    return (
        <header
            className={cn(
                'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-transform duration-300',
                // On mobile: hide when scrolled down
                isScrolled && '-translate-y-full md:translate-y-0',
                className
            )}
        >
            <Container>
                <div className="flex h-16 items-center justify-between">
                    {/* Logo - On mobile: centered and always visible when header is shown */}
                    <Link href={`/${locale}`} className="flex items-center space-x-2 md:flex-1">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-primary-500 to-primary-600 text-white shadow-md">
                            <span className="text-xl font-bold">R</span>
                        </div>
                        <span className="text-xl font-bold text-foreground">RelaxBro</span>
                    </Link>

                    {/* Desktop Navigation - Links for Places | Activities */}
                    <div className="hidden items-center md:flex">
                        {!isLanding && (
                            <nav className="flex items-center space-x-6">
                                <Link
                                    href={`/${locale}/explore`}
                                    className={cn(
                                        'text-sm font-medium transition-colors hover:text-foreground',
                                        isPlacesPage
                                            ? 'text-foreground'
                                            : 'text-muted-foreground'
                                    )}
                                >
                                    {t('header.places')}
                                </Link>
                                <Link
                                    href={`/${locale}/activities`}
                                    className={cn(
                                        'text-sm font-medium transition-colors hover:text-foreground',
                                        isActivitiesPage
                                            ? 'text-foreground'
                                            : 'text-muted-foreground'
                                    )}
                                >
                                    {t('header.activities')}
                                </Link>
                            </nav>
                        )}
                        {isLanding && (
                            <nav className="flex items-center space-x-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        )}
                    </div>

                    {/* Right side: Language switcher + Auth buttons */}
                    <div className="flex items-center space-x-3">
                        {/* Language Switcher - Desktop */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="hidden gap-2 sm:flex">
                                    <span>{currentLanguage.flag}</span>
                                    <span className="text-sm">{currentLanguage.name}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {languages.map((lang) => (
                                    <DropdownMenuItem
                                        key={lang.code}
                                        onClick={() => handleLanguageChange(lang.code)}
                                        className="cursor-pointer justify-between gap-2"
                                    >
                                        <span className="flex items-center gap-2">
                                            <span>{lang.flag}</span>
                                            <span>{lang.name}</span>
                                        </span>
                                        {locale === lang.code && (
                                            <Check className="h-4 w-4 text-primary" />
                                        )}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Auth Section - Desktop */}
                        {isLanding ? (
                            // Landing page - только кнопка "Войти" если не авторизован
                            !isAuthenticated ? (
                                <div className="hidden items-center md:flex">
                                    <Button size="sm" asChild>
                                        <Link href={`/${locale}/login`}>{t('common.login')}</Link>
                                    </Button>
                                </div>
                            ) : (
                                // Если авторизован - показываем профиль
                                <div className="hidden items-center space-x-1 md:flex">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <User className="h-5 w-5" />
                                                <span className="sr-only">{t('common.profile')}</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {user?.name && (
                                                <>
                                                    <div className="px-2 py-1.5">
                                                        <p className="text-sm font-medium">{user.name}</p>
                                                        {user.email && (
                                                            <p className="text-xs text-muted-foreground">{user.email}</p>
                                                        )}
                                                    </div>
                                                    <DropdownMenuSeparator />
                                                </>
                                            )}
                                            <DropdownMenuItem asChild>
                                                <Link href={`/${locale}/profile`}>{t('common.profile')}</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href={`/${locale}/favorites`}>{t('common.favorites')}</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>{t('common.logout')}</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            )
                        ) : null}

                        {/* Quick Actions - App variant only */}
                        {!isLanding && (
                            <div className="hidden items-center space-x-1 md:flex">
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href={`/${locale}/explore`}>
                                        <Search className="h-5 w-5" />
                                        <span className="sr-only">{t('common.search')}</span>
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href={`/${locale}/favorites`}>
                                        <Heart className="h-5 w-5" />
                                        <span className="sr-only">{t('common.favorites')}</span>
                                    </Link>
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <User className="h-5 w-5" />
                                            <span className="sr-only">{t('common.profile')}</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem asChild>
                                            <Link href={`/${locale}/profile`}>{t('common.profile')}</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/${locale}/favorites`}>{t('common.favorites')}</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>{t('common.logout')}</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        )}

                        {/* Mobile Menu Toggle - Hidden, navigation moved to bottom bar */}
                        {/* We keep the mobile menu for language switching and additional options */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu - Simplified for language and settings only */}
                {isMobileMenuOpen && (
                    <div className="border-t py-4 md:hidden animate-in slide-in-from-top-2 duration-200">
                        <nav className="flex flex-col space-y-1">

                            {/* Auth Buttons */}
                            {isLanding ? (
                                // Landing - только войти если не авторизован
                                !isAuthenticated ? (
                                    <div className="border-t mt-2 pt-3 px-2">
                                        <Button
                                            className="w-full justify-start h-11"
                                            asChild
                                        >
                                            <Link
                                                href={`/${locale}/login`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {t('common.login')}
                                            </Link>
                                        </Button>
                                    </div>
                                ) : (
                                    // Если авторизован - показываем меню профиля
                                    <div className="border-t mt-2 pt-3 px-2">
                                        <div className="flex flex-col space-y-1">
                                            {user?.name && (
                                                <div className="px-2 py-2 mb-2">
                                                    <p className="text-sm font-medium">{user.name}</p>
                                                    {user.email && (
                                                        <p className="text-xs text-muted-foreground">{user.email}</p>
                                                    )}
                                                </div>
                                            )}
                                            <Link
                                                href={`/${locale}/profile`}
                                                className="rounded-md px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:bg-accent/50"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {t('common.profile')}
                                            </Link>
                                            <Link
                                                href={`/${locale}/favorites`}
                                                className="rounded-md px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:bg-accent/50"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {t('common.favorites')}
                                            </Link>
                                            <button
                                                className="rounded-md px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:bg-accent/50 text-left"
                                                onClick={() => {
                                                    setIsMobileMenuOpen(false);
                                                    // TODO: handle logout
                                                }}
                                            >
                                                {t('common.logout')}
                                            </button>
                                        </div>
                                    </div>
                                )
                            ) : null}

                            {/* Language Selector */}
                            <div className="border-t mt-2 pt-3 px-2">
                                <p className="mb-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    {t('common.language')}
                                </p>
                                <div className="flex flex-col space-y-1">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                handleLanguageChange(lang.code);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className={cn(
                                                'rounded-md px-4 py-3 text-sm font-medium transition-colors text-left flex items-center justify-between gap-2',
                                                locale === lang.code
                                                    ? 'bg-accent text-accent-foreground'
                                                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground active:bg-accent/80'
                                            )}
                                        >
                                            <span className="flex items-center gap-2">
                                                <span className="text-lg">{lang.flag}</span>
                                                <span>{lang.name}</span>
                                            </span>
                                            {locale === lang.code && (
                                                <Check className="h-4 w-4 text-primary" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </nav>
                    </div>
                )}
            </Container>
        </header>
    );
}
