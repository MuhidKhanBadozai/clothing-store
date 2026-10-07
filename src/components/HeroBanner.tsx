import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   SLIDES — all focused on unstitched fabric collections
───────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    badge: 'Unstitched Lawn \'26',
    heading: ['Pure Lawn.', 'Raw Beauty.'],
    sub: 'Unstitched & waiting for your artisan.',
    cta: { label: 'Explore Unstitched', cat: 'UNSTITCHED FABRIC' },
    // Wide pastoral fashion editorial — garden, full body, airy
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=90',
    imgPos: 'center center',
    accent: '#D4A853',
    overlay: 'from-black/80 via-black/40 to-transparent',
  },
  {
    badge: 'Khaddar & Karandi',
    heading: ['Winter', 'Weaves.'],
    sub: 'Handwoven warmth — cut to your silhouette.',
    cta: { label: 'Shop Khaddar', cat: 'UNSTITCHED FABRIC' },
    // Wide fabric market / textile display scene
    img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1920&q=90',
    imgPos: 'center center',
    accent: '#B5895A',
    overlay: 'from-black/82 via-black/42 to-transparent',
  },
  {
    badge: 'Chikankari & Jacquard',
    heading: ['Embroidered', 'Legacy.'],
    sub: 'Intricate motifs on premium unstitched canvas.',
    cta: { label: 'Discover Jacquard', cat: 'UNSTITCHED FABRIC' },
    // Wide outdoor editorial fashion — full silhouette visible
    img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1920&q=90',
    imgPos: 'center 30%',
    accent: '#C9A87C',
    overlay: 'from-black/80 via-black/38 to-transparent',
  },
];

