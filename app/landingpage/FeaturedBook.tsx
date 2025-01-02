'use client'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import BackgroundGradient from './BackgroundGradient'

const FeaturedBook = () => {
  const books = [
    {
      title: "Crypto Tales",
      rating: "4.8",
      category: "Fiction",
      image: "/images/1.png",
      color: "from-blue-500 to-purple-500",
      description: "A thrilling journey through the world of cryptocurrency and blockchain technology"
    },
    {
      title: "Web3 Future",
      rating: "4.9",
      category: "Technology",
      image: "/images/2.png",
      color: "from-purple-500 to-pink-500",
      description: "Exploring the decentralized future of the internet and digital innovation"
    },
    {
      title: "Digital Dreams",
      rating: "4.7",
      category: "Sci-Fi",
      image: "/images/3.png",
      color: "from-pink-500 to-red-500",
      description: "A science fiction novel about virtual reality and digital consciousness"
    },
    {
      title: "Meta World",
      rating: "4.6",
      category: "Fantasy",
      image: "/images/4.png",
      color: "from-red-500 to-orange-500",
      description: "An epic fantasy adventure in the metaverse"
    }
  ];

  const handleExplore = () => {
    window.location.href = '/marketplace';
  };

  return (
    <section 
      className="relative overflow-hidden py-24"
      itemScope 
      itemType="https://schema.org/CollectionPage"
    >
      <BackgroundGradient />
      
      {/* 标题区域 */}
      <div className="text-center mb-16 relative">
        <h2 
          className="text-4xl lg:text-5xl font-medium leading-tight mb-4"
          itemProp="name"
        >
          <span className="text-gray-900">Featured </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-purple-600">Collections</span>
        </h2>
        <div className="h-1 w-40 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
      </div>

      {/* 书籍展示区 */}
      <div className="max-w-7xl mx-auto px-4">
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          itemProp="mainEntity"
          itemScope 
          itemType="https://schema.org/ItemList"
        >
          {books.map((book, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              itemScope 
              itemType="https://schema.org/Book"
              itemProp="itemListElement"
            >
              {/* 书籍封面 */}
              <div className="aspect-[3/4] relative">
                <Image
                  src={book.image}
                  alt={`${book.title} - ${book.category} book cover featuring ${book.description}`}
                  fill
                  className="object-cover rounded-t-xl transform transition-transform group-hover:scale-105 duration-500"
                  itemProp="image"
                  priority={index < 2} // 优先加载前两张图片
                />
                
                {/* 渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                
                {/* 分类标签 */}
                <div className="absolute top-4 left-4">
                  <Badge 
                    className={`bg-gradient-to-r ${book.color} text-white hover:shadow-lg transition-shadow`}
                    itemProp="genre"
                  >
                    {book.category}
                  </Badge>
                </div>
                
                {/* 评分 */}
                <div 
                  className="absolute top-4 right-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1"
                  itemProp="aggregateRating"
                  itemScope 
                  itemType="https://schema.org/AggregateRating"
                >
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" aria-hidden="true" />
                  <span className="text-white text-sm" itemProp="ratingValue">{book.rating}</span>
                  <meta itemProp="bestRating" content="5" />
                  <meta itemProp="reviewCount" content="100" />
                </div>
              </div>

              {/* 书籍信息 */}
              <div className="p-4">
                <h3 
                  className="text-lg font-semibold truncate group-hover:text-blue-600 transition-colors"
                  itemProp="name"
                >
                  {book.title}
                </h3>
                
                <meta itemProp="description" content={book.description} />
                
                {/* 按钮 */}
                <div className="flex justify-center">
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${book.color} text-white
                              hover:shadow-lg transition-all duration-300 hover:scale-105`}
                    onClick={handleExplore}
                    aria-label={`View details of ${book.title}`}
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

      {/* 添加结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Featured Book Collections",
            "description": "Discover our featured NFT book collections",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": books.map((book, index) => ({
                "@type": "Book",
                "position": index + 1,
                "name": book.title,
                "description": book.description,
                "genre": book.category,
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": book.rating,
                  "bestRating": "5",
                  "reviewCount": "100"
                }
              }))
            }
          })
        }}
      />
    </section>
  )
}

export default FeaturedBook
