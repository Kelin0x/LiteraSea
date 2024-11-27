import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface Message {
  type: 'bot' | 'user'
  content: string
}

interface DialogOption {
  id: string
  text: string
  nextOptions?: DialogOption[]
  response: string
}

const dialogOptions: DialogOption[] = [
  {
    id: '1',
    text: 'What is Literasea?',
    response: "Welcome to Literasea! It's a revolutionary platform that combines AI, Web3, and SocialFi to enhance digital reading experiences. Let me guide you through!",
    nextOptions: [
      {
        id: '1-1',
        text: 'How do I start using it?',
        response: "To get started:\n• Connect your Web3 wallet\n• Explore the NFT marketplace\n• Create and customize your AI agent\n• Read books with your AI companion"
      }
    ]
  },
  {
    id: '2',
    text: 'Tell me about the features',
    response: "Literasea offers amazing features:\n• AI-Powered Companions 🤖\n• NFT Marketplace 🏪\n• Web3 Integration 🌐\n• SocialFi Book Reviews 💬",
    nextOptions: [
      {
        id: '2-1',
        text: 'How do these features work?',
        response: "Our AI companions enhance your reading with personalized insights. You can trade AI agents in the marketplace, and enjoy secure ownership of digital assets through Web3."
      }
    ]
  },
  {
    id: '3',
    text: 'Back to main menu',
    response: "Sure! What else would you like to know?",
  }
]

const FeedbackBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: 'Hi! 👋 I\'m your reading assistant. Would you like a quick tour of Literasea?' }
  ])
  const [currentOptions, setCurrentOptions] = useState(dialogOptions)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleOptionClick = (option: DialogOption) => {
    setMessages(prev => [...prev, 
      { type: 'user', content: option.text },
      { type: 'bot', content: option.response }
    ])
    setCurrentOptions(option.nextOptions || dialogOptions)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-24 right-0 w-96 bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
          >
            {/* Chat Messages */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index % 2) }}
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                        : 'bg-gray-100/80 backdrop-blur-sm text-gray-800'
                    }`}
                  >
                    {message.content.split('\n').map((line, i) => (
                      <p key={i} className="py-0.5">{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Options */}
            <div className="p-4 border-t border-gray-200 bg-gray-50/80 backdrop-blur-sm">
              <div className="space-y-2">
                {currentOptions.map((option) => (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={option.id}
                    onClick={() => handleOptionClick(option)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-white/80 
                      border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50/50
                      transition-all flex items-center justify-between group"
                  >
                    <span className="text-gray-700 group-hover:text-indigo-600">{option.text}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
      >
        <motion.div
          animate={{ 
            y: [0, -4, 0],
            rotate: isOpen ? 0 : [-5, 5, -5, 5, 0]
          }}
          transition={{ 
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            rotate: { duration: 2, repeat: Infinity }
          }}
          className="relative"
        >
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-1/2 right-[calc(100%+8px)] -translate-y-1/2 bg-white px-4 py-2 
                rounded-2xl shadow-md whitespace-nowrap text-sm flex items-center"
            >
              Need help?
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 
                border-8 border-transparent border-l-white"></div>
            </motion.div>
          )}
          <div className="w-20 h-20 bg-white rounded-full shadow-lg p-2 relative">
            <img
              src="https://api.dicebear.com/7.x/bottts/svg?seed=happy"
              alt="Assistant"
              className="w-full h-full"
            />
            {isOpen && (
              <div className="absolute -top-1 -right-1">
                <X className="w-5 h-5 text-gray-500" />
              </div>
            )}
          </div>
        </motion.div>
      </motion.button>
    </div>
  )
}

export default FeedbackBot