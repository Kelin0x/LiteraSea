import { Metadata } from 'next'
import { Header } from "./header"
import { HeroBanner } from "./hero-banner"
import { PopularBooks } from "./popular-books"

// 添加元数据
export const metadata: Metadata = {
  title: 'NFT Books Marketplace | Literasea',
  description: 'Discover and collect unique digital books as NFTs on the blockchain',
  keywords: 'NFT, books, digital books, blockchain, web3, marketplace',
  openGraph: {
    title: 'NFT Books Marketplace | Literasea',
    description: 'Discover and collect unique digital books as NFTs',
    images: ['/og-marketplace.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NFT Books Marketplace',
    description: 'Digital books marketplace on blockchain',
  }
}

export default function Marketplace() {
  return (
    <main 
      className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-white"
      itemScope 
      itemType="https://schema.org/CollectionPage"
    >
      <Header />
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <HeroBanner />
        <PopularBooks />
      </div>

      {/* 添加结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "NFT Books Marketplace",
            "description": "Digital books marketplace on blockchain",
            "provider": {
              "@type": "Organization",
              "name": "Literasea",
              "url": "https://literasea-two.vercel.app"
            }
          })
        }}
      />
    </main>
  )
}

