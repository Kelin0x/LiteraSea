import { motion } from 'framer-motion'

const BackgroundGradient = () => {
  return (
    <>
      {/* 主渐变背景 - 淡蓝色系 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EEF2FF] via-[#E8F1FF] to-[#DBEAFE]" />
      
      {/* 动态渐变叠加层 */}
      <motion.div
        className="absolute inset-0 opacity-[0.15]"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, #93C5FD 0%, transparent 50%)",
            "radial-gradient(circle at 60% 60%, #93C5FD 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, #93C5FD 0%, transparent 50%)",
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* 柔和光晕效果 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full filter blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/30 rounded-full filter blur-[128px]" />
      </div>

      {/* 细微的网格纹理 */}
      <motion.div
        className="absolute inset-0 opacity-[0.05]"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          backgroundImage: "radial-gradient(circle at center, #60A5FA 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />
    </>
  )
}

export default BackgroundGradient