"use client"

import { useState, useEffect, useCallback } from "react"
import { ethers } from "ethers"
import { getNFTContract, getMarketplaceContract } from '@/utils/contract'
import { Button } from "@/components/ui/button"
import { Header } from "../marketplace/header"
import Image from "next/image"

interface NFTItem {
    tokenId: string;
    itemId?: string;
    name: string;
    description: string;
    image: string;
    price?: string;
    seller?: string;
    isListed?: boolean;
}

export default function MyNFTPage() {
    const [mounted, setMounted] = useState(false);
    const [nfts, setNfts] = useState<NFTItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sellingNFT, setSellingNFT] = useState<string | null>(null);
    const [price, setPrice] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    // 使用 useCallback 包装 fetchNFTs 函数
    const fetchNFTs = useCallback(async () => {
        if (!window.ethereum) {
            setError("Please install MetaMask first");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const nftContract = getNFTContract(signer);
            const address = await signer.getAddress();

            // 获取用户拥有的 NFT
            const balance = await nftContract.balanceOf(address);
            const ownedNFTs = [];

            for (let i = 0; i < Number(balance); i++) {
                const tokenId = await nftContract.tokenOfOwnerByIndex(address, i);
                const tokenURI = await nftContract.tokenURI(tokenId);
                
                let metadata;
                try {
                    if (tokenURI.startsWith('{')) {
                        metadata = JSON.parse(tokenURI);
                    } else {
                        const response = await fetch(tokenURI);
                        metadata = await response.json();
                    }
                } catch (error) {
                    metadata = {
                        name: `NFT #${tokenId}`,
                        description: '无法加载元数据',
                        image: 'https://placehold.co/400x400'
                    };
                }

                ownedNFTs.push({
                    tokenId: tokenId.toString(),
                    name: metadata.name || `NFT #${tokenId}`,
                    description: metadata.description || '',
                    image: metadata.image || 'https://placehold.co/400x400',
                    isListed: false
                });
            }

            setNfts(ownedNFTs);
        } catch (error) {
            console.error("Failed to fetch NFTs:", error);
            setError("Failed to fetch NFTs: " + (error as Error).message);
        } finally {
            setLoading(false);
        }
    }, []);

    // 处理 NFT 上架
    const handleListNFT = useCallback(async (tokenId: string, price: string) => {
        if (!window.ethereum) {
            alert("Please install MetaMask first");
            return;
        }

        if (!price || isNaN(Number(price)) || Number(price) <= 0) {
            alert("Please enter a valid price");
            return;
        }

        setIsProcessing(true);
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const nftContract = getNFTContract(signer);
            const marketplaceContract = getMarketplaceContract(signer);

            // 获取上架费用
            const listingPrice = await marketplaceContract.listingPrice();
            console.log("上架费用:", ethers.formatEther(listingPrice), "ETH");
            
            // 首先授权市场合约操作 NFT
            const approveTx = await nftContract.approve(marketplaceContract.target, tokenId);
            await approveTx.wait();

            // 上架 NFT（包含上架费用）
            const priceInWei = ethers.parseEther(price);
            const listTx = await marketplaceContract.createMarketItem(
                nftContract.target,
                tokenId,
                priceInWei,
                { value: listingPrice } // 添加上架费用
            );
            await listTx.wait();

            alert("NFT listed successfully!");
            setSellingNFT(null);
            setPrice("");
            fetchNFTs();
        } catch (error) {
            console.error("Failed to list NFT:", error);
            if ((error as Error).message.includes("listing fee required")) {
                alert("Listing failed: Listing fee required");
            } else {
                alert("Listing failed: " + (error as Error).message);
            }
        } finally {
            setIsProcessing(false);
        }
    }, [fetchNFTs]);

    // 获取上架费用显示
    const getListingFeeDisplay = useCallback(async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const marketplaceContract = getMarketplaceContract(signer);
            const listingPrice = await marketplaceContract.listingPrice();
            return ethers.formatEther(listingPrice);
        } catch (error) {
            console.error("获取上架费用失败:", error);
            return "0.025"; // 默认值，与合约中的 listingPrice 一致
        }
    }, []);

    // 使用 useEffect 设置初始状态和获取数据
    useEffect(() => {
        setMounted(true);
    }, []);

    // 单独的 useEffect 用于获取 NFT 数据
    useEffect(() => {
        if (mounted && typeof window !== 'undefined') {
            fetchNFTs();
        }
    }, [mounted, fetchNFTs]);

    // 如果还没有挂载，返回加载占位符
    if (!mounted) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My NFT Collection</h1>
                    <Button
                        onClick={fetchNFTs}
                        className="bg-gradient-to-r from-sky-300/90 to-blue-300/90 
                        hover:from-sky-400/90 hover:to-blue-400/90 text-white"
                    >
                        Refresh List
                    </Button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-4 bg-red-50 rounded-lg">
                        {error}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {nfts.map((nft) => (
                            <div key={nft.tokenId}
                                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                            >
                                <div className="aspect-square relative">
                                    <Image
                                        src={nft.image}
                                        alt={nft.name}
                                        fill
                                        className="object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = 'https://placehold.co/400x400';
                                        }}
                                    />
                                </div>

                                <div className="p-4 space-y-3">
                                    <h3 className="text-lg font-semibold text-gray-900">{nft.name}</h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">{nft.description}</p>
                                    <p className="text-sm text-gray-500">Token ID: {nft.tokenId}</p>

                                    {sellingNFT === nft.tokenId ? (
                                        <div className="space-y-2">
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
                                                placeholder="Enter price (ETH)"
                                            />
                                            <p className="text-xs text-gray-500">
                                                Listing requires a small fee for gas
                                            </p>
                                            <div className="flex space-x-2">
                                                <Button
                                                    onClick={() => handleListNFT(nft.tokenId, price)}
                                                    disabled={isProcessing || !price}
                                                    className="flex-1 bg-gradient-to-r from-emerald-400 to-teal-400 text-white"
                                                >
                                                    {isProcessing ? "Processing..." : "Confirm"}
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        setSellingNFT(null);
                                                        setPrice("");
                                                    }}
                                                    variant="outline"
                                                    className="flex-1"
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <Button
                                            onClick={() => setSellingNFT(nft.tokenId)}
                                            className="w-full bg-gradient-to-r from-violet-400 to-indigo-400 text-white"
                                        >
                                            List for Sale
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
