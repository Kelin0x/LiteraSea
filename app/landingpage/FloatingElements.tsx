import { BookOpen, Sparkles, Star, BookMarked } from 'lucide-react'

const FloatingElements = [
    {
      icon: <BookOpen className="w-16 h-16" />,
      position: "top-1/4 right-1/4",
      animation: {
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.1, 1]
      }
    },
    {
      icon: <BookOpen className="w-16 h-16" />,
      position: "top-1/4 left-1/4",
      animation: {
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.1, 1]
      }
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      position: "bottom-1/4 left-1/4",
      animation: {
        y: [0, 20, 0],
        rotate: [0, -5, 5, 0],
        scale: [1, 0.9, 1]
      }
    },
    {
      icon: <Star className="w-10 h-10" />,
      position: "top-1/3 left-1/5",
      animation: {
        x: [0, 15, 0],
        y: [0, -15, 0],
        rotate: [0, 15, 0]
      }
    },
    {
      icon: <BookMarked className="w-14 h-14" />,
      position: "bottom-1/3 right-1/5",
      animation: {
        x: [0, -15, 0],
        y: [0, 15, 0],
        rotate: [0, -15, 0]
      }
    }
  ];

export default FloatingElements