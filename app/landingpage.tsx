'use client'

import { Metadata } from 'next'
import { Suspense } from 'react'
import Navbar from "./landingpage/Navbar"
import CallToAction from "./landingpage/CallToAction"
import WhyChooseUsSection from "./landingpage/WhyChooseUsSection"
import FeaturedBook from "./landingpage/FeaturedBook"
import HeroSection from "./landingpage/HeroSection"
import StackedCards from "./landingpage/StackedCards"
import FeedbackBot from "./components/FeedbackBot"

export default function LandingPage() {
  return (
    <article className="landing-page" itemScope itemType="https://schema.org/WebPage">
      <header>
        <h1 className="sr-only" itemProp="headline">
          Literasea - Web3 Digital Reading Platform | NFT Books Marketplace
        </h1>
        <Navbar />
      </header>

      <main>
        <section 
          id="hero" 
          aria-label="Hero Section"
          className="hero-section"
          itemScope 
          itemType="https://schema.org/WPHeader"
        >
          <HeroSection />
        </section>

        <section 
          id="features" 
          aria-label="Platform Features"
          className="features-section"
          itemScope 
          itemType="https://schema.org/ItemList"
        >
          <WhyChooseUsSection />
        </section>

        <section 
          id="books" 
          aria-label="Featured Books Collection"
          className="books-section"
          itemScope 
          itemType="https://schema.org/CollectionPage"
        >
          <StackedCards />
        </section>

        <section 
          id="featured" 
          aria-label="Featured Book Showcase"
          className="featured-section"
          itemScope 
          itemType="https://schema.org/Book"
        >
          <FeaturedBook />
        </section>

        <section 
          id="call" 
          aria-label="Join Our Platform"
          className="cta-section"
          itemScope 
          itemType="https://schema.org/Action"
        >
          <CallToAction />
        </section>
      </main>

      <aside 
        aria-label="Feedback Assistant"
        itemScope 
        itemType="https://schema.org/SupportingMaterial"
      >
        <Suspense fallback={<div>Loading feedback bot...</div>}>
          <FeedbackBot />
        </Suspense>
      </aside>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Literasea",
            "alternateName": "Web3 Digital Reading Platform",
            "url": "https://literasea-two.vercel.app",
            "description": "A Web3 digital reading platform supporting NFT book publishing and trading",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://literasea-two.vercel.app/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
          })
        }}
      />
    </article>
  )
}

