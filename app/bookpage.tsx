'use client'

import Image from "next/image"
import { Bell, BookOpen, HelpCircle, Home, Library, Search, Settings, Check, Eye, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useRouter } from 'next/navigation'

const ReadingProgress = ({ book }: { book: any }) => {
  return (
    <motion.div 
      className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/30 backdrop-blur-sm transition-colors"
      whileHover={{ x: 4 }}
    >
      <Image
        src={book.cover || "/placeholder.svg"}
        alt={book.title}
        width={40}
        height={60}
        className="rounded shadow-sm"
      />
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium hover:text-primary cursor-pointer">
            {book.title}
          </span>
          <span className="text-sm text-muted-foreground">{book.pages} pages</span>
        </div>
        <div className="relative">
          <Progress value={book.progress} className="h-2" />
          <span className="absolute right-0 top-3 text-xs text-muted-foreground">
            {book.progress}% complete
          </span>
        </div>
      </div>
    </motion.div>
  )
}

const AuthorCard = ({ author }: { author: any }) => {
  const [isFollowing, setIsFollowing] = useState(author.following)
  
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-2">
        <Image
          src="/placeholder.svg"
          alt={author.name}
          width={32}
          height={32}
          className="rounded-full ring-2 ring-offset-2 ring-primary/20"
        />
        <span className="font-medium hover:text-primary cursor-pointer">
          {author.name}
        </span>
      </div>
      <Button 
        variant={isFollowing ? "default" : "outline"} 
        size="sm"
        onClick={() => setIsFollowing(!isFollowing)}
        className="transition-all duration-300"
      >
        {isFollowing ? (
          <>
            <Check className="mr-2 h-3 w-3" />
            Following
          </>
        ) : "Follow"}
      </Button>
    </div>
  )
}

const BlogCard = ({ blog }: { blog: any }) => {
  return (
    <motion.div 
      className="space-y-1 p-3 rounded-lg hover:bg-accent/50 cursor-pointer"
      whileHover={{ x: 4 }}
    >
      <h3 className="font-medium line-clamp-2 hover:text-primary">
        {blog.title}
      </h3>
      <p className="text-sm text-muted-foreground">{blog.author}</p>
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1 hover:text-primary">
          <Eye className="h-4 w-4" /> {blog.stats.views}
        </span>
        <span className="flex items-center gap-1 hover:text-primary">
          <MessageCircle className="h-4 w-4" /> {blog.stats.comments}
        </span>
      </div>
    </motion.div>
  )
}

const BookCard = ({ book }: { book: any }) => {
  const router = useRouter()

  const handleReadNow = () => {
    router.push(`/books/${book.id}`)
  }

  return (
    <motion.div 
      className="space-y-2 cursor-pointer backdrop-blur-sm bg-background/40 rounded-lg p-3"
      whileHover={{ 
        y: -8,
        transition: { 
          type: "spring", 
          stiffness: 400,
          damping: 10
        }
      }}
    >
      <div className="relative group">
        <Image
          src={book.cover}
          alt={book.title}
          width={200}
          height={300}
          className="w-full rounded-lg object-cover aspect-[2/3] transition-transform duration-300 group-hover:scale-105"
        />
        <motion.div 
          className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Button 
            variant="secondary" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              handleReadNow()
            }}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Read Now
          </Button>
        </motion.div>
      </div>
      <motion.h3 
        className="font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {book.title}
      </motion.h3>
      <motion.p 
        className="text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {book.author}
      </motion.p>
    </motion.div>
  )
}

