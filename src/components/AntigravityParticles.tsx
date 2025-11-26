import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  angle: number
  speed: number
  orbitRadius: number
  size: number
  parallax: number
  color: string
}

const BASE_COLORS = ['#c8dbff', '#a7c1ff', '#7fa3f7', '#4f8ff0']

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const AntigravityParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>()
  const pointerRef = useRef({ x: 0, y: 0, active: false })
  const centerRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const DPR = Math.min(2, window.devicePixelRatio || 1)

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = Math.floor(w * DPR)
      canvas.height = Math.floor(h * DPR)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      centerRef.current.x = w / 2
      centerRef.current.y = h / 2
    }
    resize()

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const maxParticles = prefersReducedMotion ? 120 : 320
    const minParticles = prefersReducedMotion ? 40 : 120
    const dynamicCount = clamp(Math.floor((window.innerWidth * window.innerHeight) / 5000), minParticles, maxParticles)

    const createParticle = (): Particle => {
      const range = Math.max(window.innerWidth, window.innerHeight) * 0.6
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: 0,
        vy: 0,
        angle: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.8,
        orbitRadius: 30 + Math.random() * range,
        size: prefersReducedMotion ? 0.7 + Math.random() * 0.5 : 0.9 + Math.random() * 0.7,
        parallax: 0.2 + Math.random() * 0.6,
        color: BASE_COLORS[Math.floor(Math.random() * BASE_COLORS.length)],
      }
    }

    particlesRef.current = Array.from({ length: dynamicCount }, createParticle)

    const handlePointerMove = (x: number, y: number) => {
      pointerRef.current.x = x
      pointerRef.current.y = y
      pointerRef.current.active = true
    }

    const handleMouseMove = (event: MouseEvent) => handlePointerMove(event.clientX, event.clientY)
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (touch) handlePointerMove(touch.clientX, touch.clientY)
    }

    const handlePointerLeave = () => {
      pointerRef.current.active = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('mouseleave', handlePointerLeave)
    window.addEventListener('touchend', handlePointerLeave)
    window.addEventListener('resize', resize)

    const animate = () => {
      const { innerWidth: width, innerHeight: height } = window
      ctx.clearRect(0, 0, width, height)

      const pointer = pointerRef.current
      const center = centerRef.current
      // 鼠标不再“弹回”屏幕中心，而是停留在最后一次交互附近
      const targetX = pointer.active ? pointer.x : center.x
      const targetY = pointer.active ? pointer.y : center.y

      center.x += (targetX - center.x) * 0.08
      center.y += (targetY - center.y) * 0.08

      const particles = particlesRef.current
      const maxRadius = Math.max(width, height) * 0.75

      for (const particle of particles) {
        particle.angle += particle.speed * 0.0015
        particle.orbitRadius += particle.speed * 0.12

        if (particle.orbitRadius > maxRadius) {
          particle.orbitRadius = 20 + Math.random() * 80
          particle.angle = Math.random() * Math.PI * 2
        }

        const swirl = 1 + Math.sin(particle.angle * 3) * 0.08
        const orbitX = center.x + Math.cos(particle.angle + particle.parallax * 0.5) * particle.orbitRadius * swirl
        const orbitY = center.y + Math.sin(particle.angle + particle.parallax * 0.5) * particle.orbitRadius * swirl

        particle.vx += (orbitX - particle.x) * 0.1
        particle.vy += (orbitY - particle.y) * 0.1

        if (pointer.active) {
          const dx = particle.x - pointer.x
          const dy = particle.y - pointer.y
          const distance = Math.sqrt(dx * dx + dy * dy) || 1
          const influenceRadius = 140
          if (distance < influenceRadius) {
            const repel = (1 - distance / influenceRadius) * 0.6
            particle.vx += (dx / distance) * repel * 0.6
            particle.vy += (dy / distance) * repel * 0.6
          }
        }

        particle.vx *= 0.9
        particle.vy *= 0.9
        particle.x += particle.vx
        particle.y += particle.vy
      }

      for (const particle of particles) {
        ctx.fillStyle = particle.color
        ctx.globalAlpha = 0.7
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * (pointer.active ? 2.2 : 1.8), 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('mouseleave', handlePointerLeave)
      window.removeEventListener('touchend', handlePointerLeave)
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
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
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  )
}

export default AntigravityParticles
