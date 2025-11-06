import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconWrapperProps {
    icon: LucideIcon;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
};

/**
 * IconWrapper component
 * Wrapper for Lucide icons with consistent sizing
 */
export function IconWrapper({ icon: Icon, size = 'md', className }: IconWrapperProps) {
    return <Icon className={cn(sizeClasses[size], className)} />;
}
