'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoBookOutline, IoSettingsOutline, IoMenuOutline, IoSunnyOutline, IoMoonOutline } from 'react-icons/io5'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { FloatingBall } from '../../components/FloatingBall'

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
  id: string
  chapterId: number
  text: string
  selectedText: string
  timestamp: number
}

interface CommentState {
  [bookId: string]: {
    [chapterId: number]: Comment[]
  }
}

export default function ReadingView({ book }: { book: Book }) {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [showCatalog, setShowCatalog] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [fontSize, setFontSize] = useState(18)
  const [selectedText, setSelectedText] = useState('')
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [comments, setComments] = useLocalStorage<CommentState>('book-comments', {})
  const [commentText, setCommentText] = useState('')

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

  // 添加评论
  const handleAddComment = () => {
    if (!commentText.trim()) return

    const newComment: Comment = {
      id: Date.now().toString(),
      chapterId: currentChapter,
      text: commentText,
      selectedText,
      timestamp: Date.now()
    }

    setComments(prev => ({
      ...prev,
      [book.id]: {
        ...prev[book.id],
        [currentChapter]: [
          ...(prev[book.id]?.[currentChapter] || []),
          newComment
        ]
      }
    }))

    setShowCommentModal(false)
    setSelectedText('')
    setCommentText('')
  }

  // 添加一个辅助函数来处理文本标注
  const renderContentWithComments = (content: string, comments: Comment[]) => {
    if (!comments?.length) return content;

    let lastIndex = 0;
    const result = [];
    
    // 按照文本位置排序评论
    const sortedComments = [...comments].sort((a, b) => 
      content.indexOf(a.selectedText) - content.indexOf(b.selectedText)
    );

    for (const comment of sortedComments) {
      const index = content.indexOf(comment.selectedText, lastIndex);
      if (index === -1) continue;

      // 添加评论前的普通文本
      result.push(content.slice(lastIndex, index));

      // 添加带注释的文本
      result.push(
        <span
          key={comment.id}
          className="border-b border-dashed border-amber-500 cursor-pointer group relative"
        >
          {comment.selectedText}
          <div className="hidden group-hover:block absolute bottom-full left-0 w-64 p-3 rounded-lg shadow-lg bg-white dark:bg-gray-800 z-10 mb-2">
            <p className="text-sm">{comment.text}</p>
            <div className="text-xs text-gray-500 mt-2">
              {new Date(comment.timestamp).toLocaleString()}
            </div>
          </div>
        </span>
      );

      lastIndex = index + comment.selectedText.length;
    }

    // 添加剩余的文本
    result.push(content.slice(lastIndex));

    return result;
  };

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
            style={{ 
              fontSize: `${fontSize}px`,
              letterSpacing: '0.02em',
              textAlign: 'justify'
            }}
          >
            {renderContentWithComments(
              book.chapters[currentChapter].content,
              comments[book.id]?.[currentChapter] || []
            )}
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
              onClick={() => setShowCommentModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                w-96 p-6 rounded-2xl shadow-lg z-50
                ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h3 className="text-xl font-bold mb-4">添加评论</h3>
              <div className="mb-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                <p className="text-sm">{selectedText}</p>
              </div>
              <textarea
                autoFocus
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className={`w-full p-3 rounded-lg mb-4 resize-none
                  ${isDarkMode 
                    ? 'bg-gray-700 text-gray-100' 
                    : 'bg-gray-50 text-gray-800'}`}
                rows={4}
                placeholder="写下你的评论..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.metaKey) {
                    handleAddComment()
                  }
                }}
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCommentModal(false)}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  取消
                </button>
                <button
                  onClick={handleAddComment}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600"
                >
                  添加评论
                </button>
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
    </div>
  )
}