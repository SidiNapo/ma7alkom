export interface Product {
  id: string;
  name: string;
  shortName: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery?: string[];
  category: string;
  badge: string;
  description: string;
  fullDescription: string;
  benefits: string[];
  emoji: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
