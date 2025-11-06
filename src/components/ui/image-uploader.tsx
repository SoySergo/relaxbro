'use client';

import * as React from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { useTranslations } from 'next-intl';

export interface ImageFile {
    file: File;
    preview: string;
    id: string;
}

export interface ImageUploaderProps {
    /**
     * Maximum number of files allowed
     * @default 5
     */
    maxFiles?: number;
    /**
     * Maximum file size in bytes
     * @default 5242880 (5MB)
     */
    maxSize?: number;
    /**
     * Accepted file types
     * @default 'image/*'
     */
    accept?: string;
    /**
     * Current uploaded files
     */
    value?: ImageFile[];
    /**
     * Callback when files are uploaded
     */
    onChange?: (files: ImageFile[]) => void;
    /**
     * Whether the uploader is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Custom className
     */
    className?: string;
    /**
     * Custom error message
     */
    error?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export function ImageUploader({
    maxFiles = 5,
    maxSize = MAX_FILE_SIZE,
    accept = 'image/*',
    value = [],
    onChange,
    disabled = false,
    className,
    error,
}: ImageUploaderProps) {
    const t = useTranslations('ui.image');
    const [isDragActive, setIsDragActive] = React.useState(false);
    const [validationError, setValidationError] = React.useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const displayError = error || validationError;

    const validateFile = (file: File): string | null => {
        // Check file type
        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
            return t('invalidType', { types: 'JPEG, PNG, WebP' });
        }

        // Check file size
        if (file.size > maxSize) {
            const maxSizeMB = (maxSize / 1024 / 1024).toFixed(0);
            return t('maxSize', { size: maxSizeMB });
        }

        return null;
    };

    const processFiles = async (files: FileList | File[]) => {
        setValidationError(null);

        const fileArray = Array.from(files);
        const remainingSlots = maxFiles - value.length;

        if (fileArray.length > remainingSlots) {
            setValidationError(t('maxFiles', { count: maxFiles }));
            return;
        }

        const newImages: ImageFile[] = [];

        for (const file of fileArray) {
            const validationError = validateFile(file);

            if (validationError) {
                setValidationError(validationError);
                return;
            }

            const preview = URL.createObjectURL(file);
            newImages.push({
                file,
                preview,
                id: `${Date.now()}-${Math.random()}`,
            });
        }

        onChange?.([...value, ...newImages]);
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            setIsDragActive(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        if (disabled) return;

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            processFiles(files);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            processFiles(files);
        }
        // Reset input value to allow selecting the same file again
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemoveImage = (id: string) => {
        const imageToRemove = value.find((img) => img.id === id);
        if (imageToRemove) {
            URL.revokeObjectURL(imageToRemove.preview);
        }
        onChange?.(value.filter((img) => img.id !== id));
        setValidationError(null);
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    // Cleanup preview URLs on unmount
    React.useEffect(() => {
        return () => {
            value.forEach((img) => {
                URL.revokeObjectURL(img.preview);
            });
        };
    }, [value]);

    const canUploadMore = value.length < maxFiles;

    return (
        <div className={cn('space-y-4', className)}>
            {/* Upload Zone */}
            {canUploadMore && (
                <div
                    className={cn(
                        'relative rounded-lg border-2 border-dashed transition-colors',
                        isDragActive && !disabled && 'border-primary bg-primary/5',
                        !isDragActive && !disabled && 'border-border hover:border-primary/50',
                        disabled && 'cursor-not-allowed opacity-50',
                        displayError && 'border-error-500'
                    )}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={accept}
                        multiple
                        onChange={handleFileInputChange}
                        disabled={disabled}
                        className="hidden"
                    />

                    <div className="flex flex-col items-center justify-center gap-3 px-6 py-10">
                        <div
                            className={cn(
                                'rounded-full p-3 transition-colors',
                                isDragActive ? 'bg-primary/10' : 'bg-muted'
                            )}
                        >
                            <Upload
                                className={cn(
                                    'h-6 w-6',
                                    isDragActive ? 'text-primary' : 'text-muted-foreground'
                                )}
                            />
                        </div>

                        <div className="text-center">
                            <p className="text-sm font-medium text-foreground">
                                {isDragActive ? t('dropHere') : t('dragDrop')}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {t('or')}{' '}
                                <button
                                    type="button"
                                    onClick={handleBrowseClick}
                                    disabled={disabled}
                                    className="font-medium text-primary hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {t('browse')}
                                </button>
                            </p>
                        </div>

                        <div className="text-xs text-muted-foreground">
                            <p>{t('acceptedTypes')}: JPEG, PNG, WebP</p>
                            <p>
                                {t('maxSize', { size: (maxSize / 1024 / 1024).toFixed(0) })} •{' '}
                                {t('maxFiles', { count: maxFiles })}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {displayError && (
                <div className="flex items-center gap-2 rounded-md bg-error-50 p-3 text-sm text-error-700">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{displayError}</span>
                </div>
            )}

            {/* Preview Grid */}
            {value.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {value.map((image) => (
                        <div
                            key={image.id}
                            className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={image.preview}
                                alt={image.file.name}
                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/40" />

                            {/* Remove Button */}
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute right-2 top-2 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                                onClick={() => handleRemoveImage(image.id)}
                                disabled={disabled}
                            >
                                <X className="h-4 w-4" />
                                <span className="sr-only">{t('remove')}</span>
                            </Button>

                            {/* File Info */}
                            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                                <p className="truncate text-xs text-white">{image.file.name}</p>
                                <p className="text-xs text-white/80">
                                    {(image.file.size / 1024).toFixed(0)} KB
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {value.length === 0 && !canUploadMore && (
                <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border p-8 text-center">
                    <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">{t('noImages')}</p>
                </div>
            )}

            {/* Upload Counter */}
            {value.length > 0 && (
                <p className="text-xs text-muted-foreground">
                    {value.length} / {maxFiles} {t('uploaded')}
                </p>
            )}
        </div>
    );
}

ImageUploader.displayName = 'ImageUploader';
