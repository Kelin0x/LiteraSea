'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoBookOutline, IoSettingsOutline, IoMenuOutline, IoSunnyOutline, IoMoonOutline, IoClose } from 'react-icons/io5'
import { FloatingBall } from '../../components/FloatingBall'
import { ethers } from 'ethers'
import { toast } from 'react-hot-toast'
import { getCommentContract } from '@/utils/contract'

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Chapter {
  id: number
  title: string
  content: string
}

interface Book {
  id: string
  title: string
  author: string
  chapters: Chapter[]
}

interface Comment {
  tokenId: string;     // NFT token ID
  bookId: string;      // 书籍ID
  chapterId: number;   // 章节ID
  selectedText: string; // 选中的文本
  commentText: string;  // 评论内容
  timestamp: number;    // 时间戳
  author: string;      // 评论者地址
}

export default function ReadingView({ book }: { book: Book }) {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [showCatalog, setShowCatalog] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [fontSize, setFontSize] = useState(18)
  const [selectedText, setSelectedText] = useState('')
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoadingComments, setIsLoadingComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedTextComments, setSelectedTextComments] = useState<Comment[]>([])
  const [showCommentsList, setShowCommentsList] = useState(false)

  // 切换深色模式
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  const handlePrevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(prev => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNextChapter = () => {
    if (currentChapter < book.chapters.length - 1) {
      setCurrentChapter(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // 处理文本选择
  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (!selection || selection.isCollapsed) return
    
    const text = selection.toString().trim()
    if (text.length > 0) {
      setSelectedText(text)
      setShowCommentModal(true)
    }
  }

  // 连接钱包
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        toast.error('请安装 MetaMask!')
        return null
      }
      
      const provider = new ethers.BrowserProvider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()
      return signer
    } catch (error) {
      console.error('连接钱包失败:', error)
      toast.error('连接钱包失败')
      return null
    }
  }

  // 加载评论
  const loadComments = async () => {
    try {
      setIsLoadingComments(true)
      if (!window.ethereum) return

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = getCommentContract(signer)

      // 获取当前 tokenId（用于知道要遍历多少个评论）
      const currentTokenId = await contract.getCurrentTokenId()
      const commentsData: Comment[] = []

      // 遍历所有评论
      for (let i = 1; i <= Number(currentTokenId); i++) {
        try {
          const comment = await contract.getComment(i)
          // 只获取当前书籍的评论
          if (comment.bookId === book.id) {
            commentsData.push({
              tokenId: i.toString(),
              bookId: comment.bookId,
              chapterId: Number(comment.chapterId),
              selectedText: comment.selectedText,
              commentText: comment.commentText,
              timestamp: Number(comment.timestamp),
              author: comment.author
            })
          }
        } catch (error) {
          console.error(`获取评论 ${i} 失败:`, error)
        }
      }

      setComments(commentsData)
    } catch (error) {
      console.error('加载评论失败:', error)
      toast.error('加载评论失败')
    } finally {
      setIsLoadingComments(false)
    }
  }

  // 在组件加载和章节切换时加载评论
  useEffect(() => {
    loadComments()
  }, [book.id, currentChapter])

  // 添加评论
  const handleAddComment = async () => {
    if (!commentText.trim()) return

    try {
      setIsSubmitting(true)
      
      const signer = await connectWallet()
      if (!signer) return

      const contract = getCommentContract(signer)

      toast.loading('发送评论中...')
      
      // 发送交易
      const tx = await contract.addComment(
        book.id,
        currentChapter,
        selectedText,
        commentText,
        Date.now()
      )

      // 等待交易确认
      await tx.wait()
      
      // 重新加载评论
      await loadComments()
      
      toast.success('评论已成功上链！')
      setShowCommentModal(false)
      setSelectedText('')
      setCommentText('')

    } catch (error) {
      console.error('评论失败:', error)
      toast.error('评论上链失败，请重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 修改渲染评论的函数
  const renderContentWithComments = (content: string) => {
    const chapterComments = comments.filter(c => c.chapterId === currentChapter)
    if (!chapterComments.length) return content

    let lastIndex = 0
    const result = []
    
    // 找出所有需要标注的文本范围
    const textRanges: { start: number; end: number; comments: Comment[] }[] = []
    
    chapterComments.forEach(comment => {
      const start = content.indexOf(comment.selectedText)
      if (start === -1) return
      
      const end = start + comment.selectedText.length
      
      // 检查是否与现有范围重叠
      let merged = false
      for (const range of textRanges) {
        // 如果有重叠，合并范围
        if (!(end < range.start || start > range.end)) {
          range.start = Math.min(range.start, start)
          range.end = Math.max(range.end, end)
          range.comments.push(comment)
          merged = true
          break
        }
      }
      
      // 如果没有重叠，添加新范围
      if (!merged) {
        textRanges.push({
          start,
          end,
          comments: [comment]
        })
      }
    })

    // 按开始位置排序
    textRanges.sort((a, b) => a.start - b.start)

    // 渲染文本
    for (const range of textRanges) {
      // 添加评论前的普通文本
      if (range.start > lastIndex) {
        result.push(content.slice(lastIndex, range.start))
      }

      // 添加带注释的文本
      result.push(
        <span
          key={`${range.start}-${range.end}`}
          className="border-b border-dashed border-amber-500 cursor-pointer group relative"
          onClick={() => {
            setSelectedTextComments(range.comments)
            setShowCommentsList(true)
          }}
        >
          {content.slice(range.start, range.end)}
          <div className="hidden group-hover:block absolute bottom-full left-0 w-64 p-3 rounded-lg shadow-lg bg-white dark:bg-gray-800 z-10 mb-2">
            <p className="text-xs text-gray-500 mb-1">
              {range.comments.length} 条评论
            </p>
            <p className="text-sm">点击查看所有评论</p>
          </div>
        </span>
      )

      lastIndex = range.end
    }

    // 添加剩余的文本
    if (lastIndex < content.length) {
      result.push(content.slice(lastIndex))
    }

    return result
  }

  // 定义 CommentsList 组件
  const CommentsList = ({ comments, onClose }: { comments: Comment[], onClose: () => void }) => (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <motion.div
        drag
        dragConstraints={{
          top: -300,
          left: -500,
          right: 500,
          bottom: 300,
        }}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          w-[480px] p-6 rounded-2xl shadow-lg z-50 cursor-move
          ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="cursor-default">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">评论列表</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mb-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
            <p className="text-sm">{comments[0]?.selectedText}</p>
          </div>

          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {comments.map((comment) => (
              <div
                key={comment.tokenId}
                className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white">
                      {comment.author.slice(2, 4)}
                    </div>
                    <span className="text-sm text-gray-500">
                      {comment.author.slice(0, 6)}...{comment.author.slice(-4)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm">{comment.commentText}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  )

  return (
    <div className={`min-h-screen transition-colors duration-500 
      ${isDarkMode 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100' 
        : 'bg-gradient-to-b from-[#f6f1e7] to-[#fff5e6] text-gray-800'}`}>
      
      {/* 顶部导航栏 */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 backdrop-blur-md z-10
          ${isDarkMode 
            ? 'bg-gray-900/80 border-b border-gray-700' 
            : 'bg-[#f6f1e7]/80 border-b border-amber-100'}`}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <IoBookOutline className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            <div>
              <h1 className="text-lg font-medium">{book.title}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{book.author}</p>
            </div>
          </div>
          <div className="flex gap-3">
            {[
              { icon: IoMenuOutline, action: () => setShowCatalog(!showCatalog), label: '目录' },
              { icon: IoSettingsOutline, action: () => setShowSettings(!showSettings), label: '设置' },
              { icon: isDarkMode ? IoSunnyOutline : IoMoonOutline, action: () => setIsDarkMode(!isDarkMode), label: '主题' }
            ].map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={item.action}
                className={`p-2 rounded-xl flex items-center gap-2
                  ${isDarkMode 
                    ? 'hover:bg-gray-700/50 active:bg-gray-600/50' 
                    : 'hover:bg-amber-100/50 active:bg-amber-200/50'}
                  transition-colors duration-200`}
                title={item.label}
              >
                <item.icon className="w-5 h-5" />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 主阅读区域 */}
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-32">
        <motion.div
          key={currentChapter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`prose max-w-none
            ${isDarkMode 
              ? 'prose-invert prose-p:text-gray-300 prose-headings:text-gray-100' 
              : 'prose-amber prose-p:text-gray-700 prose-headings:text-gray-900'}`}
        >
          <h2 className="text-2xl font-bold mb-12 text-center">
            {book.chapters[currentChapter].title}
          </h2>
          <div 
            onMouseUp={handleTextSelection}
            className="leading-loose whitespace-pre-wrap transition-all relative"
            style={{ fontSize: `${fontSize}px` }}
          >
            {renderContentWithComments(book.chapters[currentChapter].content)}
          </div>
        </motion.div>
      </div>

      {/* 底部导航 */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed bottom-0 left-0 right-0 backdrop-blur-md border-t 
          ${isDarkMode 
            ? 'bg-gray-900/80 border-gray-700' 
            : 'bg-[#f6f1e7]/80 border-amber-100'}`}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2.5 rounded-xl transition-colors duration-200
              ${isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                : 'bg-amber-50 hover:bg-amber-100 text-gray-700'}
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
              disabled:hover:bg-gray-800 dark:disabled:hover:bg-gray-800`}
            disabled={currentChapter === 0}
            onClick={handlePrevChapter}
          >
            上一章
          </motion.button>
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium">
              {currentChapter + 1} / {book.chapters.length}
            </span>
            <div className="h-1 w-20 bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
              <div 
                className="h-full bg-amber-500 dark:bg-amber-400 rounded-full transition-all duration-300"
                style={{ width: `${((currentChapter + 1) / book.chapters.length) * 100}%` }}
              />
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2.5 rounded-xl transition-colors duration-200
              ${isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                : 'bg-amber-50 hover:bg-amber-100 text-gray-700'}
              disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={currentChapter === book.chapters.length - 1}
            onClick={handleNextChapter}
          >
            下一章
          </motion.button>
        </div>
      </motion.div>

      {/* 目录侧边栏 */}
      <AnimatePresence>
        {showCatalog && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-20"
              onClick={() => setShowCatalog(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 20 }}
              className={`fixed top-0 right-0 w-80 h-full p-6 shadow-lg z-30
                ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">目录</h3>
                <button 
                  onClick={() => setShowCatalog(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <IoMenuOutline className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-8rem)]">
                {book.chapters.map((chapter, index) => (
                  <motion.button
                    key={chapter.id}
                    whileHover={{ x: 4 }}
                    onClick={() => {
                      setCurrentChapter(index)
                      setShowCatalog(false)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition-colors
                      ${currentChapter === index 
                        ? (isDarkMode 
                            ? 'bg-gray-700 text-amber-400' 
                            : 'bg-amber-50 text-amber-800') 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    <div className="font-medium">{chapter.title}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 设置面板 */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-20"
              onClick={() => setShowSettings(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                w-80 p-6 rounded-2xl shadow-lg z-30
                ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h3 className="text-xl font-bold mb-6">阅读设置</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm mb-3">字体大小</label>
                  <input
                    type="range"
                    min="14"
                    max="24"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full accent-amber-500 dark:accent-amber-400"
                  />
                  <div className="flex justify-between text-sm mt-2">
                    <span>小</span>
                    <span>大</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSettings(false)}
                  className={`w-full py-2.5 rounded-xl text-center
                    ${isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                      : 'bg-amber-50 hover:bg-amber-100 text-gray-700'}`}
                >
                  关闭
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 评论模态框 */}
      <AnimatePresence>
        {showCommentModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
              onClick={() => !isSubmitting && setShowCommentModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                w-96 p-6 rounded-2xl shadow-lg z-50
                ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h3 className="text-xl font-bold mb-4">添加链上评论</h3>
              <div className="mb-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                <p className="text-sm">{selectedText}</p>
              </div>
              <textarea
                autoFocus
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className={`w-full p-3 rounded-lg mb-4 resize-none
                  ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-50 text-gray-800'}`}
                rows={4}
                placeholder="写下你的评论..."
                disabled={isSubmitting}
              />
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  评论将作为 NFT 永久记录在链上
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCommentModal(false)}
                    className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    disabled={isSubmitting}
                  >
                    取消
                  </button>
                  <button
                    onClick={handleAddComment}
                    disabled={isSubmitting || !commentText.trim()}
                    className={`px-4 py-2 rounded-lg bg-amber-500 text-white
                      ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amber-600'}`}
                  >
                    {isSubmitting ? '确认中...' : '发布评论'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 添加悬浮球组件 */}
      <div className={`${showCatalog || showSettings || showCommentModal ? 'hidden' : 'block'}`}>
        <FloatingBall 
          bookTitle={book.title}
          isDarkMode={isDarkMode}
          currentChapter={book.chapters[currentChapter].title}
          onAskQuestion={(question) => {
            // 这里可以处理用户提问，例如调用 AI API
            console.log('用户提问:', question);
          }}
        />
      </div>

      {/* 添加评论列表模态框 */}
      <AnimatePresence>
        {showCommentsList && (
          <CommentsList
            comments={selectedTextComments}
            onClose={() => setShowCommentsList(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}