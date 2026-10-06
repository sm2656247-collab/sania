import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setActiveView, setSelectedCategoryFilter } = useStore();

  return (
    <section className="relative bg-stone-900 text-white overflow-hidden">
      {/* Background with Ambient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_banner_crafts_1791270531944.jpg"
          alt="Pakistani Artisan Craftsmanship"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/85 to-stone-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl space-y-6">
          {/* Authentic Region Tag */}
          <div className="flex items-center gap-2 text-xs font-medium text-amber-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              Charsadda · Bhit Shah · Sialkot · Quetta · Lahore
            </span>
          </div>

          {/* Main Headline with balanced wrap */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Authentic Pakistani Craftsmanship, Delivered Nationwide.
          </h1>

          <p className="text-base sm:text-lg text-stone-300 font-light leading-relaxed">
            Hand-stitched Charsadda leather chappals, pure natural indigo Ajrak, Grade-1 Sialkot English willow, and luxury Boski weaves. Direct from master artisans to your doorstep with Cash on Delivery.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                setActiveView('catalog');
                setSelectedCategoryFilter('');
              }}
              className="px-6 py-3.5 text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setSelectedCategoryFilter('Footwear & Peshawari Chappals');
                setActiveView('catalog');
              }}
              className="px-6 py-3.5 text-sm font-medium text-white border border-stone-600 hover:border-white rounded-lg transition-colors bg-stone-900/50 backdrop-blur-sm cursor-pointer"
            >
              Shop Peshawari Chappals
            </button>
          </div>

          {/* Key Editorial Metrics */}
          <div className="pt-8 border-t border-stone-800/80 grid grid-cols-3 gap-6 text-stone-300">
            <div>
              <p className="text-2xl font-bold font-mono text-white">150+</p>
              <p className="text-xs text-stone-400 mt-0.5">Cities Covered</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-amber-400">100%</p>
              <p className="text-xs text-stone-400 mt-0.5">Cash on Delivery</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-emerald-400">7 Days</p>
              <p className="text-xs text-stone-400 mt-0.5">Easy Exchanges</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
