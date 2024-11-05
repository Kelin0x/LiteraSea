import { motion } from 'framer-motion'

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

export default BackgroundGradient