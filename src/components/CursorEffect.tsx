import React, { useEffect, useRef } from 'react'

interface Ripple {
  x: number
  y: number
  radius: number
  opacity: number
  maxRadius: number
  speed: number
}

const CursorEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ripplesRef = useRef<Ripple[]>([])
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 创建波纹
    const createRipple = (x: number, y: number) => {
      ripplesRef.current.push({
        x,
        y,
        radius: 0,
        opacity: 1,
        maxRadius: 100,
        speed: 2
      })
    }

    // 鼠标移动事件
    const onMouseMove = (e: MouseEvent) => {
      // 限制波纹创建频率
      if (ripplesRef.current.length < 3) {
        createRipple(e.clientX, e.clientY)
      }
    }

    // 触摸事件支持
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const touch = e.touches[0]
      if (ripplesRef.current.length < 3) {
        createRipple(touch.clientX, touch.clientY)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    // 动画循环
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 更新和绘制波纹
      ripplesRef.current = ripplesRef.current.filter(ripple => {
        // 更新波纹
        ripple.radius += ripple.speed
        ripple.opacity -= 0.02

        // 绘制波纹
        if (ripple.opacity > 0) {
          ctx.beginPath()
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
          
          // 创建渐变
          const gradient = ctx.createRadialGradient(
            ripple.x, ripple.y, 0,
            ripple.x, ripple.y, ripple.radius
          )
          gradient.addColorStop(0, `rgba(100, 255, 218, ${ripple.opacity})`)
          gradient.addColorStop(0.5, `rgba(138, 43, 226, ${ripple.opacity * 0.5})`)
          gradient.addColorStop(1, 'rgba(100, 255, 218, 0)')
          
          ctx.fillStyle = gradient
          ctx.fill()

          // 绘制边框
          ctx.strokeStyle = `rgba(100, 255, 218, ${ripple.opacity * 0.8})`
          ctx.lineWidth = 2
          ctx.stroke()

          return true
        }
        return false
      })
    }

    animate()

    // 清理函数
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('resize', resizeCanvas)
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1000,
        pointerEvents: 'none',
        mixBlendMode: 'screen'
      }}
    />
  )
}

export default CursorEffect
