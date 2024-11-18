'use client'
import Navbar from "./landingpage/Navbar"
import CallToAction from "./landingpage/CallToAction"
import WhyChooseUsSection from "./landingpage/WhyChooseUsSection"
import FeaturedBook from "./landingpage/FeaturedBook"
import HeroSection from "./landingpage/HeroSection"
import StackedCards from "./landingpage/StackedCards"
import FeedbackBot from "./components/FeedbackBot"



export default function landingpage() {


  return (
    <div>
      <Navbar />

      <section id="Home">
        <HeroSection />
      </section>

      <section id="Feature">
        <WhyChooseUsSection />
      </section>
      
      <section id="StackedCards">
        <StackedCards />
      </section>
      
      <section id="Book">
        <FeaturedBook />
      </section>

      <section id="Call">
        <CallToAction />
      </section>
      
      <FeedbackBot/>  
    </div>
  )
}

