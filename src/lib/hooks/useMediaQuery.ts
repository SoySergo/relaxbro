'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to listen to media queries
 * @param query Media query string (e.g., '(min-width: 768px)')
 * @returns boolean indicating if the media query matches
 * 
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * const isDesktop = useMediaQuery('(min-width: 1024px)')
 */
export function useMediaQuery(query: string): boolean {
    // Initialize with a function to avoid SSR issues
    const [matches, setMatches] = useState(() => {
        if (typeof window === 'undefined') {
            return false;
        }
        return window.matchMedia(query).matches;
    });

    useEffect(() => {
        // Check if window is defined (client-side only)
        if (typeof window === 'undefined') {
            return;
        }

        const mediaQuery = window.matchMedia(query);

        // Create event listener
        const handler = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        // Modern browsers
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handler);
        } else {
            // Fallback for older browsers
            mediaQuery.addListener(handler);
        }

        // Cleanup
        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handler);
            } else {
                mediaQuery.removeListener(handler);
            }
        };
    }, [query]);

    return matches;
}
