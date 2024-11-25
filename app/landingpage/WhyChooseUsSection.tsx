'use client'
import { motion } from 'framer-motion'
import { BookOpenCheck, ShieldCheck, Coins, Users2, Compass } from 'lucide-react'
import { useState } from 'react'
import BackgroundGradient from './BackgroundGradient'

const WhyChooseUsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      icon: <BookOpenCheck className="w-6 h-6" />,
      title: "Digital Ownership",
      description: "Secure permanent ownership of your digital books through blockchain technology",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Secure Trading",
      description: "Every transaction is secured and recorded with smart contract technology",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Coins className="w-6 h-6" />,
      title: "Value Growth",
      description: "Digital books as NFT assets can be freely traded in the marketplace",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: <Users2 className="w-6 h-6" />,
      title: "Community",
      description: "Join a vibrant reader community to share insights and connect worldwide",
      gradient: "from-rose-500 to-orange-500",
    },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
      {/* 渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100" />
      <BackgroundGradient/>
      {/* 装饰性背景圆 */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-200 rounded-full filter blur-[150px] opacity-20" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-200 rounded-full filter blur-[150px] opacity-20" />
      <div className="max-w-[1200px] w-full mx-auto px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* 左侧内容 */}
          <div className="flex flex-col items-start space-y-12">
            {/* 标题部分 */}
            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl lg:text-5xl font-medium leading-tight"
              >
                <span className="text-gray-900">Transform Your </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Digital Reading</span>
                <span className="text-gray-900"> Journey</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-lg text-gray-600 leading-relaxed max-w-2xl"
              >
                Experience a revolutionary approach to digital reading where blockchain meets literature.
              </motion.p>
            </div>

            {/* 特性卡片 */}
            <div className="grid grid-cols-2 gap-5 w-full">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="group relative h-[200px] flex"
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    className="relative w-full p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl
                              transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* 背景渐变 */}
                    <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 
                                  transition-opacity duration-300 ${feature.gradient}`} />
                    
                    {/* 图标 */}
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} 
                                   flex items-center justify-center text-white
                                   group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>

                    {/* 文字内容 */}
                    <h3 className="mt-4 text-lg font-medium text-gray-900
                                 group-hover:text-transparent group-hover:bg-clip-text 
                                 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600
                                 transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed
                                group-hover:text-gray-800 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 右侧浮动图片展示区 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative w-[600px] h-[680px] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 p-6 mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
            <div className="relative h-full rounded-2xl overflow-hidden bg-white/90 shadow-2xl flex items-center justify-center">
              <img
                src="/images/11.png"
                alt="Floating Image"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            {/* 悬浮元素 */}
            <div className="absolute top-0 left-0 w-16 h-16 bg-blue-300 rounded-full filter blur-lg opacity-50 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-purple-300 rounded-full filter blur-lg opacity-50 animate-pulse animation-delay-2000" />
            <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-pink-300 rounded-full filter blur-lg opacity-50 animate-pulse animation-delay-4000" />
            {/* 悬浮书籍元素 */}
            <div className="absolute top-10 left-10 w-12 h-16 bg-gradient-to-br from-yellow-300 to-red-300 rounded-md filter blur-sm opacity-70 animate-bounce" />
            <div className="absolute bottom-10 right-10 w-14 h-18 bg-gradient-to-br from-green-300 to-blue-300 rounded-md filter blur-sm opacity-70 animate-bounce animation-delay-1500" />
            <div className="absolute top-1/3 right-1/3 w-10 h-14 bg-gradient-to-br from-purple-300 to-pink-300 rounded-md filter blur-sm opacity-70 animate-bounce animation-delay-3000" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection