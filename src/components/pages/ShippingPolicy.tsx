import React from 'react';
import { Truck, Package, Clock, AlertCircle } from 'lucide-react';

export const ShippingPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-neutral-950 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500 mb-3">Customer Care</p>
          <h1 className="text-3xl font-light text-neutral-950 dark:text-white tracking-tight mb-3">Shipping & Delivery</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Flat PKR 250 nationwide delivery on all orders.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Truck, title: 'Flat PKR 250', desc: 'Nationwide flat delivery fee for all orders across Pakistan.' },
            { icon: Package, title: 'Free on PKR 15,000+', desc: 'Complimentary delivery on all orders above PKR 15,000.' },
            { icon: Clock, title: '3–5 Business Days', desc: 'Standard delivery timeframe across all major cities.' },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 text-center">
              <item.icon className="w-6 h-6 text-neutral-400 mx-auto mb-3" />
              <p className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-2">{item.title}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-8 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-3 uppercase tracking-wider">Delivery Coverage</h2>
            <p>
              FAMMA delivers to all major cities and towns across Pakistan including Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Quetta, Multan, Faisalabad, Hyderabad, and beyond. Our logistics partners ensure your order reaches you safely, no matter where you are in the country.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-3 uppercase tracking-wider">Delivery Timeframes</h2>
            <p>
              Orders placed before 3:00 PM (PKT) on business days are processed and dispatched the same day. Orders placed after 3:00 PM, or on weekends and public holidays, are dispatched the following business day. Standard delivery typically takes 3–5 business days depending on your location. Remote areas may require an additional 1–2 business days.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-3 uppercase tracking-wider">Cash on Delivery (COD)</h2>
            <p>
              FAMMA proudly offers nationwide Cash on Delivery. Simply select COD at checkout — no prepayment required. COD orders are subject to the same flat PKR 250 shipping fee. Please ensure someone is available at the delivery address to receive and pay for the order.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-3 uppercase tracking-wider">Order Processing</h2>
            <p>
              Once your order is confirmed, you will receive an SMS or WhatsApp notification with your order details. A second notification will be sent once your consignment has been dispatched, along with a tracking number. You can track your order using our <strong className="text-neutral-800 dark:text-neutral-200">Track Consignment</strong> tool available in the Customer Care section.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-3 uppercase tracking-wider">Packaging Standards</h2>
            <p>
              Every FAMMA order is carefully packed in our signature branded packaging. Delicate fabrics and embroidered pieces are wrapped individually in tissue and sealed to prevent creasing or damage in transit. We take pride in ensuring that your garments arrive in pristine, showroom-ready condition.
            </p>
          </section>

          <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-4">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 dark:text-amber-300">
              For urgent deliveries or bulk orders, please contact our customer care team at <strong>03200119800</strong> before placing your order so we can arrange priority dispatch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
