'use client'

import { useState } from "react"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Search, BookOpen } from "lucide-react"

// 静态书籍数据
const BOOKS_DATA = [
    {
        id: "1",
        title: "三体",
        author: "刘慈欣",
        description: "地球文明向宇宙发出的第一声啼鸣，以及引来的不明回应...",
        cover: "https://placehold.co/400x600/png?text=三体",
        price: "0.1",
        category: "科幻"
    },
    {
        id: "2",
        title: "活着",
        author: "余华",
        description: "生命里的温暖和苦难，都是活着的见证...",
        cover: "https://placehold.co/400x600/png?text=活着",
        price: "0.08",
        category: "文学"
    },
    {
        id: "3",
        title: "百年孤独",
        author: "加西亚·马尔克斯",
        description: "魔幻现实主义文学的代表作...",
        cover: "https://placehold.co/400x600/png?text=百年孤独",
        price: "0.12",
        category: "文学"
    },
    {
        id: "4",
        title: "人类简史",
        author: "尤瓦尔·赫拉利",
        description: "从智人到智神，人类如何跨越这道鸿沟？",
        cover: "https://placehold.co/400x600/png?text=人类简史",
        price: "0.15",
        category: "历史"
    },
    {
        id: "5",
        title: "解忧杂货店",
        author: "东野圭吾",
        description: "在午夜时分，有一家神奇的杂货店...",
        cover: "https://placehold.co/400x600/png?text=解忧杂货店",
        price: "0.09",
        category: "小说"
    }
];

const CATEGORIES = ["全部", "科幻", "文学", "历史", "小说"];

export default function Books() {
    const [selectedCategory, setSelectedCategory] = useState("全部");
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    // 处理查看详情
    const handleViewDetails = (bookId: string) => {
        router.push(`/books/${bookId}`);
    };

    // 过滤书籍
    const filteredBooks = BOOKS_DATA.filter(book => {
        const matchesCategory = selectedCategory === "全部" || book.category === selectedCategory;
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            book.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-8">
                {/* 头部搜索和分类 */}
                <div className="mb-8 space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">数字书城</h1>
                    
                    {/* 搜索框 */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="搜索书籍或作者..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* 分类标签 */}
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                                    ${selectedCategory === category
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 书籍列表 */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredBooks.map((book) => (
                        <div
                            key={book.id}
                            className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative aspect-[3/4]">
                                <Image
                                    src={book.cover}
                                    alt={book.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Button 
                                        onClick={() => handleViewDetails(book.id)}
                                        className="bg-white text-blue-600 hover:bg-blue-50"
                                    >
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        查看详情
                                    </Button>
                                </div>
                            </div>
                            <div className="p-4 space-y-2">
                                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {book.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    作者：{book.author}
                                </p>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {book.description}
                                </p>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-blue-600 font-medium">
                                        {book.price} ETH
                                    </span>
                                    <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
                                        {book.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}