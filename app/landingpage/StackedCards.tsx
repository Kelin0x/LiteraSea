import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Fingerprint, BookOpenCheck, Coins, Shield, Users } from 'lucide-react'

interface CardData {
    title: string
    description: string
    gradient: string
    icon: React.ReactNode
    animation?: {
        hover: any
        tap: any
    }
}

const StackedCards: React.FC = () => {
    const stackAreaRef = useRef<HTMLDivElement>(null)
    const leftRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(-1)

    const cards: CardData[] = [
        {
            title: "Blockchain Technology",
            description: "Secure and transparent transactions powered by smart contracts",
            gradient: "from-blue-500 to-cyan-500",
            icon: <Code2 className="w-8 h-8 text-white" />
        },
        {
            title: "Unique Authentication",
            description: "Each book is a unique NFT with verified authenticity",
            gradient: "from-purple-500 to-pink-500",
            icon: <Fingerprint className="w-8 h-8 text-white" />
        },
        {
            title: "Digital Ownership",
            description: "True ownership of your digital book collection",
            gradient: "from-green-500 to-emerald-500",
            icon: <BookOpenCheck className="w-8 h-8 text-white" />
        },
        {
            title: "Trading Platform",
            description: "Buy, sell, and trade your NFT books seamlessly",
            gradient: "from-yellow-500 to-orange-500",
            icon: <Coins className="w-8 h-8 text-white" />
        },
        {
            title: "Secure Storage",
            description: "Your digital assets are protected and encrypted",
            gradient: "from-red-500 to-rose-500",
            icon: <Shield className="w-8 h-8 text-white" />
        },
        {
            title: "Community Features",
            description: "Connect with readers and authors worldwide",
            gradient: "from-red-500 to-violet-500",
            icon: <Users className="w-8 h-8 text-white" />
        }
    ]

    const handleScroll = () => {
        if (!stackAreaRef.current) return
        const proportion = stackAreaRef.current.getBoundingClientRect().top / window.innerHeight
        if (proportion <= 0) {
            const n = cards.length
            const index = Math.abs(Math.ceil((proportion * n) / 2)) - 1
            setActiveIndex(index)
        }
    }

    const handleResize = () => {
        if (!leftRef.current || !stackAreaRef.current) return
        const windowWidth = window.innerWidth
        const left = leftRef.current
        left.remove()
        if (windowWidth < 1000) {
            stackAreaRef.current.insertAdjacentElement("beforebegin", left)
        } else {
            stackAreaRef.current.insertAdjacentElement("afterbegin", left)
        }
    }

    const handleExplore = () => {
        window.location.href = '/marketplace';
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className="w-full min-h-screen flex items-center justify-center font-poppins bg-gradient-to-b from-[#EEF2FF] to-[#E8F1FF]">
            <div ref={stackAreaRef} className="container mx-auto h-[300vh] relative flex flex-col lg:flex-row items-start justify-center">
                <div ref={leftRef} className="h-screen flex items-center justify-center sticky top-0 w-full lg:w-1/2 px-4">
                    <motion.div
                        className="w-full max-w-[960px]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >

                        <div className="mb-6">
                            <motion.h2
                                className="text-[80px] font-bold leading-[130px]"
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <motion.span
                                    className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-[length:200%_auto]"
                                    animate={{
                                        backgroundPosition: ['0%', '100%', '0%']
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                >
                                    Web3 Books
                                </motion.span>
                                <br />
                                <motion.span
                                    className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 bg-[length:200%_auto]"
                                    animate={{
                                        backgroundPosition: ['0%', '100%', '0%']
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                >
                                    Features
                                    <motion.div
                                        className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500"
                                        animate={{
                                            scaleX: [0.7, 1, 0.7]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </motion.span>
                            </motion.h2>
                        </div>

                        <motion.div
                            className="text-2xl mt-12 leading-relaxed tracking-wide"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.p
                                animate={{
                                    y: [0, -2, 0]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                Experience <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500">revolutionary</span> digital reading
                                <br />
                                powered by <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-purple-500">blockchain technology</span>.
                                <br />
                                Own your books as <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">NFTs</span>, join
                                <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">exclusive communities</span>, and connect
                                <br />
                                directly with your favorite <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-red-500">authors</span>.
                            </motion.p>
                        </motion.div>

                        <motion.button
                            className="font-bold text-lg px-10 py-5 rounded-xl mt-10 cursor-pointer relative overflow-hidden group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleExplore}
                        >
                            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                                Explore Features
                            </span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100"
                                animate={{
                                    x: ['-100%', '100%'],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                style={{
                                    backgroundSize: '200% 100%'
                                }}
                            />
                        </motion.button>
                    </motion.div>
                </div>

                <div className="h-screen flex items-center justify-end sticky top-0 w-full lg:w-1/2 px-4">
                    <div className="relative w-full max-w-[600px] flex justify-center">
                        {cards.map((card, index) => (
                            <motion.div
                                key={index}
                                className={`w-[350px] h-[350px] p-[35px] rounded-[6mm] flex justify-between flex-col absolute top-1/2 left-1/2 transition-transform duration-500 ease-in-out ${
                                    index <= activeIndex ? 'active' : ''
                                } text-white backdrop-blur-sm bg-gradient-to-r ${card.gradient}`}
                                style={{
                                    zIndex: cards.length - index,
                                    transform: index <= activeIndex
                                        ? 'translate(-50%, -120vh) rotate(-48deg)'
                                        : index === activeIndex + 1
                                            ? 'translate(-50%, -50%) rotate(0deg)'
                                            : `translate(-50%, -50%) rotate(${-10 * (index - activeIndex - 1)}deg)`,
                                    transformOrigin: 'center center'
                                }}
                            >
                                <div className="text-xl font-bold flex items-center gap-3">
                                    {card.icon}
                                    {card.title}
                                </div>
                                <div className="text-[32px] font-bold leading-[42px]">
                                    {card.description}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StackedCards