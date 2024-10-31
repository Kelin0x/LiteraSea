import Image from "next/image"
import { Bell, BookOpen, HelpCircle, Home, Library, Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Bookpage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 border-r p-4 space-y-6">
          <div className="flex items-center gap-2 mb-8">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">E-Book</span>
          </div>
          
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Home className="h-4 w-4" />
              Home
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Library className="h-4 w-4" />
              Discover
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <BookOpen className="h-4 w-4" />
              Bookmark
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <HelpCircle className="h-4 w-4" />
              Help
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8" />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                🌙
              </Button>
              <Image
                src="/placeholder.svg"
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="popular" className="mb-8">
            <TabsList>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="top">Top Selling</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {[
              {
                title: "I owe you one",
                author: "Sophie Kinsella",
                cover: "/placeholder.svg"
              },
              {
                title: "Fact fulness",
                author: "Hans Rosling",
                cover: "/placeholder.svg"
              },
              {
                title: "The Other Son",
                author: "Nick Alexander",
                cover: "/placeholder.svg"
              },
              {
                title: "Can you keep a secret",
                author: "Sophie Kinsella",
                cover: "/placeholder.svg"
              },
              {
                title: "Educated",
                author: "Tara Westover",
                cover: "/placeholder.svg"
              }
            ].map((book, i) => (
              <div key={i} className="space-y-2">
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={200}
                  height={300}
                  className="w-full rounded-lg object-cover aspect-[2/3]"
                />
                <h3 className="font-medium">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
              </div>
            ))}
          </div>

          {/* Reading Progress */}
          <div className="space-y-4">
            {[
              { title: "Hold back the star", progress: 64, pages: 121 },
              { title: "One day a novel", progress: 45, pages: 11 },
              { title: "In the company of", progress: 52, pages: 21 }
            ].map((book, i) => (
              <div key={i} className="flex items-center gap-4">
                <Image
                  src="/placeholder.svg"
                  alt={book.title}
                  width={40}
                  height={60}
                  className="rounded"
                />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{book.title}</span>
                    <span className="text-sm text-muted-foreground">{book.pages} pages</span>
                  </div>
                  <Progress value={book.progress} className="h-2" />
                </div>
                <span className="text-sm text-muted-foreground">{book.progress}% complete</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l p-6">
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Trending Author</h2>
            {[
              { name: "James Elijah", following: false },
              { name: "William Henry", following: false },
              { name: "Aria Abigail", following: false },
              { name: "Mia Evelyn", following: false },
              { name: "Mateo Levi", following: true }
            ].map((author, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Image
                    src="/placeholder.svg"
                    alt={author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="font-medium">{author.name}</span>
                </div>
                <Button variant={author.following ? "default" : "outline"} size="sm">
                  {author.following ? "Unfollow" : "Follow"}
                </Button>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Popular Blogs</h2>
            <div className="space-y-4">
              {[
                {
                  title: "The Week All you need to know about",
                  author: "Published by Sheila",
                  stats: { views: 122, comments: 44 }
                },
                {
                  title: "Mobile with new app for designers",
                  author: "Published by Malik",
                  stats: { views: 88, comments: 22 }
                },
                {
                  title: "Five ways to find more time in business",
                  author: "Published by Sonic",
                  stats: { views: 12, comments: 4 }
                }
              ].map((blog, i) => (
                <div key={i} className="space-y-1">
                  <h3 className="font-medium line-clamp-2">{blog.title}</h3>
                  <p className="text-sm text-muted-foreground">{blog.author}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>👁 {blog.stats.views}</span>
                    <span>💬 {blog.stats.comments}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}