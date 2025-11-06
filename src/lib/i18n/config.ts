export const locales = ['ru', 'en', 'es'] as const
export const defaultLocale = 'ru' as const
export type Locale = (typeof locales)[number]
