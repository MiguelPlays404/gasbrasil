import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  ExternalLink, 
  CheckCircle2, 
  Quote, 
  Navigation,
  MessageSquarePlus,
  Send,
  X,
  Sparkles,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { STORE_INFO } from '../data/gasData';
import { useReviews } from '../context/ReviewsContext';

export const ReviewsSection: React.FC = () => {
  const { 
    allReviews, 
    siteReviews, 
    totalReviewsCount, 
    averageRatingFormatted, 
    submitReview 
  } = useReviews();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (name.trim().length < 2) {
      setFormError('Por favor, informe seu nome ou apelido (mínimo 2 letras).');
      return;
    }
    if (neighborhood.trim().length < 2) {
      setFormError('Por favor, informe o seu bairro em Bauru.');
      return;
    }
    if (comment.trim().length < 3) {
      setFormError('Por favor, escreva uma breve mensagem sobre o atendimento ou entrega.');
      return;
    }

    try {
      setIsSubmitting(true);
      await submitReview({
        name: name.trim(),
        neighborhood: neighborhood.trim(),
        rating,
        comment: comment.trim(),
      });

      setSuccessMessage(true);
      setName('');
      setNeighborhood('');
      setComment('');
      setRating(5);

      setTimeout(() => {
        setSuccessMessage(false);
        setIsModalOpen(false);
      }, 2200);
    } catch (err: unknown) {
      console.error(err);
      setFormError(err instanceof Error ? err.message : 'Não foi possível enviar a avaliação. Verifique a conexão.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingLabel = (val: number) => {
    switch (val) {
      case 5: return 'Excelente! Super recomendo';
      case 4: return 'Muito bom! Entrega rápida';
      case 3: return 'Bom atendimento';
      case 2: return 'Regular';
      case 1: return 'Insatisfeito';
      default: return 'Selecione sua nota';
    }
  };

  return (
    <section id="depoimentos" className="py-12 sm:py-16 relative bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-xs font-bold text-amber-800 border border-amber-200">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Avaliações Verificadas · Google e Site Oficial</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            Depoimentos de Quem Já Pediu
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            A satisfação dos nossos clientes em Bauru é o nosso maior compromisso diário.
          </p>
        </div>

        {/* Dynamic Score Summary Card with Green Border */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto shadow-xl border-2 border-[#008751]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            
            {/* Rating Big Number with Real-time Count */}
            <div className="flex items-center gap-4">
              <div className="text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
                {averageRatingFormatted}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1 justify-center sm:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 font-semibold">
                  Classificação Excelente · <strong className="text-slate-900">{totalReviewsCount} avaliações reais</strong>
                  {siteReviews.length > 0 && (
                    <span className="text-[#008751] font-bold block sm:inline sm:ml-1">
                      ({siteReviews.length} registradas no site)
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Action Buttons: Avaliar no Site + Avaliar no Google */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
              
              {/* Button to open on-site review modal */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#008751] hover:bg-[#007043] text-white font-extrabold text-xs shadow-md shadow-[#008751]/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Avaliar no Site</span>
              </button>

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
                className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border-2 border-[#008751] transition-all flex items-center justify-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5 text-[#008751]" />
                <span>2 Depósitos</span>
              </a>
            </div>

          </div>
        </div>

        {/* Customer Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {allReviews.map((rev) => (
            <div
              key={rev.id}
              className={`bg-white rounded-2xl p-6 shadow-sm border transition-all space-y-3 relative flex flex-col justify-between ${
                rev.isOnlineSubmission ? 'border-2 border-[#008751] shadow-md shadow-emerald-500/5' : 'border-slate-200'
              }`}
            >
              <Quote className="absolute top-4 right-4 w-7 h-7 text-slate-200 pointer-events-none" />

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  {rev.isOnlineSubmission && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#008751]/10 text-[#008751] border border-[#008751]/30">
                      <Sparkles className="w-3 h-3 text-[#008751]" />
                      <span>Avaliação no Site</span>
                    </span>
                  )}
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

                <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Interactive On-Site Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-[#008751] relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {successMessage ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#008751] mx-auto flex items-center justify-center border-2 border-[#008751] animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-heading font-extrabold text-slate-900">
                  Avaliação Registrada!
                </h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  Muito obrigado! Sua avaliação foi gravada no banco de dados e já aumentou a pontuação da Gás Brasil em tempo real.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Modal Title */}
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#008751] text-xs font-bold border border-[#008751]/30 mb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#008751]" />
                    <span>Gás Brasil · Revendedora Oficial</span>
                  </div>
                  <h3 className="text-2xl font-heading font-extrabold text-slate-900">
                    Avaliar no Site
                  </h3>
                  <p className="text-xs text-slate-600">
                    Sua nota é publicada imediatamente e atualiza o contador do site.
                  </p>
                </div>

                {/* Star Selector */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border-2 border-[#008751]/20 text-center space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Sua Nota para a Gás Brasil:
                  </label>
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isActive = (hoverRating || rating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 transition-transform hover:scale-125 focus:outline-hidden"
                        >
                          <Star
                            className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                              isActive
                                ? 'text-amber-400 fill-amber-400 drop-shadow-xs'
                                : 'text-slate-300 fill-slate-100'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs font-bold text-[#008751]">
                    {getRatingLabel(hoverRating || rating)}
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Seu Nome ou Sobrenome:
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Carlos Oliveira"
                    maxLength={60}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#008751] focus:ring-2 focus:ring-[#008751]/30 focus:outline-hidden text-sm font-medium bg-white"
                  />
                </div>

                {/* Neighborhood in Bauru */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Seu Bairro em Bauru:
                  </label>
                  <input
                    type="text"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder="Ex: Mary Dota, Centro, Vila Seabra, Geisel..."
                    maxLength={60}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#008751] focus:ring-2 focus:ring-[#008751]/30 focus:outline-hidden text-sm font-medium bg-white"
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Como foi sua experiência com o gás / entrega?
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    maxLength={500}
                    placeholder="Conte sobre a agilidade na entrega, simpatia do entregador, teste de vazamento ou qualidade do botijão..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#008751] focus:ring-2 focus:ring-[#008751]/30 focus:outline-hidden text-sm font-medium bg-white resize-none"
                  />
                  <span className="text-[10px] text-slate-400 block text-right mt-0.5">
                    {comment.length}/500 caracteres
                  </span>
                </div>

                {formError && (
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                    {formError}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#008751] hover:bg-[#007043] disabled:opacity-50 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#008751]/25 transition-all cursor-pointer active:scale-98"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Gravando no Banco de Dados...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Publicar Avaliação no Site</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
};
