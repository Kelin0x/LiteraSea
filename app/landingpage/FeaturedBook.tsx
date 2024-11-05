import { motion } from 'framer-motion'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import BackgroundGradient from './BackgroundGradient'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'



const FeaturedBook = () => {
    const router = useRouter()
    return (
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
                  <div className="relative bg-background/80 rounded-xl overflow-hidden">
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
                        className="absolute top-4 right-4 flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1"
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

          
          </div>
        </section>
    )
}

export default FeaturedBook
