import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Menu, 
  Search, 
  ShoppingBag, 
  Heart, 
  Moon, 
  Sun, 
  User, 
  Boxes, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  onOpenAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAccount }) => {
  const {
    activeCategory,
    setActiveCategory,
    isDarkMode,
    toggleDarkMode,
    currency,
    setCurrency,
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsMobileMenuOpen,
    setIsAdminPanelOpen,
    resetFilters,
  } = useStore();

  const [topBannerDismissed, setTopBannerDismissed] = useState(false);

  const categories = [
    { label: 'ALL', value: 'ALL' },
    { label: 'SALE', value: 'SALE', highlight: true },
    { label: 'NEW ARRIVALS', value: 'NEW ARRIVALS' },
    { label: 'READY TO WEAR', value: 'READY TO WEAR' },
    { label: 'UNSTITCHED FABRIC', value: 'UNSTITCHED FABRIC' },
    { label: 'SS WESST', value: 'SS WESST' },
    { label: 'KIDS', value: 'KIDS' },
    { label: 'ACCESSORIES', value: 'ACCESSORIES' },
    { label: 'COUTURE', value: 'COUTURE' },
    { label: 'BRIDAL', value: 'BRIDAL' },
    { label: 'HOME', value: 'HOME' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-200">
      {/* Top Announcement Bar - Matches d1.png */}
      {!topBannerDismissed && (
        <div className="bg-[#111111] dark:bg-neutral-900 text-white text-[11px] sm:text-xs py-2 px-4 border-b border-neutral-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="overflow-hidden whitespace-nowrap text-neutral-300 tracking-wide font-light flex-1">
              <span className="inline-block animate-marquee sm:animate-none">
                In Pakistan, a flat fee of PKR 250 applies to all orders. Free international shipping on orders above $300 (T&amp;C apply) · UAN/WhatsApp: 021-111-003-005 · Customer Support 24/7
              </span>
            </div>
            <button
              onClick={() => setTopBannerDismissed(true)}
              className="text-neutral-400 hover:text-white text-xs px-1 cursor-pointer shrink-0"
              aria-label="Dismiss banner"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Mobile Menu & Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="group flex items-center gap-2 text-xs uppercase tracking-widest font-medium py-2 px-2.5 rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 text-neutral-900 dark:text-neutral-100 group-hover:scale-105 transition-transform" />
              <span className="hidden sm:inline-block font-sans text-neutral-900 dark:text-neutral-100 font-semibold text-xs tracking-wider">
                Menu
              </span>
            </button>

            {/* Currency selector on desktop */}
            <div className="hidden lg:flex items-center text-xs tracking-wider text-neutral-600 dark:text-neutral-400 border-l border-neutral-200 dark:border-neutral-800 pl-3">
              <button
                onClick={() => setCurrency('PKR')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  currency === 'PKR'
                    ? 'font-bold text-neutral-900 dark:text-neutral-100'
                    : 'hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                PKR (Rs)
              </button>
              <span className="text-neutral-300 dark:text-neutral-700">/</span>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  currency === 'USD'
                    ? 'font-bold text-neutral-900 dark:text-neutral-100'
                    : 'hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>

          {/* Center: Brand Regal Typography Logo */}
          <div className="flex-1 flex justify-center text-center">
            <button
              onClick={() => {
                setActiveCategory('ALL');
                resetFilters();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group text-center focus:outline-none"
            >
              <h1 className="font-brand text-2xl sm:text-3xl md:text-4xl font-normal text-neutral-950 dark:text-white tracking-[0.22em] transition-transform duration-200">
                FAMA
              </h1>
              <p className="text-[9px] uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-400 -mt-1 font-light">
                Luxury Pret · Couture · Wesst
              </p>
            </button>
          </div>

          {/* Right: Actions (Log in, Search, Dark mode, Wishlist, Cart, SKU Admin) */}
          <div className="flex items-center gap-1 sm:gap-3 text-xs tracking-wider">
            {/* Account / Log in */}
            <button
              onClick={onOpenAccount}
              className="hidden md:inline-flex items-center gap-1 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white font-medium uppercase px-2 py-1.5 transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>LOG IN</span>
            </button>

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white uppercase font-medium px-2 py-1.5 transition-colors"
              aria-label="Search Catalog"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">SEARCH</span>
            </button>

            {/* Dark Mode Switch */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white rounded-full transition-colors"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
              aria-label="View Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart - Matches screenshot format "CART (0)" */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-1.5 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-semibold px-3 py-1.5 rounded-sm hover:opacity-90 transition-opacity"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>CART ({cartCount})</span>
            </button>
          </div>
        </div>

        {/* Desktop Category Navigation Bar */}
        <nav className="hidden md:flex items-center justify-center gap-1 lg:gap-6 py-2.5 border-t border-neutral-100 dark:border-neutral-800/60 overflow-x-auto text-xs tracking-widest uppercase font-medium">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => {
                  setActiveCategory(cat.value);
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
                className={`relative px-2 py-1 transition-colors whitespace-nowrap ${
                  cat.highlight
                    ? 'text-red-600 dark:text-red-400 font-bold'
                    : isActive
                    ? 'text-neutral-950 dark:text-white font-bold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                }`}
              >
                {cat.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-neutral-950 dark:bg-white transition-all" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
