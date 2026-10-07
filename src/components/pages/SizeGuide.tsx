import React, { useState } from 'react';

type SizeType = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

interface SizeRow {
  size: SizeType;
  chest: string;
  waist: string;
  hips: string;
  length: string;
}

const womenSizes: SizeRow[] = [
  { size: 'XS', chest: '32"', waist: '26"', hips: '35"', length: '52"' },
  { size: 'S',  chest: '34"', waist: '28"', hips: '37"', length: '53"' },
  { size: 'M',  chest: '36"', waist: '30"', hips: '39"', length: '54"' },
  { size: 'L',  chest: '38"', waist: '32"', hips: '41"', length: '55"' },
  { size: 'XL', chest: '40"', waist: '34"', hips: '43"', length: '56"' },
  { size: 'XXL',chest: '42"', waist: '36"', hips: '45"', length: '57"' },
];

const menSizes: SizeRow[] = [
  { size: 'XS', chest: '34"', waist: '28"', hips: '36"', length: '42"' },
  { size: 'S',  chest: '36"', waist: '30"', hips: '38"', length: '43"' },
  { size: 'M',  chest: '38"', waist: '32"', hips: '40"', length: '44"' },
  { size: 'L',  chest: '40"', waist: '34"', hips: '42"', length: '45"' },
  { size: 'XL', chest: '42"', waist: '36"', hips: '44"', length: '46"' },
  { size: 'XXL',chest: '44"', waist: '38"', hips: '46"', length: '47"' },
];

const tips = [
  { label: 'Chest / Bust', desc: 'Measure around the fullest part of your chest, keeping the tape parallel to the ground.' },
  { label: 'Waist', desc: 'Measure around your natural waist — the narrowest part of your torso, usually above the belly button.' },
  { label: 'Hips', desc: 'Measure around the fullest part of your hips and buttocks, keeping feet together.' },
  { label: 'Garment Length', desc: 'Measured from the shoulder seam to the hemline on a flat surface.' },
];

export const SizeGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'women' | 'men'>('women');
  const data = activeTab === 'women' ? womenSizes : menSizes;

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-neutral-950 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500 mb-3">Customer Care</p>
          <h1 className="text-3xl font-light text-neutral-950 dark:text-white tracking-tight mb-3">Size Guide & Fit Advisor</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
            Find your perfect fit with our comprehensive size chart. All measurements are in inches.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border border-neutral-200 dark:border-neutral-800 mb-8 w-fit mx-auto">
          {(['women', 'men'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors ${
                activeTab === tab
                  ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              {tab === 'women' ? "Women's" : "Men's"}
            </button>
          ))}
        </div>

        {/* Size Table */}
        <div className="overflow-x-auto mb-10">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800">
                {['Size', 'Chest', 'Waist', 'Hips', 'Length'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-[10px] uppercase tracking-widest font-semibold text-neutral-400 dark:text-neutral-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={row.size} className={`border-b border-neutral-100 dark:border-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors ${i % 2 === 0 ? 'bg-white dark:bg-neutral-950' : 'bg-neutral-50/50 dark:bg-neutral-900/30'}`}>
                  <td className="py-3 px-4 font-bold text-neutral-900 dark:text-white">{row.size}</td>
                  <td className="py-3 px-4 text-neutral-600 dark:text-neutral-400">{row.chest}</td>
                  <td className="py-3 px-4 text-neutral-600 dark:text-neutral-400">{row.waist}</td>
                  <td className="py-3 px-4 text-neutral-600 dark:text-neutral-400">{row.hips}</td>
                  <td className="py-3 px-4 text-neutral-600 dark:text-neutral-400">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to Measure */}
        <div className="mb-10">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-6">How to Measure</h2>
          <div className="space-y-4">
            {tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="w-6 h-6 rounded-full border border-neutral-300 dark:border-neutral-700 text-[10px] font-bold text-neutral-500 dark:text-neutral-400 flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">{tip.label}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fit Advisor Notes */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 space-y-4 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">Fit Notes from Our Atelier</h2>
          <p>FAMMA garments are crafted with a <strong className="text-neutral-800 dark:text-neutral-200">semi-fitted silhouette</strong> in mind. If you are between two sizes, we recommend sizing up for unstitched fabric and ready-to-wear dresses, and choosing your true size for kurtas and co-ords.</p>
          <p>Our premium lawn and viscose fabrics have minimal stretch. For a relaxed, flowing fit, consider going one size up from your usual size. Our khaddar and karandi winter collections run slightly generous — true-to-size is recommended.</p>
          <p>For personalised fit advice, contact our fit advisor via WhatsApp at <strong className="text-neutral-800 dark:text-neutral-200">03200119800</strong> with your measurements, and we'll help you choose the right size before you purchase.</p>
        </div>
      </div>
    </div>
  );
};