const BooksGrid = () => {
  const books = [
    {
      id: "1",
      title: "I owe you one",
      author: "Sophie Kinsella",
      cover: "/placeholder.svg"
    },
    {
      id: "2",
      title: "Fact fulness",
      author: "Hans Rosling",
      cover: "/placeholder.svg"
    },
    {
      id: "3",
      title: "The Other Son",
      author: "Nick Alexander",
      cover: "/placeholder.svg"
    },
    {
      id: "4",
      title: "Can you keep a secret",
      author: "Sophie Kinsella",
      cover: "/placeholder.svg"
    },
    {
      id: "5",
      title: "Educated",
      author: "Tara Westover",
      cover: "/placeholder.svg"
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
      <AnimatePresence>
        {books.map((book, index) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.43, 0.13, 0.23, 0.96]
              }
            }}
            exit={{ opacity: 0, y: -100 }}
            className="book-card"
          >
            <BookCard book={book} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

const BackgroundGradient = () => {
  return (
    <>
      {/* 主背景渐变 */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background/95 to-accent/20" />
      
      {/* 动态渐变背景 */}
      <motion.div
        className="fixed inset-0 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, #3B82F6 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, #8B5CF6 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, #EC4899 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, #3B82F6 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* 动态网格背景 */}
      <motion.div
        className="fixed inset-0 opacity-[0.02]"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          backgroundImage: `radial-gradient(circle at center, #3B82F6 0.5px, transparent 0.5px)`,
          backgroundSize: "24px 24px"
        }}
      />

      {/* 光晕效果 */}
      <div className="fixed inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
    </>
  )
}

export default function BookPage() {
  const [activeTab, setActiveTab] = useState("popular")

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.98
    },
    animate: {
      opacity: 1,
      scale: 1
    },
    exit: {
      opacity: 0,
      scale: 0.98
    }
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
      className="min-h-screen bg-background/30 backdrop-blur-3xl relative"
    >
      <BackgroundGradient />
      
      <div className="relative z-10">
        <div className="flex">
          {/* Sidebar */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-64 border-r border-border/30 p-4 space-y-6 backdrop-blur-md bg-background/30"
          >
            <div className="flex items-center gap-2 mb-8">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">E-Book</span>
            </div>
            
            <nav className="space-y-2">
              {[
                { icon: <Home className="h-4 w-4" />, label: "Home" },
                { icon: <Library className="h-4 w-4" />, label: "Discover" },
                { icon: <BookOpen className="h-4 w-4" />, label: "Bookmark" },
                { icon: <Settings className="h-4 w-4" />, label: "Settings" },
                { icon: <HelpCircle className="h-4 w-4" />, label: "Help" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 4 }}
                >
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    {item.icon}
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 p-6 backdrop-blur-md bg-background/20">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search books..." 
                    className="pl-8 transition-all duration-300 focus:w-80" 
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full text-[10px] text-white flex items-center justify-center">
                      3
                    </span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    🌙
                  </Button>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Image
                      src="/placeholder.svg"
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full ring-2 ring-offset-2 ring-primary/20"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList>
                  {["Popular", "Top Selling", "Following", "New"].map((tab) => (
                    <TabsTrigger 
                      key={tab} 
                      value={tab.toLowerCase().replace(" ", "-")}
                      className="relative"
                    >
                      {tab}
                      {tab === "New" && (
                        <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full" />
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Books Grid */}
              <BooksGrid />

              {/* Reading Progress */}
              <div className="space-y-4">
                {[
                  { title: "Hold back the star", progress: 64, pages: 121 },
                  { title: "One day a novel", progress: 45, pages: 11 },
                  { title: "In the company of", progress: 52, pages: 21 }
                ].map((book, i) => (
                  <ReadingProgress key={i} book={book} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-80 border-l border-border/30 p-6 backdrop-blur-md bg-background/30"
          >
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Trending Authors</h2>
              {[
                { name: "James Elijah", following: false },
                { name: "William Henry", following: false },
                { name: "Aria Abigail", following: false },
                { name: "Mia Evelyn", following: false },
                { name: "Mateo Levi", following: true }
              ].map((author, i) => (
                <AuthorCard key={i} author={author} />
              ))}
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Popular Blogs</h2>
              <div className="space-y-4">
                {[
                  {
                    title: "The Week All you need to know about",
                    author: "Published by Sheila",
                    stats: { views: 122, comments: 44 }
                  },
                  {
                    title: "Mobile with new app for designers",
                    author: "Published by Malik",
                    stats: { views: 88, comments: 22 }
                  },
                  {
                    title: "Five ways to find more time in business",
                    author: "Published by Sonic",
                    stats: { views: 12, comments: 4 }
                  }
                ].map((blog, i) => (
                  <BlogCard key={i} blog={blog} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}