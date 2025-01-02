'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-scroll'
import Image from 'next/image'

const Navbar = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [account, setAccount] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [chainId, setChainId] = useState<string>("")
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // 监听滚动
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("请安装 MetaMask!");
      return;
    }
    
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const isCorrectNetwork = chainId === '0x7A69';
      
      setAccount(accounts[0]);
      setChainId(chainId);
      setIsConnected(true);
      setIsCorrectNetwork(isCorrectNetwork);

      if (!isCorrectNetwork) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x7A69' }],
          });
        } catch (error) {
          console.error('切换网络失败:', error);
        }
      }
    } catch (error) {
      console.error("连接钱包失败:", error);
    }
  };

  useEffect(() => {
    const autoConnectWallet = async () => {
      if (typeof window.ethereum === "undefined") return;
      
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setAccount(accounts[0]);
          setChainId(chainId);
          setIsConnected(true);
          setIsCorrectNetwork(chainId === '0x7A69');
        }
      } catch (error) {
        console.error("自动连接失败:", error);
      }
    };

    autoConnectWallet();
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (newAccounts: string[]) => {
        if (newAccounts.length === 0) {
          setAccount("");
          setIsConnected(false);
        } else {
          setAccount(newAccounts[0]);
          setIsConnected(true);
        }
      });

      window.ethereum.on('chainChanged', (newChainId: string) => {
        setChainId(newChainId);
        setIsCorrectNetwork(newChainId === '0x7A69');
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []);

  // 导航链接数据
  const navLinks = [
    { id: 'hero', label: 'Home', ariaLabel: 'Navigate to Home section' },
    { id: 'features', label: 'Features', ariaLabel: 'Explore our Features' },
    { id: 'books', label: 'Books', ariaLabel: 'Browse our Books' },
    { id: 'call', label: 'Contact', ariaLabel: 'Contact us' }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent'
      }`}
      itemScope
      itemType="https://schema.org/SiteNavigationElement"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <motion.div 
              className="flex items-center space-x-2 relative group"
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to="home"
                smooth={true}
                duration={500}
                className="flex items-center"
                aria-label="Go to homepage"
                role="link"
                tabIndex={0}
              >
                <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:blur-2xl transition-all duration-300 rounded-full" />
                <BookOpen className="h-8 w-8 text-primary relative z-10" aria-hidden="true" />
                <span 
                  className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 relative z-10"
                  itemProp="name"
                >
                  Web3 Books
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative"
                onHoverStart={() => setHoverIndex(index)}
                onHoverEnd={() => setHoverIndex(null)}
              >
                <Link
                  to={item.id}
                  smooth={true}
                  duration={500}
                  className="text-foreground/80 hover:text-primary transition-colors relative z-10 py-2 px-4 cursor-pointer"
                  aria-label={item.ariaLabel}
                  role="link"
                  tabIndex={0}
                  itemProp="url"
                >
                  {item.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoverIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Connect Wallet Button */}
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-2 relative group overflow-hidden
                          border-primary/20 hover:border-primary/40 hover:bg-transparent"
                onClick={connectWallet}
                aria-label={isConnected ? "Connected Wallet" : "Connect Wallet"}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.8 }}
                />
                <Wallet className="h-4 w-4 relative z-10 text-primary/80" aria-hidden="true" />
                <span className="relative z-10 text-primary/80">
                  {isConnected ? (
                    <>
                      <div 
                        className="w-2 h-2 rounded-full bg-green-400 inline-block mr-2 animate-pulse"
                        role="status"
                        aria-label="Connected"
                      />
                      {`${account.slice(0, 6)}...${account.slice(-4)}`}
                    </>
                  ) : (
                    'Connect'
                  )}
                </span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 添加结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Web3 Books",
            "url": "https://literasea-two.vercel.app",
            "logo": "https://literasea-two.vercel.app/logo.png",
            "sameAs": [
              "https://twitter.com/web3books",
              "https://discord.gg/web3books"
            ]
          })
        }}
      />
    </motion.nav>
  )
}

export default Navbar