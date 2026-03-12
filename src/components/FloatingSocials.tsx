import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const socialLinks = [
  {
    name: 'X',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: 'https://x.com/camiladji',
    color: 'hover:text-black',
  },
  {
    name: 'Telegram',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.888-.662 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    href: 'https://t.me/camiladji',
    color: 'hover:text-[#0088cc]',
  },
  {
    name: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    href: 'https://instagram.com/haibin.chen',
    color: 'hover:text-[#E1306C]',
  },
  {
    name: 'WeChat',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M8.5,1.5C3.8,1.5,0,4.7,0,8.7c0,2.1,1,4.1,2.7,5.4l-0.7,2.2l2.5-1.3c1.2,0.4,2.6,0.5,4,0.5c4.7,0,8.5-3.2,8.5-7.2S13.2,1.5,8.5,1.5z M5.5,6.5c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S4.9,6.5,5.5,6.5z M11.5,6.5c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S10.9,6.5,11.5,6.5z"/>
        <path d="M24,15.5c0-3.3-3.3-5.9-7.5-5.9c-0.2,0-0.4,0-0.6,0c-0.1,0.5-0.1,1-0.1,1.5c0,3.9-3.9,7.1-8.6,7.1c-0.3,0-0.5,0-0.8,0c1.2,2.1,3.9,3.5,7.1,3.5c1.2,0,2.4-0.2,3.4-0.5l2.2,1.2l-0.6-2C22.2,19.2,24,17.5,24,15.5z M13.5,13.5c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S14.1,13.5,13.5,13.5z M19.5,13.5c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S20.1,13.5,19.5,13.5z"/>
      </svg>
    ),
    href: '#',
    color: 'hover:text-[#07C160]',
    qr: true,
    qrImage: '/wechat-qr.jpeg' // <-- 请将您的微信二维码图片放到 public 文件夹下，命名为 wechat-qr.png
  },
  {
    name: 'QQ',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12,0.5C5.7,0.5,0.7,4.8,0.7,10.2c0,3.3,1.9,6.3,4.9,8c0.4,2,0.8,4.1,0.8,4.1c0.1,0.5,0.8,0.7,1.1,0.2c0,0,1.9-2.6,3.6-3.7C11.4,18.9,11.7,19,12,19c3.1,0,6.1-0.8,8.2-2.3c3.6-2.5,4.5-5.3,4.5-6.5C24.7,4.8,19.7,0.5,12,0.5z M8.5,11.5c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2C10.5,10.6,9.6,11.5,8.5,11.5z M15.5,11.5c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2C17.5,10.6,16.6,11.5,15.5,11.5z"/>
      </svg>
    ),
    href: '#',
    color: 'hover:text-[#12B7F5]',
    qr: true,
    qrImage: '/qq-qr.jpeg' // <-- 请将您的QQ二维码图片放到 public 文件夹下，命名为 qq-qr.png
  },
  {
    name: '小红书',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M9.13 24h5.6v-2.12c0-1-.1-2.07-.3-3.1-.21-1.02-.5-2-.88-2.93-.37-.93-.82-1.8-1.34-2.6-.52-.8-1.1-1.52-1.72-2.16-.63-.64-1.31-1.18-2.04-1.62-.73-.44-1.51-.77-2.32-.99-.81-.22-1.66-.33-2.52-.33H0v6.17c1 0 1.95.14 2.85.42.9.28 1.73.68 2.48 1.18.75.5 1.41 1.1 1.98 1.79.57.69.96 1.46 1.18 2.3.22.84.34 1.75.34 2.7V24zm5.74-24H3.45a3.45 3.45 0 0 0-3.45 3.45v10.3c1.47 0 2.84.3 4.1.88 1.25.58 2.36 1.35 3.32 2.3.96.95 1.74 2.06 2.33 3.31.59 1.25.88 2.61.88 4.07h9.9c1.9 0 3.45-1.55 3.45-3.45V3.45A3.45 3.45 0 0 0 20.55 0h-5.68z"/>
      </svg>
    ),
    href: '#',
    color: 'hover:text-[#FF2442]',
    qr: true,
    qrImage: '/xhs-qr.jpeg' // <-- 请将您的小红书二维码图片放到 public 文件夹下，命名为 xhs-qr.png
  }
];

const FloatingSocials: React.FC = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <div className="fixed top-24 right-4 lg:top-1/2 lg:-translate-y-1/2 lg:right-6 z-[99] flex flex-col gap-3 lg:gap-4 bg-white/70 lg:bg-transparent p-1 lg:p-0 rounded-full lg:rounded-none backdrop-blur-md lg:backdrop-blur-none border border-gray-200/50 lg:border-none shadow-lg lg:shadow-none">
      {socialLinks.map((link, index) => (
        <div
          key={link.name}
          className="relative group flex items-center"
          onMouseEnter={() => setHoveredLink(link.name)}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <motion.a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 20 }}
            className={`w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 text-gray-500 ${link.color}`}
          >
            {link.icon}
          </motion.a>

          {/* Tooltip / QR Code Popup */}
          <AnimatePresence>
            {hoveredLink === link.name && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: -8, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute right-full origin-right z-50 pointer-events-none pr-2"
              >
                {link.qr ? (
                  <div className="bg-white p-3 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center relative pointer-events-auto">
                    {/* QR Code Extracted from qrImage or Fallback Placeholder */}
                    {link.qrImage ? (
                      <div className="w-32 h-32 mb-2 bg-white rounded-lg overflow-hidden flex items-center justify-center border border-gray-100/50 flex-shrink-0">
                        <img src={link.qrImage} alt={`${link.name} QR Code`} className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div className="w-32 h-32 bg-gray-50 border border-dashed border-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-400 mb-2 flex-shrink-0">
                        二维码
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700">{link.name}</span>
                  </div>
                ) : (
                  <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg whitespace-nowrap">
                    {link.name}
                    {/* Small arrow pointing right */}
                    <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-gray-900 rotate-45 transform origin-center"></div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default FloatingSocials;
