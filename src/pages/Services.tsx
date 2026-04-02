import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useTranslation } from 'react-i18next'
import SectionHeader from '../components/SectionHeader'
import { fontSize } from '../styles/typography'

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  const services = [
    {
      title: t('services.items.website.title'),
      description: t('services.items.website.description')
    },
    {
      title: t('services.items.ai.title'),
      description: t('services.items.ai.description')
    },
    {
      title: t('services.items.activity.title'),
      description: t('services.items.activity.description')
    },
    {
      title: t('services.items.consultant.title'),
      description: t('services.items.consultant.description')
    }
  ]

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.service-card'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out' }
    )
  }, [])

  return (
    <section id="services" className="py-20 px-4">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        <SectionHeader
          eyebrow={t('services.eyebrow')}
          titleWord={t('services.titleWord')}
          title={t('services.title')}
          subtitle={t('services.subtitle')}
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card rounded-2xl border border-gray-200 bg-white p-7 hover:border-[#4285F4]/50 hover:shadow-md transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#4285F4]/10 text-[#4285F4] flex items-center justify-center mb-5">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className={`${fontSize.cardTitle} font-normal text-gray-900 mb-3`}>{service.title}</h3>
              <p className={`${fontSize.cardBody} text-gray-600 font-light leading-relaxed`}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
