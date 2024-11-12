'use client'

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useSpring, animate, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ChevronRight, Wallet, Sparkles, BookMarked, Users, Check, Star, TrendingUp } from "lucide-react"
import { useRouter } from 'next/navigation'
import Navbar from "./landingpage/Navbar"
import BackgroundGradient from "./landingpage/BackgroundGradient"
import floatingElements from "./landingpage/FloatingElements"
import CallToAction from "./landingpage/CallToAction"
import WhyChooseUsSection from "./landingpage/WhyChooseUsSection"
import FeaturedBook from "./landingpage/FeaturedBook"
import HeroSection from "./landingpage/HeroSection"
import StackedCards from "./landingpage/StackedCards"



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

    </div>
  )
}

