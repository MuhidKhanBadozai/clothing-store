import { Product, CustomerOrder, InventoryStats, ProductSize } from '../types/inventory';
import { db } from './firebase';
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';

const ORDERS_STORAGE_KEY = 'fama_orders';

class InventoryService {
  private products: Product[] = [];

  constructor() {
    this.fetchProducts();
  }

  public async fetchProducts() {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const data = querySnapshot.docs.map(docSnap => {
        const item = docSnap.data();

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
          id: docSnap.id,
          sku: item.sku || '',
          name: item.name || '',
          category: item.category || 'READY TO WEAR',
          gender: item.gender || (item.category === 'MEN' ? 'MEN' : item.category === 'WOMEN' ? 'WOMEN' : 'WOMEN'),
          price: Number(item.price) || 0,
          quantity: totalCalculatedQty || Number(item.quantity) || 0,
          images: parsedImages,
          discountPercentage: item.isOnSale ? 20 : 0,
          sizes: parsedSizes,
          color: item.color || 'Standard',
          fabric: item.fabric || item.fabricTag || 'Lawn',
          fabricTag: item.fabricTag || (item.fabric ? item.fabric : 'Lawn'),
          subCategory: item.subCategory || item.fabricTag || '',
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
      return this.products.filter((p) => p.isNewArrival);
    }
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

  // --- Orders Handling with Firestore ---

  public async recordOrder(order: CustomerOrder): Promise<void> {
    try {
      // 1. Save to local storage for instant offline access
      const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
      const orders: CustomerOrder[] = raw ? JSON.parse(raw) : [];
      orders.unshift(order);
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));

      // 2. Persist directly to Firebase Firestore "orders" collection
      const orderPayload = {
        ...order,
        createdAt: order.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await setDoc(doc(db, "orders", order.orderId), orderPayload);

      // 3. Decrement stock for ordered items in Firestore & memory
      for (const item of order.items) {
        const prod = this.products.find(p => p.sku.toUpperCase() === item.sku.toUpperCase());
        if (prod) {
          const targetSize = prod.sizes.find(s => s.size === item.size);
          if (targetSize) {
            targetSize.stock = Math.max(0, targetSize.stock - item.quantity);
            prod.quantity = prod.sizes.reduce((acc, cur) => acc + cur.stock, 0);

            // Update in Firestore
            try {
              await updateDoc(doc(db, "products", prod.id), {
                sizes: prod.sizes,
                quantity: prod.quantity
              });
            } catch (stockErr) {
              console.warn(`Could not update stock for product ${prod.id} in Firebase:`, stockErr);
            }
          }
        }
      }

      window.dispatchEvent(new Event('inventory_updated'));
    } catch (e) {
      console.error('Error recording order to Firestore:', e);
      // Fallback: save to localStorage
      try {
        const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
        const orders: CustomerOrder[] = raw ? JSON.parse(raw) : [];
        if (!orders.some(o => o.orderId === order.orderId)) {
          orders.unshift(order);
          localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
        }
      } catch (localErr) {
        console.error('Local fallback failed:', localErr);
      }
    }
  }

  public getOrders(): CustomerOrder[] {
    try {
      const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  // --- SKU Admin Panel Methods ---

  public async updateStockBySkuSize(sku: string, size: ProductSize, newStock: number): Promise<Product> {
    const prod = this.getBySku(sku);
    if (!prod) throw new Error(`SKU ${sku} not found`);
    const sizeObj = prod.sizes.find(s => s.size === size);
    if (sizeObj) {
      sizeObj.stock = Math.max(0, newStock);
    } else {
      prod.sizes.push({ size, stock: Math.max(0, newStock) });
    }
    prod.quantity = prod.sizes.reduce((acc, curr) => acc + curr.stock, 0);
    try {
      await updateDoc(doc(db, "products", prod.id), {
        sizes: prod.sizes,
        quantity: prod.quantity
      });
    } catch (err) {
      console.error('Error updating stock in Firebase:', err);
    }
    window.dispatchEvent(new Event('inventory_updated'));
    return prod;
  }

  public async deleteProductBySku(sku: string): Promise<boolean> {
    const prod = this.getBySku(sku);
    if (!prod) return false;
    try {
      await deleteDoc(doc(db, "products", prod.id));
      this.products = this.products.filter(p => p.sku !== sku);
      window.dispatchEvent(new Event('inventory_updated'));
      return true;
    } catch (err) {
      console.error('Error deleting product from Firebase:', err);
      return false;
    }
  }

  public async addProduct(productData: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    const newDoc = await addDoc(collection(db, "products"), {
      ...productData,
      createdAt: new Date().toISOString()
    });
    const newProduct: Product = {
      ...productData,
      id: newDoc.id,
      createdAt: new Date().toISOString()
    };
    this.products.unshift(newProduct);
    window.dispatchEvent(new Event('inventory_updated'));
    return newProduct;
  }

  public exportJson(): string {
    return JSON.stringify(this.products, null, 2);
  }

  public exportCsv(): string {
    const headers = ['SKU', 'Name', 'Category', 'Price', 'Quantity'];
    const rows = this.products.map(p => [`"${p.sku}"`, `"${p.name.replace(/"/g, '""')}"`, `"${p.category}"`, p.price, p.quantity].join(','));
    return [headers.join(','), ...rows].join('\n');
  }

  public resetToDefaultCatalog(): void {
    this.fetchProducts();
  }
}

export const inventoryService = new InventoryService();
