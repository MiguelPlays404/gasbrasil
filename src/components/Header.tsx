import React from 'react';
import { 
  Phone, 
  MapPin, 
  Star, 
  Clock, 
  MessageCircle, 
  ShieldCheck 
} from 'lucide-react';
import { STORE_INFO } from '../data/gasData';

interface HeaderProps {
  onOrderClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOrderClick }) => {
  return (
    <header className="w-full bg-white border-b border-slate-200 shadow-xs relative z-20">
      
      {/* Top Thin Notification Line */}
      <div className="bg-[#008751] text-white text-xs py-1.5 px-4 font-semibold text-center flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
        <span>Revendedora Oficial Liquigás Bauru · Entregas rápidas todos os dias até às 23:00</span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo Brand: Using the official 3D Gás Brasil Logo */}
          <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
            <img
              src={STORE_INFO.logoUrl}
              alt="Gás Brasil Logo"
              className="h-9 sm:h-13 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform shrink-0"
            />

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-heading font-extrabold text-lg sm:text-2xl tracking-tight text-[#008751] truncate">
                  GÁS BRASIL
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded-full bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/30 hidden xs:inline-block shrink-0">
                  Bauru / SP
                </span>
              </div>
              <p className="text-[10px] sm:text-xs font-bold text-slate-600 flex items-center gap-1 mt-0.5 truncate">
                <ShieldCheck className="w-3.5 h-3.5 text-[#008751] shrink-0" />
                <span className="truncate">Revendedora Oficial Liquigás</span>
              </p>
            </div>
          </div>

          {/* Center Details (Desktop) */}
          <div className="hidden lg:flex items-center gap-5 text-xs font-medium">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
              <Clock className="w-4 h-4 text-[#008751]" />
              <div>
                <span className="font-bold text-slate-800 block">Seg a Sáb até 23h</span>
                <span className="text-[11px] text-slate-500">Domingos até 20h</span>
              </div>
            </div>

            <a
              href={STORE_INFO.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded-xl bg-amber-50/80 border border-amber-200 hover:bg-amber-100 transition-colors"
            >
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <div>
                <span className="font-extrabold text-slate-900 block">4.8 no Google</span>
                <span className="text-[11px] text-slate-600">(76 avaliações)</span>
              </div>
            </a>
          </div>

          {/* Right Action Contact Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Landline */}
            <a
              href={`tel:${STORE_INFO.phoneLandline}`}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 transition-all shrink-0"
              title="Ligar para a Gás Brasil"
            >
              <Phone className="w-3.5 h-3.5 text-[#008751]" />
              <span className="whitespace-nowrap">{STORE_INFO.phoneDisplayLandline}</span>
            </a>

            {/* Main WhatsApp Button */}
            <a
              href={`https://wa.me/55${STORE_INFO.phoneWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-hero px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 sm:gap-2 shrink-0 whitespace-nowrap shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white shrink-0" />
              <span className="whitespace-nowrap font-black tracking-tight">{STORE_INFO.phoneDisplayWhatsapp}</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};
