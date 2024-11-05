'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { BookOpen, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'

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
      }, 150)
    }, 50)
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

export default Navbar