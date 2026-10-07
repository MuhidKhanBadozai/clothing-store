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
import { ContactPage } from './components/ContactPage';
import { TrackConsignment } from './components/pages/TrackConsignment';
import { ShippingPolicy } from './components/pages/ShippingPolicy';
import { ReturnPolicy } from './components/pages/ReturnPolicy';
import { SizeGuide } from './components/pages/SizeGuide';
import { StoreLocator } from './components/pages/StoreLocator';
import { AtelierHeritage } from './components/pages/AtelierHeritage';
import { FabricCraftsmanship } from './components/pages/FabricCraftsmanship';
import { TermsConditions } from './components/pages/TermsConditions';
import { PrivacyPolicy } from './components/pages/PrivacyPolicy';
import { EthicalSourcing } from './components/pages/EthicalSourcing';
import { Check } from 'lucide-react';

// Pages that replace the main storefront view
const STATIC_PAGES: Record<string, React.ReactNode> = {
  'CONTACT US': <ContactPage />,
  'TRACK CONSIGNMENT': <TrackConsignment />,
  'SHIPPING': <ShippingPolicy />,
  'RETURN POLICY': <ReturnPolicy />,
  'SIZE GUIDE': <SizeGuide />,
  'STORE LOCATOR': <StoreLocator />,
  'ATELIER HERITAGE': <AtelierHeritage />,
  'FABRIC CRAFTSMANSHIP': <FabricCraftsmanship />,
  'TERMS': <TermsConditions />,
  'PRIVACY': <PrivacyPolicy />,
  'ETHICAL SOURCING': <EthicalSourcing />,
};

function StoreFront() {
  const { toastMessage, activeCategory } = useStore();
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const staticPage = STATIC_PAGES[activeCategory];

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
      {/* Toast */}
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

      <Header onOpenAccount={() => setIsAccountOpen(true)} />
      <MobileDrawer onOpenAccount={() => setIsAccountOpen(true)} />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {staticPage ? (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              {staticPage}
            </motion.div>
          ) : (
            <motion.div
              key="storefront"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <CategoryStoryCircles />

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

              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ProductGrid />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <CartDrawer />
      <CheckoutModal />
      <FilterDrawer />
      <SearchModal />
      <WishlistDrawer />
      <ProductDetailModal />
      <AdminSkuPanel />
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />

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
