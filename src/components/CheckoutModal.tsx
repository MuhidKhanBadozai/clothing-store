import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { CustomerOrder } from '../types/inventory';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ArrowLeft,
  AlertCircle,
  MapPin,
  FileText,
  PhoneCall,
  Mail,
  User,
  Loader2
} from 'lucide-react';

const CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Mirpur (AJK)',
  'Other'
];

const PROVINCES = [
  'Sindh',
  'Punjab',
  'Islamabad Capital Territory',
  'Khyber Pakhtunkhwa',
  'Balochistan',
  'Azad Jammu & Kashmir',
  'Gilgit-Baltistan'
];

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
  const [customCity, setCustomCity] = useState('');
  const [province, setProvince] = useState('Sindh');
  const [postalCode, setPostalCode] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'CARD' | 'BANK_TRANSFER'>('COD');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [completedOrder, setCompletedOrder] = useState<CustomerOrder | null>(null);

  const FREE_SHIPPING_THRESHOLD = 15000;
  const shippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : 250;
  const orderTotal = cartSubtotal + shippingFee;

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // 1. Name Check
    if (!customerName.trim()) {
      errors.customerName = 'Full name is required';
    } else if (customerName.trim().length < 3) {
      errors.customerName = 'Please enter a valid full name (at least 3 characters)';
    }

    // 2. Email Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = 'Email address is required';
    } else if (!emailRegex.test(email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    // 3. Phone Check (Pakistani/International format)
    const cleanPhone = phone.replace(/[\s-]/g, '');
    const phoneRegex = /^(\+92|0|92)?[3][0-9]{9}$|^(\+)?[0-9]{10,14}$/;
    if (!phone.trim()) {
      errors.phone = 'Phone number is required for courier contact';
    } else if (cleanPhone.length < 10 || !phoneRegex.test(cleanPhone)) {
      errors.phone = 'Please enter a valid contact number (e.g. 0300 1234567)';
    }

    // 4. Street Address Check
    if (!address.trim()) {
      errors.address = 'Street address is required';
    } else if (address.trim().length < 8) {
      errors.address = 'Please provide complete house/apartment, street, area';
    }

    // 5. City Check
    if (city === 'Other') {
      if (!customCity.trim()) {
        errors.city = 'Please specify your city name';
      } else if (customCity.trim().length < 2) {
        errors.city = 'Please enter a valid city name';
      }
    }

    // 6. Province Check
    if (!province) {
      errors.province = 'Please select your province/region';
    }

    // 7. Postal Code Check
    if (!postalCode.trim()) {
      errors.postalCode = 'Postal / Zip code is required';
    } else if (!/^[0-9A-Za-z\s-]{4,10}$/.test(postalCode.trim())) {
      errors.postalCode = 'Please enter a valid postal code (e.g. 75500)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty. Please add items before checkout.');
      return;
    }

    setIsSubmitting(true);
    try {
      const finalCity = city === 'Other' ? customCity.trim() : city;

      const order = await placeOrder({
        customerName: customerName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        address: address.trim(),
        city: finalCity,
        province,
        postalCode: postalCode.trim(),
        country: 'Pakistan',
        orderNotes: orderNotes.trim() || undefined,
        paymentMethod,
      });

      setCompletedOrder(order);
    } catch (err) {
      console.error('Order placement failed:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
    setFormErrors({});
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
            onClick={!isSubmitting ? handleClose : undefined}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="min-h-full flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 shadow-2xl rounded-sm overflow-hidden border border-neutral-200 dark:border-neutral-800"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                <div className="flex items-center gap-2">
                  <span className="font-serif-brand tracking-widest text-sm font-bold uppercase text-neutral-900 dark:text-white">
                    FAMA Luxury Checkout
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 rounded-full text-neutral-600 dark:text-neutral-300">
                    Secure
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="p-1 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {completedOrder ? (
                /* Order Success State */
                <div className="p-6 sm:p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-neutral-900 dark:text-white">
                    Thank You for Your Order!
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
                    Your order has been recorded in the FAMA inventory and admin management system. You will receive an SMS/WhatsApp dispatch confirmation shortly.
                  </p>

                  {/* Order Details Card */}
                  <div className="mt-6 p-4 sm:p-5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-sm text-left max-w-lg mx-auto space-y-2.5 text-xs">
                    <div className="flex justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
                      <span className="text-neutral-500">Order ID:</span>
                      <span className="font-mono font-bold text-neutral-950 dark:text-white">{completedOrder.orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Customer:</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">{completedOrder.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Contact:</span>
                      <span className="font-mono">{completedOrder.phone} · {completedOrder.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Shipping To:</span>
                      <span className="text-right max-w-[240px]">
                        {completedOrder.address}, {completedOrder.city}, {completedOrder.province} ({completedOrder.postalCode})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Payment Method:</span>
                      <span className="font-mono font-medium uppercase text-neutral-900 dark:text-white">
                        {completedOrder.paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : completedOrder.paymentMethod === 'CARD' ? 'Credit / Debit Card' : 'Direct Bank Wire'}
                      </span>
                    </div>

                    {completedOrder.orderNotes && (
                      <div className="flex justify-between text-neutral-500 pt-1 border-t border-dashed border-neutral-200 dark:border-neutral-800">
                        <span>Instructions:</span>
                        <span className="italic max-w-[240px] text-right text-neutral-700 dark:text-neutral-300">"{completedOrder.orderNotes}"</span>
                      </div>
                    )}

                    <div className="flex justify-between border-t border-neutral-200 dark:border-neutral-800 pt-2 font-bold text-sm">
                      <span>Total Amount:</span>
                      <span className="text-neutral-950 dark:text-white">{formatPrice(completedOrder.total)}</span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-dashed border-neutral-200 dark:border-neutral-800">
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-2 font-semibold">
                        Items Ordered ({completedOrder.items.length}):
                      </span>
                      <div className="space-y-2">
                        {completedOrder.items.map((it, idx) => (
                          <div key={idx} className="flex items-center justify-between text-[11px] text-neutral-700 dark:text-neutral-300 gap-2">
                            <div className="flex items-center gap-2">
                              {it.image && (
                                <img src={it.image} alt={it.name} className="w-8 h-10 object-cover rounded-xs border border-neutral-200 dark:border-neutral-700" />
                              )}
                              <div>
                                <span className="font-medium">{it.name}</span>
                                <div className="text-[10px] text-neutral-500 flex items-center gap-1.5">
                                  <span className="font-mono bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded-xs">SKU: {it.sku}</span>
                                  <span className="font-bold text-neutral-900 dark:text-white bg-amber-100 dark:bg-amber-950/60 px-1 py-0.5 rounded-xs">Size: {it.size}</span>
                                  <span>Qty: {it.quantity}</span>
                                </div>
                              </div>
                            </div>
                            <span className="font-mono font-medium">{formatPrice(it.price * it.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-6 py-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              ) : (
                /* Checkout Form */
                <form onSubmit={handleSubmitOrder} className="p-5 sm:p-6 space-y-5 max-h-[82vh] overflow-y-auto">
                  {/* Items summary pill banner */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-sm">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                        Order Summary ({cart.length} item{cart.length > 1 ? 's' : ''})
                      </span>
                      <span className="font-bold text-neutral-950 dark:text-white">
                        Total: {formatPrice(orderTotal)}
                      </span>
                    </div>

                    {/* Quick cart items list preview */}
                    <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-1.5 shrink-0 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-2 py-1 rounded-xs">
                          {item.image && (
                            <img src={item.image} alt={item.name} className="w-6 h-8 object-cover rounded-xs" />
                          )}
                          <div className="text-[10px]">
                            <div className="font-semibold truncate max-w-[100px] text-neutral-900 dark:text-white">{item.name}</div>
                            <div className="text-neutral-500 font-mono">
                              Size: <strong className="text-neutral-900 dark:text-white">{item.size}</strong> · {item.quantity}x
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* General Validation Error Alert */}
                  {Object.keys(formErrors).length > 0 && (
                    <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xs flex items-center gap-2 text-rose-700 dark:text-rose-300 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Please complete all required fields correctly before confirming your order.</span>
                    </div>
                  )}

                  {/* 1. Customer & Shipping Details */}
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                        <span>1. Shipping & Customer Information</span>
                      </h4>
                      <span className="text-[10px] text-neutral-500">* All fields required</span>
                    </div>

                    {/* Full Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1 flex items-center gap-1">
                          <User className="w-3 h-3 text-neutral-400" />
                          <span>Full Name *</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ayesha Khan"
                          value={customerName}
                          onChange={(e) => {
                            setCustomerName(e.target.value);
                            if (formErrors.customerName) setFormErrors({ ...formErrors, customerName: '' });
                          }}
                          className={`w-full px-3 py-2 text-xs bg-white dark:bg-neutral-950 border rounded-xs text-neutral-900 dark:text-white focus:outline-none transition-colors ${
                            formErrors.customerName 
                              ? 'border-rose-500 focus:border-rose-600 bg-rose-50/20' 
                              : 'border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white'
                          }`}
                        />
                        {formErrors.customerName && (
                          <p className="text-[10px] text-rose-600 dark:text-rose-400 mt-1">{formErrors.customerName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1 flex items-center gap-1">
                          <Mail className="w-3 h-3 text-neutral-400" />
                          <span>Email Address *</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="ayesha@example.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                          }}
                          className={`w-full px-3 py-2 text-xs bg-white dark:bg-neutral-950 border rounded-xs text-neutral-900 dark:text-white focus:outline-none transition-colors ${
                            formErrors.email 
                              ? 'border-rose-500 focus:border-rose-600 bg-rose-50/20' 
                              : 'border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white'
                          }`}
                        />
                        {formErrors.email && (
                          <p className="text-[10px] text-rose-600 dark:text-rose-400 mt-1">{formErrors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone & Postal Code */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1 flex items-center gap-1">
                          <PhoneCall className="w-3 h-3 text-neutral-400" />
                          <span>Contact Phone Number *</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="0300 1234567 or +92 300 1234567"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                          }}
                          className={`w-full px-3 py-2 text-xs bg-white dark:bg-neutral-950 border rounded-xs text-neutral-900 dark:text-white focus:outline-none transition-colors ${
                            formErrors.phone 
                              ? 'border-rose-500 focus:border-rose-600 bg-rose-50/20' 
                              : 'border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white'
                          }`}
                        />
                        {formErrors.phone ? (
                          <p className="text-[10px] text-rose-600 dark:text-rose-400 mt-1">{formErrors.phone}</p>
                        ) : (
                          <p className="text-[10px] text-neutral-400 mt-0.5">Used by courier for delivery dispatch</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-neutral-400" />
                          <span>Postal / Zip Code *</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 75500"
                          value={postalCode}
                          onChange={(e) => {
                            setPostalCode(e.target.value);
                            if (formErrors.postalCode) setFormErrors({ ...formErrors, postalCode: '' });
                          }}
                          className={`w-full px-3 py-2 text-xs bg-white dark:bg-neutral-950 border rounded-xs text-neutral-900 dark:text-white focus:outline-none transition-colors ${
                            formErrors.postalCode 
                              ? 'border-rose-500 focus:border-rose-600 bg-rose-50/20' 
                              : 'border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white'
                          }`}
                        />
                        {formErrors.postalCode && (
                          <p className="text-[10px] text-rose-600 dark:text-rose-400 mt-1">{formErrors.postalCode}</p>
                        )}
                      </div>
                    </div>

                    {/* City & Province */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Destination City *
                        </label>
                        <select
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                            if (formErrors.city) setFormErrors({ ...formErrors, city: '' });
                          }}
                          className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                        >
                          {CITIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        {city === 'Other' && (
                          <div className="mt-2">
                            <input
                              type="text"
                              required
                              placeholder="Enter your city name *"
                              value={customCity}
                              onChange={(e) => {
                                setCustomCity(e.target.value);
                                if (formErrors.city) setFormErrors({ ...formErrors, city: '' });
                              }}
                              className={`w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-950 border rounded-xs text-neutral-900 dark:text-white focus:outline-none ${
                                formErrors.city ? 'border-rose-500' : 'border-neutral-300 dark:border-neutral-700'
                              }`}
                            />
                            {formErrors.city && (
                              <p className="text-[10px] text-rose-600 mt-1">{formErrors.city}</p>
                            )}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Province / State *
                        </label>
                        <select
                          value={province}
                          onChange={(e) => {
                            setProvince(e.target.value);
                            if (formErrors.province) setFormErrors({ ...formErrors, province: '' });
                          }}
                          className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                        >
                          {PROVINCES.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                        {formErrors.province && (
                          <p className="text-[10px] text-rose-600 mt-1">{formErrors.province}</p>
                        )}
                      </div>
                    </div>

                    {/* Complete Street Address */}
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Complete Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="House / Flat #, Building, Street Name, Sector / Block, Area Landmark"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          if (formErrors.address) setFormErrors({ ...formErrors, address: '' });
                        }}
                        className={`w-full px-3 py-2 text-xs bg-white dark:bg-neutral-950 border rounded-xs text-neutral-900 dark:text-white focus:outline-none transition-colors ${
                          formErrors.address 
                            ? 'border-rose-500 focus:border-rose-600 bg-rose-50/20' 
                            : 'border-neutral-300 dark:border-neutral-700 focus:border-black dark:focus:border-white'
                        }`}
                      />
                      {formErrors.address && (
                        <p className="text-[10px] text-rose-600 dark:text-rose-400 mt-1">{formErrors.address}</p>
                      )}
                    </div>

                    {/* Special Delivery Instructions */}
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1 flex items-center gap-1">
                        <FileText className="w-3 h-3 text-neutral-400" />
                        <span>Delivery Instructions & Special Requests (Optional)</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Ring the bell twice, leave with reception, call before delivery, deliver after 2 PM..."
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white resize-none"
                      />
                    </div>
                  </div>

                  {/* 2. Payment Method */}
                  <div className="space-y-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                      <span>2. Select Payment Option</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                      <label
                        onClick={() => setPaymentMethod('COD')}
                        className={`p-3 border rounded-xs cursor-pointer flex flex-col justify-between transition-all ${
                          paymentMethod === 'COD'
                            ? 'border-neutral-950 bg-neutral-100 dark:border-white dark:bg-neutral-800 font-semibold ring-1 ring-neutral-950 dark:ring-white'
                            : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 bg-neutral-50/50 dark:bg-neutral-950/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold">Cash on Delivery</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 px-1.5 py-0.5 rounded-full font-semibold">COD</span>
                        </div>
                        <span className="text-[10px] text-neutral-500 mt-1">Pay in cash at your doorstep upon parcel delivery</span>
                      </label>

                      <label
                        onClick={() => setPaymentMethod('CARD')}
                        className={`p-3 border rounded-xs cursor-pointer flex flex-col justify-between transition-all ${
                          paymentMethod === 'CARD'
                            ? 'border-neutral-950 bg-neutral-100 dark:border-white dark:bg-neutral-800 font-semibold ring-1 ring-neutral-950 dark:ring-white'
                            : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 bg-neutral-50/50 dark:bg-neutral-950/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold">Credit / Debit Card</span>
                          <span className="text-[10px] bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300 px-1.5 py-0.5 rounded-full font-semibold">Online</span>
                        </div>
                        <span className="text-[10px] text-neutral-500 mt-1">Visa, Mastercard & UnionPay</span>
                      </label>

                      <label
                        onClick={() => setPaymentMethod('BANK_TRANSFER')}
                        className={`p-3 border rounded-xs cursor-pointer flex flex-col justify-between transition-all ${
                          paymentMethod === 'BANK_TRANSFER'
                            ? 'border-neutral-950 bg-neutral-100 dark:border-white dark:bg-neutral-800 font-semibold ring-1 ring-neutral-950 dark:ring-white'
                            : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 bg-neutral-50/50 dark:bg-neutral-950/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold">Direct Bank Wire</span>
                          <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 px-1.5 py-0.5 rounded-full font-semibold">Wire</span>
                        </div>
                        <span className="text-[10px] text-neutral-500 mt-1">IBFT / Raast Instant Online Bank Transfer</span>
                      </label>
                    </div>
                  </div>

                  {/* Order Financial Breakdown */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xs space-y-1.5 text-xs">
                    <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                      <span>Subtotal ({cart.length} item{cart.length > 1 ? 's' : ''}):</span>
                      <span className="font-mono">{formatPrice(cartSubtotal)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                      <span>Shipping Fee:</span>
                      <span className="font-mono">
                        {shippingFee === 0 ? (
                          <strong className="text-emerald-600 uppercase font-semibold">Free Delivery</strong>
                        ) : (
                          formatPrice(shippingFee)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-neutral-200 dark:border-neutral-800 pt-2 font-bold text-sm text-neutral-950 dark:text-white">
                      <span>Estimated Order Total:</span>
                      <span className="font-mono">{formatPrice(orderTotal)}</span>
                    </div>
                  </div>

                  {/* Order Action Buttons */}
                  <div className="pt-2 flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleClose}
                      className="inline-flex items-center gap-1 text-xs text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Shop</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting || cart.length === 0}
                      className="px-6 py-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs uppercase tracking-widest font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Securing Order...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>Confirm Order · {formatPrice(orderTotal)}</span>
                        </>
                      )}
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
