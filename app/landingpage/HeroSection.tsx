import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useSpring, animate, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ChevronRight, Wallet, Sparkles, BookMarked, Users, Check, Star, TrendingUp } from "lucide-react"
import { useRouter } from 'next/navigation'
import Navbar from "./Navbar"
import BackgroundGradient from "./BackgroundGradient"
import floatingElements from "./FloatingElements"


const HeroSection = () => {
    // const [isConnected, setIsConnected] = useState(false)
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
    background: radial-gradient(circle at center, rgba(59, 130, 246, 0.4), rgba(0, 0, 0, 0.95));
    z-index: 9999;
    opacity: 0;
    transform: scale(1.1); // 初始缩放
    transition: opacity 0.5s ease, transform 0.5s ease; // 同时过渡缩放和透明度
    pointer-events: none;
  `
  document.body.appendChild(transition)

  // 淡入和缩小效果
  requestAnimationFrame(() => {
    transition.style.opacity = '1'
    transition.style.transform = 'scale(1)' // 缩放到正常大小
  })

  // 等待过渡动画
  await new Promise(resolve => setTimeout(resolve, 500)) // 等待动画完成

  // 执行跳转
  router.push('/books')

  // 在新页面加载后移除过渡遮罩
  setTimeout(() => {
    transition.style.opacity = '0'
    transition.style.transform = 'scale(1.1)' // 再次缩放
    setTimeout(() => {
      transition.remove()
    }, 500) // 确保与淡出时间一致
  }, 100)
}
    return (
    <div className="min-h-screen bg-background">
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
                NFT Books
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
    </div>
    )
}

export default HeroSection