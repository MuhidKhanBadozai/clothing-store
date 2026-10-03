import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { ProductSize } from '../types/inventory';
import { X, RotateCcw } from 'lucide-react';

export const FilterDrawer: React.FC = () => {
  const {
    isFilterOpen,
    setIsFilterOpen,
    activeCategory,
    setActiveCategory,
    activeFabricFilter,
    setActiveFabricFilter,
    selectedSizes,
    toggleSizeFilter,
    priceRange,
    setPriceRange,
    onlyInStock,
    setOnlyInStock,
    resetFilters,
    formatPrice,
  } = useStore();

  const categories = [
    'ALL',
    'WOMEN',
    'MEN',
    'SALE',
    'NEW ARRIVALS',
    'READY TO WEAR',
    'UNSTITCHED FABRIC',
    'HOME',
  ];

  const FABRIC_TYPES = [
    'Linen',
    'Khaddar',
    'Karandi',
    'Marina',
    'Jacquard',
    'Pashmina',
    'Wool',
    'Printed silk',
    'Lawn'
  ];

  const sizes: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <AnimatePresence>
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsFilterOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="absolute inset-y-0 left-0 max-w-sm w-full bg-white dark:bg-neutral-900 shadow-2xl flex flex-col justify-between border-r border-neutral-200 dark:border-neutral-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="font-sans font-bold text-sm tracking-wider uppercase text-neutral-900 dark:text-neutral-100">
                Filter Collection
              </h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-1 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white cursor-pointer"
                aria-label="Close Filter"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              {/* Categories */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-2">
                  Category
                </label>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`block w-full text-left px-2 py-1.5 text-xs rounded-xs transition-colors cursor-pointer ${
                        activeCategory === cat
                          ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-bold'
                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabric Type Filter */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                    Fabric Type
                  </label>
                  {activeFabricFilter !== 'ALL' && (
                    <button
                      onClick={() => setActiveFabricFilter('ALL')}
                      className="text-[11px] text-red-500 hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setActiveFabricFilter('ALL')}
                    className={`text-left px-2 py-1.5 text-xs rounded-xs transition-colors cursor-pointer ${
                      activeFabricFilter === 'ALL'
                        ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-bold'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    All Fabrics
                  </button>
                  {FABRIC_TYPES.map((fabric) => {
                    const isSelected = activeFabricFilter.toLowerCase() === fabric.toLowerCase();
                    return (
                      <button
                        key={fabric}
                        onClick={() => setActiveFabricFilter(fabric)}
                        className={`text-left px-2 py-1.5 text-xs rounded-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-bold'
                            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        }`}
                      >
                        {fabric}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Filter */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-2">
                  Size
                </label>
                <div className="flex items-center gap-2">
                  {sizes.map((s) => {
                    const isSelected = selectedSizes.includes(s);
                    return (
                      <button
                        key={s}
                        onClick={() => toggleSizeFilter(s)}
                        className={`flex-1 py-2 text-xs font-medium border rounded-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-neutral-950 text-white border-neutral-950 dark:bg-white dark:text-neutral-950'
                            : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-black dark:hover:border-white'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                    Max Price
                  </label>
                  <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white">
                    {formatPrice(priceRange[1])}
                  </span>
                </div>
                <input
                  type="range"
                  min="3000"
                  max="100000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-neutral-900 dark:accent-white cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                  <span>{formatPrice(3000)}</span>
                  <span>{formatPrice(100000)}</span>
                </div>
              </div>

              {/* In Stock Only Toggle */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                  Only Show Items in Stock
                </span>
                <button
                  onClick={() => setOnlyInStock(!onlyInStock)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    onlyInStock ? 'bg-neutral-950 dark:bg-white' : 'bg-neutral-300 dark:bg-neutral-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white dark:bg-neutral-900 shadow ring-0 transition duration-200 ease-in-out ${
                      onlyInStock ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 px-3 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-semibold uppercase tracking-wider rounded-xs hover:border-black dark:hover:border-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="flex-1 py-2.5 px-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded-xs hover:opacity-90 transition-opacity cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
