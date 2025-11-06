import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RelaxBro - Отдых в Барселоне',
  description: 'Найди лучшие места для отдыха в Барселоне',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
