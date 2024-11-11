'use client'
import { useRef } from 'react'
import { useScroll, useSpring, motion } from 'framer-motion'
import { Code2, Fingerprint, BookOpenCheck, Coins, Shield, Users } from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import BackgroundGradient from './BackgroundGradient'

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
                  Web3 Books
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
  
export default WhyChooseUsSection