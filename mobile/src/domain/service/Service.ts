export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  duration?: string;
  provider: string;
}

export interface ServicePreview {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  provider: string;
} 