'use client'

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useSpring, animate, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ChevronRight, Wallet, Sparkles, BookMarked, Users, Check, Star, TrendingUp } from "lucide-react"
import { useRouter } from 'next/navigation'
import { Code2, Fingerprint, BookOpenCheck, Coins, Shield } from "lucide-react"

// 添加这个浮动元素配置
const floatingElements = [
  {
    icon: <BookOpen className="w-16 h-16" />,
    position: "top-1/4 right-1/4",
    animation: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.1, 1]
    }
  },
  {
    icon: <BookOpen className="w-16 h-16" />,
    position: "top-1/4 left-1/4",
    animation: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.1, 1]
    }
  },
  {
    icon: <Sparkles className="w-12 h-12" />,
    position: "bottom-1/4 left-1/4",
    animation: {
      y: [0, 20, 0],
      rotate: [0, -5, 5, 0],
      scale: [1, 0.9, 1]
    }
  },
  {
    icon: <Star className="w-10 h-10" />,
    position: "top-1/3 left-1/5",
    animation: {
      x: [0, 15, 0],
      y: [0, -15, 0],
      rotate: [0, 15, 0]
    }
  },
  {
    icon: <BookMarked className="w-14 h-14" />,
    position: "bottom-1/3 right-1/5",
    animation: {
      x: [0, -15, 0],
      y: [0, 15, 0],
      rotate: [0, -15, 0]
    }
  }
];

