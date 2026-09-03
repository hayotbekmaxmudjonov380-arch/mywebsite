import { Analytics } from '@vercel/analytics/next'
import { Geist, Geist_Mono } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { LanguageProvider } from '@/lib/language-context'
import { ThemeProvider } from '@/lib/theme-context'
import { AuthProvider } from '@/lib/auth-context'
import { CartProvider } from '@/lib/cart-context'
import { SITE_URL } from '@/lib/stripe'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'itshopping — Digital products for ambitious builders',
    template: '%s — itshopping',
  },
  description: 'A considered marketplace for production-ready digital products, templates, and intelligent systems.',
  generator: 'itshopping Studio',
  keywords: [
    'digital products',
    'templates',
    'web apps',
    'mobile apps',
    'desktop software',
    'AI solutions',
    'Telegram bots',
    'source code',
    'SaaS',
    'marketplace',
  ],
  authors: [{ name: 'itshopping' }],
  creator: 'itshopping',
  publisher: 'itshopping',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'itshopping',
    title: 'itshopping — Digital products for ambitious builders',
    description: 'A considered marketplace for production-ready digital products, templates, and intelligent systems.',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'itshopping marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'itshopping — Digital products for ambitious builders',
    description: 'A considered marketplace for production-ready digital products, templates, and intelligent systems.',
    images: [`${SITE_URL}/og-image.png`],
    creator: '@itshopping',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <head>
        <script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js" />
      </head>
      <body className={`${geist.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
