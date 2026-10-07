import React, { useState } from 'react';
import { Package, Search, CheckCircle, Clock, Truck, MapPin } from 'lucide-react';

export const TrackConsignment: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) setSearched(true);
  };

  const steps = [
    { icon: CheckCircle, label: 'Order Confirmed', desc: 'Your order has been placed and confirmed.', done: true },
    { icon: Package, label: 'Packed & Dispatched', desc: 'Items carefully packed by our warehouse team.', done: true },
    { icon: Truck, label: 'In Transit', desc: 'Your consignment is on its way.', done: false },
    { icon: MapPin, label: 'Out for Delivery', desc: 'Expected delivery within 24 hours.', done: false },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-neutral-950 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500 mb-3">Customer Care</p>
          <h1 className="text-3xl font-light text-neutral-950 dark:text-white tracking-tight mb-3">Track Your Consignment</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md mx-auto">
            Enter your order ID or tracking number to see the real-time status of your FAMMA delivery.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="e.g. FAMA-ORD-123456"
              value={trackingId}
              onChange={e => setTrackingId(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs uppercase tracking-widest font-semibold hover:opacity-85 transition-opacity"
          >
            Track
          </button>
        </form>

        {/* Result */}
        {searched && (
          <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Order ID</p>
                <p className="text-base font-semibold text-neutral-900 dark:text-white">{trackingId}</p>
              </div>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400 px-3 py-1.5 border border-amber-200 dark:border-amber-800">
                In Transit
              </span>
            </div>

            {/* Timeline */}
            <div className="relative pl-6">
              <div className="absolute left-2 top-3 bottom-3 w-px bg-neutral-200 dark:bg-neutral-800" />
              <div className="space-y-8">
                {steps.map((step, i) => (
                  <div key={i} className="relative flex items-start gap-4">
                    <div className={`absolute -left-6 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center border-2 ${step.done ? 'border-neutral-950 dark:border-white bg-neutral-950 dark:bg-white' : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900'}`}>
                      {step.done && <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-neutral-950" />}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${step.done ? 'text-neutral-950 dark:text-white' : 'text-neutral-400 dark:text-neutral-600'}`}>{step.label}</p>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800">
              <p className="text-xs text-neutral-400 dark:text-neutral-500">
                Need help? Contact us at <span className="text-neutral-700 dark:text-neutral-300 font-medium">03200119800</span> or WhatsApp during business hours.
              </p>
            </div>
          </div>
        )}

        {!searched && (
          <div className="text-center py-12 border border-dashed border-neutral-200 dark:border-neutral-800">
            <Clock className="w-8 h-8 text-neutral-300 dark:text-neutral-700 mx-auto mb-3" />
            <p className="text-sm text-neutral-400 dark:text-neutral-500">Enter your order ID above to begin tracking</p>
          </div>
        )}
      </div>
    </div>
  );
};
