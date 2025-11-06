import { cn } from '@/lib/utils';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
    sm: 'max-w-screen-sm', // 640px
    md: 'max-w-screen-md', // 768px
    lg: 'max-w-screen-lg', // 1024px
    xl: 'max-w-screen-xl', // 1280px
    full: 'max-w-full',
};

/**
 * Container component
 * Wrapper component with max-width and responsive padding
 */
export function Container({ children, className, size = 'xl' }: ContainerProps) {
    return (
        <div className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeClasses[size], className)}>
            {children}
        </div>
    );
}
