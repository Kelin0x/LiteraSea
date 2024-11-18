'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Grid, List, Tag, ArrowUpDown, Heart } from 'lucide-react'

interface NFTType {
    id: number
    title: string
    collection: string
    image: string
    price: number
    currency: string
    purchaseDate: string
    rarity: string
}

const MyNFTs = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [sortBy, setSortBy] = useState('recent')

    const myNFTs: NFTType[] = [
        {
            id: 1,
            title: "Cyber Punk #1234",
            collection: "Cyber Punks",
            image: "/images/1.png",
            price: 0.5,
            currency: "ETH",
            purchaseDate: "2024-02-20",
            rarity: "Rare"
        },
        {
            id: 2,
            title: "Cyber Samurai #1234",
            collection: "Cyber Samurai",
            image: "/images/3.png",
            price: 0.5,
            currency: "ETH",
            purchaseDate: "2024-02-20",
            rarity: "Rare"
        },
        {
            id: 3,
            title: "Cyber Samurai #1234",
            collection: "Cyber Samurai",
            image: "/images/4.png",
            price: 0.5,
            currency: "ETH",
            purchaseDate: "2024-02-20",
            rarity: "Rare"
        },
        {
            id: 4,
            title: "Cyber Samurai #1234",
            collection: "Cyber Samurai",
            image: "/images/1.png",
            price: 0.5,
            currency: "ETH",
            purchaseDate: "2024-02-20",
            rarity: "Rare"
        }
    ]

    console.log('NFTs:', myNFTs)

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 p-6">
            {/* Wallet Overview */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">My NFT Collection</h1>
                            <p className="text-gray-600 mt-1">Total Items: {myNFTs.length}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="px-4 py-2 bg-white/80 rounded-lg shadow">
                                <p className="text-sm text-gray-600">Total Value</p>
                                <p className="text-xl font-bold text-gray-800">2.5 ETH</p>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 
                hover:bg-blue-600 rounded-lg text-white transition-colors shadow">
                                <Wallet className="w-5 h-5" />
                                Connect Wallet
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg ${viewMode === 'grid'
                                ? 'bg-purple-500 text-white'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        <Grid className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg ${viewMode === 'list'
                                ? 'bg-purple-500 text-white'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        <List className="w-5 h-5" />
                    </button>
                </div>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-200"
                >
                    <option value="recent">Recently Added</option>
                    <option value="price-high">Highest Price</option>
                    <option value="price-low">Lowest Price</option>
                </select>
            </div>

            {/* NFT Grid/List */}
            <div className="max-w-7xl mx-auto">
                {myNFTs.length > 0 ? (
                    viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {myNFTs.map((nft) => {
                                console.log('Rendering NFT:', nft.id)
                                return (
                                    <motion.div
                                        key={nft.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700"
                                    >
                                        <div className="relative aspect-square">
                                            <img
                                                src={nft.image}
                                                alt={nft.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-2 right-2">
                                                <span className="px-2 py-1 rounded-lg bg-purple-500/80 backdrop-blur-sm text-white text-xs">
                                                    {nft.rarity}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-200">{nft.title}</h3>
                                            <p className="text-sm text-gray-400 mt-1">{nft.collection}</p>
                                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                                                <div>
                                                    <p className="text-xs text-gray-400">Purchase Price</p>
                                                    <p className="text-lg font-semibold text-gray-200">
                                                        {nft.price} {nft.currency}
                                                    </p>
                                                </div>
                                                <p className="text-sm text-gray-400">{nft.purchaseDate}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {myNFTs.map((nft) => (
                                <motion.div
                                    key={nft.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700"
                                >
                                    <div className="flex items-center p-4">
                                        <img
                                            src={nft.image}
                                            alt={nft.title}
                                            className="w-20 h-20 rounded-lg object-cover"
                                        />
                                        <div className="ml-4 flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-semibold text-gray-200">{nft.title}</h3>
                                                <span className="px-2 py-1 rounded-lg bg-purple-500 text-white text-xs">
                                                    {nft.rarity}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-400 mt-1">{nft.collection}</p>
                                        </div>
                                        <div className="ml-4 text-right">
                                            <p className="text-sm text-gray-400">Purchase Price</p>
                                            <p className="text-lg font-semibold text-gray-200">
                                                {nft.price} {nft.currency}
                                            </p>
                                            <p className="text-sm text-gray-400 mt-1">{nft.purchaseDate}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )
                ) : (
                    <div className="text-center py-20 bg-white/60 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-lg">
                        <img 
                            src="/empty-nft.png" 
                            alt="No NFTs" 
                            className="w-48 h-48 mx-auto mb-6 opacity-50"
                        />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No NFTs Found</h3>
                        <p className="text-gray-600 mb-6">Connect your wallet to view your NFT collection</p>
                        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
                            transition-colors shadow inline-flex items-center gap-2">
                            <Wallet className="w-5 h-5" />
                            Connect Wallet
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyNFTs 