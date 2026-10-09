export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'UNSTITCHED';

export interface SizeStock {
  size: ProductSize | string;
  stock: number;
}

export interface Product {
  id: string;
  sku: string; // Stock Keeping Unit e.g. "SS26BSP152P2T"
  name: string;
  category: 
    | 'SALE'
    | 'NEW ARRIVALS'
    | 'WOMEN'
    | 'MEN'
    | 'READY TO WEAR'
    | 'UNSTITCHED FABRIC'
    | 'HOME';
  fabricTag?: string; // Linen, Khaddar, Karandi, Marina, Jacquard, Pashmina, Wool, Printed silk, Lawn
  gender?: 'WOMEN' | 'MEN' | 'ALL' | string;
  subCategory?: string;
  collection: string;
  price: number; // In PKR
  originalPrice?: number;
  discountPercentage?: number;
  images: string[];
  sizes: SizeStock[];
  color: string;
  fabric: string;
  description: string;
  careInstructions: string[];
  costPrice?: number;
  warehouseLocation?: string;
  quantity?: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  createdAt: string;
}

export interface CartItem {
  id: string;
  sku: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  size: ProductSize | string;
  image: string;
  quantity: number;
  availableStock: number;
}

export interface OrderItem {
  sku: string;
  name: string;
  size: ProductSize | string;
  price: number;
  quantity: number;
  image?: string;
  productId?: string;
  color?: string;
}

export interface CustomerOrder {
  id?: string;
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province?: string;
  postalCode?: string;
  country?: string;
  orderNotes?: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount?: number;
  total: number;
  status: 'PENDING' | 'PROCESSING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentMethod: 'COD' | 'CARD' | 'BANK_TRANSFER';
  paymentStatus?: 'PENDING' | 'PAID' | 'FAILED';
  courier?: string;
  trackingNumber?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface InventoryStats {
  totalSkus: number;
  totalUnits: number;
  lowStockSkus: number;
  outOfStockSkus: number;
  totalRetailValue: number;
  totalCostValue: number;
}
