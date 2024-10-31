'use client'

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useSpring, animate } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ChevronRight, Wallet, Sparkles, BookMarked, Users, Check, Star, TrendingUp } from "lucide-react"
import { useRouter } from 'next/navigation'
import web3Future from "../public/images/web3-future.jpg"
// import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
// import { Toast } from "@/components/ui/toast"

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
    // 添加淡出动画
    document.body.style.opacity = '0'
    document.body.style.transition = 'opacity 0.3s ease'
    
    // 等待动画完成
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // 执行跳转
    router.push('/books')
    
    // 恢复透明度
    setTimeout(() => {
      document.body.style.opacity = '1'
    }, 100)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div ref={targetRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <BackgroundGradient />
        {/* 浮动装饰元素 */}
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
      <section className="relative overflow-hidden">
        <BackgroundGradient />
        {/* 内容部分 */}
        <div className="relative z-10 py-24 px-4">
          <div className="max-w-7xl mx-auto">
            {/* 标题部分 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Why Choose NFT Books
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover the advantages of our revolutionary digital reading platform
              </p>
            </motion.div>

            {/* 特性卡片网格 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <BookMarked className="h-6 w-6" />,
                  title: "Permanent Ownership",
                  description: "Your NFT books are truly yours forever, secured by blockchain technology",
                  gradient: "from-blue-500 to-purple-500"
                },
                {
                  icon: <TrendingUp className="h-6 w-6" />,
                  title: "Investment Potential",
                  description: "Digital books that can appreciate in value over time",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: "Vibrant Community",
                  description: "Connect with fellow readers and participate in exclusive discussions",
                  gradient: "from-pink-500 to-blue-500"
                },
                {
                  icon: <Star className="h-6 w-6" />,
                  title: "Author Direct Support",
                  description: "Support your favorite authors directly without intermediaries",
                  gradient: "from-blue-500 to-purple-500"
                },
                {
                  icon: <Sparkles className="h-6 w-6" />,
                  title: "Exclusive Content",
                  description: "Access special editions and author-exclusive materials",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: <BookOpen className="h-6 w-6" />,
                  title: "Seamless Reading",
                  description: "Enjoy your books across all devices with our modern reader",
                  gradient: "from-pink-500 to-blue-500"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="p-6 bg-background/60 backdrop-blur-sm rounded-xl border transition-all duration-300 hover:shadow-xl hover:border-primary/50">
                    {/* 图标容器 */}
                    <motion.div 
                      className={`h-12 w-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 text-white`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    
                    {/* 标题 */}
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    {/* 描述 */}
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>

                    {/* 悬浮装饰效果 */}
                    <motion.div
                      className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.05 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} blur-xl`} />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="relative overflow-hidden">
        <BackgroundGradient />
        <div className="relative z-10 py-24 px-4">
          <div className="max-w-7xl mx-auto">
            {/* 标题部分 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Featured NFT Books
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover unique digital books from renowned authors
              </p>
            </motion.div>

            {/* 走马灯部分 */}
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="flex gap-6"
                animate={{
                  x: [0, -1920], // 根据实际内容宽度调整
                }}
                transition={{
                  x: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                
                {/* 重复两次书籍列表以实现无缝滚动 */}
                {[...Array(2)].map((_, setIndex) => (
                  <div key={setIndex} className="flex gap-6 shrink-0">
                    {[
                      { 
                        title: "Crypto Tales", 
                        author: "Alex River", 
                        price: "0.1 ETH",
                        rating: "4.8",
                        category: "Fiction",
                        image: "/images/1.jpg"
                      },
                      { 
                        title: "Web3 Future", 
                        author: "Sarah Chen", 
                        price: "0.08 ETH",
                        rating: "4.9",
                        category: "Technology",
                        image: "/images/2.jpg"
                      },
                      { 
                        title: "Digital Dreams", 
                        author: "Mike Peters", 
                        price: "0.12 ETH",
                        rating: "4.7",
                        category: "Sci-Fi",
                        image: "/images/3.jpg"
                      },
                      { 
                        title: "Meta World", 
                        author: "Lisa Wong", 
                        price: "0.15 ETH",
                        rating: "4.6",
                        category: "Fantasy",
                        image: "/images/4.jpg"
                      }
                    ].map((book, index) => (
                      <motion.div
                        key={`${setIndex}-${index}`}
                        className="w-72 shrink-0 group cursor-pointer"
                        whileHover={{ y: -10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <div className="relative aspect-[3/4] mb-4 rounded-xl overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                          <Image
                            src={book.image}
                            alt={book.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute bottom-4 left-4 right-4 z-20">
                            <Badge className="mb-2 bg-primary/80 backdrop-blur-sm">
                              {book.category}
                            </Badge>
                            <div className="flex items-center text-white">
                              <Star className="w-4 h-4 fill-current text-yellow-400" />
                              <span className="ml-1 text-sm">{book.rating}</span>
                            </div>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {book.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                        <p className="text-sm font-medium text-primary mt-1">{book.price}</p>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <BackgroundGradient />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto text-center py-24 px-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Ready to Start Your NFT Book Collection?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Take part in our community and own your digital library today
          </p>
          <Button
            size="lg"
            onClick={connectWallet}
            className="group relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.05 }}
            />
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet to Begin
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden">
        <BackgroundGradient />
        {/* Footer content ... */}
      </footer>
    </div>
  )
}