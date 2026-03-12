import React, { useEffect, useRef } from 'react';

// "antigravity.google" style particle effect:
// Particles form a shape (like `{ }`) and scatter/repel on mouse interaction.
// Only active on the Home route ('/')

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  color: string;
  size: number;
  isFree: boolean; // some particles just wander around
  angle: number;
  speed: number;
}

const AntigravityParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const isHomeRef = useRef(true);

  useEffect(() => {
    const checkScroll = () => {
      // If we are scrolled down less than half the screen height, we are on the Home section.
      isHomeRef.current = window.scrollY < window.innerHeight * 0.5;
    };
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    const colors = [
      '#4285F4', // Google Blue (majority)
      '#4285F4',
      '#4285F4',
      '#DB4437', // Red
      '#F4B400', // Yellow
      '#0F9D58', // Green
      '#333333', // Dark
    ];

    const initParticles = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      ctx.scale(DPR, DPR);

      particlesRef.current = [];

      // We use an offscreen canvas to map out the `{ }` shape
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      offscreen.width = width;
      offscreen.height = height;

      // Draw the shape to extract pixel data
      // Adjusted spaces between brackets for a tighter fit around the center text
      const text = '{   }'; 
      const fontSize = Math.min(width * 0.4, 450); // Responsive size
      offCtx.font = `bold ${fontSize}px "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillStyle = 'black';
      offCtx.fillText(text, width / 2, height / 2);

      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;

      // Density control based on screen size
      const step = width < 768 ? Math.floor(6) : Math.floor(8);

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];

          // If pixel is sufficiently opaque
          if (alpha > 128) {
            // Add some randomness so it's not a perfect grid
            const offsetX = (Math.random() - 0.5) * step;
            const offsetY = (Math.random() - 0.5) * step;
            
            const pX = x + offsetX;
            const pY = y + offsetY;

            particlesRef.current.push({
              x: Math.random() * width, // Start randomly
              y: Math.random() * height,
              vx: 0,
              vy: 0,
              baseX: pX,
              baseY: pY,
              color: colors[Math.floor(Math.random() * colors.length)],
              size: Math.random() * 1.5 + 0.5,
              isFree: false,
              angle: Math.random() * Math.PI * 2,
              speed: 0.1 + Math.random() * 0.5,
            });
          }
        }
      }

      // Add wandering "free" particles (ambient dust)
      const freeCount = width < 768 ? 100 : 250;
      for (let i = 0; i < freeCount; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: 0,
          baseX: Math.random() * width,
          baseY: Math.random() * height,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 1.5 + 0.5,
          isFree: true,
          angle: Math.random() * Math.PI * 2,
          speed: 0.2 + Math.random() * 0.8,
        });
      }
    };

    initParticles();

    // Mouse interaction
    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };
    
    // Touch interaction
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };
    const handleTouchEnd = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('resize', initParticles);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Animation physics parameters
    const MOUSE_RADIUS = 150;
    const MOUSE_FORCE = 0.8;
    const RETURN_SPEED = 0.08;
    const FRICTION = 0.85;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;
      const isHome = isHomeRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.isFree || !isHome) {
          // Free drifting logic: wander around slowly
          p.vx += Math.cos(p.angle) * p.speed * 0.05;
          p.vy += Math.sin(p.angle) * p.speed * 0.05;

          // Slowly change angle
          p.angle += (Math.random() - 0.5) * 0.1;

          if (p.x < 0) p.x += width;
          if (p.x > width) p.x -= width;
          if (p.y < 0) p.y += height;
          if (p.y > height) p.y -= height;
        } else {
          // Target attraction logic for the shape (only on Home)
          const dxTarget = p.baseX - p.x;
          const dyTarget = p.baseY - p.y;
          p.vx += dxTarget * RETURN_SPEED;
          p.vy += dyTarget * RETURN_SPEED;
        }

        // Mouse repulsion logic applies to ALL particles
        const dxMouse = p.x - mouseX;
        const dyMouse = p.y - mouseY;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < MOUSE_RADIUS) {
          // The closer to mouse, the stronger the push
          const force = (MOUSE_RADIUS - distMouse) / MOUSE_RADIUS;
          const pushX = (dxMouse / distMouse) * force * MOUSE_FORCE * 15;
          const pushY = (dyMouse / distMouse) * force * MOUSE_FORCE * 15;
          
          p.vx += pushX;
          p.vy += pushY;
        }

        // Add a slight baseline wander even when returning to shape to make it feel alive
        if (!p.isFree && isHome) {
            p.vx += (Math.random() - 0.5) * 0.5;
            p.vy += (Math.random() - 0.5) * 0.5;
        }

        // Apply physics
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;

        // Render particle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', initParticles);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
        background: '#ffffff', // White background
      }}
    />
  );
};

export default AntigravityParticles;
