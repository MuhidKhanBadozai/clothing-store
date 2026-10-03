import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ProductSize, CustomerOrder } from '../types/inventory';
import { inventoryService } from '../services/inventoryService';

interface StoreContextType {
  products: Product[];
  refreshProducts: () => void;
  // Navigation
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  activeFabricFilter: string;
  setActiveFabricFilter: (fabric: string) => void;
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  // Currency
  currency: 'PKR' | 'USD';
  setCurrency: (c: 'PKR' | 'USD') => void;
  formatPrice: (pkrAmount: number) => string;
  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size: ProductSize, quantity?: number) => boolean;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  // Filter
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  selectedSizes: ProductSize[];
  toggleSizeFilter: (size: ProductSize) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  onlyInStock: boolean;
  setOnlyInStock: (val: boolean) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  resetFilters: () => void;
  // Mobile Nav Drawer
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  // Product Detail
  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;
  // Admin SKU Inventory Panel
  isAdminPanelOpen: boolean;
  setIsAdminPanelOpen: (open: boolean) => void;
  // Checkout
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  placeOrder: (customerData: Omit<CustomerOrder, 'orderId' | 'items' | 'subtotal' | 'shippingFee' | 'total' | 'createdAt' | 'status'>) => CustomerOrder;
  // Toast notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

const CART_KEY = 'ss_cart_items';
const WISHLIST_KEY = 'ss_wishlist_items';
const THEME_KEY = 'ss_theme_mode_v2';
const CURRENCY_KEY = 'ss_currency';
const USD_RATE = 278.5; // 1 USD = 278.5 PKR

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => inventoryService.getAll());
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeFabricFilter, setActiveFabricFilter] = useState<string>('ALL');

  // Dark mode - Strictly default to Light mode as requested
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      // Clear legacy dark mode preference that may have auto-detected dark mode from OS
      localStorage.removeItem('ss_dark_mode');
      const saved = localStorage.getItem('ss_theme_mode_v2');
      if (saved !== null) {
        return saved === 'dark';
      }
      return false; // Default: Light mode
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    try {
      localStorage.setItem('ss_theme_mode_v2', isDarkMode ? 'dark' : 'light');
    } catch {
      // Ignore
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      showToast(next ? 'Dark Mode enabled' : 'Light Mode enabled');
      return next;
    });
  };

  // Currency
  const [currency, setCurrencyState] = useState<'PKR' | 'USD'>(() => {
    try {
      return (localStorage.getItem(CURRENCY_KEY) as 'PKR' | 'USD') || 'PKR';
    } catch {
      return 'PKR';
    }
  });

  const setCurrency = (c: 'PKR' | 'USD') => {
    setCurrencyState(c);
    localStorage.setItem(CURRENCY_KEY, c);
  };

  const formatPrice = (pkrAmount: number): string => {
    if (currency === 'USD') {
      const usdVal = pkrAmount / USD_RATE;
      return `$${usdVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `Rs.${pkrAmount.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Item removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Item saved to your wishlist');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<ProductSize[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const toggleSizeFilter = (size: ProductSize) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const resetFilters = () => {
    setSelectedSizes([]);
    setPriceRange([0, 100000]);
    setOnlyInStock(false);
    setSortBy('featured');
    setSearchQuery('');
    setActiveFabricFilter('ALL');
  };

  // Modals & Panels
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  // Refresh products from service
  const refreshProducts = () => {
    setProducts(inventoryService.getAll());
  };

  useEffect(() => {
    const handleInvChange = () => {
      setProducts(inventoryService.getAll());
    };
    window.addEventListener('inventory_updated', handleInvChange);
    return () => window.removeEventListener('inventory_updated', handleInvChange);
  }, []);

  // Cart operations
  const addToCart = (product: Product, size: ProductSize, quantity = 1): boolean => {
    const sizeStock = product.sizes.find((s) => s.size === size)?.stock ?? 0;
    if (sizeStock < quantity) {
      showToast(`Sorry, only ${sizeStock} item(s) available in size ${size}`);
      return false;
    }

    const cartItemId = `${product.sku}-${size}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        const nextQty = existing.quantity + quantity;
        if (nextQty > sizeStock) {
          showToast(`Max stock limit reached for size ${size} (${sizeStock} in stock)`);
          return prev;
        }
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: nextQty } : item
        );
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          sku: product.sku,
          productId: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          size,
          image: product.images[0] || '',
          quantity,
          availableStock: sizeStock,
        };
        return [...prev, newItem];
      }
    });

    showToast(`Added "${product.name}" (${size}) to bag`);
    setIsCartOpen(true);
    return true;
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
    showToast('Item removed from cart');
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          if (newQty > item.availableStock) {
            showToast(`Max quantity available: ${item.availableStock}`);
            return { ...item, quantity: item.availableStock };
          }
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const placeOrder = (
    customerData: Omit<CustomerOrder, 'orderId' | 'items' | 'subtotal' | 'shippingFee' | 'total' | 'createdAt' | 'status'>
  ): CustomerOrder => {
    const subtotal = cartSubtotal;
    // Flat shipping PKR 250 in Pakistan, free over PKR 15,000 (or $300)
    const shippingFee = subtotal > 15000 || subtotal === 0 ? 0 : 250;
    const total = subtotal + shippingFee - (customerData.discount || 0);

    const newOrder: CustomerOrder = {
      ...customerData,
      orderId: `SS-ORD-${Date.now().toString().slice(-6)}`,
      items: cart.map((i) => ({
        sku: i.sku,
        name: i.name,
        size: i.size,
        price: i.price,
        quantity: i.quantity,
      })),
      subtotal,
      shippingFee,
      total: Math.max(0, total),
      status: 'PROCESSING',
      createdAt: new Date().toISOString(),
    };

    inventoryService.recordOrder(newOrder);
    clearCart();
    refreshProducts();
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        refreshProducts,
        activeCategory,
        setActiveCategory,
        activeFabricFilter,
        setActiveFabricFilter,
        isDarkMode,
        toggleDarkMode,
        currency,
        setCurrency,
        formatPrice,
        cart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isWishlisted,
        isWishlistOpen,
        setIsWishlistOpen,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isFilterOpen,
        setIsFilterOpen,
        selectedSizes,
        toggleSizeFilter,
        priceRange,
        setPriceRange,
        onlyInStock,
        setOnlyInStock,
        sortBy,
        setSortBy,
        resetFilters,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        selectedProduct,
        openProductDetail,
        closeProductDetail,
        isAdminPanelOpen,
        setIsAdminPanelOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        placeOrder,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
