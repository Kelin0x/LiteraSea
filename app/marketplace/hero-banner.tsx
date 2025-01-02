"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { BookOpen, Sparkles, Star, BookOpenCheck, Bookmark, Coffee, Heart, Quote } from 'lucide-react'
import { useState, useEffect } from 'react';

export function HeroBanner() {
    const [particleStyles, setParticleStyles] = useState<{ top: string, left: string }[]>([]);

    useEffect(() => {
        const styles = Array.from({ length: 8 }).map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
        }));
        setParticleStyles(styles);
    }, []);

    // 悬浮元素数据
    const floatingElements = [
        { icon: BookOpenCheck, color: "text-blue-500", size: "w-6 h-6", position: "top-20 left-10" },
        { icon: Bookmark, color: "text-pink-500", size: "w-8 h-8", position: "bottom-32 left-20" },
        { icon: Coffee, color: "text-amber-500", size: "w-5 h-5", position: "top-40 right-32" },
        { icon: Heart, color: "text-red-500", size: "w-6 h-6", position: "bottom-20 right-40" },
        { icon: Quote, color: "text-purple-500", size: "w-7 h-7", position: "top-10 right-10" },
    ]

    return (
        <div 
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-10 md:p-16"
          itemScope 
          itemType="https://schema.org/WPHeader"
        >
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-grid-white/25 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
            <div className="absolute -left-4 top-0 h-72 w-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob" />
            <div className="absolute -right-4 bottom-0 h-72 w-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute left-1/2 top-1/2 h-72 w-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000" />

            {/* 悬浮装饰元素 */}
            {floatingElements.map((element, index) => (
                <motion.div
                    key={index}
                    className={`absolute ${element.position} ${element.color} opacity-70`}
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        delay: index * 0.5,
                        ease: "easeInOut",
                    }}
                >
                    <element.icon className={element.size} />
                </motion.div>
            ))}

            {/* 右侧悬浮书籍元素 */}
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={`book-${i}`}
                    className={`absolute hidden md:block`}
                    style={{
                        top: `${25 + i * 20}%`,
                        right: `${15 + i * 8}%`,
                        zIndex: 10 - i
                    }}
                    animate={{
                        y: [0, -8, 0],
                        rotate: [0, i % 2 === 0 ? 5 : -5, 0],
                        scale: [1, 1.02, 1],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                    }}
                >
                    <div className="relative w-20 h-28 bg-gradient-to-br from-white to-indigo-100 rounded-lg shadow-lg transform -rotate-12">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg" />
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-lg opacity-60" />
                        <div className="h-2 w-10 bg-indigo-600/30 absolute bottom-3 left-3 rounded" />
                        <div className="h-2 w-8 bg-indigo-600/20 absolute bottom-6 left-3 rounded" />
                        <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-r from-black/5 to-transparent" />
                    </div>
                </motion.div>
            ))}

            {/* 漂浮的粒子效果 */}
            {particleStyles.map((style, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 bg-indigo-600/30 rounded-full"
                    style={style}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                    }}
                />
            ))}

            <div className="grid gap-8 md:grid-cols-2 relative">
                {/* 左侧内容区域 */}
                <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700"
                        >
                            <Sparkles className="h-4 w-4 mr-2" />
                            <span className="text-sm font-medium">Special Offer: 2+1 Free</span>
                        </motion.div>

                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-900 leading-tight"
                            itemProp="headline"
                        >
                            Discover Your Next
                            <div className="relative inline-block ml-3">
                                <span className="text-indigo-600">Adventure</span>
                                <svg className="absolute -bottom-2 w-full" viewBox="0 0 358 8" fill="none">
                                    <path className="text-indigo-400" d="M2 5.5C88.3333 3.16667 267.667 3.16667 354 5.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </div>
                        </motion.h1>

                        <motion.p
                            className="text-xl text-gray-600 max-w-lg"
                            itemProp="description"
                        >
                            Embark on a journey through countless worlds. Each book opens a door to new possibilities.
                        </motion.p>
                    </div>

                    <motion.div
                        className="flex items-center space-x-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-6 rounded-xl group relative overflow-hidden">
                            <span className="relative z-10">Explore Collection</span>
                            <div className="absolute inset-0 bg-indigo-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                            <BookOpen className="w-5 h-5 ml-2 relative z-10 inline-block" />
                        </Button>
                    </motion.div>
                </motion.div>

                {/* 右侧内容区域 */}
                <motion.div
                    className="relative hidden md:block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="absolute -right-20 -top-20 w-[600px] h-[600px]">
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 2, 0]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >

                        </motion.div>
                    </div>

                    <motion.div
                        className="absolute top-20 right-20 text-indigo-600"
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360]
                        }}
                        transition={{ duration: 20, repeat: Infinity }}
                    >
                        <Sparkles className="w-8 h-8" />
                    </motion.div>

                    <motion.div
                        className="absolute bottom-0 right-0 bg-white/30 backdrop-blur-md rounded-lg p-6 shadow-xl"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                    </motion.div>
                </motion.div>
            </div>

            {/* 添加结构化数据 */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPageElement",
                        "name": "NFT Books Marketplace Hero",
                        "description": "Discover and collect unique digital books",
                        "isPartOf": {
                            "@type": "WebPage",
                            "name": "NFT Books Marketplace"
                        }
                    })
                }}
            />
        </div>
    )
}

const styles = `
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
`;

