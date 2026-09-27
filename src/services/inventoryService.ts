import { Product, CustomerOrder, InventoryStats, ProductSize } from '../types/inventory';

// Initial preloaded luxury pret catalog matching the Sana Safinaz collection
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    sku: 'SS26BSP152P2T',
    name: 'Stitched Printed Basic Viscose Shirt+ Culotte',
    category: 'READY TO WEAR',
    subCategory: 'Shirt + Culotte',
    collection: "Summer Lawn '26",
    price: 4619.30,
    originalPrice: 6599.00,
    discountPercentage: 30,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: [
      { size: 'XS', stock: 8 },
      { size: 'S', stock: 15 },
      { size: 'M', stock: 12 },
      { size: 'L', stock: 6 },
      { size: 'XL', stock: 3 },
    ],
    color: 'Crimson Red',
    fabric: 'Premium 100% Viscose Staple with floral botanical block motifs',
    description: 'A vibrant crimson two-piece ensemble featuring a band collar neckline with scalloped hem detailing, paired with matching loose-cut culottes. Perfect for festive daytime outings.',
    careInstructions: [
      'Dry clean recommended',
      'Gentle hand wash in cold water',
      'Do not bleach or tumble dry',
      'Iron at medium temperature inside out'
    ],
    costPrice: 2100.00,
    warehouseLocation: 'WH-KHI-AISLE-3A',
    isNewArrival: true,
    isBestSeller: true,
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'prod-2',
    sku: 'SS26SGE428P3',
    name: 'Stitched Embroidered Lawn Shirt+ Shalwar',
    category: 'READY TO WEAR',
    subCategory: 'Embroidered 3-Piece',
    collection: 'Festive Eid Edit',
    price: 16659.30,
    originalPrice: 23799.00,
    discountPercentage: 30,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: [
      { size: 'XS', stock: 4 },
      { size: 'S', stock: 9 },
      { size: 'M', stock: 14 },
      { size: 'L', stock: 2 },
      { size: 'XL', stock: 0 },
    ],
    color: 'Ivory White with Cobalt Accent',
    fabric: 'Fine Pima Lawn with Delicate Resham Chikankari & Net Dupatta',
    description: 'Bespoke ivory lawn shirt adorned with traditional Kashmiri threadwork in cobalt blue, accented by lace insets and a pleated tulip shalwar.',
    careInstructions: [
      'Dry clean only',
      'Handle delicate embroidery with care',
      'Store in provided breathable muslin garment bag'
    ],
    costPrice: 7800.00,
    warehouseLocation: 'WH-LHE-AISLE-1B',
    isNewArrival: true,
    isBestSeller: true,
    createdAt: '2026-03-05T12:30:00Z',
  },
  {
    id: 'prod-3',
    sku: 'SS26SGE414P2T',
    name: 'Stitched Embroidered Lawn Shirt+ Culotte',
    category: 'READY TO WEAR',
    subCategory: 'Shirt + Culotte',
    collection: 'Festive Eid Edit',
    price: 12249.30,
    originalPrice: 17499.00,
    discountPercentage: 30,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: [
      { size: 'XS', stock: 6 },
      { size: 'S', stock: 11 },
      { size: 'M', stock: 7 },
      { size: 'L', stock: 4 },
      { size: 'XL', stock: 2 },
    ],
    color: 'Pure Chalk White',
    fabric: 'Geometric Cutwork Lawn with Organza Panel Hem',
    description: 'Luxe summer silhouette with intricate Schiffli laser cutwork embroidery down the sleeves and hemline, styled with fluid flared white culottes.',
    careInstructions: [
      'Dry clean only',
      'Do not wring',
      'Steam iron only'
    ],
    costPrice: 5600.00,
    warehouseLocation: 'WH-KHI-AISLE-4D',
    isNewArrival: false,
    isBestSeller: true,
    createdAt: '2026-02-15T09:15:00Z',
  },
  {
    id: 'prod-4',
    sku: 'SS26BSP373P2T',
    name: 'Stitched Printed Lawn Shirt+ Culotte',
    category: 'READY TO WEAR',
    subCategory: 'Shirt + Culotte',
    collection: "Summer Lawn '26",
    price: 4549.30,
    originalPrice: 6499.00,
    discountPercentage: 30,
    images: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: [
      { size: 'XS', stock: 5 },
      { size: 'S', stock: 18 },
      { size: 'M', stock: 16 },
      { size: 'L', stock: 8 },
      { size: 'XL', stock: 4 },
    ],
    color: 'Ochre Mustard Yellow',
    fabric: 'Silky Combed Lawn with Paisley Heritage Print',
    description: 'Cheerful yellow ensemble featuring a contemporary relaxed silhouette with mirror-work lace neckline and printed wide culottes.',
    careInstructions: [
      'Machine wash gentle 30°C',
      'Do not tumble dry',
      'Medium heat iron'
    ],
    costPrice: 2000.00,
    warehouseLocation: 'WH-ISB-AISLE-2C',
    isNewArrival: true,
    isBestSeller: false,
    createdAt: '2026-03-08T15:00:00Z',
  },
  {
    id: 'prod-5',
    sku: 'UNST26-JAC-802',
    name: '3-Piece Luxury Unstitched Jacquard Lawn Suit',
    category: 'UNSTITCHED FABRIC',
    subCategory: '3-Piece Suits',
    collection: "Unstitched '26",
    price: 7490.00,
    originalPrice: 9990.00,
    discountPercentage: 25,
    images: [
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: [
      { size: 'S', stock: 25 },
      { size: 'M', stock: 35 },
      { size: 'L', stock: 20 },
    ],
    color: 'Emerald & Gold Weave',
    fabric: 'Zari Jacquard Shirt (3m), Embroidered Organza Border (1m), Dyed Cambric Trouser (2.5m)',
    description: 'An unstitched masterpiece with woven metallic zari threads, accompanied by a lavishly embroidered silk chiffon dupatta and soft cambric trouser fabric.',
    careInstructions: [
      'Dry clean recommended',
      'Iron on reverse with damp cloth'
    ],
    costPrice: 3800.00,
    warehouseLocation: 'WH-KHI-AISLE-6F',
    isNewArrival: true,
    isBestSeller: true,
    createdAt: '2026-03-10T11:00:00Z',
  },
  {
    id: 'prod-6',
    sku: 'WESST-BLZ-204',
    name: 'SS Wesst Oversized Tailored Linen Blazer',
    category: 'SS WESST',
    subCategory: 'Blazers & Outerwear',
    collection: 'Wesst Modernist',
    price: 8950.00,
    originalPrice: 11500.00,
    discountPercentage: 22,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: [
      { size: 'XS', stock: 3 },
      { size: 'S', stock: 8 },
      { size: 'M', stock: 6 },
      { size: 'L', stock: 2 },
    ],
    color: 'Oatmeal Sand',
    fabric: 'Pure Italian Blend Linen with Horn Buttons',
    description: 'A sharp, minimalist single-breasted blazer with structured shoulders, peak lapels, and deep flap pockets. Versatile from boardrooms to evening dinners.',
    careInstructions: [
      'Dry clean only',
      'Store on wide hanger'
    ],
    costPrice: 4200.00,
    warehouseLocation: 'WH-LHE-AISLE-8A',
    isNewArrival: true,
    isBestSeller: false,
    createdAt: '2026-02-28T08:00:00Z',
  },
  {
    id: 'prod-7',
    sku: 'CTR-RAW-991',
    name: 'Heirloom Handcrafted Raw Silk Peshwas',
    category: 'COUTURE',
    subCategory: 'Bespoke Couture',
    collection: 'Heritage Royal',
    price: 48500.00,
    originalPrice: 65000.00,
    discountPercentage: 25,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 3 },
      { size: 'M', stock: 2 },
      { size: 'L', stock: 1 },
    ],
    color: 'Deep Plum & Antique Gold',
    fabric: 'Hand-woven Raw Silk with Zardozi, Dabka & French Knots',
    description: 'A regal floor-length Peshwas designed for grand celebrations. Showcases 16 kalis embroidered with antique dabka, tilla, and mukesh work.',
    careInstructions: [
      'Specialist dry clean only',
      'Keep away from perfume spray'
    ],
    costPrice: 22000.00,
    warehouseLocation: 'WH-VAULT-COUTURE-1',
    isNewArrival: false,
    isBestSeller: true,
    createdAt: '2026-01-20T14:00:00Z',
  },
  {
    id: 'prod-8',
    sku: 'BRD-VEL-007',
    name: 'Bridal Velvet Lehenga with Farshi Gharara',
    category: 'BRIDAL',
    subCategory: 'Bridal Formals',
    collection: 'Shahnama Bridal',
    price: 95000.00,
    originalPrice: 125000.00,
    discountPercentage: 24,
    images: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: [
      { size: 'S', stock: 1 },
      { size: 'M', stock: 2 },
      { size: 'L', stock: 1 },
    ],
    color: 'Carnation Red & Burnished Zari',
    fabric: 'Micro Velvet with Pure Tissue Dupatta and Hand-Embellished Pearls',
    description: 'An ethereal bridal silhouette celebrating centuries of artisan craftsmanship. Features intricate motifs inspired by Mughal frescoes.',
    careInstructions: [
      'White-glove dry cleaning only'
    ],
    costPrice: 48000.00,
    warehouseLocation: 'WH-VAULT-BRIDAL-A',
    isNewArrival: true,
    isBestSeller: false,
    createdAt: '2026-02-10T16:00:00Z',
  },
  {
    id: 'prod-9',
    sku: 'ACC-SLD-441',
    name: 'Embellished T-Strap Leather Kolhapuri Slides',
    category: 'ACCESSORIES',
    subCategory: 'Shoes',
    collection: 'Summer Footwear',
    price: 3650.00,
    originalPrice: 4990.00,
    discountPercentage: 27,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: [
      { size: 'S', stock: 12 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 15 },
    ],
    color: 'Mint Sage & Gold',
    fabric: 'Genuine Soft Leather with Braided Metallic Straps and Padded Sole',
    description: 'Handcrafted leather slides with mirror accents and traditional gota craft. Features an ergonomic cushioned footbed for all-day comfort.',
    careInstructions: [
      'Wipe clean with a damp cloth',
      'Store in dust bag'
    ],
    costPrice: 1500.00,
    warehouseLocation: 'WH-KHI-FOOTWEAR-2',
    isNewArrival: true,
    isBestSeller: true,
    createdAt: '2026-03-02T13:00:00Z',
  },
  {
    id: 'prod-10',
    sku: 'KID-JAC-102',
    name: 'Girls Festive Embroidered Kurta & Tulip Shalwar',
    category: 'KIDS',
    subCategory: 'Girls Eastern',
    collection: 'Little Sana Safinaz',
    price: 4250.00,
    originalPrice: 5990.00,
    discountPercentage: 29,
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: [
      { size: 'XS', stock: 7 },
      { size: 'S', stock: 10 },
      { size: 'M', stock: 8 },
      { size: 'L', stock: 3 },
    ],
    color: 'Blush Pink & Rose Gold',
    fabric: 'Breathable Cotton Jacquard with Soft Voile Lining',
    description: 'Designed for celebratory moments with ultra-soft lining to ensure comfort. Delicate sequin neckline and comfortable elasticated tulip shalwar.',
    careInstructions: [
      'Hand wash gently in cold water',
      'Do not wring'
    ],
    costPrice: 1800.00,
    warehouseLocation: 'WH-KHI-KIDS-1',
    isNewArrival: true,
    isBestSeller: false,
    createdAt: '2026-03-11T10:00:00Z',
  },
  {
    id: 'prod-11',
    sku: 'HOM-CUS-503',
    name: 'Heritage Velvet Hand-Embroidered Cushion Cover (Set of 2)',
    category: 'HOME',
    subCategory: 'Living & Decor',
    collection: 'Sana Safinaz Living',
    price: 5200.00,
    originalPrice: 6500.00,
    discountPercentage: 20,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef5?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: [
      { size: 'M', stock: 24 },
    ],
    color: 'Olive Forest Green',
    fabric: 'Pure Silk Velvet with Zari Floral Medallion',
    description: 'Add an opulent focal point to your living space. Handcrafted with traditional Pakistani karchob embroidery and concealed brass zipper.',
    careInstructions: [
      'Dry clean only'
    ],
    costPrice: 2200.00,
    warehouseLocation: 'WH-HOME-AISLE-1',
    isNewArrival: false,
    isBestSeller: true,
    createdAt: '2026-01-15T11:00:00Z',
  },
  {
    id: 'prod-12',
    sku: 'SS26SGE550P2',
    name: 'Stitched Monochrome Chiffon Shirt+ Straight Trouser',
    category: 'READY TO WEAR',
    subCategory: 'Shirt + Trouser',
    collection: 'Monochrome Signature',
    price: 13990.00,
    originalPrice: 19990.00,
    discountPercentage: 30,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 5 },
      { size: 'M', stock: 9 },
      { size: 'L', stock: 3 },
      { size: 'XL', stock: 1 },
    ],
    color: 'Obsidian Jet Black',
    fabric: 'Crinkle Chiffon with Tone-on-Tone Shadow Work and Silk Slip',
    description: 'An iconic black statement two-piece with subtle tonal embroidery, boat neck with pearls, and high-waisted raw silk straight trousers.',
    careInstructions: [
      'Dry clean only',
      'Cool iron on reverse'
    ],
    costPrice: 6200.00,
    warehouseLocation: 'WH-KHI-AISLE-2E',
    isNewArrival: true,
    isBestSeller: true,
    createdAt: '2026-03-09T09:00:00Z',
  },
];

