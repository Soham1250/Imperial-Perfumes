import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Providers } from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Imperial Perfumes | Luxury Fragrances',
  description: 'Discover timeless elegance with Imperial Perfumes, a luxury fragrance brand offering exquisite scents crafted with the finest ingredients.',
  keywords: 'luxury perfumes, fragrances, scents, Imperial Perfumes, high-end perfumes',
  openGraph: {
    title: 'Imperial Perfumes | Luxury Fragrances',
    description: 'Discover timeless elegance with Imperial Perfumes, a luxury fragrance brand offering exquisite scents crafted with the finest ingredients.',
    url: 'https://imperialperfumes.com',
    siteName: 'Imperial Perfumes',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Imperial Perfumes',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Imperial Perfumes | Luxury Fragrances',
    description: 'Discover timeless elegance with Imperial Perfumes, a luxury fragrance brand offering exquisite scents crafted with the finest ingredients.',
    images: ['/images/twitter-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
