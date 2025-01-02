"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring, animate } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ChevronRight, Sparkles, Wallet } from "lucide-react"
import { useRouter } from 'next/navigation'
import BackgroundGradient from "./BackgroundGradient"
import floatingElements from "./FloatingElements"


const HeroSection = () => {
    const targetRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start start", "end start"]
    })

    const scale = useTransform(scrollYProgress, [0, 0.7], [1.1, 0.8])
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "0%"])
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

    const springConfig = { stiffness: 100, damping: 30, bounce: 0 }
    const scaleSpring = useSpring(scale, springConfig)
    const ySpring = useSpring(y, springConfig)
    const opacitySpring = useSpring(opacity, springConfig)

    const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    }

    const item = {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 }
    }

    const CountAnimation = ({ value }: { value: string }) => {
      const [count, setCount] = useState(0)
      const numberValue = parseInt(value.replace(/[^0-9]/g, ''))
      
      useEffect(() => {
        const controls = animate(0, numberValue, {
          duration: 2,
          onUpdate: (value) => setCount(Math.floor(value))
        })
        return () => controls.stop()
      }, [numberValue])
      
      return <span>{count}K+</span>
    }

    const router = useRouter()

    const handleExplore = async () => {
      // 创建过渡容器
      const transition = document.createElement('div')
      transition.style.cssText = `
        position: fixed;
        inset: 0;
        background: linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
        z-index: 9999;
        opacity: 0;
        backdrop-filter: blur(8px);
        pointer-events: none;
      `
      document.body.appendChild(transition)

      // 添加动画效果
      requestAnimationFrame(() => {
        transition.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        transition.style.opacity = '1'
      })

      // 等待过渡动画
      await new Promise(resolve => setTimeout(resolve, 300))

      // 执行跳转
      router.push('/marketplace')

      // 在新页面加载后移除过渡效果
      setTimeout(() => {
        transition.style.opacity = '0'
        setTimeout(() => {
          transition.remove()
        }, 600)
      }, 100)
    }

    // 添加钱包相关状态
    const [account, setAccount] = useState("")
    const [isConnected, setIsConnected] = useState(false)
    const [chainId, setChainId] = useState<string>("")
    const [isCorrectNetwork, setIsCorrectNetwork] = useState(false)

    // 自动连接钱包
    const autoConnectWallet = async () => {
        if (typeof window.ethereum === "undefined") return;
        
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            
            if (accounts.length > 0) {
                const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                const isCorrectNetwork = chainId === '0x7A69';
                
                setAccount(accounts[0]);
                setChainId(chainId);
                setIsConnected(true);
                setIsCorrectNetwork(isCorrectNetwork);

                if (!isCorrectNetwork) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: '0x7A69' }],
                        });
                    } catch (error) {
                        console.error('切换网络失败:', error);
                    }
                }
            }
        } catch (error) {
            console.error("自动连接失败:", error);
        }
    };

    useEffect(() => {
        autoConnectWallet();
        
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (newAccounts: string[]) => {
                if (newAccounts.length === 0) {
                    setAccount("");
                    setIsConnected(false);
                } else {
                    setAccount(newAccounts[0]);
                    setIsConnected(true);
                }
            });

            window.ethereum.on('chainChanged', (newChainId: string) => {
                setChainId(newChainId);
                setIsCorrectNetwork(newChainId === '0x7A69');
            });
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', () => {});
                window.ethereum.removeListener('chainChanged', () => {});
            }
        };
    }, []);

    // 添加结构化数据对象
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Literasea - Web3 Books Platform",
      "description": "Discover and own unique digital books on the blockchain",
      "mainEntity": {
        "@type": "Product",
        "name": "NFT Books",
        "description": "Digital books with blockchain ownership",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "1200",
          "bestRating": "5",
          "worstRating": "1"
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "ETH",
          "availability": "https://schema.org/InStock",
          "highPrice": "2.0",
          "lowPrice": "0.1",
          "offerCount": "100"
        }
      },
      "publisher": {
        "@type": "Organization",
        "name": "Literasea",
        "logo": {
          "@type": "ImageObject",
          "url": "https://literasea-two.vercel.app/logo.png"
        }
      }
    }

    return (
    <div className="min-h-screen bg-background">
      <div ref={targetRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <BackgroundGradient />
        
        {/* SEO Meta Tags */}
        <meta itemProp="name" content="Literasea - Web3 Digital Reading Platform" />
        <meta itemProp="description" content="Revolutionary NFT books marketplace for digital reading and trading" />
        <meta itemProp="image" content="https://literasea-two.vercel.app/hero-image.jpg" />
        <meta name="keywords" content="NFT Books, Web3 Reading, Digital Books, Blockchain Literature, Crypto Books" />
        <meta name="author" content="Literasea" />

        {/* 浮动装饰元 */}
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element.position} opacity-20`}
            animate={element.animation}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            {element.icon}
          </motion.div>
        ))}

        {/* 主要内容区域 */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ 
            opacity: opacitySpring,
            scale: scaleSpring,
            y: ySpring
          }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
          itemScope
          itemType="https://schema.org/WebPageElement"
        >
          {/* 隐藏的 SEO 标题 */}
          <h1 className="sr-only">
            Literasea - Web3 Digital Reading Platform | NFT Books Marketplace
          </h1>

          {/* Welcome Badge */}
          <motion.div
            variants={item}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge 
              className="mb-4 py-2 px-4 text-base backdrop-blur-sm bg-background/50 hover:bg-background/70 transition-colors"
              variant="secondary"
            >
              <Sparkles className="w-4 h-4 mr-2 inline-block" />
              Welcome to the Future of Reading
            </Badge>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 relative"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 inline-block relative"
            >
              Discover the Future of Reading
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400/30 to-purple-600/30 transform origin-left"
              />
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative inline-flex items-center gap-2"
            >
              with
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-500 relative group">
                Web3 Books
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-2 bg-yellow-500/10 rounded-lg -z-10 group-hover:bg-yellow-500/20 transition-colors"
                />
              </span>
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Experience the revolution in digital reading. Purchase, collect, and trade unique NFT books
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-primary font-medium"
            > while supporting your favorite authors directly</motion.span>.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mx-auto max-w-xl"
          >
            {/* Connect Wallet Button with Background Color */}
            <Button
                variant="default"  // 使用 solid 变体
                size="lg"
                className="w-full sm:w-[200px] group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 transition-all duration-300"
                onClick={autoConnectWallet}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.8 }}
                />
                <Wallet className="mr-2 h-4 w-4 relative z-10" />
                <span className="relative z-10">
                    {isConnected ? (
                        <>
                            <div className="w-2 h-2 rounded-full bg-green-400 inline-block mr-2 animate-pulse" />
                            {`${account.slice(0, 6)}...${account.slice(-4)}`}
                        </>
                    ) : (
                        'Connect Wallet'
                    )}
                </span>
            </Button>

            {/* Explore Collection Button */}
            <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-[200px] group relative overflow-hidden border-purple-500 hover:border-purple-600 text-purple-600 hover:text-purple-700 bg-white hover:bg-purple-50 transition-all duration-300"
                onClick={handleExplore}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-50 to-purple-100/50 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.05 }}
                />
                <BookOpen className="mr-2 h-4 w-4" />
                Explore Collection
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* 添加更多结构化数据标记 */}
          <div itemScope itemType="https://schema.org/Product">
            <meta itemProp="name" content="NFT Books Collection" />
            <meta itemProp="description" content="Digital books with blockchain ownership verification" />
            <div itemProp="offers" itemScope itemType="https://schema.org/AggregateOffer">
              <meta itemProp="priceCurrency" content="ETH" />
              <meta itemProp="availability" content="https://schema.org/InStock" />
            </div>
          </div>
        </motion.div>

        {/* JSON-LD 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* 光晕效果保持不变 */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          animate={{
            boxShadow: [
              "0 0 100px 50px rgba(59, 130, 246, 0.1)",
              "0 0 150px 80px rgba(139, 92, 246, 0.1)",
              "0 0 100px 50px rgba(236, 72, 153, 0.1)"
            ]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
    </div>
    )
}

export default HeroSection