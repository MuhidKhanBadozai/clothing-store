import React from 'react';
import { FileText } from 'lucide-react';

export const TermsConditions: React.FC = () => {
  const lastUpdated = 'October 2026';

  const sections = [
    {
      title: 'Acceptance of Terms',
      body: `By accessing or using the FAMMA website, mobile application, or any related service (collectively, "the Platform"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use the Platform. FAMMA reserves the right to modify these Terms at any time. Continued use of the Platform following any changes constitutes your acceptance of the revised Terms.`,
    },
    {
      title: 'Use of the Platform',
      body: `You agree to use the FAMMA Platform solely for lawful purposes and in a manner that does not infringe the rights of others or restrict or inhibit their use of the Platform. You must not misuse the Platform by knowingly introducing viruses, trojans, or other malicious material. Unauthorised scraping, crawling, or automated access of any kind is strictly prohibited.`,
    },
    {
      title: 'Product Information & Pricing',
      body: `FAMMA makes every effort to display the colours, textures, and designs of our products as accurately as possible. However, due to monitor calibration and photographic variables, actual product colours may differ slightly from what is shown on screen. All prices are displayed in Pakistani Rupees (PKR) inclusive of applicable taxes where stated. FAMMA reserves the right to modify prices without prior notice. In the event of a pricing error, FAMMA will contact you before processing your order to offer the option to proceed at the correct price or cancel.`,
    },
    {
      title: 'Orders & Payment',
      body: `Placing an order on the FAMMA Platform constitutes an offer to purchase the selected products. Your order is accepted and a contract is formed only when FAMMA sends you an order confirmation. FAMMA accepts payment via credit card, debit card, and Cash on Delivery (COD). Card payments are processed through a PCI-DSS compliant payment gateway. FAMMA does not store your full card details. For COD orders, payment is collected at the time of delivery by our logistics partner.`,
    },
    {
      title: 'Intellectual Property',
      body: `All content on the FAMMA Platform — including but not limited to text, images, graphics, logos, designs, product photographs, and software — is the exclusive property of FAMMA or its licensors and is protected by applicable Pakistani and international intellectual property laws. You may not reproduce, distribute, modify, display, or create derivative works from any FAMMA content without express written permission.`,
    },
    {
      title: 'Limitation of Liability',
      body: `To the fullest extent permitted by applicable law, FAMMA shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Platform or purchase of FAMMA products. FAMMA's total liability to you for any claim arising from or related to these Terms or your use of the Platform shall not exceed the amount paid by you for the specific product giving rise to the claim.`,
    },
    {
      title: 'Governing Law',
      body: `These Terms and Conditions are governed by and construed in accordance with the laws of the Islamic Republic of Pakistan. Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Karachi, Pakistan.`,
    },
    {
      title: 'Contact',
      body: `If you have any questions about these Terms, please contact our legal team at legal@famma.pk or in writing at FAMMA Legal Department, Plot 5-C, Commercial Lane 3, Phase V, DHA Clifton, Karachi, Pakistan.`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-neutral-950 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500 mb-3">Legal & Heritage</p>
          <h1 className="text-3xl font-light text-neutral-950 dark:text-white tracking-tight mb-3">Terms & Conditions</h1>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">Last updated: {lastUpdated}</p>
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
            © {new Date().getFullYear()} FAMMA. All rights reserved. Registered trademark in Pakistan.
          </p>
        </div>
      </div>
    </div>
  );
};
