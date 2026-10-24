import React from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  Star, 
  Navigation, 
  ShieldCheck
} from 'lucide-react';
import { STORE_INFO } from '../data/gasData';

export const Footer: React.FC = () => {
  return (
    <footer id="localizacao" className="bg-[#0F172A] text-slate-300 py-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Main Slim Info Grid */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          
          {/* Brand & Badge */}
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <img
              src={STORE_INFO.logoUrl}
              alt="Gás Brasil Logo"
              className="h-10 w-auto object-contain bg-white rounded-xl p-1 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h3 className="text-lg font-heading font-extrabold text-white">GÁS BRASIL</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                  Revenda Oficial Liquigás
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Bauru / SP · Botijões originais com pesagem garantida
              </p>
            </div>
          </div>

          {/* Depots Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <a
              href={STORE_INFO.depot1.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
            >
              <Navigation className="w-3.5 h-3.5 text-[#008751]" />
              <span>Depósito 1: Av. Nuno de Assis, 1166 (Centro)</span>
            </a>

            <a
              href={STORE_INFO.depot2.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
            >
              <Navigation className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Depósito 2: Nuno de Assis / Vila Seabra</span>
            </a>
          </div>

          {/* Direct WhatsApp Contact */}
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/55${STORE_INFO.phoneWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#008751] hover:bg-[#007345] text-white text-xs font-extrabold shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{STORE_INFO.phoneDisplayWhatsapp}</span>
            </a>

            <a
              href={`tel:${STORE_INFO.phoneLandline}`}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Ligar para fixo"
            >
              <Phone className="w-4 h-4 text-[#008751]" />
            </a>
          </div>

        </div>

        {/* Legal & ANP Bottom Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Gás Brasil Bauru · Revendedora Autorizada Liquigás.</p>
          
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Regulamentada e Fiscalizada pela ANP · Aberto hoje até 23h</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
