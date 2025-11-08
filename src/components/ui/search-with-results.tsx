'use client';

import * as React from 'react';
import { Search, X, Loader2, MapPin, Euro } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Input } from './input';
import { Button } from './button';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Skeleton } from './skeleton';

export interface SearchResult {
    id: string;
    name: string;
    type: 'place' | 'activity';
    category?: string;
    location?: string;
    price?: number;
    image?: string;
}

export interface SearchWithResultsProps {
    value: string;
    onChange: (value: string) => void;
    onSearch?: (value: string) => void;
    results?: SearchResult[];
    totalCount?: number;
    onResultSelect?: (result: SearchResult) => void;
    onShowAll?: () => void;
    placeholder?: string;
    loading?: boolean;
    disabled?: boolean;
    debounceDelay?: number;
    maxResults?: number;
    className?: string;
}

// Search Result Skeleton Component
const SearchResultSkeleton = React.memo(() => (
    <div className="flex items-center gap-2 px-3 py-2">
        <Skeleton className="h-10 w-10 rounded-md shrink-0" />
        <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-5 w-12 rounded shrink-0" />
    </div>
));
SearchResultSkeleton.displayName = 'SearchResultSkeleton';

// Search Result Item Component
const SearchResultItem = React.memo(({
    result,
    onSelect
}: {
    result: SearchResult;
    onSelect: (result: SearchResult) => void;
}) => (
    <CommandItem
        key={result.id}
        value={result.id}
        onSelect={() => onSelect(result)}
        className="cursor-pointer px-3 py-2"
    >
        <div className="flex items-center gap-2 w-full">
            {result.image && (
                <div className="shrink-0 w-10 h-10 rounded-md overflow-hidden bg-muted relative">
                    <Image
                        src={result.image}
                        alt={result.name}
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">
                    {result.name}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                    {result.location && (
                        <span className="flex items-center gap-1 truncate">
                            <MapPin className="h-3 w-3 shrink-0" />
                            {result.location}
                        </span>
                    )}
                    {result.price !== undefined && (
                        <span className="flex items-center gap-1 shrink-0">
                            <Euro className="h-3 w-3" />
                            {result.price}
                        </span>
                    )}
                </div>
            </div>

            <div className="shrink-0 text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                {result.type === 'place' ? 'Место' : 'Акт.'}
            </div>
        </div>
    </CommandItem>
));
SearchResultItem.displayName = 'SearchResultItem';

export const SearchWithResults = React.memo(function SearchWithResults({
    value,
    onChange,
    onSearch,
    results = [],
    totalCount = 0,
    onResultSelect,
    onShowAll,
    placeholder = 'Поиск...',
    loading = false,
    disabled = false,
    debounceDelay = 100,
    maxResults = 5,
    className,
}: SearchWithResultsProps) {
    const [localValue, setLocalValue] = React.useState(value);
    const [open, setOpen] = React.useState(false);
    const [hasSearched, setHasSearched] = React.useState(false);
    const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const prevLoadingRef = React.useRef(loading);

    // Sync local value with prop value
    React.useEffect(() => {
        setLocalValue(value);
    }, [value]);

    // Track when search completes and manage popover state
    React.useEffect(() => {
        const trimmedValue = localValue.trim();
        const hasQuery = trimmedValue.length > 0;

        // Update hasSearched when loading completes
        if (prevLoadingRef.current && !loading && hasQuery) {
            setHasSearched(true);
        }
        prevLoadingRef.current = loading;

        // Manage popover state
        setOpen(hasQuery);
        if (!hasQuery) {
            setHasSearched(false);
        }
    }, [loading, localValue]);

    // Cleanup timer on unmount
    React.useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    // Debounced onChange
    const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        setHasSearched(false);

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            onChange(newValue);
        }, debounceDelay);
    }, [onChange, debounceDelay]);

    // Handle clear
    const handleClear = React.useCallback(() => {
        setLocalValue('');
        onChange('');
        setOpen(false);
        setHasSearched(false);
        inputRef.current?.focus();
    }, [onChange]);

    // Handle Enter key
    const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (onSearch) {
                if (debounceTimerRef.current) {
                    clearTimeout(debounceTimerRef.current);
                }
                onChange(localValue);
                onSearch(localValue);
            }
            setOpen(false);
        } else if (e.key === 'Escape') {
            setOpen(false);
            inputRef.current?.blur();
        }
    }, [onSearch, onChange, localValue]);

    // Handle result selection
    const handleResultSelect = React.useCallback((result: SearchResult) => {
        onResultSelect?.(result);
        setOpen(false);
        inputRef.current?.blur();
    }, [onResultSelect]);

    // Handle show all
    const handleShowAll = React.useCallback(() => {
        onShowAll?.();
        setOpen(false);
    }, [onShowAll]);

    // Handle input focus
    const handleFocus = React.useCallback(() => {
        if (localValue.trim().length > 0) {
            setOpen(true);
        }
    }, [localValue]);

    // Memoized computed values
    const showClear = React.useMemo(() =>
        localValue.length > 0 && !loading,
        [localValue.length, loading]
    );

    const displayResults = React.useMemo(() =>
        results.slice(0, maxResults),
        [results, maxResults]
    );

    const hasMore = React.useMemo(() =>
        results.length > maxResults || totalCount > maxResults,
        [results.length, maxResults, totalCount]
    );

    const shouldShowEmpty = React.useMemo(() =>
        !loading && hasSearched && displayResults.length === 0 && localValue.trim().length > 0,
        [loading, hasSearched, displayResults.length, localValue]
    );

    const shouldShowResults = React.useMemo(() =>
        !loading && hasSearched && displayResults.length > 0,
        [loading, hasSearched, displayResults.length]
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <div className={cn('relative flex items-center', className)}>
                <div className="pointer-events-none absolute left-3 flex items-center z-10">
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    ) : (
                        <Search className="h-4 w-4 text-muted-foreground" />
                    )}
                </div>

                <PopoverTrigger asChild>
                    <Input
                        ref={inputRef}
                        type="text"
                        value={localValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={handleFocus}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={cn('pl-9', showClear && 'pr-9')}
                    />
                </PopoverTrigger>

                {showClear && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 h-full px-3 hover:bg-transparent z-10"
                        onClick={handleClear}
                        disabled={disabled}
                        aria-label="Clear search"
                    >
                        <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </Button>
                )}
            </div>

            <PopoverContent
                className="w-(--radix-popover-trigger-width) p-0"
                align="start"
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <Command>
                    <CommandList className="max-h-none">
                        {loading && (
                            <div className="py-1">
                                {Array.from({ length: maxResults }, (_, i) => (
                                    <SearchResultSkeleton key={i} />
                                ))}
                            </div>
                        )}

                        {shouldShowEmpty && (
                            <CommandEmpty>Ничего не найдено</CommandEmpty>
                        )}

                        {shouldShowResults && (
                            <CommandGroup className="p-0">
                                {displayResults.map((result) => (
                                    <SearchResultItem
                                        key={result.id}
                                        result={result}
                                        onSelect={handleResultSelect}
                                    />
                                ))}

                                {hasMore && (
                                    <CommandItem
                                        onSelect={handleShowAll}
                                        className="cursor-pointer border-t px-3 py-2"
                                    >
                                        <div className="w-full text-center">
                                            <span className="text-sm font-semibold text-primary">
                                                Показать все ({totalCount})
                                            </span>
                                        </div>
                                    </CommandItem>
                                )}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
});

SearchWithResults.displayName = 'SearchWithResults';
