'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Book, Search, Filter, Star, Heart, ShoppingCart, BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface BookType {
  id: number
  title: string
  author: string
  cover: string
  price: number
  rating: number
  category: string
  likes: number
}

const BookPage = () => {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    'All',
    'Fiction',
    'Non-Fiction',
    'Science',
    'Technology',
    'Business',
    'Art'
  ]

  const books: BookType[] = [
    {
      id: 1,
      title: "The Future of Web3",
      author: "Alex Johnson",
      cover: "/books/future-web3.jpg", // 替换为实际图片路径
      price: 29.99,
      rating: 4.8,
      category: "Technology",
      likes: 1234
    },
    // ... 添加更多书籍
  ]

  const handleReadBook = (bookId: number) => {
    router.push(`/books/${bookId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 顶部搜索和过滤区 */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* 搜索框 */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for books..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* 过滤器按钮 */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* 分类标签 */}
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 主要内容区 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books.map((book) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              {/* 书籍封面 - 可点击区域 */}
              <div 
                className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => handleReadBook(book.id)}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                {/* 悬浮操作按钮 */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button 
                    className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleReadBook(book.id)
                    }}
                  >
                    <BookOpen className="w-5 h-5 text-white" />
                  </button>
                  <button 
                    className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart className="w-5 h-5 text-white" />
                  </button>
                  <button 
                    className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* 书籍信息 - 可点击区域 */}
              <div 
                className="mt-4 space-y-2 cursor-pointer"
                onClick={() => handleReadBook(book.id)}
              >
                <h3 className="font-semibold text-gray-900 line-clamp-1 hover:text-blue-600 transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-500">{book.author}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-gray-600">{book.rating}</span>
                  </div>
                  <span className="font-medium text-blue-600">${book.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 加载更多按钮 */}
      <div className="flex justify-center py-8">
        <button className="px-6 py-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
          Load More Books
        </button>
      </div>
    </div>
  )
}

export default BookPage