import React from 'react';
import { useStore } from '../context/StoreContext';
import { MapPin, Phone } from 'lucide-react';

interface FooterProps {
  onOpenAccount: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAccount }) => {
  const { setActiveCategory } = useStore();

  const nav = (page: string) => {
    setActiveCategory(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Brand Statement */}
        <div className="pb-12 border-b border-neutral-800">
          <h2 className="font-brand text-2xl sm:text-3xl text-white tracking-[0.25em] uppercase mb-1">FAMMA</h2>
          <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500 font-light mb-4">Fashion for Every Moment</p>
          <p className="text-xs text-neutral-400 max-w-md leading-relaxed mb-4">
            Established in 1989, FAMMA represents the pinnacle of luxury pret, unstitched artisanal fabrics, and contemporary silhouettes. Pioneers in celebrating rich eastern craftsmanship.
          </p>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-600" />
              Karachi · Lahore · Islamabad
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-neutral-600" />
              03200119800
            </span>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-neutral-800 text-xs">

          {/* Collections */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-4">Collections</h4>
            <ul className="space-y-2.5 text-neutral-400">
              {[
                { label: "Women's", value: 'WOMEN' },
                { label: "Men's", value: 'MEN' },
                { label: 'Ready to Wear', value: 'READY TO WEAR' },
                { label: 'Unstitched Lawn', value: 'UNSTITCHED FABRIC' },
                { label: 'Summer Sale', value: 'SALE', red: true },
                { label: 'Home Ensembles', value: 'HOME' },
              ].map(item => (
                <li key={item.value}>
                  <button
                    onClick={() => {
                      setActiveCategory(item.value);
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className={`hover:text-white transition-colors ${item.red ? 'text-red-400 hover:text-red-300 font-semibold' : ''}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          {/* <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <button onClick={onOpenAccount} className="hover:text-white transition-colors text-left">
                  Track Consignment
                </button>
              </li>
              <li>
                <button onClick={() => nav('SHIPPING')} className="hover:text-white transition-colors text-left">
                  Shipping & Flat PKR 250 Delivery
                </button>
              </li>
              <li>
                <button onClick={() => nav('RETURN POLICY')} className="hover:text-white transition-colors text-left">
                  7-Day Return Policy
                </button>
              </li>
              <li>
                <button onClick={() => nav('SIZE GUIDE')} className="hover:text-white transition-colors text-left">
                  Size Guide & Fit Advisor
                </button>
              </li>
              <li>
                <button onClick={() => nav('STORE LOCATOR')} className="hover:text-white transition-colors text-left">
                  Store Locator
                </button>
              </li>
            </ul>
          </div> */}

          {/* Legal & Heritage */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-4">Legal & Heritage</h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <button onClick={() => nav('ATELIER HERITAGE')} className="hover:text-white transition-colors text-left">
                  The Atelier Heritage
                </button>
              </li>
              <li>
                <button onClick={() => nav('FABRIC CRAFTSMANSHIP')} className="hover:text-white transition-colors text-left">
                  Fabric & Artisan Craftsmanship
                </button>
              </li>
              <li>
                <button onClick={() => nav('TERMS')} className="hover:text-white transition-colors text-left">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => nav('PRIVACY')} className="hover:text-white transition-colors text-left">
                  Privacy & Cookie Policy
                </button>
              </li>
              <li>
                <button onClick={() => nav('ETHICAL SOURCING')} className="hover:text-white transition-colors text-left">
                  Ethical Sourcing
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider mb-4">Get in Touch</h4>
            <ul className="space-y-2.5 text-neutral-400 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('CONTACT US');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li className="leading-relaxed">WhatsApp: 03200119800</li>
              <li className="leading-relaxed">Mon–Sat: 10 AM – 8 PM</li>
              <li className="leading-relaxed text-neutral-500">fammaclothingpk@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} FAMMA. All rights reserved. Registered trademark.</p>
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
