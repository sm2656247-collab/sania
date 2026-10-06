import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowUpRight } from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const { categories, setSelectedCategoryFilter, setActiveView } = useStore();

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategoryFilter(categoryName);
    setActiveView('catalog');
  };

  return (
    <section className="py-16 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs uppercase font-semibold tracking-wider text-amber-800">
              Regional Crafts & Curations
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Browse by Heritage Category
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategoryFilter('');
              setActiveView('catalog');
            }}
            className="text-xs font-semibold text-emerald-900 hover:text-emerald-700 flex items-center gap-1 cursor-pointer self-start md:self-auto"
          >
            <span>View All Categories</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative bg-white rounded-xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="h-52 w-full overflow-hidden bg-stone-100 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-3 left-3 text-[11px] font-mono tracking-wide text-white/90 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                  {cat.itemCount} Items Available
                </span>
              </div>

              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-stone-900 group-hover:text-emerald-900 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                    {cat.description}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-stone-50 group-hover:bg-emerald-900 group-hover:text-white text-stone-700 flex items-center justify-center transition-colors shrink-0 ml-3">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
