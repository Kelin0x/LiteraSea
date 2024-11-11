'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'
import BackgroundGradient from './BackgroundGradient'
// import floatingElements from './FloatingElements'

const CallToAction = () => {
    // 添加 connectWallet 函数
    const connectWallet = async () => {
      try {
        console.log('Connecting wallet...')
        // 这里添加实际的钱包连接逻辑
      } catch (error) {
        console.error('Failed to connect wallet:', error)
      }
    }
  
    return (
      <section className="relative overflow-hidden py-24">
        {/* 只保留基础背景渐变 */}
        <BackgroundGradient />
        
  
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
                Ready to Start Your Web3 Book Collection?
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
              onClick={() => connectWallet()}
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

export default CallToAction