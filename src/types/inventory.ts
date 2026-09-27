export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL';

export interface SizeStock {
  size: ProductSize;
  stock: number;
}

export interface Product {
  id: string;
  sku: string; // Stock Keeping Unit e.g. "SS26BSP152P2T"
  name: string;
  category: 
    | 'SALE'
    | 'NEW ARRIVALS'
    | 'READY TO WEAR'
    | 'UNSTITCHED FABRIC'
    | 'SS WESST'
    | 'KIDS'
    | 'ACCESSORIES'
    | 'COUTURE'
    | 'BRIDAL'
    | 'HOME';
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
  size: ProductSize;
  image: string;
  quantity: number;
  availableStock: number;
}

export interface OrderItem {
  sku: string;
  name: string;
  size: ProductSize;
  price: number;
  quantity: number;
}

export interface CustomerOrder {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount?: number;
  total: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
  paymentMethod: 'COD' | 'CARD' | 'BANK_TRANSFER';
  createdAt: string;
}

export interface InventoryStats {
  totalSkus: number;
  totalUnits: number;
  lowStockSkus: number;
  outOfStockSkus: number;
  totalRetailValue: number;
  totalCostValue: number;
}
