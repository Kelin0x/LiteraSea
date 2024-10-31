'use client'

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useSpring, animate } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ChevronRight, Wallet, Sparkles, BookMarked, Users, Check } from "lucide-react"
import { useRouter } from 'next/navigation'
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import { Toast } from "@/components/ui/toast"

export default function landingpage() {
  const [isConnected, setIsConnected] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "0%"])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const springConfig = { stiffness: 100, damping: 30, bounce: 0 }
  const scaleSpring = useSpring(scale, springConfig)
  const ySpring = useSpring(y, springConfig)
  const opacitySpring = useSpring(opacity, springConfig)

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const [wallet, setWallet] = useState({
    address: '',
    name: '',
    connected: false
  });

  const connectWallet = async () => {
    
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const CountAnimation = ({ value }: { value: string }) => {
    const [count, setCount] = useState(0)
    const numberValue = parseInt(value.replace(/[^0-9]/g, ''))
    
    useEffect(() => {
      const controls = animate(0, numberValue, {
        duration: 2,
        onUpdate: (value) => setCount(Math.floor(value))
      })
      return () => controls.stop()
    }, [numberValue])
    
    return <span>{count}K+</span>
  }

  const router = useRouter()

  const handleExplore = async () => {
    // 添加淡出动画
    document.body.style.opacity = '0'
    document.body.style.transition = 'opacity 0.3s ease'
    
    // 等待动画完成
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // 执行跳转
    router.push('/books')
    
    // 恢复透明度
    setTimeout(() => {
      document.body.style.opacity = '1'
    }, 100)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div ref={targetRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ 
            opacity: opacitySpring,
            scale: scaleSpring,
            y: ySpring
          }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4" variant="secondary">
              Welcome to the Future of Reading
            </Badge>
          </motion.div>
          <motion.h1
            variants={item}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
          >
            Own Your Digital Library
            <br />
            with NFT Books
          </motion.h1>
          <motion.p
            variants={item}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Experience the revolution in digital reading. Purchase, collect, and trade unique NFT books
            while supporting your favorite authors directly.
          </motion.p>
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={connectWallet}
              className="group wallet-button"
              disabled={wallet.connected}
            >
              <Wallet className="mr-2 h-4 w-4" />
              {wallet.connected ? (
                <span className="flex items-center">
                  {wallet.name}
                  <Check className="ml-2 h-4 w-4 text-green-500" />
                </span>
              ) : (
                <>
                  Connect Polkadot Wallet
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="group"
              onClick={handleExplore}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Explore Collection
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            style={{ y: parallaxY }}
            className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" 
          />
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 px-4 bg-accent/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Revolutionary Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience reading like never before with our unique Web3 features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookMarked className="h-6 w-6" />,
                title: "True Ownership",
                description: "Own your digital books forever with blockchain-verified NFT technology"
              },
              {
                icon: <Sparkles className="h-6 w-6" />,
                title: "Exclusive Content",
                description: "Access limited edition books and author-exclusive content"
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Community Reading",
                description: "Join reading clubs and discuss with other NFT book owners"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 }
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="p-6 bg-background rounded-xl border transition-shadow hover:shadow-lg">
                  <div className="h-12 w-12 rounded-lg bg-accent flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: "10K+", label: "NFT Books" },
              { value: "50K+", label: "Readers" },
              { value: "1K+", label: "Authors" },
              { value: "100K+", label: "Transactions" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 border rounded-xl bg-card"
              >
                <div className="text-4xl font-bold text-foreground mb-2">
                  <CountAnimation value={stat.value} />
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-24 px-4 bg-accent/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured NFT Books
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover unique digital books from renowned authors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Crypto Tales", author: "Alex River", price: "0.1 ETH" },
              { title: "Web3 Future", author: "Sarah Chen", price: "0.08 ETH" },
              { title: "Digital Dreams", author: "Mike Peters", price: "0.12 ETH" },
              { title: "Meta World", author: "Lisa Wong", price: "0.15 ETH" }
            ].map((book, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 400 }
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] mb-4 bg-card rounded-xl overflow-hidden">
                  <Image
                    src="/placeholder.svg"
                    alt={book.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Badge className="absolute bottom-4 left-4 bg-background">
                    {book.price}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your NFT Book Collection?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of readers in the future of digital literature
          </p>
          <Button
            size="lg"
            onClick={connectWallet}
            className="group"
          >
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet to Begin
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </section>
    </div>
  )
}