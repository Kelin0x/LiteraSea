import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://literasea-two.vercel.app'),
  title: {
    default: 'Literasea | Web3 Books - Blockchain Digital Reading Platform',
    template: '%s | Literasea'
  },
  description: 'Literasea is a leading Web3 digital reading platform supporting NFT book publishing and trading, creating a decentralized digital content ecosystem for authors and readers.',
  keywords: 'Web3, NFT Books, Blockchain Reading, Digital Publishing, Cryptocurrency Payments',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://literasea-two.vercel.app',
    siteName: 'Literasea',
    title: 'Literasea - Web3 Digital Reading Platform',
    description: 'Discover, own, and trade unique digital books on the blockchain',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Literasea Platform Preview'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@literasea',
    creator: '@literasea',
    title: 'Literasea - Web3 Digital Reading Platform',
    description: 'Discover, own, and trade unique digital books on the blockchain'
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
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  }
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Literasea",
  "description": "Web3 Digital Reading Platform",
  "url": "https://literasea-two.vercel.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://literasea-two.vercel.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="canonical" href="https://literasea-two.vercel.app" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <main>
          {children}
        </main>
        <footer>
          {/* Add footer content */}
        </footer>
      </body>
    </html>
  );
}