// 1. 首先添加一个可复用的背景组件
const BackgroundGradient = () => {
  return (
    <>
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-accent/40" />
      
      {/* 渐变动画背景 */}
      <motion.div
        className="absolute inset-0 opacity-15"
        animate={{
          background: [
            "linear-gradient(45deg, #3B82F6, #8B5CF6)",
            "linear-gradient(45deg, #8B5CF6, #EC4899)",
            "linear-gradient(45deg, #EC4899, #3B82F6)"
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* 动态网格背景 */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          backgroundImage: "radial-gradient(circle at center, #3B82F6 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }}
      />
    </>
  )
}

// 添加导航栏组件
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  // 添加 connectWallet 函数
  const connectWallet = async () => {
    try {
      console.log('Connecting wallet...')
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    }
  }

  // 添加 handleExplore 函数
  const handleExplore = async () => {
    // 创建过渡效果
    const transition = document.createElement('div')
    transition.style.cssText = `
      position: fixed;
      inset: 0;
      background: radial-gradient(circle at center, rgba(59, 130, 246, 0.2), rgba(0, 0, 0, 0.9));
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s ease;
      backdrop-filter: blur(8px);
      pointer-events: none;
    `
    document.body.appendChild(transition)

    // 淡入效果
    requestAnimationFrame(() => {
      transition.style.opacity = '1'
    })

    // 等待过渡动画
    await new Promise(resolve => setTimeout(resolve, 300))

    // 执行跳转
    router.push('/books')

    // 在新页面加载后移除过渡遮罩
    setTimeout(() => {
      transition.style.opacity = '0'
      setTimeout(() => {
        transition.remove()
      }, 300)
    }, 100)
  }

  // 监听滚动
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo with glow effect */}
          <motion.div 
            className="flex items-center space-x-2 relative group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:blur-2xl transition-all duration-300 rounded-full" />
            <BookOpen className="h-8 w-8 text-primary relative z-10" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 relative z-10">
              NFT Books
            </span>
          </motion.div>

          {/* Navigation Links with advanced hover effects */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Features', 'Collection', 'About'].map((item, index) => (
              <motion.div
                key={item}
                className="relative"
                onHoverStart={() => setHoverIndex(index)}
                onHoverEnd={() => setHoverIndex(null)}
              >
                <motion.a
                  href={`#${item.toLowerCase()}`}
                  className="text-foreground/80 hover:text-primary transition-colors relative z-10 py-2 px-4"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                  {/* Glowing underline */}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoverIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Hover glow effect */}
                  {hoverIndex === index && (
                    <motion.div
                      className="absolute inset-0 bg-primary/10 -z-10 rounded-lg blur-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  {/* Particle effect on hover */}
                  {hoverIndex === index && (
                    <motion.div
                      className="absolute inset-0 -z-20"
                      initial="initial"
                      animate="animate"
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-primary rounded-full"
                          initial={{
                            x: 0,
                            y: 0,
                            opacity: 0,
                          }}
                          animate={{
                            x: Math.random() * 40 - 20,
                            y: Math.random() * 40 - 20,
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 0.8,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatType: "loop",
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </motion.a>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons with hover effects */}
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center gap-2 relative group overflow-hidden"
                onClick={connectWallet}
              >
                {/* Button glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.8 }}
                />
                <Wallet className="h-4 w-4 relative z-10" />
                <span className="relative z-10">Connect</span>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-purple-600 text-white relative group overflow-hidden"
                onClick={handleExplore}
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-primary"
                  animate={{
                    x: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <span className="relative z-10">Explore</span>
                <ChevronRight className="ml-2 h-4 w-4 relative z-10" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default function landingpage() {
  const [isConnected, setIsConnected] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.7], [1.3, 0.6])
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "0%"])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const springConfig = { stiffness: 100, damping: 30, bounce: 0 }
  const scaleSpring = useSpring(scale, springConfig)
  const ySpring = useSpring(y, springConfig)
  const opacitySpring = useSpring(opacity, springConfig)

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const [wallet, setWallet] = useState({
    address: '',
    name: '',
    connected: false
  });

  const connectWallet = async () => {

  }

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
    // 创建过渡遮罩
    const transition = document.createElement('div')
    transition.style.cssText = `
      position: fixed;
      inset: 0;
      background: radial-gradient(circle at center, rgba(59, 130, 246, 0.2), rgba(0, 0, 0, 0.9));
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s ease;
      backdrop-filter: blur(8px);
      pointer-events: none;
    `
    document.body.appendChild(transition)

    // 淡入效果
    requestAnimationFrame(() => {
      transition.style.opacity = '1'
    })

    // 等待过渡动画
    await new Promise(resolve => setTimeout(resolve, 300))

    // 执行跳转
    router.push('/books')

    // 在新页面加载后移除过渡遮罩
    setTimeout(() => {
      transition.style.opacity = '0'
      setTimeout(() => {
        transition.remove()
      }, 300)
    }, 100)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar /> {/* 添加导航栏 */}
      {/* Hero Section */}
      <div ref={targetRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <BackgroundGradient />
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

        {/* 添加光晕效果 */}
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



        {/* 主要内容 */}
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
        >
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
              className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 inline-block relative"
            >
              Own Your Digital Library
              {/* 装饰性下划线 */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 to-purple-600/30 transform origin-left"
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-primary relative group">
                NFT Books
                {/* 悬浮效果 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-2 bg-blue-500/10 rounded-lg -z-10 group-hover:bg-blue-500/20 transition-colors"
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
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={connectWallet}
              className="group wallet-button relative overflow-hidden"
              disabled={wallet.connected}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.05 }}
              />
              <Wallet className="mr-2 h-4 w-4" />
              {wallet.connected ? (
                <span className="flex items-center">
                  {wallet.name}
                  <Check className="ml-2 h-4 w-4 text-green-500" />
                </span>
              ) : (
                <span className="flex items-center">
                  Connect Polkadot Wallet
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="group relative overflow-hidden"
              onClick={handleExplore}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.05 }}
              />
              <BookOpen className="mr-2 h-4 w-4" />
              Explore Collection
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Featured Books Section */}
      <section className="relative overflow-hidden py-24">
        <BackgroundGradient />
        
        {/* 3D 旋转标题 */}
        <motion.div
          className="text-center mb-16 relative"
          initial={{ perspective: 1000 }}
        >
          <motion.div
            className="relative inline-block"
            animate={{
              rotateX: [0, 10, 0],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold">
              <motion.span
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto]"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%']
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Featured Collections
              </motion.span>
            </h2>
            
            {/* 装饰性下划线 */}
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-purple-600"
              animate={{
                scaleX: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>

        {/* 3D 书籍展示区 */}
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {[
              {
                title: "Crypto Tales",
                author: "Alex River",
                price: "0.1 ETH",
                rating: "4.8",
                category: "Fiction",
                image: "/images/1.jpg",
                color: "from-blue-500 to-purple-500"
              },
              {
                title: "Web3 Future",
                author: "Sarah Chen",
                price: "0.08 ETH",
                rating: "4.9",
                category: "Technology",
                image: "/images/2.jpg",
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Digital Dreams",
                author: "Mike Peters",
                price: "0.12 ETH",
                rating: "4.7",
                category: "Sci-Fi",
                image: "/images/3.jpg",
                color: "from-pink-500 to-red-500"
              },
              {
                title: "Meta World",
                author: "Lisa Wong",
                price: "0.15 ETH",
                rating: "4.6",
                category: "Fantasy",
                image: "/images/4.jpg",
                color: "from-red-500 to-orange-500"
              }
            ].map((book, index) => (
              <motion.div
                key={index}
                className="group relative perspective-1000"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ z: 50 }}
              >
                {/* 3D 卡片容器 */}
                <motion.div
                  className="relative preserve-3d"
                  whileHover={{ 
                    rotateY: 15,
                    rotateX: -10,
                    scale: 1.05
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* 卡片正面 */}
                  <div className="relative bg-background/80 backdrop-blur-sm rounded-xl overflow-hidden">
                    {/* 书籍封面 */}
                    <div className="aspect-[3/4] relative">
                      <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        className="object-cover rounded-t-xl transform transition-transform group-hover:scale-110 duration-500"
                      />
                      
                      {/* 渐变遮罩 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                      
                      {/* 分类标签 */}
                      <motion.div
                        className="absolute top-4 left-4"
                        whileHover={{ scale: 1.1, rotate: [-5, 5, 0] }}
                      >
                        <Badge className={`bg-gradient-to-r ${book.color} text-white`}>
                          {book.category}
                        </Badge>
                      </motion.div>
                      
                      {/* 评分 */}
                      <motion.div
                        className="absolute top-4 right-4 flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1 backdrop-blur-sm"
                        whileHover={{ scale: 1.1 }}
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Star className="w-4 h-4 text-yellow-500" />
                        </motion.div>
                        <span className="text-white text-sm">{book.rating}</span>
                      </motion.div>
                    </div>

                    {/* 书籍信息 */}
                    <div className="p-4">
                      <motion.h3 
                        className="text-lg font-semibold truncate group-hover:text-primary transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {book.title}
                      </motion.h3>
                      <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                      
                      {/* 价格和按钮 */}
                      <div className="flex items-center justify-between">
                        <motion.p 
                          className="text-primary font-medium"
                          animate={{
                            y: [0, -2, 0]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity
                          }}
                        >
                          {book.price}
                        </motion.p>
                        
                        <motion.button
                          className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${book.color} text-white`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* 3D 效果阴影 */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-black/10 to-black/30 transform translate-z-[-20px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>

                {/* 悬浮时的粒子效果 */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${book.color}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: [0, (Math.random() - 0.5) * 100],
                      y: [0, (Math.random() - 0.5) * 100],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </motion.div>

          {/* 底部 "View All" 按钮 */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-purple-600 text-white px-8 py-6 text-lg font-semibold tracking-wide"
              onClick={() => router.push('/collection')}
            >
              
              <motion.span
                className="ml-2 inline-block"
                animate={{
                  x: [0, 4, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                →
              </motion.span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CallToAction />

      {/* Footer */}
      <footer className="relative overflow-hidden">
        <BackgroundGradient />
        {/* Footer content ... */}
      </footer>
    </div>
  )
}

const WhyChooseUsSection = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const springConfig = { stiffness: 300, damping: 30, bounce: 0.25 }
  const spring = useSpring(scrollYProgress, springConfig)

  const features = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Blockchain Technology",
      description: "Secure and transparent transactions powered by smart contracts",
      gradient: "from-blue-500 to-cyan-500",
      animation: {
        hover: { scale: 1.05, rotate: 5 },
        tap: { scale: 0.95 }
      }
    },
    {
      icon: <Fingerprint className="w-8 h-8" />,
      title: "Unique Authentication",
      description: "Each book is a unique NFT with verified authenticity",
      gradient: "from-purple-500 to-pink-500",
      animation: {
        hover: { scale: 1.05, y: -10 },
        tap: { scale: 0.95 }
      }
    },
    {
      icon: <BookOpenCheck className="w-8 h-8" />,
      title: "Digital Ownership",
      description: "True ownership of your digital book collection",
      gradient: "from-green-500 to-emerald-500",
      animation: {
        hover: { scale: 1.05, rotate: -5 },
        tap: { scale: 0.95 }
      }
    },
    {
      icon: <Coins className="w-8 h-8" />,
      title: "Trading Platform",
      description: "Buy, sell, and trade your NFT books seamlessly",
      gradient: "from-yellow-500 to-orange-500",
      animation: {
        hover: { scale: 1.05, y: -10 },
        tap: { scale: 0.95 }
      }
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Storage",
      description: "Your digital assets are protected and encrypted",
      gradient: "from-red-500 to-rose-500",
      animation: {
        hover: { scale: 1.05, rotate: 5 },
        tap: { scale: 0.95 }
      }
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Features",
      description: "Connect with readers and authors worldwide",
      gradient: "from-indigo-500 to-violet-500",
      animation: {
        hover: { scale: 1.05, y: -10 },
        tap: { scale: 0.95 }
      }
    }
  ]

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen py-24 overflow-hidden bg-background"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* 添加与 hero section 相同的背景渐变 */}
      <BackgroundGradient />
      
      {/* 添加动态网格背景 */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          backgroundImage: "radial-gradient(circle at center, #3B82F6 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }}
      />

      {/* 浮动装饰元素 - 与 hero section 风格一致 */}
      <div className="absolute inset-0 -z-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* 标题部分 */}
        <motion.div 
          className="text-center mb-20 relative"
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
        >
          {/* 主标题 */}
          <motion.div
            className="relative inline-block"
            animate={{
              rotateX: [0, 5, 0],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <motion.span
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto]"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%']
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Why Choose
              </motion.span>
              <br />
              <motion.span
                className="inline-block relative"
                animate={{
                  color: ['#3B82F6', '#8B5CF6', '#3B82F6']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                NFT Books
                {/* 装饰性下划线 */}
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-purple-600"
                  animate={{
                    scaleX: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.span>
            </h2>
          </motion.div>

          {/* 副标题 */}
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative inline-block">
              <motion.p 
                className="text-xl md:text-2xl text-muted-foreground font-medium"
                animate={{
                  y: [0, -2, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="text-primary font-semibold">Revolutionary</span> Digital Reading Experience
                <br />
                Powered by <span className="text-primary font-semibold">Blockchain Technology</span>
              </motion.p>
            </div>
          </motion.div>

          {/* 装饰性元素 */}
          <motion.div
            className="absolute -z-10 inset-0"
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border-2 border-primary/5 rounded-full"
                style={{
                  transform: `scale(${1 + i * 0.2})`,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* 特性展示 - 增加背景模糊效果 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={feature.animation.hover}
              whileTap={feature.animation.tap}
            >
              {/* 卡片内容 - 调整背景透明度和模糊效果 */}
              <div className="relative z-10 p-8 rounded-2xl bg-background/40 backdrop-blur-xl border border-primary/10 h-full">
                <motion.div
                  className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-r ${feature.gradient}`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  {feature.icon}
                </motion.div>

                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>

              {/* 卡片悬浮效果 */}
              <motion.div
                className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* 底部装饰 */}
        <motion.div
          className="mt-20 text-center"
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-primary px-6 font-semibold text-white"
            whileHover="hover"
            whileTap="tap"
            variants={{
              hover: { scale: 1.02 },
              tap: { scale: 0.98 }
            }}
          >
            {/* 背景动画效果 */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 100%'
              }}
            />

            {/* 按钮内容容器 */}
            <motion.div
              className="relative flex items-center gap-1.5"
              variants={{
                hover: {
                  x: [-2, 0],
                  transition: {
                    duration: 0.3
                  }
                }
              }}
            >
              {/* 文字 */}
              <span className="relative text-lg font-bold tracking-wider">
                Start Exploring
              </span>

              {/* 箭头图标 */}
              <motion.div
                variants={{
                  hover: {
                    x: [0, 4],
                    transition: {
                      duration: 0.3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }
                }}
              >
                <ChevronRight className="h-5 w-5" />
              </motion.div>

              {/* 悬浮时的光效 */}
              <motion.div
                className="absolute -inset-x-2 -inset-y-2 hidden rounded-lg group-hover:block"
                initial={{ opacity: 0 }}
                whileHover={{
                  opacity: [0, 1, 0],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity
                  }
                }}
              >
                <div className="h-full w-full rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </motion.div>
            </motion.div>

            {/* 点击涟漪效果 */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-md"
              initial={{ scale: 0, opacity: 0.5 }}
              whileTap={{
                scale: 1.5,
                opacity: 0,
                transition: { duration: 0.4 }
              }}
            >
              <div className="h-full w-full rounded-md bg-white" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}

const CallToAction = () => {
  return (
    <section className="relative overflow-hidden py-24">
      {/* 只保留基础背景渐变 */}
      <BackgroundGradient />
      
      {/* 浮动元素 */}
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

      {/* 原有内容保持不变 */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        {/* 主标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 mb-10"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
              Ready to Start Your NFT Book Collection?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Take part in our community and own your digital library today
          </p>
        </motion.div>

        {/* 连接钱包按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Button
            size="lg"
            className="group relative px-8 py-6 text-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/80 hover:to-purple-600/80"
            onClick={()=>connectWallet()}
          >
            {/* 按钮光效 */}
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-lg"
              animate={{
                scale: [1, 1.5],
                opacity: [0, 0.2, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
            
            {/* 按钮内容 */}
            <span className="relative z-10 flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Connect Wallet to Begin
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                →
              </motion.span>
            </span>
          </Button>

        </motion.div>
            
      </div>
    </section>
  )
}