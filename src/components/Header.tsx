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
      {/* {!topBannerDismissed && (
        <div className="bg-[#111111] dark:bg-neutral-900 text-white text-[11px] sm:text-xs py-2 px-4 border-b border-neutral-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="overflow-hidden whitespace-nowrap text-neutral-300 tracking-wide font-light flex-1">
              <span className="inline-block animate-marquee sm:animate-none">
                In Pakistan, a flat fee of PKR 250 applies to all orders. Free shipping on orders above PKR 15,000 (T&amp;C apply) · UAN/WhatsApp: 021-111-003-005 · Customer Support 24/7
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
      )} */}

      {/* Main Bar */}
      <div className="px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-20 relative">

          {/* Far Left: Hamburger Menu + Currency */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 z-10">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="group flex items-center gap-1.5 sm:gap-2 text-xs uppercase tracking-widest font-medium py-1.5 px-2 rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 text-neutral-900 dark:text-neutral-100 group-hover:scale-105 transition-transform" />
              <span className="hidden sm:inline-block font-sans text-neutral-900 dark:text-neutral-100 font-semibold text-xs tracking-wider">
                Menu
              </span>
            </button>

            {/* Currency indicator (shown from sm up; mobile has it in drawer) */}
            <div className="hidden sm:flex items-center text-xs tracking-wider text-neutral-600 dark:text-neutral-400 border-l border-neutral-200 dark:border-neutral-800 pl-3">
              <span className="px-1.5 py-0.5 font-bold text-neutral-900 dark:text-neutral-100">
                PKR
              </span>
            </div>
          </div>

          {/* Absolute Center: FAMMA Logo & Tagline */}
          <div className="absolute left-1/2 -translate-x-1/2 max-w-[130px] xs:max-w-[170px] sm:max-w-none text-center pointer-events-auto">
            <button
              onClick={() => {
                setActiveCategory('ALL');
                setActiveFabricFilter('ALL');
                resetFilters();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group text-center focus:outline-none flex flex-col items-center cursor-pointer"
            >
              <h1 className="font-brand text-lg xs:text-xl sm:text-3xl md:text-4xl font-normal text-neutral-950 dark:text-white tracking-[0.16em] sm:tracking-[0.22em] transition-transform duration-200 group-hover:opacity-80 leading-none">
                FAMMA
              </h1>
              <p className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.28em] text-neutral-500 dark:text-neutral-400 mt-0.5 sm:mt-1 font-light truncate max-w-full">
                Fashion for Every Moment
              </p>
            </button>
          </div>

          {/* Far Right: Actions */}
          <div className="ml-auto flex items-center gap-0.5 xs:gap-1 sm:gap-2.5 text-xs tracking-wider shrink-0 z-10">
            {/* Contact Page Link */}
            <button
              onClick={() => {
                setActiveCategory('CONTACT US');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hidden md:inline-flex items-center gap-1 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white font-medium uppercase px-2 py-1.5 transition-colors cursor-pointer"
            >
              <span>CONTACT</span>
            </button>

            {/* Account / Log in */}
            {/* <button
              onClick={onOpenAccount}
              className="hidden md:inline-flex items-center gap-1 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white font-medium uppercase px-2 py-1.5 transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>LOG IN</span>
            </button> */}

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 sm:px-2 sm:py-1.5 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white uppercase font-medium transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Search Catalog"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">SEARCH</span>
            </button>

            {/* Dark Mode Switch (Hidden on mobile to save space, available inside mobile drawer) */}
            <button
              onClick={toggleDarkMode}
              className="hidden sm:inline-flex p-2 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white rounded-full transition-colors cursor-pointer"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-1.5 sm:p-2 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              aria-label="View Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[8px] sm:text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-1 sm:gap-1.5 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-semibold px-2.5 sm:px-3 py-1.5 rounded-sm hover:opacity-90 transition-opacity cursor-pointer"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CART ({cartCount})</span>
              <span className="sm:hidden font-mono text-[11px] font-bold leading-none">
                {cartCount}
              </span>
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
                className={`relative px-2.5 py-1 transition-colors whitespace-nowrap ${cat.highlight
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
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${activeFabricFilter === 'ALL'
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
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${isSelected
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
