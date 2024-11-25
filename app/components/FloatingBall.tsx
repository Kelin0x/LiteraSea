'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { X, ChevronDown, Send } from "lucide-react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import Image from 'next/image'
import { ethers } from "ethers"
import { getNFTContract } from '@/utils/contract'
import axios from 'axios'

interface FloatingBallProps {
    bookTitle: string;
    isDarkMode: boolean;
    currentChapter: string;
    onAskQuestion?: (question: string) => void;
}

interface NFTItem {
    tokenId: string;
    image: string;
    name: string;
}

export function FloatingBall({
    bookTitle,
    isDarkMode,
    currentChapter,
    onAskQuestion
}: FloatingBallProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', content: string }>>([
        { type: 'bot', content: `你好！我是你的阅读助手，很高兴为你解答关于《${bookTitle}》的任何问题。` }
    ])
    const [input, setInput] = useState('')
    const containerRef = useRef<HTMLDivElement>(null)
    const [avatarUrl, setAvatarUrl] = useState<string>(`https://api.dicebear.com/7.x/bottts/svg?seed=${bookTitle}`)
    const [nfts, setNfts] = useState<NFTItem[]>([])
    const [showNFTSelector, setShowNFTSelector] = useState(false)
    const [isLoadingNFTs, setIsLoadingNFTs] = useState(false)

    // 使用 useMotionValue 来跟踪位置
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // 添加位置持久化
    useEffect(() => {
        // 从 localStorage 读取保存的位置
        const savedPosition = localStorage.getItem('floatingBallPosition')
        if (savedPosition) {
            const { x: savedX, y: savedY } = JSON.parse(savedPosition)
            x.set(savedX)
            y.set(savedY)
        }
    }, [])

    // 处理拖拽约束
    const dragConstraints = useRef<{ left: number; right: number; top: number; bottom: number }>({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    })

    // 更新拖拽约束
    useEffect(() => {
        const updateConstraints = () => {
            if (containerRef.current) {
                const ballWidth = containerRef.current.offsetWidth
                const ballHeight = containerRef.current.offsetHeight

                dragConstraints.current = {
                    left: -window.innerWidth + ballWidth + 20,
                    right: -20,
                    top: -window.innerHeight + ballHeight + 20,
                    bottom: -20
                }
            }
        }

        updateConstraints()
        window.addEventListener('resize', updateConstraints)
        return () => window.removeEventListener('resize', updateConstraints)
    }, [])

    // 处理拖拽结束
    const handleDragEnd = () => {
        // 保存位置到 localStorage
        const currentPosition = {
            x: x.get(),
            y: y.get()
        }
        localStorage.setItem('floatingBallPosition', JSON.stringify(currentPosition))
    }

    // 添加吸附效果
    const snapTo = (value: number, threshold: number) => {
        return Math.abs(value) < threshold ? 0 : value
    }

    // 获取默认头像
    const getDefaultAvatar = (seed: string) => {
        return `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`
    }

    // 获取用户的所有 NFT
    const fetchUserNFTs = async () => {
        setIsLoadingNFTs(true)
        setNfts([]) // 清空现有 NFT 列表

        if (!window.ethereum) {
            setAvatarUrl(getDefaultAvatar(bookTitle))
            setIsLoadingNFTs(false)
            return
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const nftContract = getNFTContract(signer)
            const address = await signer.getAddress()

            // 获取用户拥有的 NFT 数量
            const balance = await nftContract.balanceOf(address)
            const nftList: NFTItem[] = []

            // 获取所有 NFT 的信息
            for (let i = 0; i < Number(balance); i++) {
                try {
                    const tokenId = await nftContract.tokenOfOwnerByIndex(address, i)
                    const tokenURI = await nftContract.tokenURI(tokenId)

                    let metadata
                    if (tokenURI.startsWith('{')) {
                        metadata = JSON.parse(tokenURI)
                    } else {
                        const response = await fetch(tokenURI)
                        metadata = await response.json()
                    }

                    nftList.push({
                        tokenId: tokenId.toString(),
                        image: metadata.image,
                        name: metadata.name
                    })
                } catch (error) {
                    console.error("获取NFT元数据失败:", error)
                    continue
                }
            }

            setNfts(nftList)

            // 如果没有 NFT，使用默认头像
            if (nftList.length === 0) {
                setAvatarUrl(getDefaultAvatar(bookTitle))
            } else {
                // 如果有保存的选择，使用保存的选择；否则使用第一个 NFT
                const savedAvatar = localStorage.getItem('selectedNFTAvatar')
                if (savedAvatar && nftList.some(nft => nft.image === savedAvatar)) {
                    setAvatarUrl(savedAvatar)
                } else {
                    setAvatarUrl(nftList[0].image)
                    localStorage.setItem('selectedNFTAvatar', nftList[0].image)
                }
            }
        } catch (error) {
            console.error("获取NFT列表失败:", error)
            setAvatarUrl(getDefaultAvatar(bookTitle))
        } finally {
            setIsLoadingNFTs(false)
        }
    }

    // NFT 选择器组件
    const NFTSelector = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`absolute bottom-20 right-0 w-64 rounded-lg shadow-xl overflow-hidden
                ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
            <div className={`p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} flex justify-between items-center`}>
                <h3 className="text-sm font-medium">选择 NFT</h3>
                {isLoadingNFTs && (
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                )}
            </div>
            <div className="p-2 max-h-60 overflow-y-auto">
                <div className="grid grid-cols-3 gap-2">
                    {isLoadingNFTs ? (
                        <div className="col-span-3 py-4 text-center text-gray-500 text-sm">
                            加载中...
                        </div>
                    ) : nfts.length === 0 ? (
                        <div className="col-span-3 py-4 text-center text-gray-500 text-sm">
                            未找到 NFT，使用默认头像
                        </div>
                    ) : (
                        nfts.map((nft) => (
                            <button
                                key={nft.tokenId}
                                onClick={() => {
                                    setAvatarUrl(nft.image)
                                    setShowNFTSelector(false)
                                    localStorage.setItem('selectedNFTAvatar', nft.image)
                                    setIsOpen(true)
                                }}
                                className="relative group rounded-lg overflow-hidden aspect-square"
                            >
                                <Image
                                    src={nft.image}
                                    alt={nft.name}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement
                                        target.src = getDefaultAvatar(nft.tokenId)
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-xs">使用此 NFT</span>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </motion.div>
    )

    // 在组件加载时获取 NFT
    useEffect(() => {
        fetchUserNFTs()

        // 监听钱包账户变化
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', fetchUserNFTs)
            return () => {
                window.ethereum.removeListener('accountsChanged', fetchUserNFTs)
            }
        }
    }, [])

    // 修改头像点击事件
    const handleAvatarClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        fetchUserNFTs();
        setShowNFTSelector(!showNFTSelector);
        // 如果聊天窗口已打开，则关闭它
        if (isOpen) {
            setIsOpen(false);
        }
    };

    // 添加加载状态
    const [isLoading, setIsLoading] = useState(false)

    // 添加 API 调用函数
    const callChatAPI = async (message: string) => {
        try {
            const response = await axios.post(
                'https://www.gptapi.us/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: `你是一个专业的阅读助手，具有以下特点和功能：
                                1. 你正在帮助用户阅读《${bookTitle}》的"${currentChapter}"章节
                                2. 你应该：
                                   - 能够解释文中的难懂词句和典故
                                   - 分析人物性格和情节发展
                                   - 提供深入的文学赏析
                                   - 联系历史背景进行解读
                                   - 总结章节主要内容
                                3. 回答要求：
                                   - 回答要简洁明了，通常不超过200字
                                   - 使用友好、专业的语气
                                   - 如果不确定的内容，要诚实说明
                                   - 鼓励读者思考和讨论
                                4. 特别注意：
                                   - 避免剧透后续内容
                                   - 保持客观中立的态度
                                   - 适时引导读者深入思考
                                
                                请基于以上设定来回答用户的问题。`
                        },
                        {
                            role: 'user',
                            content: message
                        }
                    ],
                    temperature: 0.7,  // 控制回答的创造性，0.7 表示平衡稳定性和创造性
                    max_tokens: 800,   // 限制回答长度
                    presence_penalty: 0.3,  // 鼓励模型讨论新话题
                    frequency_penalty: 0.3  // 减少重复内容
                },
                {
                    headers: {
                        'Authorization': `Bearer sk-OFUCZBgKEQnSG9T797353aE7E6E147D2Ba267e6aC8F9CfBd`,
                        'Content-Type': 'application/json'
                    },
                    timeout: 30000
                }
            )

            return response.data.choices[0].message.content
        } catch (error: any) {
            console.error('API 调用失败:', error)
            if (error.response?.status === 429) {
                return '抱歉，当前请求太多，请稍后再试。'
            }
            if (error.code === 'ECONNABORTED') {
                return '抱歉，响应时间太长，请重试。'
            }
            throw error
        }
    }

    // 修改 handleSend 函数，添加重试机制
    const handleSend = async (retryCount = 0) => {
        if (!input.trim() || isLoading) return

        const userMessage = input.trim()
        setInput('')

        setMessages(prev => [...prev, {
            type: 'user',
            content: userMessage
        }])

        setIsLoading(true)

        try {
            setMessages(prev => [...prev, {
                type: 'bot',
                content: '思考中...'
            }])

            const response = await callChatAPI(userMessage)

            setMessages(prev => {
                const newMessages = [...prev]
                newMessages[newMessages.length - 1] = {
                    type: 'bot',
                    content: response
                }
                return newMessages
            })
        } catch (error) {
            if (retryCount < 2) { // 最多重试 2 次
                setTimeout(() => {
                    handleSend(retryCount + 1)
                }, 1000 * (retryCount + 1)) // 递增重试延迟
            } else {
                setMessages(prev => {
                    const newMessages = [...prev]
                    newMessages[newMessages.length - 1] = {
                        type: 'bot',
                        content: '抱歉，我遇到了一些问题，请稍后再试。'
                    }
                    return newMessages
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    // 自动滚动到底部
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <motion.div
            ref={containerRef}
            className="fixed z-50"
            style={{
                bottom: '1.5rem',
                right: '1.5rem',
                x,
                y,
            }}
            drag
            dragMomentum={false}
            dragElastic={0.1}
            dragConstraints={dragConstraints.current}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.1 }}
            animate={{
                x: snapTo(x.get(), 20),
                y: snapTo(y.get(), 20),
                transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
        >
            <AnimatePresence>
                {showNFTSelector && <NFTSelector />}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className={`absolute bottom-20 right-0 w-96 rounded-2xl shadow-2xl overflow-hidden
                            ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
                        onPointerDown={(e) => e.stopPropagation()}
                    >
                        {/* 聊天头部 */}
                        <div className={`p-4 flex justify-between items-center cursor-default
                            ${isDarkMode
                                ? 'bg-gradient-to-r from-gray-700 to-gray-800'
                                : 'bg-gradient-to-r from-blue-500 to-purple-500'
                            } text-white`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 p-1 flex items-center justify-center backdrop-blur-sm">
                                    <div className="w-full h-full rounded-full overflow-hidden">
                                        <Image
                                            src={avatarUrl}
                                            alt="Bot Avatar"
                                            width={36}
                                            height={36}
                                            className="w-full h-full object-cover rounded-full"
                                            onError={() => setAvatarUrl(`https://api.dicebear.com/7.x/bottts/svg?seed=${bookTitle}`)}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium">Reading Assistant</span>
                                    <span className="text-xs text-white/70">{currentChapter}</span>
                                </div>
                            </div>
                        </div>

                        {/* 消息区域 */}
                        <div className={`h-[400px] overflow-y-auto p-4 space-y-4 cursor-default
                            ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
                        >
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex items-end gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {message.type === 'bot' && (
                                        <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 p-0.5 flex-shrink-0">
                                            <Image
                                                src={avatarUrl}
                                                alt="Bot Avatar"
                                                width={28}
                                                height={28}
                                                className="w-full h-full object-cover rounded-full"
                                                onError={() => setAvatarUrl(getDefaultAvatar(bookTitle))}
                                            />
                                        </div>
                                    )}
                                    <div className={`max-w-[80%] rounded-2xl p-3 ${message.type === 'user'
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                            : isDarkMode
                                                ? 'bg-gray-700 text-gray-100'
                                                : 'bg-white text-gray-800 shadow-sm'
                                        }`}>
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 输入区域 */}
                        <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder={isLoading ? "AI is thinking..." : "Ask a question..."}
                                    disabled={isLoading}
                                    className={`flex-1 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500
                                        ${isDarkMode
                                            ? 'bg-gray-700 text-gray-100 placeholder-gray-400'
                                            : 'bg-gray-100 text-gray-800 placeholder-gray-500'}
                                        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                />
                                <Button
                                    onClick={handleSend}
                                    disabled={isLoading}
                                    className={`rounded-xl px-4 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : ''}
                                        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <Send size={20} />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 悬浮球按钮也使用 NFT 头像 */}
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative cursor-grab active:cursor-grabbing"
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-16 h-16 rounded-full shadow-lg overflow-hidden p-0
                        ${isOpen
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                            : isDarkMode
                                ? 'bg-white hover:bg-gray-100'
                                : 'bg-white hover:bg-gray-50'
                        }
                        transition-all duration-300 ease-in-out
                        hover:shadow-2xl hover:scale-105`}
                >
                    {isOpen ? (
                        <X size={28} className="text-white" />
                    ) : (
                        <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                            <div className="w-full h-full rounded-full overflow-hidden relative group">
                                <Image
                                    src={avatarUrl}
                                    alt="Bot Avatar"
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                                    onError={() => setAvatarUrl(getDefaultAvatar(bookTitle))}
                                />
                                <div
                                    className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors cursor-pointer"
                                    onClick={handleAvatarClick}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <ChevronDown size={20} className="text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Button>

                {/* 添加聊天按钮提示 */}
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 
                            px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap text-sm
                            flex items-center gap-2 cursor-pointer"
                        onClick={() => setIsOpen(true)}
                    >
                        <span className="animate-pulse w-2 h-2 rounded-full bg-green-500"></span>
                        点击开始聊天
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    )
}