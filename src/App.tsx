import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Team from './pages/Team'
import GitHub from './pages/GitHub'
import CursorEffect from './components/CursorEffect'
import ParticleBackground from './components/ParticleBackground'

// 注册GSAP插件
gsap.registerPlugin(ScrollTrigger)

const App: React.FC = () => {
  useEffect(() => {
    // 初始化GSAP ScrollTrigger
    ScrollTrigger.refresh()
    
    // 页面加载动画
    gsap.fromTo('body', 
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 1,
        ease: 'power2.out'
      }
    )
  }, [])

  return (
    <Router>
      <div className="App">
        <CursorEffect />
        <ParticleBackground />
        <Header />
        <main>
          <Home />
          <Team />
          <Projects />
          <GitHub />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
