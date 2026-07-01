import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQq, FaWeixin } from 'react-icons/fa';
import { SiXiaohongshu } from 'react-icons/si';

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
    name: '微信',
    icon: <FaWeixin className="w-5 h-5" />,
    href: '#',
    color: 'hover:text-[#07C160]',
    qr: true,
    qrImage: '/wechat-qr.jpeg'
  },
  {
    name: 'QQ',
    icon: <FaQq className="w-5 h-5" />,
    href: '#',
    color: 'hover:text-[#12B7F5]',
    qr: true,
    qrImage: '/qq-qr.jpeg'
  },
  {
    name: '小红书',
    icon: <SiXiaohongshu className="w-5 h-5" />,
    href: '#',
    color: 'hover:text-[#FF2442]',
    qr: true,
    qrImage: '/xhs-qr.jpeg'
  }
];

const FloatingSocials: React.FC = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <div className="hidden lg:flex fixed top-1/2 -translate-y-1/2 right-6 z-[99] flex-col gap-4">
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
            className={`w-11 h-11 flex items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 text-gray-500 ${link.color}`}
          >
            {link.icon}
          </motion.a>

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
