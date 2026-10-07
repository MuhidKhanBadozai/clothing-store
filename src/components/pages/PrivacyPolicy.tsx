import React from 'react';
import { Shield } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  const lastUpdated = 'October 2026';

  const sections = [
    {
      title: 'Information We Collect',
      body: `When you use the FAMMA Platform or make a purchase, we collect information you provide directly, such as your name, email address, phone number, delivery address, and payment information. We also automatically collect certain technical data including your IP address, browser type, device identifiers, and browsing behaviour on our Platform through cookies and similar tracking technologies.`,
    },
    {
      title: 'How We Use Your Information',
      body: `FAMMA uses the information collected to process and fulfil your orders, communicate with you about your purchases and account, send you order confirmations and delivery notifications, personalise your shopping experience, respond to your enquiries and customer service requests, send marketing communications (with your consent), detect and prevent fraud or security issues, and improve our Platform and services.`,
    },
    {
      title: 'Cookies & Tracking',
      body: `The FAMMA Platform uses cookies — small text files stored on your device — to enhance your browsing experience, remember your preferences, and analyse Platform usage. We use strictly necessary cookies (required for the Platform to function), performance cookies (which help us understand how visitors interact with our Platform), and marketing cookies (which allow us to deliver relevant advertising). You can control cookie preferences through your browser settings or our Cookie Preference Centre. Disabling certain cookies may affect Platform functionality.`,
    },
    {
      title: 'Sharing of Information',
      body: `FAMMA does not sell, rent, or trade your personal information to third parties for their own marketing purposes. We may share your information with third-party service providers who assist us in operating our Platform, processing payments, delivering orders, and conducting marketing activities — all of whom are contractually bound to use your data only as instructed by FAMMA and in accordance with applicable data protection laws. We may also disclose your information where required by Pakistani law or a competent government authority.`,
    },
    {
      title: 'Data Retention',
      body: `We retain your personal information for as long as necessary to fulfil the purposes described in this Policy, including for the duration of your account with us, to comply with legal and regulatory obligations, to resolve disputes, and to enforce our agreements. Order records are retained for a minimum of 5 years in accordance with Pakistani commercial law.`,
    },
    {
      title: 'Your Rights',
      body: `You have the right to access the personal information FAMMA holds about you, to request correction of inaccurate data, to request deletion of your account and associated data (subject to legal retention requirements), and to opt out of marketing communications at any time by clicking "Unsubscribe" in any email or by contacting us directly. To exercise any of these rights, please contact us at privacy@famma.pk.`,
    },
    {
      title: 'Data Security',
      body: `FAMMA employs industry-standard security measures including SSL/TLS encryption for all data transmitted through our Platform, PCI-DSS compliant payment processing, restricted access controls for internal systems, and regular security audits. While we strive to protect your information, no data transmission over the internet or storage system can be guaranteed to be 100% secure. We encourage you to use strong passwords and keep your account credentials confidential.`,
    },
    {
      title: 'Changes to This Policy',
      body: `FAMMA reserves the right to update this Privacy & Cookie Policy at any time. When we make significant changes, we will notify you by posting a notice on our Platform or via email. Your continued use of the Platform after any changes constitutes your acceptance of the updated Policy. We encourage you to review this page periodically.`,
    },
    {
      title: 'Contact Us',
      body: `For any privacy-related enquiries, data access requests, or to withdraw consent, please contact our Privacy Officer at privacy@famma.pk or write to us at FAMMA Privacy Department, Plot 5-C, Commercial Lane 3, Phase V, DHA Clifton, Karachi, Pakistan.`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-neutral-950 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500 mb-3">Legal & Heritage</p>
          <h1 className="text-3xl font-light text-neutral-950 dark:text-white tracking-tight mb-3">Privacy & Cookie Policy</h1>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">Last updated: {lastUpdated}</p>
        </div>

        <div className="flex items-start gap-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 mb-10">
          <Shield className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Your privacy matters to us. This Policy explains how FAMMA collects, uses, and protects your personal information when you use our Platform or interact with our services.
          </p>
        </div>

        <div className="space-y-8 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3 uppercase tracking-wider">{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center">
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            © {new Date().getFullYear()} FAMMA. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
