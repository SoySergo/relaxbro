import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('common')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-primary">RelaxBro</h1>
      <p className="mt-4 text-muted-foreground">
        {t('search')} - MVP Phase 1 Foundation Complete
      </p>
    </div>
  )
}
