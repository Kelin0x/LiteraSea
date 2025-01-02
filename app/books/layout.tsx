import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Digital Books Marketplace | Browse Our Collection',
  description: 'Explore our vast collection of digital books across multiple genres including Sci-Fi, Literature, History, and more.',
  keywords: ['digital books', 'ebooks', 'online books', 'sci-fi books', 'literature', 'history books', 'novel'],
}

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 