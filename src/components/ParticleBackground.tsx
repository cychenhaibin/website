import React, { useEffect, useRef } from 'react'

// 多语言打印模板（使用 Camila）
const PRINT_TEMPLATES: string[] = [
  "console.log('Camila')",
  'printf("Camila\\n")',
  'std::cout << "Camila" << std::endl;',
  'print("Camila")',
  'fmt.Println("Camila")',
  'System.out.println("Camila");',
  'puts "Camila"',
  "echo 'Camila'",
  'println("Camila") // Kotlin',
  'print("Camila") // Swift',
  'println!("Camila"); // Rust',
  'Console.WriteLine("Camila"); // C#',
  'echo Camila # Bash',
  'print("Camila") -- Lua',
  'print("Camila") # R',
  'disp("Camila") % MATLAB',
  'IO.puts("Camila") # Elixir',
  'println("Camila") // Scala',
  "printf('Camila') # PHP",
  'Document.Write("Camila"); // VB',
]

interface Line {
  text: string
  x: number
  y: number
  vx: number
  vy: number
  size: number
  hue: number
  alpha: number
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const linesRef = useRef<Line[]>([])
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)
  const frameRate = 30 // 限制帧率到30fps，提升性能

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const DPR = Math.min(2, window.devicePixelRatio || 1)
    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = Math.floor(w * DPR)
      canvas.height = Math.floor(h * DPR)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    resize()

    // 初始化文本粒子
    // 进一步减少粒子数量：按屏幕面积估算（面积/20000），上限200
    const spawnCount = Math.min(200, Math.floor((window.innerWidth * window.innerHeight) / 20000))
    const lines: Line[] = []
    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    for (let i = 0; i < spawnCount; i++) {
      const text = PRINT_TEMPLATES[Math.floor(Math.random() * PRINT_TEMPLATES.length)]
      const size = rand(11, 20)
      const vy = rand(-0.25, -0.1)
      const vx = rand(-0.15, 0.15)
      const hue = rand(0, 360) // 全色谱：红橙黄绿青蓝紫
      const alpha = rand(0.35, 0.65) // 降低透明度，让颜色更浅
      lines.push({
        text,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx,
        vy,
        size,
        hue,
        alpha,
      })
    }
    linesRef.current = lines

    // 鼠标交互
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      mouseRef.current.active = true
    }
    const onLeave = () => (mouseRef.current.active = false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', resize)

    // 绘制函数
    const draw = () => {
      // 帧率控制：限制到30fps
      if (performance.now() - lastTimeRef.current < 1000 / frameRate) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }
      lastTimeRef.current = performance.now()

      const { innerWidth: W, innerHeight: H } = window
      ctx.clearRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'lighter'

      const t = lastTimeRef.current * 0.001
      const mouse = mouseRef.current

      for (const l of linesRef.current) {
        // 视差与呼吸
        const breathe = 0.6 + 0.4 * Math.sin(t * 2 + l.hue)
        const glow = 2 * breathe // 进一步减少发光强度

        // 鼠标力场（排斥）
        if (mouse.active) {
          const dx = l.x - mouse.x
          const dy = l.y - mouse.y
          const d2 = dx * dx + dy * dy
          const radius = 100 // 减小鼠标影响半径
          if (d2 < radius * radius) {
            const d = Math.sqrt(d2) || 1
            const f = (1 - d / radius) * 1.2 // 减少力场强度
            l.vx += (dx / d) * f * 0.4
            l.vy += (dy / d) * f * 0.4
          }
        }

        // 漂移 + 回弹边界
        l.x += l.vx
        l.y += l.vy
        if (l.x < -300) l.x = W + 50
        if (l.x > W + 300) l.x = -50
        if (l.y < -60) l.y = H + 20
        if (l.y > H + 60) l.y = -20

        // 霓虹文字
        ctx.font = `${l.size}px monospace` // 简化字体设置
        // 根据色相调整饱和度和亮度，让不同颜色更鲜明
        let saturation, lightness
        if (l.hue < 60) { // 红橙黄
          saturation = 75
          lightness = 70
        } else if (l.hue < 120) { // 黄绿
          saturation = 80
          lightness = 65
        } else if (l.hue < 180) { // 绿青
          saturation = 85
          lightness = 60
        } else if (l.hue < 240) { // 青蓝
          saturation = 80
          lightness = 65
        } else if (l.hue < 300) { // 蓝紫
          saturation = 75
          lightness = 70
        } else { // 紫红
          saturation = 70
          lightness = 75
        }
        
        const color = `hsl(${l.hue}, ${saturation}%, ${lightness}%)`
        ctx.fillStyle = color
        // 性能优化：减少阴影效果
        ctx.shadowColor = color
        ctx.shadowBlur = Math.min(glow, 5) // 进一步减少阴影模糊
        ctx.globalAlpha = l.alpha
        ctx.fillText(l.text, l.x, l.y)
      }

      ctx.shadowBlur = 0
      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
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
        mixBlendMode: 'screen',
      }}
    />
  )
}

export default ParticleBackground
