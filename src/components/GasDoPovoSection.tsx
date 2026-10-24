import React from 'react';
import { 
  HeartHandshake, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight, 
  Check 
} from 'lucide-react';
import { STORE_INFO } from '../data/gasData';

interface GasDoPovoSectionProps {
  onOrderClick: () => void;
}

export const GasDoPovoSection: React.FC<GasDoPovoSectionProps> = ({ onOrderClick }) => {
  return (
    <section id="gas-povo" className="py-12 sm:py-16 relative bg-[#EEF2F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Gás do Povo Official Social Program with Green Border */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#008751] flex-1 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#008751] text-xs font-extrabold border-2 border-[#008751]">
                  <HeartHandshake className="w-4 h-4 text-[#008751]" />
                  <span>Benefício Social Autorizado</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 leading-tight">
                  Aceitamos o seu vale <span className="text-[#008751]">Gás do Povo</span>
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  A <strong className="text-slate-900 font-bold">Gás Brasil</strong> é revendedora credenciada oficial da Liquigás em Bauru para o programa. Você recebe o botijão de 13kg lacrado, com peso integral e atendimento prioritário.
                </p>

                {/* Attached Gás do Povo Image Asset */}
                <div className="rounded-2xl overflow-hidden border-2 border-[#008751]/30 bg-slate-50 p-2 flex items-center justify-center">
                  <img
                    src="/assets/gas_do_povo_oficial.png"
                    alt="Programa Gás do Povo Liquigás na Gás Brasil Bauru"
                    className="w-full h-auto max-h-[300px] object-contain rounded-xl"
                  />
                </div>
              </div>

              <button
                onClick={onOrderClick}
                className="btn-whatsapp-hero w-full py-4 px-6 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 border-2 border-[#008751] mt-4"
              >
                <span>Usar Vale Gás do Povo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

          {/* Card 2: 3x Card Installment Promo Banner with Green Border */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-[#008751] flex-1 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 text-[#FF6B00] text-xs font-extrabold border-2 border-[#FF6B00]">
                    <CreditCard className="w-4 h-4 text-[#FF6B00]" />
                    <span>Pagamento Facilitado na Entrega</span>
                  </div>

                  {/* Logo Gas Brasil stamp */}
                  <img
                    src={STORE_INFO.logoUrl}
                    alt="Logo Gás Brasil"
                    className="h-9 w-auto object-contain hidden xs:block"
                  />
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 leading-tight">
                  Parcelamos seu gás em até <span className="text-[#FF6B00]">3x no Cartão</span>
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Sem burocracia: o entregador leva a maquininha sem fio até você na entrega. Aceitamos as principais bandeiras, além de PIX com confirmação imediata.
                </p>

                {/* Banner 16:9 Cleanly Displayed */}
                <div className="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm bg-slate-50 flex items-center justify-center">
                  <img
                    src="/src/assets/images/banner_parcelamento_3x_1792802483992.jpg"
                    alt="Parcelamos em até 3x no cartão de crédito"
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Check Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <Check className="w-4 h-4 text-[#008751] stroke-[3]" />
                    <span>Maquininha sem fio na entrega</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <Check className="w-4 h-4 text-[#008751] stroke-[3]" />
                    <span>Visa, Mastercard, Elo, Hipercard</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <Check className="w-4 h-4 text-[#008751] stroke-[3]" />
                    <span>PIX rápido sem taxa</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <Check className="w-4 h-4 text-[#008751] stroke-[3]" />
                    <span>Troco facilitado em dinheiro</span>
                  </div>
                </div>
              </div>

              {/* Bottom Guarantee Banner */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border-2 border-[#008751]/40 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#008751] shrink-0" />
                <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                  <strong>Revenda Autorizada ANP & Liquigás:</strong> Pesagem e lacre 100% conferidos para máxima durabilidade do seu botijão em Bauru.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
