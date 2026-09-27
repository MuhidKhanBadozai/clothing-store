import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    products,
    formatPrice,
    openProductDetail,
    toggleWishlist,
    addToCart,
  } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsWishlistOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="absolute inset-y-0 right-0 max-w-md w-full bg-white dark:bg-neutral-900 shadow-2xl flex flex-col justify-between border-l border-neutral-200 dark:border-neutral-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                <h3 className="font-sans font-bold text-sm tracking-wider uppercase text-neutral-900 dark:text-neutral-100">
                  Saved Wishlist ({wishlist.length})
                </h3>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-1 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white cursor-pointer"
                aria-label="Close Wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-100 dark:divide-neutral-800">
              {wishlistedProducts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
                    <Heart className="w-8 h-8" />
                  </div>
                  <p className="font-medium text-sm text-neutral-700 dark:text-neutral-300">
                    Your wishlist is currently empty.
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs">
                    Save pieces you love by tapping the heart icon on any outfit.
                  </p>
                </div>
              ) : (
                wishlistedProducts.map((product) => (
                  <div key={product.id} className="py-4 flex gap-4">
                    <div
                      onClick={() => {
                        setIsWishlistOpen(false);
                        openProductDetail(product);
                      }}
                      className="w-20 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-xs overflow-hidden shrink-0 cursor-pointer"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4
                            onClick={() => {
                              setIsWishlistOpen(false);
                              openProductDetail(product);
                            }}
                            className="text-xs font-medium text-neutral-900 dark:text-neutral-100 hover:underline cursor-pointer line-clamp-1"
                          >
                            {product.name}
                          </h4>
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="text-neutral-400 hover:text-red-500 cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="font-mono text-[10px] text-neutral-500 mt-0.5">
                          SKU: {product.sku}
                        </div>

                        <div className="mt-1 font-bold text-xs text-neutral-950 dark:text-white">
                          {formatPrice(product.price)}
                        </div>
                      </div>

                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => {
                            addToCart(product, 'M', 1);
                            setIsWishlistOpen(false);
                          }}
                          className="px-3 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[11px] font-semibold uppercase tracking-wider rounded-xs hover:opacity-90 flex items-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {wishlistedProducts.length > 0 && (
              <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-center">
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="text-xs uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white cursor-pointer"
                >
                  Continue Browsing Collection
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
