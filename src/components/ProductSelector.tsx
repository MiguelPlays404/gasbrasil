import React, { useState } from 'react';
import { 
  Check, 
  Lock, 
  Unlock, 
  CreditCard, 
  QrCode, 
  Banknote, 
  HeartHandshake, 
  MapPin, 
  Sparkles, 
  MessageCircle,
  ShieldCheck,
  Truck,
  ArrowRight,
  Flame
} from 'lucide-react';
import { GAS_PRODUCTS, STORE_INFO } from '../data/gasData';
import { GasTypeId, PaymentMethod } from '../types';
import { FirebaseImage } from './FirebaseImage';

export const ProductSelector: React.FC = () => {
  const [selectedGasId, setSelectedGasId] = useState<GasTypeId | null>('p13');
  const [neighborhood, setNeighborhood] = useState<string>('');
  const [cep, setCep] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cartao');
  const [installments, setInstallments] = useState<number>(1);
  const [needChange, setNeedChange] = useState<boolean>(false);
  const [changeForAmount, setChangeForAmount] = useState<string>('150');
  const [addressNotes, setAddressNotes] = useState<string>('');

  const activeProduct = GAS_PRODUCTS.find((p) => p.id === selectedGasId);

  // Generate clean, natural, human WhatsApp text without broken unicode characters
  const generateWhatsappUrl = () => {
    if (!activeProduct) return '#';

    let paymentDetails = '';
    if (paymentMethod === 'cartao') {
      paymentDetails = installments === 1 ? 'Cartão na maquininha à vista' : `Cartão na maquininha em ${installments}x`;
    } else if (paymentMethod === 'pix') {
      paymentDetails = 'PIX na entrega';
    } else if (paymentMethod === 'dinheiro') {
      paymentDetails = needChange ? `Dinheiro (preciso de troco para R$ ${changeForAmount})` : 'Dinheiro (sem troco)';
    } else if (paymentMethod === 'gas_do_povo') {
      paymentDetails = 'Vale Gás do Povo';
    }

    const messageLines = [
      'Olá Gás Brasil! Gostaria de pedir um gás pelo site.',
      '',
      `Produto: ${activeProduct.name} - ${activeProduct.priceFormatted}`,
      `Bairro / Região: ${neighborhood.trim() ? neighborhood.trim() : 'Gostaria de consultar o frete'}`,
    ];

    if (cep.trim()) {
      messageLines.push(`CEP: ${cep.trim()}`);
    }

    if (addressNotes.trim()) {
      messageLines.push(`Endereço / Referência: ${addressNotes.trim()}`);
    }

    messageLines.push(`Forma de Pagamento: ${paymentDetails}`);
    messageLines.push('');
    messageLines.push('Poderia me confirmar a entrega e o frete para o meu endereço? Obrigado!');

    const fullText = messageLines.join('\n');
    return `https://wa.me/55${STORE_INFO.phoneWhatsapp}?text=${encodeURIComponent(fullText)}`;
  };

  return (
    <section id="produtos" className="py-12 sm:py-16 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-xs font-extrabold text-[#008751] border-2 border-[#008751]">
            <Flame className="w-4 h-4 text-[#FF6B00] fill-[#FF6B00]" />
            <span>Faça seu Pedido em Segundos</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            Escolha o Tamanho do seu Gás
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Botijões originais Liquigás com lacre inviolável e pesagem oficial. Selecione o modelo desejado para liberar o pedido no WhatsApp da Gás Brasil.
          </p>
        </div>

        {/* Product Cards Grid - With Green Borders Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {GAS_PRODUCTS.map((prod) => {
            const isSelected = selectedGasId === prod.id;
            return (
              <div
                key={prod.id}
                onClick={() => setSelectedGasId(prod.id)}
                className={`relative rounded-3xl p-6 cursor-pointer transition-all duration-300 bg-white flex flex-col justify-between ${
                  isSelected
                    ? 'border-2 border-[#008751] shadow-2xl ring-4 ring-[#008751]/20 -translate-y-1'
                    : 'border-2 border-slate-200 hover:border-[#008751]/60 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Popular Badge */}
                {prod.badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-extrabold shadow-xs flex items-center gap-1 ${
                    isSelected ? 'bg-[#008751] text-white' : 'bg-[#FF6B00] text-white'
                  }`}>
                    <Sparkles className="w-3 h-3" />
                    <span>{prod.badge}</span>
                  </div>
                )}

                {/* Selected Check Indicator */}
                <div className={`absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-[#008751] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-400'
                }`}>
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>

                {/* Clean Product Cylinder Photo */}
                {/* Clean Product Cylinder Photo loaded via Firebase Storage (getDownloadURL) */}
                <div className="w-full h-52 rounded-2xl bg-slate-50 mb-4 flex items-center justify-center p-3 overflow-hidden border border-slate-200">
                  <FirebaseImage
                    storagePath={prod.storagePath}
                    fallbackSrc={prod.image}
                    alt={prod.name}
                    className="h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Titles */}
                <div className="space-y-1">
                  <h3 className="text-xl font-heading font-extrabold text-slate-900">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-[#008751] font-bold">
                    {prod.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>

                {/* Ideal For Pill */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span className="font-bold text-slate-700">Ideal para:</span>
                  <span className="truncate">{prod.idealFor}</span>
                </div>

                {/* Price Display */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl sm:text-3xl font-heading font-extrabold text-[#008751]">
                      {prod.priceFormatted}
                    </span>
                  </div>

                  <span className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-[#008751] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}>
                    {isSelected ? '✓ Selecionado' : 'Selecionar'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clean Practical Delivery & Payment Options with PERMANENT GREEN BORDERS */}
        <div className="rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto shadow-2xl space-y-6 border-2 border-[#008751] bg-white">
          
          {/* Custom Delivery Neighborhood Input (Optional) */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#008751]" />
                <span>Endereço de Entrega em Bauru (Opcional)</span>
              </label>

              <span className="text-xs font-bold text-[#008751] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300 inline-flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                Frete a consultar com a Gás Brasil
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="Seu Bairro / Rua em Bauru (ex: Centro, Mary Dota, Geisel...)"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#008751] text-sm focus:outline-none focus:ring-2 focus:ring-[#008751]/30 text-slate-900 transition-all font-medium placeholder:text-slate-400"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="CEP (Opcional)"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#008751] text-sm focus:outline-none focus:ring-2 focus:ring-[#008751]/30 text-slate-900 transition-all font-medium placeholder:text-slate-400"
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-500">
              * Você pode informar agora ou combinar o endereço e a entrega diretamente no WhatsApp.
            </p>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#FF6B00]" />
              <span>Forma de Pagamento Preferida</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('cartao')}
                className={`p-3 rounded-2xl border-2 text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'cartao'
                    ? 'bg-[#008751] text-white border-[#008751] shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#008751]/40'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Cartão (até 3x)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`p-3 rounded-2xl border-2 text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'pix'
                    ? 'bg-[#008751] text-white border-[#008751] shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#008751]/40'
                }`}
              >
                <QrCode className="w-5 h-5" />
                <span>PIX</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('dinheiro')}
                className={`p-3 rounded-2xl border-2 text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'dinheiro'
                    ? 'bg-[#008751] text-white border-[#008751] shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#008751]/40'
                }`}
              >
                <Banknote className="w-5 h-5" />
                <span>Dinheiro</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('gas_do_povo')}
                className={`p-3 rounded-2xl border-2 text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'gas_do_povo'
                    ? 'bg-[#FF6B00] text-white border-[#FF6B00] shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#FF6B00]/40'
                }`}
              >
                <HeartHandshake className="w-5 h-5" />
                <span>Gás do Povo</span>
              </button>
            </div>

            {/* Installments sub-selector */}
            {paymentMethod === 'cartao' && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 flex items-center justify-between">
                <span className="font-semibold">Parcelamento no cartão na maquininha:</span>
                <select
                  value={installments}
                  onChange={(e) => setInstallments(Number(e.target.value))}
                  className="bg-white border-2 border-[#008751] rounded-lg px-3 py-1 font-bold text-slate-800"
                >
                  <option value={1}>1x sem juros</option>
                  <option value={2}>2x sem juros</option>
                  <option value={3}>3x no cartão</option>
                </select>
              </div>
            )}

            {paymentMethod === 'dinheiro' && (
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-300 text-xs text-orange-950 flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={needChange}
                    onChange={(e) => setNeedChange(e.target.checked)}
                    className="rounded text-[#008751] focus:ring-[#008751] w-4 h-4"
                  />
                  <span>Precisa de troco?</span>
                </label>

                {needChange && (
                  <div className="flex items-center gap-1.5">
                    <span>Troco para R$:</span>
                    <input
                      type="number"
                      value={changeForAmount}
                      onChange={(e) => setChangeForAmount(e.target.value)}
                      className="w-24 px-2 py-1 rounded-lg bg-white border-2 border-[#008751] font-bold text-slate-800 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Optional notes input */}
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-semibold text-slate-700">
              Observações / Ponto de Referência (Opcional):
            </label>
            <input
              type="text"
              placeholder="Ex: Próximo à padaria / Entregar após às 18h"
              value={addressNotes}
              onChange={(e) => setAddressNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border-2 border-[#008751] text-sm focus:outline-none focus:ring-2 focus:ring-[#008751]/30 text-slate-900 placeholder:text-slate-400 font-medium"
            />
          </div>

          {/* WhatsApp Release Mechanism */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            
            {/* Price Row */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
              <div>
                <p className="text-xs text-slate-500 font-medium">Produto Escolhido</p>
                <p className="text-base sm:text-lg font-bold text-slate-900">
                  {activeProduct ? activeProduct.name : 'Nenhum botijão selecionado'}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-[#008751] font-semibold">
                  Frete: A consultar com a Gás Brasil
                </p>
                <p className="text-2xl sm:text-3xl font-heading font-extrabold text-[#008751]">
                  {activeProduct ? activeProduct.priceFormatted : 'R$ 0,00'}
                </p>
              </div>
            </div>

            {/* CONDITIONAL WHATSAPP BUTTON: LOCKED vs UNLOCKED */}
            {!selectedGasId ? (
              /* Locked Button State */
              <div className="p-4 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 text-center space-y-2 opacity-80 cursor-not-allowed">
                <div className="inline-flex p-2.5 rounded-full bg-slate-200 text-slate-500">
                  <Lock className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-slate-700">
                  Botão do WhatsApp Bloqueado
                </p>
                <p className="text-xs text-slate-500">
                  Selecione um tamanho de botijão de gás acima para liberar o pedido pelo WhatsApp.
                </p>
              </div>
            ) : (
              /* Unlocked WhatsApp Action Button */
              <a
                href={generateWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-hero w-full py-4 px-6 rounded-2xl font-heading font-extrabold text-base sm:text-lg flex items-center justify-center gap-3 group shadow-xl"
              >
                <MessageCircle className="w-6 h-6 fill-white" />
                <span>Pedir no WhatsApp · {activeProduct?.priceFormatted || 'R$ 100,00'}</span>
                <Unlock className="w-4 h-4 opacity-80" />
              </a>
            )}

            <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#008751]" />
              Revenda Oficial Liquigás Bauru. Pedido enviado para (14) 98821-5634.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