const STORAGE_KEY = 'sana_safinaz_sku_inventory';
const ORDERS_STORAGE_KEY = 'sana_safinaz_orders';

// Modular Inventory Service designed for straightforward REST/GraphQL/SQL integration
class InventoryService {
  private getStoredProducts(): Product[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
        return INITIAL_PRODUCTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_PRODUCTS;
    }
  }

  private saveProducts(products: Product[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      // Dispatch custom event for real-time app-wide updates
      window.dispatchEvent(new Event('inventory_updated'));
    } catch (err) {
      console.error('Failed to save inventory state', err);
    }
  }

  // --- Public Read Methods ---

  public getAll(): Product[] {
    return this.getStoredProducts();
  }

  public getBySku(sku: string): Product | undefined {
    const products = this.getStoredProducts();
    return products.find((p) => p.sku.trim().toUpperCase() === sku.trim().toUpperCase());
  }

  public getById(id: string): Product | undefined {
    const products = this.getStoredProducts();
    return products.find((p) => p.id === id);
  }

  public getByCategory(category: string): Product[] {
    const products = this.getStoredProducts();
    if (!category || category === 'ALL' || category === 'SHOP BY CATEGORY') {
      return products;
    }
    if (category === 'SALE') {
      return products.filter((p) => (p.discountPercentage ?? 0) > 0);
    }
    if (category === 'NEW ARRIVALS') {
      return products.filter((p) => p.isNewArrival);
    }
    return products.filter((p) => p.category === category);
  }

  // --- Public SKU Admin Management Methods ---

  public addProduct(productData: Omit<Product, 'id' | 'createdAt'>): Product {
    const products = this.getStoredProducts();
    const existing = products.find(
      (p) => p.sku.trim().toUpperCase() === productData.sku.trim().toUpperCase()
    );
    if (existing) {
      throw new Error(`SKU "${productData.sku}" already exists in the inventory system.`);
    }

    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };

    const updated = [newProduct, ...products];
    this.saveProducts(updated);
    return newProduct;
  }

  public updateProduct(sku: string, updates: Partial<Product>): Product {
    const products = this.getStoredProducts();
    const index = products.findIndex(
      (p) => p.sku.trim().toUpperCase() === sku.trim().toUpperCase()
    );
    if (index === -1) {
      throw new Error(`Product with SKU "${sku}" not found.`);
    }

    const updatedProduct = { ...products[index], ...updates };
    products[index] = updatedProduct;
    this.saveProducts(products);
    return updatedProduct;
  }

  public updateStockBySkuSize(sku: string, size: ProductSize, newStock: number): Product {
    const products = this.getStoredProducts();
    const product = products.find(
      (p) => p.sku.trim().toUpperCase() === sku.trim().toUpperCase()
    );
    if (!product) {
      throw new Error(`SKU "${sku}" not found.`);
    }

    const sizeIndex = product.sizes.findIndex((s) => s.size === size);
    if (sizeIndex >= 0) {
      product.sizes[sizeIndex].stock = Math.max(0, newStock);
    } else {
      product.sizes.push({ size, stock: Math.max(0, newStock) });
    }

    this.saveProducts(products);
    return product;
  }

  public deleteProductBySku(sku: string): boolean {
    const products = this.getStoredProducts();
    const filtered = products.filter(
      (p) => p.sku.trim().toUpperCase() !== sku.trim().toUpperCase()
    );
    if (filtered.length === products.length) return false;
    this.saveProducts(filtered);
    return true;
  }

  public resetToDefaultCatalog(): void {
    this.saveProducts(INITIAL_PRODUCTS);
  }

  // --- Stats and SKU Analytics for Admin Panel ---

  public getStats(): InventoryStats {
    const products = this.getStoredProducts();
    let totalUnits = 0;
    let lowStockSkus = 0;
    let outOfStockSkus = 0;
    let totalRetailValue = 0;
    let totalCostValue = 0;

    for (const p of products) {
      const pUnits = p.sizes.reduce((sum, s) => sum + s.stock, 0);
      totalUnits += pUnits;

      if (pUnits === 0) {
        outOfStockSkus++;
      } else if (pUnits <= 5) {
        lowStockSkus++;
      }

      totalRetailValue += p.price * pUnits;
      totalCostValue += (p.costPrice || p.price * 0.5) * pUnits;
    }

    return {
      totalSkus: products.length,
      totalUnits,
      lowStockSkus,
      outOfStockSkus,
      totalRetailValue,
      totalCostValue,
    };
  }

  // --- Export and Data Interchange ---

  public exportJson(): string {
    return JSON.stringify(this.getStoredProducts(), null, 2);
  }

  public exportCsv(): string {
    const products = this.getStoredProducts();
    const headers = [
      'SKU',
      'Name',
      'Category',
      'Collection',
      'Retail_Price_PKR',
      'Cost_Price_PKR',
      'Total_Stock',
      'Stock_XS',
      'Stock_S',
      'Stock_M',
      'Stock_L',
      'Stock_XL',
      'Warehouse_Location',
      'Color',
      'Discount_Percent',
    ];

    const rows = products.map((p) => {
      const getS = (sz: ProductSize) => p.sizes.find((s) => s.size === sz)?.stock ?? 0;
      const totalStock = p.sizes.reduce((sum, s) => sum + s.stock, 0);
      return [
        `"${p.sku}"`,
        `"${p.name.replace(/"/g, '""')}"`,
        `"${p.category}"`,
        `"${p.collection}"`,
        p.price,
        p.costPrice ?? 0,
        totalStock,
        getS('XS'),
        getS('S'),
        getS('M'),
        getS('L'),
        getS('XL'),
        `"${p.warehouseLocation ?? 'N/A'}"`,
        `"${p.color}"`,
        p.discountPercentage ?? 0,
      ].join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  }

  // --- Orders Handling ---

  public recordOrder(order: CustomerOrder): void {
    try {
      const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
      const orders: CustomerOrder[] = raw ? JSON.parse(raw) : [];
      orders.unshift(order);
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));

      // Deduct stock per SKU and size
      const products = this.getStoredProducts();
      for (const item of order.items) {
        const prod = products.find((p) => p.sku === item.sku);
        if (prod) {
          const sz = prod.sizes.find((s) => s.size === item.size);
          if (sz) {
            sz.stock = Math.max(0, sz.stock - item.quantity);
          }
        }
      }
      this.saveProducts(products);
    } catch (e) {
      console.error('Error recording order', e);
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
}

export const inventoryService = new InventoryService();
