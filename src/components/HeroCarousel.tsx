import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Star, 
  MapPin,
  MessageCircle,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { STORE_INFO } from '../data/gasData';
import { useReviews } from '../context/ReviewsContext';
import { FirebaseImage } from './FirebaseImage';
import { FIREBASE_STORAGE_PATHS } from '../firebase/storage';

// Direct imports for reliable bundler-resolved assets on any hosting platform
import slide1Img from '../assets/images/hero_frota_liquigas_1792805173857.jpg';
import slide2Img from '../assets/images/hero_familia_cozinha_1792805199902.jpg';
import slide3Img from '../assets/images/banner_parcelamento_3x_1792802483992.jpg';
import slide4Img from '../assets/images/hero_entregador_sorriso_1792806580398.jpg';
import slide5Img from '../assets/images/hero_cozinha_restaurante_1792806616621.jpg';
import slide6Img from '../assets/images/hero_deposito_caminhoes_1792806617231.jpg';

interface HeroCarouselProps {
  onOrderClick: () => void;
}

const HERO_SLIDES = [
  {
    image: slide1Img,
    storagePath: FIREBASE_STORAGE_PATHS.carousel[0],
    badge: 'Revendedora Oficial Liquigás · Bauru',
    title: 'Gás de Cozinha com Peso e Qualidade Garantidos',
    subtitle: 'Entrega rápida e segura em todos os bairros de Bauru com botijões certificados.',
    ctaText: 'Pedir no WhatsApp',
  },
  {
    image: slide2Img,
    storagePath: FIREBASE_STORAGE_PATHS.carousel[1],
    badge: 'Segurança & Rendimento Máximo',
    title: 'Proteção e Economia para a sua Família',
    subtitle: 'Botijões inspecionados com o lacre inviolável original verde Liquigás.',
    ctaText: 'Pedir no WhatsApp',
  },
  {
    image: slide3Img,
    storagePath: FIREBASE_STORAGE_PATHS.carousel[2],
    badge: 'Facilidade no Pagamento',
    title: 'Parcele seu Botijão em até 3x no Cartão',
    subtitle: 'Levamos a maquininha sem fio até sua porta. Crédito, Débito, PIX e Vale Gás do Povo.',
    ctaText: 'Pedir no WhatsApp',
  },
  {
    image: slide4Img,
    storagePath: FIREBASE_STORAGE_PATHS.carousel[3],
    badge: 'Atendimento Rápido & Amigo',
    title: 'Entrega Ágil e Instalação Grátis',
    subtitle: 'Nossa equipe instala e realiza teste de vazamento com total segurança e respeito.',
    ctaText: 'Pedir no WhatsApp',
  },
  {
    image: slide5Img,
    storagePath: FIREBASE_STORAGE_PATHS.carousel[4],
    badge: 'Comércio, Restaurantes & Residências',
    title: 'Chama Azul e Alto Desempenho Culinário',
    subtitle: 'Fornecimento pontual para residências, condomínios, pizzarias e restaurantes de Bauru.',
    ctaText: 'Pedir no WhatsApp',
  },
  {
    image: slide6Img,
    storagePath: FIREBASE_STORAGE_PATHS.carousel[5],
    badge: '2 Depósitos Estratégicos em Bauru',
    title: 'Estoque Completo e Retirada Imediata',
    subtitle: 'Localizações na Vila Seabra e Jardim Redentor abertas todos os dias até as 23h.',
    ctaText: 'Pedir no WhatsApp',
  },
];

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onOrderClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { averageRatingFormatted, totalReviewsCount } = useReviews();

  // Robust, continuous autoplay that never gets stuck
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative w-full overflow-hidden">
      
      {/* FULL-WIDTH SLIDER (Edge to Edge, Clean & Responsive) */}
      <div className="relative w-full h-[460px] sm:h-[500px] md:h-[540px] lg:h-[580px] overflow-hidden bg-slate-950">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
              }`}
            >
              {/* Full Width Background Image loaded via Firebase Storage (getDownloadURL) */}
              <FirebaseImage
                storagePath={slide.storagePath}
                fallbackSrc={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
              />

              {/* Smooth Gradient Overlay: Darker at bottom for crisp readability, clear at top to highlight the photos */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/65 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/30 to-transparent hidden sm:block" />

              {/* Text & Content Overlay: Positioned near the bottom near the slide indicators */}
              <div className="absolute inset-0 flex items-end pb-12 sm:pb-14 md:pb-16">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-xl space-y-2 sm:space-y-3 text-left">
                    
                    {/* Top Pill Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#008751] text-white text-[11px] sm:text-xs font-extrabold shadow-md border border-emerald-400/30">
                      <Flame className="w-3.5 h-3.5 fill-[#FF6B00] text-[#FF6B00]" />
                      <span>{slide.badge}</span>
                    </div>

                    {/* Compact Bold Title */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold tracking-tight text-white leading-tight drop-shadow-sm">
                      {slide.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed max-w-lg drop-shadow-xs line-clamp-2 sm:line-clamp-none">
                      {slide.subtitle}
                    </p>

                    {/* Compact Action Buttons */}
                    <div className="flex flex-row items-center gap-2.5 pt-1 sm:pt-2">
                      <button
                        onClick={onOrderClick}
                        className="btn-whatsapp-hero px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg group border border-emerald-400/40"
                      >
                        <MessageCircle className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                        <span>{slide.ctaText}</span>
                      </button>

                      <a
                        href="#depositos"
                        className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 font-bold text-xs sm:text-sm border border-white/60 flex items-center justify-center gap-1.5 transition-all shadow-sm backdrop-blur-xs"
                      >
                        <MapPin className="w-4 h-4 text-[#008751]" />
                        <span>2 Depósitos</span>
                      </a>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          );
        })}

        {/* Minimal Bottom Slide Indicators (Dots only, no arrows as requested) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-6 bg-[#FF6B00]' : 'w-2 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* NATURAL, ELEGANT TRUST SECTION (Replaces harsh green divider bar) */}
      <div className="w-full bg-white border-b border-slate-200/90 py-5 sm:py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            
            <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:border-[#008751]/40 transition-colors">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-[#008751] flex items-center justify-center shrink-0 border border-[#008751]/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 block truncate">Lacre Inviolável</span>
                <span className="text-[11px] text-slate-500 block truncate">Original Liquigás 100% seguro</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:border-[#FF6B00]/40 transition-colors">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center shrink-0 border border-[#FF6B00]/20">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 block truncate">Até 3x no Cartão</span>
                <span className="text-[11px] text-slate-500 block truncate">Maquininha na sua porta</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:border-[#008751]/40 transition-colors">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-[#008751] flex items-center justify-center shrink-0 border border-[#008751]/20">
                <Truck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 block truncate">Entrega Ágil</span>
                <span className="text-[11px] text-slate-500 block truncate">Atendimento em toda Bauru</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:border-amber-500/40 transition-colors">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-500/20">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 block truncate">Nota {averageRatingFormatted}★ ({totalReviewsCount} avaliações)</span>
                <span className="text-[11px] text-slate-500 block truncate">Google e Avaliações no Site</span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};
