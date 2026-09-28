import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  ChevronDown, 
  ChevronUp, 
  User, 
  Heart, 
  Boxes, 
  Sun, 
  Moon, 
  Globe 
} from 'lucide-react';

interface MobileDrawerProps {
  onOpenAccount: () => void;
}

interface NavItem {
  name: string;
  categoryValue: string;
  isSale?: boolean;
  subItems?: string[];
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ onOpenAccount }) => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setActiveCategory,
    currency,
    setCurrency,
    isDarkMode,
    toggleDarkMode,
    setIsWishlistOpen,
    setIsAdminPanelOpen,
  } = useStore();

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (name: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const navItems: NavItem[] = [
    {
      name: 'SALE',
      categoryValue: 'SALE',
      isSale: true,
      subItems: ['Ready to Wear Sale', 'Unstitched Sale', 'Wesst Flat 30% Off', 'Shoes & Bags Sale'],
    },
    {
      name: 'NEW ARRIVALS',
      categoryValue: 'NEW ARRIVALS',
      subItems: ["Summer Lawn '26", 'Eid Pret Edit', 'Luxury Jacquard', 'SS Wesst Spring'],
    },
    {
      name: 'SHOP BY CATEGORY',
      categoryValue: 'ALL',
      subItems: ['2-Piece Suits', '3-Piece Suits', 'Kurtas & Tunics', 'Bottoms & Culottes', 'Dupattas & Shawls'],
    },
    {
      name: 'SS WESST',
      categoryValue: 'SS WESST',
      subItems: ['Tailored Blazers', 'Shirts & Blouses', 'Trousers & Culottes', 'Outerwear'],
    },
    {
      name: 'UNSTITCHED FABRIC',
      categoryValue: 'UNSTITCHED FABRIC',
      subItems: ['3-Piece Lawn', 'Luxury Chiffon', 'Zari Jacquard', 'Silk Ensembles'],
    },
    {
      name: 'READY TO WEAR',
      categoryValue: 'READY TO WEAR',
      subItems: ['Basic Printed Viscose', 'Embroidered Lawn', 'Monochrome Pret', 'Festive Silk'],
    },
    {
      name: 'KIDS',
      categoryValue: 'KIDS',
      subItems: ['Girls Eastern', 'Girls Western', 'Boys Kurta', 'Accessories'],
    },
    {
      name: 'ACCESSORIES',
      categoryValue: 'ACCESSORIES',
      subItems: ['Footwear & Khussa', 'Handbags & Clutches', 'Jewelry', 'Scarves & Stoles'],
    },
    {
      name: 'COUTURE',
      categoryValue: 'COUTURE',
      subItems: ['Formal Evening Pret', 'Raw Silk Peshwas', 'Hand Embellished Formals'],
    },
    {
      name: 'BRIDAL',
      categoryValue: 'BRIDAL',
    },
    {
      name: 'HOME',
      categoryValue: 'HOME',
      subItems: ['Bed Linen', 'Embroidered Cushions', 'Table Runners', 'Fragrance & Candles'],
    },
  ];

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with smooth fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />

          {/* Drawer Container - Smooth sliding animation from left */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="absolute inset-y-0 left-0 max-w-sm w-full bg-white dark:bg-neutral-900 shadow-2xl flex flex-col justify-between border-r border-neutral-200 dark:border-neutral-800"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 dark:border-neutral-800">
              <span className="font-sans font-bold text-sm tracking-wider uppercase text-neutral-900 dark:text-neutral-100">
                Menu
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Accordion List */}
            <div className="flex-1 overflow-y-auto px-4 py-3 divide-y divide-neutral-100 dark:divide-neutral-800/80">
              {navItems.map((item) => {
                const hasChildren = Boolean(item.subItems && item.subItems.length > 0);
                const isExpanded = Boolean(expandedSections[item.name]);

                return (
                  <div key={item.name} className="py-2.5">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          setActiveCategory(item.categoryValue);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`text-left text-xs uppercase font-medium tracking-widest transition-colors py-1 flex-1 ${
                          item.isSale
                            ? 'text-red-600 dark:text-red-400 font-bold'
                            : 'text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-300'
                        }`}
                      >
                        {item.name}
                      </button>

                      {hasChildren && (
                        <button
                          onClick={() => toggleSection(item.name)}
                          className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                          aria-label={`Toggle ${item.name} submenu`}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Submenu Accordion */}
                    {hasChildren && isExpanded && (
                      <div className="mt-2 ml-3 pl-3 border-l border-neutral-200 dark:border-neutral-800 space-y-2 py-1">
                        {item.subItems?.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => {
                              setActiveCategory(item.categoryValue);
                              setIsMobileMenuOpen(false);
                            }}
                            className="block text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white py-1 transition-colors text-left w-full"
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Drawer Footer Utilities - Matches bottom of d1.png */}
            <div className="p-5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 space-y-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="flex items-center gap-3 text-xs uppercase tracking-wider font-medium text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white w-full py-1.5 transition-colors cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>ACCOUNT</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsWishlistOpen(true);
                }}
                className="flex items-center gap-3 text-xs uppercase tracking-wider font-medium text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white w-full py-1.5 transition-colors cursor-pointer"
              >
                <Heart className="w-4 h-4" />
                <span>WISHLIST</span>
              </button>

              {/* Theme & Currency settings in mobile drawer */}
              <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5" />
                  <button
                    onClick={() => setCurrency('PKR')}
                    className={`px-1 cursor-pointer ${currency === 'PKR' ? 'font-bold text-neutral-900 dark:text-white' : ''}`}
                  >
                    PKR
                  </button>
                  <span>|</span>
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`px-1 cursor-pointer ${currency === 'USD' ? 'font-bold text-neutral-900 dark:text-white' : ''}`}
                  >
                    USD
                  </button>
                </div>

                <button
                  onClick={toggleDarkMode}
                  className="flex items-center gap-1.5 text-xs text-neutral-700 dark:text-neutral-300 px-2 py-1 rounded bg-neutral-200/50 dark:bg-neutral-800 cursor-pointer"
                >
                  {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
