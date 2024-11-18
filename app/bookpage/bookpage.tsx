'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Star } from 'lucide-react'
import { 
  Search, 
  Compass, 
  User,
  Wallet,
  TrendingUp,
  Clock,
  Filter,
  AlertCircle
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import FeedbackBot from '@/app/components/FeedbackBot'
import Image from 'next/image'

interface NFTType {
  id: number
  title: string
  creator: string
  image: string
  price: number
  currency: string
  likes: number
  collection: string
  rarity: string
  endTime?: string
}

const NFTMarketplace = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [selectedNFT, setSelectedNFT] = useState<NFTType | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // 示例数据
  const trendingNFTs: NFTType[] = [
    {
      id: 1,
      title: "Cyber Samurai #1234",
      creator: "CyberLabs",
      image: "/images/1.png", // 请替换为实际图片
      price: 0.5,
      currency: "ETH",
      likes: 234,
      collection: "Cyber Samurai",
      rarity: "Rare",
      endTime: "2h 45m"
    },
    {
      id: 2,
      title: "Cyber Punk #1234",
      creator: "CyberLabs",
      image: "/images/2.png",
      price: 0.5,
      currency: "ETH",
      likes: 234,
      collection: "Cyber Punk",
      rarity: "Rare",
      endTime: "2h 45m"
    },
    {
      id: 3,
      title: "Cyber Samurai #1234",
      creator: "CyberLabs",
      image: "/images/3.png",
      price: 0.5,
      currency: "ETH",
      likes: 234,
      collection: "Cyber Samurai",
      rarity: "Rare",
      endTime: "2h 45m"
    },
    {
      id: 4,
      title: "Cyber Punk #1234",
      creator: "CyberLabs",
      image: "/images/4.png",
      price: 0.5,
      currency: "ETH",
      likes: 234,
      collection: "Cyber Punk",
      rarity: "Rare",
      endTime: "2h 45m"
    }
  ]

  const handleBuyNow = (nft: NFTType) => {
    setSelectedNFT(nft)
  }

  const handlePurchase = async () => {
    setIsProcessing(true)
    // 这里添加实际的购买逻辑
    setTimeout(() => {
      setIsProcessing(false)
      setSelectedNFT(null)
      router.push('/mynft')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <Image 
                  src="/favicon.ico" 
                  alt="NFT Market Logo" 
                  width={32} 
                  height={32} 
                  className="w-auto h-8"
                />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 
                  bg-clip-text text-transparent">NFT Market</span>
              </div>
              
              {/* Main Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 
                  font-medium transition-colors">
                  <Compass className="w-5 h-5" />
                  <span>Explore</span>
                </button>
                <button 
                  onClick={() => router.push('/mynft')}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 
                    font-medium transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>My NFTs</span>
                </button>
              </div>
            </div>

            {/* Search & Wallet */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search items, collections..."
                  className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-200 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 
                rounded-full text-white transition-colors font-medium">
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Trending</h3>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="space-y-4">
                {/* Trending Items */}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Top Collections</h3>
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="space-y-4">
                {/* Top Collections */}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Live Auctions</h3>
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <div className="space-y-4">
                {/* Live Auctions */}
              </div>
            </div>
          </div>

          {/* NFT Grid */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Explore NFTs</h2>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 
                  rounded-lg text-gray-700 hover:bg-gray-200 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 
                    appearance-none cursor-pointer pr-10 relative"
                >
                  <option value="popular">Most Popular</option>
                  <option value="recent">Recently Added</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {trendingNFTs.map((nft) => (
                <motion.div
                  key={nft.id}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100"
                >
                  <div className="relative aspect-square">
                    <img
                      src={nft.image}
                      alt={nft.title}
                      className="w-full h-full object-cover"
                    />
                    {nft.endTime && (
                      <div className="absolute top-2 right-2 px-3 py-1 bg-black/60 
                        backdrop-blur-sm rounded-full text-white text-sm">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {nft.endTime}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{nft.title}</h3>
                      <span className="text-sm text-gray-500">#{nft.id}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{nft.collection}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500">Current Price</p>
                        <p className="text-lg font-semibold text-blue-600">
                          {nft.price} {nft.currency}
                        </p>
                      </div>
                      <button 
                        onClick={() => handleBuyNow(nft)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 
                          rounded-lg text-white text-sm transition-colors"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Purchase Modal */}
      {selectedNFT && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Purchase</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* NFT Preview */}
              <div className="space-y-4">
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <img
                    src={selectedNFT.image}
                    alt={selectedNFT.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-700">
                      Please make sure you have enough ETH in your wallet to complete this purchase.
                    </p>
                  </div>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Item Price</span>
                    <span className="font-medium">{selectedNFT.price} {selectedNFT.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gas Fee (est.)</span>
                    <span className="font-medium">0.003 ETH</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold">
                        {(selectedNFT.price + 0.003).toFixed(3)} {selectedNFT.currency}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedNFT(null)}
                    className="flex-1 px-6 py-3 border border-gray-200 rounded-lg 
                      hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePurchase}
                    disabled={isProcessing}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 
                      rounded-lg text-white font-medium transition-colors
                      ${isProcessing 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                  >
                    <Wallet className="w-5 h-5" />
                    {isProcessing ? 'Processing...' : 'Confirm Purchase'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <FeedbackBot />
    </div>
  )
}

export default NFTMarketplace