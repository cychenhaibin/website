import React from 'react'
import { useTranslation } from 'react-i18next'
import SectionHeader from '../components/SectionHeader'

const Contact: React.FC = () => {
  const { t } = useTranslation()

  return (
    <section id="contact" className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[28px] border border-gray-200 bg-[linear-gradient(135deg,rgba(66,133,244,0.08),rgba(255,255,255,1)_45%,rgba(66,133,244,0.03))] p-5 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-6 md:gap-10 items-start">
            <div>
              <SectionHeader
                eyebrow={t('contact.eyebrow')}
                titleWord={t('contact.titleWord')}
                title={t('contact.title')}
                subtitle={t('contact.subtitle')}
                align="left"
                className="mb-5 md:mb-8"
              />

              <div className="flex flex-row gap-3 md:gap-4">
                <a
                  href="mailto:haibinchenleo@outlook.com"
                  className="inline-flex items-center justify-center rounded-lg bg-[#4285F4] px-4 py-2 text-white no-underline hover:text-white hover:no-underline hover:bg-[#357ae8] transition-colors"
                >
                  {t('contact.primaryCta')}
                </a>
                <a
                  href="https://github.com/cychenhaibin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-gray-900 no-underline hover:text-[#4285F4] hover:border-[#4285F4] hover:no-underline transition-colors"
                >
                  {t('contact.secondaryCta')}
                </a>
              </div>

              <p className="mt-4 md:mt-6 text-sm text-gray-500 font-light">{t('contact.note')}</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-2">
              <div className="rounded-2xl border border-white/70 bg-white/80 p-4 lg:px-5 lg:py-3">
                <p className="text-xs md:text-sm text-gray-500 mb-0.5">{t('contact.emailLabel')}</p>
                <a href="mailto:haibinchenleo@outlook.com" className="text-sm md:text-base text-gray-900 hover:text-[#4285F4] break-all">
                  haibinchenleo@outlook.com
                </a>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/80 p-4 lg:px-5 lg:py-3">
                <p className="text-xs md:text-sm text-gray-500 mb-0.5">{t('contact.availabilityTitle')}</p>
                <p className="text-sm md:text-base text-gray-900">{t('contact.availabilityValue')}</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/80 p-4 lg:px-5 lg:py-3">
                <p className="text-xs md:text-sm text-gray-500 mb-0.5">{t('contact.responseTitle')}</p>
                <p className="text-sm md:text-base text-gray-900">{t('contact.responseValue')}</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/80 p-4 lg:px-5 lg:py-3">
                <p className="text-xs md:text-sm text-gray-500 mb-0.5">{t('contact.locationTitle')}</p>
                <p className="text-sm md:text-base text-gray-900">{t('contact.locationValue')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
