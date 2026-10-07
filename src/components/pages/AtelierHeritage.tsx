import React from 'react';
import { Award, Scissors, Sparkles } from 'lucide-react';

export const AtelierHeritage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-neutral-950 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500 mb-3">Legal & Heritage</p>
          <h1 className="text-3xl font-light text-neutral-950 dark:text-white tracking-tight mb-3">The Atelier Heritage</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
            More than three decades of craftsmanship, culture, and couture.
          </p>
        </div>

        {/* Decorative line */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
          <Sparkles className="w-4 h-4 text-neutral-300 dark:text-neutral-700" />
          <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
        </div>

        <div className="space-y-8 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-4 uppercase tracking-wider">Our Founding Story</h2>
            <p className="mb-4">
              FAMMA was born in 1989 in the heart of Karachi's Old City, in a modest atelier where a young master tailor named Daniyal Raza began creating bespoke garments for the city's elite families. What started as a two-person studio — a needle, a thread, and an unwavering commitment to perfection — evolved over the next decade into one of Pakistan's most respected names in luxury pret and artisanal fashion.
            </p>
            <p>
              The name "FAMMA" is derived from an Urdu phrase meaning "Fashion for Every Moment" — a philosophy that guided the brand from its earliest days. Daniyal believed that extraordinary clothing should not be reserved for extraordinary occasions alone. Great craftsmanship, he insisted, should accompany every chapter of a woman's and man's life.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-4 uppercase tracking-wider">Growth & Expansion</h2>
            <p className="mb-4">
              Through the 1990s, FAMMA steadily expanded its repertoire, introducing unstitched luxury fabrics and pioneering the use of indigenous embroidery techniques — particularly chikankari, katha work, and mirror-thread embellishment — in mainstream ready-to-wear. By 1998, the brand had opened its first flagship boutique in Karachi's DHA Clifton district, setting a new benchmark for retail experience in Pakistani fashion.
            </p>
            <p>
              The 2000s saw FAMMA take its craft to Lahore and Islamabad, bringing the rich Karachi aesthetic to new audiences. Each city added its own cultural nuance to the FAMMA vocabulary — the regal Mughal-inspired motifs of Lahore, the clean minimalism preferred by Islamabad's discerning clientele — while the brand's core identity of exceptional quality and honest craftsmanship remained unaltered.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-4 uppercase tracking-wider">Philosophy of Design</h2>
            <p className="mb-4">
              At FAMMA, design is not driven by trend cycles alone. Each seasonal collection begins with a cultural conversation — a study of Pakistani heritage, regional textile traditions, and the evolving needs of modern Pakistani women and men. Our design team, led by Creative Director Sara Raza (daughter of founder Daniyal), draws inspiration from the country's diverse craft vocabulary: the block printing of Sindh, the phulkari needlework of Punjab, the ikat patterns of Multan.
            </p>
            <p>
              This deep respect for craft ancestry is then married with contemporary silhouettes, international colour trends, and the practical demands of modern dressing — resulting in garments that feel both timeless and absolutely of today.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-4 uppercase tracking-wider">A Living Legacy</h2>
            <p>
              Today, FAMMA operates over five flagship stores and an award-winning e-commerce platform serving customers across all 22 cities of Pakistan. The brand employs over 400 skilled artisans, weavers, and craftspeople — many of whom represent multi-generational families whose ancestors have worked in Pakistani textile craft for centuries. FAMMA's atelier in Karachi remains the creative heartbeat of the brand, where every signature piece is conceived, refined, and ultimately brought to life.
            </p>
          </section>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 py-8 border-y border-neutral-200 dark:border-neutral-800">
            {[
              { value: '1989', label: 'Year Founded' },
              { value: '400+', label: 'Artisans Employed' },
              { value: '35+', label: 'Years of Heritage' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-light text-neutral-900 dark:text-white mb-1">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
