import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { STORE_INFO } from '../data/gasData';

interface FloatingScrollContactsProps {
  onOrderClick?: () => void;
}

export const FloatingScrollContacts: React.FC<FloatingScrollContactsProps> = () => {
  const [showFloating, setShowFloating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear when scrolling past 150px
      setShowFloating(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showFloating) return null;

  return (
    <div 
      className="fixed bottom-5 right-4 sm:right-6 z-50 flex items-center justify-end"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex items-center gap-2">
        {/* Expanded Pill (reveals on hover or click/tap) */}
        <div 
          className={`flex items-center gap-2 bg-white/95 backdrop-blur-md p-1.5 rounded-full shadow-2xl border-2 border-[#008751] transition-all duration-300 origin-right ${
            isExpanded ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none w-0 p-0 border-0'
          }`}
        >
          {/* Quick Phone Call Button */}
          <a
            href={`tel:${STORE_INFO.phoneLandline}`}
            className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors shrink-0"
            title={`Ligar para ${STORE_INFO.phoneDisplayLandline}`}
          >
            <Phone className="w-4 h-4 text-[#008751]" />
          </a>

          {/* WhatsApp Text Link */}
          <a
            href={`https://wa.me/55${STORE_INFO.phoneWhatsapp}?text=Ol%C3%A1%20G%C3%A1s%20Brasil!%20Vim%20pelo%20site%20e%20gostaria%20de%20pedir%20um%20g%C3%A1s.`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-extrabold text-[#008751] pr-3 whitespace-nowrap hover:underline"
          >
            {STORE_INFO.phoneDisplayWhatsapp}
          </a>
        </div>

        {/* Circular WhatsApp Floating Button (Retracted by default, pulses subtly) */}
        <button
          type="button"
          onClick={() => {
            if (!isExpanded) {
              setIsExpanded(true);
            } else {
              window.open(
                `https://wa.me/55${STORE_INFO.phoneWhatsapp}?text=${encodeURIComponent('Olá Gás Brasil! Vim pelo site e gostaria de pedir um gás.')}`,
                '_blank'
              );
            }
          }}
          className="w-14 h-14 rounded-full bg-[#008751] hover:bg-[#007345] text-white flex items-center justify-center shadow-2xl border-2 border-white hover:scale-105 active:scale-95 transition-all relative shrink-0 cursor-pointer"
          title="Falar no WhatsApp Gás Brasil"
          aria-label="Abrir WhatsApp Gás Brasil"
        >
          <span className="absolute inset-0 rounded-full bg-[#008751] animate-ping opacity-25 pointer-events-none" />
          <MessageCircle className="w-7 h-7 fill-white" />
        </button>
      </div>
    </div>
  );
};
