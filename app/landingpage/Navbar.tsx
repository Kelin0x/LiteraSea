'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'
import {Link} from 'react-scroll'

const Navbar = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center py-4">
          {/* Logo */}
          <div className="w-1/4">
            <motion.div 
              className="flex items-center space-x-2 relative group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:blur-2xl transition-all duration-300 rounded-full" />
              <BookOpen className="h-8 w-8 text-primary relative z-10" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 relative z-10">
                Web3 Books
              </span>
            </motion.div>
          </div>

          {/* Navigation Links - 中间部分占据 2/4 的宽度并居中 */}
          <div className="w-2/4 hidden md:flex justify-center">
            <div className="flex items-center space-x-12">
              {['Home', 'Feature', 'Book', 'Call'].map((item, index) => (
                <motion.div
                  key={item}
                  className="relative"
                  onHoverStart={() => setHoverIndex(index)}
                  onHoverEnd={() => setHoverIndex(null)}
                >
                  <Link
                    to={item}
                    smooth={true}
                    duration={500}
                    className="text-foreground/80 hover:text-primary transition-colors relative z-10 py-2 px-4 cursor-pointer"
                  >
                    {item.replace(/-/g, ' ')}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: hoverIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    {hoverIndex === index && (
                      <motion.div
                        className="absolute inset-0 bg-primary/10 -z-10 rounded-lg blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Connect Button - 右侧占据 1/4 的宽度 */}
          <div className="w-1/4 flex justify-end">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center gap-2 relative group overflow-hidden"
                onClick={() => console.log('Connecting wallet...')}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.8 }}
                />
                <Wallet className="h-4 w-4 relative z-10" />
                <span className="relative z-10">Connect</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar