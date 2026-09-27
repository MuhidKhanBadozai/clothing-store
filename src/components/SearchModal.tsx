import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { Product } from '../types/inventory';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    formatPrice,
    openProductDetail,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [inputVal, setInputVal] = useState(searchQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      setInputVal(searchQuery);
    }
  }, [isSearchOpen, searchQuery]);

  const popularSearches = [
    'Viscose Culotte',
    'Chikankari Lawn',
    'SS26',
    'Wesst Blazer',
    'Raw Silk Peshwas',
    'Ivory',
    'Mustard Yellow',
    'Jacquard',
  ];

  const searchResults: Product[] = inputVal.trim()
    ? products.filter((p) => {
        const q = inputVal.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q)
        );
      })
    : [];

  const handleApplySearch = (query: string) => {
    setInputVal(query);
    setSearchQuery(query);
    setIsSearchOpen(false);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="min-h-full flex items-start justify-center p-4 sm:p-6 md:p-10 pt-16 sm:pt-20">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden rounded-sm"
            >
              {/* Header with Search Input */}
              <div className="p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
                <Search className="w-5 h-5 text-neutral-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Search by SKU, style, fabric, or keyword..."
                  className="w-full text-base sm:text-lg bg-transparent border-0 outline-none text-neutral-900 dark:text-white placeholder-neutral-400"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleApplySearch(inputVal);
                    }
                  }}
                />
                {inputVal && (
                  <button
                    onClick={() => setInputVal('')}
                    className="p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content / Suggestions */}
              <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto">
                {!inputVal.trim() ? (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-3">
                      Trending Searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => handleApplySearch(term)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                        >
                          <Tag className="w-3 h-3 text-neutral-400" />
                          <span>{term}</span>
                        </button>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                      <p className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-3">
                        Featured Collections
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handleApplySearch('Ready to Wear')}
                          className="flex items-center justify-between p-3 border border-neutral-200 dark:border-neutral-800 text-left hover:border-black dark:hover:border-white transition-colors group"
                        >
                          <span className="text-xs font-medium uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                            Ready to Wear 2026
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                          onClick={() => handleApplySearch('Sale')}
                          className="flex items-center justify-between p-3 border border-red-200 dark:border-red-950/40 bg-red-50/50 dark:bg-red-950/20 text-left hover:border-red-500 transition-colors group"
                        >
                          <span className="text-xs font-medium uppercase tracking-wider text-red-600 dark:text-red-400">
                            Winter Sale Up to 30%
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-red-400 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
                        Found {searchResults.length} {searchResults.length === 1 ? 'item' : 'items'}
                      </p>
                      <button
                        onClick={() => handleApplySearch(inputVal)}
                        className="text-xs text-neutral-900 dark:text-white underline underline-offset-4 hover:opacity-75"
                      >
                        View all results in shop
                      </button>
                    </div>

                    <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            setIsSearchOpen(false);
                            openProductDetail(product);
                          }}
                          className="py-3 flex items-center gap-4 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 px-2 rounded-sm transition-colors group"
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-14 h-18 object-cover bg-neutral-100 dark:bg-neutral-800 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-neutral-400 uppercase tracking-widest mb-0.5">
                              SKU: <span className="font-mono text-neutral-600 dark:text-neutral-300">{product.sku}</span>
                            </p>
                            <h4 className="text-sm font-medium text-neutral-900 dark:text-white truncate group-hover:underline">
                              {product.name}
                            </h4>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                              {product.category} • {product.color} • {product.fabric}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            {product.originalPrice && (
                              <span className="block text-xs line-through text-neutral-400">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                            <span className="font-bold text-neutral-950 dark:text-white">
                              {formatPrice(product.price)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 text-neutral-500">
                    <p className="text-sm">No items matching "{inputVal}"</p>
                    <p className="text-xs mt-1 text-neutral-400">
                      Try checking the SKU spelling or searching for a category like "Viscose", "Lawn", or "Culotte".
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
