'use client';

import * as React from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from './input';
import { Button } from './button';

export interface SearchInputProps {
    /**
     * Current search value
     */
    value: string;
    /**
     * Callback when value changes
     */
    onChange: (value: string) => void;
    /**
     * Callback when search is triggered (e.g., on Enter or button click)
     */
    onSearch?: (value: string) => void;
    /**
     * Placeholder text
     */
    placeholder?: string;
    /**
     * Whether the search is loading
     * @default false
     */
    loading?: boolean;
    /**
     * Whether the input is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Debounce delay in milliseconds
     * @default 300
     */
    debounceDelay?: number;
    /**
     * Whether to show the clear button
     * @default true
     */
    showClearButton?: boolean;
    /**
     * Custom className
     */
    className?: string;
    /**
     * Auto focus on mount
     * @default false
     */
    autoFocus?: boolean;
}

export function SearchInput({
    value,
    onChange,
    onSearch,
    placeholder = 'Search...',
    loading = false,
    disabled = false,
    debounceDelay = 300,
    showClearButton = true,
    className,
    autoFocus = false,
}: SearchInputProps) {
    const [localValue, setLocalValue] = React.useState(value);
    const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Sync local value with prop value
    React.useEffect(() => {
        setLocalValue(value);
    }, [value]);

    // Debounced onChange
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);

        // Clear existing timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // Set new timer
        debounceTimerRef.current = setTimeout(() => {
            onChange(newValue);
        }, debounceDelay);
    };

    // Cleanup timer on unmount
    React.useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    // Handle clear
    const handleClear = () => {
        setLocalValue('');
        onChange('');
        inputRef.current?.focus();
    };

    // Handle search trigger
    const handleSearch = () => {
        if (onSearch) {
            // Clear debounce timer and immediately trigger search
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
            onChange(localValue);
            onSearch(localValue);
        }
    };

    // Handle Enter key
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    const showClear = showClearButton && localValue.length > 0 && !loading;

    return (
        <div className={cn('relative flex items-center', className)}>
            {/* Search Icon */}
            <div className="pointer-events-none absolute left-3 flex items-center">
                {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                ) : (
                    <Search className="h-4 w-4 text-muted-foreground" />
                )}
            </div>

            {/* Input */}
            <Input
                ref={inputRef}
                type="text"
                value={localValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                autoFocus={autoFocus}
                className={cn(
                    'pl-9',
                    showClear && 'pr-9',
                    className
                )}
            />

            {/* Clear Button */}
            {showClear && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 h-full px-3 hover:bg-transparent"
                    onClick={handleClear}
                    disabled={disabled}
                    aria-label="Clear search"
                >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </Button>
            )}
        </div>
    );
}

SearchInput.displayName = 'SearchInput';
