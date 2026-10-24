export type GasTypeId = 'p13' | 'p45' | 'p5';

export interface GasProduct {
  id: GasTypeId;
  name: string;
  subtitle: string;
  weight: string;
  price: number;
  priceFormatted: string;
  idealFor: string;
  description: string;
  image: string;
  storagePath?: string;
  badge?: string;
  popular?: boolean;
}

export interface CustomerReview {
  id: string;
  name: string;
  neighborhood: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  isOnlineSubmission?: boolean;
}

export type PaymentMethod = 'cartao' | 'pix' | 'dinheiro' | 'gas_do_povo';

export interface OrderState {
  selectedGasId: GasTypeId | null;
  neighborhood: string;
  cep: string;
  paymentMethod: PaymentMethod;
  needChange: boolean;
  changeForAmount: string;
  installments: number;
  notes: string;
}

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  title: string;
  subtitle?: string;
  tag?: string;
}
