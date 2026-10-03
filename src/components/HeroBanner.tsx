import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setActiveCategory } = useStore();

  return (
    <section className="relative w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Editorial Hero Copy */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-200/80 dark:bg-neutral-800 text-[11px] font-semibold uppercase tracking-widest text-neutral-800 dark:text-neutral-200 rounded-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Festive Lawn '26 Showcase</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-neutral-950 dark:text-white leading-[1.1] tracking-tight">
              Artisanal Luxury. <br />
              <span className="italic font-normal">Modern Silhouettes.</span>
            </h1>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-lg font-light leading-relaxed">
              Explore the iconic FAMMA collection — intricately stitched viscose, printed lawn co-ord culottes, and exquisite chikankari threadwork.
            </p>

            <div className="pt-2 flex items-center gap-3 sm:gap-4 flex-wrap">
              <button
                onClick={() => {
                  setActiveCategory('READY TO WEAR');
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-xs uppercase tracking-widest font-semibold rounded-xs hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Shop Ready to Wear</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setActiveCategory('SALE');
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 border border-red-500/80 text-red-600 dark:text-red-400 text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
              >
                Flat 30% Off Sale
              </button>
            </div>
          </div>

          {/* Right: Dual Editorial Fashion Campaign Visuals */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] rounded-xs overflow-hidden shadow-md group">
              <img
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"
                alt="FAMMA Festive Pret"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-xs font-medium tracking-wider uppercase">
                  Chikankari Pret '26
                </span>
              </div>
            </div>

            <div className="relative aspect-[3/4] rounded-xs overflow-hidden shadow-md group mt-6 sm:mt-8">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
                alt="FAMMA Printed Lawn"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-xs font-medium tracking-wider uppercase">
                  Viscose &amp; Culottes
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
