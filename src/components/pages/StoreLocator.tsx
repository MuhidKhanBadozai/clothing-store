import React, { useState } from 'react';
import { MapPin, Phone, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const stores = [
  {
    city: 'Karachi',
    branches: [
      {
        name: 'FAMMA Flagship — Clifton',
        address: 'Plot 5-C, Commercial Lane 3, Phase V, DHA Clifton, Karachi',
        phone: '021-3580-0119',
        hours: 'Mon–Sat: 11:00 AM – 10:00 PM\nSun: 12:00 PM – 9:00 PM',
      },
      {
        name: 'FAMMA — Dolmen Mall Clifton',
        address: 'Ground Floor, Dolmen Mall, Block-4, Clifton, Karachi',
        phone: '021-3580-0220',
        hours: 'Mon–Sun: 11:00 AM – 10:30 PM',
      },
    ],
  },
  {
    city: 'Lahore',
    branches: [
      {
        name: 'FAMMA — Liberty Market',
        address: 'Shop 14, Block C, Liberty Market, Gulberg III, Lahore',
        phone: '042-3571-0084',
        hours: 'Mon–Sat: 10:30 AM – 9:30 PM\nSun: 12:00 PM – 8:00 PM',
      },
      {
        name: 'FAMMA — Packages Mall',
        address: 'Level 1, Packages Mall, Walton Road, Lahore',
        phone: '042-3571-0099',
        hours: 'Mon–Sun: 11:00 AM – 10:30 PM',
      },
    ],
  },
  {
    city: 'Islamabad',
    branches: [
      {
        name: 'FAMMA — Centaurus Mall',
        address: 'Level 2, The Centaurus, Jinnah Avenue, Islamabad',
        phone: '051-2800-119',
        hours: 'Mon–Sun: 11:00 AM – 10:00 PM',
      },
    ],
  },
];

export const StoreLocator: React.FC = () => {
  const [expanded, setExpanded] = useState<string>(stores[0].city);

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-neutral-950 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500 mb-3">Customer Care</p>
          <h1 className="text-3xl font-light text-neutral-950 dark:text-white tracking-tight mb-3">Store Locator</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Visit us at any of our flagship and outlet stores across Pakistan.
          </p>
        </div>

        <div className="space-y-3">
          {stores.map(({ city, branches }) => (
            <div key={city} className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <button
                onClick={() => setExpanded(expanded === city ? '' : city)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">{city}</span>
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500">{branches.length} store{branches.length > 1 ? 's' : ''}</span>
                </div>
                {expanded === city ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
              </button>

              {expanded === city && (
                <div className="border-t border-neutral-100 dark:border-neutral-800 divide-y divide-neutral-100 dark:divide-neutral-800">
                  {branches.map((branch, i) => (
                    <div key={i} className="px-6 py-5 space-y-3">
                      <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">{branch.name}</p>
                      <div className="flex items-start gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-neutral-300 dark:text-neutral-600" />
                        <span>{branch.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                        <Phone className="w-3.5 h-3.5 shrink-0 text-neutral-300 dark:text-neutral-600" />
                        <span>{branch.phone}</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                        <Clock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-neutral-300 dark:text-neutral-600" />
                        <span className="whitespace-pre-line">{branch.hours}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-xs text-neutral-400 dark:text-neutral-500 space-y-1">
          <p>Can't find a store near you?</p>
          <p className="text-neutral-600 dark:text-neutral-300 font-medium">Shop online with nationwide delivery at flat PKR 250.</p>
        </div>
      </div>
    </div>
  );
};
