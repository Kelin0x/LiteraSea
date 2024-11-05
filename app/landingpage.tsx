'use client'

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useSpring, animate, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ChevronRight, Wallet, Sparkles, BookMarked, Users, Check, Star, TrendingUp } from "lucide-react"
import { useRouter } from 'next/navigation'
import Navbar from "./landingpage/Navbar"
import BackgroundGradient from "./landingpage/BackgroundGradient"
import floatingElements from "./landingpage/FloatingElements"
import CallToAction from "./landingpage/CallToAction"
import WhyChooseUsSection from "./landingpage/WhyChooseUsSection"




export default function landingpage() {
  const [isConnected, setIsConnected] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.7], [1.1, 0.6])
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
      transition: opacity 0.15s ease;
      backdrop-filter: blur(8px);
      pointer-events: none;
    `
    document.body.appendChild(transition)

    // 淡入效果
    requestAnimationFrame(() => {
      transition.style.opacity = '1'
    })

    // 等待过渡动画
    await new Promise(resolve => setTimeout(resolve, 150))

    // 执行跳转
    router.push('/books')

    // 在新页面加载后移除过渡遮罩
    setTimeout(() => {
      transition.style.opacity = '0'
      setTimeout(() => {
        transition.remove()
      }, 200)
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
