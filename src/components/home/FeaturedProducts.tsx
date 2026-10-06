import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';
import { ArrowRight, Flame } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const { products, setActiveView, setSelectedCategoryFilter } = useStore();
  const [filterTab, setFilterTab] = useState<'featured' | 'bestseller' | 'deals'>('featured');

  const filtered = products.filter(p => {
    if (filterTab === 'bestseller') return p.isBestSeller;
    if (filterTab === 'deals') return p.isFlashSale || (p.originalPrice && p.originalPrice > p.price);
    return p.isFeatured;
  });

  return (
    <section className="py-16 bg-white border-t border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Functional Segmented Filter Control */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Curated Handcrafts</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Best Sellers & Heritage Works
            </h2>
          </div>

          {/* Segmented Controls (allowed button elements) */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg self-start md:self-auto border border-stone-200/60">
            <button
              onClick={() => setFilterTab('featured')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filterTab === 'featured'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Featured Crafts
            </button>
            <button
              onClick={() => setFilterTab('bestseller')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filterTab === 'bestseller'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Top Sellers
            </button>
            <button
              onClick={() => setFilterTab('deals')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filterTab === 'deals'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Limited Deals
            </button>
          </div>
        </div>

        {/* 3-Column Desktop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.slice(0, 6).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setActiveView('catalog');
              setSelectedCategoryFilter('');
            }}
            className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 hover:border-stone-900 text-stone-800 hover:text-stone-950 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            <span>View All Artisan Products ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
