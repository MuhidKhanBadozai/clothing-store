import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { CustomerOrder } from '../types/inventory';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  Building2, 
  ShieldCheck, 
  ArrowLeft 
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    formatPrice,
    placeOrder,
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Karachi');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'CARD' | 'BANK_TRANSFER'>('COD');

  const [completedOrder, setCompletedOrder] = useState<CustomerOrder | null>(null);

  const FREE_SHIPPING_THRESHOLD = 15000;
  const shippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : 250;
  const orderTotal = cartSubtotal + shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !email || !phone || !address) {
      alert('Please fill out all required customer shipping fields.');
      return;
    }

    const order = placeOrder({
      customerName,
      email,
      phone,
      address,
      city,
      paymentMethod,
    });

    setCompletedOrder(order);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="min-h-full flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 shadow-2xl rounded-xs overflow-hidden border border-neutral-200 dark:border-neutral-800"
            >
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
            <div className="flex items-center gap-2">
              <span className="font-serif-brand tracking-widest text-sm font-bold uppercase text-neutral-900 dark:text-white">
                Sana Safinaz Luxury Checkout
              </span>
            </div>
            <button
              onClick={handleClose}
              className="p-1 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {completedOrder ? (
            /* Order Success State */
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-neutral-900 dark:text-white">
                Thank You for Your Order!
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
                Your order has been recorded in our inventory management system. Our concierge team is processing your items for swift dispatch.
              </p>

              {/* Order Details Card */}
              <div className="mt-6 p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xs text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
                  <span className="text-neutral-500">Order Reference:</span>
                  <span className="font-mono font-bold">{completedOrder.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Recipient:</span>
                  <span className="font-semibold">{completedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Destination:</span>
                  <span>{completedOrder.city}, Pakistan</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Payment:</span>
                  <span className="font-mono uppercase">{completedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-200 dark:border-neutral-800 pt-2 font-bold text-sm">
                  <span>Total Paid:</span>
                  <span>{formatPrice(completedOrder.total)}</span>
                </div>

                <div className="mt-3 pt-3 border-t border-dashed border-neutral-200 dark:border-neutral-800">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">
                    SKU Line Items:
                  </span>
                  {completedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-[11px] text-neutral-600 dark:text-neutral-400">
                      <span>{it.quantity}x {it.name} ({it.size}) · <span className="font-mono">{it.sku}</span></span>
                      <span>{formatPrice(it.price * it.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="px-6 py-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs uppercase tracking-widest font-semibold hover:opacity-90"
                >
                  Return to Store
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
              {/* Items summary pill banner */}
              <div className="p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xs flex items-center justify-between text-xs">
                <span className="text-neutral-600 dark:text-neutral-400">
                  Purchasing {cart.length} item(s) from Sana Safinaz
                </span>
                <span className="font-bold text-neutral-950 dark:text-white">
                  Total: {formatPrice(orderTotal)}
                </span>
              </div>

              {/* Shipping Address Form */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  <span>1. Delivery Details</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-neutral-500 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ayesha Khan"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-500 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="ayesha@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-neutral-500 mb-1">Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-500 mb-1">City *</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white focus:outline-none focus:border-black"
                    >
                      <option value="Karachi">Karachi</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Multan">Multan</option>
                      <option value="Quetta">Quetta</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="International">International Delivery</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-500 mb-1">Complete Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="House/Apartment #, Street, Phase / Block, Area"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>2. Payment Option</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <label
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-3 border rounded-xs cursor-pointer flex flex-col justify-between transition-colors ${
                      paymentMethod === 'COD'
                        ? 'border-neutral-950 bg-neutral-100 dark:border-white dark:bg-neutral-800 font-semibold'
                        : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    <span>Cash on Delivery</span>
                    <span className="text-[10px] text-neutral-500 mt-1">Pay at doorstep</span>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('CARD')}
                    className={`p-3 border rounded-xs cursor-pointer flex flex-col justify-between transition-colors ${
                      paymentMethod === 'CARD'
                        ? 'border-neutral-950 bg-neutral-100 dark:border-white dark:bg-neutral-800 font-semibold'
                        : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    <span>Credit / Debit Card</span>
                    <span className="text-[10px] text-neutral-500 mt-1">Visa / Mastercard</span>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('BANK_TRANSFER')}
                    className={`p-3 border rounded-xs cursor-pointer flex flex-col justify-between transition-colors ${
                      paymentMethod === 'BANK_TRANSFER'
                        ? 'border-neutral-950 bg-neutral-100 dark:border-white dark:bg-neutral-800 font-semibold'
                        : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    <span>Direct Bank Wire</span>
                    <span className="text-[10px] text-neutral-500 mt-1">Online Transfer</span>
                  </label>
                </div>
              </div>

              {/* Order Action Buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex items-center gap-1 text-xs text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm Order · {formatPrice(orderTotal)}</span>
                </button>
              </div>
            </form>
          )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
