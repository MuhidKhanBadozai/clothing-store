import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { X, User, Lock, Mail, Phone, PackageCheck, HeadphonesIcon } from 'lucide-react';
import { inventoryService } from '../services/inventoryService';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useStore();
  const [tab, setTab] = useState<'LOGIN' | 'TRACK'>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orderQuery, setOrderQuery] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<any | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Welcome back, ${email.split('@')[0]}!`);
    onClose();
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orders = inventoryService.getOrders();
    const match = orders.find(
      (o) => o.orderId.toUpperCase() === orderQuery.trim().toUpperCase()
    );
    if (match) {
      setTrackedOrder(match);
    } else {
      setTrackedOrder({
        orderId: orderQuery.toUpperCase(),
        status: 'IN TRANSIT WITH LEOPARDS COURIER',
        estimatedDelivery: 'Within 48 hours',
        city: 'Destination Hub',
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="min-h-full flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-white dark:bg-neutral-900 shadow-2xl rounded-xs overflow-hidden border border-neutral-200 dark:border-neutral-800"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                <h3 className="font-serif-brand font-medium text-sm tracking-wider uppercase text-neutral-900 dark:text-white">
                  Sana Safinaz Member Portal
                </h3>
                <button
                  onClick={onClose}
                  className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-2 border-b border-neutral-200 dark:border-neutral-800 text-xs uppercase tracking-widest font-semibold text-center">
                <button
                  onClick={() => setTab('LOGIN')}
                  className={`py-3.5 transition-colors cursor-pointer ${
                    tab === 'LOGIN'
                      ? 'border-b-2 border-black dark:border-white text-black dark:text-white bg-white dark:bg-neutral-900'
                      : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 bg-neutral-50 dark:bg-neutral-950'
                  }`}
                >
                  Account Sign In
                </button>
                <button
                  onClick={() => setTab('TRACK')}
                  className={`py-3.5 transition-colors cursor-pointer ${
                    tab === 'TRACK'
                      ? 'border-b-2 border-black dark:border-white text-black dark:text-white bg-white dark:bg-neutral-900'
                      : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 bg-neutral-50 dark:bg-neutral-950'
                  }`}
                >
                  Track Order
                </button>
              </div>

              <div className="p-6">
                {tab === 'LOGIN' ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="client@luxury.com"
                          className="w-full pl-9 pr-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none focus:border-black dark:focus:border-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1.5">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-9 pr-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none focus:border-black dark:focus:border-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span>Remember me</span>
                      </label>
                      <a href="#" className="hover:underline">
                        Forgot Password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity mt-4 cursor-pointer"
                    >
                      Sign In
                    </button>

                    <p className="text-center text-xs text-neutral-500 mt-4">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => showToast('Membership invitation sent to your email.')}
                        className="text-neutral-900 dark:text-white underline font-medium"
                      >
                        Create Account
                      </button>
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleTrackOrder} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1.5">
                        Order Tracking ID / Reference
                      </label>
                      <div className="relative">
                        <PackageCheck className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                        <input
                          type="text"
                          required
                          value={orderQuery}
                          onChange={(e) => setOrderQuery(e.target.value)}
                          placeholder="e.g. SS-ORD-9021"
                          className="w-full pl-9 pr-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none focus:border-black dark:focus:border-white uppercase"
                        />
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        Found in your order confirmation SMS or receipt email.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      Track Package
                    </button>

                    {trackedOrder && (
                      <div className="mt-4 p-4 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs space-y-2">
                        <div className="font-semibold text-neutral-900 dark:text-white">
                          Order: #{trackedOrder.orderId}
                        </div>
                        <div className="text-emerald-600 dark:text-emerald-400 font-medium">
                          Status: {trackedOrder.status}
                        </div>
                        <div className="text-neutral-500">
                          Carrier: Leopards Courier Express (Nationwide)
                        </div>
                      </div>
                    )}
                  </form>
                )}

                {/* Concierge support */}
                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <HeadphonesIcon className="w-3.5 h-3.5" />
                    Customer Support: 021-111-003-005
                  </span>
                  <span className="font-mono">24/7 Concierge</span>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
