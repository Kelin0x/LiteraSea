'use client'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import BackgroundGradient from './BackgroundGradient'
const FeaturedBook = () => {
  const books = [
    {
      title: "Crypto Tales",
      author: "Alex River",
      price: "0.1 ETH",
      rating: "4.8",
      category: "Fiction",
      image: "/images/1.png",
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Web3 Future",
      author: "Sarah Chen",
      price: "0.08 ETH",
      rating: "4.9",
      category: "Technology",
      image: "/images/2.png",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Digital Dreams",
      author: "Mike Peters",
      price: "0.12 ETH",
      rating: "4.7",
      category: "Sci-Fi",
      image: "/images/3.png",
      color: "from-pink-500 to-red-500"
    },
    {
      title: "Meta World",
      author: "Lisa Wong",
      price: "0.15 ETH",
      rating: "4.6",
      category: "Fantasy",
      image: "/images/4.png",
      color: "from-red-500 to-orange-500"
    }
  ];

  return (
    <section className="relative overflow-hidden py-24">
      
      <BackgroundGradient />
      
      {/* 标题区域 */}
      <div className="text-center mb-16 relative">
        <h2 className="text-4xl lg:text-5xl font-medium leading-tight mb-4">
          <span className="text-gray-900">Featured </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-purple-600">Collections</span>
        </h2>
        <div className="h-1 w-40 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
      </div>
      {/* 书籍展示区 */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {books.map((book, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* 书籍封面 */}
              <div className="aspect-[3/4] relative">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  className="object-cover rounded-t-xl transform transition-transform group-hover:scale-105 duration-500"
                />
                
                {/* 渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                
                {/* 分类标签 */}
                <div className="absolute top-4 left-4">
                  <Badge className={`bg-gradient-to-r ${book.color} text-white hover:shadow-lg transition-shadow`}>
                    {book.category}
                  </Badge>
                </div>
                
                {/* 评分 */}
                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-white text-sm">{book.rating}</span>
                </div>
              </div>

              {/* 书籍信息 */}
              <div className="p-4">
                <h3 className="text-lg font-semibold truncate group-hover:text-blue-600 transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                
                {/* 价格和按钮 */}
                <div className="flex items-center justify-between">
                  <p className="text-blue-600 font-medium">
                    {book.price}
                  </p>
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${book.color} text-white
                              hover:shadow-lg transition-all duration-300 hover:scale-105`}
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* 卡片阴影效果 */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-black/5 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedBook
