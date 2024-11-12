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
  
  return <ReadingView book={book} />
}