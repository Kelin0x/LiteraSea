'use client'

import { useState, useRef, useEffect } from "react"
import { ethers } from "ethers"
import { getNFTContract } from '@/utils/contract'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { Upload, X, Check, Loader2 } from "lucide-react"
import { Header } from "../marketplace/header"

export default function CreateNFTPage() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // 添加文件输入引用
    const fileInputRef = useRef<HTMLInputElement>(null)

    // 处理图片上传
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    // 上传图片到 Pinata
    const uploadImageToPinata = async (file: File): Promise<string> => {
        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Failed to upload image')
            }

            const data = await response.json()
            return `${process.env.NEXT_PUBLIC_PINATA_DOMAIN}/ipfs/${data.IpfsHash}`
        } catch (error) {
            console.error('Failed to upload to Pinata:', error)
            throw error
        }
    }

    // 上传元数据到 Pinata
    const uploadMetadataToPinata = async (metadata: any): Promise<string> => {
        try {
            const response = await fetch('/api/uploadJson', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(metadata),
            })

            if (!response.ok) {
                throw new Error('上传元数据失败')
            }

            const data = await response.json()
            return `${process.env.NEXT_PUBLIC_PINATA_DOMAIN}/ipfs/${data.IpfsHash}`
        } catch (error) {
            console.error('上传元数据到 Pinata 失败:', error)
            throw error
        }
    }

    // 修改铸造函数
    const handleMint = async () => {
        if (!window.ethereum) {
            setError("Please install MetaMask first")
            return
        }

        if (!name || !description || !image) {
            setError("Please fill in all required fields")
            return
        }

        try {
            setLoading(true)
            setError(null)

            // 1. Upload image to IPFS
            const imageUrl = await uploadImageToPinata(image)
            console.log('Image uploaded:', imageUrl)

            // 2. Create and upload metadata
            const metadata = {
                name,
                description,
                image: imageUrl,
                attributes: []
            }

            // 3. Upload metadata to IPFS
            const metadataUrl = await uploadMetadataToPinata(metadata)
            console.log('Metadata uploaded:', metadataUrl)

            // 4. Mint NFT
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const nftContract = getNFTContract(signer)

            const tx = await nftContract.safeMint(await signer.getAddress(), metadataUrl)
            console.log('Transaction sent:', tx.hash)

            const receipt = await tx.wait()
            console.log('Transaction confirmed:', receipt)

            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
            
            // Clear form
            setName("")
            setDescription("")
            setImage(null)
            setPreviewUrl("")
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }

        } catch (err) {
            console.error("Failed to mint NFT:", err)
            setError("Failed to mint NFT: " + (err as Error).message)
        } finally {
            setLoading(false)
        }
    }

    // 清理预览URL
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl)
            }
        }
    }, [previewUrl])

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
            <Header />

            <div className="container mx-auto py-12 px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
                >
                    <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                        Create Your NFT
                    </h1>

                    {/* Image upload area */}
                    <div className="mb-8">
                        <div className="relative h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
                            {previewUrl ? (
                                <>
                                    <Image
                                        src={previewUrl}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        onClick={() => {
                                            setImage(null)
                                            setPreviewUrl("")
                                        }}
                                        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                                    >
                                        <X size={16} />
                                    </button>
                                </>
                            ) : (
                                <label className="flex flex-col items-center justify-center h-full cursor-pointer">
                                    <Upload size={32} className="text-gray-400 mb-2" />
                                    <span className="text-gray-500">Click to upload image</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        ref={fileInputRef}
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Form area */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                NFT Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 dark:bg-gray-700"
                                placeholder="Give your NFT a name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 dark:bg-gray-700"
                                placeholder="Describe your NFT"
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <Button
                            onClick={handleMint}
                            disabled={loading || !name || !description || !image}
                            className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium rounded-lg"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : success ? (
                                <Check className="w-5 h-5" />
                            ) : (
                                "Create NFT"
                            )}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}