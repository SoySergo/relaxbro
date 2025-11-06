/**
 * Animation utilities for Tailwind CSS
 * Common animation patterns and transitions
 */

export const animations = {
    // Fade animations
    fadeIn: {
        initial: 'opacity-0',
        animate: 'opacity-100',
        transition: 'transition-opacity duration-200',
    },
    fadeOut: {
        initial: 'opacity-100',
        animate: 'opacity-0',
        transition: 'transition-opacity duration-200',
    },

    // Slide animations
    slideInFromTop: {
        initial: '-translate-y-full opacity-0',
        animate: 'translate-y-0 opacity-100',
        transition: 'transition-all duration-300 ease-out',
    },
    slideInFromBottom: {
        initial: 'translate-y-full opacity-0',
        animate: 'translate-y-0 opacity-100',
        transition: 'transition-all duration-300 ease-out',
    },
    slideInFromLeft: {
        initial: '-translate-x-full opacity-0',
        animate: 'translate-x-0 opacity-100',
        transition: 'transition-all duration-300 ease-out',
    },
    slideInFromRight: {
        initial: 'translate-x-full opacity-0',
        animate: 'translate-x-0 opacity-100',
        transition: 'transition-all duration-300 ease-out',
    },

    // Zoom animations
    zoomIn: {
        initial: 'scale-95 opacity-0',
        animate: 'scale-100 opacity-100',
        transition: 'transition-all duration-200 ease-out',
    },
    zoomOut: {
        initial: 'scale-100 opacity-100',
        animate: 'scale-95 opacity-0',
        transition: 'transition-all duration-200 ease-in',
    },

    // Scale animations
    scaleUp: {
        initial: 'scale-0',
        animate: 'scale-100',
        transition: 'transition-transform duration-200',
    },
    scaleDown: {
        initial: 'scale-100',
        animate: 'scale-0',
        transition: 'transition-transform duration-200',
    },

    // Rotate animations
    rotate: {
        initial: 'rotate-0',
        animate: 'rotate-180',
        transition: 'transition-transform duration-300',
    },

    // Bounce
    bounce: 'animate-bounce',

    // Spin
    spin: 'animate-spin',

    // Pulse
    pulse: 'animate-pulse',
} as const;

/**
 * Get animation classes for a specific animation
 * @param name Animation name
 * @param state Animation state (initial or animate)
 */
export function getAnimationClasses(
    name: keyof typeof animations,
    state: 'initial' | 'animate' | 'transition' = 'animate'
): string {
    const animation = animations[name];

    if (typeof animation === 'string') {
        return animation;
    }

    return animation[state] || '';
}

/**
 * Combine animation classes
 */
export function combineAnimations(...animations: string[]): string {
    return animations.filter(Boolean).join(' ');
}

/**
 * Hover and focus animation classes
 */
export const interactionClasses = {
    // Hover effects
    hoverScale: 'hover:scale-105 transition-transform duration-200',
    hoverScaleDown: 'hover:scale-95 transition-transform duration-200',
    hoverBrightness: 'hover:brightness-110 transition-all duration-200',
    hoverShadow: 'hover:shadow-lg transition-shadow duration-200',
    hoverLift: 'hover:-translate-y-1 hover:shadow-md transition-all duration-200',

    // Focus effects
    focusRing: 'focus:ring-2 focus:ring-primary focus:ring-offset-2',
    focusOutline: 'focus:outline-none focus:ring-2 focus:ring-primary',

    // Active effects
    activeScale: 'active:scale-95',
    activeBrightness: 'active:brightness-90',

    // Combined interactive
    interactive:
        'hover:scale-105 active:scale-95 transition-transform duration-200',
    button:
        'hover:brightness-110 active:brightness-90 transition-all duration-200',
} as const;

/**
 * Loading spinner animation
 */
export const spinnerAnimation = 'animate-spin duration-700';

/**
 * Skeleton loading animation
 */
export const skeletonAnimation = 'animate-pulse';

/**
 * Card hover animation
 */
export const cardHoverAnimation =
    'hover:-translate-y-1 hover:shadow-lg transition-all duration-300';

/**
 * Button press animation
 */
export const buttonPressAnimation = 'active:scale-95 transition-transform duration-100';
