import React from 'react';
import { Leaf, Heart, Users } from 'lucide-react';

export const EthicalSourcing: React.FC = () => {
  const pillars = [
    {
      icon: Leaf,
      title: 'Environmental Responsibility',
      desc: 'We are actively reducing our environmental footprint through sustainable fabric sourcing, low-impact dyeing, and responsible waste management across all our production facilities.',
    },
    {
      icon: Users,
      title: 'Fair Labour Practices',
      desc: 'Every artisan and worker in the FAMMA supply chain is paid a fair and living wage. We conduct annual audits of all partner workshops to ensure safe, dignified, and lawful working conditions.',
    },
    {
      icon: Heart,
      title: 'Community Investment',
      desc: 'FAMMA actively invests in the communities that sustain our craft. We fund vocational training programmes, support women artisan cooperatives, and provide healthcare subsidies to our direct workforce.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-neutral-950 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500 mb-3">Legal & Heritage</p>
          <h1 className="text-3xl font-light text-neutral-950 dark:text-white tracking-tight mb-3">Ethical Sourcing</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
            Our commitment to people, planet, and craft — at every stage of the FAMMA supply chain.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 gap-4 mb-12">
          {pillars.map((pillar, i) => (
            <div key={i} className="flex items-start gap-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5">
              <div className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shrink-0">
                <pillar.icon className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-2">{pillar.title}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-4 uppercase tracking-wider">Our Sourcing Standards</h2>
            <p className="mb-4">
              FAMMA is committed to sourcing all raw materials — fabrics, threads, dyes, trims, and packaging — from suppliers who share our values. Our Ethical Sourcing Code requires all supply chain partners to comply with applicable Pakistani labour laws, prohibit child labour and forced labour in all forms, maintain safe and hygienic working conditions, pay at least the minimum wage as mandated by law, and allow workers the right to organise and collectively bargain.
            </p>
            <p>
              All new suppliers undergo a pre-qualification assessment against this Code before being onboarded. Existing suppliers are subject to periodic announced and unannounced audits. Suppliers found to be in violation of our Code are given a remediation period; persistent non-compliance results in termination of the supply relationship.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-4 uppercase tracking-wider">Supporting Women Artisans</h2>
            <p className="mb-4">
              Over 65% of FAMMA's artisan workforce is female. We are deeply committed to creating economic opportunities for women across Pakistan's textile and craft sectors — from embroiderers in Karachi to block printers in Sindh and loom operators in Punjab. Our Women's Empowerment Initiative, launched in 2018, provides skills training, financial literacy workshops, and interest-free micro-loans to female artisans within and adjacent to our supply chain.
            </p>
            <p>
              In 2025, FAMMA partnered with three women-led cooperatives in rural Sindh and Balochistan to bring their traditional hand-stitching and mirror-work techniques directly into our festive collections, ensuring that these artisans receive fair attribution and compensation for their craft.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-4 uppercase tracking-wider">Environmental Commitments</h2>
            <p className="mb-4">
              FAMMA recognises the significant environmental impact of the fashion industry and is taking measurable steps to reduce ours. Our current sustainability commitments include: transitioning to GOTS-certified organic cotton for 60% of our fabric supply by 2027, eliminating single-use plastic from all customer packaging by 2026, reducing water consumption at our primary dyeing facility by 40% through closed-loop water recycling, and achieving carbon neutrality across our logistics operations by 2028 through a combination of efficiency improvements and verified offset programmes.
            </p>
            <p>
              We publish an annual Ethical Sourcing and Sustainability Report detailing our progress against these commitments. This report is available upon request by emailing sustainability@famma.pk.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-4 uppercase tracking-wider">Transparency & Accountability</h2>
            <p>
              We believe accountability begins with transparency. FAMMA maintains an open-door policy with all supply chain partners and encourages workers and artisans to report concerns through our confidential Grievance Mechanism — available in Urdu, Sindhi, and Pashto. All reported grievances are investigated within 30 days by our dedicated Ethical Sourcing team, with outcomes communicated back to the reporting party. No worker who raises a legitimate concern will face retaliation of any kind.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
