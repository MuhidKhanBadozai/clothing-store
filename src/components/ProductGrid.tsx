import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { Product } from '../types/inventory';

export const ProductGrid: React.FC = () => {
  const {
    products,
    activeCategory,
    setActiveCategory,
    setIsFilterOpen,
    sortBy,
    setSortBy,
    selectedSizes,
    toggleSizeFilter,
    priceRange,
    onlyInStock,
    searchQuery,
    setSearchQuery,
    resetFilters,
  } = useStore();

  // Filter products by category, search query, sizes, price range, stock
  const filteredProducts = products.filter((item: Product) => {
    // Category filter
    if (activeCategory === 'SALE') {
      if (!item.discountPercentage || item.discountPercentage <= 0) return false;
    } else if (activeCategory === 'NEW ARRIVALS') {
      if (!item.isNewArrival) return false;
    } else if (activeCategory !== 'ALL' && activeCategory !== 'SHOP BY CATEGORY') {
      if (item.category !== activeCategory) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchSku = item.sku.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      const matchFabric = item.fabric.toLowerCase().includes(q);
      const matchCollection = item.collection.toLowerCase().includes(q);
      if (!matchName && !matchSku && !matchCat && !matchFabric && !matchCollection) {
        return false;
      }
    }

    // Size filter
    if (selectedSizes.length > 0) {
      const hasSizeInStock = item.sizes.some(
        (s) => selectedSizes.includes(s.size) && s.stock > 0
      );
      if (!hasSizeInStock) return false;
    }

    // Price range
    if (item.price < priceRange[0] || item.price > priceRange[1]) {
      return false;
    }

    // Only in stock
    if (onlyInStock) {
      const totalUnits = item.sizes.reduce((sum, s) => sum + s.stock, 0);
      if (totalUnits <= 0) return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'discount') {
      return (b.discountPercentage || 0) - (a.discountPercentage || 0);
    }
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0; // featured default
  });

  const activeFiltersCount =
    (selectedSizes.length > 0 ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 100000 ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Category Title & Description */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4 gap-2">
        <div>
          <h2 className="font-serif-brand font-medium text-xl sm:text-2xl tracking-widest uppercase text-neutral-950 dark:text-white">
            {activeCategory === 'ALL' ? 'Complete Collection' : activeCategory}
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Contemporary silhouettes crafted with timeless eastern artisanal craftsmanship.
          </p>
        </div>

        {/* Quick Tag pills when active filters applied */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-neutral-400">Filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-800 dark:text-neutral-200 text-[11px]">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')}>✕</button>
              </span>
            )}
            {selectedSizes.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-800 dark:text-neutral-200 text-[11px]"
              >
                Size {s}
                <button onClick={() => toggleSizeFilter(s)}>✕</button>
              </span>
            ))}
            <button
              onClick={resetFilters}
              className="text-xs text-red-600 dark:text-red-400 underline hover:no-underline ml-1"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Toolbar - Matches d2.png */}
      <div className="flex items-center justify-between py-3 mb-6">
        {/* Left: Filter Toggle Button */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-xs hover:border-black dark:hover:border-white transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filter</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-[10px] flex items-center justify-center font-bold">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Right: Items Count & Sort By Dropdown - Exactly as in d2.png */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs text-neutral-600 dark:text-neutral-400">
          <span className="tracking-wide font-medium tabular-nums">
            {sortedProducts.length} Items
          </span>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Sort By:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 text-xs px-3 py-1.5 pr-8 rounded-xs cursor-pointer focus:outline-none focus:border-black dark:focus:border-white"
              >
                <option value="featured" className="dark:bg-neutral-900">Featured</option>
                <option value="price-asc" className="dark:bg-neutral-900">Price: Low to High</option>
                <option value="price-desc" className="dark:bg-neutral-900">Price: High to Low</option>
                <option value="discount" className="dark:bg-neutral-900">Biggest Discount</option>
                <option value="newest" className="dark:bg-neutral-900">Newest Arrivals</option>
              </select>
              <ArrowUpDown className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Product Cards - 4 Columns on desktop as in d2.png */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-neutral-300 dark:border-neutral-800 rounded-sm p-8">
          <p className="font-serif text-lg text-neutral-700 dark:text-neutral-300">
            No products match the selected filters or search query.
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
            Try resetting your filters or selecting a different category from the navigation.
          </p>
          <button
            onClick={resetFilters}
            className="mt-5 inline-flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-5 py-2.5 text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
