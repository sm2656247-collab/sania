import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

export const LadiesCollectionSpotlight: React.FC = () => {
  const { products, setActiveView, setSelectedCategoryFilter } = useStore();

  // Filter products belonging to Ladies categories
  const ladiesProducts = products.filter(p =>
    p.category.includes("Women's") ||
    p.category.includes("Khussas") ||
    p.category.includes("Kundan") ||
    p.tags.includes('ladies')
  );

  return (
    <section className="py-16 bg-[#FAF7F2] border-t border-b border-amber-900/10 relative overflow-hidden">
      {/* Subtle decorative background tint */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Pakistani Women's Pret & Festive Curation</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Festive Lawn, Velvet Khussas & Kundan Jewels
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
              Designed for Eid, weddings, and everyday elegance. Featuring authentic hand-needlework from Multan, Anarkali velvet khussas, and heirloom Kundan jewelry with Cash on Delivery nationwide.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setSelectedCategoryFilter("Women's Festive Pret & Lawn");
                setActiveView('catalog');
              }}
              className="px-3.5 py-1.5 bg-white border border-stone-300 hover:border-amber-800 text-stone-800 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              Lawn Suits
            </button>
            <button
              onClick={() => {
                setSelectedCategoryFilter('Handcrafted Bridal Khussas');
                setActiveView('catalog');
              }}
              className="px-3.5 py-1.5 bg-white border border-stone-300 hover:border-amber-800 text-stone-800 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              Bridal Khussas
            </button>
            <button
              onClick={() => {
                setSelectedCategoryFilter('Artisan Kundan & Jhumkas');
                setActiveView('catalog');
              }}
              className="px-3.5 py-1.5 bg-white border border-stone-300 hover:border-amber-800 text-stone-800 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              Kundan Jewelry
            </button>
            <button
              onClick={() => {
                setSelectedCategoryFilter("Women's Festive Pret & Lawn");
                setActiveView('catalog');
              }}
              className="px-4 py-1.5 bg-amber-800 hover:bg-amber-900 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ml-2"
            >
              <span>Explore All ({ladiesProducts.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4-Item Grid for Ladies Collection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ladiesProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Feature Banner: 7-Day Free Size Exchange */}
        <div className="mt-12 bg-white rounded-xl p-5 border border-amber-900/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5 fill-amber-100" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                Worry-Free Sizing & Inspection at Doorstep
              </h4>
              <p className="text-[11px] text-stone-500">
                Stitched suits and khussas can be tried on at home. 100% free size exchange across Lahore, Karachi, Islamabad & 150+ cities.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedCategoryFilter("Women's Festive Pret & Lawn");
              setActiveView('catalog');
            }}
            className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer self-start sm:self-auto shrink-0"
          >
            Shop Ladies Collection
          </button>
        </div>
      </div>
    </section>
  );
};
