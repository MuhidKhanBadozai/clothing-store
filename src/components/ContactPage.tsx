import React, { useState, useRef } from 'react';
import { Mail, Phone, Send, CheckCircle2, MapPin } from 'lucide-react';

// 🔑 Your Web3Forms public access key
const WEB3FORMS_ACCESS_KEY = '8e01a4ce-c5c1-4874-8929-5c0c229e1bc8'; // Change this key in production

export const ContactPage: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderNumber: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const formEl = formRef.current;
      if (!formEl) return;

      const fd = new FormData(formEl);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: fd,
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus('sent');
        formEl.reset();
        setFormData({ name: '', email: '', phone: '', orderNumber: '', message: '' });
      } else {
        console.error('Web3Forms error:', data);
        setFormStatus('error');
      }
    } catch (err) {
      console.error('Contact form network error:', err);
      setFormStatus('error');
    }
  };

  const submitted = formStatus === 'sent';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 animate-fadeIn">
      <div className="text-center mb-16">
        <h1 className="font-serif-brand font-medium text-3xl sm:text-4xl tracking-widest uppercase text-neutral-950 dark:text-white mb-4">
          Contact Us
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
          For inquiries about your order, styling advice, or any other questions, please get in touch with our client services team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Contact Information */}
        <div className="lg:col-span-5 space-y-10">
          <div>
            <h3 className="font-bold text-neutral-950 dark:text-white uppercase tracking-wider mb-6 text-sm border-b border-neutral-200 dark:border-neutral-800 pb-2">
              Get In Touch
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-neutral-900 dark:text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white mb-1">Phone / WhatsApp</h4>
                  <a href="tel:03200119800" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                    03200119800
                  </a>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">Available Mon-Sat, 9AM to 6PM (PKT)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-neutral-900 dark:text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white mb-1">Email</h4>
                  <a href="mailto:fammaclothingpk@gmail.com" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                    fammaclothingpk@gmail.com
                  </a>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">We aim to respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-neutral-900 dark:text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white mb-1">Headquarters</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Karachi, Pakistan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-10 rounded-sm shadow-sm">
            <h3 className="font-bold text-neutral-950 dark:text-white uppercase tracking-wider mb-6 text-sm border-b border-neutral-200 dark:border-neutral-800 pb-2">
              Send a Message
            </h3>

            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} className="text-emerald-500" />
                </div>
                <h3 className="font-serif-brand font-medium text-2xl text-neutral-950 dark:text-white mb-2">
                  Message Sent
                </h3>
                <p className="text-neutral-500 text-sm max-w-sm mb-8">
                  Thank you for reaching out. Our client services team will get back to you shortly.
                </p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="px-8 py-3 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity rounded-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                <input type="hidden" name="subject" value="New Contact Inquiry from FAMA Website" />
                <input type="hidden" name="from_name" value="FAMA Website" />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors rounded-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                      Order Number (Optional)
                    </label>
                    <input
                      type="text"
                      name="orderNumber"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors rounded-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-500 transition-colors resize-none rounded-xs"
                  ></textarea>
                </div>

                {formStatus === 'error' && (
                  <p className="text-xs text-red-600 font-medium">
                    Something went wrong sending your message. Please try again or email us directly at fammaclothingpk@gmail.com.
                  </p>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="w-full py-4 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-semibold text-xs uppercase tracking-widest transition-opacity hover:opacity-90 flex items-center justify-center gap-2 rounded-xs disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <Send size={15} />
                    <span>{formStatus === 'sending' ? 'Sending Message...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
