'use client'
import { motion } from 'framer-motion'
import { BookOpenCheck, ShieldCheck, Coins, Users2, Compass } from 'lucide-react'

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: <BookOpenCheck className="w-6 h-6" />,
      title: "Digital Ownership",
      description: "Secure permanent ownership of your digital books through blockchain technology",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Secure Trading",
      description: "Every transaction is secured and recorded with smart contract technology",
    },
    {
      icon: <Coins className="w-6 h-6" />,
      title: "Value Growth",
      description: "Digital books as NFT assets can be traded freely in the marketplace",
    },
    {
      icon: <Users2 className="w-6 h-6" />,
      title: "Community",
      description: "Join a vibrant reader community to share insights and connect with others",
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* 渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
      
      {/* 装饰性背景圆 */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full filter blur-[128px] opacity-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full filter blur-[128px] opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 左侧内容 */}
          <div className="space-y-10">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-block"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <Compass className="w-8 h-8" />
                </div>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl font-serif font-medium text-gray-900"
              >
                Navigate Your Digital Reading Journey
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-lg text-gray-600 leading-relaxed"
              >
                Experience a revolutionary approach to digital reading where blockchain technology meets literature. We're transforming how you own, trade, and experience digital books.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <a 
                href="#" 
                className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Learn More
                <svg 
                  className="w-4 h-4 ml-2" 
                  viewBox="0 0 16 16" 
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M6.5 3.5l4 4.5-4 4.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </div>

          {/* 右侧视频展示区 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
            <div className="relative h-full rounded-2xl overflow-hidden bg-white/90 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors group">
                  <svg 
                    className="w-10 h-10 text-white transform translate-x-0.5 group-hover:scale-110 transition-transform" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
              
              {/* 装饰性图标网格 */}
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-4 p-8 opacity-5">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-center">
                    <BookOpenCheck className="w-8 h-8" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection