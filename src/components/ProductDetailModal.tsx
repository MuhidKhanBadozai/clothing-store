import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { ProductSize } from '../types/inventory';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Check, 
  Copy, 
  Ruler, 
  Truck, 
  RefreshCw, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    closeProductDetail,
    formatPrice,
    addToCart,
    isWishlisted,
    toggleWishlist,
    setIsCartOpen,
    setIsCheckoutOpen,
    showToast,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize>('M');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [copiedSku, setCopiedSku] = useState(false);

  // Accordion states
  const [openSection, setOpenSection] = useState<'desc' | 'fabric' | 'shipping'>('desc');

  const currentSizeStock =
    selectedProduct?.sizes.find((s) => s.size === selectedSize)?.stock ?? 0;

  const copySkuToClipboard = () => {
    if (!selectedProduct) return;
    navigator.clipboard.writeText(selectedProduct.sku);
    setCopiedSku(true);
    showToast(`Copied SKU: ${selectedProduct.sku}`);
    setTimeout(() => setCopiedSku(false), 2000);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    const success = addToCart(selectedProduct, selectedSize, quantity);
    if (success) {
      closeProductDetail();
    }
  };

  const handleBuyNow = () => {
    if (!selectedProduct) return;
    const success = addToCart(selectedProduct, selectedSize, quantity);
    if (success) {
      closeProductDetail();
      setIsCartOpen(false);
      setIsCheckoutOpen(true);
    }
  };

  const availableSizes: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <AnimatePresence>
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeProductDetail}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          <div className="min-h-full flex items-center justify-center p-2 sm:p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 shadow-2xl rounded-xs overflow-hidden border border-neutral-200 dark:border-neutral-800 transition-colors"
            >
              {/* Close button */}
              <button
                onClick={closeProductDetail}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 dark:bg-neutral-800/80 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors shadow-xs cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left: Product Images Gallery */}
                <div className="p-4 sm:p-6 bg-neutral-50 dark:bg-neutral-950 flex flex-col justify-between">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 rounded-xs border border-neutral-200 dark:border-neutral-800">
                    <img
                      src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    />

                    {selectedProduct.discountPercentage && selectedProduct.discountPercentage > 0 && (
                      <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-neutral-900/90 text-white flex items-center justify-center text-xs font-bold shadow-md">
                        -{selectedProduct.discountPercentage}%
                      </div>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {selectedProduct.images.length > 1 && (
                    <div className="flex items-center gap-3 mt-4">
                      {selectedProduct.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative w-16 h-20 rounded-xs overflow-hidden border transition-all cursor-pointer ${
                            activeImageIndex === idx
                              ? 'border-neutral-950 dark:border-white ring-1 ring-neutral-950 dark:ring-white'
                              : 'border-neutral-200 dark:border-neutral-800 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Product Details & Purchase Form */}
                <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
                  <div>
                    {/* Category & Collection */}
                    <div className="flex items-center justify-between text-xs tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
                      <span>{selectedProduct.category}</span>
                      <span className="font-mono text-neutral-400">{selectedProduct.collection}</span>
                    </div>

                    {/* Title */}
                    <h2 className="mt-1 text-lg sm:text-xl font-medium text-neutral-950 dark:text-white">
                      {selectedProduct.name}
                    </h2>

                    {/* SKU (Stock Keeping Unit) with quick copy */}
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">SKU:</span>
                      <span className="font-mono text-xs font-bold text-neutral-800 dark:text-neutral-200">
                        {selectedProduct.sku}
                      </span>
                      <button
                        onClick={copySkuToClipboard}
                        className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                        title="Copy SKU code"
                      >
                        {copiedSku ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Price */}
                    <div className="mt-3 flex items-baseline gap-3">
                      {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                        <span className="text-sm text-neutral-400 line-through">
                          {formatPrice(selectedProduct.originalPrice)}
                        </span>
                      )}
                      <span className="text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white">
                        {formatPrice(selectedProduct.price)}
                      </span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        Tax Included
                      </span>
                    </div>

                    {/* Size Selector Header */}
                    <div className="mt-6 flex items-center justify-between">
                      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                        Select Size: <span className="font-bold text-black dark:text-white">{selectedSize}</span>
                      </label>
                      <button
                        onClick={() => setShowSizeGuide(!showSizeGuide)}
                        className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-black dark:hover:text-white underline cursor-pointer"
                      >
                        <Ruler className="w-3 h-3" />
                        <span>Size Chart</span>
                      </button>
                    </div>

                    {/* Size Guide Popup Box */}
                    {showSizeGuide && (
                      <div className="my-3 p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs rounded-xs">
                        <p className="font-bold mb-2 uppercase tracking-wide">Size Guide (Inches)</p>
                        <div className="grid grid-cols-5 text-center gap-1 font-mono text-[11px]">
                          <div className="font-bold">Size</div>
                          <div className="font-bold">Chest</div>
                          <div className="font-bold">Waist</div>
                          <div className="font-bold">Hips</div>
                          <div className="font-bold">Length</div>
                          <div>XS</div><div>34"</div><div>28"</div><div>36"</div><div>42"</div>
                          <div>S</div><div>36"</div><div>30"</div><div>38"</div><div>42"</div>
                          <div>M</div><div>38"</div><div>32"</div><div>40"</div><div>43"</div>
                          <div>L</div><div>41"</div><div>35"</div><div>43"</div><div>44"</div>
                          <div>XL</div><div>44"</div><div>38"</div><div>46"</div><div>44"</div>
                        </div>
                      </div>
                    )}

                    {/* Size Buttons */}
                    <div className="mt-2.5 flex items-center gap-2">
                      {availableSizes.map((sz) => {
                        const sizeStock = selectedProduct.sizes.find((s) => s.size === sz)?.stock ?? 0;
                        const inStock = sizeStock > 0;
                        const isSelected = selectedSize === sz;

                        return (
                          <button
                            key={sz}
                            disabled={!inStock}
                            onClick={() => setSelectedSize(sz)}
                            className={`flex-1 py-2 text-xs font-medium border rounded-xs transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-neutral-950 text-white border-neutral-950 dark:bg-white dark:text-neutral-950'
                                : inStock
                                ? 'border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-black dark:hover:border-white'
                                : 'border-neutral-200 dark:border-neutral-800 text-neutral-300 dark:text-neutral-600 line-through cursor-not-allowed bg-neutral-50 dark:bg-neutral-900'
                            }`}
                          >
                            {sz}
                          </button>
                        );
                      })}
                    </div>

                    {/* Real-time Inventory Stock Feedback */}
                    <div className="mt-2 text-xs">
                      {currentSizeStock > 5 ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          In Stock ({currentSizeStock} available)
                        </span>
                      ) : currentSizeStock > 0 ? (
                        <span className="text-amber-600 dark:text-amber-400 font-medium">
                          Hurry, only {currentSizeStock} left in stock for size {selectedSize}!
                        </span>
                      ) : (
                        <span className="text-red-500 font-medium">
                          Sold out in size {selectedSize}
                        </span>
                      )}
                    </div>

                    {/* Quantity and Actions */}
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-xs">
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="px-3 py-2 text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 py-2 text-xs font-bold tabular-nums min-w-[2rem] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity((q) => Math.min(currentSizeStock, q + 1))}
                          disabled={quantity >= currentSizeStock}
                          className="px-3 py-2 text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white disabled:opacity-40 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={handleAddToCart}
                        disabled={currentSizeStock === 0}
                        className="flex-1 py-3 px-4 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs uppercase tracking-widest font-semibold rounded-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-40 cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>ADD TO BAG</span>
                      </button>

                      <button
                        onClick={() => toggleWishlist(selectedProduct.id)}
                        className="p-3 border border-neutral-300 dark:border-neutral-700 rounded-xs hover:border-black dark:hover:border-white transition-colors cursor-pointer"
                        aria-label="Wishlist"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isWishlisted(selectedProduct.id)
                              ? 'fill-red-600 text-red-600'
                              : 'text-neutral-700 dark:text-neutral-300'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Instant Buy Now Button */}
                    <button
                      onClick={handleBuyNow}
                      disabled={currentSizeStock === 0}
                      className="w-full mt-2 py-3 border border-neutral-950 dark:border-white text-neutral-950 dark:text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 transition-colors disabled:opacity-40 cursor-pointer"
                    >
                      BUY NOW WITH 1-CLICK
                    </button>

                    {/* Trust Badges */}
                    <div className="mt-5 grid grid-cols-3 gap-2 border-t border-b border-neutral-200 dark:border-neutral-800 py-3 text-center text-[10px] text-neutral-600 dark:text-neutral-400">
                      <div className="flex flex-col items-center gap-1">
                        <Truck className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                        <span>2-4 Days Delivery</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <RefreshCw className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                        <span>7-Day Return Policy</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                        <span>100% Authentic Lawn</span>
                      </div>
                    </div>

                    {/* Details Accordions */}
                    <div className="mt-5 space-y-2 text-xs">
                      {/* Description */}
                      <div className="border border-neutral-200 dark:border-neutral-800 rounded-xs overflow-hidden">
                        <button
                          onClick={() => setOpenSection(openSection === 'desc' ? ('' as any) : 'desc')}
                          className="w-full p-3 flex items-center justify-between font-semibold tracking-wider uppercase text-left bg-neutral-50 dark:bg-neutral-950 cursor-pointer"
                        >
                          <span>Description</span>
                          {openSection === 'desc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                        {openSection === 'desc' && (
                          <div className="p-3 text-neutral-600 dark:text-neutral-400 space-y-2">
                            <p>{selectedProduct.description}</p>
                            <p className="font-medium text-neutral-900 dark:text-neutral-200">
                              Color: {selectedProduct.color}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Fabric & Care */}
                      <div className="border border-neutral-200 dark:border-neutral-800 rounded-xs overflow-hidden">
                        <button
                          onClick={() => setOpenSection(openSection === 'fabric' ? ('' as any) : 'fabric')}
                          className="w-full p-3 flex items-center justify-between font-semibold tracking-wider uppercase text-left bg-neutral-50 dark:bg-neutral-950 cursor-pointer"
                        >
                          <span>Fabric &amp; Care</span>
                          {openSection === 'fabric' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                        {openSection === 'fabric' && (
                          <div className="p-3 text-neutral-600 dark:text-neutral-400 space-y-2">
                            <p className="font-medium text-neutral-900 dark:text-neutral-200">
                              Composition:
                            </p>
                            <p>{selectedProduct.fabric}</p>
                            <p className="font-medium text-neutral-900 dark:text-neutral-200 mt-2">
                              Care Instructions:
                            </p>
                            <ul className="list-disc list-inside space-y-1">
                              {selectedProduct.careInstructions.map((c, i) => (
                                <li key={i}>{c}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Shipping & Handling */}
                      <div className="border border-neutral-200 dark:border-neutral-800 rounded-xs overflow-hidden">
                        <button
                          onClick={() => setOpenSection(openSection === 'shipping' ? ('' as any) : 'shipping')}
                          className="w-full p-3 flex items-center justify-between font-semibold tracking-wider uppercase text-left bg-neutral-50 dark:bg-neutral-950 cursor-pointer"
                        >
                          <span>Shipping &amp; Delivery</span>
                          {openSection === 'shipping' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                        {openSection === 'shipping' && (
                          <div className="p-3 text-neutral-600 dark:text-neutral-400 space-y-1.5">
                            <p>· Flat delivery fee of PKR 250 across all cities in Pakistan.</p>
                            <p>· Free standard delivery on domestic orders above PKR 15,000.</p>
                            <p>· Free DHL/FedEx international delivery on orders above $300.</p>
                            <p>· Cash on Delivery (COD) available nationwide.</p>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
