import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { CategoryStoryCircles } from './components/CategoryStoryCircles';
import { HeroBanner } from './components/HeroBanner';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FilterDrawer } from './components/FilterDrawer';
import { SearchModal } from './components/SearchModal';
import { AdminSkuPanel } from './components/AdminSkuPanel';
import { MobileDrawer } from './components/MobileDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AccountModal } from './components/AccountModal';
import { Footer } from './components/Footer';
import { Check } from 'lucide-react';

function StoreFront() {
  const { toastMessage, activeCategory } = useStore();
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
      {/* Toast Notification with Smooth Motion */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-50 max-w-sm bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 px-4 py-3 rounded-xs shadow-2xl flex items-center gap-2.5 text-xs font-medium border border-neutral-800 dark:border-neutral-200"
          >
            <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header with Top Ticker & Brand Logo */}
      <Header onOpenAccount={() => setIsAccountOpen(true)} />

      {/* Mobile Sliding Drawer Navigation - Matches d1.png */}
      <MobileDrawer onOpenAccount={() => setIsAccountOpen(true)} />

      <main className="flex-1">
        {/* Story Category Circles Carousel - Matches d1.png */}
        <CategoryStoryCircles />

        {/* Hero Banner (Shown on ALL/Home) with smooth animation */}
        <AnimatePresence mode="wait">
          {activeCategory === 'ALL' && (
            <motion.div
              key="hero-banner"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HeroBanner />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Product Catalog Grid - Matches d2.png */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <ProductGrid />
        </motion.div>
      </main>

      {/* Slide-out & Modal Drawers (all animated with AnimatePresence) */}
      <CartDrawer />
      <CheckoutModal />
      <FilterDrawer />
      <SearchModal />
      <WishlistDrawer />
      <ProductDetailModal />

      {/* Dedicated SKU Backend Inventory Management System */}
      <AdminSkuPanel />

      {/* Member Account / Consignment Tracking Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />

      {/* Footer */}
      <Footer onOpenAccount={() => setIsAccountOpen(true)} />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StoreFront />
    </StoreProvider>
  );
}
