import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useTranslation } from 'react-i18next'
import SectionHeader from '../components/SectionHeader'
import { fontSize } from '../styles/typography'

const Cases: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mobileCarouselRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  const cases = [
    {
      title: t('cases.items.brand.title'),
      summary: t('cases.items.brand.summary'),
      outcome: t('cases.items.brand.outcome'),
      stack: t('cases.items.brand.stack')
    },
    {
      title: t('cases.items.ai.title'),
      summary: t('cases.items.ai.summary'),
      outcome: t('cases.items.ai.outcome'),
      stack: t('cases.items.ai.stack')
    },
    {
      title: t('cases.items.distribution.title'),
      summary: t('cases.items.distribution.summary'),
      outcome: t('cases.items.distribution.outcome'),
      stack: t('cases.items.distribution.stack')
    },
    {
      title: t('cases.items.platform.title'),
      summary: t('cases.items.platform.summary'),
      outcome: t('cases.items.platform.outcome'),
      stack: t('cases.items.platform.stack')
    }
  ]

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.case-card'),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out' }
    )
  }, [])

  useEffect(() => {
    const carousel = mobileCarouselRef.current
    if (!carousel) return

    let paused = false
    let intervalId = 0
    let activeIndex = 0

    const scrollToNextCard = () => {
      const cards = Array.from(
        carousel.querySelectorAll<HTMLElement>('.case-card')
      )
      if (cards.length === 0) return

      activeIndex = (activeIndex + 1) % cards.length
      const nextCard = cards[activeIndex]
      const nextLeft =
        nextCard.offsetLeft -
        (carousel.clientWidth - nextCard.offsetWidth) / 2

      carousel.scrollTo({
        left: nextLeft,
        behavior: 'smooth',
      })
    }

    const stop = () => {
      paused = true
    }

    const resume = () => {
      paused = false
    }

    const syncActiveIndex = () => {
      const cards = Array.from(
        carousel.querySelectorAll<HTMLElement>('.case-card')
      )
      if (cards.length === 0) return

      const viewportCenter = carousel.scrollLeft + carousel.clientWidth / 2
      let closestIndex = 0
      let closestDistance = Number.POSITIVE_INFINITY

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        const distance = Math.abs(cardCenter - viewportCenter)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      activeIndex = closestIndex
    }

    intervalId = window.setInterval(() => {
      if (!paused) {
        scrollToNextCard()
      }
    }, 2600)

    carousel.addEventListener('touchstart', stop, { passive: true })
    carousel.addEventListener('mouseenter', stop)
    carousel.addEventListener('touchend', resume)
    carousel.addEventListener('mouseleave', resume)
    carousel.addEventListener('scrollend', syncActiveIndex)
    carousel.addEventListener('touchcancel', resume)

    return () => {
      window.clearInterval(intervalId)
      carousel.removeEventListener('touchstart', stop)
      carousel.removeEventListener('mouseenter', stop)
      carousel.removeEventListener('touchend', resume)
      carousel.removeEventListener('mouseleave', resume)
      carousel.removeEventListener('scrollend', syncActiveIndex)
      carousel.removeEventListener('touchcancel', resume)
    }
  }, [])

  return (
    <section id="cases" className="py-20 px-4 bg-[linear-gradient(180deg,rgba(66,133,244,0.04),rgba(255,255,255,0))]">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        <SectionHeader
          eyebrow={t('cases.eyebrow')}
          titleWord={t('cases.titleWord')}
          title={t('cases.title')}
          subtitle={t('cases.subtitle')}
          className="mb-12"
        />

        <div className="md:hidden -mx-4 mb-2">
          <div
            ref={mobileCarouselRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-[7.5vw] pb-4 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {cases.map((item, index) => (
              <article
                key={item.title}
                className="case-card snap-center shrink-0 w-[85vw] rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="text-sm text-[#4285F4] mb-4">0{index + 1}</div>
                <h3 className={`${fontSize.cardTitle} font-normal text-gray-900 mb-3`}>{item.title}</h3>
                <p className={`${fontSize.cardBody} text-gray-600 font-light leading-relaxed mb-5`}>{item.summary}</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-500">{t('cases.outcomeLabel')}:</span>{' '}
                    <span className="text-gray-800">{item.outcome}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">{t('cases.stackLabel')}:</span>{' '}
                    <span className="text-gray-800">{item.stack}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="px-4 text-center text-xs text-gray-400 font-light">
            {t('common.carouselHint')}
          </p>
        </div>

        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {cases.map((item, index) => (
            <article
              key={item.title}
              className="case-card rounded-2xl border border-gray-200 bg-white p-7 hover:border-[#4285F4]/50 hover:shadow-md transition-all duration-200"
            >
              <div className="text-sm text-[#4285F4] mb-4">0{index + 1}</div>
              <h3 className={`${fontSize.cardTitle} font-normal text-gray-900 mb-3`}>{item.title}</h3>
              <p className={`${fontSize.cardBody} text-gray-600 font-light leading-relaxed mb-5`}>{item.summary}</p>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">{t('cases.outcomeLabel')}:</span>{' '}
                  <span className="text-gray-800">{item.outcome}</span>
                </div>
                <div>
                  <span className="text-gray-500">{t('cases.stackLabel')}:</span>{' '}
                  <span className="text-gray-800">{item.stack}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Cases
