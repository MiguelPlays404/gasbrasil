import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Building2, 
  ExternalLink,
  MessageCircle,
  CheckCircle2
} from 'lucide-react';
import { STORE_INFO } from '../data/gasData';

export const DepotsMapSection: React.FC = () => {
  const [selectedDepot, setSelectedDepot] = useState<1 | 2>(1);

  const activeDepot = selectedDepot === 1 ? STORE_INFO.depot1 : STORE_INFO.depot2;

  // General store pickup WhatsApp inquiry message requested by user
  const pickupMessage = 'Olá Gás Brasil! Vim pelo site e gostaria de saber como funciona a retirada de botijão de gás na loja e o valor com desconto para retirar no local. Obrigado!';
  const pickupWhatsappUrl = `https://wa.me/55${STORE_INFO.phoneWhatsapp}?text=${encodeURIComponent(pickupMessage)}`;

  return (
    <section id="depositos" className="py-12 sm:py-16 relative bg-[#EEF2F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-xs font-extrabold text-[#008751] border-2 border-[#008751]">
            <Building2 className="w-4 h-4 text-[#008751]" />
            <span>Estrutura Física em Bauru</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            Nossos 2 Depósitos em Bauru
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Mais rapidez e cobertura total para você retirar seu botijão ou receber entrega expressa em qualquer região de Bauru.
          </p>
        </div>

        {/* Depot Switcher Tabs with Permanent Green Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          
          {/* Card Depósito 1 */}
          <div
            onClick={() => setSelectedDepot(1)}
            className={`p-5 rounded-3xl cursor-pointer transition-all bg-white relative flex flex-col justify-between ${
              selectedDepot === 1
                ? 'border-2 border-[#008751] shadow-xl ring-4 ring-[#008751]/15 -translate-y-1'
                : 'border-2 border-slate-200 hover:border-[#008751]/50 shadow-sm'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#008751] text-white">
                  {STORE_INFO.depot1.badge}
                </span>

                <span className={`text-xs font-bold ${selectedDepot === 1 ? 'text-[#008751]' : 'text-slate-400'}`}>
                  {selectedDepot === 1 ? '● Visualizando no Mapa' : 'Clique para ver mapa'}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-heading font-extrabold text-slate-900">
                  {STORE_INFO.depot1.name}
                </h3>
                <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-4 h-4 text-[#FF6B00] shrink-0" />
                  {STORE_INFO.depot1.address}
                </p>
                <p className="text-[11px] text-slate-500 pl-5">
                  {STORE_INFO.depot1.cityZip}
                </p>
              </div>

              <div className="text-xs text-slate-600 flex items-center gap-1.5 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#008751]" />
                <span>{STORE_INFO.depot1.hours}</span>
              </div>
            </div>

            {/* Direct Como Chegar Button 1 */}
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center gap-2">
              <a
                href={STORE_INFO.depot1.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn-whatsapp-hero flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Como Chegar no Depósito 1</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* Card Depósito 2 */}
          <div
            onClick={() => setSelectedDepot(2)}
            className={`p-5 rounded-3xl cursor-pointer transition-all bg-white relative flex flex-col justify-between ${
              selectedDepot === 2
                ? 'border-2 border-[#008751] shadow-xl ring-4 ring-[#008751]/15 -translate-y-1'
                : 'border-2 border-slate-200 hover:border-[#008751]/50 shadow-sm'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#FF6B00] text-white">
                  {STORE_INFO.depot2.badge}
                </span>

                <span className={`text-xs font-bold ${selectedDepot === 2 ? 'text-[#008751]' : 'text-slate-400'}`}>
                  {selectedDepot === 2 ? '● Visualizando no Mapa' : 'Clique para ver mapa'}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-heading font-extrabold text-slate-900">
                  {STORE_INFO.depot2.name}
                </h3>
                <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-4 h-4 text-[#FF6B00] shrink-0" />
                  {STORE_INFO.depot2.address}
                </p>
                <p className="text-[11px] text-slate-500 pl-5">
                  {STORE_INFO.depot2.cityZip}
                </p>
              </div>

              <div className="text-xs text-slate-600 flex items-center gap-1.5 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#008751]" />
                <span>{STORE_INFO.depot2.hours}</span>
              </div>
            </div>

            {/* Direct Como Chegar Button 2 */}
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center gap-2">
              <a
                href={STORE_INFO.depot2.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn-orange-hero flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Como Chegar no Depósito 2</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>

        </div>

        {/* Interactive Map Box with Highlighted Green Borders */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-4 sm:p-5 shadow-xl border-2 border-[#008751] space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#008751] animate-ping" />
                <h4 className="text-base font-heading font-extrabold text-slate-900">
                  Localização: {activeDepot.name}
                </h4>
              </div>
              <p className="text-xs text-slate-600 pl-5 mt-0.5">
                {activeDepot.address} - {activeDepot.cityZip}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={activeDepot.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-hero px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Abrir Rota no GPS</span>
              </a>

              {/* Avisar Retirada Button: general pickup message */}
              <a
                href={pickupWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#008751] border-2 border-[#008751] text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#008751]" />
                <span>Avisar Retirada</span>
              </a>
            </div>
          </div>

          {/* Map Frame with Verified Embedded Coordinates */}
          <div className="w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100 relative">
            <iframe
              title={`Mapa de Localização - ${activeDepot.name}`}
              src={activeDepot.embedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
