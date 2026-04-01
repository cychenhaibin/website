import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Team from './pages/Team'
import Cases from './pages/Cases'
import GitHub from './pages/GitHub'
import Contact from './pages/Contact'
import AntigravityParticles from './components/AntigravityParticles'
import FloatingSocials from './components/FloatingSocials'
import MobileSocials from './components/MobileSocials'

// 注册GSAP插件
gsap.registerPlugin(ScrollTrigger)

const App: React.FC = () => {
  useEffect(() => {
    // 移除加载屏幕
    const loadingScreen = document.querySelector('.loading-screen')
    if (loadingScreen) {
      loadingScreen.remove()
    }
    
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
        <FloatingSocials />
        <MobileSocials />
        <AntigravityParticles />
        <Header />
        <main>
          <Home />
          <Services />
          <Team />
          <Cases />
          <Projects />
          <GitHub />
          <Contact />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
