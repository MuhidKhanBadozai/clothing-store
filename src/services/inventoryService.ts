import { Product, CustomerOrder, InventoryStats, ProductSize } from '../types/inventory';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const ORDERS_STORAGE_KEY = 'fama_orders';

class InventoryService {
  private products: Product[] = [];

  constructor() {
    this.fetchProducts();
  }

  public async fetchProducts() {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const data = querySnapshot.docs.map(doc => {
        const item = doc.data();

        // Parse sizes: support both structured array [{size: 'M', stock: 10}] or object {XS: 2, S: 5} or legacy quantity
        let parsedSizes: { size: ProductSize; stock: number }[] = [];
        if (Array.isArray(item.sizes) && item.sizes.length > 0) {
          parsedSizes = item.sizes.map((s: any) => ({
            size: s.size as ProductSize,
            stock: Number(s.stock) || 0
          }));
        } else if (item.sizes && typeof item.sizes === 'object') {
          parsedSizes = (['XS', 'S', 'M', 'L', 'XL'] as ProductSize[]).map((sz) => ({
            size: sz,
            stock: Number(item.sizes[sz]) || 0
          }));
        } else {
          const totalQty = Number(item.quantity) || 0;
          parsedSizes = (['XS', 'S', 'M', 'L', 'XL'] as ProductSize[]).map((sz) => ({
            size: sz,
            stock: sz === 'M' ? totalQty : 0
          }));
        }

        const totalCalculatedQty = parsedSizes.reduce((acc, curr) => acc + curr.stock, 0);

        // Parse images: prefer new images[] array, fallback to legacy image string
        let parsedImages: string[] = [];
        if (Array.isArray(item.images) && item.images.length > 0) {
          parsedImages = (item.images as string[]).filter(u => typeof u === 'string' && u.trim().length > 0);
        }
        if (parsedImages.length === 0 && item.image && typeof item.image === 'string' && item.image.trim()) {
          parsedImages = [item.image.trim()];
        }
        if (parsedImages.length === 0) {
          parsedImages = ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80'];
        }

        return {
          id: doc.id,
          sku: item.sku || '',
          name: item.name || '',
          category: item.category || 'READY TO WEAR',
          price: Number(item.price) || 0,
          quantity: totalCalculatedQty || Number(item.quantity) || 0,
          images: parsedImages,
          discountPercentage: item.isOnSale ? 20 : 0,
          sizes: parsedSizes,
          color: item.color || 'Standard',
          fabric: item.fabric || 'Standard Lawn',
          description: item.description || item.name || '',
          careInstructions: item.careInstructions || ['Dry clean recommended', 'Do not bleach', 'Iron inside out'],
          collection: item.category || '',
          createdAt: item.createdAt || new Date().toISOString(),
          isNewArrival: item.category === 'NEW ARRIVALS'
        } as Product;
      });
      this.products = data;
      window.dispatchEvent(new Event('inventory_updated'));
    } catch (err) {
      console.error('Failed to fetch inventory from Firebase', err);
    }
  }

  public getAll(): Product[] {
    return this.products;
  }

  public getBySku(sku: string): Product | undefined {
    return this.products.find((p) => p.sku.trim().toUpperCase() === sku.trim().toUpperCase());
  }

  public getById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  public getByCategory(category: string): Product[] {
    if (!category || category === 'ALL' || category === 'SHOP BY CATEGORY') {
      return this.products;
    }
    if (category === 'SALE') {
      return this.products.filter((p) => (p.discountPercentage ?? 0) > 0);
    }
    if (category === 'NEW ARRIVALS') {
      // Show all new arrivals regardless of sale status
      return this.products.filter((p) => p.isNewArrival);
    }
    // Show all products in the category, including those on sale
    return this.products.filter((p) => p.category === category);
  }

  public getStats(): InventoryStats {
    let totalUnits = 0, lowStockSkus = 0, outOfStockSkus = 0, totalRetailValue = 0, totalCostValue = 0;
    for (const p of this.products) {
      const pUnits = p.sizes.reduce((sum, s) => sum + s.stock, 0);
      totalUnits += pUnits;
      if (pUnits === 0) outOfStockSkus++;
      else if (pUnits <= 5) lowStockSkus++;
      totalRetailValue += p.price * pUnits;
      totalCostValue += (p.costPrice || p.price * 0.5) * pUnits;
    }
    return { totalSkus: this.products.length, totalUnits, lowStockSkus, outOfStockSkus, totalRetailValue, totalCostValue };
  }

  public recordOrder(order: CustomerOrder): void {
    try {
      const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
      const orders: CustomerOrder[] = raw ? JSON.parse(raw) : [];
      orders.unshift(order);
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Error recording order', e);
    }
  }
}

export const inventoryService = new InventoryService();
