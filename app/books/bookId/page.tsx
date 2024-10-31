'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function BookPage() {
  const params = useParams()
  const bookId = params.bookId
  const [book, setBook] = useState<any>(null)

  useEffect(() => {
    // 根据 bookId 获取对应的图书数据
    const fetchBook = async () => {
      const response = await fetch(`/api/books/${bookId}`)
      const data = await response.json()
      setBook(data)
    }
    
    fetchBook()
  }, [bookId])

  if (!book) return <div>加载中...</div>

  return (
    <div>
      <h1>{book.title}</h1>
      <p>作者: {book.author}</p>
      {/* 其他图书信息 */}
    </div>
  )
}