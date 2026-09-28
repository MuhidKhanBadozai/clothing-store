import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Check, Boxes, MapPin, Phone, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAccount: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAccount }) => {
  const { setActiveCategory, setIsAdminPanelOpen, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    showToast('Subscribed to VIP previews and new seasonal drops!');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-12 border-t border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="font-brand text-2xl sm:text-3xl text-white tracking-[0.25em] uppercase">
              FAMA
            </h2>
            <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
              Established in 1989, FAMA represents the pinnacle of Pakistani luxury pret, couture, and contemporary pret. Pioneers in celebrating rich artisanal heritage through modern, minimalist expressions.
            </p>
            <div className="flex items-center gap-4 text-xs text-neutral-400 pt-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                Karachi · Lahore · Islamabad
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                021-111-003-005
              </span>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 lg:pl-10 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white">
              Stay in the Know
            </h3>
            <p className="text-xs text-neutral-400">
              Receive exclusive early access to Summer Lawn releases, couture showcases, and flash sales.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-neutral-900 border border-neutral-700 rounded-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-white text-neutral-950 text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-neutral-200 transition-colors shrink-0"
              >
                {subscribed ? <Check className="w-4 h-4 text-emerald-600" /> : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Navigation Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-neutral-800 text-xs">
          {/* Shop */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4">
              Explore Collections
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('READY TO WEAR');
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Ready to Wear
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('UNSTITCHED FABRIC');
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Unstitched Lawn '26
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('SS WESST');
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  SS Wesst Modern
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('SALE');
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  className="text-red-400 hover:text-red-300 font-semibold transition-colors"
                >
                  Summer Sale (-30%)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('COUTURE');
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Bridal &amp; Couture
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <button onClick={onOpenAccount} className="hover:text-white transition-colors">
                  Track Consignment
                </button>
              </li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Shipping &amp; Flat PKR 250 Delivery</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">7-Day Return Policy</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Size Guide &amp; Fit Advisor</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Store Locator</span></li>
            </ul>
          </div>

          {/* About & Policies */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4">
              Legal &amp; Heritage
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">The Atelier Heritage</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Fabric &amp; Artisan Craftsmanship</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Terms &amp; Conditions</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Privacy &amp; Cookie Policy</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Ethical Sourcing</span></li>
            </ul>
          </div>

          {/* Backend Inventory Portal Entry */}
          <div>
            <h4 className="font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Boxes className="w-3.5 h-3.5" />
              <span>Backend Management</span>
            </h4>
            <p className="text-[11px] text-neutral-400 mb-3 leading-relaxed">
              Internal SKU-based warehouse inventory control and multi-size tracking.
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Guarantee */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 FAMA. All rights reserved. Registered trademark.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Genuine Guaranteed</span>
            <span>·</span>
            <span>SSL Secured Checkout</span>
            <span>·</span>
            <span>Nationwide COD Available</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
