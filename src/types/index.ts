export interface ProductSize {
  id: string;
  name: string;
  dimensions: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  iconName: string;
  gradient: string;
  sizes: ProductSize[];
  minOrder: number;
  customizable: boolean;
}

export interface CartItem {
  cartId: string;
  productId: string;
  productName: string;
  size: ProductSize;
  quantity: number;
  logoUrl?: string;
  logoFileName?: string;
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  customerPhone: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
}

export interface StockData {
  [productId: string]: {
    [sizeId: string]: number;
  };
}
