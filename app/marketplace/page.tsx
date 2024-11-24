import { Header } from "./header"
import { Navigation } from "./navigation"
import { HeroBanner } from "./hero-banner"
import { PopularBooks } from "./popular-books"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-white">
      <Header />
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <HeroBanner />
        <PopularBooks />
      </div>
    </main>
  )
}

