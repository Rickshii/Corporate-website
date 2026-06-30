import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';

export const WhatsAppButton = () => (
  <a
    href="https://wa.me/917667333698"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-8 left-6 z-50 w-14 h-14 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
    style={{
      background: '#25D366',
      boxShadow: '0 6px 24px rgba(37,211,102,0.5)',
    }}
  >
    <MessageCircle size={27} fill="white" />
  </a>
);

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-8 right-6 z-50 w-12 h-12 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
      style={{
        background: 'linear-gradient(135deg, #10b981, #059669)',
        boxShadow: visible ? '0 6px 24px rgba(16,185,129,0.5)' : 'none',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
      }}
    >
      <ArrowUp size={22} />
    </button>
  );
};
