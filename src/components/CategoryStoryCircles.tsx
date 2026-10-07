import React, { useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StoryItem {
  name: string;
  categoryValue: string;
  fabricValue?: string;
  image: string;
  badge?: string;
}

export const CategoryStoryCircles: React.FC = () => {
  const { activeCategory, setActiveCategory, activeFabricFilter, setActiveFabricFilter } = useStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const stories: StoryItem[] = [
    {
      name: 'SALE',
      categoryValue: 'SALE',
      // Red sale tag / price tag concept
      image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=400&q=80',
      badge: '-30%',
    },
    {
      name: 'NEW ARRIVALS',
      categoryValue: 'NEW ARRIVALS',
      // Folded fabric stack with ribbon — fresh arrival vibe
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'WOMEN',
      categoryValue: 'WOMEN',
      // Elegant floral embroidery / rose detail texture
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'MEN',
      categoryValue: 'MEN',
      // Tailored suit fabric / dark textured weave
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'READY TO WEAR',
      categoryValue: 'READY TO WEAR',
      // Hanging garments on rack
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'UNSTITCHED',
      categoryValue: 'UNSTITCHED FABRIC',
      // Rolled fabric bolts / textile rolls
      image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'PRINTED SILK',
      categoryValue: 'UNSTITCHED FABRIC',
      fabricValue: 'Printed silk',
      // Silk fabric with floral print draped
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'LAWN',
      categoryValue: 'UNSTITCHED FABRIC',
      fabricValue: 'Lawn',
      // Light cotton lawn fabric with floral print
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'HOME',
      categoryValue: 'HOME',
      // Cozy home textiles — cushions, throws
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 my-2">
      {/* Scroll Left Button */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full bg-white/90 dark:bg-neutral-800/90 shadow-md border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:scale-105 transition-transform cursor-pointer"
        aria-label="Previous categories"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Story Circle Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-4 sm:gap-8 md:gap-10 overflow-x-auto no-scrollbar scroll-smooth px-3 sm:px-6 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {stories.map((story) => {
          const isFabricItem = Boolean(story.fabricValue);
          const isSelected = story.fabricValue
            ? activeCategory === story.categoryValue && activeFabricFilter === story.fabricValue
            : activeCategory === story.categoryValue && (!isFabricItem || activeFabricFilter === 'ALL');
          return (
            <button
              key={`${story.categoryValue}-${story.name}`}
              onClick={() => {
                setActiveCategory(story.categoryValue);
                setActiveFabricFilter(story.fabricValue || 'ALL');
                window.scrollTo({ top: 350, behavior: 'smooth' });
              }}
              className="group flex flex-col items-center shrink-0 cursor-pointer focus:outline-none"
            >
              <div
                className={`relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden p-0.5 sm:p-1 transition-all duration-300 ${isSelected
                  ? 'ring-2 ring-neutral-900 dark:ring-white scale-105'
                  : 'ring-1 ring-neutral-200 dark:ring-neutral-700 group-hover:ring-neutral-400 group-hover:scale-105'
                  }`}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img
                    referrerPolicy="no-referrer"
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </div>
                {story.badge && (
                  <span className="absolute bottom-1 right-1.5 sm:right-2 bg-red-600 text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.2 sm:py-0.5 rounded-full shadow">
                    {story.badge}
                  </span>
                )}
              </div>
              <span
                className={`mt-2 sm:mt-2.5 text-[10px] sm:text-xs tracking-wider uppercase font-semibold transition-colors ${isSelected
                  ? 'text-neutral-950 dark:text-white border-b border-neutral-950 dark:border-white pb-0.5'
                  : 'text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-950 dark:group-hover:text-white'
                  }`}
              >
                {story.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full bg-white/90 dark:bg-neutral-800/90 shadow-md border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:scale-105 transition-transform cursor-pointer"
        aria-label="Next categories"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};