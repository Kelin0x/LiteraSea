import { MetadataRoute } from 'next'

// 添加 generateStaticParams 函数
export async function generateStaticParams() {
  return []
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 基础路由配置
  const baseUrl = 'https://literasea-two.vercel.app'
  
  // 静态路由
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/marketplace`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mynft`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/create`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }
  ]

  // 获取动态内容路由（示例：从API获取所有书籍）
  try {
    const books = await fetch(`${baseUrl}/api/books`)
      .then(res => res.json())
      .catch(() => [])

    const dynamicRoutes = books.map((book: any) => ({
      url: `${baseUrl}/books/${book.id}`,
      lastModified: new Date(book.updatedAt || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    return [...staticRoutes, ...dynamicRoutes]
  } catch (error) {
    // 如果获取动态路由失败，至少返回静态路由
    console.error('Error generating dynamic routes:', error)
    return staticRoutes
  }
}