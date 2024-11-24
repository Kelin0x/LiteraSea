'use client'

import { useState } from "react"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Header } from "../marketplace/header"
import { Search, BookOpen, Sparkles } from "lucide-react"

// 更新为英文数据
const BOOKS_DATA = [
  {
    id: "1",
    title: "The Three-Body Problem",
    author: "Cixin Liu",
    description: "The first contact between Earth civilization and extraterrestrial intelligence leads to a mind-bending journey through space and time...",
    cover: "https://placehold.co/400x600/png?text=Three-Body",
    price: "0.1",
    category: "Sci-Fi"
  },
  {
    id: "2",
    title: "To Live",
    author: "Yu Hua",
    description: "A masterpiece chronicling the struggles and resilience of one man through decades of Chinese history...",
    cover: "https://placehold.co/400x600/png?text=To-Live",
    price: "0.08",
    category: "Literature"
  },
  {
    id: "3",
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    description: "A landmark of magical realism, following seven generations of the Buendía family in the mythical town of Macondo...",
    cover: "https://placehold.co/400x600/png?text=100-Years",
    price: "0.12",
    category: "Literature"
  },
  {
    id: "4",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    description: "An engaging exploration of how biology and history have defined us and enhanced our understanding of what it means to be human...",
    cover: "https://placehold.co/400x600/png?text=Sapiens",
    price: "0.15",
    category: "History"
  },
  {
    id: "5",
    title: "The Midnight Library",
    author: "Matt Haig",
    description: "Between life and death there is a library, and within that library, the shelves go on forever...",
    cover: "https://placehold.co/400x600/png?text=Midnight",
    price: "0.09",
    category: "Fiction"
  },
  {
    id: "6",
    title: "Project Hail Mary",
    author: "Andy Weir",
    description: "A lone astronaut must save humanity from extinction in this thrilling interstellar adventure...",
    cover: "https://placehold.co/400x600/png?text=Hail-Mary",
    price: "0.14",
    category: "Sci-Fi"
  },
  {
    id: "7",
    title: "Dune",
    author: "Frank Herbert",
    description: "Set in the distant future amidst a feudal interstellar society, Dune tells the story of young Paul Atreides...",
    cover: "https://placehold.co/400x600/png?text=Dune",
    price: "0.11",
    category: "Sci-Fi"
  },
  {
    id: "8",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    description: "A woman shoots her husband five times, then never speaks another word. A criminal psychotherapist is determined to unravel the mystery...",
    cover: "https://placehold.co/400x600/png?text=Silent",
    price: "0.13",
    category: "Mystery"
  },
  {
    id: "9",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    description: "Timeless lessons on wealth, greed, and happiness, exploring the complex psychology of money...",
    cover: "https://placehold.co/400x600/png?text=Psychology",
    price: "0.16",
    category: "Finance"
  },
  {
    id: "10",
    title: "Atomic Habits",
    author: "James Clear",
    description: "An easy and proven way to build good habits and break bad ones, using proven scientific principles...",
    cover: "https://placehold.co/400x600/png?text=Atomic",
    price: "0.12",
    category: "Self-Help"
  },
  {
    id: "11",
    title: "The Alchemist",
    author: "Paulo Coelho",
    description: "A mystical story about following your dreams and listening to your heart, filled with wisdom and magic...",
    cover: "https://placehold.co/400x600/png?text=Alchemist",
    price: "0.10",
    category: "Fiction"
  },
  {
    id: "12",
    title: "1984",
    author: "George Orwell",
    description: "A dystopian social science fiction that explores surveillance, truth, and totalitarianism...",
    cover: "https://placehold.co/400x600/png?text=1984",
    price: "0.11",
    category: "Sci-Fi"
  }
];

const CATEGORIES = ["All", "Sci-Fi", "Literature", "History", "Novel"];

// SVG 路径动画
const PathAnimation = () => (
  <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 100 100">
    <motion.path
      d="M 0,50 Q 25,25 50,50 T 100,50"
      stroke="rgba(59, 130, 246, 0.2)"
      strokeWidth="0.2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

export default function Books() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // 处理查看详情
  const handleViewDetails = (bookId: string) => {
    router.push(`/books/${bookId}`);
  };

  // 过滤书籍
  const filteredBooks = BOOKS_DATA.filter(book => {
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      {/* 添加柔和的网格背景 */}
      <div className="absolute inset-0 bg-grid-blue-100/25 [mask-image:linear-gradient(0deg,transparent,black)]" />

      {/* 添加光晕效果 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <PathAnimation />
      <Header />
      <div className="container mx-auto px-4 py-8 relative">
        {/* Header section */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mb-8 space-y-6"
        >


          {/* Search bar with updated style */}
          <motion.div variants={item} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 h-5 w-5" />
            <input
              type="text"
              placeholder="Search books or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/70 border border-blue-200 rounded-lg 
                                     focus:ring-2 focus:ring-blue-400 focus:border-transparent
                                     placeholder:text-blue-400/70 backdrop-blur-sm"
            />
          </motion.div>

          {/* Category tags with updated style */}
          <motion.div variants={item} className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                                    border backdrop-blur-sm
                                    ${selectedCategory === category
                    ? 'bg-blue-500/10 text-blue-700 border-blue-300'
                    : 'bg-white/50 text-blue-600 border-blue-200 hover:border-blue-300'
                  }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Books grid with updated style */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {filteredBooks.map((book) => (
            <motion.div
              key={book.id}
              variants={item}
              whileHover={{ y: -5 }}
              className="group bg-white/70 rounded-lg overflow-hidden border border-blue-200
                         backdrop-blur-sm hover:border-blue-300 transition-all duration-300
                         hover:shadow-lg hover:shadow-blue-100"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-white/90 flex items-center justify-center"
                >
                  <Button
                    onClick={() => handleViewDetails(book.id)}
                    className="bg-blue-50 text-blue-600 border border-blue-300 
                             hover:bg-blue-100 hover:border-blue-400"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </motion.div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-medium text-blue-700 group-hover:text-blue-800">
                  {book.title}
                </h3>
                <p className="text-sm text-blue-600">
                  Author: {book.author}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {book.description}
                </p>
                <div className="flex justify-end items-center pt-2">
                  <span className="text-xs text-blue-600 px-2 py-1 bg-blue-50 
                         rounded-lg border border-blue-200">
                    {book.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}