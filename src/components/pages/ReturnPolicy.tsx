import React from 'react';
import { RefreshCw, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export const ReturnPolicy: React.FC = () => {
  const eligible = [
    'Items delivered in a damaged or defective condition',
    'Wrong item dispatched (incorrect size, colour, or product)',
    'Fabric defects or manufacturing faults discovered upon first inspection',
    'Items that do not match the product description on the website',
  ];

  const notEligible = [
    'Items that have been worn, washed, altered, or dry-cleaned',
    'Products without original tags, packaging, or invoice',
    'Sale or discounted items marked as "Final Sale"',
    'Unstitched fabric once it has been cut or stitched',
    'Items returned after the 7-day window from the date of delivery',
    'Customised or made-to-order pieces',
    'Items damaged due to misuse or improper storage',
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-neutral-950 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500 mb-3">Customer Care</p>
          <h1 className="text-3xl font-light text-neutral-950 dark:text-white tracking-tight mb-3">7-Day Return Policy</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
            We want you to love every FAMMA piece. If something isn't right, here's how our return process works.
          </p>
        </div>

        {/* Overview */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">Our 7-Day Return Guarantee</h2>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
            FAMMA offers a <strong className="text-neutral-800 dark:text-neutral-200">7-day return window</strong> from the date of delivery for eligible items. We believe in the quality of our craftsmanship, and in the rare event that you receive an item that does not meet our standards, we are committed to making it right.
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            To initiate a return, please contact our customer care team within 7 days of receiving your order. Returns initiated after this period, unfortunately, cannot be processed under any circumstances.
          </p>
        </div>

        {/* Eligible & Not Eligible */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" /> Eligible for Return
            </h2>
            <ul className="space-y-3">
              {eligible.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-400" /> Not Eligible for Return
            </h2>
            <ul className="space-y-3">
              {notEligible.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Process */}
        <div className="space-y-8 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-3 uppercase tracking-wider">How to Initiate a Return</h2>
            <p className="mb-4">
              To begin a return, please follow these steps within 7 days of receiving your order:
            </p>
            <ol className="space-y-3 pl-4">
              {[
                'Contact our customer care team via WhatsApp at 03200119800 or email us at returns@famma.pk, clearly stating your Order ID and the reason for return.',
                'Our team will review your request within 24 hours and, if approved, will share a return address and a prepaid shipping label (for defective/wrong items).',
                'Pack the item securely in its original packaging with all tags intact, along with a copy of the original invoice.',
                'Hand over the parcel to our designated courier partner. Please retain the return tracking number for your records.',
                'Once we receive and inspect the returned item, we will notify you via SMS within 3–5 business days.',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-3 uppercase tracking-wider">Refunds & Exchange</h2>
            <p className="mb-3">
              Upon successful inspection and approval of your return, FAMMA will offer one of the following resolutions:
            </p>
            <p className="mb-3">
              <strong className="text-neutral-800 dark:text-neutral-200">Exchange:</strong> We will ship a replacement of the correct item or size at no additional cost to you. Exchanges are subject to stock availability.
            </p>
            <p className="mb-3">
              <strong className="text-neutral-800 dark:text-neutral-200">Store Credit:</strong> A credit voucher equivalent to the value of the returned item will be issued to your account, valid for 90 days from the date of issue.
            </p>
            <p>
              <strong className="text-neutral-800 dark:text-neutral-200">Refund:</strong> In cases where neither an exchange nor store credit is preferred, a full refund will be processed to your original payment method within 7–10 business days. Shipping fees are non-refundable.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-3 uppercase tracking-wider">Return Shipping Costs</h2>
            <p>
              For returns due to manufacturing defects or incorrect items dispatched by FAMMA, we will bear the full return shipping cost. For all other eligible returns (including size-related returns where the correct size was delivered), the customer is responsible for the cost of return shipping.
            </p>
          </section>

          <div className="flex items-start gap-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4">
            <AlertCircle className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              FAMMA reserves the right to reject any return that does not comply with the conditions outlined in this policy. This return policy is subject to change without prior notice. Please check this page before initiating a return.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
