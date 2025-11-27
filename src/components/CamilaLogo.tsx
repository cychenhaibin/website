import React from 'react'

interface CamilaLogoProps {
  className?: string
  size?: number
}

const CamilaLogo: React.FC<CamilaLogoProps> = ({ className = '', size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 山形图标 - 简约现代设计 */}
      <path
        d="M2 18L7 8L12 14L17 6L22 18H2Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default CamilaLogo

