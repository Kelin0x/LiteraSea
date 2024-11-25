'use client'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import BackgroundGradient from './BackgroundGradient'
import { useEffect, useRef } from 'react'

const ParticleSphere = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置canvas尺寸
    const setCanvasSize = () => {
      const size = Math.min(500, window.innerWidth - 40) // 响应式尺寸
      canvas.width = size
      canvas.height = size
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // 粒子类
    class Particle {
      x: number
      y: number
      z: number
      radius: number
      color: string
      initialX: number
      initialY: number
      initialZ: number

      constructor() {
        // 随机球面坐标
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos((Math.random() * 2) - 1)
        const radius = 150
        
        // 保存初始位置
        this.initialX = radius * Math.sin(phi) * Math.cos(theta)
        this.initialY = radius * Math.sin(phi) * Math.sin(theta)
        this.initialZ = radius * Math.cos(phi)
        
        this.x = this.initialX
        this.y = this.initialY
        this.z = this.initialZ
        
        this.radius = Math.random() * 1.5 + 0.5 // 减小粒子大小范围
        this.color = `rgba(${Math.random() * 100 + 100}, ${Math.random() * 50 + 100}, 255, 0.6)` // 降低不透明度
      }

      update(time: number) {
        // 使用更平滑的旋转速度
        const rotationSpeed = 0.0003
        const angle = time * rotationSpeed

        // 绕Y轴旋转
        this.x = this.initialX * Math.cos(angle) - this.initialZ * Math.sin(angle)
        this.z = this.initialX * Math.sin(angle) + this.initialZ * Math.cos(angle)
        
        // 添加轻微的上下浮动
        this.y = this.initialY + Math.sin(time * 0.001) * 5
      }

      draw(ctx: CanvasRenderingContext2D, centerX: number, centerY: number) {
        // 改进的透视计算
        const perspective = 1000
        const scale = perspective / (perspective + this.z + 200) // 添加偏移以避免负值
        const x = this.x * scale + centerX
        const y = this.y * scale + centerY
        const r = Math.max(0.5, this.radius * scale)

        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // 创建粒子
    const particles: Particle[] = []
    for (let i = 0; i < 1000; i++) {
      particles.push(new Particle())
    }

    // 动画循环
    let animationId: number
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // 更新和绘制所有粒子
      particles.forEach(particle => {
        particle.update(time)
        particle.draw(ctx, centerX, centerY)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate(0)

    // 清理
    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl"
    />
  )
}

const CallToAction = () => {
  // 添加跳转到 marketplace 的函数
  const handleLearnMore = () => {
    window.location.href = '/marketplace';
  };

  return (
    <section className="relative overflow-hidden py-24">
      <BackgroundGradient />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* 左侧内容 */}
          <div className="space-y-10">
            <div className="inline-block">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
                              flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 
                               font-medium text-base">
                  Start Your Journey
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-medium leading-tight">
                Ready to Build Your
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Digital Library?
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                Join our community of book enthusiasts and start collecting unique digital editions. 
                Connect your wallet to begin your Web3 reading journey.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="solid"
                className="px-8 py-6 text-lg font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                           hover:from-indigo-400 hover:to-pink-400 transition-all duration-300 shadow-lg hover:shadow-xl
                           transform hover:scale-105"
                onClick={handleLearnMore}  // 添加点击事件
              >
                Learn More
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* 右侧粒子球 */}
          <div className="relative aspect-square">
            <ParticleSphere />
            
            {/* 装饰性光晕 */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-r 
                          from-blue-600 to-purple-600 rounded-full blur-3xl opacity-20" />
            <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-gradient-to-r 
                          from-purple-600 to-pink-600 rounded-full blur-3xl opacity-20" />
          </div>
        </div>
      </div>
    </section>
  )
}
export default CallToAction