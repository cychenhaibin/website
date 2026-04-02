import React from 'react'
import { fontSize } from '../styles/typography'

interface SectionHeaderProps {
  eyebrow: string
  titleWord: string
  title: string
  subtitle?: string
  as?: 'h1' | 'h2'
  align?: 'left' | 'center'
  className?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  titleWord,
  title,
  subtitle,
  as: Tag = 'h2',
  align = 'center',
  className = '',
}) => {
  const isCenter = align === 'center'

  return (
    <div className={`${isCenter ? 'text-center' : ''} ${className}`}>
      <p className={`${fontSize.eyebrow} uppercase tracking-[0.28em] text-[#4285F4] mb-2 md:mb-3`}>
        {eyebrow}
      </p>
      <Tag className={`${fontSize.sectionTitle} font-normal text-gray-900 mb-3 md:mb-4`}>
        <span className={`${fontSize.sectionTitle} font-normal text-[#4285F4]`}>{titleWord}</span>{' '}
        {title}
      </Tag>
      {subtitle && (
        <p className={`${fontSize.sectionSubtitle} text-gray-600 font-light leading-relaxed ${isCenter ? 'max-w-3xl mx-auto' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionHeader
