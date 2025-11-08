'use client';

import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Home, MapPin, Waves, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileBottomNavProps {
    className?: string;
}

/**
 * Mobile Bottom Navigation Bar
 * Fixed navigation at the bottom of the screen for mobile devices (< md breakpoint)
 * Shows 5 main sections: Home, Places, Activities, Favorites, Profile
 */
export function MobileBottomNav({ className }: MobileBottomNavProps) {
    const t = useTranslations();
    const locale = useLocale();
    const pathname = usePathname();

    const navItems = [
        {
            name: t('header.home'),
            href: `/${locale}`,
            icon: Home,
            isActive: pathname === `/${locale}` || pathname === `/${locale}/`,
        },
        {
            name: t('header.places'),
            href: `/${locale}/explore`,
            icon: MapPin,
            isActive: pathname?.includes('/explore'),
        },
        {
            name: t('header.activities'),
            href: `/${locale}/activities`,
            icon: Waves,
            isActive: pathname?.includes('/activities'),
        },
        {
            name: t('common.favorites'),
            href: `/${locale}/favorites`,
            icon: Heart,
            isActive: pathname?.includes('/favorites'),
        },
        {
            name: t('common.profile'),
            href: `/${locale}/profile`,
            icon: User,
            isActive: pathname?.includes('/profile'),
        },
    ];

    return (
        <nav
            className={cn(
                'fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 md:hidden safe-area-inset-bottom',
                className
            )}
        >
            <div className="flex items-center justify-around h-16 px-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex flex-col items-center justify-center gap-0.5 px-1 py-2 rounded-lg transition-colors flex-1 max-w-20',
                                item.isActive
                                    ? 'text-primary'
                                    : 'text-foreground/70 hover:text-foreground active:text-foreground'
                            )}
                        >
                            <Icon
                                className={cn(
                                    'h-5 w-5 transition-all shrink-0',
                                    item.isActive && 'scale-110'
                                )}
                            />
                            <span
                                className={cn(
                                    'text-[9px] leading-tight font-medium transition-all text-center line-clamp-1',
                                    item.isActive && 'font-semibold'
                                )}
                            >
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
