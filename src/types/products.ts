export interface Product {
  id: string;
  name: string;
  price: number;
  category: "tops" | "bottoms" | "accessories";
  images: string[];
  sizes: string[];
  colors: string[];
  fit: "OVERSIZE" | "RELAXED" | null;
  description: string;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export type ProductCategory = "all" | "tops" | "bottoms" | "accessories";
