import React, { useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StoryItem {
  name: string;
  categoryValue: string;
  image: string;
  badge?: string;
}

export const CategoryStoryCircles: React.FC = () => {
  const { activeCategory, setActiveCategory } = useStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const stories: StoryItem[] = [
    {
      name: 'SHOES',
      categoryValue: 'ACCESSORIES',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'ACCESSORIES',
      categoryValue: 'ACCESSORIES',
      image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'KIDS',
      categoryValue: 'KIDS',
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'HOME',
      categoryValue: 'HOME',
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'SS WESST',
      categoryValue: 'SS WESST',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'READY TO WEAR',
      categoryValue: 'READY TO WEAR',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'UNSTITCHED FABRIC',
      categoryValue: 'UNSTITCHED FABRIC',
      image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'COUTURE',
      categoryValue: 'COUTURE',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'SALE',
      categoryValue: 'SALE',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=400&q=80',
      badge: '-30%',
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

      {/* Story Circle Carousel - Exactly matching d1.png */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-6 sm:gap-10 overflow-x-auto no-scrollbar scroll-smooth px-2 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {stories.map((story) => {
          const isSelected = activeCategory === story.categoryValue;
          return (
            <button
              key={story.name}
              onClick={() => {
                setActiveCategory(story.categoryValue);
              }}
              className="group flex flex-col items-center shrink-0 cursor-pointer focus:outline-none"
            >
              <div
                className={`relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden p-1 transition-all duration-300 ${
                  isSelected
                    ? 'ring-2 ring-neutral-900 dark:ring-white scale-105'
                    : 'ring-1 ring-neutral-200 dark:ring-neutral-700 group-hover:ring-neutral-400 group-hover:scale-102'
                }`}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </div>
                {story.badge && (
                  <span className="absolute bottom-1 right-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow">
                    {story.badge}
                  </span>
                )}
              </div>
              <span
                className={`mt-2.5 text-[11px] sm:text-xs tracking-wider uppercase font-semibold transition-colors ${
                  isSelected
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
