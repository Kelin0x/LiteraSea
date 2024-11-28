// 服务器组件
import ReadingView from './ReadingView'
import { books } from '@lib/mockdata'

export async function generateStaticParams() {
  return books.map((book) => ({
    id: book.id
  }))
}

export default function ReadPage({ params }: { params: { id: string } }) {
  const book = books.find(b => b.id === params.id)
  if (!book) return <div>找不到书籍...</div>
  
  // 将 chapters 中的 id 转换为 number 类型
  const updatedBook = {
    ...book,
    chapters: book.chapters.map(chapter => ({
      ...chapter,
      id: Number(chapter.id)
    }))
  }
  
  return <ReadingView book={updatedBook} />
}