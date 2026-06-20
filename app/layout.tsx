import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sefa & Sevim',
  description: 'Evlilik yıl dönümümüz — 28 Haziran 2025',
  openGraph: {
    title: 'Sefa & Sevim',
    description: 'Bir yıllık aşkımızın hikayesi',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
