import React from 'react';
import { Layers, Leaf } from 'lucide-react';

const fabrics = [
  {
    name: 'Lawn',
    origin: 'Punjab & Sindh',
    desc: 'The crown jewel of Pakistani summer fashion, lawn is a lightweight, breathable, plain-woven fabric made from cotton. FAMMA sources premium combed and carded lawn from mills in Faisalabad, finishing each piece with our proprietary printing and dyeing process for deeper, longer-lasting colour saturation.',
  },
  {
    name: 'Khaddar',
    origin: 'Khyber Pakhtunkhwa & Punjab',
    desc: 'A handwoven coarse cotton fabric with a distinctive rustic texture, khaddar has been integral to South Asian textile culture for centuries. FAMMA\'s khaddar collections celebrate this heritage with artisan-woven pieces sourced directly from cooperative weavers in Charsadda and Jhang.',
  },
  {
    name: 'Karandi',
    origin: 'Sindh & Balochistan',
    desc: 'A heavier, semi-wool blend known for its warmth and structured drape, karandi is FAMMA\'s signature winter fabric. Our karandi is milled with a blend of wool and polyester for a refined, crease-resistant finish that maintains its silhouette throughout the day.',
  },
  {
    name: 'Chikankari Embroidery',
    origin: 'Lucknow (adapted into Pakistani tradition)',
    desc: 'An intricate shadow-work embroidery technique executed with white threads on fine white fabric. FAMMA\'s chikankari artisans — trained over generations — work entirely by hand to produce the delicate floral and paisley motifs that define our signature festive pieces.',
  },
  {
    name: 'Viscose & Jacquard',
    origin: 'Karachi & Lahore mills',
    desc: 'Our silk-smooth viscose and self-patterned jacquard collections represent the contemporary face of FAMMA luxury. Sourced from Pakistan\'s most advanced textile mills, these fabrics are prized for their fluid drape, vibrant colour uptake, and year-round wearability.',
  },
];

export const FabricCraftsmanship: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-neutral-950 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500 mb-3">Legal & Heritage</p>
          <h1 className="text-3xl font-light text-neutral-950 dark:text-white tracking-tight mb-3">Fabric & Artisan Craftsmanship</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
            Every thread tells a story. An exploration of the materials and hands behind every FAMMA creation.
          </p>
        </div>

        <div className="space-y-8 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-12">
          <section>
            <p className="mb-4">
              At FAMMA, the fabric is not merely the medium — it is the message. Our commitment to material integrity begins at the source: the spinning mill, the loom, the dye vat, the embroidery hoop. Every piece of cloth that enters our atelier has been carefully selected by our in-house textile specialists, evaluated against our Quality Standards framework, and approved for production only when it meets our stringent criteria for texture, weight, thread count, and colorfastness.
            </p>
            <p>
              We work with over 60 fabric suppliers and independent artisan cooperatives across Pakistan, maintaining long-term relationships built on fair pricing, transparent sourcing, and shared dedication to craft excellence.
            </p>
          </section>
        </div>

        {/* Fabric Cards */}
        <div className="space-y-4 mb-12">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <Layers className="w-4 h-4" /> Our Signature Fabrics & Crafts
          </h2>
          {fabrics.map((fabric, i) => (
            <div key={i} className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-semibold text-neutral-900 dark:text-white">{fabric.name}</p>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 shrink-0 ml-4">{fabric.origin}</span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{fabric.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-8 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-4 uppercase tracking-wider">Our Artisans</h2>
            <p className="mb-4">
              The hands that create FAMMA garments are our greatest asset. Our artisan workforce includes embroiderers, cutters, finishers, pattern-makers, and quality inspectors — many of whom have been with FAMMA for over a decade. We operate in-house production facilities in Karachi, supplemented by partner workshops in Lahore and Multan, all of which adhere to our Artisan Code of Practice.
            </p>
            <p>
              Apprenticeship at FAMMA runs for a minimum of 18 months, during which each new artisan is paired with a master craftsperson to learn the specific techniques central to our aesthetic. This mentorship model ensures that traditional crafts — many of which are disappearing from mainstream production — are preserved and passed on to future generations.
            </p>
          </section>

          <div className="flex items-start gap-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4">
            <Leaf className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              FAMMA is committed to responsible sourcing. We are in the process of transitioning 60% of our fabric supply to GOTS-certified organic cotton by 2027. Our dyeing facilities use AZO-free reactive dyes, and we maintain an active water recycling programme across our primary production unit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