/* ─────────────────────────────────────────────────────────────
   TICKER items — types of clothing / fabrics
───────────────────────────────────────────────────────────── */
const TICKER_ITEMS = [
  'Lawn Unstitched',
  '✦',
  'Khaddar',
  '✦',
  'Karandi',
  '✦',
  'Chikankari',
  '✦',
  'Jacquard',
  '✦',
  'Viscose',
  '✦',
  'Marina',
  '✦',
  'Pashmina',
  '✦',
  'Linen',
  '✦',
  'Printed Silk',
  '✦',
  'Wool Blend',
  '✦',
  'Digital Print Lawn',
  '✦',
  'Embroidered Lawn',
  '✦',
  'Cotton Satin',
  '✦',
  'Raw Silk',
  '✦',
];

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */
export const HeroBanner: React.FC = () => {
  const { setActiveCategory } = useStore();
  const [active, setActive] = useState(0);
  const [fading, setFading]   = useState(false);

  // Auto-advance every 5.5 s
  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive(p => (p + 1) % SLIDES.length);
        setFading(false);
      }, 450);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const goTo = (i: number) => {
    if (i === active || fading) return;
    setFading(true);
    setTimeout(() => { setActive(i); setFading(false); }, 350);
  };

  const s = SLIDES[active];

  return (
    <section className="relative w-full flex flex-col" style={{ minHeight: '100svh' }}>

      {/* ── BACKGROUND IMAGE ───────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ transition: 'opacity 0.55s ease', opacity: fading ? 0 : 1 }}
      >
        <img
          referrerPolicy="no-referrer"
          src={s.img}
          alt={s.badge}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.30) saturate(0.80)', objectPosition: s.imgPos }}
        />
      </div>

      {/* Left gradient for text */}
      <div className={`absolute inset-0 bg-gradient-to-r ${s.overlay}`} />
      {/* Top-to-transparent subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

      {/* ── MAIN CONTENT ───────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">

        {/* Centre section — hero copy */}
        <div className="flex-1 flex items-end pb-24 sm:pb-32 px-6 sm:px-12 lg:px-20">
          <div className="max-w-3xl space-y-5">

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2.5"
              style={{ opacity: fading ? 0 : 1, transform: fading ? 'translateY(10px)' : 'none', transition: 'all 0.45s ease 0.05s' }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: s.accent }}
              />
              <span
                className="text-[10px] uppercase tracking-[0.35em] font-semibold"
                style={{ color: s.accent }}
              >
                {s.badge}
              </span>
            </div>

            {/* Headline */}
            <div
              style={{ opacity: fading ? 0 : 1, transform: fading ? 'translateY(14px)' : 'none', transition: 'all 0.48s ease 0.1s' }}
            >
              <h1 className="font-brand text-[clamp(3.5rem,10vw,8rem)] font-light text-white leading-[0.9] tracking-tight">
                {s.heading[0]}<br />
                <span className="italic font-normal" style={{ color: s.accent }}>{s.heading[1]}</span>
              </h1>
            </div>

            {/* Subline */}
            <p
              className="text-base sm:text-lg text-white/55 font-light leading-relaxed max-w-md"
              style={{ opacity: fading ? 0 : 1, transform: fading ? 'translateY(10px)' : 'none', transition: 'all 0.48s ease 0.15s' }}
            >
              {s.sub}
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-3 pt-2"
              style={{ opacity: fading ? 0 : 1, transform: fading ? 'translateY(10px)' : 'none', transition: 'all 0.48s ease 0.2s' }}
            >
              <button
                onClick={() => { setActiveCategory(s.cta.cat); window.scrollTo({ top: 420, behavior: 'smooth' }); }}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs uppercase tracking-widest font-bold transition-all duration-200 hover:scale-[1.02]"
                style={{ backgroundColor: s.accent, color: '#111' }}
              >
                {s.cta.label}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => { setActiveCategory('SALE'); window.scrollTo({ top: 420, behavior: 'smooth' }); }}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/25 text-white text-xs uppercase tracking-widest font-medium hover:border-white/70 hover:bg-white/8 transition-all duration-200"
              >
                Summer Sale — 30% Off
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>

        {/* Slide nav — vertical right strip */}
        <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-20">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="flex flex-col items-center gap-1 group"
            >
              <span
                className="block rounded-full transition-all duration-500"
                style={{
                  width: i === active ? '3px' : '2px',
                  height: i === active ? '36px' : '16px',
                  backgroundColor: i === active ? s.accent : 'rgba(255,255,255,0.3)',
                }}
              />
              <span
                className="text-[8px] font-bold tracking-widest uppercase transition-opacity duration-300"
                style={{ color: i === active ? s.accent : 'rgba(255,255,255,0.3)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile dot nav */}
        <div className="lg:hidden absolute bottom-28 right-5 flex gap-2 z-20">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="h-[3px] rounded-full transition-all duration-400"
              style={{
                width: i === active ? '28px' : '10px',
                backgroundColor: i === active ? s.accent : 'rgba(255,255,255,0.35)',
              }}
            />
          ))}
        </div>

        {/* ── TICKER BANNER ──────────────────────────────────── */}
        <div className="relative z-10 bg-black/60 backdrop-blur-sm border-t border-white/10 overflow-hidden h-10 flex items-center">
          {/* Gold accent left label */}
          <div
            className="shrink-0 flex items-center gap-2 px-5 pr-6 border-r z-10 h-full"
            style={{ borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <span
              className="text-[9px] uppercase tracking-[0.3em] font-bold whitespace-nowrap"
              style={{ color: SLIDES[active].accent }}
            >
              Our Fabrics
            </span>
          </div>

          {/* Scrolling track — duplicate items for seamless loop */}
          <div className="flex overflow-hidden flex-1">
            <div className="flex gap-6 animate-marquee whitespace-nowrap items-center pl-8">
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                <span
                  key={i}
                  onClick={() => {
                    if (item !== '✦') {
                      setActiveCategory('UNSTITCHED FABRIC');
                      window.scrollTo({ top: 420, behavior: 'smooth' });
                    }
                  }}
                  className={`text-[11px] font-medium tracking-wider shrink-0 transition-colors ${
                    item === '✦'
                      ? 'opacity-25 text-white cursor-default'
                      : 'text-white/60 hover:text-white cursor-pointer'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
