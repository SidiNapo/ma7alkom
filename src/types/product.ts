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
  flavors?: Flavor[];
  isPerUnit?: boolean;
  unitName?: string;
}

export interface Flavor {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export interface FlavorSelection {
  flavorId: string;
  quantity: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  flavorSelections?: FlavorSelection[];
}
