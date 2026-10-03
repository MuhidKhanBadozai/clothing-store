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
    activeFabricFilter,
    setActiveFabricFilter,
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

  // Removed: BRIDAL, COUTURE, ACCESSORIES, KIDS
  const categories = [
    { label: 'ALL', value: 'ALL' },
    { label: 'WOMEN', value: 'WOMEN' },
    { label: 'MEN', value: 'MEN' },
    { label: 'SALE', value: 'SALE', highlight: true },
    { label: 'NEW ARRIVALS', value: 'NEW ARRIVALS' },
    { label: 'READY TO WEAR', value: 'READY TO WEAR' },
    { label: 'UNSTITCHED FABRIC', value: 'UNSTITCHED FABRIC' },
    { label: 'HOME', value: 'HOME' },
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

  return (
    <header className="relative sticky top-0 z-40 w-full bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-200">
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
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 sm:h-20">

          {/* Far Left: Hamburger Menu + Currency */}
          <div className="flex items-center gap-3 shrink-0">
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

            {/* Currency selector */}
            <div className="flex items-center text-xs tracking-wider text-neutral-600 dark:text-neutral-400 border-l border-neutral-200 dark:border-neutral-800 pl-3">
              <button
                onClick={() => setCurrency('PKR')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  currency === 'PKR'
                    ? 'font-bold text-neutral-900 dark:text-neutral-100'
                    : 'hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                PKR
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
                USD
              </button>
            </div>
          </div>

          {/* Absolute Center: FAMMA Logo & Tagline */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <button
              onClick={() => {
                setActiveCategory('ALL');
                setActiveFabricFilter('ALL');
                resetFilters();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group text-center focus:outline-none"
            >
              <h1 className="font-brand text-2xl sm:text-3xl md:text-4xl font-normal text-neutral-950 dark:text-white tracking-[0.22em] transition-transform duration-200 group-hover:opacity-80">
                FAMMA
              </h1>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400 mt-0.5 font-light">
                Fashion for Every Moment
              </p>
            </button>
          </div>

          {/* Far Right: Actions */}
          <div className="ml-auto flex items-center gap-1 sm:gap-3 text-xs tracking-wider shrink-0">
            {/* Contact Page Link */}
            <button
              onClick={() => {
                setActiveCategory('CONTACT US');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hidden md:inline-flex items-center gap-1 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white font-medium uppercase px-2 py-1.5 transition-colors"
            >
              <span>CONTACT</span>
            </button>

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

            {/* Cart */}
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
                  if (cat.value !== 'UNSTITCHED FABRIC') {
                    setActiveFabricFilter('ALL');
                  }
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
                className={`relative px-2.5 py-1 transition-colors whitespace-nowrap ${
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

        {/* Subcategories Bar for UNSTITCHED FABRIC */}
        {activeCategory === 'UNSTITCHED FABRIC' && (
          <div className="py-2.5 px-2 border-t border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 animate-fadeIn">
            <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mr-1 flex items-center gap-1">
                <span>Fabrics:</span>
              </span>
              <button
                onClick={() => setActiveFabricFilter('ALL')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeFabricFilter === 'ALL'
                    ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700'
                }`}
              >
                All Fabrics
              </button>
              {FABRIC_TYPES.map((fabric) => {
                const isSelected = activeFabricFilter.toLowerCase() === fabric.toLowerCase();
                return (
                  <button
                    key={fabric}
                    onClick={() => {
                      setActiveFabricFilter(fabric);
                      window.scrollTo({ top: 380, behavior: 'smooth' });
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs ring-1 ring-neutral-900 dark:ring-white'
                        : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700'
                    }`}
                  >
                    {fabric}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
