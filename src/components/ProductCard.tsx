import React, { useState } from 'react';
import { Product, ProductSize } from '../types/inventory';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    isWishlisted,
    toggleWishlist,
    openProductDetail,
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [addedSize, setAddedSize] = useState<ProductSize | null>(null);

  const discountPercent =
    product.discountPercentage ||
    (product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null);

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL'] as ProductSize[];

  const handleSizeClick = (e: React.MouseEvent, size: ProductSize) => {
    e.stopPropagation();
    setSelectedSize(size);
    const success = addToCart(product, size, 1);
    if (success) {
      setAddedSize(size);
      setTimeout(() => setAddedSize(null), 1500);
    }
  };

  return (
    <div
      className="group relative flex flex-col cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => openProductDetail(product)}
    >
      {/* Image Container with Luxury Aspect Ratio */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
        
        {/* Main Image with Hover Switch */}
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Circular Discount Tag (-30%) - Exact styling from d2.png */}
        {discountPercent && discountPercent > 0 && (
          <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-neutral-800/80 dark:bg-neutral-900/90 text-white backdrop-blur-xs flex items-center justify-center text-xs font-semibold tracking-tighter shadow-md">
            -{discountPercent}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xs text-neutral-800 dark:text-neutral-200 hover:text-red-500 hover:scale-110 transition-all shadow-xs"
          aria-label="Save to Wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted(product.id)
                ? 'fill-red-600 text-red-600'
                : 'text-neutral-800 dark:text-neutral-200'
            }`}
          />
        </button>

        {/* Fabric Tag Badge on Image */}
        {(product.fabricTag || product.fabric) && (
          <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full bg-neutral-900/80 dark:bg-white/90 text-white dark:text-neutral-900 backdrop-blur-xs text-[10px] font-semibold tracking-wider uppercase shadow-xs">
            {product.fabricTag || product.fabric}
          </div>
        )}

        {/* Quick View Button on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductDetail(product);
            }}
            className="w-full py-2.5 bg-white/95 dark:bg-neutral-950/95 text-neutral-900 dark:text-white text-xs uppercase tracking-widest font-semibold backdrop-blur-xs shadow-md hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details Section - Replicating d2.png format */}
      <div className="pt-3 pb-2 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-100 line-clamp-1 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
          {product.name}
        </h3>

        {/* SKU (Stock Keeping Unit) & Fabric Tag */}
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {product.sku}
          </span>
          <span className="text-[10px] text-neutral-400">·</span>
          <span className="text-[10px] font-medium text-amber-700 dark:text-amber-400 uppercase tracking-tight bg-amber-50 dark:bg-amber-950/50 px-1.5 py-0.2 rounded-xs border border-amber-200 dark:border-amber-800/60">
            {product.fabricTag || product.fabric || 'Lawn'}
          </span>
          {product.collection && (
            <>
              <span className="text-[10px] text-neutral-400">·</span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-tight">
                {product.collection}
              </span>
            </>
          )}
        </div>

        {/* Price Row: Original (Struck-through) + Discounted - Matches d2.png */}
        <div className="mt-1 flex items-baseline gap-2 text-xs sm:text-sm">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-neutral-400 dark:text-neutral-500 line-through text-xs font-normal">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="font-bold text-neutral-950 dark:text-white tracking-tight">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Size Selector Buttons: XS, S, M, L, XL - Matches d2.png */}
        <div className="mt-2 sm:mt-2.5 flex items-center gap-1 sm:gap-1.5 flex-wrap">
          {availableSizes.map((sz) => {
            const sizeData = product.sizes.find((s) => s.size === sz);
            const inStock = sizeData ? sizeData.stock > 0 : false;
            const stockCount = sizeData ? sizeData.stock : 0;
            const isJustAdded = addedSize === sz;

            return (
              <button
                key={sz}
                disabled={!inStock}
                onClick={(e) => handleSizeClick(e, sz)}
                title={inStock ? `Size ${sz} (${stockCount} in stock) - Click to Add` : `Size ${sz} Out of Stock`}
                className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-[9px] sm:text-xs font-medium border rounded-xs transition-all cursor-pointer ${
                  isJustAdded
                    ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900'
                    : inStock
                    ? 'border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-black dark:hover:border-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    : 'border-neutral-200 dark:border-neutral-800 text-neutral-300 dark:text-neutral-600 line-through cursor-not-allowed bg-neutral-50/50 dark:bg-neutral-900/50'
                }`}
              >
                {isJustAdded ? <Check className="w-3 h-3" /> : sz}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
