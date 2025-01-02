"use client"


import { Star } from 'lucide-react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { getNFTContract, getMarketplaceContract } from '@/utils/contract'

interface NFTItem {
    tokenId: string;
    itemId?: string;
    name: string;
    description: string;
    image: string;
    price?: string;
    isListed?: boolean;
    seller?: string;
}

export function PopularBooks() {
    const [marketNFTs, setMarketNFTs] = useState<NFTItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [processingStates, setProcessingStates] = useState<Map<string, boolean>>(new Map());

    // 获取市场中的 NFT
    const fetchMarketNFTs = async () => {
        if (!window.ethereum) {
            setError("请先安装 MetaMask");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const nftContract = getNFTContract(signer);
            const marketplaceContract = getMarketplaceContract(signer);

            const marketItems = await marketplaceContract.fetchMarketItems();
            const marketNFTsList = await Promise.all(
                marketItems.map(async (item: any) => {
                    const tokenURI = await nftContract.tokenURI(item.tokenId);
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
                            name: `NFT #${item.tokenId}`,
                            description: '无法加载元数据',
                            image: 'https://placehold.co/400x400'
                        };
                    }

                    return {
                        tokenId: item.tokenId.toString(),
                        itemId: item.itemId.toString(),
                        name: metadata.name || `NFT #${item.tokenId}`,
                        description: metadata.description || '',
                        image: metadata.image || 'https://placehold.co/400x400',
                        price: ethers.formatEther(item.price),
                        seller: item.seller,
                        isListed: true
                    };
                })
            );

            setMarketNFTs(marketNFTsList);
        } catch (error) {
            console.error("获取NFT列表失败:", error);
            setError("获取NFT列表失败: " + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    // 处理 NFT 购买
    const handleBuyNFT = async (itemId: string, price: string) => {
        if (!window.ethereum) {
            alert("请先安装 MetaMask");
            return;
        }

        setProcessingStates(prev => new Map(prev).set(itemId, true));
        
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const marketplaceContract = getMarketplaceContract(signer);
            const nftContract = getNFTContract(signer);

            const priceInWei = ethers.parseEther(price);
            const tx = await marketplaceContract.createMarketSale(
                nftContract.target,
                itemId,
                { value: priceInWei }
            );
            await tx.wait();

            alert("NFT 购买成功！");
            fetchMarketNFTs(); // 刷新列表
        } catch (error) {
            console.error("购买NFT失败:", error);
            if ((error as any).reason) {
                alert("购买失败: " + (error as any).reason);
            } else {
                alert("购买失败: " + (error as Error).message);
            }
        } finally {
            setProcessingStates(prev => {
                const newMap = new Map(prev);
                newMap.delete(itemId);
                return newMap;
            });
        }
    };

    useEffect(() => {
        fetchMarketNFTs();
    }, []);

    return (
        <section 
          className="mt-24"
          itemScope 
          itemType="https://schema.org/ItemList"
        >
            <div className="flex justify-between items-center mb-12">
                <h2 
                  className="text-3xl font-bold text-gray-900"
                  itemProp="name"
                >
                  NFT Marketplace
                </h2>
                <Button
                    variant="outline"
                    className="text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                    onClick={fetchMarketNFTs}
                >
                    Refresh Lists
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 py-4">
                    {error}
                </div>
            ) : (
                <div 
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
                  role="list"
                >
                    {marketNFTs.map((nft, index) => (
                        <div 
                          key={nft.itemId} 
                          className="group space-y-4 hover:scale-105 transition-transform duration-200"
                          itemScope 
                          itemType="https://schema.org/Product"
                          itemProp="itemListElement"
                          role="listitem"
                        >
                            <div className="aspect-[3/4] relative rounded-xl overflow-hidden shadow-lg">
                                <Image
                                    src={nft.image}
                                    alt={nft.name}
                                    fill
                                    className="object-cover"
                                    itemProp="image"
                                    priority={index < 6}
                                />
                            </div>
                            <div className="space-y-2">
                                <h3 
                                  className="font-medium text-gray-900 text-lg"
                                  itemProp="name"
                                >
                                  {nft.name}
                                </h3>
                                <p 
                                  className="text-sm text-gray-600 line-clamp-2"
                                  itemProp="description"
                                >
                                  {nft.description}
                                </p>
                                <div 
                                  className="flex items-center justify-between"
                                  itemProp="offers"
                                  itemScope 
                                  itemType="https://schema.org/Offer"
                                >
                                    <div className="text-indigo-600 font-medium">
                                        <meta itemProp="priceCurrency" content="ETH" />
                                        <span itemProp="price">{nft.price}</span> ETH
                                    </div>
                                    <Button
                                        onClick={() => handleBuyNFT(nft.itemId!, nft.price!)}
                                        disabled={processingStates.get(nft.itemId!)}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                        aria-label={`Buy ${nft.name}`}
                                    >
                                        {processingStates.get(nft.itemId!) ? "Processing..." : "Buy Now"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

