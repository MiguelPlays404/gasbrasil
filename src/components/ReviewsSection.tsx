import React from 'react';
import { 
  Star, 
  MapPin, 
  ExternalLink, 
  CheckCircle2, 
  Quote, 
  Navigation,
  MessageSquarePlus
} from 'lucide-react';
import { CUSTOMER_REVIEWS, STORE_INFO } from '../data/gasData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="depoimentos" className="py-12 sm:py-16 relative bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-xs font-bold text-amber-800 border border-amber-200">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Avaliações Verificadas no Google</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            Depoimentos de Quem Já Pediu
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            A satisfação dos nossos clientes em Bauru é o nosso maior compromisso diário.
          </p>
        </div>

        {/* Google Score Summary Card with Green Border */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto shadow-xl border-2 border-[#008751]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            
            {/* Rating Big Number */}
            <div className="flex items-center gap-4">
              <div className="text-5xl font-heading font-extrabold text-slate-900">
                4.8
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1 justify-center sm:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 font-semibold">
                  Classificação Excelente · <strong>76 avaliações reais no Google</strong>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
              <a
                href={STORE_INFO.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-orange-hero w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Avaliar no Google</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="#depositos"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border-2 border-[#008751] transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4 text-[#008751]" />
                <span>Ver Rotas dos 2 Depósitos</span>
              </a>
            </div>

          </div>
        </div>

        {/* Customer Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-3 relative flex flex-col justify-between"
            >
              <Quote className="absolute top-4 right-4 w-7 h-7 text-slate-200" />

              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <div>
                  <p className="font-bold text-slate-900 flex items-center gap-1.5">
                    {rev.name}
                    {rev.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008751] inline" />
                    )}
                  </p>
                  <p className="text-slate-500 flex items-center gap-1 text-[11px] mt-0.5">
                    <MapPin className="w-3 h-3 text-[#FF6B00]" />
                    {rev.neighborhood}
                  </p>
                </div>

                <span className="text-[11px] text-slate-400">{rev.date}</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
