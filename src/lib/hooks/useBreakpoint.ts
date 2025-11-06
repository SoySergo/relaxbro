'use client';

import { useMediaQuery } from './useMediaQuery';
import { breakpoints } from '../constants/theme';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

/**
 * Hook to get current breakpoint
 * @returns Current breakpoint: 'mobile' | 'tablet' | 'desktop'
 * 
 * @example
 * const breakpoint = useBreakpoint()
 * if (breakpoint === 'mobile') {
 *   // Render mobile layout
 * }
 */
export function useBreakpoint(): Breakpoint {
    // Using Tailwind breakpoints
    const isTablet = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const isDesktop = useMediaQuery(`(min-width: ${breakpoints.lg})`);

    if (isDesktop) {
        return 'desktop';
    }

    if (isTablet) {
        return 'tablet';
    }

    return 'mobile';
}

/**
 * Hook to check if current breakpoint matches
 * @param breakpoint Breakpoint to check
 * @returns boolean indicating if current breakpoint matches
 * 
 * @example
 * const isMobile = useBreakpointCheck('mobile')
 * const isDesktop = useBreakpointCheck('desktop')
 */
export function useBreakpointCheck(breakpoint: Breakpoint): boolean {
    const current = useBreakpoint();
    return current === breakpoint;
}

/**
 * Hook to check if screen is mobile (< tablet)
 */
export function useIsMobile(): boolean {
    return !useMediaQuery(`(min-width: ${breakpoints.md})`);
}

/**
 * Hook to check if screen is tablet (>= md and < lg)
 */
export function useIsTablet(): boolean {
    const isTablet = useMediaQuery(`(min-width: ${breakpoints.md})`);
    const isDesktop = useMediaQuery(`(min-width: ${breakpoints.lg})`);
    return isTablet && !isDesktop;
}

/**
 * Hook to check if screen is desktop (>= lg)
 */
export function useIsDesktop(): boolean {
    return useMediaQuery(`(min-width: ${breakpoints.lg})`);
}
